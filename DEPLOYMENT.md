# Deployment

squarecampus.com is a fully static export (`output: "export"` in
[next.config.ts](next.config.ts)): no server, no middleware and no API routes.
It is served from object storage behind a CDN; redirects, security headers and
the enquiry form's backend are configured outside this repository.

The infrastructure runbook and the enquiry-form backend live in a private
repository. They are kept out of this one on purpose: they describe abuse
controls and internal systems that are more useful to an attacker than to a
reader.

## Build

```bash
bun install
NEXT_PUBLIC_CONTACT_ENDPOINT=<intake URL> bun run build   # emits ./out
```

`bun run build` runs, in order: the forbidden-claims check
(`scripts/check-claims.sh`), the content-shape check
(`scripts/check-content.ts`), `next build`, the Markdown-alternate generator
(`scripts/markdown-alternates.ts`) and the post-build machine-readability check
(`scripts/check-build.ts`). A production build fails without
`NEXT_PUBLIC_CONTACT_ENDPOINT`, or the explicit email-draft mode (see
[.env.example](.env.example)).

## Deploy

```bash
DEPLOY_BUCKET=<bucket> DEPLOY_DISTRIBUTION_ID=<distribution> \
  NEXT_PUBLIC_CONTACT_ENDPOINT=<intake URL> ./scripts/deploy.sh
```

`scripts/deploy.sh` builds, syncs `./out` to the bucket (hashed assets with
long cache lifetimes, HTML and `*.md` revalidated, Markdown served as
`text/markdown`), invalidates the CDN, waits, and notifies IndexNow of the URLs
whose sitemap entries were added, changed or removed. `SKIP_BUILD=1` uploads an
existing `./out`. The targets are required environment variables; their values
are in the private runbook.

## Public source mirror

The website's source is published to a public, read-only mirror at
https://github.com/fairhelmsystems/squarecampus.com by
`.github/workflows/public-mirror.yml` on every push to `main`:

- The job clones the full history, then runs `scripts/publication-gate.sh`
  over exactly the commits the mirror does not have yet: gitleaks, the claims
  check, a private denylist (the `PUBLICATION_DENYLIST` secret), an
  author/committer/co-author allowlist and a check for key or env files.
  If the gate fails, nothing is published.
- The push is fast-forward only, using a deploy key (`MIRROR_DEPLOY_KEY`) that
  can write to the mirror and nothing else. The mirror's branches are
  protected so that only that key can change them.
- Only `main` is ever published. Never add the mirror as a push remote in a
  working clone.
- Pull requests opened on the mirror are brought upstream with
  `scripts/upstream-public-pr.sh <number>`, merged here, and closed on the
  mirror with a link to the published commit.
- To stop publishing, disable the workflow or delete the deploy key; the
  internal repository is unaffected.
