// app/about/page.tsx
"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Script from "next/script";
import { BookCallCta } from "@/components/marketing/ctas";
import { FloatingHomeButton } from "@/components/marketing/floating-home-button";
import { Card, CardContent } from "@/components/ui/card";
import {
  createAboutPageSchema,
  createBreadcrumbSchema,
  createWebPageSchema,
  SEO_CONFIG,
} from "@/lib/seo";
import { Activity, ArrowUpRight, Shield, Sparkles, Target } from "@/icons";

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

const heroHighlights = [
  {
    title: "Single source of truth",
    description: "Attendance, finance, and academics stay in sync; no swivel-chairing.",
    icon: <Target className="h-4 w-4" />,
  },
  {
    title: "Operational rigor",
    description: "Workflows with auditability baked in, not added later.",
    icon: <Activity className="h-4 w-4" />,
  },
  {
    title: "Built for India",
    description: "Data residency, fee complexity, and compliance handled by design.",
    icon: <Shield className="h-4 w-4" />,
  },
];

const heroStats = [
  {
    label: "Institutions served",
    value: "Multi-campus ready",
    note: "Branch structures, shared services, and autonomy without chaos.",
    accent: "from-blue-400/70 via-blue-500/15 to-transparent",
    icon: <Target className="h-4 w-4 text-blue-100" />,
  },
  {
    label: "Time-to-launch",
    value: "Fast, guided",
    note: "Playbooks for rollout, data import support, and parallel dry runs.",
    accent: "from-emerald-400/70 via-emerald-500/15 to-transparent",
    icon: <Activity className="h-4 w-4 text-emerald-100" />,
  },
  {
    label: "Support",
    value: "Human + product",
    note: "Direct line to ops and engineering; no ticket bots, no runaround.",
    accent: "from-cyan-400/70 via-cyan-500/15 to-transparent",
    icon: <Shield className="h-4 w-4 text-cyan-100" />,
  },
];

export default function AboutPage() {
  return (
    <>
      <Script
        id="about-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              createWebPageSchema({
                name: "About SquareCampus",
                description:
                  "Learn about the team and mission behind SquareCampus, the operating system for Indian educational institutions.",
                url: `${SEO_CONFIG.baseUrl}/about`,
              }),
              createBreadcrumbSchema([
                { name: "Home", url: SEO_CONFIG.baseUrl },
                { name: "About", url: `${SEO_CONFIG.baseUrl}/about` },
              ]),
              createAboutPageSchema({
                name: "About SquareCampus",
                description: "Building the operational backbone Indian education deserves.",
                url: `${SEO_CONFIG.baseUrl}/about`,
              }),
            ],
          }),
        }}
      />
      <main className="relative overflow-hidden bg-neutral-950 px-4 py-16 sm:px-6 lg:px-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-6 top-4 h-64 w-64 rounded-full bg-blue-500/12 blur-3xl" />
          <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-emerald-500/12 blur-[110px]" />
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        </div>

        <div className="relative mx-auto flex max-w-6xl flex-col gap-16">
          {/* Hero – the opening brief */}
          <section className="relative overflow-hidden rounded-3xl border border-blue-500/15 bg-gradient-to-br from-blue-950/70 via-neutral-950 to-neutral-950 p-8 shadow-2xl shadow-blue-500/10 backdrop-blur-[2px] md:p-10">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-10 top-12 h-44 w-44 rounded-full bg-blue-500/18 blur-3xl" />
              <div className="absolute right-4 top-6 h-52 w-52 rounded-full bg-emerald-500/12 blur-3xl" />
              <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            <div className="relative grid items-start gap-8 lg:grid-cols-[1.7fr_1fr]">
              <div className="space-y-5">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-200"
                >
                  <Sparkles className="h-4 w-4" />
                  About SquareCampus
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="max-w-4xl text-4xl font-bold leading-tight text-white md:text-5xl lg:text-[52px]"
                >
                  Building the operational backbone Indian education deserves.
                  <span className="block bg-gradient-to-r from-blue-400 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                    Calm, connected, and accountable.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="max-w-3xl text-lg leading-relaxed text-neutral-300 md:text-xl"
                >
                  Every school in India fights the same chaos: scattered systems, manual
                  reconciliations, and fragile processes. SquareCampus gives you a single nervous
                  system to run admissions, academics, finance, and compliance with clarity and
                  trust.
                </motion.p>

                <div className="flex flex-wrap gap-3">
                  <BookCallCta context="about-hero" className="justify-center sm:w-auto" />
                  <Link
                    href="/#features"
                    className="inline-flex items-center gap-2 rounded-full border border-neutral-700/70 bg-white/5 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-200 transition hover:border-white hover:text-white"
                  >
                    Explore features
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="grid gap-4 w-full md:grid-cols-3">
                  {heroHighlights.map((item, idx) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + idx * 0.08 }}
                      className="group relative overflow-hidden rounded-xl border border-neutral-800/60 bg-neutral-900/60 p-4 backdrop-blur-sm"
                    >
                      <div className="absolute -right-6 -top-8 h-16 w-16 rounded-full bg-blue-500/0 blur-2xl transition-all duration-500 group-hover:bg-emerald-400/20" />
                      <div className="relative flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-300 ring-1 ring-blue-500/20">
                          {item.icon}
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-semibold text-neutral-50">{item.title}</p>
                          <p className="text-xs leading-relaxed text-neutral-300">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-emerald-500/15 via-neutral-950 to-neutral-950 p-6 shadow-lg shadow-emerald-500/12 backdrop-blur-[2px]"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.18),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.12),transparent_35%)]" />
                <div className="relative space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-emerald-100 ring-1 ring-emerald-500/30">
                    <Shield className="h-3.5 w-3.5" />
                    Operating posture
                  </div>
                  <p className="text-sm leading-relaxed text-neutral-200">
                    Built for multi-campus complexity, India-first compliance, and a 24-hour breach
                    notification promise backed by transparent audit trails.
                  </p>
                  <div className="grid gap-4 grid-rows-3">
                    {heroStats.map((stat, idx) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.35 + idx * 0.08 }}
                        className="group relative overflow-hidden rounded-xl border border-emerald-500/30 bg-neutral-900/40 p-4 shadow-[0_0_18px_rgba(16,185,129,0.12)] backdrop-blur-sm"
                      >
                        <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${stat.accent}`} />
                        <div
                          className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${stat.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                        />
                        <div className="relative flex h-full min-h-[130px] flex-col gap-3">
                          <div className="flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10">
                              {stat.icon}
                            </div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-100">
                              {stat.label}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <div className="text-lg font-semibold leading-tight text-white">
                              {stat.value}
                            </div>
                            <p className="text-xs leading-relaxed text-neutral-300">{stat.note}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-400">
                    <div className="h-2 w-2 rounded-full bg-emerald-400" />
                    Human support, not ticket bots; product teams close the loop.
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Story – how the operation came together */}
          <section className="grid gap-10 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1.1fr)] md:items-start">
            <Card className="border border-blue-500/20 bg-gradient-to-br from-blue-950/40 via-neutral-950/80 to-neutral-950 shadow-2xl shadow-blue-500/15">
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
                    Institutions rarely struggle because people don&apos;t work hard. They struggle
                    because data is scattered, processes are inconsistent, and every department runs
                    its own system of record. Decisions get made on partial context, and the office
                    ends up firefighting instead of planning.
                  </p>
                  <p>
                    SquareCampus exists to give schools and colleges a single backbone for their
                    daily operations, where every workflow is connected, auditable, and simple
                    enough to use every day.
                  </p>
                </div>

                {/* Small "mission tiles" – the micro-ops inside the larger plan */}
                <div className="grid gap-3 text-[0.78rem] text-muted-foreground md:grid-cols-3">
                  {[
                    {
                      title: "Less noise",
                      desc: 'Fewer tools, fewer hand-offs, and fewer "who changed this?" moments.',
                    },
                    {
                      title: "More traceability",
                      desc: "Every change leaves a trail: what changed, when, and by whom.",
                    },
                    {
                      title: "Calm operations",
                      desc: "Offices that know what's pending, what's blocked, and what's on track.",
                    },
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
                        <p className="mt-1 leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Founding team – the crew behind the operation */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-neutral-100">The founding team</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  SquareCampus Private Limited is led by a small, product-first founding team
                  focused on building something that can sit at the center of your institution for
                  years, not months.
                </p>
              </div>

              <div className="space-y-3 text-sm text-muted-foreground">
                {[
                  {
                    initials: "MG",
                    name: "Mohit Gupta, Founder & CTO",
                    desc: "Leads product and platform engineering, from architecture and reliability to how workflows feel for everyday users.",
                  },
                  {
                    initials: "DK",
                    name: "Dhanraj Kotian, Co-founder & CMO",
                    desc: "Works closely with institutions to understand ground reality, ensuring the product stays aligned with actual campus needs and communication flows.",
                  },
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
                      <p className="mt-1 text-xs leading-relaxed">{person.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <p className="text-xs leading-relaxed text-muted-foreground">
                The shared goal: a platform that doesn&apos;t just look good in demos, but survives
                timetables, fee seasons, inspections, and everything in between.
              </p>
            </div>
          </section>

          {/* Mission – why we exist */}
          <section className="space-y-12 py-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                Education in India is broken
                <br />
                at the operational level.
              </h2>
              <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-neutral-300">
                <p>
                  Schools lose weeks to admission chaos. Teachers drown in attendance sheets.
                  Finance teams reconcile fees in Excel. Every department runs on WhatsApp and
                  memory.
                </p>
                <p className="text-xl font-semibold text-white">
                  This isn&apos;t an education problem. It&apos;s an infrastructure problem.
                </p>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="group relative overflow-hidden rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-950/30 via-neutral-900/80 to-neutral-950/90 p-8 shadow-2xl shadow-red-500/5 transition-all duration-500 hover:scale-[1.02] hover:border-red-500/40 hover:shadow-red-500/20"
              >
                {/* Glow effect */}
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-red-500/20 blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:bg-red-400/30" />

                <div className="relative space-y-4">
                  <h3 className="text-xl font-semibold text-white">What we reject</h3>
                  <ul className="space-y-3 text-base text-neutral-300">
                    {[
                      "Predatory sales calls to struggling schools",
                      "Recycled video content sold as 'transformation'",
                      "Software that works in demos, fails in reality",
                      "Burning out staff to hit growth targets",
                    ].map((item, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex gap-3 transition-colors duration-300 group-hover:text-neutral-100"
                      >
                        <span className="text-red-400 transition-all duration-300 group-hover:scale-110">
                          ×
                        </span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="group relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/30 via-neutral-900/80 to-neutral-950/90 p-8 shadow-2xl shadow-emerald-500/5 transition-all duration-500 hover:scale-[1.02] hover:border-emerald-500/40 hover:shadow-emerald-500/20"
              >
                {/* Glow effect */}
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-emerald-500/20 blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:bg-emerald-400/30" />

                <div className="relative space-y-4">
                  <h3 className="text-xl font-semibold text-white">What we build</h3>
                  <ul className="space-y-3 text-base text-neutral-300">
                    {[
                      "Infrastructure that runs admission to alumni",
                      "Systems that work during fee season, not just pilots",
                      "Software built for Indian school reality",
                      "A sustainable business that respects its team",
                    ].map((item, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex gap-3 transition-colors duration-300 group-hover:text-neutral-100"
                      >
                        <span className="text-emerald-400 transition-all duration-300 group-hover:scale-110">
                          ✓
                        </span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="group relative overflow-hidden rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-950/40 via-neutral-900/90 to-neutral-950/90 p-10 shadow-2xl shadow-blue-500/20 transition-all duration-500 hover:scale-[1.01] hover:border-blue-400/50 hover:shadow-blue-400/30"
            >
              {/* Animated gradient border */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-blue-400/30 to-blue-500/0 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-40" />

              {/* Glow orbs */}
              <div className="absolute -left-12 -top-12 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:bg-blue-400/30" />
              <div className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:bg-cyan-400/30" />

              <div className="relative">
                <p className="text-xl leading-relaxed text-neutral-200 transition-colors duration-300 group-hover:text-neutral-100 md:text-2xl">
                  <span className="text-blue-300">"</span>Indian schools don't need another shiny
                  dashboard, they need software that understands the messy, beautiful chaos of
                  running real institutions in this country. Multiple branches operating like
                  semi-autonomous worlds. Fee structures that look more like tax codes than
                  invoices. Limited resources spread dangerously thin. Constant compliance pressure
                  from every direction.
                  <br />
                  <br />
                  <span className="font-semibold text-white transition-all duration-300 group-hover:text-blue-50">
                    SquareCampus is built for that reality. It absorbs the complexity, tames the
                    operational madness, and gives schools a single, dependable system so they can
                    stop firefighting and start focusing on what actually matters: education.
                  </span>
                  <span className="text-blue-300">"</span>
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
                  <p className="text-sm font-medium text-blue-300/80 transition-colors duration-300 group-hover:text-blue-200">
                    Mohit Gupta, Founder & CTO
                  </p>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
                </div>
              </div>
            </motion.div>
          </section>

          {/* Values – the rules of engagement */}
          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-neutral-50">What we optimise for</h2>
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Every feature, integration, and workflow inside SquareCampus is measured against a
                simple question: does this reduce friction for the institution and increase trust in
                the data?
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
                SquareCampus doesn&apos;t arrive as a rigid template. It adapts to your workflows
                while giving you the structure you need to scale without losing control.
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
                        <p className="text-[0.78rem] text-muted-foreground">{pillar.caption}</p>
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
                            <span className="transition-colors duration-300 group-hover:text-neutral-100">
                              {point}
                            </span>
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
                Share how your institution operates today, and we&apos;ll walk you through how
                SquareCampus can simplify, connect, and de-risk your daily workflows.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <BookCallCta context="about-closing" className="justify-center sm:w-auto" />
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
