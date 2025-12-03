// app/about/page.tsx
"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { FloatingHomeButton } from "@/components/marketing/floating-home-button";
import { motion } from "motion/react";

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
              {[
                {
                  title: "Admissions to Alumni",
                  desc: "Track the full student lifecycle in one system instead of chasing spreadsheets and exports.",
                },
                {
                  title: "Built for daily use",
                  desc: "Designed for principals, office staff, teachers, and management, not just demos.",
                },
                {
                  title: "Cloud-hosted & scalable",
                  desc: "Ready for multiple campuses, heavy usage, and long-term growth without constant rework.",
                },
              ].map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group relative overflow-hidden rounded-xl border border-neutral-800/70 bg-gradient-to-br from-neutral-900/80 to-neutral-900/40 px-4 py-3 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-blue-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative">
                    <p className="font-semibold text-neutral-100">
                      {item.title}
                    </p>
                    <p className="mt-1 text-[0.75rem] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
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

                {/* Small "mission tiles" – the micro-ops inside the larger plan */}
                <div className="grid gap-3 text-[0.78rem] text-muted-foreground md:grid-cols-3">
                  {[
                    { title: "Less noise", desc: "Fewer tools, fewer hand-offs, and fewer \"who changed this?\" moments." },
                    { title: "More traceability", desc: "Every change leaves a trail: what changed, when, and by whom." },
                    { title: "Calm operations", desc: "Offices that know what's pending, what's blocked, and what's on track." },
                  ].map((item, idx) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      className="group relative overflow-hidden rounded-lg border border-neutral-800/80 bg-neutral-900/70 p-3 transition-all duration-300 hover:scale-105 hover:border-blue-400/40 hover:bg-neutral-900/90 hover:shadow-lg hover:shadow-blue-500/5"
                    >
                      <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-blue-500/5 blur-2xl transition-all duration-300 group-hover:bg-blue-500/10" />
                      <div className="relative">
                        <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-neutral-200">
                          {item.title}
                        </p>
                        <p className="mt-1 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
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
                {[
                  { initials: "MG", name: "Mohit Gupta, Founder & CTO", desc: "Leads product and platform engineering, from architecture and reliability to how workflows feel for everyday users." },
                  { initials: "DK", name: "Dhanraj Kotian, Co-founder & CMO", desc: "Works closely with institutions to understand ground reality, ensuring the product stays aligned with actual campus needs and communication flows." },
                ].map((person, idx) => (
                  <motion.div
                    key={person.initials}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.15 }}
                    className="group flex items-start gap-3 rounded-lg border border-neutral-800/60 bg-gradient-to-br from-neutral-900/70 to-neutral-900/50 p-4 transition-all duration-300 hover:scale-[1.02] hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-neutral-800 to-neutral-900 text-xs font-semibold text-neutral-100 ring-2 ring-neutral-700/50 transition-all duration-300 group-hover:ring-blue-500/50">
                      {person.initials}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-100 transition-colors group-hover:text-white">
                        {person.name}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed">
                        {person.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
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
              {values.map((value, idx) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                >
                  <Card className="group relative h-full overflow-hidden border border-neutral-800/70 bg-gradient-to-br from-neutral-900/80 to-neutral-950/60 transition-all duration-300 hover:scale-[1.03] hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/10">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-blue-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-500/10 blur-3xl transition-all duration-500 group-hover:scale-150" />
                    <CardContent className="relative space-y-2 p-5">
                      <p className="text-sm font-semibold text-neutral-100 transition-colors group-hover:text-white">
                        {value.title}
                      </p>
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
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
              {pillars.map((pillar, idx) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                >
                  <Card className="group relative h-full overflow-hidden border border-neutral-800/70 bg-gradient-to-br from-neutral-900/80 via-neutral-900/60 to-neutral-950/80 backdrop-blur-sm transition-all duration-500 hover:scale-[1.05] hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/20">
                    {/* Animated border gradient */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-purple-500/0 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-30" />

                    {/* Glow orb */}
                    <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-500/20 blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:bg-blue-400/30" />

                    <CardContent className="relative flex h-full flex-col gap-3 p-5">
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-neutral-50 transition-colors duration-300 group-hover:text-white">
                          {pillar.title}
                        </p>
                        <p className="text-[0.78rem] text-muted-foreground">
                          {pillar.caption}
                        </p>
                      </div>
                      <ul className="mt-1 space-y-2 text-[0.8rem] leading-relaxed text-neutral-300">
                        {pillar.points.map((point, pointIdx) => (
                          <motion.li
                            key={point}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 + pointIdx * 0.1 }}
                            className="flex gap-2"
                          >
                            <span className="mt-[0.3rem] h-1 w-1 shrink-0 rounded-full bg-neutral-400 transition-all duration-300 group-hover:h-1.5 group-hover:w-1.5 group-hover:bg-blue-400" />
                            <span className="transition-colors duration-300 group-hover:text-neutral-100">{point}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
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
