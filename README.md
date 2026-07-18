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
bun run lint / format  # biome
bun run check-types    # tsc --noEmit
bun run deploy         # build + S3 sync + CloudFront invalidation + IndexNow
```

Production builds require `NEXT_PUBLIC_CONTACT_ENDPOINT` (or the explicit
`NEXT_PUBLIC_CONTACT_FORM_MODE=email` interim mode) — see `.env.example` and
[DEPLOYMENT.md](DEPLOYMENT.md).

## Ground rules

- **No invented proof.** Every marketing claim is tracked in
  [docs/marketing-claims-register.md](docs/marketing-claims-register.md);
  `scripts/check-claims.sh` fails the build if a forbidden claim reappears.
- Say "unified institutional data model" / "one governed system of record" —
  never "single/shared database".
- Legal pages carry `LEGAL REVIEW` markers; don't edit their substantive
  language without counsel.
- Growth strategy and content cadence:
  [docs/growth-playbook.md](docs/growth-playbook.md).

## Key docs

- [DEPLOYMENT.md](DEPLOYMENT.md) — infrastructure, edge config, deploy flow
- [docs/marketing-claims-register.md](docs/marketing-claims-register.md)
- [docs/growth-playbook.md](docs/growth-playbook.md)
- [infra/contact-intake/README.md](infra/contact-intake/README.md)
- [src/content/blog/BLOG_TOPICS.md](src/content/blog/BLOG_TOPICS.md)
