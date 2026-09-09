# squarecampus.com — marketing site

Static Next.js export for the SquareCampus marketing site, served from
S3 + CloudFront. SquareCampus is a sovereign School OS for Indian school
groups, a product of Fairhelm Systems OPC.

## Stack

- Next.js (App Router, `output: "export"`, trailing slashes) + Tailwind v4
- Bun for everything (`bun run <script>`), Biome for lint/format
- No server: redirects and security headers live at the CloudFront edge
- Demo form posts to an external intake API (Lambda + API Gateway + DynamoDB
  — see [infra/contact-intake/README.md](infra/contact-intake/README.md))

## Commands

```bash
bun run dev            # local dev server
bun run build          # claims check + static export to ./out (needs env, see below)
bun run check:claims   # forbidden-claims regression check on its own
bun run check:content  # structural check of comparison pages and blog posts
bun run check:build    # post-build: llms.txt, Markdown alternates, sitemap, JSON-LD, stale claims
bun run test           # commercial-facts, llms.txt, sitemap and agent-readability tests
bun run lint / format  # biome
bun run check-types    # tsc --noEmit
bun run deploy         # build + S3 sync + CloudFront invalidation + IndexNow
bun run motion:render  # re-render the explanatory motion assets (see motion/)
bun run motion:studio  # preview/edit those compositions in Remotion Studio
```

Production builds require `NEXT_PUBLIC_CONTACT_ENDPOINT` (or the explicit
`NEXT_PUBLIC_CONTACT_FORM_MODE=email` interim mode) — see `.env.example` and
[DEPLOYMENT.md](DEPLOYMENT.md).

## Ground rules

- **No invented proof.** Every marketing claim is tracked in
  [docs/marketing-claims-register.md](docs/marketing-claims-register.md);
  `scripts/check-claims.sh` fails the build if a forbidden claim reappears.
- **No half-built content pages.** `scripts/check-content.ts` (`bun run
  check:content`, also part of `build`) checks the shape of every comparison
  page and blog post: competitor strengths and "they fit when" present, a FAQ
  block, minimum sections, valid dates, and CTAs that resolve to a live route
  in trailing-slash form — never to a redirect stub.
- **One commercial truth.** Pricing availability, identity by plan, the
  Founding Institutional Partner programme (two positions, ever) and the
  canonical short description live in [src/content/commercial.ts](src/content/commercial.ts).
  Pages, FAQs, JSON-LD and `/llms.txt` derive from it; `bun run test` fails if
  they drift. No rupee figure exists in this repository and none may be added
  without an approved rate card.
- **Machine-readable surfaces are generated, not hand-written.** `/llms.txt`
  comes from [src/content/llms.ts](src/content/llms.ts); Markdown alternates
  (`/<route>/index.md`) are produced from the rendered HTML after `next build`
  by `scripts/markdown-alternates.ts` for the routes in
  [src/content/markdown-alternates.ts](src/content/markdown-alternates.ts).
- Say "unified institutional data model" / "one governed system of record" —
  never "single/shared database".
- Legal pages carry `LEGAL REVIEW` markers; don't edit their substantive
  language without counsel.
- Growth strategy and content cadence:
  [docs/growth-playbook.md](docs/growth-playbook.md).
- **Motion is produced at build time, never at runtime.** Remotion lives in
  [motion/](motion/README.md) as a separate package; the site ships rendered
  MP4/WebP files and no animation library. Re-render with
  `bun run motion:render`.
- Every URL the site emits — canonical, OG, sitemap, JSON-LD — goes through
  `canonicalUrl()` / `createWebPageSchema()` in [src/lib/seo.ts](src/lib/seo.ts)
  so it is in the trailing-slash form the edge actually serves.

## Key docs

- [DEPLOYMENT.md](DEPLOYMENT.md) — infrastructure, edge config, deploy flow
- [docs/marketing-claims-register.md](docs/marketing-claims-register.md)
- [docs/growth-playbook.md](docs/growth-playbook.md)
- [infra/contact-intake/README.md](infra/contact-intake/README.md)
- [docs/page-intent-map.md](docs/page-intent-map.md) — what each indexable page is for
- [motion/README.md](motion/README.md) — the build-time motion pipeline
- [src/content/blog/BLOG_TOPICS.md](src/content/blog/BLOG_TOPICS.md)
