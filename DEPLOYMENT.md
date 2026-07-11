# Deployment Guide — S3 + CloudFront (Static Export)

The site builds to a fully static export (`output: "export"` in
[next.config.ts](next.config.ts)). There is no server, no middleware, and no
API routes — everything that used to live there is now configured at the edge.

## Build

```bash
bun install
bun run build          # emits the static site into ./out
```

Two-domain setup: build once per domain so canonicals match the host.

```bash
# squarecampus.com (default)
bun run build

# squarecampus.in
NEXT_PUBLIC_SITE_URL=https://squarecampus.in bun run build
```

Every page emits hreflang alternates pointing at both domains either way
(see [src/lib/seo.ts](src/lib/seo.ts)).

Optional: set `NEXT_PUBLIC_CONTACT_ENDPOINT` at build time to a form intake
endpoint (API Gateway + Lambda + SES, Formspree, etc.). Without it, the demo
form opens a prefilled mail draft to contact@squarecampus.com.

## Upload to S3

```bash
aws s3 sync out/ s3://YOUR_BUCKET --delete \
  --cache-control "public,max-age=0,must-revalidate" \
  --exclude "_next/*"

# Hashed immutable assets get long cache lifetimes
aws s3 sync out/_next/ s3://YOUR_BUCKET/_next/ --delete \
  --cache-control "public,max-age=31536000,immutable"
```

Keep the bucket private; grant CloudFront access via Origin Access Control (OAC).

## CloudFront distribution

- Origin: the S3 bucket (with OAC, not website endpoint)
- Default root object: `index.html`
- Custom error response: 404 → `/404.html` (status 404)
- Compress objects automatically: on (Brotli + gzip)
- HTTP/2 + HTTP/3: on
- Attach the **function** and **response headers policy** below.

### CloudFront Function (viewer request): index rewrite + redirects

`trailingSlash: true` means every route is a folder with an `index.html`.
CloudFront only applies the root object at `/`, so rewrite subpaths, and issue
the 301s that used to live in `next.config.ts` `redirects()`:

```js
function handler(event) {
  var request = event.request;
  var uri = request.uri;

  var redirects = {
    "/features": "/platform/",
    "/product": "/platform/",
    "/how-it-works": "/rollout/",
    "/contact-us": "/demo/",
    "/why-different": "/why-squarecampus/",
  };

  var path = uri.endsWith("/") ? uri.slice(0, -1) : uri;
  if (redirects[path]) {
    return {
      statusCode: 301,
      statusDescription: "Moved Permanently",
      headers: { location: { value: redirects[path] } },
    };
  }

  if (uri.endsWith("/")) {
    request.uri = uri + "index.html";
  } else if (!uri.includes(".")) {
    // Canonicalize extensionless paths to the trailing-slash form
    return {
      statusCode: 301,
      statusDescription: "Moved Permanently",
      headers: { location: { value: uri + "/" } },
    };
  }

  return request;
}
```

### Response Headers Policy: security headers

These replace the old `headers()` block in next.config.ts:

| Header | Value |
|---|---|
| Strict-Transport-Security | `max-age=63072000; includeSubDomains; preload` |
| X-Frame-Options | `DENY` |
| X-Content-Type-Options | `nosniff` |
| Referrer-Policy | `strict-origin-when-cross-origin` |
| Permissions-Policy | `accelerometer=(), autoplay=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()` |
| Cross-Origin-Opener-Policy | `same-origin` |
| Cross-Origin-Resource-Policy | `same-site` |
| Content-Security-Policy | see below |

Suggested CSP for the static site (Next inlines its bootstrap scripts and the
theme/JSON-LD snippets, so `'unsafe-inline'` for script/style is required
unless you move to hash-based policies):

```
default-src 'self';
script-src 'self' 'unsafe-inline';
style-src 'self' 'unsafe-inline';
img-src 'self' data: https://cdn.mdtechspire.com;
font-src 'self';
connect-src 'self' https://YOUR_CONTACT_ENDPOINT_HOST;
frame-ancestors 'none';
base-uri 'self';
form-action 'self' mailto:;
upgrade-insecure-requests
```

### WAF (optional, replaces the old middleware URL filter)

The deleted `middleware.ts` blocked suspicious URL patterns (SQLi/XSS probes,
path traversal). On CloudFront, attach **AWS WAF** with the
`AWSManagedRulesCommonRuleSet` and `AWSManagedRulesSQLiRuleSet` managed rule
groups for equivalent (better) coverage.

## Domains

Point both `squarecampus.com` and `squarecampus.in` (plus `www.` variants
redirecting to apex) at their respective distributions via Route 53 alias
records, each serving the matching per-domain build. Request ACM certificates
in `us-east-1` for CloudFront.

## Invalidation on deploy

```bash
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

(Hashed `_next/` assets never need invalidation; `/*` covers the HTML.)

## What was removed in the static migration

- `middleware.ts` (URL filtering) → AWS WAF
- `src/app/api/*` (contact, csp-report, health) → external form endpoint;
  health checks are CloudFront/S3's concern now
- `headers()` / `redirects()` in next.config.ts → response headers policy +
  CloudFront Function above
- Resend/Upstash/AWS SDK server dependencies → no longer needed at runtime
