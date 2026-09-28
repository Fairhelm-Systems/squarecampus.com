# Contributing

Thank you for helping improve squarecampus.com. Issues and pull requests are
welcome — especially ones that catch a claim reading stronger than its
evidence.

## How changes reach this repository

This public repository is a read-only mirror of our internal repository. A
pull request here is reviewed and merged upstream; the change then appears in
the mirror, crediting you with a `Co-authored-by` trailer.

## Licensing of contributions

By submitting a contribution you agree that:

- code you contribute is licensed under the [Apache License 2.0](LICENSE),
  the same licence as the rest of the source; and
- any change to the website's content (copy, blog posts, FAQs, legal text,
  images) may be used, edited and published by Fairhelm Systems (OPC) Private
  Limited as part of squarecampus.com, where it stays all rights reserved like
  the rest of the content (see [NOTICE](NOTICE)).

## Before you open a pull request

```bash
bun install
bun run lint && bun run check-types && bun run test
NEXT_PUBLIC_CONTACT_FORM_MODE=email bun run build
```

`bun run build` runs the claims, content and build checks. If a claim check
fails, read [docs/marketing-claims-register.md](docs/marketing-claims-register.md)
before changing the pattern: the register records why each claim is allowed or
forbidden.

Legal pages carry a `LEGAL` marker. Changes to their substantive language need
legal sign-off, so please open an issue rather than a pull request for those.

Please report security issues privately, as described in [SECURITY.md](SECURITY.md).
