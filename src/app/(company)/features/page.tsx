"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { BookCallCta } from "@/components/marketing/ctas";
import { FloatingHomeButton } from "@/components/marketing/floating-home-button";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Bus,
  Check,
  ChevronDown,
  Database,
  DollarSign,
  Eye,
  GraduationCap,
  Home,
  Lock,
  MessageSquare,
  Puzzle,
  Shield,
  Sparkles,
  Users,
  Zap,
} from "@/components/icons";
import { cn } from "@/lib/utils";
import {
  createBreadcrumbSchema,
  createWebPageSchema,
  SEO_CONFIG,
} from "@/lib/seo";

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// DATA
// ============================================================================

const outcomeSignals = [
  {
    title: "One login, every workflow",
    description: "Staff, teachers, and parents access everything from a single authenticated session.",
    icon: <Users className="h-5 w-5" />,
    color: "blue",
  },
  {
    title: "Data flows, not exports",
    description: "Student records move from admissions to finance to academics automatically.",
    icon: <Database className="h-5 w-5" />,
    color: "emerald",
  },
  {
    title: "Live visibility, not reports",
    description: "Dashboards update in real-time. No waiting for nightly batch jobs.",
    icon: <Eye className="h-5 w-5" />,
    color: "purple",
  },
  {
    title: "Built for peak days",
    description: "Admission rushes, fee deadlines, result publishing - designed for load.",
    icon: <Zap className="h-5 w-5" />,
    color: "amber",
  },
];

const categoryOverview = [
  { id: "admissions", name: "Admissions", icon: Users, color: "blue", tagline: "Inquiry to enrollment" },
  { id: "finance", name: "Finance", icon: DollarSign, color: "emerald", tagline: "Fees, collections, audits" },
  { id: "academics", name: "Academics", icon: GraduationCap, color: "purple", tagline: "Timetables, exams, grades" },
  { id: "communication", name: "Communication", icon: MessageSquare, color: "amber", tagline: "All channels unified" },
  { id: "transport", name: "Transport", icon: Bus, color: "sky", tagline: "Routes, GPS, billing" },
  { id: "hostel", name: "Hostel", icon: Home, color: "rose", tagline: "Rooms, mess, security" },
  { id: "library", name: "Library", icon: BookOpen, color: "indigo", tagline: "Catalog, issue, returns" },
  { id: "hr", name: "HR & Payroll", icon: Briefcase, color: "teal", tagline: "Staff, attendance, salary" },
];

const coreModules = [
  {
    id: "admissions",
    title: "Admissions & Enrollment",
    subtitle: "From first inquiry to confirmed seat",
    icon: Users,
    color: "blue",
    description: "Replace spreadsheets and email threads with a single tracked workflow. Applications, documents, entrance exams, merit lists, and offer letters - all in one flow.",
    highlights: [
      "Online applications with document uploads",
      "Stage-by-stage approvals with ownership",
      "Entrance exam scores flow into selection",
      "Audit trail for every status change",
    ],
    outcome: "Admissions teams see every applicant's status instantly. No more asking 'where is this file?'",
  },
  {
    id: "finance",
    title: "Finance & Fees",
    subtitle: "Collections, concessions, compliance",
    icon: DollarSign,
    color: "emerald",
    description: "Model complex fee structures by program, class, or campus. Collect across payment modes with auto-receipts. Generate audit-ready reports from live data.",
    highlights: [
      "Fee structures with installments and concessions",
      "Multi-mode collection with reconciliation",
      "Role-based refunds and adjustments",
      "Live financial visibility by campus",
    ],
    outcome: "Finance teams stop chasing spreadsheets. Leadership sees collections in real-time.",
  },
  {
    id: "academics",
    title: "Academic Management",
    subtitle: "Timetables, attendance, assessments",
    icon: GraduationCap,
    color: "purple",
    description: "Build conflict-free timetables. Capture attendance with multiple inputs. Run exams, record marks, and publish report cards in one continuous flow.",
    highlights: [
      "Conflict-free timetable generation",
      "Real-time attendance with parent alerts",
      "Marks flow into grading automatically",
      "Report cards, transcripts, rank lists",
    ],
    outcome: "Teachers focus on teaching. Academic coordinators see class health at a glance.",
  },
  {
    id: "communication",
    title: "Communication Hub",
    subtitle: "Every channel, one inbox",
    icon: MessageSquare,
    color: "amber",
    description: "Send announcements through approved channels with delivery proof. Give parents one place for attendance, homework, fees, and updates.",
    highlights: [
      "Multi-channel: SMS, email, app, WhatsApp",
      "Role-aware targeting and broadcast",
      "Parent portal with self-service",
      "Delivery status and read receipts",
    ],
    outcome: "Parents stay informed. Office phones stop ringing for routine queries.",
  },
];

const operationsModules = [
  {
    id: "transport",
    title: "Transport",
    icon: Bus,
    color: "sky",
    features: ["Route planning", "Live GPS tracking", "Transport fee billing", "Driver logs"],
  },
  {
    id: "hostel",
    title: "Hostel",
    icon: Home,
    color: "rose",
    features: ["Room allocation", "Mess management", "Gate pass workflow", "Hostel billing"],
  },
  {
    id: "library",
    title: "Library",
    icon: BookOpen,
    color: "indigo",
    features: ["Book cataloging", "Issue & returns", "Overdue tracking", "Usage analytics"],
  },
  {
    id: "hr",
    title: "HR & Payroll",
    icon: Briefcase,
    color: "teal",
    features: ["Staff records", "Attendance tracking", "Payroll processing", "Leave management"],
  },
];

const platformBackbone = [
  {
    title: "Unified data model",
    description: "All modules share one database. A student in admissions is the same record in finance and academics.",
    icon: <Database className="h-5 w-5" />,
    color: "blue",
  },
  {
    title: "Role-based access",
    description: "RBAC built into the platform. Permissions cascade across modules automatically.",
    icon: <Lock className="h-5 w-5" />,
    color: "emerald",
  },
  {
    title: "Audit trails everywhere",
    description: "Every change is logged. Who changed what, when, and why - always available.",
    icon: <Eye className="h-5 w-5" />,
    color: "purple",
  },
  {
    title: "Security by default",
    description: "Encryption at rest and in transit. India data residency. Compliance-ready.",
    icon: <Shield className="h-5 w-5" />,
    color: "amber",
  },
];

const featureAccordion = [
  {
    category: "Admissions & Enrollment",
    features: [
      "Online application portal with document uploads",
      "Configurable admission forms by program",
      "Application fee collection",
      "Stage-based admission workflow",
      "Merit list generation",
      "Offer letter and confirmation",
      "Entrance exam management",
      "Bulk data import for transfers",
    ],
  },
  {
    category: "Finance & Fees",
    features: [
      "Fee structure by class/program/campus",
      "Installment and concession management",
      "Multi-mode payment collection",
      "Auto-receipt generation",
      "Dues tracking and reminders",
      "Refund and adjustment workflow",
      "Financial reports and ledgers",
      "Audit-ready exports",
    ],
  },
  {
    category: "Academic Management",
    features: [
      "Timetable generation with conflict detection",
      "Faculty and room allocation",
      "Attendance capture (app, biometric, manual)",
      "Parent attendance alerts",
      "Exam scheduling and hall tickets",
      "Marks entry with moderation",
      "Report card generation",
      "Transcript and rank lists",
    ],
  },
  {
    category: "Communication",
    features: [
      "SMS, email, and app notifications",
      "WhatsApp integration",
      "Parent and student portal",
      "Notice board and events",
      "Delivery tracking and receipts",
      "Role-based messaging",
      "Scheduled announcements",
      "Emergency broadcast",
    ],
  },
  {
    category: "Transport Management",
    features: [
      "Route and stop planning",
      "Vehicle and driver management",
      "Live GPS tracking",
      "Parent ETA notifications",
      "Transport fee billing",
      "Trip history and logs",
      "Maintenance scheduling",
      "Compliance tracking",
    ],
  },
  {
    category: "Hostel Management",
    features: [
      "Block and room allocation",
      "Bed availability tracking",
      "Mess billing and menu",
      "Gate pass workflow",
      "Visitor management",
      "Hostel attendance",
      "Hostel fee collection",
      "Warden dashboards",
    ],
  },
  {
    category: "Library System",
    features: [
      "Book cataloging with categories",
      "Copy and edition tracking",
      "Issue and return workflow",
      "Renewal and reservation",
      "Overdue fines",
      "Barcode/RFID support",
      "Usage reports",
      "Inventory audits",
    ],
  },
  {
    category: "HR & Payroll",
    features: [
      "Employee records and documents",
      "Contract and credential tracking",
      "Staff attendance with shifts",
      "Leave management",
      "Payroll with statutory deductions",
      "Payslip generation",
      "Appraisal workflows",
      "Department-wise reporting",
    ],
  },
];

// ============================================================================
// COMPONENTS
// ============================================================================

const accentColors: Record<string, { border: string; bg: string; text: string; glow: string }> = {
  blue: { border: "border-blue-500/30", bg: "bg-blue-500/10", text: "text-blue-400", glow: "bg-blue-500/20" },
  emerald: { border: "border-emerald-500/30", bg: "bg-emerald-500/10", text: "text-emerald-400", glow: "bg-emerald-500/20" },
  purple: { border: "border-purple-500/30", bg: "bg-purple-500/10", text: "text-purple-400", glow: "bg-purple-500/20" },
  amber: { border: "border-amber-500/30", bg: "bg-amber-500/10", text: "text-amber-400", glow: "bg-amber-500/20" },
  sky: { border: "border-sky-500/30", bg: "bg-sky-500/10", text: "text-sky-400", glow: "bg-sky-500/20" },
  rose: { border: "border-rose-500/30", bg: "bg-rose-500/10", text: "text-rose-400", glow: "bg-rose-500/20" },
  indigo: { border: "border-indigo-500/30", bg: "bg-indigo-500/10", text: "text-indigo-400", glow: "bg-indigo-500/20" },
  teal: { border: "border-teal-500/30", bg: "bg-teal-500/10", text: "text-teal-400", glow: "bg-teal-500/20" },
};

function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(18)].map((_, i) => (
        <div
          key={i}
          className={cn(
            "absolute h-1 w-1 rounded-full",
            i % 4 === 0 ? "bg-blue-400/30" : i % 4 === 1 ? "bg-emerald-400/30" : i % 4 === 2 ? "bg-purple-400/30" : "bg-amber-400/30"
          )}
          style={{
            left: `${5 + (i * 5) % 90}%`,
            top: `${8 + (i * 7) % 84}%`,
            animation: `float-features ${7 + (i % 5) * 2}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes float-features {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

function FeatureAccordionItem({ category, features }: { category: string; features: string[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/[0.06] last:border-b-0">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-white/[0.02]"
      >
        <span className="text-sm font-medium text-neutral-200">{category}</span>
        <div className="flex items-center gap-3">
          <span className="text-xs text-neutral-500">{features.length} features</span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-neutral-500 transition-transform duration-300",
              isOpen && "rotate-180"
            )}
          />
        </div>
      </button>
      <div
        className={cn(
          "grid transition-all duration-300",
          isOpen ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="grid gap-2 px-5 sm:grid-cols-2">
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-xs text-neutral-400">
                <Check className="h-3 w-3 shrink-0 text-emerald-400" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PAGE
// ============================================================================

export default function FeaturesPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const categoryRef = useRef<HTMLElement>(null);
  const coreRef = useRef<HTMLElement>(null);
  const opsRef = useRef<HTMLElement>(null);
  const backboneRef = useRef<HTMLElement>(null);
  const accordionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!pageRef.current) return;
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Hero
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelectorAll(".js-hero-animate"),
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out" }
        );
      }

      // Categories
      if (categoryRef.current) {
        gsap.fromTo(
          categoryRef.current.querySelectorAll(".js-category-card"),
          { autoAlpha: 0, y: 30, scale: 0.95 },
          {
            autoAlpha: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.05, ease: "power2.out",
            scrollTrigger: { trigger: categoryRef.current, start: "top 80%" },
          }
        );
      }

      // Core modules
      if (coreRef.current) {
        gsap.fromTo(
          coreRef.current.querySelectorAll(".js-core-module"),
          { autoAlpha: 0, y: 50 },
          {
            autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out",
            scrollTrigger: { trigger: coreRef.current, start: "top 80%" },
          }
        );
      }

      // Operations
      if (opsRef.current) {
        gsap.fromTo(
          opsRef.current.querySelectorAll(".js-ops-card"),
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out",
            scrollTrigger: { trigger: opsRef.current, start: "top 80%" },
          }
        );
      }

      // Backbone
      if (backboneRef.current) {
        gsap.fromTo(
          backboneRef.current.querySelectorAll(".js-backbone-card"),
          { autoAlpha: 0, x: -20 },
          {
            autoAlpha: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power2.out",
            scrollTrigger: { trigger: backboneRef.current, start: "top 80%" },
          }
        );
      }

      // Accordion
      if (accordionRef.current) {
        gsap.fromTo(
          accordionRef.current,
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out",
            scrollTrigger: { trigger: accordionRef.current, start: "top 85%" },
          }
        );
      }

      // CTA
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out",
            scrollTrigger: { trigger: ctaRef.current, start: "top 85%" },
          }
        );
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const pageUrl = `${SEO_CONFIG.baseUrl}/features`;
  const webPageSchema = createWebPageSchema({
    name: "SquareCampus Features",
    description: "Connected features for school operations: admissions, academics, finance, communication, and enterprise controls in one School OS.",
    url: pageUrl,
  });
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: SEO_CONFIG.baseUrl },
    { name: "Features", url: pageUrl },
  ]);

  return (
    <>
      <div ref={pageRef} className="relative min-h-screen overflow-hidden bg-neutral-950 text-white">
        {/* Background effects */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-10 top-20 h-80 w-80 rounded-full bg-blue-500/[0.06] blur-[120px]" />
          <div className="absolute right-10 top-1/3 h-72 w-72 rounded-full bg-purple-500/[0.05] blur-[100px]" />
          <div className="absolute bottom-1/4 left-1/3 h-96 w-96 rounded-full bg-emerald-500/[0.04] blur-[140px]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        </div>

        <FloatingParticles />

        {/* ================================================================ */}
        {/* HERO */}
        {/* ================================================================ */}
        <section ref={heroRef} className="relative px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <div className="js-hero-animate mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-blue-200">
                <Sparkles className="h-4 w-4" />
                Complete Feature Suite
              </div>

              <h1 className="js-hero-animate mb-5 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                A School OS,{" "}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                  not a feature pile.
                </span>
              </h1>

              <p className="js-hero-animate mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-neutral-300 md:text-xl">
                From admissions to graduation, every workflow stays connected. One platform, one data model,
                one source of truth that holds steady during peak weeks.
              </p>

              <div className="js-hero-animate flex flex-wrap items-center justify-center gap-4">
                <BookCallCta context="features-hero" label="Book a demo" variant="primary" />
                <Link
                  href="#categories"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-5 py-2.5 text-sm font-medium text-neutral-200 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]"
                >
                  Explore modules
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>

            {/* Outcome signals */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {outcomeSignals.map((signal) => {
                const colors = accentColors[signal.color];
                return (
                  <div
                    key={signal.title}
                    className="js-hero-animate group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.04]"
                  >
                    <div className={cn("absolute -right-6 -top-6 h-20 w-20 rounded-full blur-3xl transition-all duration-500 group-hover:scale-150", colors.glow)} />
                    <div className="relative">
                      <div className={cn("mb-3 inline-flex items-center justify-center rounded-lg p-2.5 ring-1", colors.bg, colors.text, colors.border)}>
                        {signal.icon}
                      </div>
                      <h3 className="mb-1 text-sm font-semibold text-white">{signal.title}</h3>
                      <p className="text-xs leading-relaxed text-neutral-400">{signal.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* CATEGORY OVERVIEW */}
        {/* ================================================================ */}
        <section ref={categoryRef} id="categories" className="relative border-t border-white/[0.06] px-4 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <h2 className="mb-3 text-2xl font-bold md:text-3xl">8 modules. One connected platform.</h2>
              <p className="mx-auto max-w-xl text-sm text-neutral-400">
                Every module shares the same data backbone. What you enter once flows everywhere it's needed.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
              {categoryOverview.map((cat) => {
                const colors = accentColors[cat.color];
                const Icon = cat.icon;
                return (
                  <div
                    key={cat.id}
                    className="js-category-card group relative overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 text-center backdrop-blur-sm transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.04]"
                  >
                    <div className={cn("absolute inset-x-0 top-0 h-0.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100", colors.bg)} />
                    <div className={cn("mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-300 group-hover:scale-110", colors.bg, colors.text)}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="text-xs font-semibold text-neutral-200">{cat.name}</p>
                    <p className="mt-0.5 text-[0.6rem] text-neutral-500">{cat.tagline}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* CORE MODULES */}
        {/* ================================================================ */}
        <section ref={coreRef} className="relative px-4 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-purple-200">
                <Puzzle className="h-4 w-4" />
                Core Modules
              </div>
              <h2 className="mb-3 text-2xl font-bold md:text-3xl">The foundation of daily operations</h2>
              <p className="mx-auto max-w-xl text-sm text-neutral-400">
                These four modules handle 80% of daily workflows. Built to work together, not just coexist.
              </p>
            </div>

            <div className="space-y-6">
              {coreModules.map((module, idx) => {
                const colors = accentColors[module.color];
                const Icon = module.icon;
                const isEven = idx % 2 === 0;

                return (
                  <div
                    key={module.id}
                    className={cn(
                      "js-core-module group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm transition-all duration-500 hover:border-white/[0.12]",
                    )}
                  >
                    <div className={cn("absolute -right-20 -top-20 h-60 w-60 rounded-full blur-[100px] transition-all duration-700 group-hover:scale-150", colors.glow)} />
                    <div className={cn("absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent to-transparent opacity-60", `via-${module.color}-400/70`)}
                      style={{
                        background: `linear-gradient(90deg, transparent, ${
                          module.color === "blue" ? "rgba(96,165,250,0.7)" :
                          module.color === "emerald" ? "rgba(52,211,153,0.7)" :
                          module.color === "purple" ? "rgba(168,85,247,0.7)" :
                          "rgba(251,191,36,0.7)"
                        }, transparent)`,
                      }}
                    />

                    <div className={cn("relative grid gap-6 p-6 md:p-8", isEven ? "lg:grid-cols-[1fr_1.2fr]" : "lg:grid-cols-[1.2fr_1fr]")}>
                      <div className={cn("space-y-4", !isEven && "lg:order-2")}>
                        <div className="flex items-center gap-3">
                          <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl ring-1", colors.bg, colors.text, colors.border)}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white">{module.title}</h3>
                            <p className="text-xs text-neutral-500">{module.subtitle}</p>
                          </div>
                        </div>

                        <p className="text-sm leading-relaxed text-neutral-300">{module.description}</p>

                        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                          <p className="text-xs leading-relaxed text-neutral-400">
                            <span className={cn("font-semibold", colors.text)}>Outcome:</span> {module.outcome}
                          </p>
                        </div>
                      </div>

                      <div className={cn("space-y-2", !isEven && "lg:order-1")}>
                        {module.highlights.map((highlight) => (
                          <div
                            key={highlight}
                            className="flex items-start gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 transition-colors duration-300 hover:bg-white/[0.04]"
                          >
                            <Check className={cn("mt-0.5 h-4 w-4 shrink-0", colors.text)} />
                            <span className="text-sm text-neutral-300">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* MID-PAGE CTA */}
        {/* ================================================================ */}
        <div className="border-y border-white/[0.06] bg-gradient-to-r from-blue-500/[0.03] via-purple-500/[0.03] to-emerald-500/[0.03] px-4 py-10 md:px-8">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 text-center md:flex-row md:justify-between md:text-left">
            <div className="space-y-1">
              <p className="text-lg font-semibold text-white">See how modules connect</p>
              <p className="text-sm text-neutral-400">Walk through real workflows with your specific use cases.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <BookCallCta context="features-mid" label="Schedule demo" variant="primary" />
              <Link
                href="/why-different"
                className="group inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-5 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-200 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]"
              >
                Why School OS
                <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* ================================================================ */}
        {/* OPERATIONS SUITE */}
        {/* ================================================================ */}
        <section ref={opsRef} className="relative px-4 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <h2 className="mb-3 text-2xl font-bold md:text-3xl">Operations suite</h2>
              <p className="mx-auto max-w-xl text-sm text-neutral-400">
                Transport, hostel, library, and HR - connected to the same student and staff records.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {operationsModules.map((module) => {
                const colors = accentColors[module.color];
                const Icon = module.icon;
                return (
                  <div
                    key={module.id}
                    className="js-ops-card group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.04]"
                  >
                    <div className={cn("absolute -right-6 -top-6 h-20 w-20 rounded-full blur-3xl transition-all duration-500 group-hover:scale-150", colors.glow)} />
                    <div className="relative">
                      <div className="mb-4 flex items-center gap-3">
                        <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg ring-1", colors.bg, colors.text, colors.border)}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="text-sm font-semibold text-white">{module.title}</h3>
                      </div>
                      <ul className="space-y-1.5">
                        {module.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-xs text-neutral-400">
                            <div className={cn("h-1 w-1 rounded-full", colors.text, "bg-current")} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* PLATFORM BACKBONE */}
        {/* ================================================================ */}
        <section ref={backboneRef} className="relative border-t border-white/[0.06] px-4 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-200">
                <Shield className="h-4 w-4" />
                Platform Backbone
              </div>
              <h2 className="mb-3 text-2xl font-bold md:text-3xl">What makes it a School OS</h2>
              <p className="mx-auto max-w-xl text-sm text-neutral-400">
                Not just features side-by-side. A unified architecture that connects everything.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {platformBackbone.map((item) => {
                const colors = accentColors[item.color];
                return (
                  <div
                    key={item.title}
                    className="js-backbone-card group flex gap-4 rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]"
                  >
                    <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ring-1 transition-all duration-300 group-hover:scale-105", colors.bg, colors.text, colors.border)}>
                      {item.icon}
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-semibold text-neutral-100">{item.title}</h3>
                      <p className="text-xs leading-relaxed text-neutral-400">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* FULL FEATURE LIST (ACCORDION) */}
        {/* ================================================================ */}
        <section ref={accordionRef} className="relative px-4 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10 text-center">
              <h2 className="mb-3 text-2xl font-bold md:text-3xl">Full feature list</h2>
              <p className="mx-auto max-w-xl text-sm text-neutral-400">
                For the detail-oriented. Expand any category to see all capabilities.
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm">
              {featureAccordion.map((item) => (
                <FeatureAccordionItem key={item.category} category={item.category} features={item.features} />
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* CLOSING CTA */}
        {/* ================================================================ */}
        <section ref={ctaRef} className="relative border-t border-white/[0.06] px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-200">
              <Check className="h-4 w-4" />
              Ready to explore
            </div>

            <h2 className="mb-5 text-3xl font-bold md:text-4xl">
              See how it works for your institution
            </h2>

            <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-neutral-300">
              Walk through real workflows, see how data flows between modules, and understand
              the migration path from your current setup.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <BookCallCta context="features-bottom" label="Book a demo" variant="primary" />
              <Link
                href="/security"
                className="group inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-6 py-2.5 text-sm font-medium text-neutral-200 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]"
              >
                Security & compliance
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Trust notes */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-neutral-500">
              <div className="flex items-center gap-2">
                <Lock className="h-3 w-3" />
                <span>Enterprise security</span>
              </div>
              <div className="h-3 w-px bg-white/10" />
              <div className="flex items-center gap-2">
                <Shield className="h-3 w-3" />
                <span>India data residency</span>
              </div>
              <div className="h-3 w-px bg-white/10" />
              <div className="flex items-center gap-2">
                <Zap className="h-3 w-3" />
                <span>Built for peak loads</span>
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
