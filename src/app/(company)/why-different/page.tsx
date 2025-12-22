"use client";

import { motion } from "@/lib/motion";
import Link from "next/link";
import Script from "next/script";
import { Card, CardContent } from "@/components/ui/card";

import {
  createWebPageSchema,
  createBreadcrumbSchema,
  SEO_CONFIG,
} from "@/lib/seo";
import {
  WhyDifferentBackground,
  SectionDivider,
  FloatingBadge,
} from "@/components/marketing/backgrounds/why-different-bg";
import { BookCallCta } from "@/components/marketing/ctas";
import { FloatingHomeButton } from "@/components/marketing/floating-home-button";
import { ComparisonTable, StatCard } from "@/components/marketing/comparison-table";
import { AlertCircle, ArrowRight, Check, Clock, Component, DollarSign, Puzzle, Shield, Sparkles, TrendingUp, Users, X, Zap } from "@/icons";
import { LinkButton } from "@/components/marketing/link-button";

export default function WhyDifferentPage() {
  const pageUrl = `${SEO_CONFIG.baseUrl}/why-different`;
  const pageName = "Why SquareCampus Is Different";
  const pageDescription =
    "Professional comparison showing why SquareCampus is a unified School OS, not another educational ERP.";

  const webPageSchema = createWebPageSchema({
    name: pageName,
    description: pageDescription,
    url: pageUrl,
  });

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: SEO_CONFIG.baseUrl },
    { name: "Why Different", url: pageUrl },
  ]);

  const detailedComparisons = [
    {
      icon: Sparkles,
      title: "AI That Earns Its Keep",
      subtitle: "If it doesn't move a workflow, we don't ship it.",
      them: [
        "\"AI-powered insights (its a bar chart)\" with no workflow automation",
        "Charts that look smart but don't act smart",
        "Predictions promised, never operationalized",
      ],
      themQuote: "“Our AI roadmap is exciting - you'll see it in the next release.”",
      us: [
        "AI that actually helps: auto-categorize expenses, predict enrollment trends",
        "Natural language queries for complex reports",
        "Smart scheduling that learns from historical patterns",
        "Measured impact before launch, every time",
      ],
      gradient: "from-purple-500/20 via-pink-500/10",
      iconColor: "text-purple-400",
    },
    {
      icon: Puzzle,
      title: "One OS, Not a Patchwork",
      subtitle: "All modules share one data model, one set of workflows, one operating system.",
      them: [
        "Admissions, finance, HR, and comms sold as separate apps",
        "Each module needs its own login, admin, and export",
        "Unified reports require manual reconciliation",
      ],
      themQuote: "“We can integrate that for an additional implementation fee.”",
      us: [
        "One unified platform. Everything included.",
        "Admissions sees finance data. Finance sees academic data. It's called architecture.",
        "One database, one source of truth, one bill",
        "Real-time data everywhere because it's actually the same system",
      ],
      gradient: "from-blue-500/20 via-cyan-500/10",
      iconColor: "text-blue-400",
    },
    {
      icon: Clock,
      title: "The Roadmap That Ships",
      subtitle: "If it’s on the site, it’s in production.",
      them: [
        "Roadmaps that never land in production",
        "Beta features stuck in limbo",
        "Marketing pages ahead of reality",
      ],
      themQuote: "“It’s on the roadmap.”",
      us: [
        "If it's on our website, it's live in production",
        "Features ship when they're ready, not when marketing wants them",
        "Public changelog with actual dates",
        "No vaporware. No false promises.",
      ],
      gradient: "from-emerald-500/20 via-green-500/10",
      iconColor: "text-emerald-400",
    },
    {
      icon: Shield,
      title: "Built for Education, Not Retrofitted",
      subtitle: "Academic structures are native, not hacks.",
      them: [
        "Factory software reskinned with a school logo",
        "Academic terms squeezed into fiscal-year fields",
        "Multi-campus equals manual duplication",
      ],
      themQuote: "“Just treat classes as departments - it works the same.”",
      us: [
        "Built for schools from day one",
        "Understands terms, sections, academic calendars, grading periods",
        "Multi-campus architecture baked in, not bolted on",
        "School-specific workflows, not generic business processes",
      ],
      gradient: "from-amber-500/20 via-orange-500/10",
      iconColor: "text-amber-400",
    },
    {
      icon: DollarSign,
      title: "Pricing Without Landmines",
      subtitle: "Transparent from the first call to renewal.",
      them: [
        "Tiered pricing where essentials are upsells",
        "Add-on fees for parent login, reports, and exports",
        "Final invoice multiples the initial quote",
      ],
      themQuote: "“That feature is in our Pro+ tier.”",
      us: [
        "Full platform, one price. Every module included.",
        "Parent login enabled by default. No extra fees.",
        "Mobile apps included. White-labeling is a one-time fee.",
        "Forever free updates and feature releases.",
        "Simple pricing: Based on max students + staff count. That's it.",
        "Generous storage included. Need more? Reasonable rates, not highway robbery.",
        "Implementation (7 days) + Training included.",
        "One invoice. Transparent pricing. No shell games.",
      ],
      gradient: "from-rose-500/20 via-red-500/10",
      iconColor: "text-rose-400",
    },
    {
      icon: Zap,
      title: "Performance Without Excuses",
      subtitle: "Peak-day reliability isn’t a feature. It’s the baseline.",
      them: [
        "5+ second page loads for basic screens",
        "Timeouts during admissions and results",
        "Mobile feels like a sluggish web wrapper",
      ],
      themQuote: "“Please refresh and try again.”",
      us: [
        "Sub-second page loads. We cache intelligently.",
        "Built for peak load (enrollment day, result publishing)",
        "Real mobile apps, not web wrappers",
        "Your school runs fast. Your system should too.",
      ],
      gradient: "from-sky-500/20 via-cyan-500/10",
      iconColor: "text-sky-400",
    },
  ];

  const stats = [
    { label: "One unified system", value: "1", suffix: "" },
    { label: "Products to juggle", value: "8+", suffix: "", isCompetitor: true },
    { label: "Implementation time", value: "7", suffix: " days" },
    { label: "Their implementation", value: "6-12", suffix: " months", isCompetitor: true },
  ];

  const comparisonTableData = [
    {
      metric: "Products",
      them: "8+",
      us: "1",
      themBad: true,
      animated: false,
      takeaway: "One platform",
      examples: {
        title: "The Product Maze",
        items: [
          "SchoolPro™ + FeePro™ + AdmissionPro™",
          "Each sold separately, of course",
          "Want reports? That's ReportPro™ (extra)",
          "Parent app? That's ParentConnect™ ($5k/year)",
          "Total: 8+ products, 8+ invoices, 1 headache",
        ],
      },
    },
    {
      metric: "Databases",
      them: "8+",
      us: "1",
      themBad: true,
      animated: false,
      takeaway: "Single source",
      examples: {
        title: "Data Chaos",
        items: [
          "Student data in DB1, fees in DB2, attendance in DB3...",
          "Want a unified report? Good luck with that",
          "Data sync issues? \"Known limitation\"",
          "8 databases = 8x the backup nightmares",
          "One student, scattered across 8 systems",
        ],
      },
    },
    {
      metric: "Login Systems",
      them: "8+",
      us: "1",
      themBad: true,
      animated: false,
      takeaway: "One login",
      examples: {
        title: "Password Hell",
        items: [
          "Different login for each module. Remember 8 passwords!",
          "Admin portal, Parent portal, Teacher portal... all separate",
          "Password reset emails go to... which support team?",
          "SSO? That's an enterprise add-on ($$$)",
          "Students forget passwords weekly. Good luck, IT team.",
        ],
      },
    },
    { metric: "Implementation", them: "180 days", us: "7 days", themBad: true, animated: false, takeaway: "Go live fast" },
    {
      metric: "Support Teams",
      them: "???",
      us: 1,
      themBad: false,
      takeaway: "One team",
      examples: {
        title: "Support Roulette",
        items: [
          "Finance issue? Call Team A. Admissions? Team B.",
          "Teams don't talk to each other. You're the middleman.",
          "Ticket gets bounced between 3 departments",
          "\"That's not our module\" - everyone's favorite response",
          "Resolution time: 2 weeks (if you're lucky)",
        ],
      },
    },
    {
      metric: "Hidden Fees",
      them: "Many",
      us: "Zero",
      themBad: true,
      takeaway: "No surprises",
      examples: {
        title: "The Fine Print",
        items: [
          "Implementation: Extra. Data migration: Extra. Training: Extra.",
          "Annual maintenance: 18-22% of license cost (surprise!)",
          "Storage: 10GB free, then ₹5k/GB/month (!)",
          "Per-user licensing with complex tier calculations",
          "Mobile app updates: Subscription within a subscription",
          "Priority support: Only for platinum tier customers",
        ],
      },
    },
  ];

  const visualStats = [
    { label: "Time to Value", themValue: 180, usValue: 7, icon: Clock },
    { label: "System Complexity", themValue: 8, usValue: 1, icon: Puzzle },
    { label: "Uptime %", themValue: 95, usValue: 99.9, icon: Shield },
    { label: "Learning Curve (days)", themValue: 90, usValue: 7, icon: TrendingUp },
  ];

  return (
    <div className="relative min-h-screen bg-neutral-950 text-white">
      {/* Animated Background */}
      <WhyDifferentBackground />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/5 px-4 py-20 md:px-8 md:py-32">

        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FloatingBadge className="text-neutral-400">
              <AlertCircle className="h-3 w-3" />
              Built for the schools that run everything
            </FloatingBadge>

            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              Not Just Another
              <span className="block bg-gradient-to-r from-rose-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Educational ERP
              </span>
            </h1>

            <p className="mx-auto mb-5 max-w-2xl text-lg text-neutral-300 md:text-xl">
              Built from the ground up: every technology vetted, every feature battle-tested, every workflow measured for real-world value. One OS that scales from small schools to K-12 groups, coaching institutes, and multi-campus universities-without breaking.
            </p>
            <p className="mx-auto mb-8 max-w-2xl text-base font-semibold uppercase tracking-[0.24em] text-emerald-300">
              Verdict: fragmented systems are the tax on growth. We remove the tax.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <BookCallCta
                context="features-hero"
                label="See It Yourself"
                variant="primary"
              />
              <LinkButton
                href={"/about"}
                variant={"dark"}
                className={"group inline-flex items-center gap-1.5"}
              >
                <span>Our Story</span>
                <Component className={"w-4 h-4"} />
              </LinkButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-white/5 px-4 py-16 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <Card
                  className={`relative overflow-hidden border transition-all duration-500 hover:scale-[1.02] ${stat.isCompetitor
                    ? "border-rose-500/20 bg-gradient-to-br from-rose-950/30 via-neutral-900/80 to-neutral-950/90 shadow-xl shadow-rose-500/5 hover:border-rose-500/40 hover:shadow-rose-500/20"
                    : "border-emerald-500/20 bg-gradient-to-br from-emerald-950/30 via-neutral-900/80 to-neutral-950/90 shadow-xl shadow-emerald-500/5 hover:border-emerald-500/40 hover:shadow-emerald-500/20"
                    }`}
                >
                  {/* Glow effect */}
                  <div
                    className={`pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full blur-3xl transition-all duration-700 group-hover:scale-150 ${stat.isCompetitor
                      ? "bg-rose-500/20 group-hover:bg-rose-400/30"
                      : "bg-emerald-500/20 group-hover:bg-emerald-400/30"
                      }`}
                  />

                  <CardContent className="relative p-6 text-center">
                    <div
                      className={`mb-2 text-4xl font-bold transition-all duration-300 group-hover:scale-110 ${stat.isCompetitor ? "text-rose-400" : "text-emerald-400"
                        }`}
                    >
                      {stat.value}
                      <span className="text-2xl">{stat.suffix}</span>
                    </div>
                    <div className="text-sm text-neutral-400 transition-colors duration-300 group-hover:text-neutral-200">
                      {stat.isCompetitor && "× "}
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="relative border-b border-white/5 px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6 lg:sticky lg:top-24"
          >
            <FloatingBadge className="text-purple-400">
              <Sparkles className="h-3 w-3" />
              By The Numbers
            </FloatingBadge>
            <div className="space-y-3">
              <h2 className="text-3xl font-bold md:text-4xl">The Math Doesn&apos;t Lie</h2>
              <p className="text-neutral-300">
                Count the systems, count the databases, count the handoffs. The gaps show up fast.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-neutral-900/70 p-5">
              <div className="space-y-4 text-sm text-neutral-300">
                <div className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
                  <p>Every extra product adds a login, a workflow gap, and a data sync job.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sky-400/80" />
                  <p>Every extra database means reporting delays and reconciliation risk.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-rose-400/80" />
                  <p>Every extra vendor adds finger-pointing during critical school days.</p>
                </div>
              </div>
              <div className="mt-4 rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-xs uppercase tracking-[0.2em] text-neutral-400">
                Click a row to see the real-world examples.
              </div>
            </div>
            <div className="grid gap-4">
              {[
                { label: "Time to value", value: "7 days" },
                { label: "Operational handoffs", value: "1 system" },
                { label: "Support ownership", value: "Single team" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-neutral-900/60 px-4 py-3 text-sm"
                >
                  <span className="text-neutral-400">{item.label}</span>
                  <span className="font-semibold text-emerald-300">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/30 via-neutral-900/80 to-neutral-950/90 p-5 text-sm text-neutral-200">
              A single OS that survives anything you throw at it. That’s the quiet advantage schools feel every day.
            </div>
          </motion.div>

          <div className="relative">
            <div className="pointer-events-none absolute -right-16 top-6 h-40 w-40 rounded-full bg-purple-500/10 blur-[90px]" />
            <div className="pointer-events-none absolute -left-12 bottom-6 h-40 w-40 rounded-full bg-blue-500/10 blur-[90px]" />
            <ComparisonTable rows={comparisonTableData} />
          </div>
        </div>
      </section>

      <section className="relative border-b border-white/5 px-4 py-12 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 rounded-2xl border border-white/10 bg-neutral-900/70 px-6 py-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-emerald-300">
              Calm, connected operations
            </p>
            <p className="text-lg font-semibold text-white">
              Ready to move fast? We’ll build your migration plan and start immediately.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <BookCallCta context="why-different-mid" label="Book a walkthrough" variant="primary" />
            <LinkButton href="/security" variant="dark" className="group inline-flex items-center gap-1.5">
              <span>Security brief</span>
              <ArrowRight className="h-4 w-4" />
            </LinkButton>
          </div>
        </div>
      </section>

      {/* Visual Stats with Progress Bars */}
      <section className="relative border-b border-white/5 px-4 py-20 md:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <FloatingBadge className="mb-4 text-blue-400">
              <TrendingUp className="h-3 w-3" />
              Performance Metrics
            </FloatingBadge>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Where It Really Matters
            </h2>
            <p className="mx-auto max-w-2xl text-neutral-300">
              The numbers that decide whether a school day feels calm or chaotic.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {visualStats.map((stat, index) => (
              <StatCard
                key={stat.label}
                label={stat.label}
                themValue={stat.themValue}
                usValue={stat.usValue}
                icon={stat.icon}
                delay={index * 0.08}
              />
            ))}
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { label: "Migration playbook", value: "7–14 days" },
              { label: "Support response", value: "< 2 hours" },
              { label: "Peak-day uptime", value: "99.9%" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-neutral-900/70 px-5 py-4"
              >
                <p className="text-xs uppercase tracking-[0.24em] text-neutral-500">
                  {item.label}
                </p>
                <p className="mt-2 text-lg font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Detailed Comparisons */}
      <section className="relative px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <FloatingBadge className="mb-4 text-rose-400">
              <AlertCircle className="h-3 w-3" />
              Real Talk
            </FloatingBadge>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              The Uncomfortable Truths
            </h2>
            <p className="mx-auto max-w-2xl text-neutral-300">
              We’re not naming names. We’re naming patterns schools shouldn’t have to accept anymore.
            </p>
          </motion.div>

          <div className="space-y-12">
            {detailedComparisons.map((comparison, index) => {
              const Icon = comparison.icon;
              return (
                <motion.div
                  key={comparison.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <Card className="relative overflow-hidden rounded-2xl border border-neutral-800/60 bg-gradient-to-br from-neutral-900/60 via-neutral-950 to-neutral-950 shadow-2xl shadow-black/40 transition-all duration-500 hover:scale-[1.02] hover:border-neutral-700/80 hover:shadow-2xl hover:shadow-neutral-900/60">
                    {/* Glow effect */}
                    <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-purple-500/0 blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:bg-purple-500/20" />
                    <div className="pointer-events-none absolute -left-12 bottom-0 h-32 w-32 rounded-full bg-blue-500/0 blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:bg-blue-500/15" />

                    <CardContent className="relative p-8 md:p-10">
                      {/* Header */}
                      <div className="mb-8 flex items-start gap-4">
                        <div
                          className={`rounded-lg border border-white/10 bg-white/5 p-3 ${comparison.iconColor}`}
                        >
                          <Icon className="h-7 w-7" />
                        </div>
                        <div className="flex-1">
                          <h3 className="mb-2 text-2xl font-bold text-white md:text-3xl">
                            {comparison.title}
                          </h3>
                          <p className="text-neutral-400">
                            {comparison.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Comparison Grid */}
                      <div className="grid gap-6 md:grid-cols-2">
                        {/* Them */}
                        <div className="group/them relative overflow-hidden rounded-xl border border-rose-500/20 bg-gradient-to-br from-rose-950/30 via-neutral-900/80 to-neutral-950/90 p-6 shadow-xl shadow-rose-500/5 transition-all duration-500 hover:scale-[1.02] hover:border-rose-500/40 hover:shadow-rose-500/20">
                          {/* Glow effect */}
                          <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-rose-500/20 blur-3xl transition-all duration-700 group-hover/them:scale-150 group-hover/them:bg-rose-400/30" />

                          <div className="relative space-y-4">
                            <div className="flex items-center gap-2">
                              <div className="rounded-full bg-rose-500/20 p-1.5">
                                <X className="h-4 w-4 text-rose-400" />
                              </div>
                              <h4 className="font-semibold uppercase tracking-wider text-rose-400">
                                The Rest
                              </h4>
                            </div>
                            <ul className="space-y-3">
                              {comparison.them.map((point, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-2 text-sm text-neutral-300 transition-colors duration-300 group-hover/them:text-neutral-100"
                                >
                                  <span className="mt-0.5 text-rose-400 transition-all duration-300 group-hover/them:scale-110">
                                    X
                                  </span>
                                  <span className="leading-relaxed">{point}</span>
                                </li>
                              ))}
                            </ul>
                            {comparison.themQuote && (
                              <div className="rounded-xl border border-rose-500/20 bg-black/40 px-4 py-3 text-xs italic text-rose-200/80">
                                {comparison.themQuote}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Us */}
                        <div className="group/us relative overflow-hidden rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/30 via-neutral-900/80 to-neutral-950/90 p-6 shadow-xl shadow-emerald-500/5 transition-all duration-500 hover:scale-[1.02] hover:border-emerald-500/40 hover:shadow-emerald-500/20">
                          {/* Glow effect */}
                          <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-emerald-500/20 blur-3xl transition-all duration-700 group-hover/us:scale-150 group-hover/us:bg-emerald-400/30" />

                          <div className="relative space-y-4">
                            <div className="flex items-center gap-2">
                              <div className="rounded-full bg-emerald-500/20 p-1.5">
                                <Check className="h-4 w-4 text-emerald-400" />
                              </div>
                              <h4 className="font-semibold uppercase tracking-wider text-emerald-400">
                                SquareCampus
                              </h4>
                            </div>
                            <ul className="space-y-3">
                              {comparison.us.map((point, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-2 text-sm text-neutral-200 transition-colors duration-300 group-hover/us:text-neutral-50"
                                >
                                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400 transition-all duration-300 group-hover/us:scale-110" />
                                  <span className="leading-relaxed">{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Hall of Shame */}
      <section className="relative px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <FloatingBadge className="mb-4 text-amber-400">
              <AlertCircle className="h-3 w-3" />
              Hall of Shame
            </FloatingBadge>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Practices We Refuse to Copy
            </h2>
            <p className="mx-auto max-w-2xl text-neutral-300">
              Real behaviors from real competitors. No names needed-you'll recognize them instantly.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "The Phantom Feature",
                description: "Listed on homepage, doesn't exist in product",
                severity: "Critical",
                icon: Sparkles,
                iconClass: "text-purple-400",
              },
              {
                title: "The Eternal Beta",
                description: "\"Coming soon\" since 2019. Still coming.",
                severity: "High",
                icon: Clock,
                iconClass: "text-orange-400",
              },
              {
                title: "The Hidden Module",
                description: "Core features locked behind \"Premium\" tier",
                severity: "Critical",
                icon: Shield,
                iconClass: "text-rose-400",
              },
              {
                title: "The Upgrade Trap",
                description: "Free tier unusable. Paid tier starts at ₹50k/year",
                severity: "High",
                icon: DollarSign,
                iconClass: "text-amber-400",
              },
              {
                title: "The Data Hostage",
                description: "Export data? Pay exit fee or lose everything",
                severity: "Critical",
                icon: AlertCircle,
                iconClass: "text-red-400",
              },
              {
                title: "The Support Void",
                description: "Email-only support. Response time: 5-7 business days",
                severity: "Medium",
                icon: Users,
                iconClass: "text-neutral-400",
              },
            ].map((shame, index) => {
              const Icon = shame.icon;
              return (
                <motion.div
                  key={shame.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-xl border border-amber-500/20 bg-gradient-to-br from-amber-950/30 via-neutral-900/80 to-neutral-950/90 p-6 shadow-xl shadow-amber-500/5 transition-all duration-500 hover:scale-[1.02] hover:border-amber-500/40 hover:shadow-amber-500/20"
                >
                  <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-amber-500/20 blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:bg-amber-400/30" />

                  <div className="relative">
                    <div className="mb-4 flex items-center justify-between">
                      <div className={`rounded-lg border border-white/10 bg-white/5 p-2 ${shame.iconClass}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <span
                        className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${shame.severity === "Critical"
                          ? "bg-rose-500/20 text-rose-400"
                          : shame.severity === "High"
                            ? "bg-orange-500/20 text-orange-400"
                            : "bg-yellow-500/20 text-yellow-400"
                          }`}
                      >
                        {shame.severity}
                      </span>
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-white">
                      {shame.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-neutral-400">
                      {shame.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-sm italic text-neutral-500">
              "If your current provider is doing any of these... you deserve better." - Your IT Team
            </p>
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* UI Comparison: Cluttered vs Clean */}
      <section className="relative px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <FloatingBadge className="mb-4 text-sky-400">
              <Zap className="h-3 w-3" />
              UI Showdown
            </FloatingBadge>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Complexity vs Clarity
            </h2>
            <p className="mx-auto max-w-2xl text-neutral-300">
              One shows you everything. The other shows you what matters.
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Them: Cluttered */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl border border-rose-500/20 bg-gradient-to-br from-rose-950/30 via-neutral-900/80 to-neutral-950/90 p-8 shadow-2xl shadow-rose-500/5"
            >
              <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-rose-500/20 blur-3xl" />

              <div className="relative">
                <div className="mb-6 flex items-center gap-3">
                  <X className="h-6 w-6 text-rose-400" />
                  <h3 className="text-2xl font-bold text-white">Their UI</h3>
                </div>

                <div className="space-y-3">
                  {/* Mock cluttered sidebar */}
                  <div className="overflow-hidden rounded border border-rose-500/20 bg-rose-500/5 p-2">
                    <div className="mb-2 flex items-center gap-2 text-xs text-rose-400">
                      <div className="h-2 w-2 rounded-full bg-rose-400" />
                      <span>47 menu items (good luck finding anything)</span>
                    </div>
                    <div className="max-h-32 space-y-0.5 overflow-hidden text-[9px] text-neutral-500">
                      {[
                        "Dashboard", "Students", "Student List", "Student Details", "Student History",
                        "Admissions", "Admission Forms", "Admission Reports", "Admission Settings",
                        "Finance", "Fee Collection", "Fee Reports", "Fee Settings", "Fee History",
                        "Academic", "Classes", "Sections", "Subjects", "Timetable", "Attendance",
                        "Attendance Reports", "Leave Management", "Exams", "Exam Schedule",
                        "Grades", "Grade Reports", "Report Cards", "Certificates",
                        "Library", "Books", "Issue Books", "Return Books", "Library Reports",
                        "Transport", "Routes", "Vehicles", "Transport Fees", "Settings",
                        "User Settings", "System Settings", "Module Settings", "Reports",
                        "Custom Reports", "Scheduled Reports", "Report Builder", "Help"
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-1 rounded bg-neutral-800/50 px-1.5 py-0.5">
                          <div className="h-1 w-1 rounded-full bg-neutral-600" />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mock nested tabs */}
                  <div className="space-y-1 rounded border border-rose-500/20 bg-rose-500/5 p-2">
                    <div className="flex gap-1">
                      {["Main", "Admin", "Reports", "Settings"].map((tab, i) => (
                        <div key={i} className="rounded-t bg-neutral-800 px-2 py-0.5 text-[8px] text-neutral-400">
                          {tab}
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-1 pl-2">
                      {["Sub1", "Sub2", "Sub3", "More..."].map((tab, i) => (
                        <div key={i} className="rounded-t bg-neutral-800/70 px-1.5 py-0.5 text-[7px] text-neutral-500">
                          {tab}
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-1 pl-4">
                      {["Detail", "Options"].map((tab, i) => (
                        <div key={i} className="rounded-t bg-neutral-800/50 px-1 py-0.5 text-[6px] text-neutral-600">
                          {tab}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mock overlapping dialogs */}
                  <div className="relative h-24 rounded border border-rose-500/20 bg-rose-500/5 p-2">
                    <div className="absolute left-2 top-2 h-16 w-24 rounded border border-neutral-700 bg-neutral-900 p-1 text-[7px] text-neutral-500">
                      Dialog 1
                    </div>
                    <div className="absolute left-6 top-6 h-16 w-24 rounded border border-neutral-700 bg-neutral-900 p-1 text-[7px] text-neutral-500">
                      Dialog 2
                    </div>
                    <div className="absolute left-10 top-10 h-16 w-24 rounded border border-neutral-700 bg-neutral-900 p-1 text-[7px] text-neutral-400">
                      Dialog 3
                    </div>
                  </div>

                  <ul className="space-y-2 text-sm text-neutral-300">
                    <li className="flex items-start gap-2">
                      <span className="text-rose-400">×</span>
                      <span>3 levels of tabs (because why not?)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-400">×</span>
                      <span>Pop-ups on top of pop-ups on top of pop-ups</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-400">×</span>
                      <span>5+ clicks to do anything simple</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-400">×</span>
                      <span>Designed in 2005, still looks like it</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Us: Clean */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/30 via-neutral-900/80 to-neutral-950/90 p-8 shadow-2xl shadow-emerald-500/5"
            >
              <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-emerald-500/20 blur-3xl" />

              <div className="relative">
                <div className="mb-6 flex items-center gap-3">
                  <Check className="h-6 w-6 text-emerald-400" />
                  <h3 className="text-2xl font-bold text-white">SquareCampus</h3>
                </div>

                <div className="space-y-3">
                  {/* Mock search bar */}
                  <div className="rounded border border-emerald-500/20 bg-emerald-500/5 p-2">
                    <div className="mb-2 flex items-center gap-2 text-xs text-emerald-400">
                      <div className="h-2 w-2 rounded-full bg-emerald-400" />
                      <span>Universal search (find anything instantly)</span>
                    </div>
                    <div className="flex items-center gap-2 rounded bg-emerald-500/10 p-2">
                      <div className="h-2 w-2 rounded-full bg-emerald-300" />
                      <span className="text-[10px] text-emerald-200">
                        Search students, fees, reports, anything...
                      </span>
                    </div>
                  </div>

                  {/* Mock clean navigation */}
                  <div className="rounded border border-emerald-500/20 bg-emerald-500/5 p-3">
                    <div className="mb-2 flex items-center gap-2 text-xs text-emerald-400">
                      <div className="h-2 w-2 rounded-full bg-emerald-400" />
                      <span>6 core sections. Everything else is search.</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {["Dashboard", "Students", "Finance", "Academic", "Reports", "Settings"].map(
                        (item, i) => (
                          <div
                            key={i}
                            className="rounded bg-emerald-500/10 p-2 text-center text-[10px] text-emerald-300"
                          >
                            {item}
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Mock action cards */}
                  <div className="space-y-1.5 rounded border border-emerald-500/20 bg-emerald-500/5 p-2">
                    <div className="flex items-center gap-2 text-xs text-emerald-400">
                      <div className="h-2 w-2 rounded-full bg-emerald-400" />
                      <span>Quick actions (no nested menus)</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {["Admit Student", "Collect Fee", "Mark Attendance", "Generate Report"].map(
                        (action, i) => (
                          <div
                            key={i}
                            className="rounded bg-emerald-500/10 px-2 py-1 text-center text-[9px] text-emerald-200"
                          >
                            {action}
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <ul className="space-y-2 text-sm text-neutral-200">
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 text-emerald-400" />
                      <span>Flat hierarchy. 1-2 clicks max.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 text-emerald-400" />
                      <span>Modern, responsive, sub-second loads</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 text-emerald-400" />
                      <span>Context-aware shortcuts (learn what you use)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 text-emerald-400" />
                      <span>No pop-ups. No clutter. No training needed.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Final CTA */}
      <section className="relative px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <FloatingBadge className="mb-6 border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
              <Check className="h-3 w-3" />
              No Nonsense
            </FloatingBadge>

            <h2 className="mb-6 text-3xl font-bold md:text-5xl">
              Ready for Software That Actually Solves the Problems?
            </h2>

            <p className="mx-auto mb-10 max-w-2xl text-lg text-neutral-300">
              No buzzwords. No hidden fees. No 8-product bundle. Just a unified School OS that does what it says on the tin.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <BookCallCta
                context="features-hero"
                label="Book a Demo"
                variant="primary"
              />
              <LinkButton
                href={"/features"}
                variant={"dark"}
                className={"group inline-flex items-center gap-1.5"}
              >
                <span>Explore Features</span>
                <Component className={"w-4 h-4"} />
              </LinkButton>
            </div>
            <div className="mt-10 text-sm text-neutral-500">
              No credit card required. No sales pressure. Just honest conversation.
            </div>
          </motion.div>
        </div>
      </section>

      {/* Structured Data */}
      <Script
        id="webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <FloatingHomeButton href="/" label="Back to home" />
    </div>
  );
}
