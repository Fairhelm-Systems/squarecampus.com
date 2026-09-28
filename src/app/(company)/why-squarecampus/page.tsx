import {
  ArrowRightLeft,
  CircleCheckBig,
  Database,
  FileCheck,
  FileSpreadsheet,
  Layers3,
  Shield,
  Sparkles,
} from "lucide-react";
import { ButtonLink } from "@/components/site/button-link";
import { PageSchema } from "@/components/site/page-schema";
import { Reveal } from "@/components/site/reveal";
import { SectionShell } from "@/components/site/section-shell";
import { ctaLabels, siteCtas } from "@/content/site-content";

const comparisonRows = [
  {
    label: "System model",
    erp: "Modules adapted or stitched together for education use cases.",
    pointTools: "Separate apps with separate records, permissions, and reporting logic.",
    squareCampus:
      "One governed operating model designed for institution-wide education operations.",
  },
  {
    label: "Daily work",
    erp: "Teams work around the product to keep data aligned.",
    pointTools: "Teams repeat the same context across tools.",
    squareCampus: "Teams work inside shared workflows with fewer handoffs and fewer dead zones.",
  },
  {
    label: "Reporting",
    erp: "Exports, reconciliation, and manual cleanup remain common.",
    pointTools: "Reporting becomes a stitching exercise after the fact.",
    squareCampus: "Leadership visibility comes from the live operating system itself.",
  },
  {
    label: "Accountability",
    erp: "Ownership blurs across modules and service layers.",
    pointTools: "Many vendors, unclear responsibility, broken context.",
    squareCampus: "One operating model, one vendor, one clear line of accountability.",
  },
  {
    label: "Implementation reality",
    erp: "Heavy and often generic to the institution.",
    pointTools: "Light to buy, heavy to coordinate over time.",
    squareCampus: "Guided rollout built around real institutional operating constraints.",
  },
];

const schoolOsPrinciples = [
  {
    title: "The data model is shared",
    icon: Database,
    body: "Admissions, academics, finance, communication, and operations do not compete to define the truth.",
  },
  {
    title: "The workflows are connected",
    icon: Layers3,
    body: "Approvals, communication, attendance, dues, and reporting happen in a coordinated sequence rather than across disconnected tabs.",
  },
  {
    title: "The institution is visible live",
    icon: FileSpreadsheet,
    body: "Leaders operate with current signals, not after-action exports assembled under pressure.",
  },
  {
    title: "The trust posture is product-level",
    icon: Shield,
    body: "Auditability, access control, and institutional reliability are built in because the system is the operating backbone.",
  },
] as const;

const switchingReasons = [
  "The institution wants fewer tools without losing operational depth.",
  "Leadership wants live visibility instead of delayed reporting rituals.",
  "Finance and compliance teams need controls that survive real scrutiny.",
  "Parents and staff need one clear place for notices, dues and follow-ups instead of several apps and message threads.",
] as const;

export default function WhyDifferentPage() {
  return (
    <main>
      <PageSchema
        name="Why SquareCampus"
        description="Why institutions choose a School Operating System over a conventional school ERP: ownership, exception handling, auditability and leadership visibility."
        path="/why-squarecampus"
      />

      <SectionShell className="pt-12 sm:pt-16">
        <Reveal immediate className="space-y-6">
          <p className="section-kicker">Why SquareCampus</p>
          <h1 className="max-w-4xl font-display text-4xl leading-none tracking-[-0.06em] sm:text-5xl lg:text-6xl">
            Not a rebranded ERP. Not a bundle of point tools.
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-[color:var(--muted-foreground)]">
            SquareCampus is school management software built as a connected School OS. Admissions,
            academics, fees and communication share one record, and the approvals, owners and audit
            history that connect them sit on that record too.
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={siteCtas.demoHref} label={ctaLabels.demo} />
            <ButtonLink href={siteCtas.platformHref} label="View platform" variant="secondary" />
          </div>
        </Reveal>
      </SectionShell>

      <SectionShell
        eyebrow="Comparison"
        title="What changes when you move from software stack to operating system"
        body="Five criteria worth checking in any system you evaluate, including this one."
      >
        <Reveal className="overflow-hidden rounded-[2rem] border border-[color:var(--line)]">
          <div className="grid bg-[color:var(--surface-strong)] md:grid-cols-[0.9fr_1fr_1fr_1fr]">
            <div className="border-b border-[color:var(--line)] p-5 md:border-b-0 md:border-r">
              <p className="section-kicker">Criteria</p>
            </div>
            <div className="border-b border-[color:var(--line)] p-5 md:border-b-0 md:border-r">
              <p className="font-display text-xl tracking-[-0.04em]">Traditional ERP</p>
            </div>
            <div className="border-b border-[color:var(--line)] p-5 md:border-b-0 md:border-r">
              <p className="font-display text-xl tracking-[-0.04em]">Point tools</p>
            </div>
            <div className="p-5">
              <p className="font-display text-xl tracking-[-0.04em]">SquareCampus School OS</p>
            </div>
          </div>
          <div className="divide-y divide-[color:var(--line)] bg-[color:var(--surface)]">
            {comparisonRows.map((row) => (
              <div key={row.label} className="grid md:grid-cols-[0.9fr_1fr_1fr_1fr]">
                <div className="border-r border-[color:var(--line)] px-5 py-5">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-[color:var(--muted-foreground)]">
                    {row.label}
                  </p>
                </div>
                <div className="border-r border-[color:var(--line)] px-5 py-5 text-sm leading-7 text-[color:var(--muted-foreground)]">
                  {row.erp}
                </div>
                <div className="border-r border-[color:var(--line)] px-5 py-5 text-sm leading-7 text-[color:var(--muted-foreground)]">
                  {row.pointTools}
                </div>
                <div className="px-5 py-5 text-sm leading-7 text-[color:var(--foreground)]">
                  {row.squareCampus}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </SectionShell>

      <SectionShell
        eyebrow="Why the School OS thesis matters"
        title="What “School OS” means in practice"
        body="Four properties you can ask to see in a demo. If a system cannot show them, the label does not apply."
      >
        <Reveal staggerChildren className="grid gap-4 md:grid-cols-2">
          {schoolOsPrinciples.map((item) => (
            <article
              key={item.title}
              data-reveal-item
              className="surface-panel rounded-[1.6rem] p-6"
            >
              <item.icon className="size-5 text-[color:var(--brand)]" />
              <h2 className="mt-5 font-display text-2xl tracking-[-0.04em]">{item.title}</h2>
              <p className="mt-3 text-base leading-7 text-[color:var(--muted-foreground)]">
                {item.body}
              </p>
            </article>
          ))}
        </Reveal>
      </SectionShell>

      <SectionShell
        eyebrow="Why institutions move"
        title="The switch usually starts with one pressure point and ends in a bigger realization"
        body="They may enter the conversation because of fees, reporting, admissions, communication, or compliance. They switch when they realize the deeper problem is fragmentation."
      >
        <Reveal className="grid gap-4 lg:grid-cols-[1fr_0.92fr]">
          <div className="surface-panel rounded-[1.8rem] p-7">
            <p className="section-kicker">Common switch triggers</p>
            <div className="mt-5 grid gap-3">
              {switchingReasons.map((reason) => (
                <div
                  key={reason}
                  className="rounded-[1.2rem] bg-[color:var(--surface-muted)] px-4 py-4 text-sm leading-6 text-[color:var(--muted-foreground)]"
                >
                  {reason}
                </div>
              ))}
            </div>
          </div>
          <div className="surface-panel-strong rounded-[1.8rem] p-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line)] bg-[color:var(--surface)] px-3 py-2 text-sm text-[color:var(--foreground)]">
              <Sparkles className="size-4 text-[color:var(--amber)]" />
              What “different” looks like in practice
            </div>
            <div className="mt-5 grid gap-3">
              {[
                {
                  icon: ArrowRightLeft,
                  text: "One system replaces fragmented vendor management and repeated internal workarounds.",
                },
                {
                  icon: FileCheck,
                  text: "Audit-friendly operations stop depending on who remembered to export or forward the right spreadsheet.",
                },
                {
                  icon: CircleCheckBig,
                  text: "The institution gains a calmer, more legible operating posture under pressure.",
                },
              ].map((item) => (
                <div
                  key={item.text}
                  className="rounded-[1.2rem] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-4 text-sm leading-6 text-[color:var(--muted-foreground)]"
                >
                  <item.icon className="mb-3 size-4 text-[color:var(--brand)]" />
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </SectionShell>

      <SectionShell className="pb-22">
        <Reveal className="surface-panel-strong rounded-[2rem] p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.82fr] lg:items-center">
            <div>
              <p className="section-kicker">See it in context</p>
              <h2 className="mt-4 font-display text-3xl tracking-[-0.05em] sm:text-4xl">
                Compare the School OS model against your current stack.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[color:var(--muted-foreground)]">
                The most useful demo is usually a direct comparison between your current operating
                reality and the connected model SquareCampus is designed to provide.
              </p>
            </div>
            <div className="grid gap-3">
              <ButtonLink href={siteCtas.demoHref} label={ctaLabels.demo} />
              <ButtonLink
                href={siteCtas.rolloutHref}
                label="See rollout model"
                variant="secondary"
              />
            </div>
          </div>
        </Reveal>
      </SectionShell>
    </main>
  );
}
