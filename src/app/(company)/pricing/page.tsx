import { Building2, CalendarRange, Check, FileText, Minus, ShieldCheck } from "lucide-react";
import { CommercialModel } from "@/components/pricing/commercial-model";
import { PlanArchitecture } from "@/components/pricing/plan-architecture";
import { PlanMatrix } from "@/components/pricing/plan-matrix";
import { ScopedCostGrid } from "@/components/pricing/scoped-cost-grid";
import { VolumeRationale } from "@/components/pricing/volume-rationale";
import { ButtonLink } from "@/components/site/button-link";
import { ContactForm } from "@/components/site/contact-form";
import { DetailsFaq } from "@/components/site/details-faq";
import { FactTable } from "@/components/site/fact-table";
import {
  CTAGroup,
  Eyebrow,
  FeaturePanel,
  OperationalBadge,
  TrustNote,
} from "@/components/site/marketing";
import { Reveal } from "@/components/site/reveal";
import { SectionShell } from "@/components/site/section-shell";
import { enterpriseBeyondModules, fit, identity, pricingAvailability } from "@/content/commercial";
import { FORM_ANCHORS, formCopy } from "@/content/demo-intents";
import { FOUNDING_PARTNER_DEMO_HREF } from "@/content/founding-partners";
import {
  ALLOWANCE_NOTE,
  DISCOVERY_NOTE,
  enterpriseForSmallerInstitutions,
  pilot,
  pricingFaqs,
  proposalInputs,
} from "@/content/pricing";
import { ctaLabels, siteCtas } from "@/content/site-content";

const heroSignals = [
  { label: "Licence", value: "Annual, institutional" },
  { label: "Calculated on", value: "Student-volume bands" },
  { label: "Shaped by", value: "The plan chosen and the institution's complexity" },
] as const;

export default function PricingPage() {
  return (
    <main>
      {/* 1 — Hero */}
      <SectionShell className="pt-12 sm:pt-16">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-14">
          <Reveal immediate className="space-y-6">
            <Eyebrow>Commercial model</Eyebrow>
            <h1 className="type-display">
              Pricing that scales with the institution &mdash; not with software complexity.
            </h1>
            <p className="type-body measure text-[color:var(--muted-foreground)]">
              One annual institutional licence, calculated on student-volume bands and shaped by the
              plan you choose. The three plans are below; figures follow in a written proposal after
              a short discovery.
            </p>
            <CTAGroup>
              <ButtonLink href={siteCtas.proposalHref} label={ctaLabels.proposal} variant="cta" />
              <ButtonLink href="#plans" label="Compare the plans" variant="secondary" />
            </CTAGroup>
            <TrustNote>
              No hidden module wall. No compulsory rip-and-replace. Scope, ownership and success
              measures agreed before deployment.
            </TrustNote>
          </Reveal>

          <Reveal delay={120} className="lg:pt-2">
            <FeaturePanel tone="strong">
              <Eyebrow>How pricing works</Eyebrow>
              <p className="type-support mt-4">
                Student numbers set the scale. The plan sets how much operational and governance
                control you get. The two are decided separately.
              </p>

              {/* Stacked rows rather than three columns: the labels are very
                  different lengths, so a column layout goes ragged in this
                  narrow panel at laptop widths. */}
              <dl className="mt-5 border-t border-[color:var(--line)]">
                {heroSignals.map((signal) => (
                  <div
                    key={signal.label}
                    className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-[color:var(--line)] py-3.5"
                  >
                    <dt className="eyebrow">{signal.label}</dt>
                    <dd className="text-sm leading-6 text-[color:var(--foreground)]">
                      {signal.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </FeaturePanel>
          </Reveal>
        </div>
      </SectionShell>

      {/* 2 — Plans, straight after a short introduction (audit SC-013). */}
      <SectionShell
        id="plans"
        eyebrow="Plan architecture"
        title="Three levels of institutional command, not three feature bundles."
        body="Each plan represents progressively deeper control over how the institution runs: connected core operations, then visibility and accountability, then trust-level governance across campuses."
      >
        <Reveal>
          <PlanArchitecture />
        </Reveal>

        <Reveal delay={80} className="md:mt-12">
          <PlanMatrix />
        </Reveal>

        {/* Enterprise is chosen by governance requirement, not enrolment. The
            counter-note keeps this from reading as "everyone buy Enterprise". */}
        <Reveal delay={80} className="mt-10 sm:mt-12">
          <div className="surface-panel-strong rounded-[var(--radius-panel-lg)] p-6 sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12">
              <div>
                <OperationalBadge tone="brand" icon={Building2}>
                  {enterpriseForSmallerInstitutions.compact}
                </OperationalBadge>
                <h3 className="type-section-title mt-5">
                  {enterpriseForSmallerInstitutions.heading}
                </h3>
                <p className="type-body measure mt-4 text-[color:var(--muted-foreground)]">
                  {enterpriseForSmallerInstitutions.body}
                </p>
                <p className="type-support mt-4 border-l-2 border-[color:var(--line-strong)] pl-4">
                  {enterpriseForSmallerInstitutions.counterNote}
                </p>
              </div>

              <div>
                <p className="type-support mt-5 border-t border-[color:var(--line)] pt-5">
                  {ALLOWANCE_NOTE}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </SectionShell>

      {/* 3 — How the licence is composed (the detail, below the plans) */}
      <SectionShell
        id="model"
        eyebrow="How the licence is composed"
        title="Four inputs, agreed openly, before any number is issued."
        body="The annual platform licence is not a module count. It is the sum of institutional scale, the plan selected (how much operational and governance control it includes), the complexity of the institution and how the platform is delivered."
      >
        <Reveal>
          <CommercialModel />
        </Reveal>
      </SectionShell>

      {/* 3b — What Enterprise adds beyond ordinary ERP modules. A table, not a
          slogan: procurement reads it dimension by dimension. */}
      <SectionShell
        id="enterprise-adds"
        eyebrow="What Enterprise adds"
        title="Enterprise is not Pro with more modules."
        body="An ordinary ERP grows by adding modules. Enterprise grows by adding institutional governance: the structure, command, identity, audit and deployment controls a trust or a complex institution actually has to run on."
      >
        <Reveal>
          <FactTable
            caption="What Enterprise adds beyond ordinary ERP modules, by dimension."
            columns={[
              { key: "modules", label: "Ordinary ERP modules" },
              { key: "enterprise", label: "SquareCampus Enterprise" },
            ]}
            rows={enterpriseBeyondModules.map((row) => ({
              label: row.dimension,
              values: [row.modules, row.enterprise],
            }))}
          />
        </Reveal>

        {/* Identity by plan is stated on the plan cards, in the comparison and
            in the FAQ; the full explanation lives on /security/#identity. */}
        <Reveal delay={80}>
          <p className="surface-panel mt-4 flex items-start gap-3 rounded-[var(--radius-panel)] px-6 py-4 text-sm leading-6 text-[color:var(--muted-foreground)]">
            <ShieldCheck aria-hidden className="mt-1 size-4 shrink-0 text-[color:var(--brand)]" />
            <span>
              {identity.principle}{" "}
              <a
                href="/security/#identity"
                className="whitespace-nowrap text-[color:var(--foreground)] underline underline-offset-4"
              >
                Sign-in options by plan
              </a>
            </span>
          </p>
        </Reveal>
      </SectionShell>

      {/* 3d — Fit. Buyer qualification, not self-deprecation: the institution
          that only needs attendance and fees should find out here. */}
      <SectionShell
        id="fit"
        eyebrow="Fit"
        title="Who SquareCampus is priced for, and who it is not."
        body={pricingAvailability.positioning}
      >
        <Reveal className="grid gap-4 lg:grid-cols-2">
          <div className="surface-panel rounded-[var(--radius-panel)] p-6 sm:p-8">
            <Eyebrow>Best suited to</Eyebrow>
            <ul className="mt-5">
              {fit.bestFor.map((item) => (
                <li
                  key={item}
                  className="type-support flex gap-3 border-t border-[color:var(--line)] py-3.5 first:border-t-0 first:pt-0"
                >
                  <Check aria-hidden className="mt-1 size-3.5 shrink-0 text-[color:var(--teal)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="surface-quiet rounded-[var(--radius-panel)] p-6 sm:p-8">
            <Eyebrow>SquareCampus may not be the right fit if</Eyebrow>
            <ul className="mt-5">
              {fit.notRightFitIf.map((item) => (
                <li
                  key={item}
                  className="type-support flex gap-3 border-t border-[color:var(--line)] py-3.5 first:border-t-0 first:pt-0"
                >
                  <Minus
                    aria-hidden
                    className="mt-1 size-3.5 shrink-0 text-[color:var(--muted-foreground)]"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </SectionShell>

      {/* 4 — Why volume-based pricing */}
      <SectionShell
        id="volume"
        eyebrow="Volume-based pricing"
        title="The marginal rate reduces as enrolment grows."
        body="Student volume sets platform scale, and larger volumes use the shared platform foundation more efficiently. The commercial model reflects those economies rather than imposing a flat rate for every institution."
      >
        <Reveal>
          <VolumeRationale />
        </Reveal>
      </SectionShell>

      {/* 5 — What shapes the proposal */}
      <SectionShell
        id="proposal"
        eyebrow="What shapes the proposal"
        title="The inputs we establish during institutional discovery."
        body="A proposal is only useful if it reflects the institution as it actually operates. These are the dimensions mapped before commercial terms are issued."
      >
        <Reveal staggerChildren className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {proposalInputs.map((input) => (
            <div
              key={input.label}
              data-reveal-item
              className="surface-quiet rounded-[var(--radius-chip)] px-5 py-5"
            >
              <h3 className="text-sm font-medium text-[color:var(--foreground)]">{input.label}</h3>
              <p className="type-support mt-2">{input.detail}</p>
            </div>
          ))}
        </Reveal>

        <Reveal delay={80}>
          <div className="surface-panel mt-5 flex flex-wrap items-center gap-x-4 gap-y-3 rounded-[var(--radius-panel)] px-6 py-5">
            <FileText aria-hidden className="size-5 shrink-0 text-[color:var(--brand)]" />
            <p className="text-sm leading-6 text-[color:var(--foreground)]">{DISCOVERY_NOTE}</p>
            <ButtonLink
              href={siteCtas.proposalHref}
              label={ctaLabels.proposal}
              variant="link"
              className="ml-auto"
            />
          </div>
        </Reveal>
      </SectionShell>

      {/* 6 — What is priced separately */}
      <SectionShell
        id="scoped-separately"
        eyebrow="Included versus separately scoped"
        title="No hidden subsidies. No surprise implementation bill."
        body="The licence already covers your plan, the apps, self-serve reports, implementation and support, a monthly usage allowance and, from Pro, data migration. Anything else is optional and priced in the proposal before you sign."
      >
        <Reveal>
          <ScopedCostGrid />
        </Reveal>
      </SectionShell>

      {/* 7 — Founding-partner pilot */}
      <SectionShell
        id="pilot"
        eyebrow="Founding-partner pilot"
        title="The lowest-risk way to establish evidence before committing."
        body="A pilot is a measured operational exercise, not a trial account. It runs on a written baseline and closes against an agreed metric. For the two Founding Institutional Partner positions it runs inside that programme."
      >
        <Reveal>
          <div className="surface-panel-strong rounded-[var(--radius-panel-lg)] p-6 sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
              <div>
                <OperationalBadge tone="brand" icon={CalendarRange}>
                  {pilot.window}
                </OperationalBadge>
                <p className="type-section-title mt-5 text-[color:var(--foreground)]">
                  Convert, extend or stop &mdash; decided on evidence.
                </p>
                <p className="type-support mt-4">
                  One campus or one workflow bundle, implemented with founder-level involvement, and
                  closed against the baseline written down at the start.
                </p>
                <CTAGroup className="mt-7">
                  <ButtonLink
                    href={FOUNDING_PARTNER_DEMO_HREF}
                    label={ctaLabels.foundingPartner}
                    variant="cta"
                  />
                  <ButtonLink
                    href={siteCtas.launchPartnersHref}
                    label="Founding Institutional Partners"
                    variant="link"
                  />
                </CTAGroup>
              </div>

              <dl className="grid gap-3 sm:grid-cols-2">
                {pilot.points.map((point) => (
                  <div
                    key={point.term}
                    className="rounded-[var(--radius-chip)] border border-[color:var(--line)] bg-[color:var(--surface-muted)] px-5 py-5"
                  >
                    <dt className="eyebrow">{point.term}</dt>
                    <dd className="type-support mt-2.5">{point.detail}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>
      </SectionShell>

      {/* 8 — Procurement FAQ */}
      <SectionShell
        id="procurement-faq"
        eyebrow="Procurement questions"
        title="The commercial questions institutions ask before signing."
        body="Answers here describe how the model works. The signed order form governs the specific terms for your institution."
      >
        <Reveal>
          <DetailsFaq items={pricingFaqs} />
        </Reveal>
      </SectionShell>

      {/* 9 — Request a proposal. Pricing's own next step, with its own form
          (audit SC-005): the label and the destination say the same thing. */}
      <SectionShell id={FORM_ANCHORS.proposal} className="scroll-mt-28 pb-22">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal className="space-y-6">
            <Eyebrow>Next step</Eyebrow>
            <h2 className="type-section-title">
              Price the institution you operate &mdash; not a generic software package.
            </h2>
            <p className="type-body measure text-[color:var(--muted-foreground)]">
              Bring your campus structure, student volume, the workflows in scope, the migration you
              are carrying and the governance your board expects. We map them, then issue a written
              proposal against that reality.
            </p>
            <CTAGroup>
              <ButtonLink href={siteCtas.demoHref} label={ctaLabels.demo} variant="secondary" />
              <ButtonLink
                href={siteCtas.rolloutHref}
                label="See how rollout works"
                variant="ghost"
              />
            </CTAGroup>
          </Reveal>
          <Reveal delay={120} className="surface-panel-strong rounded-[2rem] p-6 lg:p-8">
            <Eyebrow>{formCopy.proposal.eyebrow}</Eyebrow>
            <h3 className="mt-4 font-display text-3xl tracking-[-0.05em]">
              {formCopy.proposal.heading}
            </h3>
            <p className="mt-3 max-w-xl text-base leading-7 text-[color:var(--muted-foreground)]">
              {formCopy.proposal.body}
            </p>
            <div className="mt-6">
              <ContactForm intent="proposal" />
            </div>
          </Reveal>
        </div>
      </SectionShell>
    </main>
  );
}
