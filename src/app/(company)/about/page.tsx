import { Activity, Compass, Landmark, ShieldCheck, Sparkles, Target } from "lucide-react";
import { ButtonLink } from "@/components/site/button-link";
import { Reveal } from "@/components/site/reveal";
import { SectionShell } from "@/components/site/section-shell";
import { siteCtas } from "@/content/site-content";

const values = [
  {
    title: "Reliability over decoration",
    icon: ShieldCheck,
    body: "SquareCampus is built to quietly run your day — attendance, fees, exams, and approvals — without drama, outages, or surprises.",
  },
  {
    title: "Real-world operations first",
    icon: Compass,
    body: "We design for paperwork, habits, audits, and constraints as they exist today, not how a hypothetical perfect campus might work.",
  },
  {
    title: "Radical clarity for admins",
    icon: Target,
    body: "Everyone sees the same source of truth: who is present, what is pending, and what needs action now.",
  },
] as const;

const pillars = [
  {
    title: "Built for Indian institutions",
    caption: "From standalone schools to multi-city groups.",
    points: [
      "Ready for multi-campus, multi-branch structures.",
      "Handles complex fee setups, terms, and concessions.",
      "Respects your existing processes instead of forcing a reset.",
    ],
  },
  {
    title: "Digitizing every corner",
    caption: "A single operating system instead of stitched tools.",
    points: [
      "Connects admissions, academics, and finance into one flow.",
      "Turns paper-based approvals into clear, trackable workflows.",
      "Ensures every update is reflected across the system instantly.",
    ],
  },
  {
    title: "Data you can act on",
    caption: "Not just charts — actual decisions.",
    points: [
      "Shows what changed, who changed it, and when.",
      "Highlights trends in attendance, performance, and collections.",
      "Keeps insights role-based so everyone sees what matters to them.",
    ],
  },
] as const;

const operatingPosture = [
  {
    label: "Institutions served",
    value: "Multi-campus ready",
    note: "Branch structures, shared services, and autonomy without chaos.",
  },
  {
    label: "Time-to-launch",
    value: "Fast, guided",
    note: "Playbooks for rollout, data import support, and parallel dry runs.",
  },
  {
    label: "Support",
    value: "Human + product",
    note: "Direct line to ops and engineering; no ticket bots, no runaround.",
  },
] as const;

const founders = [
  {
    initials: "MG",
    name: "Mohit Gupta",
    role: "Founder & CTO",
    body: "Leads product and platform engineering. Built systems processing 100M+ records daily and brings that reliability mindset to every workflow.",
  },
] as const;

const wePractice = [
  "Infrastructure that runs admission to alumni",
  "Systems that work during fee season, not just pilots",
  "Software built for Indian institutional reality",
  "A sustainable business that respects its team",
] as const;

const weReject = [
  "Predatory sales calls to struggling institutions",
  "Recycled video content sold as 'transformation'",
  "Software that works in demos, fails in reality",
  "Burning out staff to hit growth targets",
] as const;

export default function AboutPage() {
  return (
    <main>
      <SectionShell className="pt-12 sm:pt-16">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <Reveal className="space-y-6">
            <p className="section-kicker">About SquareCampus</p>
            <h1 className="font-display text-4xl leading-none tracking-[-0.06em] sm:text-5xl lg:text-6xl">
              Educational institutions shape the future. Their software should respect that.
            </h1>
            <p className="max-w-xl text-lg leading-8 text-muted-foreground">
              Most schools and colleges still run on software built for the 1990s. Simple tasks like
              fee collection or publishing results turn into multi-week ordeals of spreadsheets,
              calls, and stress. SquareCampus exists to replace that with a Campus Operating System
              that flows with how institutions actually work.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={siteCtas.demoHref} label="Book a guided demo" />
              <ButtonLink
                href={siteCtas.platformHref}
                label="Explore the platform"
                variant="secondary"
              />
            </div>
          </Reveal>

          <Reveal delay={120} className="grid content-start gap-3">
            {operatingPosture.map((item) => (
              <div key={item.label} className="surface-panel rounded-[1.5rem] p-5">
                <p className="section-kicker">{item.label}</p>
                <p className="mt-3 font-display text-2xl tracking-[-0.04em]">{item.value}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.note}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Our story"
        title="Built for campuses that can't afford chaos"
        body="Institutions rarely struggle because people don't work hard. They struggle because data is scattered, processes are inconsistent, and every department runs its own system of record."
      >
        <Reveal className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="surface-panel-strong rounded-[1.8rem] p-7 lg:p-8">
            <Landmark className="size-5 text-(--brand)" />
            <h2 className="mt-5 font-display text-3xl tracking-[-0.05em]">
              One backbone for daily operations.
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Decisions get made on partial context, and the office ends up firefighting instead of
              planning. SquareCampus gives schools and colleges a single backbone where every
              workflow is connected, auditable, and simple enough to use every day.
            </p>
            <div className="mt-6 rounded-[1.4rem] border border-(--line) bg-(--surface) p-5">
              <p className="section-kicker">We built SquareCampus because institutions deserve</p>
              <ul className="mt-4 grid gap-2.5">
                {[
                  "Software that flows like thought, not clicks like paperwork",
                  "Systems that anticipate needs, not wait for tickets",
                  "Automation that gives time back to teaching, not admin",
                  "Data that tells stories, not just sits in rows",
                  "Technology that delights users, not frustrates them",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                    <Sparkles className="mt-1 size-3.5 shrink-0 text-(--brand)" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-6 font-display text-xl tracking-[-0.03em]">
              This is not school management software. This is a Campus Operating System.
            </p>
          </div>

          <div className="grid content-start gap-4">
            <div className="surface-panel rounded-[1.6rem] p-6">
              <p className="section-kicker">Founder-led</p>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                SquareCampus, a product of Fairhelm Systems OPC, is built by a founder-led,
                product-first team focused on building something that can sit at the center of your
                institution for years, not months.
              </p>
              <div className="mt-5 grid gap-3">
                {founders.map((person) => (
                  <div
                    key={person.initials}
                    className="flex items-start gap-4 rounded-[1.3rem] border border-(--line) bg-(--surface) p-4"
                  >
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-foreground font-mono text-xs text-background">
                      {person.initials}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {person.name} · {person.role}
                      </p>
                      <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                        {person.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs leading-5 text-muted-foreground">
                The shared goal: a platform that doesn&rsquo;t just look good in demos, but survives
                timetables, fee seasons, inspections, and everything in between.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="surface-panel rounded-[1.6rem] p-6">
                <h3 className="font-display text-lg tracking-[-0.02em]">What we build</h3>
                <ul className="mt-4 grid gap-2.5">
                  {wePractice.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm leading-6 text-muted-foreground">
                      <span className="text-(--teal)">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="surface-panel rounded-[1.6rem] p-6">
                <h3 className="font-display text-lg tracking-[-0.02em]">What we reject</h3>
                <ul className="mt-4 grid gap-2.5">
                  {weReject.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm leading-6 text-muted-foreground">
                      <span className="text-(--destructive)">×</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </SectionShell>

      <SectionShell
        eyebrow="What we optimise for"
        title="Less friction for the institution. More trust in the data."
        body="Every feature, integration, and workflow inside SquareCampus is measured against that single question."
      >
        <Reveal staggerChildren className="grid gap-4 md:grid-cols-3">
          {values.map((value) => (
            <article
              key={value.title}
              data-reveal-item
              className="surface-panel rounded-[1.6rem] p-6"
            >
              <value.icon className="size-5 text-(--brand)" />
              <h2 className="mt-5 font-display text-2xl tracking-[-0.04em]">{value.title}</h2>
              <p className="mt-3 text-base leading-7 text-muted-foreground">{value.body}</p>
            </article>
          ))}
        </Reveal>
      </SectionShell>

      <SectionShell
        eyebrow="Institutional fit"
        title="How SquareCampus fits into your institution"
        body="SquareCampus doesn't arrive as a rigid template. It adapts to your workflows while giving you the structure you need to scale without losing control."
      >
        <Reveal staggerChildren className="grid gap-4 md:grid-cols-3">
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              data-reveal-item
              className="surface-panel rounded-[1.6rem] p-6"
            >
              <p className="section-kicker">{pillar.caption}</p>
              <h2 className="mt-4 font-display text-2xl tracking-[-0.04em]">{pillar.title}</h2>
              <ul className="mt-4 grid gap-2.5">
                {pillar.points.map((point) => (
                  <li key={point} className="flex gap-2.5 text-sm leading-6 text-muted-foreground">
                    <Activity className="mt-1 size-3.5 shrink-0 text-(--teal)" />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </Reveal>
      </SectionShell>

      <SectionShell className="pt-0">
        <Reveal className="surface-panel-strong relative overflow-hidden rounded-[2rem] p-8 lg:p-12">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(88,124,204,0.12),transparent)]" />
          <blockquote className="relative mx-auto max-w-3xl">
            <p className="font-display text-2xl leading-snug tracking-[-0.03em] sm:text-3xl">
              &ldquo;Indian schools and colleges don&rsquo;t need another shiny dashboard — they
              need software that understands the messy, beautiful chaos of running real institutions
              in this country. SquareCampus absorbs that complexity so institutions can stop
              firefighting and focus on what actually matters: education.&rdquo;
            </p>
            <footer className="mt-6 text-sm text-muted-foreground">
              Mohit Gupta · Founder &amp; CTO
            </footer>
          </blockquote>
        </Reveal>
      </SectionShell>

      <SectionShell className="pb-22 pt-0">
        <Reveal className="surface-panel-strong rounded-[2rem] p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-center">
            <div>
              <p className="section-kicker">Next step</p>
              <h2 className="mt-4 font-display text-3xl tracking-[-0.05em] sm:text-4xl">
                Ready to see SquareCampus in action?
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
                Share how your institution operates today, and we&rsquo;ll walk you through how
                SquareCampus can simplify, connect, and de-risk your daily workflows.
              </p>
            </div>
            <div className="grid gap-3">
              <ButtonLink href={siteCtas.demoHref} label="Book a guided demo" />
              <ButtonLink
                href={siteCtas.platformHref}
                label="Explore the platform"
                variant="secondary"
              />
            </div>
          </div>
        </Reveal>
      </SectionShell>
    </main>
  );
}
