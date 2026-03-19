"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import {
  AppWindow,
  ArrowUpRight,
  ChevronDown,
  Layers,
  Network,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from "@/components/icons";
import { useDeviceCapabilities } from "@/hooks/use-device-capabilities";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type EcosystemItem = {
  label: string;
  title: string;
  description: string;
  tag: string;
  icon: React.ComponentType<{ className?: string }>;
  glowColor: string;
};

const ecosystemItems: EcosystemItem[] = [
  {
    label: "Admin OS",
    title: "SquareCampus Web Console",
    description:
      "Full-stack control center for admissions, academics, fees, transport, and communication with role-based access.",
    icon: Layers,
    tag: "Core",
    glowColor: "rgba(56, 189, 248, 0.3)",
  },
  {
    label: "Teachers",
    title: "Faculty tools",
    description:
      "Attendance, assessments, lesson plans, remarks, and performance insights in one workspace for teaching staff.",
    icon: AppWindow,
    tag: "Staff-first",
    glowColor: "rgba(59, 130, 246, 0.3)",
  },
  {
    label: "Parents & Students",
    title: "Parent & student apps",
    description:
      "Mobile-first access to timetables, homework, fees, bus tracking, announcements, and report cards.",
    icon: Smartphone,
    tag: "Mobile",
    glowColor: "rgba(16, 185, 129, 0.3)",
  },
  {
    label: "Integrations",
    title: "SMS, WhatsApp & payments",
    description:
      "Plug into messaging providers, payment gateways, UPI, and accounting tools without duct tape integrations.",
    icon: Network,
    tag: "Connected",
    glowColor: "rgba(251, 191, 36, 0.3)",
  },
  {
    label: "Trust & Compliance",
    title: "Security & audit layer",
    description:
      "Granular permissions, audit trails, IP controls, and export-ready reports for boards, auditors, and regulators.",
    icon: ShieldCheck,
    tag: "Enterprise",
    glowColor: "rgba(147, 51, 234, 0.3)",
  },
  {
    label: "Operations layer",
    title: "Operational intelligence",
    description:
      "Timetable support, anomaly detection, parent nudges, and staffing insights tied to real workflows.",
    icon: Sparkles,
    tag: "Insight",
    glowColor: "rgba(236, 72, 153, 0.3)",
  },
];

type GraphNode = {
  id: string;
  label: string;
  detail: string;
  tag: string;
  x: string;
  y: string;
  glow: string;
  glowColor: string;
};

const graphNodes: GraphNode[] = [
  {
    id: "admin",
    label: "Admin OS",
    detail: "Includes: Online Application Portal · Admission Management.",
    tag: "Core",
    x: "23%",
    y: "28%",
    glow: "shadow-[0_0_22px_rgba(56,189,248,0.4)]",
    glowColor: "rgba(56, 189, 248, 0.4)",
  },
  {
    id: "teachers",
    label: "Teacher tools",
    detail: "Includes: Timetable & Scheduling · Exam & Assessment.",
    tag: "Staff",
    x: "78%",
    y: "22%",
    glow: "shadow-[0_0_22px_rgba(59,130,246,0.4)]",
    glowColor: "rgba(59, 130, 246, 0.4)",
  },
  {
    id: "parents",
    label: "Parent app",
    detail: "Includes: Parent Portal & App · Notice Board & Events.",
    tag: "Mobile",
    x: "78%",
    y: "62%",
    glow: "shadow-[0_0_22px_rgba(16,185,129,0.4)]",
    glowColor: "rgba(16, 185, 129, 0.4)",
  },
  {
    id: "payments",
    label: "Payments",
    detail: "Includes: Payment Collection · Financial Reports.",
    tag: "Finance",
    x: "23%",
    y: "62%",
    glow: "shadow-[0_0_22px_rgba(251,191,36,0.4)]",
    glowColor: "rgba(251, 191, 36, 0.4)",
  },
  {
    id: "security",
    label: "Security layer",
    detail: "Includes: Audit trails · Compliance-ready reporting.",
    tag: "Trust",
    x: "50%",
    y: "85%",
    glow: "shadow-[0_0_22px_rgba(147,51,234,0.4)]",
    glowColor: "rgba(147, 51, 234, 0.4)",
  },
  {
    id: "analytics",
    label: "Insights",
    detail: "Includes: Attendance analytics · Board-ready exports.",
    tag: "Analytics",
    x: "50%",
    y: "10%",
    glow: "shadow-[0_0_22px_rgba(56,189,248,0.45)]",
    glowColor: "rgba(56, 189, 248, 0.45)",
  },
];

// Floating particles component
function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white/20"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
            animation: `eco-float ${6 + Math.random() * 8}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 4}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes eco-float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}

export function EcosystemSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const whyRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const [activeNode, setActiveNode] = useState<GraphNode | null>(graphNodes[0] ?? null);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const [isModulesExpanded, setIsModulesExpanded] = useState(false);
  const { isMobile } = useDeviceCapabilities();

  // GSAP scroll animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Map animation
      if (mapRef.current) {
        gsap.fromTo(
          mapRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: mapRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Why panel animation
      if (whyRef.current) {
        gsap.fromTo(
          whyRef.current,
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: whyRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Cards stagger animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".js-ecosystem-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Map animations
  useEffect(() => {
    if (!mapRef.current) return;
    const ctx = gsap.context(() => {
      const glow = mapRef.current?.querySelector<HTMLElement>(".js-core-glow");
      const ring = mapRef.current?.querySelector<HTMLElement>(".js-ecosystem-ring");
      const routes = gsap.utils.toArray<SVGPathElement>(".js-ecosystem-route");
      const nodes = gsap.utils.toArray<HTMLElement>(".js-ecosystem-node");

      if (glow) {
        gsap.to(glow, {
          boxShadow: "0 0 46px rgba(56,189,248,0.35)",
          duration: 4.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      if (ring) {
        gsap.to(ring, {
          rotate: 360,
          duration: 24,
          repeat: -1,
          ease: "none",
          transformOrigin: "50% 50%",
        });
      }

      if (routes.length) {
        routes.forEach((path, idx) => {
          gsap.set(path, { strokeDasharray: "10 8" });
          gsap.to(path, {
            strokeDashoffset: -120,
            duration: 6 + idx,
            repeat: -1,
            ease: "none",
          });
        });
      }

      if (nodes.length) {
        gsap.to(nodes, {
          y: -6,
          duration: 3.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.2,
        });
      }
    }, mapRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="ecosystem"
      ref={sectionRef}
      className="relative mx-auto w-full max-w-6xl overflow-hidden px-4 py-10 sm:px-6 sm:py-20 lg:px-10"
    >
      {/* Background effects - hidden on mobile */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.06),transparent_60%)]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at center, white 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {!isMobile && <FloatingParticles />}

      {/* Heading */}
      <div
        ref={headingRef}
        className="relative z-10 mb-4 flex flex-col items-center gap-2 text-center md:mb-12 md:gap-4"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 backdrop-blur-sm">
          <Network className="h-4 w-4 text-sky-400" />
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-neutral-400">
            Ecosystem
          </p>
        </div>

        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
          One platform.{" "}
          <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Single source of truth.
          </span>
        </h2>

        <p className="max-w-2xl text-sm leading-relaxed text-neutral-400 md:text-base">
          <span className="md:hidden">
            A connected ecosystem for leadership, staff, parents, and students.
          </span>
          <span className="hidden md:inline">
            SquareCampus isn&apos;t another bundled ERP. It&apos;s a connected ecosystem for
            leadership, staff, parents, and students, with integrations that keep data flowing
            without duplication.
          </span>
        </p>
      </div>

      {/* Top row: map + why it matters - hidden entirely on mobile for max compression */}
      <div className="relative z-10 mb-6 hidden gap-6 md:mb-12 md:grid md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        {/* Map */}
        <div
          ref={mapRef}
          className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-neutral-900/50 p-5 backdrop-blur-sm sm:p-6"
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.35em] text-neutral-500">
              How pieces connect
            </p>
            <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-neutral-400">
              Admin · Staff · Parents · Students
            </span>
          </div>

          <div className="relative flex items-center justify-center py-6 sm:py-8">
            <svg
              className="js-ecosystem-ring pointer-events-none absolute h-64 w-64 text-white/[0.06] sm:h-72 sm:w-72"
              viewBox="0 0 100 100"
              aria-hidden="true"
            >
              <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="0.6" />
              <circle
                cx="50"
                cy="50"
                r="30"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                opacity="0.5"
              />
            </svg>

            <svg
              className="pointer-events-none absolute h-64 w-64 sm:h-72 sm:w-72"
              viewBox="0 0 100 100"
              aria-hidden="true"
            >
              <path
                className="js-ecosystem-route"
                d="M18 50 Q 50 20 82 50"
                stroke="rgba(56,189,248,0.25)"
                strokeWidth="0.8"
                fill="none"
              />
              <path
                className="js-ecosystem-route"
                d="M22 62 Q 50 82 78 62"
                stroke="rgba(147,51,234,0.25)"
                strokeWidth="0.8"
                fill="none"
              />
              <path
                className="js-ecosystem-route"
                d="M35 18 Q 52 46 65 82"
                stroke="rgba(16,185,129,0.2)"
                strokeWidth="0.7"
                fill="none"
              />
              <path
                className="js-ecosystem-route"
                d="M20 72 Q 48 58 80 32"
                stroke="rgba(251,191,36,0.2)"
                strokeWidth="0.7"
                fill="none"
              />
            </svg>

            {/* Orbit container */}
            <div className="relative flex h-40 w-40 items-center justify-center rounded-full border border-white/[0.1] bg-neutral-900/80 shadow-[0_18px_60px_rgba(0,0,0,0.7)] sm:h-48 sm:w-48">
              <div className="js-core-glow pointer-events-none absolute inset-0 rounded-full" />
              <div className="relative z-10 flex flex-col items-center gap-1 text-center">
                <span className="text-[0.65rem] font-medium uppercase tracking-[0.35em] text-neutral-500">
                  Core OS
                </span>
                <span className="text-sm font-semibold text-white">SquareCampus</span>
              </div>
            </div>

            {/* Node graph */}
            <div className="absolute inset-0" style={{ perspective: "900px" }}>
              {graphNodes.map((node) => (
                <button
                  key={node.id}
                  type="button"
                  onMouseEnter={() => setActiveNode(node)}
                  onFocus={() => setActiveNode(node)}
                  onClick={() => setActiveNode(node)}
                  className={cn(
                    "js-ecosystem-node group absolute -translate-x-1/2 -translate-y-1/2",
                    "rounded-xl border border-white/[0.08] bg-neutral-900/90 px-3 py-2 text-left backdrop-blur-sm",
                    "transition-all duration-300",
                    "hover:-translate-y-[54%] hover:scale-105 hover:border-white/20",
                    activeNode?.id === node.id && "border-white/25"
                  )}
                  style={{
                    left: node.x,
                    top: node.y,
                    transform: "translate(-50%, -50%) translateZ(18px)",
                    boxShadow:
                      activeNode?.id === node.id ? `0 0 20px ${node.glowColor}` : undefined,
                  }}
                >
                  <span className="block text-[0.55rem] font-medium uppercase tracking-[0.2em] text-neutral-500">
                    {node.tag}
                  </span>
                  <span className="block text-[0.7rem] font-semibold text-white">{node.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-2 grid gap-2 sm:grid-cols-3">
            {[
              { label: "Data sync", value: "Always on" },
              { label: "Events/day", value: "High volume" },
              { label: "Roles", value: "Granular" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2"
              >
                <span className="block text-[0.55rem] font-medium uppercase tracking-[0.2em] text-neutral-500">
                  {item.label}
                </span>
                <span className="block text-[0.7rem] font-semibold text-white">{item.value}</span>
              </div>
            ))}
          </div>

          {/* Active node detail */}
          <div className="mt-4 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
            <p className="text-[0.6rem] font-medium uppercase tracking-[0.3em] text-neutral-500">
              Ecosystem focus
            </p>
            <p className="mt-2 text-sm font-semibold text-white">
              {activeNode?.label ?? "Hover a node"}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-neutral-400">
              {activeNode?.detail ?? "Hover any node to see how that part connects to the core."}
            </p>
          </div>
        </div>

        {/* Why it matters */}
        <div
          ref={whyRef}
          className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-neutral-900/50 p-6 backdrop-blur-sm sm:p-8"
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="relative space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-1 w-8 rounded-full bg-gradient-to-r from-blue-400 to-emerald-400" />
              <p className="text-[0.65rem] font-medium uppercase tracking-[0.3em] text-neutral-500">
                Why it matters
              </p>
            </div>
            <p className="text-base font-semibold leading-relaxed text-white sm:text-lg">
              One ecosystem means fewer tools, fewer logins, and fewer places for data to go
              missing.
            </p>
          </div>

          <ul className="relative mt-6 space-y-3 text-sm text-neutral-300">
            {[
              "Leaders see the whole campus at a glance, not in fragments.",
              "Staff avoid duplicate work moving data between apps.",
              "Parents use one channel instead of juggling multiple groups.",
              "Future modules plug into the same backbone.",
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-br from-blue-400 to-emerald-400" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>

          <div className="relative mt-auto pt-6">
            <a
              href="/ecosystem"
              className="group inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/[0.08] px-5 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-blue-400 transition-all duration-300 hover:border-blue-400/40 hover:bg-blue-500/15"
            >
              Explore ecosystem
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Ecosystem modules grid */}
      <div
        ref={cardsRef}
        className="relative z-10 grid gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3"
      >
        {(isMobile && !isModulesExpanded ? ecosystemItems.slice(0, 2) : ecosystemItems).map(
          (item, idx) => {
            const Icon = item.icon;
            const isHovered = hoveredCardIndex === idx;
            return (
              <div
                key={item.title}
                onMouseEnter={() => setHoveredCardIndex(idx)}
                onMouseLeave={() => setHoveredCardIndex(null)}
                className={cn(
                  "js-ecosystem-card group relative overflow-hidden rounded-2xl",
                  "border border-white/[0.08] bg-neutral-900/50 p-5 backdrop-blur-sm",
                  "transition-all duration-500",
                  "hover:border-white/15 hover:bg-neutral-900/70"
                )}
                style={{
                  transform: isHovered ? "translateY(-4px) scale(1.01)" : "translateY(0) scale(1)",
                }}
              >
                {/* Hover glow */}
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full blur-2xl transition-all duration-500"
                  style={{
                    backgroundColor: item.glowColor,
                    opacity: isHovered ? 0.4 : 0,
                  }}
                />

                {/* Shimmer */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute -inset-full animate-eco-shimmer bg-gradient-to-r from-transparent via-white/[0.02] to-transparent" />
                </div>

                <div className="relative z-10 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03]">
                        <Icon className="h-4 w-4 text-neutral-300" />
                      </div>
                      <span className="text-[0.65rem] font-medium uppercase tracking-[0.25em] text-neutral-500">
                        {item.label}
                      </span>
                    </span>
                    <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-[0.55rem] font-medium uppercase tracking-[0.2em] text-neutral-400">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="text-xs leading-relaxed text-neutral-400">{item.description}</p>
                </div>
              </div>
            );
          }
        )}
      </div>

      {/* Expand button for mobile */}
      {isMobile && (
        <button
          type="button"
          onClick={() => setIsModulesExpanded(!isModulesExpanded)}
          className={cn(
            "relative z-10 mx-auto mt-4 flex items-center gap-2 rounded-full",
            "border border-white/[0.08] bg-neutral-900/50 px-4 py-2",
            "text-xs font-medium text-neutral-300",
            "transition-all duration-300 hover:border-white/15 hover:bg-neutral-900/70"
          )}
        >
          <span>
            {isModulesExpanded ? "Show less" : `View all ${ecosystemItems.length} modules`}
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-300",
              isModulesExpanded && "rotate-180"
            )}
          />
        </button>
      )}

      {/* Hierarchy / RBAC */}
      <EcosystemHierarchy isMobile={isMobile} />

      <style jsx>{`
        @keyframes eco-shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-eco-shimmer {
          animation: eco-shimmer 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

function EcosystemHierarchy({ isMobile }: { isMobile: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<HTMLDivElement | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const hierarchyItems = [
    {
      title: "Organisation",
      desc: "Central billing, reporting, security policies, and oversight across every school and campus.",
    },
    {
      title: "School",
      desc: "Brand-level controls and templates applied across all campuses under the same school group.",
    },
    {
      title: "Campus",
      desc: "Local operations: academics, finance, transport, communication, and facilities in each location.",
    },
    {
      title: "Departments",
      desc: "Academic departments and offices with scoped access to the data they need.",
    },
    {
      title: "Roles & distributed RBAC",
      desc: "Fine-grained permissions for organisation admins, school admins, campus admins, department heads, teachers, finance, transport, parents, and students.",
    },
  ];

  const displayedItems = isMobile && !isExpanded ? hierarchyItems.slice(0, 1) : hierarchyItems;

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (ref.current) {
        gsap.fromTo(
          ref.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (itemsRef.current) {
        const items = itemsRef.current.querySelectorAll(".js-hierarchy-item");
        gsap.fromTo(
          items,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: itemsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="relative z-10 mx-auto mt-4 w-full max-w-5xl overflow-hidden rounded-2xl border border-white/[0.08] bg-neutral-900/50 p-4 backdrop-blur-sm sm:p-6 md:mt-16 md:p-8"
    >
      {!isMobile && (
        <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl" />
      )}

      <p className="mb-2 text-[0.65rem] font-medium uppercase tracking-[0.3em] text-neutral-500">
        Hierarchy · RBAC
      </p>
      <h3 className="mb-4 text-lg font-semibold tracking-tight text-white md:mb-6 md:text-2xl">
        A structure that mirrors real institutions
      </h3>

      <div ref={itemsRef} className="relative space-y-3 pl-6 md:space-y-4">
        <div className="absolute left-[11px] top-2 h-[calc(100%-16px)] w-[2px] bg-gradient-to-b from-blue-500/40 via-sky-400/30 to-purple-500/40" />

        {displayedItems.map((item) => (
          <HierarchyItem key={item.title} title={item.title} desc={item.desc} />
        ))}
      </div>

      {/* Expand button for mobile */}
      {isMobile && (
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            "mt-4 flex w-full items-center justify-center gap-2 rounded-xl",
            "border border-white/[0.08] bg-white/[0.02] py-2",
            "text-xs font-medium text-neutral-400",
            "transition-all duration-300 hover:border-white/15 hover:bg-white/[0.04]"
          )}
        >
          <span>{isExpanded ? "Show less" : `View all ${hierarchyItems.length} levels`}</span>
          <ChevronDown
            className={cn("h-4 w-4 transition-transform duration-300", isExpanded && "rotate-180")}
          />
        </button>
      )}
    </div>
  );
}

function HierarchyItem({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="js-hierarchy-item group relative">
      <span className="absolute -left-[18px] top-[10px] h-2.5 w-2.5 rounded-full bg-gradient-to-br from-sky-400 to-violet-500 shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-300 group-hover:border-white/10 group-hover:bg-white/[0.04]">
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="mt-1 text-xs leading-relaxed text-neutral-400">{desc}</p>
      </div>
    </div>
  );
}
