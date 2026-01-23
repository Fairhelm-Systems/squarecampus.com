"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Script from "next/script";
import { useEffect, useRef } from "react";
import { BookCallCta } from "@/components/marketing/ctas";
import { FloatingHomeButton } from "@/components/marketing/floating-home-button";
import { Card, CardContent } from "@/components/ui/card";
import {
  createWebPageSchema,
  createBreadcrumbSchema,
  SEO_CONFIG,
} from "@/lib/seo";
import {
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Briefcase,
  Bus,
  Calendar,
  Check,
  Crown,
  Database,
  DollarSign,
  Eye,
  FileText,
  GraduationCap,
  Home,
  Lock,
  MessageSquare,
  Network,
  Shield,
  Target,
  Users,
  X,
  Zap,
} from "@/icons";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const modules = [
  // Foundation Modules
  {
    icon: BookOpen,
    name: "Learning (LMS)",
    description: "Online courses, assignments, quizzes, video lessons, and live classes",
    color: "blue",
    category: "Foundation",
  },
  {
    icon: GraduationCap,
    name: "Admissions",
    description: "Online applications, merit lists, entrance exams, and enrollment workflow",
    color: "emerald",
    category: "Foundation",
  },
  {
    icon: DollarSign,
    name: "Finance & Fees",
    description: "Fee collection, payment gateways, receipts, reports, and financial analytics",
    color: "purple",
    category: "Foundation",
  },
  {
    icon: BarChart3,
    name: "Academics",
    description: "Timetables, attendance, exams, grading, report cards, and performance tracking",
    color: "cyan",
    category: "Foundation",
  },
  {
    icon: MessageSquare,
    name: "Communication",
    description: "SMS, email, app notifications, WhatsApp, parent portal, and chat",
    color: "blue",
    category: "Foundation",
  },
  // Operations Suite
  {
    icon: Bus,
    name: "Transport",
    description: "Route planning, GPS tracking, driver management, and transport fees",
    color: "emerald",
    category: "Operations",
  },
  {
    icon: Home,
    name: "Hostel",
    description: "Room allocation, mess billing, gate passes, and hostel attendance",
    color: "purple",
    category: "Operations",
  },
  {
    icon: BookOpen,
    name: "Library",
    description: "Book cataloging, issue/return, fines, digital library, and analytics",
    color: "cyan",
    category: "Operations",
  },
  {
    icon: Briefcase,
    name: "HR & Payroll",
    description: "Staff records, payroll, attendance, leave, appraisals, and compliance",
    color: "blue",
    category: "Operations",
  },
  // Extended Academic
  {
    icon: Target,
    name: "Training & Placement",
    description: "Company registration, job postings, interview scheduling, and analytics",
    color: "emerald",
    category: "Extended",
  },
  {
    icon: FileText,
    name: "Examination",
    description: "Hall allocation, invigilator roster, result processing, and transcripts",
    color: "purple",
    category: "Extended",
  },
  {
    icon: Zap,
    name: "Research & Development",
    description: "Grant tracking, publications, lab booking, and PhD scholar management",
    color: "cyan",
    category: "Extended",
  },
  {
    icon: Users,
    name: "Alumni",
    description: "Alumni directory, events, donations, mentorship, and engagement tracking",
    color: "blue",
    category: "Extended",
  },
  // Operational Excellence
  {
    icon: DollarSign,
    name: "Canteen",
    description: "Menu planning, pre-ordering, student balance, and vendor management",
    color: "emerald",
    category: "Excellence",
  },
  {
    icon: Shield,
    name: "Health Center",
    description: "Health records, appointments, prescriptions, and vaccination tracking",
    color: "purple",
    category: "Excellence",
  },
  {
    icon: Target,
    name: "Sports & Recreation",
    description: "Facility booking, tournaments, equipment inventory, and coach management",
    color: "cyan",
    category: "Excellence",
  },
  {
    icon: Calendar,
    name: "Events",
    description: "Event proposals, venue booking, registration, and budget tracking",
    color: "blue",
    category: "Excellence",
  },
  {
    icon: Database,
    name: "Inventory",
    description: "Asset cataloging, stock management, maintenance, and depreciation tracking",
    color: "emerald",
    category: "Excellence",
  },
  {
    icon: FileText,
    name: "Procurement",
    description: "Vendor registration, purchase requisition, invoicing, and contracts",
    color: "purple",
    category: "Excellence",
  },
  // Governance
  {
    icon: Shield,
    name: "Accreditation",
    description: "NAAC/NBA tracking, compliance checklists, and self-assessment reports",
    color: "cyan",
    category: "Governance",
  },
  {
    icon: Eye,
    name: "Grievance & Feedback",
    description: "Grievance portal, SLA tracking, anonymous feedback, and surveys",
    color: "blue",
    category: "Governance",
  },
];

const hierarchy = [
  {
    level: "Organisation",
    icon: Crown,
    color: "blue",
    roles: ["Super Admin", "Organisation Admin", "Finance Head"],
    permissions: "Full access across all schools, campuses, and modules",
  },
  {
    level: "School",
    icon: Shield,
    color: "emerald",
    roles: ["School Admin", "Principal", "Vice Principal"],
    permissions: "Access across all campuses under this school brand",
  },
  {
    level: "Campus",
    icon: Users,
    color: "purple",
    roles: ["Campus Director", "Academic Head", "Admin Officer"],
    permissions: "Full control within their campus boundaries",
  },
  {
    level: "Department",
    icon: Lock,
    color: "cyan",
    roles: ["HOD", "Department Coordinator", "Lab In-charge"],
    permissions: "Department-scoped access to relevant modules",
  },
  {
    level: "Staff",
    icon: Eye,
    color: "blue",
    roles: ["Teacher", "Accountant", "Librarian"],
    permissions: "Module-specific access based on job function",
  },
];

const ecosystemNodes = [
  { label: "Admin Console", description: "Central control for operations", icon: Crown, color: "violet" },
  { label: "Teacher App", description: "Attendance, grades, communication", icon: BookOpen, color: "sky" },
  { label: "Parent Portal", description: "Fees, progress, notifications", icon: Users, color: "emerald" },
  { label: "Student App", description: "Schedule, assignments, results", icon: GraduationCap, color: "amber" },
  { label: "API Gateway", description: "Third-party integrations", icon: Zap, color: "rose" },
  { label: "Analytics Hub", description: "Dashboards and insights", icon: BarChart3, color: "cyan" },
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
};

function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(12)].map((_, i) => (
        <div
          key={`particle-${i}`}
          className="absolute h-1 w-1 rounded-full bg-white/20"
          style={{
            left: `${10 + ((i * 7) % 80)}%`,
            top: `${15 + ((i * 11) % 70)}%`,
            animation: `float-particle ${8 + (i % 4) * 2}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes float-particle {
          0%, 100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.2; }
          25% { transform: translateY(-20px) translateX(10px) scale(1.2); opacity: 0.4; }
          50% { transform: translateY(-10px) translateX(-5px) scale(0.8); opacity: 0.3; }
          75% { transform: translateY(-25px) translateX(15px) scale(1.1); opacity: 0.35; }
        }
      `}</style>
    </div>
  );
}

export default function EcosystemPage() {
  const pageRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const modulesRef = useRef<HTMLElement>(null);
  const rbacRef = useRef<HTMLElement>(null);
  const architectureRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  const pageUrl = `${SEO_CONFIG.baseUrl}/ecosystem`;
  const pageName = "SquareCampus Ecosystem";
  const pageDescription =
    "Connected ecosystem for school management: admin console, teacher tools, mobile apps, integrations, and security. One platform, multiple touchpoints, single source of truth.";

  const webPageSchema = createWebPageSchema({
    name: pageName,
    description: pageDescription,
    url: pageUrl,
  });

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: SEO_CONFIG.baseUrl },
    { name: "Ecosystem", url: pageUrl },
  ]);

  useEffect(() => {
    if (!pageRef.current) return;
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Hero animations
      if (heroRef.current) {
        const heroElements = heroRef.current.querySelectorAll(".js-hero-animate");
        gsap.fromTo(
          heroElements,
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

      // Modules section
      if (modulesRef.current) {
        gsap.fromTo(
          modulesRef.current.querySelectorAll(".js-module-card"),
          { autoAlpha: 0, y: 40, scale: 0.95 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: modulesRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // RBAC section
      if (rbacRef.current) {
        gsap.fromTo(
          rbacRef.current.querySelectorAll(".js-rbac-animate"),
          { autoAlpha: 0, x: -40 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: rbacRef.current,
              start: "top 75%",
            },
          }
        );
      }

      // Architecture section
      if (architectureRef.current) {
        gsap.fromTo(
          architectureRef.current.querySelectorAll(".js-arch-animate"),
          { autoAlpha: 0, y: 30, scale: 0.9 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: architectureRef.current,
              start: "top 75%",
            },
          }
        );
      }

      // CTA section
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

  return (
    <>
      <Script
        id="ecosystem-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [webPageSchema, breadcrumbSchema],
          }),
        }}
      />

      <main
        ref={pageRef}
        className="relative overflow-hidden bg-neutral-950 px-4 py-16 sm:px-6 lg:px-10"
      >
        {/* Background effects */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-6 top-4 h-64 w-64 rounded-full bg-sky-500/[0.08] blur-3xl" />
          <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-violet-500/[0.08] blur-[110px]" />
          <div className="absolute bottom-1/4 left-1/3 h-80 w-80 rounded-full bg-purple-500/[0.05] blur-[120px]" />
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />
        </div>

        <FloatingParticles />

        <div className="relative mx-auto flex max-w-6xl flex-col gap-20">
          {/* Hero */}
          <section
            ref={heroRef}
            className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 shadow-2xl shadow-sky-500/10 backdrop-blur-sm md:p-10"
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-10 top-12 h-44 w-44 rounded-full bg-sky-500/[0.12] blur-3xl" />
              <div className="absolute right-4 top-6 h-52 w-52 rounded-full bg-violet-500/[0.08] blur-3xl" />
              <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
            </div>

            <div className="relative grid items-start gap-8 lg:grid-cols-[1.7fr_1fr]">
              <div className="space-y-5">
                <div className="js-hero-animate inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-sky-200">
                  <Network className="h-4 w-4" />
                  Connected Platform
                </div>

                <h1 className="js-hero-animate max-w-4xl text-4xl font-bold leading-tight text-white md:text-5xl lg:text-[52px]">
                  One Ecosystem.
                  <span className="block bg-gradient-to-r from-sky-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                    Infinite Possibilities.
                  </span>
                </h1>

                <p className="js-hero-animate max-w-3xl text-lg leading-relaxed text-neutral-300 md:text-xl">
                  SquareCampus isn't just software—it's a complete ecosystem. Admin console, teacher
                  tools, mobile apps, integrations, and shared data flows connected through a single
                  source of truth. That backbone stays stable when campuses are stretched.
                </p>

                <div className="js-hero-animate flex flex-wrap gap-3">
                  <BookCallCta context="ecosystem-hero" className="justify-center sm:w-auto" />
                  <Link
                    href="/about"
                    className="group inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-5 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-200 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]"
                  >
                    Our Story
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>

                {/* Hero highlights */}
                <div className="grid w-full gap-4 md:grid-cols-3">
                  {[
                    {
                      title: "21 Core Modules",
                      description: "Admissions to alumni, every workflow covered",
                      icon: <Database className="h-4 w-4" />,
                      color: "blue",
                    },
                    {
                      title: "5-Tier RBAC",
                      description: "Granular permissions at every level",
                      icon: <Shield className="h-4 w-4" />,
                      color: "emerald",
                    },
                    {
                      title: "Single Source",
                      description: "One database, zero sync issues",
                      icon: <Target className="h-4 w-4" />,
                      color: "purple",
                    },
                  ].map((item) => {
                    const colors = accentColors[item.color];
                    return (
                      <div
                        key={item.title}
                        className="js-hero-animate group relative overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.04]"
                      >
                        <div
                          className={cn(
                            "absolute -right-6 -top-8 h-16 w-16 rounded-full blur-2xl transition-all duration-500 group-hover:scale-150",
                            colors.glow
                          )}
                        />
                        <div className="relative flex items-start gap-3">
                          <div
                            className={cn(
                              "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ring-1",
                              colors.bg,
                              colors.text,
                              colors.border
                            )}
                          >
                            {item.icon}
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-semibold text-neutral-50">{item.title}</p>
                            <p className="text-xs leading-relaxed text-neutral-300">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right side - ecosystem visualization */}
              <div className="js-hero-animate relative overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-b from-violet-500/[0.08] via-neutral-950 to-neutral-950 p-6 shadow-lg shadow-violet-500/10 backdrop-blur-sm">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.12),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(14,165,233,0.08),transparent_35%)]" />

                {/* Animated grid background */}
                <div className="pointer-events-none absolute inset-0 opacity-30">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />
                </div>

                <div className="relative space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-violet-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-violet-100 ring-1 ring-violet-500/30">
                    <Zap className="h-3.5 w-3.5" />
                    Ecosystem Overview
                  </div>

                  {/* Enhanced Central hub visualization */}
                  <div className="relative flex h-64 items-center justify-center">
                    {/* Animated orbit rings */}
                    <div className="absolute h-48 w-48 rounded-full border border-violet-500/10">
                      <div
                        className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_10px_rgba(139,92,246,0.8)]"
                        style={{ animation: "orbit 8s linear infinite" }}
                      />
                    </div>
                    <div className="absolute h-36 w-36 rounded-full border border-sky-500/15">
                      <div
                        className="absolute -left-1 -top-1 h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(14,165,233,0.8)]"
                        style={{ animation: "orbit 6s linear infinite reverse" }}
                      />
                    </div>
                    <div className="absolute h-24 w-24 rounded-full border border-emerald-500/10">
                      <div
                        className="absolute -left-0.5 -top-0.5 h-1 w-1 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)]"
                        style={{ animation: "orbit 4s linear infinite" }}
                      />
                    </div>

                    {/* Central hub with glow */}
                    <div className="relative">
                      <div className="absolute -inset-4 animate-pulse rounded-full bg-gradient-to-r from-violet-500/20 via-sky-500/20 to-violet-500/20 blur-xl" />
                      <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-gradient-to-br from-violet-600/30 via-sky-500/20 to-violet-600/30 shadow-[0_0_30px_rgba(139,92,246,0.3),inset_0_0_20px_rgba(255,255,255,0.05)]">
                        <Network className="h-7 w-7 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                      </div>
                    </div>

                    {/* Connecting lines (SVG) */}
                    <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
                      <title>Ecosystem connection lines</title>
                      {ecosystemNodes.map((node, i) => {
                        const angle = (i * 60 - 90) * (Math.PI / 180);
                        const innerRadius = 32;
                        const outerRadius = 100;
                        const centerX = 50;
                        const centerY = 50;
                        return (
                          <line
                            key={`line-${node.label}`}
                            x1={`${centerX + (Math.cos(angle) * innerRadius * 100) / 128}%`}
                            y1={`${centerY + (Math.sin(angle) * innerRadius * 100) / 128}%`}
                            x2={`${centerX + (Math.cos(angle) * outerRadius * 100) / 128}%`}
                            y2={`${centerY + (Math.sin(angle) * outerRadius * 100) / 128}%`}
                            stroke="url(#lineGradient)"
                            strokeWidth="1"
                            strokeDasharray="4 4"
                            className="animate-pulse"
                            style={{ animationDelay: `${i * 0.2}s` }}
                          />
                        );
                      })}
                      <defs>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="rgba(139,92,246,0.5)" />
                          <stop offset="100%" stopColor="rgba(14,165,233,0.3)" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Orbiting nodes with icons */}
                    {ecosystemNodes.map((node, i) => {
                      const angle = (i * 60 - 90) * (Math.PI / 180);
                      const radius = 100;
                      const NodeIcon = node.icon;
                      const colorMap: Record<string, { bg: string; border: string; text: string; glow: string }> = {
                        violet: { bg: "bg-violet-500/20", border: "border-violet-400/40", text: "text-violet-300", glow: "shadow-[0_0_12px_rgba(139,92,246,0.5)]" },
                        sky: { bg: "bg-sky-500/20", border: "border-sky-400/40", text: "text-sky-300", glow: "shadow-[0_0_12px_rgba(14,165,233,0.5)]" },
                        emerald: { bg: "bg-emerald-500/20", border: "border-emerald-400/40", text: "text-emerald-300", glow: "shadow-[0_0_12px_rgba(16,185,129,0.5)]" },
                        amber: { bg: "bg-amber-500/20", border: "border-amber-400/40", text: "text-amber-300", glow: "shadow-[0_0_12px_rgba(245,158,11,0.5)]" },
                        rose: { bg: "bg-rose-500/20", border: "border-rose-400/40", text: "text-rose-300", glow: "shadow-[0_0_12px_rgba(244,63,94,0.5)]" },
                        cyan: { bg: "bg-cyan-500/20", border: "border-cyan-400/40", text: "text-cyan-300", glow: "shadow-[0_0_12px_rgba(6,182,212,0.5)]" },
                      };
                      const colors = colorMap[node.color];
                      return (
                        <div
                          key={node.label}
                          className={cn(
                            "absolute flex h-11 w-11 items-center justify-center rounded-xl border backdrop-blur-sm transition-all duration-300 hover:scale-110",
                            colors.bg,
                            colors.border,
                            colors.glow
                          )}
                          style={{
                            transform: `translate(${Math.cos(angle) * radius}px, ${Math.sin(angle) * radius}px)`,
                          }}
                          title={node.label}
                        >
                          <NodeIcon className={cn("h-5 w-5", colors.text)} />
                        </div>
                      );
                    })}
                  </div>

                  {/* Legend with all nodes */}
                  <div className="grid grid-cols-2 gap-2">
                    {ecosystemNodes.map((node) => {
                      const NodeIcon = node.icon;
                      const colorMap: Record<string, string> = {
                        violet: "text-violet-400",
                        sky: "text-sky-400",
                        emerald: "text-emerald-400",
                        amber: "text-amber-400",
                        rose: "text-rose-400",
                        cyan: "text-cyan-400",
                      };
                      return (
                        <div
                          key={node.label}
                          className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-1.5 transition-colors hover:border-white/[0.12] hover:bg-white/[0.04]"
                        >
                          <NodeIcon className={cn("h-3.5 w-3.5 shrink-0", colorMap[node.color])} />
                          <span className="truncate text-[10px] font-medium text-neutral-300">{node.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* CSS for orbit animation */}
                <style jsx>{`
                  @keyframes orbit {
                    from { transform: rotate(0deg) translateX(50%) rotate(0deg); }
                    to { transform: rotate(360deg) translateX(50%) rotate(-360deg); }
                  }
                `}</style>
              </div>
            </div>
          </section>

          {/* Modules Grid */}
          <section ref={modulesRef} className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-neutral-50">21 Modules. One Platform.</h2>
              <p className="max-w-2xl text-sm leading-relaxed text-neutral-400">
                Every module shares the same database, identity, and source of truth. Fewer handoffs,
                fewer sync issues, and clearer accountability.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {modules.map((module) => {
                const Icon = module.icon;
                const colors = accentColors[module.color];
                return (
                  <Card
                    key={module.name}
                    className="js-module-card group relative h-full overflow-hidden border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-white/[0.15] hover:shadow-xl"
                  >
                    <div
                      className={cn(
                        "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                        colors.glow,
                        "blur-2xl"
                      )}
                    />
                    <div
                      className={cn(
                        "absolute -right-8 -top-8 h-20 w-20 rounded-full blur-3xl transition-all duration-500 group-hover:scale-150",
                        colors.glow
                      )}
                    />
                    <CardContent className="relative space-y-3 p-5">
                      <div
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-lg ring-1 transition-all duration-300 group-hover:scale-110",
                          colors.bg,
                          colors.border
                        )}
                      >
                        <Icon className={cn("h-5 w-5", colors.text)} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-neutral-100 transition-colors group-hover:text-white">
                          {module.name}
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-neutral-400">
                          {module.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Modules highlight */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-4 rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-emerald-950/30 via-neutral-900/80 to-neutral-950/90 px-6 py-4">
                <Shield className="h-6 w-6 text-emerald-400" />
                <p className="text-sm text-neutral-300">
                  <span className="font-semibold text-white">All modules, one source of truth.</span>{" "}
                  Every module accesses the same student data, same user roles, same permissions.
                </p>
              </div>
            </div>
          </section>

          {/* RBAC Section */}
          <section ref={rbacRef} className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-neutral-50">5-Tier Role-Based Access Control</h2>
              <p className="max-w-2xl text-sm leading-relaxed text-neutral-400">
                Give each user exactly the access they need—nothing more, nothing less. From
                organisation admins to individual teachers, permissions cascade intelligently.
              </p>
            </div>

            <div className="space-y-3">
              {hierarchy.map((level, index) => {
                const Icon = level.icon;
                const colors = accentColors[level.color];
                return (
                  <div
                    key={level.level}
                    className="js-rbac-animate group relative overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02] transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.04]"
                  >
                    <div
                      className={cn(
                        "absolute left-0 top-0 h-full w-1",
                        level.color === "blue" && "bg-gradient-to-b from-blue-500 to-cyan-500",
                        level.color === "emerald" && "bg-gradient-to-b from-emerald-500 to-green-500",
                        level.color === "purple" && "bg-gradient-to-b from-purple-500 to-violet-500",
                        level.color === "cyan" && "bg-gradient-to-b from-cyan-500 to-teal-500"
                      )}
                    />

                    <div className="flex flex-col gap-4 p-5 pl-6 md:flex-row md:items-center md:justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-lg",
                            colors.bg,
                            colors.border,
                            "ring-1"
                          )}
                        >
                          <Icon className={cn("h-5 w-5", colors.text)} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-semibold text-white">{level.level} Level</h3>
                            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium text-neutral-300">
                              Tier {index + 1}
                            </span>
                          </div>
                          <p className="mt-0.5 text-xs text-neutral-400">{level.permissions}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {level.roles.map((role) => (
                          <div
                            key={role}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium text-neutral-300"
                          >
                            {role}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Permission matrix preview */}
            <Card className="overflow-hidden border border-white/[0.08] bg-white/[0.02]">
              <div className="border-b border-white/10 bg-neutral-900/50 p-4">
                <h3 className="text-sm font-semibold text-white">Permission Matrix Example</h3>
                <p className="text-xs text-neutral-400">
                  Different roles have different access to the same modules
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-white/10 bg-neutral-900/30">
                      <th className="p-3 text-left font-medium text-neutral-400">Module</th>
                      <th className="p-3 text-center font-medium text-neutral-400">Org Admin</th>
                      <th className="p-3 text-center font-medium text-neutral-400">Campus Admin</th>
                      <th className="p-3 text-center font-medium text-neutral-400">Teacher</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { module: "Student Records", org: true, campus: true, teacher: "view" },
                      { module: "Fee Management", org: true, campus: true, teacher: false },
                      { module: "Grades & Marks", org: "view", campus: "view", teacher: true },
                      { module: "Payroll", org: true, campus: false, teacher: false },
                    ].map((row) => (
                      <tr key={row.module} className="border-b border-white/5">
                        <td className="p-3 font-medium text-neutral-200">{row.module}</td>
                        {(["org", "campus", "teacher"] as const).map((col) => {
                          const perm = row[col];
                          return (
                            <td key={col} className="p-3 text-center">
                              {perm === true && <Check className="mx-auto h-4 w-4 text-emerald-400" />}
                              {perm === false && <X className="mx-auto h-4 w-4 text-neutral-600" />}
                              {perm === "view" && <Eye className="mx-auto h-4 w-4 text-blue-400" />}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </section>

          {/* Architecture Overview */}
          <section ref={architectureRef} className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-neutral-50">
                Architecture That Scales
              </h2>
              <p className="max-w-2xl text-sm leading-relaxed text-neutral-400">
                Built for multi-campus complexity, India-first compliance, and enterprise-grade
                reliability. The same infrastructure that processes millions of records daily.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  title: "Multi-Tenant Isolation",
                  description:
                    "Each institution's data is logically isolated. Schools within the same organisation share configuration but maintain data boundaries.",
                  color: "blue",
                },
                {
                  title: "India Data Residency",
                  description:
                    "All data hosted within India. Compliant with IT Act, DPDP Act, and regulatory requirements. No data leaves the country.",
                  color: "emerald",
                },
                {
                  title: "Real-Time Sync",
                  description:
                    "Changes propagate instantly across all touchpoints. Teacher marks attendance, parent sees it immediately.",
                  color: "purple",
                },
                {
                  title: "API-First Design",
                  description:
                    "Every feature accessible via REST APIs. Integrate with existing systems, build custom workflows, extend functionality.",
                  color: "cyan",
                },
              ].map((item) => {
                const colors = accentColors[item.color];
                return (
                  <div
                    key={item.title}
                    className="js-arch-animate group relative overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 transition-all duration-300 hover:scale-[1.02] hover:border-white/[0.15]"
                  >
                    <div
                      className={cn(
                        "absolute -right-8 -top-8 h-24 w-24 rounded-full blur-3xl transition-all duration-500 group-hover:scale-150",
                        colors.glow
                      )}
                    />
                    <div className="relative space-y-2">
                      <p
                        className={cn(
                          "text-[0.7rem] font-semibold uppercase tracking-wide",
                          colors.text
                        )}
                      >
                        {item.title}
                      </p>
                      <p className="text-sm leading-relaxed text-neutral-300">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Security highlight */}
            <div className="js-arch-animate group relative overflow-hidden rounded-2xl border border-sky-500/20 bg-gradient-to-br from-sky-950/30 via-neutral-900/90 to-neutral-950/90 p-8 shadow-xl shadow-sky-500/10">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-sky-500/0 via-sky-400/10 to-sky-500/0 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-40" />
              <div className="absolute -left-12 -top-12 h-40 w-40 rounded-full bg-sky-500/15 blur-3xl" />

              <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-sky-500/30 bg-sky-500/10">
                  <Shield className="h-8 w-8 text-sky-400" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-bold text-white">
                    Enterprise Security by Design
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-300">
                    End-to-end encryption, audit logging, SOC 2 aligned practices, and breach
                    notification commitment. Built for institutions that can't afford security
                    compromises.
                  </p>
                </div>
                <Link
                  href="/security"
                  className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-sky-200 transition-all hover:border-sky-500/50 hover:bg-sky-500/20"
                >
                  Security Details
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>

          {/* Closing CTA */}
          <section
            ref={ctaRef}
            className="flex flex-col gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-sm md:flex-row md:items-center md:justify-between"
          >
            <div className="space-y-1">
              <p className="text-sm font-semibold text-neutral-50">
                Ready to see the ecosystem in action?
              </p>
              <p className="text-xs leading-relaxed text-neutral-400 md:max-w-md">
                Walk through how SquareCampus connects admissions, academics, finance, and
                communication into a single operational backbone.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <BookCallCta context="ecosystem-closing" className="justify-center sm:w-auto" />
              <Link
                href="/features"
                className="group inline-flex items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] px-5 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-200 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]"
              >
                Explore Features
              </Link>
            </div>
          </section>
        </div>
      </main>

      <FloatingHomeButton href="/" label="Back to home" />
    </>
  );
}
