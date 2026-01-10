"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Script from "next/script";
import { useEffect, useRef } from "react";
import { BookCallCta } from "@/components/marketing/ctas";
import { FloatingHomeButton } from "@/components/marketing/floating-home-button";
import {
  ArrowRight,
  Check,
  Database,
  Eye,
  FileCheck,
  Lock,
  Puzzle,
  Shield,
  Sparkles,
  Users,
  X,
  Zap,
} from "@/components/icons";
import { cn } from "@/lib/utils";
import {
  createBreadcrumbSchema,
  createWebPageSchema,
  SEO_CONFIG,
} from "@/lib/seo";

gsap.registerPlugin(ScrollTrigger);

// Floating particles for ambient effect
function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className={cn(
            "absolute h-1 w-1 rounded-full",
            i % 3 === 0 ? "bg-blue-400/25" : i % 3 === 1 ? "bg-emerald-400/25" : "bg-purple-400/25"
          )}
          style={{
            left: `${8 + (i * 7) % 84}%`,
            top: `${10 + (i * 11) % 80}%`,
            animation: `float-why ${8 + (i % 4) * 2}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes float-why {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
          50% { transform: translateY(-15px) translateX(8px); opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}

// Outcome cards data
const outcomeCards = [
  {
    title: "Everything connected",
    description: "Admissions, finance, academics, and communication share one data model. No exports, no reconciliation.",
    icon: <Puzzle className="h-5 w-5" />,
    color: "blue",
  },
  {
    title: "Fewer tools, less manual work",
    description: "Replace scattered apps with one platform. One login, one workflow, one source of truth.",
    icon: <Zap className="h-5 w-5" />,
    color: "emerald",
  },
  {
    title: "Built for real school days",
    description: "Designed for peak loads: admission rushes, fee deadlines, and results publishing.",
    icon: <Shield className="h-5 w-5" />,
    color: "purple",
  },
];

// Comparison data - 3 columns
const comparisonData = {
  headers: ["Traditional ERP", "Point Tools", "School OS (SquareCampus)"],
  rows: [
    {
      erp: "Modules stitched together with sync gaps",
      point: "Separate databases per app",
      schoolOS: "Single shared data model across all modules",
    },
    {
      erp: "Generic business workflows adapted for schools",
      point: "Each tool has its own logic",
      schoolOS: "Academic structures native: terms, sections, calendars",
    },
    {
      erp: "Heavy implementation, multi-month rollouts",
      point: "DIY integration burden",
      schoolOS: "Guided rollout with data migration included",
    },
    {
      erp: "Reports require exports and reconciliation",
      point: "Manual consolidation from multiple apps",
      schoolOS: "Live, auditable reports from one source",
    },
    {
      erp: "Multiple support teams and partners",
      point: "Many vendors, unclear ownership",
      schoolOS: "Single vendor accountability, direct support",
    },
  ],
};

// School OS explanation bullets
const schoolOSBullets = [
  {
    title: "Shared identity and permissions",
    description: "One login for staff, teachers, students, and parents. Role-based access controls apply everywhere.",
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: "Shared records across modules",
    description: "Student data flows from admissions to academics to finance. No duplicate entry, no sync failures.",
    icon: <Database className="h-4 w-4" />,
  },
  {
    title: "Fewer exports and imports",
    description: "Reports pull from live data. No nightly exports, no spreadsheet reconciliation.",
    icon: <FileCheck className="h-4 w-4" />,
  },
  {
    title: "Consistent experience everywhere",
    description: "Same interface patterns across all modules. Learn once, use everywhere.",
    icon: <Puzzle className="h-4 w-4" />,
  },
  {
    title: "Audit-friendly logs by default",
    description: "Every change is tracked. Who changed what, when, and why - always available.",
    icon: <Eye className="h-4 w-4" />,
  },
  {
    title: "Configurable workflows",
    description: "Approval chains, notifications, and automations adapt to how your institution works.",
    icon: <Sparkles className="h-4 w-4" />,
  },
];

// Mechanism / Principles data
const principles = [
  {
    title: "Unified data model",
    description: "All modules share one database. A student record in admissions is the same record in finance, academics, and transport.",
    color: "blue",
  },
  {
    title: "Role-based access by design",
    description: "RBAC is built into the platform, not bolted on. Permissions cascade across modules automatically.",
    color: "emerald",
  },
  {
    title: "Operational reliability under bursts",
    description: "Designed to handle peak days: admission deadlines, fee collection windows, and result publishing.",
    color: "purple",
  },
  {
    title: "Designed for adoption",
    description: "Guided onboarding with role-based training. Migration support and parallel runs before go-live.",
    color: "cyan",
  },
  {
    title: "Security posture baked in",
    description: "Encryption at rest and in transit. Audit logs for compliance. India data residency by default.",
    color: "amber",
  },
];

const accentColors: Record<string, { border: string; bg: string; text: string; glow: string }> = {
  blue: {
    border: "border-blue-500/30",
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    glow: "bg-blue-500/20",
  },
  emerald: {
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    glow: "bg-emerald-500/20",
  },
  purple: {
    border: "border-purple-500/30",
    bg: "bg-purple-500/10",
    text: "text-purple-400",
    glow: "bg-purple-500/20",
  },
  cyan: {
    border: "border-cyan-500/30",
    bg: "bg-cyan-500/10",
    text: "text-cyan-400",
    glow: "bg-cyan-500/20",
  },
  amber: {
    border: "border-amber-500/30",
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    glow: "bg-amber-500/20",
  },
};

export default function WhyDifferentPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const comparisonRef = useRef<HTMLElement>(null);
  const schoolOSRef = useRef<HTMLElement>(null);
  const mechanismRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);
  const midCtaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageRef.current) return;
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Hero animations
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelectorAll(".js-hero-animate"),
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
          }
        );
      }

      // Comparison section
      if (comparisonRef.current) {
        gsap.fromTo(
          comparisonRef.current.querySelectorAll(".js-comparison-animate"),
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: comparisonRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Mid CTA
      if (midCtaRef.current) {
        gsap.fromTo(
          midCtaRef.current,
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: midCtaRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // School OS section
      if (schoolOSRef.current) {
        gsap.fromTo(
          schoolOSRef.current.querySelectorAll(".js-schoolos-animate"),
          { autoAlpha: 0, x: -20 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: schoolOSRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Mechanism section
      if (mechanismRef.current) {
        gsap.fromTo(
          mechanismRef.current.querySelectorAll(".js-principle-card"),
          { autoAlpha: 0, y: 40, scale: 0.95 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: mechanismRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Final CTA
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 85%",
            },
          }
        );
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const pageUrl = `${SEO_CONFIG.baseUrl}/why-different`;
  const webPageSchema = createWebPageSchema({
    name: "Why SquareCampus Is Different",
    description: "See how SquareCampus differs from traditional ERPs and point tools. One unified School OS for all campus operations.",
    url: pageUrl,
  });
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: SEO_CONFIG.baseUrl },
    { name: "Why Different", url: pageUrl },
  ]);

  return (
    <>
      <div
        ref={pageRef}
        className="relative min-h-screen overflow-hidden bg-neutral-950 text-white"
      >
        {/* Background effects */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-blue-500/[0.06] blur-[100px]" />
          <div className="absolute right-10 top-40 h-64 w-64 rounded-full bg-purple-500/[0.05] blur-[100px]" />
          <div className="absolute bottom-1/3 left-1/3 h-80 w-80 rounded-full bg-emerald-500/[0.04] blur-[120px]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        </div>

        <FloatingParticles />

        {/* SECTION 1: Hero */}
        <section
          ref={heroRef}
          className="relative px-4 py-16 md:px-8 md:py-24"
        >
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <div className="js-hero-animate mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-blue-200">
                <Sparkles className="h-4 w-4" />
                School OS
              </div>

              <h1 className="js-hero-animate mb-5 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Why SquareCampus is{" "}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                  different
                </span>
              </h1>

              <p className="js-hero-animate mx-auto max-w-2xl text-lg leading-relaxed text-neutral-300 md:text-xl">
                Not another ERP with modules stitched together. A unified School OS where
                admissions, academics, finance, and communication share one backbone.
              </p>
            </div>

            {/* Outcome cards */}
            <div className="grid gap-5 md:grid-cols-3">
              {outcomeCards.map((card) => {
                const colors = accentColors[card.color];
                return (
                  <div
                    key={card.title}
                    className="js-hero-animate group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.04]"
                  >
                    <div
                      className={cn(
                        "absolute -right-8 -top-8 h-24 w-24 rounded-full blur-3xl transition-all duration-500 group-hover:scale-150",
                        colors.glow
                      )}
                    />
                    <div className="relative">
                      <div
                        className={cn(
                          "mb-4 inline-flex items-center justify-center rounded-lg p-3 ring-1",
                          colors.bg,
                          colors.text,
                          colors.border
                        )}
                      >
                        {card.icon}
                      </div>
                      <h3 className="mb-2 text-lg font-semibold text-white">{card.title}</h3>
                      <p className="text-sm leading-relaxed text-neutral-400">{card.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 2: The Comparison */}
        <section
          ref={comparisonRef}
          className="relative border-t border-white/[0.06] px-4 py-16 md:px-8 md:py-20"
        >
          <div className="mx-auto max-w-5xl">
            <div className="js-comparison-animate mb-10 text-center">
              <h2 className="mb-3 text-2xl font-bold md:text-3xl">The difference at a glance</h2>
              <p className="mx-auto max-w-xl text-sm text-neutral-400">
                How School OS compares to traditional ERPs and point tools in day-to-day operations.
              </p>
            </div>

            {/* Comparison table - mobile: stacked cards, desktop: table */}
            <div className="js-comparison-animate overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm">
              {/* Desktop table header */}
              <div className="hidden border-b border-white/[0.08] md:grid md:grid-cols-3">
                <div className="border-r border-white/[0.08] bg-rose-500/[0.03] px-6 py-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-rose-300">
                    <X className="h-4 w-4" />
                    Traditional ERP
                  </div>
                </div>
                <div className="border-r border-white/[0.08] bg-amber-500/[0.03] px-6 py-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-amber-300">
                    <X className="h-4 w-4" />
                    Point Tools
                  </div>
                </div>
                <div className="bg-emerald-500/[0.05] px-6 py-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-emerald-300">
                    <Check className="h-4 w-4" />
                    School OS
                  </div>
                </div>
              </div>

              {/* Rows */}
              <div className="divide-y divide-white/[0.06]">
                {comparisonData.rows.map((row, idx) => (
                  <div key={idx} className="md:grid md:grid-cols-3">
                    {/* Mobile: stacked layout */}
                    <div className="block space-y-3 p-5 md:hidden">
                      <div className="flex items-start gap-2">
                        <X className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
                        <div>
                          <span className="text-[0.65rem] font-medium uppercase tracking-wide text-rose-400">ERP</span>
                          <p className="text-sm text-neutral-400">{row.erp}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <X className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                        <div>
                          <span className="text-[0.65rem] font-medium uppercase tracking-wide text-amber-400">Point</span>
                          <p className="text-sm text-neutral-400">{row.point}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                        <div>
                          <span className="text-[0.65rem] font-medium uppercase tracking-wide text-emerald-400">School OS</span>
                          <p className="text-sm text-neutral-200">{row.schoolOS}</p>
                        </div>
                      </div>
                    </div>

                    {/* Desktop: side by side */}
                    <div className="hidden border-r border-white/[0.06] px-6 py-4 md:block">
                      <p className="text-sm text-neutral-500">{row.erp}</p>
                    </div>
                    <div className="hidden border-r border-white/[0.06] px-6 py-4 md:block">
                      <p className="text-sm text-neutral-500">{row.point}</p>
                    </div>
                    <div className="hidden bg-emerald-500/[0.02] px-6 py-4 md:block">
                      <p className="text-sm text-neutral-200">{row.schoolOS}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mid-page CTA */}
        <div
          ref={midCtaRef}
          className="border-y border-white/[0.06] bg-gradient-to-r from-blue-500/[0.03] via-purple-500/[0.03] to-emerald-500/[0.03] px-4 py-10 md:px-8"
        >
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 text-center md:flex-row md:justify-between md:text-left">
            <div className="space-y-1">
              <p className="text-lg font-semibold text-white">See how it works for your institution</p>
              <p className="text-sm text-neutral-400">
                Walk through workflows, data flows, and reporting with your specific use case.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <BookCallCta context="why-different-mid" label="Schedule walkthrough" variant="primary" />
              <Link
                href="/features"
                className="group inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-5 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-200 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]"
              >
                Explore features
                <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* SECTION 3: What School OS means */}
        <section
          ref={schoolOSRef}
          className="relative px-4 py-16 md:px-8 md:py-20"
        >
          <div className="mx-auto max-w-5xl">
            <div className="js-schoolos-animate mb-10">
              <h2 className="mb-3 text-2xl font-bold md:text-3xl">What "School OS" actually means</h2>
              <p className="max-w-2xl text-sm leading-relaxed text-neutral-400">
                Not just a label. A different architecture that changes how data flows, how teams work, and how reports get generated.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {schoolOSBullets.map((bullet) => (
                <div
                  key={bullet.title}
                  className="js-schoolos-animate group flex gap-4 rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/30 transition-all duration-300 group-hover:scale-105">
                    {bullet.icon}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-neutral-100">{bullet.title}</h3>
                    <p className="text-xs leading-relaxed text-neutral-400">{bullet.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: How we deliver it (Mechanism) */}
        <section
          ref={mechanismRef}
          className="relative border-t border-white/[0.06] px-4 py-16 md:px-8 md:py-20"
        >
          <div className="mx-auto max-w-5xl">
            <div className="mb-10 text-center">
              <h2 className="mb-3 text-2xl font-bold md:text-3xl">How we deliver it</h2>
              <p className="mx-auto max-w-xl text-sm text-neutral-400">
                The principles behind the platform. Built for schools that need reliability, not just features.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {principles.map((principle, idx) => {
                const colors = accentColors[principle.color];
                return (
                  <div
                    key={principle.title}
                    className={cn(
                      "js-principle-card group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.04]",
                      idx === 4 && "md:col-span-2 lg:col-span-1"
                    )}
                  >
                    <div
                      className={cn(
                        "absolute -right-8 -top-8 h-24 w-24 rounded-full blur-3xl transition-all duration-500 group-hover:scale-150",
                        colors.glow
                      )}
                    />
                    <div
                      className={cn(
                        "absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                        `via-${principle.color}-400/70`
                      )}
                      style={{
                        background: `linear-gradient(90deg, transparent, ${
                          principle.color === "blue" ? "rgba(96,165,250,0.7)" :
                          principle.color === "emerald" ? "rgba(52,211,153,0.7)" :
                          principle.color === "purple" ? "rgba(168,85,247,0.7)" :
                          principle.color === "cyan" ? "rgba(34,211,238,0.7)" :
                          "rgba(251,191,36,0.7)"
                        }, transparent)`,
                      }}
                    />
                    <div className="relative">
                      <div className="mb-2 flex items-center gap-2">
                        <div className={cn("h-2 w-2 rounded-full", colors.text, "bg-current")} />
                        <span className={cn("text-[0.65rem] font-semibold uppercase tracking-[0.15em]", colors.text)}>
                          Principle
                        </span>
                      </div>
                      <h3 className="mb-2 text-base font-semibold text-white">{principle.title}</h3>
                      <p className="text-sm leading-relaxed text-neutral-400">{principle.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 5: Final CTA + Trust Notes */}
        <section
          ref={ctaRef}
          className="relative border-t border-white/[0.06] px-4 py-16 md:px-8 md:py-24"
        >
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-200">
              <Check className="h-4 w-4" />
              Ready to see it
            </div>

            <h2 className="mb-5 text-3xl font-bold md:text-4xl">
              See how SquareCampus fits your institution
            </h2>

            <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-neutral-300">
              Walk through real workflows, see how data flows between modules, and understand
              the migration path from your current setup.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <BookCallCta context="why-different-bottom" label="Book a demo" variant="primary" />
              <Link
                href="/features"
                className="group inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-6 py-2.5 text-sm font-medium text-neutral-200 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]"
              >
                Explore features
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Trust notes */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-neutral-500">
              <div className="flex items-center gap-2">
                <Lock className="h-3 w-3" />
                <span>Security-first</span>
              </div>
              <div className="h-3 w-px bg-white/10" />
              <div className="flex items-center gap-2">
                <Shield className="h-3 w-3" />
                <span>Privacy-aware</span>
              </div>
              <div className="h-3 w-px bg-white/10" />
              <div className="flex items-center gap-2">
                <Zap className="h-3 w-3" />
                <span>Built for schools that run on deadlines</span>
              </div>
            </div>
          </div>
        </section>
      </div>

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
    </>
  );
}
