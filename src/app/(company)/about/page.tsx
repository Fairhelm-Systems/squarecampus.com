// app/about/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { FloatingHomeButton } from "@/components/marketing/floating-home-button";

export const metadata: Metadata = {
  title: "About | SquareCampus",
  description:
    "Learn about SquareCampus, the operating system for modern schools and colleges, and the team building it.",
};

type Value = {
  title: string;
  description: string;
};

type Pillar = {
  title: string;
  caption: string;
  points: string[];
};

const values: Value[] = [
  {
    title: "Reliability over decoration",
    description:
      "SquareCampus is built to quietly run your day, attendance, fees, exams, and approvals, without drama, outages, or surprises.",
  },
  {
    title: "Real-world operations first",
    description:
      "We design for paperwork, habits, audits, and constraints as they exist today, not how a hypothetical perfect campus might work.",
  },
  {
    title: "Radical clarity for admins",
    description:
      "Everyone sees the same source of truth: who is present, what is pending, and what needs action now.",
  },
];

const pillars: Pillar[] = [
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
    caption: "Not just charts, actual decisions.",
    points: [
      "Shows what changed, who changed it, and when.",
      "Highlights trends in attendance, performance, and collections.",
      "Keeps insights role-based so everyone sees what matters to them.",
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      <main className="bg-neutral-950 px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-5xl flex-col gap-16">
          {/* Hero – the opening brief */}
          <section className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-muted-foreground/80">
              About SquareCampus
            </p>
            <div className="space-y-4">
              <h1 className="text-3xl font-semibold text-neutral-50 md:text-4xl lg:text-5xl">
                The operating system for modern institutions.
              </h1>
              <p className="max-w-3xl text-sm md:text-base leading-relaxed text-muted-foreground">
                SquareCampus is built for schools and colleges that are done
                with fragmented tools and manual stitching. From admissions to
                attendance, exams to fees, we focus on one thing: giving your
                institution a calm, connected, and dependable system that can
                scale without needing an army of IT staff.
              </p>
            </div>

            <div className="grid gap-4 text-xs text-muted-foreground sm:grid-cols-3">
              <div className="rounded-xl border border-neutral-800/70 bg-neutral-900/60 px-4 py-3">
                <p className="font-semibold text-neutral-100">
                  Admissions to Alumni
                </p>
                <p className="mt-1 text-[0.75rem] leading-relaxed">
                  Track the full student lifecycle in one system instead of
                  chasing spreadsheets and exports.
                </p>
              </div>
              <div className="rounded-xl border border-neutral-800/70 bg-neutral-900/60 px-4 py-3">
                <p className="font-semibold text-neutral-100">
                  Built for daily use
                </p>
                <p className="mt-1 text-[0.75rem] leading-relaxed">
                  Designed for principals, office staff, teachers, and
                  management, not just demos.
                </p>
              </div>
              <div className="rounded-xl border border-neutral-800/70 bg-neutral-900/60 px-4 py-3">
                <p className="font-semibold text-neutral-100">
                  Cloud-hosted & scalable
                </p>
                <p className="mt-1 text-[0.75rem] leading-relaxed">
                  Ready for multiple campuses, heavy usage, and long-term
                  growth without constant rework.
                </p>
              </div>
            </div>
          </section>

          {/* Story – how the operation came together */}
          <section className="grid gap-10 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1.1fr)] md:items-start">
            <Card className="border border-neutral-800/70 bg-gradient-to-br from-neutral-900/70 via-neutral-900/60 to-neutral-950 shadow-2xl shadow-black/40">
              <CardContent className="space-y-6 p-6 md:p-8">
                <div className="space-y-2">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-muted-foreground/80">
                    Our story
                  </p>
                  <h2 className="text-lg font-semibold text-neutral-50">
                    Built for campuses that can&apos;t afford chaos.
                  </h2>
                </div>

                <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    Institutions rarely struggle because people don&apos;t work
                    hard. They struggle because data is scattered, processes are
                    inconsistent, and every department runs its own system of
                    record. Decisions get made on partial context, and the
                    office ends up firefighting instead of planning.
                  </p>
                  <p>
                    SquareCampus exists to give schools and colleges a single
                    backbone for their daily operations, where every workflow
                    is connected, auditable, and simple enough to use every day.
                  </p>
                </div>

                {/* Small “mission tiles” – the micro-ops inside the larger plan */}
                <div className="grid gap-3 text-[0.78rem] text-muted-foreground md:grid-cols-3">
                  <div className="rounded-lg border border-neutral-800/80 bg-neutral-900/70 p-3">
                    <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-neutral-200">
                      Less noise
                    </p>
                    <p className="mt-1 leading-relaxed">
                      Fewer tools, fewer hand-offs, and fewer “who changed
                      this?” moments.
                    </p>
                  </div>
                  <div className="rounded-lg border border-neutral-800/80 bg-neutral-900/70 p-3">
                    <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-neutral-200">
                      More traceability
                    </p>
                    <p className="mt-1 leading-relaxed">
                      Every change leaves a trail: what changed, when, and by
                      whom.
                    </p>
                  </div>
                  <div className="rounded-lg border border-neutral-800/80 bg-neutral-900/70 p-3">
                    <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-neutral-200">
                      Calm operations
                    </p>
                    <p className="mt-1 leading-relaxed">
                      Offices that know what&apos;s pending, what&apos;s
                      blocked, and what&apos;s on track.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Founding team – the crew behind the operation */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-neutral-100">
                  The founding team
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  SquareCampus Private Limited is led by a small, product-first
                  founding team focused on building something that can sit at
                  the center of your institution for years, not months.
                </p>
              </div>

              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-3 rounded-lg border border-neutral-800/60 bg-neutral-900/60 p-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-800 text-xs font-semibold text-neutral-100">
                    MG
                  </div>
                  <div>
                    <p className="text-neutral-100 text-sm font-medium">
                      Mohit Gupta, Founder &amp; CTO
                    </p>
                    <p className="mt-1 text-xs leading-relaxed">
                      Leads product and platform engineering, from
                      architecture and reliability to how workflows feel for
                      everyday users.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg border border-neutral-800/60 bg-neutral-900/60 p-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-800 text-xs font-semibold text-neutral-100">
                    DK
                  </div>
                  <div>
                    <p className="text-neutral-100 text-sm font-medium">
                      Dhanraj Kotian, Co-founder &amp; CMO
                    </p>
                    <p className="mt-1 text-xs leading-relaxed">
                      Works closely with institutions to understand ground
                      reality, ensuring the product stays aligned with actual
                      campus needs and communication flows.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-xs leading-relaxed text-muted-foreground">
                The shared goal: a platform that doesn&apos;t just look good in
                demos, but survives timetables, fee seasons, inspections, and
                everything in between.
              </p>
            </div>
          </section>

          {/* Values – the rules of engagement */}
          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-neutral-50">
                What we optimise for
              </h2>
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Every feature, integration, and workflow inside SquareCampus is
                measured against a simple question: does this reduce friction
                for the institution and increase trust in the data?
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {values.map((value) => (
                <Card
                  key={value.title}
                  className="border border-neutral-800/70 bg-neutral-900/60"
                >
                  <CardContent className="space-y-2 p-5">
                    <p className="text-sm font-semibold text-neutral-100">
                      {value.title}
                    </p>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Pillars – tightened content + clearer structure */}
          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-neutral-50">
                How SquareCampus fits into your institution
              </h2>
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                SquareCampus doesn&apos;t arrive as a rigid template. It adapts
                to your workflows while giving you the structure you need to
                scale without losing control.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {pillars.map((pillar) => (
                <Card
                  key={pillar.title}
                  className="group border border-neutral-800/70 bg-neutral-900/60 transition-colors hover:border-neutral-300/60"
                >
                  <CardContent className="flex h-full flex-col gap-3 p-5">
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-neutral-50">
                        {pillar.title}
                      </p>
                      <p className="text-[0.78rem] text-muted-foreground">
                        {pillar.caption}
                      </p>
                    </div>
                    <ul className="mt-1 space-y-2 text-[0.8rem] leading-relaxed text-neutral-300">
                      {pillar.points.map((point) => (
                        <li key={point} className="flex gap-2">
                          <span className="mt-[0.3rem] h-1 w-1 shrink-0 rounded-full bg-neutral-400 group-hover:bg-neutral-200" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Closing CTA – the quiet invitation */}
          <section className="mt-4 flex flex-col gap-4 rounded-2xl border border-neutral-800/80 bg-gradient-to-r from-neutral-900/80 via-neutral-900/60 to-neutral-900/40 p-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-neutral-50">
                Ready to see SquareCampus in action?
              </p>
              <p className="text-xs leading-relaxed text-muted-foreground md:max-w-md">
                Share how your institution operates today, and we&apos;ll walk
                you through how SquareCampus can simplify, connect, and de-risk
                your daily workflows.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center rounded-full border border-transparent bg-white px-5 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-950 shadow-lg shadow-white/30 transition hover:bg-neutral-100"
              >
                Book a call
              </Link>
              <Link
                href="/#features"
                className="inline-flex items-center justify-center rounded-full border border-neutral-700 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-200 transition hover:border-white hover:text-white"
              >
                Explore features
              </Link>
            </div>
          </section>
        </div>
      </main>

      <FloatingHomeButton href="/" label="Back to home" />
    </>
  );
}
