"use client";

import { motion } from "@/lib/motion";
import Link from "next/link";
import { ArrowRight, Clock, DollarSign, Puzzle, Shield, Sparkles, Zap } from "@/icons";

export function WhyDifferent() {
  const painPoints = [
    {
      icon: Sparkles,
      title: "AI That Actually Works",
      problem: "\"AI-powered insights\" (it's a bar chart). AI mentioned 47 times on homepage, 0 actual AI features.",
      problemShort: "“AI-powered insights” that are just charts.",
      solution: "Auto-categorize expenses, predict enrollment trends, natural language queries. Real AI solving real problems.",
      solutionShort: "Real AI: forecasting, insights, and natural language queries.",
      gradient: "from-purple-500/20 via-pink-500/10",
      iconColor: "text-purple-400",
    },
    {
      icon: Puzzle,
      title: "One System, Not 8 Products",
      problem: "AdmissionsPro™ + FinancePro™ + ReportsPro™... Data in 8 databases. Want a unified report? Good luck.",
      problemShort: "Eight tools, eight databases, zero clarity.",
      solution: "One unified platform. One database. One source of truth. Everything included. No juggling act required.",
      solutionShort: "One platform, one database, one source of truth.",
      gradient: "from-blue-500/20 via-cyan-500/10",
      iconColor: "text-blue-400",
    },
    {
      icon: Clock,
      title: "7 Days, Not 6 Months",
      problem: "6-12 month implementations. \"Please wait while we migrate your data...\" (still waiting since Q2)",
      problemShort: "6–12 month rollouts and endless migrations.",
      solution: "Live in 7 days. Data migration included. Training included. No 6-month nightmare of downtime and chaos.",
      solutionShort: "Live in 7 days with migration + training included.",
      gradient: "from-emerald-500/20 via-green-500/10",
      iconColor: "text-emerald-400",
    },
    {
      icon: DollarSign,
      title: "One Price, No Shell Games",
      problem: "₹8/student \"Basic\" (missing features) → ₹80/student \"Pro\" (10x price!). Hidden fees appear after contract.",
      problemShort: "Tiered pricing with surprise add-ons.",
      solution: "Full platform, one price. Parent login included. Mobile apps: one-time fee. No surprise bills. Ever.",
      solutionShort: "One price, full platform, no hidden fees.",
      gradient: "from-rose-500/20 via-red-500/10",
      iconColor: "text-rose-400",
    },
    {
      icon: Shield,
      title: "School OS, Not Rebranded ERP",
      problem: "Built for factories in the 90s. \"Student\" is just \"Customer\" renamed in the database schema.",
      problemShort: "ERP software renamed for schools.",
      solution: "Built for schools from day one. Terms, sections, academic calendars, grading periods. Not generic business software.",
      solutionShort: "Built for schools, with real academic logic.",
      gradient: "from-amber-500/20 via-orange-500/10",
      iconColor: "text-amber-400",
    },
    {
      icon: Zap,
      title: "Fast, Not \"Loading...\"",
      problem: "5+ second page loads. \"Please wait while we fetch your data...\" (it's 10 rows). Times out on enrollment day.",
      problemShort: "Slow loads and timeouts on critical days.",
      solution: "Sub-second loads. Built for peak load (result day, enrollment day). Your school runs fast. Your system should too.",
      solutionShort: "Sub-second loads built for peak days.",
      gradient: "from-sky-500/20 via-cyan-500/10",
      iconColor: "text-sky-400",
    },
  ];

  return (
    <section id="why-different" className="relative overflow-hidden border-t border-white/5 bg-neutral-950 px-4 py-20 md:px-8 md:py-28">
      {/* Background glow effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/3 h-96 w-96 rounded-full bg-purple-500/10 blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-[128px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-neutral-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            The Truth
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Why We're Different
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-neutral-300 sm:text-base md:text-lg">
            We're not going to name names. But if you've shopped around, you know exactly what we're talking about.
          </p>
        </motion.div>

        {/* Comparison Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {painPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${point.gradient} to-transparent p-6 shadow-xl shadow-black/20 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:shadow-2xl`}
              >
                {/* Glow effect */}
                <div className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl transition-all duration-700 group-hover:scale-150 ${point.gradient.replace('from-', 'bg-').split(' ')[0].replace('/20', '/30')}`} />

                {/* Icon */}
                <div className="relative mb-4 inline-flex rounded-lg border border-white/10 bg-white/5 p-3">
                  <Icon className={`h-6 w-6 ${point.iconColor}`} />
                </div>

                {/* Title */}
                <h3 className="relative mb-3 text-lg font-semibold text-white md:text-xl">
                  {point.title}
                </h3>

                {/* The Problem */}
                <div className="relative mb-4 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium uppercase tracking-wider text-rose-400">
                      × Them
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-neutral-400 line-through md:text-sm">
                    <span className="sm:hidden">{point.problemShort}</span>
                    <span className="hidden sm:inline">{point.problem}</span>
                  </p>
                </div>

                {/* The Solution */}
                <div className="relative space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium uppercase tracking-wider text-emerald-400">
                      ✓ Us
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-neutral-200 md:text-sm">
                    <span className="sm:hidden">{point.solutionShort}</span>
                    <span className="hidden sm:inline">{point.solution}</span>
                  </p>
                </div>

                {/* Hover gradient overlay */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className={`absolute inset-0 bg-gradient-to-br ${point.gradient} to-transparent`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA to full page */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link
            href="/why-different"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-[2px] shadow-xl shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/30"
          >
            <span className="relative inline-flex items-center gap-2 rounded-full bg-neutral-950 px-8 py-3 text-sm font-semibold text-white transition-colors duration-300 group-hover:bg-neutral-900">
              See the Full Comparison
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-70" />
          </Link>
          <p className="mt-4 text-xs text-neutral-500">
            The complete breakdown of what makes us different
          </p>
        </motion.div>
      </div>
    </section>
  );
}
