"use client";

import { useRef } from "react";
import { useGsapReveal } from "@/lib/gsap-utils";
import Link from "next/link";
import { ArrowRight, BarChart3, Clock, DollarSign, MessageSquare, Puzzle, Shield, Sparkles, Zap } from "@/icons";

export function WhyDifferent() {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  useGsapReveal(headerRef, { y: 18, duration: 0.5 });
  useGsapReveal(gridRef, { y: 18, duration: 0.5, stagger: 0.08, selector: "[data-why-card]" });
  useGsapReveal(ctaRef, { y: 16, duration: 0.5, delay: 0.1 });

  const painPoints = [
    {
      icon: Sparkles,
      title: "AI That Actually Works",
      problem:
        "\"AI-powered insights\" that stop at static charts. Lots of buzzwords, very little automation.",
      problemShort: "AI slogans, no automation.",
      solution:
        "Auto-categorize expenses, forecast enrollment, and ask questions in natural language. Real AI solving real problems.",
      solutionShort: "Forecasting + auto-categorization + natural language queries.",
      gradient: "from-purple-500/20 via-pink-500/10",
      iconColor: "text-purple-400",
    },
    {
      icon: Puzzle,
      title: "One System, Not 8 Products",
      problem:
        "Admissions, fees, transport, HR—separate apps and separate databases. Unified reports become export gymnastics.",
      problemShort: "Silos everywhere, reports stitched by hand.",
      solution:
        "One unified platform, one shared data model, one source of truth. Everything connected, nothing bolted on.",
      solutionShort: "Single platform, shared data model, one source of truth.",
      gradient: "from-blue-500/20 via-cyan-500/10",
      iconColor: "text-blue-400",
    },
    {
      icon: Clock,
      title: "7 Days, Not 6 Months",
      problem:
        "Quarter-long rollouts with repeated data imports and training resets. Time lost and momentum broken.",
      problemShort: "Quarter-long rollouts and redo cycles.",
      solution:
        "Live in 7 days. Data migration and training included. Fast, guided onboarding without chaos.",
      solutionShort: "Live in 7 days with migration + training.",
      gradient: "from-emerald-500/20 via-green-500/10",
      iconColor: "text-emerald-400",
    },
    {
      icon: DollarSign,
      title: "One Price, No Shell Games",
      problem:
        "Intro pricing hides essentials behind add-ons and per-module fees. Cost creeps after signing.",
      problemShort: "Essential features paywalled.",
      solution:
        "Full platform, one predictable price. Parent login included. Mobile apps included. No surprise bills.",
      solutionShort: "One price, full platform, predictable renewals.",
      gradient: "from-rose-500/20 via-red-500/10",
      iconColor: "text-rose-400",
    },
    {
      icon: Shield,
      title: "School OS, Not Rebranded ERP",
      problem:
        "Generic ERPs repackaged for education. Academic workflows are forced to fit business templates.",
      problemShort: "Generic ERP relabeled.",
      solution:
        "Built for schools from day one: sections, terms, calendars, grading periods, and compliance baked in.",
      solutionShort: "Built for schools, with real academic logic.",
      gradient: "from-amber-500/20 via-orange-500/10",
      iconColor: "text-amber-400",
    },
    {
      icon: Zap,
      title: "Fast, Not \"Loading...\"",
      problem:
        "Seconds-long loads and timeouts on results day. Basic lists should not feel like data migrations.",
      problemShort: "Slow on critical days.",
      solution:
        "Sub-second loads built for peak days: admissions, results, and fee deadlines.",
      solutionShort: "Sub-second loads for peak days.",
      gradient: "from-sky-500/20 via-cyan-500/10",
      iconColor: "text-sky-400",
    },
    {
      icon: MessageSquare,
      title: "Support That Knows Schools",
      problem:
        "Support ping-pongs between sales, partners, and product. Context gets lost, time gets wasted.",
      problemShort: "Ticket ping-pong.",
      solution:
        "In-house, context-aware support from kickoff to go-live. Same team, faster answers.",
      solutionShort: "In-house, context-aware support.",
      gradient: "from-teal-500/20 via-emerald-500/10",
      iconColor: "text-teal-300",
    },
    {
      icon: BarChart3,
      title: "Live Visibility, Not Exports",
      problem:
        "Reports are nightly exports. Leadership sees yesterday and decisions get delayed.",
      problemShort: "Exports instead of live insights.",
      solution:
        "Live dashboards with drill-downs to the exact record. Decisions stay current.",
      solutionShort: "Live dashboards with drill-downs.",
      gradient: "from-indigo-500/20 via-sky-500/10",
      iconColor: "text-indigo-300",
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
        <div ref={headerRef} className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-neutral-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            Reality Check
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Why We're Different
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-neutral-300 sm:text-base md:text-lg">
            We won’t name names. But if you’ve evaluated vendors, you already know these patterns.
          </p>
        </div>

        {/* Comparison Grid */}
        <div ref={gridRef} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {painPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={point.title}
                data-why-card
                className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${point.gradient} to-transparent p-6 shadow-xl shadow-black/20 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl`}
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
              </div>
            );
          })}
        </div>

        {/* CTA to full page */}
        <div ref={ctaRef} className="mt-12 text-center">
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
        </div>
      </div>
    </section>
  );
}
