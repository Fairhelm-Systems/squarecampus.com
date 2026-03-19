import {
  ArrowRightLeft,
  BellRing,
  Building2,
  ChartColumnIncreasing,
  CircleCheckBig,
  DatabaseZap,
  Fingerprint,
  Globe2,
  GraduationCap,
  MessageSquareMore,
  Network,
  ShieldCheck,
  Sparkles,
  WalletCards,
} from "lucide-react";
import type { Metadata } from "next";
import { ButtonLink } from "@/components/site/button-link";
import { PlatformMockupRow } from "@/components/site/mockups";
import { Reveal } from "@/components/site/reveal";
import { SectionShell } from "@/components/site/section-shell";
import { siteCtas } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Platform",
  description:
    "See how SquareCampus structures admissions, academics, finance, communication, compliance, and institutional operations inside one connected School OS.",
};

const backboneLayers = [
  {
    title: "Admissions to academics",
    icon: GraduationCap,
    body: "From inquiry, documents, and enrollment through timetable, attendance, exams, and report publishing.",
  },
  {
    title: "Finance to compliance",
    icon: WalletCards,
    body: "Fees, concessions, receipts, auditability, and institution-level oversight in the same operating model.",
  },
  {
    title: "Communication as infrastructure",
    icon: MessageSquareMore,
    body: "Parents, students, staff, and administrators receive the right information through the right channels without disconnected tools.",
  },
  {
    title: "Operations as part of the core",
    icon: Building2,
    body: "Transport, services, assets, and campus workflows stay linked to the same institutional identity and timeline.",
  },
] as const;

const sharedSystem = [
  {
    title: "Shared identity",
    icon: Fingerprint,
    body: "Users, permissions, and organizational boundaries are defined once and respected everywhere.",
  },
  {
    title: "Shared data model",
    icon: DatabaseZap,
    body: "A record created in admissions becomes the same record used by academics, finance, and communication.",
  },
  {
    title: "Shared operating timeline",
    icon: ArrowRightLeft,
    body: "Approvals, updates, dues, parent communication, and staff actions roll into one auditable sequence.",
  },
  {
    title: "Shared observability",
    icon: ChartColumnIncreasing,
    body: "Leaders see the institution through live dashboards instead of stitched reports and spreadsheet exports.",
  },
] as const;

const experienceSurfaces = [
  {
    title: "Admin command center",
    body: "Branch health, role controls, rollout visibility, finance oversight, and policy enforcement from one place.",
  },
  {
    title: "Teacher workspace",
    body: "Attendance, lesson delivery, remarks, assessments, communication, and action queues without context switching.",
  },
  {
    title: "Parent and student app",
    body: "Fees, receipts, circulars, attendance, academic visibility, and service requests in familiar, multilingual flows.",
  },
  {
    title: "Leadership visibility",
    body: "Board reviews, campus-level dashboards, fee risk, academic exceptions, and operational exposure in real time.",
  },
] as const;

const operatingClaims = [
  "One login and one source of truth for admissions, academics, finance, and communication.",
  "Institution-aware structure for schools, colleges, and multi-campus organizations.",
  "Multilingual parent-facing usage without turning English-first reporting into a mess.",
  "Nexus layered inside the platform as intelligence, not marketed as a substitute for operational depth.",
] as const;

export default function PlatformPage() {
  return (
    <main>
      <SectionShell className="pt-12 sm:pt-16">
        <Reveal className="mx-auto max-w-3xl space-y-6 text-center">
          <p className="section-kicker">Platform architecture</p>
          <h1 className="font-display text-4xl leading-none tracking-[-0.06em] sm:text-5xl lg:text-6xl">
            One backbone. Many surfaces. No institutional drift.
          </h1>
          <p className="mx-auto max-w-xl text-lg leading-8 text-[color:var(--muted-foreground)]">
            SquareCampus is built like an operating system for institutions, not a loose bundle of
            modules. Admissions, academics, finance, communication, compliance, and day-to-day
            operations work off the same institutional truth.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <ButtonLink href={siteCtas.demoHref} label="Book a guided demo" />
            <ButtonLink href={siteCtas.rolloutHref} label="See rollout" variant="secondary" />
          </div>
        </Reveal>

        <Reveal delay={120} className="mt-14">
          <PlatformMockupRow />
        </Reveal>

        <Reveal delay={200} className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {operatingClaims.map((item) => (
            <div
              key={item}
              className="surface-panel rounded-[1.35rem] px-4 py-4 text-sm leading-6 text-[color:var(--muted-foreground)]"
            >
              {item}
            </div>
          ))}
        </Reveal>
      </SectionShell>

      <SectionShell
        eyebrow="Operating layers"
        title="How the School OS is structured"
        body="Every major institutional workflow sits on the same foundation, which is why SquareCampus feels coordinated instead of stitched together."
      >
        <Reveal staggerChildren className="grid gap-4 md:grid-cols-2">
          {backboneLayers.map((layer) => (
            <article
              key={layer.title}
              data-reveal-item
              className="surface-panel rounded-[1.6rem] p-6"
            >
              <layer.icon className="size-5 text-[color:var(--brand)]" />
              <h2 className="mt-5 font-display text-2xl tracking-[-0.04em]">{layer.title}</h2>
              <p className="mt-3 text-base leading-7 text-[color:var(--muted-foreground)]">
                {layer.body}
              </p>
            </article>
          ))}
        </Reveal>
      </SectionShell>

      <SectionShell
        eyebrow="Shared core"
        title="The system underneath the UI matters"
        body="The real product advantage is not a prettier dashboard. It is that the institution stops operating through sync gaps, duplicate records, and broken reporting chains."
      >
        <Reveal staggerChildren className="grid gap-4 md:grid-cols-2">
          {sharedSystem.map((item) => (
            <article
              key={item.title}
              data-reveal-item
              className="surface-panel rounded-[1.6rem] p-6"
            >
              <item.icon className="size-5 text-[color:var(--teal)]" />
              <h2 className="mt-5 font-display text-2xl tracking-[-0.04em]">{item.title}</h2>
              <p className="mt-3 text-base leading-7 text-[color:var(--muted-foreground)]">
                {item.body}
              </p>
            </article>
          ))}
        </Reveal>
      </SectionShell>

      <SectionShell
        eyebrow="Product surfaces"
        title="Designed for the people who actually run the institution"
        body="SquareCampus is not just an admin layer. Each audience gets a purpose-built surface, but the institution still runs on one connected operational model."
      >
        <Reveal staggerChildren className="grid gap-4 md:grid-cols-2">
          {experienceSurfaces.map((surface, index) => {
            const icons = [Network, BellRing, Globe2, ShieldCheck];
            const Icon = icons[index];

            return (
              <article
                key={surface.title}
                data-reveal-item
                className="surface-panel rounded-[1.6rem] p-6"
              >
                <Icon className="size-5 text-[color:var(--amber)]" />
                <h2 className="mt-5 font-display text-2xl tracking-[-0.04em]">{surface.title}</h2>
                <p className="mt-3 text-base leading-7 text-[color:var(--muted-foreground)]">
                  {surface.body}
                </p>
              </article>
            );
          })}
        </Reveal>
      </SectionShell>

      <SectionShell className="pb-22">
        <Reveal className="surface-panel-strong rounded-[2rem] p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div>
              <p className="section-kicker">Intelligence layer</p>
              <h2 className="mt-4 font-display text-3xl tracking-[-0.05em] sm:text-4xl">
                Nexus is embedded where context already exists.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[color:var(--muted-foreground)]">
                SquareCampus remains the primary identity. Nexus adds operational intelligence on
                top of the School OS by working with the same timelines, permissions, and records
                rather than inventing a second system beside them.
              </p>
            </div>
            <div className="grid gap-3">
              {[
                {
                  icon: Sparkles,
                  label: "Role-aware suggestions",
                },
                {
                  icon: CircleCheckBig,
                  label: "Exception detection from live records",
                },
                {
                  icon: ShieldCheck,
                  label: "Institution-safe answers inside the same guardrails",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1.25rem] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-4 text-sm text-[color:var(--foreground)]"
                >
                  <item.icon className="mb-3 size-4 text-[color:var(--brand)]" />
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </SectionShell>
    </main>
  );
}
