import {
  ArrowRightLeft,
  Cable,
  ChartNoAxesCombined,
  Cloud,
  Database,
  Landmark,
  Lock,
  Server,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import type { Metadata } from "next";
import { ButtonLink } from "@/components/site/button-link";
import { Reveal } from "@/components/site/reveal";
import { SectionShell } from "@/components/site/section-shell";
import { ServicesFlowVisual } from "@/components/site/services-flow-visual";
import { siteCtas } from "@/content/site-content";
import { createAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Integration, Data & Deployment Services",
  description:
    "SquareCampus services: connect your existing school tools over APIs and WebSockets, ETL/ELT pipelines into one custom dashboard — on your servers or our AWS — plus private and BYOC deployment options.",
  alternates: createAlternates("/services"),
};

const integrationPoints = [
  {
    title: "API & WebSocket connectors",
    icon: Cable,
    body: "If a tool exposes an API or WebSocket, we can weave it into your operating picture — biometric devices, payment gateways, LMS platforms, accounting software, government portals.",
  },
  {
    title: "Two-way, not export-import",
    icon: ArrowRightLeft,
    body: "Live sync instead of CSV rituals. Records flow between systems with mapping, validation, and retry logic — no more month-end reconciliation marathons.",
  },
  {
    title: "Built as workflows",
    icon: Workflow,
    body: "Integrations follow your operating logic: an admission confirmed in one system triggers fee setup in another and a welcome message in a third.",
  },
] as const;

const dataPoints = [
  {
    title: "ETL / ELT pipelines",
    icon: Database,
    body: "We extract from your fragmented sources — legacy ERPs, spreadsheets, standalone apps — transform them into one consistent model, and keep them flowing on schedule.",
  },
  {
    title: "One custom dashboard",
    icon: ChartNoAxesCombined,
    body: "Leadership gets a single dashboard built around your institution's questions: collections, attendance, academics, operations — not a generic BI template.",
  },
  {
    title: "Your servers or our AWS",
    icon: Server,
    body: "Pipelines and the dashboard run where you decide: on infrastructure you already own, or on our AWS Mumbai setup with the same India-residency posture as SquareCampus.",
  },
] as const;

const deploymentOptions = [
  {
    title: "Managed cloud",
    kicker: "Default",
    icon: Cloud,
    body: "SquareCampus on our AWS Mumbai infrastructure — multi-AZ, encrypted, audited, and maintained by us. Most institutions start here.",
  },
  {
    title: "Private deployment",
    kicker: "Dedicated",
    icon: Lock,
    body: "A dedicated, single-tenant SquareCampus environment — isolated compute and storage for institutions with strict segregation requirements.",
  },
  {
    title: "BYOC — your cloud",
    kicker: "Coming soon",
    icon: Landmark,
    body: "SquareCampus deployed inside your own cloud account. Your billing, your boundary, your keys — with our operational playbooks and upgrades. Join the early-access list.",
  },
] as const;

export default function ServicesPage() {
  return (
    <main>
      <SectionShell className="pt-12 sm:pt-16">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <Reveal className="max-w-3xl space-y-6">
            <p className="section-kicker">Integration, data &amp; deployment services</p>
            <h1 className="font-display text-4xl leading-none tracking-[-0.06em] sm:text-5xl lg:text-6xl">
              Your existing tools don&rsquo;t have to be dead ends.
            </h1>
            <p className="max-w-xl text-lg leading-8 text-muted-foreground">
              Beyond the School OS, we connect the systems you already run, unify their data into
              one dashboard, and deploy wherever your governance demands — your servers, our AWS, or
              your own cloud account.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={siteCtas.demoHref} label="Scope it in a demo" variant="cta" />
              <ButtonLink
                href={siteCtas.platformHref}
                label="Explore the platform"
                variant="secondary"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <ServicesFlowVisual />
          </Reveal>
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Systems integration"
        title="Connect the fragmented tools you already have"
        body="Replacing everything on day one isn't always realistic. Where a system exposes an API or WebSocket, we build the bridge so it stops being an island."
        compactBody
      >
        <Reveal staggerChildren className="grid gap-4 md:grid-cols-3">
          {integrationPoints.map((item) => (
            <article
              key={item.title}
              data-reveal-item
              className="surface-panel rounded-[1.6rem] p-6"
            >
              <item.icon className="size-5 text-(--brand)" />
              <h2 className="mt-5 font-display text-2xl tracking-[-0.04em]">{item.title}</h2>
              <p className="mt-3 text-base leading-7 text-muted-foreground">{item.body}</p>
            </article>
          ))}
        </Reveal>
        <Reveal delay={100} className="mt-4">
          <p className="rounded-[1.2rem] border border-dashed border-(--line-strong) bg-(--surface) px-4 py-3 text-sm leading-6 text-foreground sm:px-5">
            In plain words: your fingerprint machines, fee gateway, Tally, and WhatsApp finally talk
            to each other — automatically.
          </p>
        </Reveal>
      </SectionShell>

      <SectionShell
        eyebrow="Data engineering"
        title="ETL/ELT pipelines and one dashboard that answers to leadership"
        body="Scattered systems mean scattered truth. We consolidate your data into one governed model and one custom dashboard your leadership actually uses."
        compactBody
      >
        <Reveal staggerChildren className="grid gap-4 md:grid-cols-3">
          {dataPoints.map((item) => (
            <article
              key={item.title}
              data-reveal-item
              className="surface-panel rounded-[1.6rem] p-6"
            >
              <item.icon className="size-5 text-(--teal)" />
              <h2 className="mt-5 font-display text-2xl tracking-[-0.04em]">{item.title}</h2>
              <p className="mt-3 text-base leading-7 text-muted-foreground">{item.body}</p>
            </article>
          ))}
        </Reveal>
        <Reveal delay={100} className="mt-4">
          <p className="rounded-[1.2rem] border border-dashed border-(--line-strong) bg-(--surface) px-4 py-3 text-sm leading-6 text-foreground sm:px-5">
            In plain words: every number from every tool, in one screen your principal can read with
            morning tea.
          </p>
        </Reveal>
      </SectionShell>

      <SectionShell
        eyebrow="Deployment options"
        title="SquareCampus runs where your governance says it should"
        body="From fully managed to fully yours — the platform, AEGIS, and your data respect the same boundary in every model."
        compactBody
      >
        <Reveal staggerChildren className="grid gap-4 md:grid-cols-3">
          {deploymentOptions.map((item) => (
            <article
              key={item.title}
              data-reveal-item
              className="surface-panel-strong rounded-[1.8rem] p-6"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="section-kicker">{item.kicker}</p>
                <item.icon className="size-5 shrink-0 text-(--brand)" />
              </div>
              <h2 className="mt-4 font-display text-2xl tracking-[-0.04em]">{item.title}</h2>
              <p className="mt-3 text-base leading-7 text-muted-foreground">{item.body}</p>
            </article>
          ))}
        </Reveal>
        <Reveal delay={100} className="mt-4">
          <p className="rounded-[1.2rem] border border-dashed border-(--line-strong) bg-(--surface) px-4 py-3 text-sm leading-6 text-foreground sm:px-5">
            In plain words: our cloud, your servers, or your own cloud account. Your data, your
            choice.
          </p>
        </Reveal>
        <Reveal delay={120} className="mt-4">
          <div className="surface-panel flex flex-wrap items-center gap-x-5 gap-y-2 rounded-[1.4rem] px-5 py-4">
            <span className="inline-flex items-center gap-2 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-muted-foreground">
              <ShieldCheck className="size-3.5 text-(--teal)" />
              Same RBAC and audit posture in every model
            </span>
            <span className="inline-flex items-center gap-2 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-muted-foreground">
              <Lock className="size-3.5 text-(--teal)" />
              India data residency by default
            </span>
          </div>
        </Reveal>
      </SectionShell>

      <SectionShell className="pb-12 sm:pb-22">
        <Reveal className="surface-panel-strong rounded-[2rem] p-5 sm:p-8 lg:p-10">
          <div className="grid gap-5 sm:gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-center">
            <div>
              <p className="section-kicker">Start with an integration audit</p>
              <h2 className="mt-4 font-display text-2xl tracking-[-0.05em] sm:text-4xl">
                Bring your current tool list. We&rsquo;ll map what connects.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
                In one session we identify which systems can integrate, what the pipeline looks
                like, and which deployment model fits your institution&rsquo;s governance.
              </p>
            </div>
            <div className="grid gap-3">
              <ButtonLink href={siteCtas.demoHref} label="Book a scoping session" variant="cta" />
              <ButtonLink
                href="mailto:contact@squarecampus.com?subject=Integration%20%26%20Data%20Services"
                label="Email the services team"
                variant="secondary"
              />
            </div>
          </div>
        </Reveal>
      </SectionShell>
    </main>
  );
}
