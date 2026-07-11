import {
  BellRing,
  Building2,
  ChartNoAxesCombined,
  Fingerprint,
  Landmark,
  MessageSquareShare,
  Radar,
  ScrollText,
  ShieldCheck,
  Sparkles,
  WalletCards,
} from "lucide-react";
import type { Metadata } from "next";
import Script from "next/script";
import { AegisConsole } from "@/components/site/aegis-console";
import { AegisIntelligenceVisual } from "@/components/site/aegis-intelligence-visual";
import { ButtonLink } from "@/components/site/button-link";
import { Reveal } from "@/components/site/reveal";
import { SectionShell } from "@/components/site/section-shell";
import { siteCtas } from "@/content/site-content";
import {
  createAlternates,
  createBreadcrumbSchema,
  createWebPageSchema,
  SEO_CONFIG,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: "AEGIS — Governed Intelligence for School Operations",
  description:
    "AEGIS (Adaptive Enterprise Governance & Intelligence System) is SquareCampus' governed intelligence layer: role-aware answers, exception detection, and audit-ready decision support for school leaders. Ask AEGIS. Don't chase reports.",
  alternates: createAlternates("/aegis"),
};

const roleScenarios = [
  {
    role: "Trust leadership",
    icon: Landmark,
    question: "“How is the institution actually doing this term?”",
    body: "A trust-level view across campuses: fee exposure, attendance drift, academic health, and operational exceptions — without waiting for stitched reporting packs.",
  },
  {
    role: "Principal",
    icon: Building2,
    question: "“What needs my attention before the review meeting?”",
    body: "Contextual operational insight for one campus: exceptions surfaced early, follow-ups tracked, and the story behind each number one question away.",
  },
  {
    role: "Finance & accounts",
    icon: WalletCards,
    question: "“Where is collection drifting, and why?”",
    body: "Dues, receipts, concessions, and approval history on live records — with anomalies flagged before they become term-end surprises.",
  },
  {
    role: "Operations & admin",
    icon: MessageSquareShare,
    question: "“Which follow-ups slipped this week?”",
    body: "Communication trails, acknowledgements, transport and service exceptions — connected to the same student and family context staff already work in.",
  },
] as const;

const governancePillars = [
  {
    title: "Role-based, always",
    icon: Fingerprint,
    body: "AEGIS answers within the same RBAC scopes as the rest of SquareCampus. A principal sees their campus; a trust admin sees the trust. No side doors.",
  },
  {
    title: "Tenant boundaries respected",
    icon: ShieldCheck,
    body: "Institutional data stays inside institutional boundaries. AEGIS reads your live operating records — it doesn't pool them into someone else's model.",
  },
  {
    title: "Auditable by default",
    icon: ScrollText,
    body: "Every question, answer, and suggested action lands on the audit trail — so intelligence strengthens governance instead of bypassing it.",
  },
  {
    title: "Decision support, not noise",
    icon: ChartNoAxesCombined,
    body: "AEGIS is not a generic chatbot. It is a controlled intelligence layer that helps management ask sharper questions and act with operational clarity.",
  },
] as const;

const eraComparison = [
  {
    legacy:
      "Ask the office to prepare a report, wait days, get a spreadsheet that's already stale.",
    aegis: "Ask AEGIS in plain language and get an answer from live records, in seconds.",
  },
  {
    legacy: "Exceptions surface at term end, when the damage is already done.",
    aegis: "Attendance, fee, academic, and communication exceptions are flagged as they emerge.",
  },
  {
    legacy: "Every export is another uncontrolled copy of student data floating around.",
    aegis: "Answers stay inside role-based permissions, tenant boundaries, and audit trails.",
  },
  {
    legacy: "Leadership sees each campus through a different lens, stitched by hand.",
    aegis:
      "One governed, trust-level view across campuses — with campus-level accountability intact.",
  },
] as const;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    createWebPageSchema({
      name: "AEGIS — Governed Intelligence for School Operations",
      description:
        "AEGIS is SquareCampus' governed intelligence layer for school leaders: role-aware answers, exception detection, and audit-ready decision support.",
      url: `${SEO_CONFIG.baseUrl}/aegis`,
    }),
    createBreadcrumbSchema([
      { name: "Home", url: SEO_CONFIG.baseUrl },
      { name: "AEGIS", url: `${SEO_CONFIG.baseUrl}/aegis` },
    ]),
  ],
};

export default function AegisPage() {
  return (
    <main>
      <Script
        id="aegis-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <SectionShell className="pt-12 sm:pt-16">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <Reveal className="space-y-6">
            <p className="section-kicker inline-flex items-center gap-2">
              <Radar className="size-3.5 text-(--brand)" />
              Adaptive Enterprise Governance &amp; Intelligence System
            </p>
            <h1 className="font-display text-4xl leading-none tracking-[-0.06em] sm:text-5xl lg:text-[4.4rem]">
              Ask AEGIS. Don&rsquo;t chase reports.
            </h1>
            <p className="max-w-xl text-lg leading-8 text-muted-foreground">
              AEGIS is SquareCampus&rsquo; governed intelligence layer for school leaders, trust
              administrators, principals, and operational teams. Instead of chasing scattered
              reports, ask what needs attention — across attendance, fees, academics, communication,
              compliance, and campus operations.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={siteCtas.demoHref} label="See AEGIS in a guided demo" />
              <ButtonLink
                href={siteCtas.platformHref}
                label="Explore the platform"
                variant="secondary"
              />
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {["Not a generic chatbot", "RBAC-scoped answers", "Audit trail on every query"].map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-full border border-(--line) bg-(--surface) px-3 py-2 font-mono text-[0.56rem] uppercase tracking-[0.18em] text-muted-foreground"
                  >
                    {item}
                  </span>
                )
              )}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <AegisConsole />
          </Reveal>
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Who asks AEGIS"
        title="Built for the people accountable for the institution"
        body="Every role gets decision support inside its own permissions — the question is the interface, the governance is the guarantee."
      >
        <Reveal staggerChildren className="grid gap-4 md:grid-cols-2">
          {roleScenarios.map((scenario) => (
            <article
              key={scenario.role}
              data-reveal-item
              className="surface-panel rounded-[1.6rem] p-6"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="section-kicker">{scenario.role}</p>
                <scenario.icon className="size-5 shrink-0 text-(--brand)" />
              </div>
              <h2 className="mt-4 font-display text-2xl tracking-[-0.04em]">{scenario.question}</h2>
              <p className="mt-3 text-base leading-7 text-muted-foreground">{scenario.body}</p>
            </article>
          ))}
        </Reveal>
      </SectionShell>

      <SectionShell
        eyebrow="Governance first"
        title="Intelligence that strengthens control instead of leaking it"
        body="Most 'AI in ERP' pitches bolt a chatbot onto old software. AEGIS was designed the other way around: governance first, intelligence inside it."
      >
        <Reveal staggerChildren className="grid gap-4 md:grid-cols-2">
          {governancePillars.map((pillar) => (
            <article
              key={pillar.title}
              data-reveal-item
              className="surface-panel rounded-[1.6rem] p-6"
            >
              <pillar.icon className="size-5 text-(--teal)" />
              <h2 className="mt-5 font-display text-2xl tracking-[-0.04em]">{pillar.title}</h2>
              <p className="mt-3 text-base leading-7 text-muted-foreground">{pillar.body}</p>
            </article>
          ))}
        </Reveal>
      </SectionShell>

      <SectionShell
        eyebrow="Context is the moat"
        title="AEGIS works because the operating system underneath is connected"
        body="Generic assistants guess. AEGIS reads the same role graph, timelines, fee state, and communication trails that already run your institution inside SquareCampus."
      >
        <Reveal className="mx-auto max-w-3xl">
          <AegisIntelligenceVisual />
        </Reveal>
      </SectionShell>

      <SectionShell
        eyebrow="Before and after"
        title="The report-chasing era is over"
        body="If your current ERP's answer to every leadership question is 'we'll prepare a report', the comparison below will feel familiar."
      >
        <Reveal staggerChildren className="grid gap-4">
          {eraComparison.map((row) => (
            <article key={row.aegis} data-reveal-item className="grid gap-3 lg:grid-cols-2">
              <div className="rounded-[1.4rem] bg-(--surface-muted) p-5">
                <p className="font-mono text-[0.54rem] uppercase tracking-[0.2em] text-muted-foreground">
                  Legacy ERP reporting
                </p>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{row.legacy}</p>
              </div>
              <div className="surface-panel-strong rounded-[1.4rem] p-5">
                <p className="font-mono text-[0.54rem] uppercase tracking-[0.2em] text-(--brand)">
                  With AEGIS
                </p>
                <p className="mt-3 text-sm leading-7 text-foreground">{row.aegis}</p>
              </div>
            </article>
          ))}
        </Reveal>
      </SectionShell>

      <SectionShell eyebrow="What AEGIS helps with" title="From data to defensible decisions">
        <Reveal staggerChildren className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[
            {
              icon: BellRing,
              text: "Identify attendance, fee, academic, and communication exceptions early.",
            },
            {
              icon: Landmark,
              text: "Give leadership a trust-level view across campuses without flattening accountability.",
            },
            {
              icon: Building2,
              text: "Support principals and administrators with contextual operational insight.",
            },
            {
              icon: ShieldCheck,
              text: "Preserve governance through RBAC, audit trails, and controlled access.",
            },
            {
              icon: Sparkles,
              text: "Turn school data into actionable intelligence without compromising ownership or privacy.",
            },
            {
              icon: ChartNoAxesCombined,
              text: "Help management ask sharper questions and act with better operational clarity.",
            },
          ].map((item) => (
            <div key={item.text} data-reveal-item className="surface-panel rounded-[1.4rem] p-5">
              <item.icon className="size-4.5 text-(--brand)" />
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </Reveal>
      </SectionShell>

      <SectionShell className="pb-22 pt-0">
        <Reveal className="surface-panel-strong relative overflow-hidden rounded-[2rem] p-8 lg:p-12">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(88,124,204,0.14),transparent)]" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-center">
            <div>
              <p className="section-kicker">See it on your own numbers</p>
              <h2 className="mt-4 font-display text-3xl tracking-[-0.05em] sm:text-4xl">
                Bring one question you currently wait days to answer.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
                In a guided demo we&rsquo;ll show how AEGIS answers it from live, governed records —
                and what your leadership team sees on day one.
              </p>
            </div>
            <div className="grid gap-3">
              <ButtonLink href={siteCtas.demoHref} label="Book a guided demo" />
              <ButtonLink
                href={siteCtas.securityHref}
                label="Review the trust posture"
                variant="secondary"
              />
            </div>
          </div>
        </Reveal>
      </SectionShell>
    </main>
  );
}
