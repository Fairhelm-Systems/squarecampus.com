import { Check } from "lucide-react";
import { ButtonLink } from "@/components/site/button-link";
import {
  CTAGroup,
  Eyebrow,
  FeaturePanel,
  OperationalBadge,
  TrustNote,
} from "@/components/site/marketing";
import { MotionFigure } from "@/components/site/motion-figure";
import { Reveal } from "@/components/site/reveal";
import { SectionShell } from "@/components/site/section-shell";
import { FOUNDING_PARTNER_DEMO_HREF, foundingPartners } from "@/content/founding-partners";
import { motionAssets } from "@/content/motion-assets";
import { siteCtas } from "@/content/site-content";

const { page } = foundingPartners;

export default function LaunchPartnersPage() {
  return (
    <main>
      {/* 1 — Hero. `immediate` keeps the H1 painted on the first frame instead
          of waiting for hydration to remove the reveal's opacity: 0. */}
      <SectionShell className="pt-12 sm:pt-16">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-14">
          <Reveal immediate className="space-y-6">
            <Eyebrow>{page.hero.eyebrow}</Eyebrow>
            <h1 className="type-display">{page.hero.heading}</h1>
            <p className="type-body measure text-[color:var(--muted-foreground)]">
              {page.hero.body}
            </p>
            <CTAGroup>
              <ButtonLink
                href={FOUNDING_PARTNER_DEMO_HREF}
                label="Discuss founding partnership"
                variant="cta"
                className="w-full justify-center sm:w-auto"
              />
              <ButtonLink
                href="#partnership-path"
                label="See the 60–90 day pilot"
                variant="secondary"
                className="w-full justify-center sm:w-auto"
              />
            </CTAGroup>
            <TrustNote>{page.hero.trustLine}</TrustNote>
          </Reveal>

          <Reveal immediate delay={120} className="lg:pt-2">
            <FeaturePanel tone="strong">
              <Eyebrow>What a founding pilot is</Eyebrow>
              <p className="font-display mt-4 text-2xl leading-[1.25] tracking-[-0.04em] sm:text-[1.75rem]">
                One measurable bottleneck, a written baseline, and a decision taken against
                evidence.
              </p>
              <dl className="mt-7 border-t border-[color:var(--line)]">
                {[
                  { term: "Cohort", detail: "Small and selected" },
                  { term: "Window", detail: "60–90 days" },
                  { term: "Scope", detail: "One campus or one workflow bundle" },
                  { term: "Close", detail: "Convert, extend or stop" },
                ].map((row) => (
                  <div
                    key={row.term}
                    className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-[color:var(--line)] py-3.5"
                  >
                    <dt className="eyebrow">{row.term}</dt>
                    <dd className="text-sm leading-6 text-[color:var(--foreground)]">
                      {row.detail}
                    </dd>
                  </div>
                ))}
              </dl>
            </FeaturePanel>
          </Reveal>
        </div>
      </SectionShell>

      {/* 2 — What founding status changes */}
      <SectionShell
        id="what-changes"
        eyebrow="What founding status changes"
        title={page.pillarsHeading}
        body="Three pillars, not a wall of feature cards. Each one is bounded by the proposal and the signed order form."
      >
        <Reveal staggerChildren className="grid gap-4 lg:grid-cols-3">
          {page.pillars.map((pillar) => (
            <article
              key={pillar.number}
              data-reveal-item
              className="surface-panel flex flex-col rounded-[var(--radius-panel)] p-6 sm:p-7"
            >
              <p className="eyebrow">{pillar.number}</p>
              <h3 className="type-card-title mt-4">{pillar.title}</h3>
              <p className="type-support mt-3">{pillar.summary}</p>
              <ul className="mt-6 border-t border-[color:var(--line)]">
                {pillar.points.map((point) => (
                  <li
                    key={point}
                    className="type-support flex gap-3 border-b border-[color:var(--line)] py-3"
                  >
                    <Check
                      aria-hidden
                      className="mt-1 size-3.5 shrink-0 text-[color:var(--brand)]"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </Reveal>
      </SectionShell>

      {/* 3 — Managed digital campus */}
      <SectionShell
        id="digital-campus"
        eyebrow={page.digitalCampus.eyebrow}
        title={page.digitalCampus.heading}
        body={page.digitalCampus.body}
      >
        <Reveal>
          <div className="surface-panel-strong rounded-[var(--radius-panel-lg)] p-6 sm:p-8 lg:p-10">
            {/* 8 capabilities: two columns divide evenly, three leave a ragged row. */}
            <ul className="grid gap-3 sm:grid-cols-2">
              {page.digitalCampus.capabilities.map((capability) => (
                <li
                  key={capability}
                  className="type-support surface-quiet rounded-[var(--radius-chip)] px-5 py-4"
                >
                  {capability}
                </li>
              ))}
            </ul>
            <TrustNote className="mt-7">{page.digitalCampus.scopeNote}</TrustNote>
          </div>
        </Reveal>
      </SectionShell>

      {/* 4 — Partnership path. The page's one motion asset sits here, beside the
          steps it explains, and is below the fold on every breakpoint. */}
      <SectionShell
        id="partnership-path"
        className="scroll-mt-24"
        eyebrow={page.path.eyebrow}
        title={page.path.heading}
        body="Four stages. Each one has to produce something the next stage can be judged against."
      >
        <Reveal>
          <MotionFigure
            asset={motionAssets["founding-partner-path"]}
            redundant
            className="mx-auto mb-5 w-full max-w-4xl"
          />
        </Reveal>

        <Reveal staggerChildren className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {page.path.steps.map((step) => (
            <article
              key={step.number}
              data-reveal-item
              className="surface-panel rounded-[var(--radius-panel)] p-6"
            >
              <p className="eyebrow">{step.number}</p>
              <h3 className="type-card-title mt-4">{step.title}</h3>
              <p className="type-support mt-3">{step.body}</p>
            </article>
          ))}
        </Reveal>

        <Reveal delay={80}>
          <div className="surface-panel mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 rounded-[var(--radius-panel)] px-6 py-5">
            <OperationalBadge tone="brand">60–90 day pilot</OperationalBadge>
            <p className="type-support flex-1">
              The same sequencing, migration discipline and parallel validation described on the{" "}
              <a
                href="/rollout/"
                className="underline underline-offset-2 hover:text-[color:var(--foreground)]"
              >
                rollout page
              </a>
              , run with founder-level involvement.
            </p>
          </div>
        </Reveal>
      </SectionShell>

      {/* 5 — Who should apply */}
      <SectionShell
        id="who-should-apply"
        eyebrow={page.fit.eyebrow}
        title={page.fit.heading}
        body="Founding partnership asks for something from the institution as well. These are the signals that a pilot will produce usable evidence."
      >
        <Reveal className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="surface-panel rounded-[var(--radius-panel)] p-6 sm:p-8">
            <Eyebrow>Good-fit signals</Eyebrow>
            <ul className="mt-5">
              {page.fit.signals.map((signal) => (
                <li
                  key={signal}
                  className="type-support flex gap-3 border-t border-[color:var(--line)] py-3.5 first:border-t-0 first:pt-0"
                >
                  <Check aria-hidden className="mt-1 size-3.5 shrink-0 text-[color:var(--teal)]" />
                  <span>{signal}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="surface-quiet rounded-[var(--radius-panel)] p-6 sm:p-8">
            <Eyebrow>What founding status is not</Eyebrow>
            <p className="type-body mt-5 text-[color:var(--muted-foreground)]">
              {page.fit.boundary}
            </p>
            <div className="mt-7 grid gap-3">
              <ButtonLink
                href={siteCtas.pricingHref}
                label="How the licence is composed"
                variant="secondary"
                className="justify-center"
              />
              <ButtonLink
                href={siteCtas.securityHref}
                label="Review the trust posture"
                variant="secondary"
                className="justify-center"
              />
            </div>
          </div>
        </Reveal>
      </SectionShell>

      {/* 6 — Objection handling. The single biggest conversion obstacle for a
          young company is not interest, it is the board meeting afterwards.
          Answering the hard questions in public — including "why would we
          depend on you" — is worth more than another benefit card, and it
          costs nothing in claims because every answer points at something the
          site already substantiates. */}
      <SectionShell
        id="before-you-commit"
        className="scroll-mt-24"
        eyebrow={page.objections.eyebrow}
        title={page.objections.heading}
        body={page.objections.body}
      >
        <Reveal staggerChildren className="grid gap-4 lg:grid-cols-2">
          {page.objections.items.map((item) => (
            <article
              key={item.question}
              data-reveal-item
              className="surface-panel rounded-[var(--radius-panel)] p-6 sm:p-7"
            >
              <h3 className="type-card-title">{item.question}</h3>
              <p className="type-support mt-3">{item.answer}</p>
            </article>
          ))}
        </Reveal>
      </SectionShell>

      {/* 7 — Final CTA */}
      <SectionShell className="pb-12 sm:pb-22">
        <Reveal className="surface-panel-strong rounded-[var(--radius-panel-lg)] p-6 sm:p-8 lg:p-10">
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <Eyebrow>{page.finalCta.eyebrow}</Eyebrow>
              <h2 className="type-section-title mt-4">{page.finalCta.heading}</h2>
              <p className="type-body measure mt-4 text-[color:var(--muted-foreground)]">
                {page.finalCta.body}
              </p>
              <TrustNote className="mt-6">{page.finalCta.microcopy}</TrustNote>
            </div>
            <div className="grid gap-3">
              <ButtonLink
                href={FOUNDING_PARTNER_DEMO_HREF}
                label="Discuss founding partnership"
                variant="cta"
                className="justify-center"
              />
              <ButtonLink
                href={siteCtas.rolloutHref}
                label="Review rollout and trust"
                variant="secondary"
                className="justify-center"
              />
            </div>
          </div>
        </Reveal>
      </SectionShell>
    </main>
  );
}
