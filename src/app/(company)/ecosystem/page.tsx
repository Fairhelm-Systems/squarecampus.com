import {
  BadgeCheck,
  BarChart3,
  BellRing,
  Building2,
  Database,
  Fingerprint,
  Globe2,
  Network,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import { ButtonLink } from "@/components/site/button-link";
import { EcosystemMockup } from "@/components/site/mockups";
import { Reveal } from "@/components/site/reveal";
import { SectionShell } from "@/components/site/section-shell";
import { siteCtas } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Ecosystem",
  description:
    "See how admins, staff, parents, students, finance, communication, integrations, and institutional controls connect inside the SquareCampus School OS.",
};

const ecosystemRules = [
  {
    title: "One identity layer",
    icon: Fingerprint,
    body: "Roles, permissions, and organizational boundaries are shared instead of re-created across separate tools.",
  },
  {
    title: "One event timeline",
    icon: BadgeCheck,
    body: "Admissions, attendance, fees, communication, and approvals stay legible because they are part of one sequence.",
  },
  {
    title: "One operating surface across audiences",
    icon: Users,
    body: "Admins, teachers, parents, and students each get purpose-built interfaces without fragmenting the institutional model.",
  },
  {
    title: "One reporting truth",
    icon: BarChart3,
    body: "Dashboards and reviews pull from the operating core instead of from stitched exports prepared after the fact.",
  },
] as const;

const ecosystemActors = [
  {
    title: "Admin and operations",
    icon: Building2,
    body: "Institution-wide control, campus setup, approval chains, fee oversight, policy management, and operational monitoring.",
  },
  {
    title: "Teachers and staff",
    icon: BellRing,
    body: "Attendance, class updates, student context, communication, academic workflows, and daily action queues.",
  },
  {
    title: "Parents and students",
    icon: Globe2,
    body: "One app for attendance, dues, receipts, circulars, progress visibility, and institution communication.",
  },
  {
    title: "Leadership and trustees",
    icon: ShieldCheck,
    body: "Live visibility into branch health, academic performance, operational exposure, and finance signals.",
  },
] as const;

export default function EcosystemPage() {
  return (
    <main>
      <SectionShell className="pt-12 sm:pt-16">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <Reveal className="space-y-6">
            <p className="section-kicker">Connected ecosystem</p>
            <h1 className="font-display text-4xl leading-none tracking-[-0.06em] sm:text-5xl lg:text-6xl">
              Every operator, every surface, one institutional source of truth.
            </h1>
            <p className="max-w-xl text-lg leading-8 text-[color:var(--muted-foreground)]">
              SquareCampus connects admins, staff, parents, students, finance workflows,
              communication channels, and institutional controls inside one shared system instead of
              forcing the ecosystem to be assembled from separate products.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={siteCtas.demoHref} label="See the ecosystem live" />
              <ButtonLink
                href={siteCtas.platformHref}
                label="View platform structure"
                variant="secondary"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <EcosystemMockup />
          </Reveal>
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Ecosystem logic"
        title="The connective tissue matters more than the module count"
        body="An ecosystem only becomes an advantage when identity, events, communication, and reporting are actually shared."
      >
        <Reveal staggerChildren className="grid gap-4 md:grid-cols-2">
          {ecosystemRules.map((item) => (
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
        eyebrow="Who it serves"
        title="Built across the institution, not just for the administrator"
        body="Each audience has a purpose-built experience, but the institutional model underneath stays connected and consistent."
      >
        <Reveal staggerChildren className="grid gap-4 md:grid-cols-2">
          {ecosystemActors.map((item) => (
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
        eyebrow="Why it feels different"
        title="The ecosystem removes institutional drag"
        body="When the system is connected, communication becomes clearer, reporting becomes faster, and responsibility becomes easier to trace."
      >
        <Reveal className="grid gap-4 lg:grid-cols-[1fr_0.92fr]">
          <div className="surface-panel rounded-[1.8rem] p-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line)] bg-[color:var(--surface)] px-3 py-2 text-sm text-[color:var(--foreground)]">
              <Network className="size-4 text-[color:var(--brand)]" />
              Ecosystem effects
            </div>
            <div className="mt-5 grid gap-3">
              {[
                "Parents stop asking which app or message thread matters today.",
                "Operators stop repeating the same action across multiple systems.",
                "Leadership stops waiting for stitched reporting packs.",
                "The institution gains a more coherent posture across finance, academics, communication, and service operations.",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[1.2rem] bg-[color:var(--surface-muted)] px-4 py-4 text-sm leading-6 text-[color:var(--muted-foreground)]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="surface-panel-strong rounded-[1.8rem] p-7">
            <p className="section-kicker">Integration posture</p>
            <h2 className="mt-4 font-display text-3xl tracking-[-0.05em]">
              Connected core first. Practical integrations second.
            </h2>
            <div className="mt-5 grid gap-3">
              {[
                {
                  icon: Database,
                  text: "The core workflows should not depend on fragile external stitching to stay coherent.",
                },
                {
                  icon: Sparkles,
                  text: "Integrations extend the ecosystem where institutions already need them, without breaking the single source of truth.",
                },
                {
                  icon: ShieldCheck,
                  text: "Security, identity, and auditability stay legible even when external systems are part of the operational picture.",
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
              <p className="section-kicker">Move from stack to system</p>
              <h2 className="mt-4 font-display text-3xl tracking-[-0.05em] sm:text-4xl">
                Review how your institution’s current ecosystem actually behaves.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[color:var(--muted-foreground)]">
                We can map the current tools, handoffs, and communication paths, then show where a
                connected School OS changes the operational picture.
              </p>
            </div>
            <div className="grid gap-3">
              <ButtonLink href={siteCtas.demoHref} label="Book ecosystem walkthrough" />
              <ButtonLink
                href={siteCtas.securityHref}
                label="Review trust posture"
                variant="secondary"
              />
            </div>
          </div>
        </Reveal>
      </SectionShell>
    </main>
  );
}
