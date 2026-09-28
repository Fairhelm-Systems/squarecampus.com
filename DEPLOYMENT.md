# Deployment Guide — S3 + CloudFront (Static Export)

## Live infrastructure (deployed 2026-07-11)

| Resource | Value |
|---|---|
| S3 bucket | `squarecampus-marketing-site` (ap-south-1, private, OAC-only) |
| CloudFront distribution | `E3ATKH99UOL8C2` → d1n7nlq2wsu2se.cloudfront.net |
| Aliases | squarecampus.com, www.squarecampus.com, squarecampus.in, www.squarecampus.in |
| ACM cert (us-east-1) | 4-SAN cert covering all aliases |
| CloudFront Function | `squarecampus-router` (host canonicalization + legacy redirects + index rewrite) |
| Response headers policy | `squarecampus-security-headers` |
| Route53 | A/AAAA aliases on both zones → the distribution |

squarecampus.in and all www hosts 301 to https://squarecampus.com at the edge.

### Redeploy

```bash
bun run deploy          # scripts/deploy.sh: build + sync + invalidate + wait + IndexNow
```

`bun run build` runs, in order: the forbidden-claims check, the content-shape
check, `next build`, the Markdown-alternate generator
(`scripts/markdown-alternates.ts`, writes `out/<route>/index.md` from the
rendered HTML of the routes in `src/content/markdown-alternates.ts`) and the
post-build machine-readability check (`scripts/check-build.ts`). The deploy
uploads `*.md` in a separate pass with `Content-Type: text/markdown` so agents
fetching `/pricing/index.md` receive Markdown, not `binary/octet-stream`.

### IndexNow (Bing and other IndexNow engines; not Google)

`scripts/deploy.sh` fetches the live `sitemap.xml` before uploading, and after
the CloudFront invalidation runs `bun scripts/indexnow.ts --previous <file>`.
The script diffs the previous sitemap against the one just deployed and
submits only URLs that are new, whose git-derived `<lastmod>` changed, or that
disappeared — never the whole sitemap, never per request, never a
non-canonical or noindex URL (nothing outside the sitemap is eligible). The
key file is `public/<32-hex>.txt`; if it is absent the step is skipped. Dry
run locally with `bun run indexnow:dry-run` after a build. Google is notified
through the sitemap only.

`SKIP_BUILD=1 bun run deploy` uploads the existing `./out` without rebuilding.
Override targets with `DEPLOY_BUCKET` / `DEPLOY_DISTRIBUTION_ID` env vars.

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

No hreflang alternates are emitted: squarecampus.in 301s to squarecampus.com
at the edge, so alternates would point at redirects. `lang` and every
`inLanguage` value are `en-IN` (see [src/lib/seo.ts](src/lib/seo.ts)).

**Required:** set `NEXT_PUBLIC_CONTACT_ENDPOINT` at build time — production
builds fail without it; there is no silent mailto fallback (see
[next.config.ts](next.config.ts) and `.env.example`). The live intake is:

```
NEXT_PUBLIC_CONTACT_ENDPOINT=https://squarecampus.com/api/contact
```

Full intake infrastructure (Lambda + API Gateway + DynamoDB + stubbed SES,
including abuse safeguards and the SES finish-line steps) is documented in
[infra/contact-intake/README.md](infra/contact-intake/README.md). The
endpoint is same-origin: CloudFront proxies `/api/*` to API Gateway using the
existing ACM certificate, so the CSP stays at `connect-src 'self'`. `NEXT_PUBLIC_CONTACT_FORM_MODE=email` remains available as an explicit
email-draft fallback mode, but is no longer needed.

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
the 301s that used to live in `next.config.ts` `redirects()`. The deployed
version (`squarecampus-router`) additionally 301s any non-canonical host
(www, squarecampus.in) to https://squarecampus.com:

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

### Canonical host: collapsing the two-hop redirect (NOT YET APPLIED)

Measured on 2026-08-31 against the live distribution:

| Request | Hops |
|---|---|
| `http://squarecampus.com/` → `https://squarecampus.com/` | 1 ✅ |
| `https://www.squarecampus.com/` → `https://squarecampus.com/` | 1 ✅ |
| `https://squarecampus.in/` → `https://squarecampus.com/` | 1 ✅ |
| `http://www.squarecampus.com/` → `https://www.squarecampus.com/` → `https://squarecampus.com/` | **2** ❌ |

The cause is ordering, not the function. The distribution's viewer protocol
policy is `redirect-to-https`, and CloudFront applies that **before** it
invokes the viewer-request function — so a plain-HTTP request to a
non-canonical host is bounced to HTTPS *on the same host* first, and only then
reaches the function that canonicalises the host.

It cannot be fixed inside `squarecampus-router`. A CloudFront Function's
viewer-request event does not carry the request scheme (`CloudFront-Forwarded-Proto`
is an origin-request header), so the function cannot tell an HTTP request from
an HTTPS one — and switching the distribution to `allow-all` without that
signal would serve the whole site over plain HTTP.

**The fix, when someone has console/IaC access.** Split the non-canonical
aliases onto their own redirect-only distribution:

1. Create a second CloudFront distribution — call it `squarecampus-redirect`.
   - Aliases: `www.squarecampus.com`, `squarecampus.in`, `www.squarecampus.in`
     (remove those three from `E3ATKH99UOL8C2`; keep `squarecampus.com` there).
   - The existing 4-SAN ACM cert in us-east-1 covers all of them and can be
     attached to both distributions.
   - **Viewer protocol policy: `allow-all`.** This is the whole point: the
     function must see the request instead of CloudFront redirecting first.
   - Origin: any reachable origin (the same S3 bucket is fine). Nothing is ever
     fetched from it — the function returns before the request leaves the edge.
   - Attach `squarecampus-security-headers` unchanged. HSTS is not weakened:
     the header still ships on every HTTPS response from both distributions,
     `includeSubDomains; preload` is untouched, and a browser ignores HSTS on a
     plain-HTTP response either way.
2. Attach this viewer-request function to it:

```js
function handler(event) {
  // Every alias on this distribution is non-canonical, so there is nothing to
  // decide: one 301 to the canonical origin, preserving path and query.
  var request = event.request;
  var qs = "";
  for (var key in request.querystring) {
    var v = request.querystring[key];
    qs += (qs ? "&" : "?") + key + (v.value ? "=" + encodeURIComponent(v.value) : "");
  }
  return {
    statusCode: 301,
    statusDescription: "Moved Permanently",
    headers: { location: { value: "https://squarecampus.com" + request.uri + qs } },
  };
}
```

3. Repoint the Route 53 A/AAAA aliases for those three hosts at the new
   distribution. `squarecampus.com` stays on `E3ATKH99UOL8C2`.

After this every non-canonical host/scheme variant reaches
`https://squarecampus.com/` in one hop. `http://squarecampus.com/` stays at one
hop and cannot be fewer — the HTTP→HTTPS redirect on the canonical host is the
hop.

**Worth weighing before doing it.** HSTS is served as
`max-age=63072000; includeSubDomains; preload`, so any browser that has seen
`https://squarecampus.com` upgrades `http://www.squarecampus.com` internally
and never issues the plain-HTTP request at all. The second hop is paid only by
genuinely first-contact clients and by crawlers that do not honour HSTS. The
change is correct and cheap to run, but it is a housekeeping fix, not a
conversion fix.

### Compression

Verified 2026-08-31: the distribution negotiates correctly — `Accept-Encoding:
br, gzip` returns `content-encoding: br`, `gzip` alone returns gzip. Nothing to
change. Note when reading audit numbers: the homepage is ~438 KB raw HTML,
~80 KB gzip, **~44 KB brotli**. A tool that reports ~82 KB for the homepage
measured the gzip path, not what a modern browser actually receives.

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
img-src 'self' data:;
font-src 'self';
connect-src 'self' https://YOUR_CONTACT_ENDPOINT_HOST;
frame-ancestors 'none';
base-uri 'self';
form-action 'self' mailto:;
upgrade-insecure-requests
```

### Response Headers Policy: keep decorative art out of Google Images

The product screenshots under `/images/screens/*` are real UI and are the
images we *want* in Google Images — they're listed in the image sitemap
(`src/app/sitemap.ts`). The assets under `/images/devices/*` were the opposite:
empty device bezels (the MacBook / iPhone chrome that frames a screenshot).
With no guidance Google indexed the blank MacBook frame as a "SquareCampus"
image, which is not the impression we want.

> Since September 2026 the device frames are drawn in CSS
> (`src/components/site/device-frames.tsx`) and `/images/devices/*` no longer
> exists in the export. The behavior below is harmless with nothing to match
> and can stay as a guard for any future decorative asset placed there.

There is no meta-tag for a standalone image file, so the signal has to be an
HTTP header. Create a second Response Headers Policy — `squarecampus-noindex-art`
— that adds one **custom header**:

| Header | Value |
|---|---|
| X-Robots-Tag | `noimageindex` |

Then add a cache behavior (above the default `*`) that matches the decorative
assets and attaches this policy instead of the security-headers policy — or,
simpler, clone the security policy and add the custom header so the behavior
still ships the full security header set:

- Path pattern: `/images/devices/*`
- Response headers policy: `squarecampus-noindex-art`

Googlebot drops those files from the image index on its next crawl while
still rendering them on the page (noimageindex blocks indexing, not fetching).
Everything else keeps indexing normally. Do **not** widen the pattern to
`/images/*` — that would suppress the product screenshots you want ranked.

### WAF (optional, replaces the old middleware URL filter)

The deleted `middleware.ts` blocked suspicious URL patterns (SQLi/XSS probes,
path traversal). On CloudFront, attach **AWS WAF** with the
`AWSManagedRulesCommonRuleSet` and `AWSManagedRulesSQLiRuleSet` managed rule
groups for equivalent (better) coverage.

## Contact API routes

The `/api/*` behaviour points at the intake API (CachingDisabled,
AllViewerExceptHostHeader, all methods). Four routes exist on the HTTP API,
all POST, all backed by the same Lambda:

| Route | Purpose |
| --- | --- |
| `POST /api/contact` | Form submission. |
| `POST /contact` | Legacy path, kept working. |
| `POST /api/challenge` | Issue a human-check board (PNG + tile start). |
| `POST /api/challenge/solve` | Mark one board, return a pass token. |

Two things about this that cost time to discover:

- **Lambda invoke permission is scoped per path.** The existing statements
  named `.../*/*/contact` and `.../*/*/api/contact` only, so the new routes
  returned a 500 from API Gateway — the function was never invoked. Every new
  route needs its own `lambda add-permission` with a matching `--source-arn`.
- **Both challenge routes are POST on purpose.** Browsers do not send `Origin`
  on a same-origin GET, and the handler's origin allowlist is one of the things
  keeping bare scripts out — a GET route would have left that check inspecting
  a header that is never there.

A 403 from any of these renders as the site's HTML 404 page, because the
distribution maps `403 -> /404.html` for the whole distribution. It is
misleading when debugging and harmless in practice: 400, 429 and 503 pass
through untouched, and a real browser always sends `Origin`. Narrowing the
custom error responses to exclude `/api/*` would fix it.

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
- Server-side email, rate-limit and AWS SDK dependencies → no longer needed at runtime

## Contact API routes

The `/api/*` behaviour points at the intake API (CachingDisabled,
AllViewerExceptHostHeader, all methods). Four routes exist on the HTTP API,
all POST, all backed by the same Lambda:

| Route | Purpose |
| --- | --- |
| `POST /api/contact` | Form submission. |
| `POST /contact` | Legacy path, kept working. |
| `POST /api/challenge` | Issue a human-check board (PNG + tile start). |
| `POST /api/challenge/solve` | Mark one board, return a pass token. |

Two things about this that cost time to discover:

- **Lambda invoke permission is scoped per path.** The existing statements
  named `.../*/*/contact` and `.../*/*/api/contact` only, so the new routes
  returned a 500 from API Gateway — the function was never invoked. Every new
  route needs its own `lambda add-permission` with a matching `--source-arn`.
- **Both challenge routes are POST on purpose.** Browsers do not send `Origin`
  on a same-origin GET, and the handler's origin allowlist is one of the things
  keeping bare scripts out — a GET route would have left that check inspecting
  a header that is never there.

A 403 from any of these renders as the site's HTML 404 page, because the
distribution maps `403 -> /404.html` for the whole distribution. It is
misleading when debugging and harmless in practice: 400, 429 and 503 pass
through untouched, and a real browser always sends `Origin`. Narrowing the
custom error responses to exclude `/api/*` would fix it.
