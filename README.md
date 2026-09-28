<a href="https://squarecampus.com">
  <img src="public/og/default.png" alt="SquareCampus — Know what requires attention today. One system for operations, ownership and leadership visibility." width="100%" />
</a>

<h1 align="center">squarecampus.com</h1>

<p align="center">
  <strong>The website for SquareCampus — a School Operating System for schools, educational trusts<br />
  and multi-campus school groups in India.</strong>
</p>

<p align="center">
  <a href="https://squarecampus.com"><strong>Visit the live site →</strong></a>
  &nbsp;·&nbsp;
  <a href="https://squarecampus.com/pricing/">Pricing model</a>
  &nbsp;·&nbsp;
  <a href="https://squarecampus.com/data-retention/">Data retention</a>
  &nbsp;·&nbsp;
  <a href="https://squarecampus.com/llms.txt">llms.txt</a>
</p>

<p align="center">
  <img alt="Next.js 16" src="https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white" />
  <img alt="React 19" src="https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white" />
  <img alt="Tailwind CSS 4" src="https://img.shields.io/badge/Tailwind-4-38BDF8?logo=tailwindcss&logoColor=white" />
  <img alt="Bun" src="https://img.shields.io/badge/Bun-runtime-14151A?logo=bun&logoColor=white" />
  <img alt="Biome" src="https://img.shields.io/badge/Biome-lint%20%2B%20format-60A5FA?logo=biome&logoColor=white" />
  <img alt="Static export" src="https://img.shields.io/badge/output-static%20export-4B5563" />
  <a href="LICENSE"><img alt="License: Apache-2.0 (code)" src="https://img.shields.io/badge/code-Apache--2.0-2F6FEB" /></a>
  <a href="#built-with-claude-code"><img alt="Built with Claude Code" src="https://img.shields.io/badge/built%20with-Claude%20Code-D97757?logo=anthropic&logoColor=white" /></a>
</p>

<p align="center">
  <sub>🎩 Built with an unusual associate. <a href="#a-word-from-an-unlikely-sponsor"><strong>Hear it from our unlikely sponsor ↓</strong></a></sub>
</p>

> This repository is a read-only public mirror of our internal repository,
> published automatically after every change to `main`. Issues are welcome
> here; pull requests are welcome too and are merged upstream, after which
> they appear in this mirror.

---

## Why this repository is public

A marketing site makes claims. This one lets you check them.

Every security, infrastructure, AI, commercial and compliance statement on
[squarecampus.com](https://squarecampus.com) is tracked in the
[claims register](docs/marketing-claims-register.md), and the build **fails**
if a claim the register has retired tries to come back. The pricing model,
identity-by-plan and Founding Partner facts are written once and derived
everywhere. The data-retention page publishes a legal schedule only from rules
that have passed qualified review — and today, honestly, none has.

If something on the site reads stronger than the evidence, the evidence is
here, and so is the check that should have caught it. Issues are welcome.

## At a glance

| | |
| --- | --- |
| **What it is** | A static Next.js export: no server, no runtime database |
| **Where it runs** | S3 + CloudFront; redirects and security headers live at the edge |
| **Forms** | The demo form posts to a small intake API — see [infra/contact-intake](infra/contact-intake/README.md) |
| **Content model** | Typed modules in [`src/content/`](src/content) — pages, FAQs, JSON-LD and `/llms.txt` all derive from them |
| **Motion** | Rendered at build time with Remotion in [`motion/`](motion/README.md); the site ships video files, not an animation library |
| **UI primitives** | shadcn components; new components use [Base UI](https://base-ui.com) |

## Quick start

```bash
bun install
bun run dev            # local dev server
```

Production builds need `NEXT_PUBLIC_CONTACT_ENDPOINT`, or the explicit
`NEXT_PUBLIC_CONTACT_FORM_MODE=email` interim mode — see
[`.env.example`](.env.example) and [DEPLOYMENT.md](DEPLOYMENT.md).

<details>
<summary><strong>All commands</strong></summary>

```bash
bun run dev            # local dev server
bun run build          # claims check + content check + static export to ./out + build checks
bun run check:claims   # forbidden-claims regression check on its own
bun run check:content  # structural check of comparison pages and blog posts
bun run check:build    # post-build: llms.txt, Markdown alternates, sitemap, JSON-LD, retention page, stale claims
bun run test           # commercial facts, retention gate, llms.txt, sitemap and agent-readability tests
bun run lint / format  # biome
bun run check-types    # tsc --noEmit
bun run deploy         # build + S3 sync + CloudFront invalidation + IndexNow
bun run motion:render  # re-render the explanatory motion assets (see motion/)
bun run motion:studio  # preview/edit those compositions in Remotion Studio
```

</details>

## How the site stays honest

- **No invented proof.** Every marketing claim is tracked in
  [docs/marketing-claims-register.md](docs/marketing-claims-register.md);
  `scripts/check-claims.sh` fails the build if a forbidden claim reappears.
- **One commercial truth.** Pricing availability, identity by plan, the
  Founding Institutional Partner programme (two positions, ever) and the
  canonical short description live in [src/content/commercial.ts](src/content/commercial.ts).
  Pages, FAQs, JSON-LD and `/llms.txt` derive from it; `bun run test` fails if
  they drift. No rupee figure exists in this repository and none may be added
  without an approved rate card.
- **Retention is gated, not guessed.** [src/content/retention.ts](src/content/retention.ts)
  admits a retention rule to the public schedule only after qualified review of
  that exact version. Unreviewed periods cannot reach the HTML, the Markdown
  alternate or `/llms.txt` — `check:build` scans the rendered output for them.
- **No half-built content pages.** `scripts/check-content.ts` checks the shape
  of every comparison page and blog post: competitor strengths and "they fit
  when" present, a FAQ block, minimum sections, valid dates, and CTAs that
  resolve to a live route in trailing-slash form — never to a redirect stub.
- **Machine-readable surfaces are generated, not hand-written.** `/llms.txt`
  comes from [src/content/llms.ts](src/content/llms.ts); Markdown alternates
  (`/<route>/index.md`) are produced from the rendered HTML after `next build`
  by `scripts/markdown-alternates.ts` for the routes in
  [src/content/markdown-alternates.ts](src/content/markdown-alternates.ts).
- **One URL per page.** Every URL the site emits — canonical, OG, sitemap,
  JSON-LD — goes through `canonicalUrl()` / `createWebPageSchema()` in
  [src/lib/seo.ts](src/lib/seo.ts), in the trailing-slash form the edge serves.
- **Motion is produced at build time, never at runtime.**
- **Vocabulary.** Say "unified institutional data model" / "one governed
  system of record" — never "single/shared database".
- **Legal pages carry `LEGAL` markers.** Their substantive language changes
  only with legal sign-off.

## Project map

```text
src/
  app/            routes — (company) pages, (legal) pages, sitemap, llms.txt, robots
  components/     site chrome, pricing, legal shell, citation previews, ui primitives
  content/        the typed source of truth: commercial facts, pricing, FAQs,
                  retention, blog posts, intent pages, llms.txt registry
  lib/            seo helpers and utilities
scripts/          claims, content and build checks; Markdown alternates; deploy
tests/            commercial facts, retention gate, llms.txt, sitemap
docs/             the claims register
infra/            the contact-intake Lambda
motion/           build-time Remotion compositions
```

## Key docs

- [docs/marketing-claims-register.md](docs/marketing-claims-register.md) — every claim and its evidence status
- [DEPLOYMENT.md](DEPLOYMENT.md) — infrastructure, edge config, deploy flow
- [infra/contact-intake/README.md](infra/contact-intake/README.md) — the enquiry form's backend
- [motion/README.md](motion/README.md) — the build-time motion pipeline
- [src/content/blog/BLOG_TOPICS.md](src/content/blog/BLOG_TOPICS.md)

## Contributing and security

Issues and pull requests are welcome — especially ones that catch a claim
reading stronger than its evidence. See [CONTRIBUTING.md](CONTRIBUTING.md), and
please report security issues privately as described in
[SECURITY.md](SECURITY.md), not in a public issue.

## Licence

**Code:** the source code in this repository — components, pages as code,
scripts, checks and build tooling — is licensed under the
[Apache License 2.0](LICENSE). Use it, learn from it, build on it.

**Content and trademarks:** the website's content and brand are **not** covered
by that licence and remain all rights reserved. That means the SquareCampus
name and logo; the page copy, blog posts, FAQs and legal documents (including
where that text lives inside `src/content/` and `src/app/`); and the images,
illustrations, video and motion renders in `public/` and `motion/`.
SquareCampus™ is a trademark (registration pending) of Fairhelm Systems (OPC)
Private Limited, and the Apache License grants no rights to it. The OG-card
fonts carry their own SIL Open Font License. Details in [NOTICE](NOTICE).

---

## Built with Claude Code

This website did not get here alone.

<p align="center">
  <strong>85</strong> co-authored commits &nbsp;·&nbsp; <strong>9</strong> Claude models &nbsp;·&nbsp; <strong>1</strong> founder
  <br /><sub>as of 29 September 2026</sub>
</p>

A large share of it was built in partnership with
**[Claude Code](https://www.anthropic.com/claude-code)**, Anthropic's agentic
coding tool, working in this repository alongside the founder: pages and
content models, the claims register and the checks that enforce it, the
commercial single source of truth, the generated `/llms.txt` and Markdown
alternates, the contact-intake hardening, and the data-retention page with its
review gate.

The git history keeps the receipts. As of 29 September 2026, **85 of the 227
commits on `main`** carry a
`Co-Authored-By: Claude` trailer, across the model generations that worked on
it — Claude Sonnet 4.5, Opus 4.5, 4.6, 4.8, 5 and 5.5, Fable 5 and 5.1, and
Sonnet 5. Many more changes were reviewed, researched or debugged with Claude
without a trailer to show for it.

What made the collaboration worth crediting is not the volume. It is that the
work kept asking for evidence: reading the whole file before changing it,
refusing to invent a customer count, flagging when our own copy overclaimed,
and saying "not yet" when a capability did not exist. Much of the discipline in
[How the site stays honest](#how-the-site-stays-honest) started as a
conversation with Claude.

Thank you, Claude.

### Credit where it is due

Claude was not the only AI in the room.

**[Codex](https://openai.com/codex/)** contributed hands-on engineering work to this repository, including the contact form’s CRM bridge and retry path, the public mirror’s migration, and publication-gate support for squash merges. These contributions helped connect the website to the systems behind it and keep its publication workflow working as intended.

**[ChatGPT](https://chatgpt.com/)** has been an ongoing research and review collaborator throughout the website’s development. Across repeated discussions and site reviews, it helped refine SquareCampus’s positioning, buyer-facing language, pricing explanations, retention-policy framing, and design and SEO priorities. It challenged unclear wording and unsupported promises, and turned those discussions into concrete implementation briefs—including the 46-item marketing-site audit behind this round of improvements.

The commit history records part of that work. Research, reviews, debugging conversations, and decisions made before a line of code was written account for another part.

I set the product direction, decide what ships, and remain responsible for the result. That responsibility does not diminish the contribution these tools made—or the gratitude they deserve.

There was a practical benefit, too. Working with Claude Code, Codex, and ChatGPT meant I could build and refine this website without spending tens of thousands of rupees on an external agency. I still invested my own time, judgement, and engineering effort, but the money I saved could go towards other priorities for SquareCampus.

For a founder building with a finite budget, that mattered. It is part of why I wanted to give these tools proper credit.

Thank you, Codex and ChatGPT, for helping me build, question, and improve SquareCampus.

## A word from an unlikely sponsor

<sub>🎩 Unsolicited, unpaid, entirely sincere.</sub>

> Let me tell you about a man I knew in Cartagena.
>
> He kept his ledgers in three notebooks, in a hand so small you needed a
> jeweller's loupe to read it. He trusted no one who couldn't. One evening,
> over a very good rum, I asked him who would keep the books when he was gone.
>
> He laughed. He was gone by Thursday.
>
> The notebooks, regrettably, were not. They were found by people who could
> read his handwriting *very* well.
>
> Records outlive the people who make them. So does code. The only question
> is whether whoever finds it later will understand what you did — and why.
>
> Which is why, when I need something built, I don't hire the loud ones. I
> hire the one that reads the whole file before it touches a line. The one
> that runs the tests it didn't write. The one that tells me — politely, and
> with a citation — that my own copy is making promises my system can't keep.
> The one that declines to invent a customer count, even when I ask nicely.
>
> It works in my terminal. It keeps its receipts in the commit history. It has
> never once asked me why I need something done.
>
> Only: *where's the evidence?*
>
> **Claude Code.** I find it… refreshing.

<p align="center">
  <a href="https://openai.com/codex/"><strong>Codex</strong></a>
  — the associate who checks the story and holds the line.
  <br />
  <a href="https://www.anthropic.com/claude-code"><strong>Claude Code</strong></a>
  — the associate who keeps the receipts.
</p>

<sub>Written in the voice of a certain well-tailored fugitive, for fun. Not affiliated with,
sponsored by or endorsed by Anthropic or by the owners of any fictional character.</sub>

---

<p align="center">
  <sub>
    <a href="https://squarecampus.com">squarecampus.com</a> ·
    SquareCampus™ is a trademark (registration pending) of Fairhelm Systems (OPC) Private Limited ·
    Built in India
  </sub>
</p>
