"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  ChevronDown,
  Clock,
  DollarSign,
  MessageSquare,
  Puzzle,
  Shield,
  Sparkles,
  Zap,
} from "@/components/icons";
import { useDeviceCapabilities } from "@/hooks/use-device-capabilities";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

// Animated grid background - only rendered on desktop
function AnimatedGrid() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.03]">
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="why-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#why-grid)" />
      </svg>
    </div>
  );
}

// Floating orbs component - only rendered on desktop
function FloatingOrbs({ paused = false }: { paused?: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Large ambient orbs */}
      <div
        className="absolute left-1/4 top-1/4 h-[500px] w-[500px] animate-pulse rounded-full bg-purple-500/[0.08] blur-[120px]"
        style={{ animationPlayState: paused ? "paused" : "running" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 h-[500px] w-[500px] animate-pulse rounded-full bg-blue-500/[0.08] blur-[120px]"
        style={{ animationDelay: "1s", animationPlayState: paused ? "paused" : "running" }}
      />
      <div
        className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-emerald-500/[0.05] blur-[100px]"
        style={{ animationDelay: "2s", animationPlayState: paused ? "paused" : "running" }}
      />

      {/* Small floating particles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white/30"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
            animation: `float-subtle ${6 + Math.random() * 8}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 4}s`,
            animationPlayState: paused ? "paused" : "running",
          }}
        />
      ))}
      <style jsx>{`
        @keyframes float-subtle {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
}

// Pain point data
const painPoints = [
  {
    icon: Sparkles,
    title: "Automation That Actually Works",
    problem:
      '"Smart insights" that stop at static charts. Lots of buzzwords, very little automation.',
    problemShort: "Slogans, no automation.",
    solution:
      "Auto-categorize expenses, forecast enrollment, and build reports without manual exports.",
    solutionShort: "Forecasting + auto-categorization + usable reports.",
    gradient: "from-purple-500/20 via-pink-500/10",
    iconColor: "text-purple-400",
    glowColor: "rgba(168, 85, 247, 0.4)",
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
    glowColor: "rgba(59, 130, 246, 0.4)",
  },
  {
    icon: Clock,
    title: "Days, Not Months",
    problem:
      "Quarter-long rollouts with repeated data imports and training resets. Time lost and momentum broken.",
    problemShort: "Quarter-long rollouts and redo cycles.",
    solution: "Guided rollout with data migration and training included. Onboarding without chaos.",
    solutionShort: "Guided rollout with migration + training.",
    gradient: "from-emerald-500/20 via-green-500/10",
    iconColor: "text-emerald-400",
    glowColor: "rgba(52, 211, 153, 0.4)",
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
    glowColor: "rgba(251, 113, 133, 0.4)",
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
    glowColor: "rgba(251, 191, 36, 0.4)",
  },
  {
    icon: Zap,
    title: 'Fast, Not "Loading..."',
    problem:
      "Long loads and timeouts on results day. Basic lists should not feel like data migrations.",
    problemShort: "Slow on critical days.",
    solution: "Fast loads built for peak days: admissions, results, and fee deadlines.",
    solutionShort: "Fast loads for peak days.",
    gradient: "from-sky-500/20 via-cyan-500/10",
    iconColor: "text-sky-400",
    glowColor: "rgba(14, 165, 233, 0.4)",
  },
  {
    icon: MessageSquare,
    title: "Support That Knows Schools",
    problem:
      "Support ping-pongs between sales, partners, and product. Context gets lost, time gets wasted.",
    problemShort: "Ticket ping-pong.",
    solution: "In-house, context-aware support from kickoff to go-live. Same team, faster answers.",
    solutionShort: "In-house, context-aware support.",
    gradient: "from-teal-500/20 via-emerald-500/10",
    iconColor: "text-teal-300",
    glowColor: "rgba(45, 212, 191, 0.4)",
  },
  {
    icon: BarChart3,
    title: "Live Visibility, Not Exports",
    problem: "Reports are nightly exports. Leadership sees yesterday and decisions get delayed.",
    problemShort: "Exports instead of live insights.",
    solution: "Live dashboards with drill-downs to the exact record. Decisions stay current.",
    solutionShort: "Live dashboards with drill-downs.",
    gradient: "from-indigo-500/20 via-sky-500/10",
    iconColor: "text-indigo-300",
    glowColor: "rgba(129, 140, 248, 0.4)",
  },
];

// Mobile collapsible card component
function CollapsibleCard({
  point,
  isOpen,
  onToggle,
}: {
  point: (typeof painPoints)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const Icon = point.icon;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-white/[0.08] bg-neutral-900/50 transition-all duration-300",
        isOpen && "border-white/15 bg-neutral-900/70"
      )}
    >
      {/* Clickable header */}
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-3 p-4 text-left"
        aria-expanded={isOpen}
      >
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03]",
            isOpen && "border-white/15 bg-white/[0.06]"
          )}
        >
          <Icon className={cn("h-5 w-5", point.iconColor)} />
        </div>
        <h3 className="flex-1 text-sm font-semibold text-white">{point.title}</h3>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-white/50 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Expandable content */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="space-y-3 px-4 pb-4">
          {/* The Problem */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-rose-400" />
              <span className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-rose-400">
                Them
              </span>
            </div>
            <p className="text-xs leading-relaxed text-neutral-500 line-through decoration-neutral-700">
              {point.problem}
            </p>
          </div>

          {/* The Solution */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-emerald-400" />
              <span className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-emerald-400">
                Us
              </span>
            </div>
            <p className="text-xs leading-relaxed text-neutral-300">{point.solution}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Desktop card component (original design with hover effects)
function DesktopCard({
  point,
  isHovered,
  onHover,
  onLeave,
}: {
  point: (typeof painPoints)[0];
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const Icon = point.icon;

  return (
    <div
      data-why-card
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={cn(
        "group relative overflow-hidden rounded-2xl",
        "border border-white/[0.08] bg-neutral-900/50 p-5 backdrop-blur-sm",
        "transition-all duration-500",
        "hover:border-white/15 hover:bg-neutral-900/70"
      )}
      style={{
        transform: isHovered ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
      }}
    >
      {/* Background gradient */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100",
          point.gradient,
          "to-transparent"
        )}
      />

      {/* Corner glow */}
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full blur-3xl transition-all duration-700 group-hover:scale-150"
        style={{
          backgroundColor: point.glowColor,
          opacity: isHovered ? 0.3 : 0,
        }}
      />

      {/* Shimmer effect on hover */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -inset-full animate-shimmer-slow bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className="mb-4 inline-flex rounded-xl border border-white/[0.08] bg-white/[0.03] p-3 transition-all duration-300 group-hover:border-white/15 group-hover:bg-white/[0.06]">
          <Icon
            className={cn(
              "h-5 w-5 transition-transform duration-300 group-hover:scale-110",
              point.iconColor
            )}
          />
        </div>

        {/* Title */}
        <h3 className="mb-3 text-base font-semibold tracking-tight text-white md:text-lg">
          {point.title}
        </h3>

        {/* The Problem */}
        <div className="mb-3 space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-rose-400" />
            <span className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-rose-400">
              Them
            </span>
          </div>
          <p className="text-xs leading-relaxed text-neutral-500 line-through decoration-neutral-700">
            {point.problem}
          </p>
        </div>

        {/* The Solution */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-emerald-400" />
            <span className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-emerald-400">
              Us
            </span>
          </div>
          <p className="text-xs leading-relaxed text-neutral-300">{point.solution}</p>
        </div>
      </div>

      {/* Bottom border gradient on hover */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, transparent, ${point.glowColor}, transparent)`,
        }}
      />
    </div>
  );
}

export function WhyDifferent() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [isInView, setIsInView] = useState(true);

  const { isMobile, shouldReduceEffects } = useDeviceCapabilities();

  // GSAP scroll animations - skip on mobile
  useEffect(() => {
    if (shouldReduceEffects) return;

    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Grid cards stagger animation
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll("[data-why-card]");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: {
              each: 0.08,
              from: "start",
            },
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // CTA animation
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldReduceEffects]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const toggleCard = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      id="why-squarecampus"
      className="relative overflow-hidden border-t border-white/[0.06] bg-neutral-950 px-4 py-12 md:px-8 md:py-28"
    >
      {/* Background effects - Hidden on mobile for performance */}
      {!isMobile && (
        <>
          <AnimatedGrid />
          <FloatingOrbs paused={!isInView} />
        </>
      )}

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div ref={headerRef} className="mb-8 text-center lg:mb-16">
          <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 backdrop-blur-sm lg:mb-6 lg:px-5 lg:py-2">
            <span className="relative flex h-2 w-2 lg:h-2.5 lg:w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-full w-full rounded-full bg-emerald-500" />
            </span>
            <span className="text-[0.65rem] font-medium uppercase tracking-[0.25em] text-neutral-400 lg:text-xs lg:tracking-[0.3em]">
              Reality Check
            </span>
          </div>

          <h2 className="mb-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl lg:mb-5 lg:text-5xl xl:text-6xl">
            Why We're{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
              Different
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-xs leading-relaxed text-neutral-400 sm:text-sm md:text-base lg:text-lg">
            We won't name names. But if you've evaluated vendors, you already know these patterns.
          </p>
        </div>

        {/* Mobile: Collapsible accordion */}
        {isMobile ? (
          <div className="space-y-3">
            {painPoints.map((point, index) => (
              <CollapsibleCard
                key={point.title}
                point={point}
                isOpen={expandedIndex === index}
                onToggle={() => toggleCard(index)}
              />
            ))}
          </div>
        ) : (
          /* Desktop: Original grid with hover effects */
          <div ref={gridRef} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {painPoints.map((point, index) => (
              <DesktopCard
                key={point.title}
                point={point}
                isHovered={hoveredIndex === index}
                onHover={() => setHoveredIndex(index)}
                onLeave={() => setHoveredIndex(null)}
              />
            ))}
          </div>
        )}

        {/* CTA */}
        <div ref={ctaRef} className="mt-10 text-center lg:mt-16">
          <Link
            href="/why-squarecampus"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full p-[1px]"
          >
            {/* Animated gradient border - simplified on mobile */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
            {!isMobile && (
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-50" />
            )}

            <span className="relative flex items-center gap-2 rounded-full bg-neutral-950 px-6 py-3 text-sm font-medium text-white transition-colors duration-300 group-hover:bg-neutral-900 lg:px-8 lg:py-3.5">
              <span>See the Full Comparison</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>

          <p className="mt-4 text-[0.65rem] text-neutral-500 lg:mt-5 lg:text-xs">
            The complete breakdown of what makes us different
          </p>
        </div>
      </div>

      {/* Shimmer animation - only needed on desktop */}
      {!isMobile && (
        <style jsx>{`
          @keyframes shimmer-slow {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
          .animate-shimmer-slow {
            animation: shimmer-slow 4s ease-in-out infinite;
          }
        `}</style>
      )}
    </section>
  );
}
