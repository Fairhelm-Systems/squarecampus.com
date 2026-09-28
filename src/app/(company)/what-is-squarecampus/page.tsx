import { Check } from "lucide-react";
import { ButtonLink } from "@/components/site/button-link";
import { DetailsFaq } from "@/components/site/details-faq";
import { FactTable } from "@/components/site/fact-table";
import { CTAGroup, Eyebrow, OperationalBadge } from "@/components/site/marketing";
import { MotionPoster } from "@/components/site/motion-poster";
import { Reveal } from "@/components/site/reveal";
import { SectionShell } from "@/components/site/section-shell";
import { SystemLayerGrid } from "@/components/site/system-layers";
import { motionAssets } from "@/content/motion-assets";
import { CANONICAL_PROMISE, RECORD_VS_DECISION } from "@/content/operational-pains";
import { ctaLabels, siteCtas } from "@/content/site-content";
import {
  AEGIS_DEFINITION,
  aegisBoundaries,
  CANONICAL_DEFINITION,
  dashboardVsDecisionLayer,
  entityFaqs,
  glossary,
  multiCampusContrast,
} from "@/content/what-is-squarecampus";

export default function WhatIsSquareCampusPage() {
  return (
    <main>
      {/* Canonical definition */}
      <SectionShell className="pt-12 sm:pt-16">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-14">
          <Reveal immediate className="space-y-6">
            <Eyebrow>Category and definition</Eyebrow>
            <h1 className="type-display">What is SquareCampus?</h1>
            <p className="type-body measure text-[color:var(--muted-foreground)]">
              {CANONICAL_DEFINITION}
            </p>
            <CTAGroup>
              <ButtonLink href={siteCtas.platformHref} label="See the four layers" variant="cta" />
              <ButtonLink href={siteCtas.demoHref} label={ctaLabels.demo} variant="secondary" />
            </CTAGroup>
          </Reveal>

          <Reveal immediate delay={120}>
            <div className="surface-panel-strong rounded-[var(--radius-panel-lg)] p-6 sm:p-8">
              <Eyebrow>The distinction that matters</Eyebrow>
              {/* A pull-quote, not a section heading: the sentence is long, and
                  the heading steps swamp the panel at laptop widths. */}
              <p className="type-quote mt-4">{RECORD_VS_DECISION}</p>
              <p className="type-support mt-5 border-t border-[color:var(--line)] pt-5">
                {CANONICAL_PROMISE}
              </p>
            </div>
          </Reveal>
        </div>
      </SectionShell>

      {/* Four layers */}
      <SectionShell
        id="layers"
        eyebrow="How it is organised"
        title="Four layers, each with an operational outcome."
        body="SquareCampus is not described by how many modules it contains. It is described by what each layer changes about the way the institution runs."
      >
        <Reveal>
          <SystemLayerGrid />
        </Reveal>
      </SectionShell>

      {/* Dashboard vs decision layer */}
      <SectionShell
        id="decision-layer"
        eyebrow="Dashboard versus decision layer"
        title="A bar chart shows a condition. A decision layer explains what to do about it."
        body="This is the difference between reporting that describes the institution and an operating layer that moves it."
      >
        {/* Tier 2: still only. The five stages are the literal answer to the
            heading above, so the alt text states them rather than decorating. */}
        <MotionPoster
          asset={motionAssets["operating-signal-to-action"]}
          className="mx-auto mb-5 w-full max-w-4xl"
          alt="A record becomes an exception, the exception is routed to a named owner, the owner acts with a recorded reason, and the action is committed to an append-only audit timeline."
        />

        <Reveal className="grid gap-4 lg:grid-cols-2">
          <div className="surface-quiet rounded-[var(--radius-panel)] p-6 sm:p-7">
            <Eyebrow>A dashboard tells you</Eyebrow>
            <ul className="mt-5 space-y-3">
              {dashboardVsDecisionLayer.dashboard.map((item) => (
                <li
                  key={item}
                  className="type-support border-t border-[color:var(--line)] pt-3 first:border-t-0 first:pt-0"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="surface-panel-strong rounded-[var(--radius-panel)] p-6 sm:p-7">
            <Eyebrow>A decision layer tells you</Eyebrow>
            <ul className="mt-5 space-y-3">
              {dashboardVsDecisionLayer.decisionLayer.map((item) => (
                <li key={item} className="type-support flex gap-2.5">
                  <Check aria-hidden className="mt-1 size-3.5 shrink-0 text-[color:var(--brand)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="surface-panel mt-5 rounded-[var(--radius-panel)] p-6 sm:p-7">
            <div className="flex flex-wrap items-center gap-3">
              <OperationalBadge tone="brand">AEGIS</OperationalBadge>
              <p className="type-support">{AEGIS_DEFINITION}</p>
            </div>
            <ul className="mt-5 grid gap-2.5 border-t border-[color:var(--line)] pt-5 sm:grid-cols-2">
              {aegisBoundaries.map((item) => (
                <li key={item} className="type-support flex gap-2.5">
                  <Check aria-hidden className="mt-1 size-3.5 shrink-0 text-[color:var(--brand)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </SectionShell>

      {/* Glossary. "School OS" has to mean something checkable, or it is a
          synonym for ERP. Each term is also emitted as DefinedTerm JSON-LD. */}
      <SectionShell
        id="glossary"
        eyebrow="What the words mean here"
        title="School OS, governance, exception ownership, accountability."
        body="These terms are used across the site with specific meanings. This is what each one commits SquareCampus to."
      >
        <Reveal>
          <dl className="grid gap-4 md:grid-cols-2">
            {glossary.map((entry) => (
              <div key={entry.term} className="surface-panel rounded-[var(--radius-panel)] p-6">
                <dt className="type-card-title">{entry.term}</dt>
                <dd className="type-support mt-3">{entry.definition}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={80} className="mt-8">
          <Eyebrow>Multi-campus governance versus supporting multiple campuses</Eyebrow>
          <FactTable
            className="mt-4"
            caption="How multi-campus governance differs from software that merely supports several campuses."
            columns={[
              { key: "supports", label: "Supports multiple campuses" },
              { key: "governs", label: "Multi-campus governance" },
            ]}
            rows={multiCampusContrast.map((row) => ({
              label: row.dimension,
              values: [row.supports, row.governs],
            }))}
          />
        </Reveal>
      </SectionShell>

      {/* Entity FAQ — includes the canonical ERP answer */}
      <SectionShell
        id="definition-faq"
        eyebrow="Direct answers"
        title="The questions people ask before they know what to call it."
      >
        <Reveal>
          <DetailsFaq items={entityFaqs} />
        </Reveal>
      </SectionShell>

      <SectionShell className="pb-22">
        <Reveal className="surface-panel-strong rounded-[var(--radius-panel-lg)] p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <Eyebrow>Next step</Eyebrow>
              <h2 className="type-section-title mt-4">
                The fastest way to understand a School OS is to point it at a real bottleneck.
              </h2>
              <p className="type-body measure mt-4 text-[color:var(--muted-foreground)]">
                Bring one cycle that consistently costs your institution time &mdash; collections,
                results, attendance follow-up or parent escalations &mdash; and we will map what a
                governed version of it looks like.
              </p>
            </div>
            <div className="grid gap-3">
              <ButtonLink
                href={siteCtas.demoHref}
                label={ctaLabels.demo}
                variant="cta"
                className="justify-center"
              />
              <ButtonLink
                href={siteCtas.pricingHref}
                label="See the commercial model"
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
