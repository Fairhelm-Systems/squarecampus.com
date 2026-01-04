"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { AppWindow, ArrowUpRight, Layers, Network, ShieldCheck, Smartphone, Sparkles } from "@/components/icons";
import { useGsapReveal } from "@/lib/gsap-utils";
import { cn } from "@/lib/utils";
import { SkewedRectangles } from "./backgrounds/skewed-rectangles";

type EcosystemItem = {
  label: string;
  title: string;
  description: string;
  tag: string;
  icon: React.ElementType;
};

const ecosystemItems: EcosystemItem[] = [
  {
    label: "Admin OS",
    title: "SquareCampus Web Console",
    description:
      "Full-stack control center for admissions, academics, fees, transport, and communication with role-based access.",
    icon: Layers,
    tag: "Core",
  },
  {
    label: "Teachers",
    title: "Faculty tools",
    description:
      "Attendance, assessments, lesson plans, remarks, and performance insights in one workspace for teaching staff.",
    icon: AppWindow,
    tag: "Staff-first",
  },
  {
    label: "Parents & Students",
    title: "Parent & student apps",
    description:
      "Mobile-first access to timetables, homework, fees, bus tracking, announcements, and report cards.",
    icon: Smartphone,
    tag: "Mobile",
  },
  {
    label: "Integrations",
    title: "SMS, WhatsApp & payments",
    description:
      "Plug into messaging providers, payment gateways, UPI, and accounting tools without duct tape integrations.",
    icon: Network,
    tag: "Connected",
  },
  {
    label: "Trust & Compliance",
    title: "Security & audit layer",
    description:
      "Granular permissions, audit trails, IP controls, and export-ready reports for boards, auditors, and regulators.",
    icon: ShieldCheck,
    tag: "Enterprise",
  },
  {
    label: "Operations layer",
    title: "Operational intelligence",
    description:
      "Timetable support, anomaly detection, parent nudges, and staffing insights tied to real workflows.",
    icon: Sparkles,
    tag: "Insight",
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
};

const graphNodes: GraphNode[] = [
  {
    id: "admin",
    label: "Admin OS",
    detail: "Includes: Online Application Portal · Admission Management.",
    tag: "Core",
    x: "18%",
    y: "28%",
    glow: "shadow-[0_0_22px_rgba(56,189,248,0.4)]",
  },
  {
    id: "teachers",
    label: "Teacher tools",
    detail: "Includes: Timetable & Scheduling · Exam & Assessment.",
    tag: "Staff",
    x: "78%",
    y: "22%",
    glow: "shadow-[0_0_22px_rgba(59,130,246,0.4)]",
  },
  {
    id: "parents",
    label: "Parent app",
    detail: "Includes: Parent Portal & App · Notice Board & Events.",
    tag: "Mobile",
    x: "78%",
    y: "62%",
    glow: "shadow-[0_0_22px_rgba(16,185,129,0.4)]",
  },
  {
    id: "payments",
    label: "Payments",
    detail: "Includes: Payment Collection · Financial Reports.",
    tag: "Finance",
    x: "26%",
    y: "68%",
    glow: "shadow-[0_0_22px_rgba(251,191,36,0.4)]",
  },
  {
    id: "security",
    label: "Security layer",
    detail: "Includes: Audit trails · Compliance-ready reporting.",
    tag: "Trust",
    x: "50%",
    y: "85%",
    glow: "shadow-[0_0_22px_rgba(147,51,234,0.4)]",
  },
  {
    id: "analytics",
    label: "Insights",
    detail: "Includes: Attendance analytics · Board-ready exports.",
    tag: "Analytics",
    x: "50%",
    y: "10%",
    glow: "shadow-[0_0_22px_rgba(56,189,248,0.45)]",
  },
];

export function EcosystemSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const whyRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const [activeNode, setActiveNode] = useState<GraphNode | null>(graphNodes[0] ?? null);

  useGsapReveal(sectionRef, { y: 24, threshold: 0.1 });
  useGsapReveal(mapRef, { y: 16 });
  useGsapReveal(whyRef, { y: 16 });
  useGsapReveal(whyRef, { selector: ".js-why-item", stagger: 0.08, threshold: 0.1 });
  useGsapReveal(cardsRef, { selector: ".js-ecosystem-card", stagger: 0.05, threshold: 0.1 });

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
      className="relative mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-10"
    >
      <div className="pointer-events-none absolute inset-y-0 left-[calc(45%-45vw)] right-[calc(45%-45vw)] h-full">
        <SkewedRectangles className="opacity-75 sm:opacity-90" />
      </div>

      {/* Soft background halo */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-10 top-10 mx-auto h-72 max-w-4xl rounded-full bg-[radial-gradient(circle_at_center,rgba(80,80,80,0.26),transparent_70%)] blur-3xl" />
      </div>

      {/* Heading */}
      <div className="mb-10 flex flex-col items-center gap-3 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.5em] text-white/50">Ecosystem</p>
        <h2 className="text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
          One platform. Multiple touchpoints. Single source of truth.
        </h2>
        <p className="max-w-2xl text-xs text-neutral-400 sm:text-sm md:text-base">
          SquareCampus isn&apos;t another bundled ERP. It&apos;s a connected ecosystem for leadership,
          staff, parents, and students, with integrations that keep data flowing without
          duplication. Fragmentation is a risk; one backbone removes it.
        </p>
      </div>

      {/* Top row: map + why it matters */}
      <div className="mb-10 grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        {/* Map */}
        <div
          ref={mapRef}
          className="ecosystem-map relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-950/90 p-5 sm:p-6"
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <p className="text-[0.7rem] uppercase tracking-[0.4em] text-neutral-400">
              How pieces connect
            </p>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.65rem] uppercase tracking-[0.25em] text-neutral-300">
              Admin · Staff · Parents · Students
            </span>
          </div>

          <div className="relative flex items-center justify-center py-6 sm:py-8">
            <svg
              className="js-ecosystem-ring pointer-events-none absolute h-64 w-64 text-white/10 sm:h-72 sm:w-72"
              viewBox="0 0 100 100"
              aria-hidden="true"
            >
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.6"
              />
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
                stroke="rgba(56,189,248,0.35)"
                strokeWidth="0.8"
                fill="none"
              />
              <path
                className="js-ecosystem-route"
                d="M22 62 Q 50 82 78 62"
                stroke="rgba(147,51,234,0.35)"
                strokeWidth="0.8"
                fill="none"
              />
              <path
                className="js-ecosystem-route"
                d="M35 18 Q 52 46 65 82"
                stroke="rgba(16,185,129,0.3)"
                strokeWidth="0.7"
                fill="none"
              />
              <path
                className="js-ecosystem-route"
                d="M20 72 Q 48 58 80 32"
                stroke="rgba(251,191,36,0.3)"
                strokeWidth="0.7"
                fill="none"
              />
            </svg>

            {/* Orbit container */}
            <div className="relative flex h-40 w-40 items-center justify-center rounded-full border border-white/15 bg-neutral-900/80 shadow-[0_18px_60px_rgba(0,0,0,0.7)] sm:h-48 sm:w-48">
              {/* slow glow */}
              <div className="js-core-glow pointer-events-none absolute inset-0 rounded-full" />

              <div className="relative z-10 flex flex-col items-center gap-1 text-center">
                <span className="text-[0.7rem] uppercase tracking-[0.35em] text-neutral-400">
                  Core OS
                </span>
                <span className="text-sm font-semibold text-white">SquareCampus</span>
              </div>

            </div>

            {/* 3D node graph */}
            <div className="absolute inset-0" style={{ perspective: "900px" }}>
              {graphNodes.map((node) => (
                <button
                  key={node.id}
                  type="button"
                  onMouseEnter={() => setActiveNode(node)}
                  onFocus={() => setActiveNode(node)}
                  onClick={() => setActiveNode(node)}
                  className={cn(
                    "js-ecosystem-node group absolute -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-neutral-900/90 px-3 py-2 text-left text-[0.65rem] uppercase tracking-[0.26em] text-white/80 shadow-lg backdrop-blur",
                    "transition-transform hover:-translate-y-[54%] hover:scale-[1.03]",
                    node.glow,
                    activeNode?.id === node.id && "border-white/30 text-white"
                  )}
                  style={{
                    left: node.x,
                    top: node.y,
                    transform: "translate(-50%, -50%) translateZ(18px)",
                  }}
                >
                  <span className="block text-[0.6rem] text-neutral-400">{node.tag}</span>
                  <span className="block text-[0.75rem] font-semibold text-white">
                    {node.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-2 grid gap-2 sm:grid-cols-3">
            {[
              { label: "Data sync", value: "Always on" },
              { label: "Events/day", value: "High volume" },
              { label: "Roles", value: "Granular" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[0.65rem] uppercase tracking-[0.28em] text-white/70"
              >
                <span className="block text-[0.6rem] text-neutral-400">{item.label}</span>
                <span className="block text-[0.7rem] text-white">{item.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-left">
            <p className="text-[0.65rem] uppercase tracking-[0.35em] text-white/50">
              Ecosystem focus
            </p>
            <p className="mt-2 text-sm font-semibold text-white">
              {activeNode?.label ?? "Hover a node"}
            </p>
            <p className="mt-1 text-[0.72rem] text-neutral-300 sm:text-xs">
              {activeNode?.detail ??
                "Hover any node to see how that part of the ecosystem connects back to the core."}
            </p>
          </div>

          <p className="mt-4 text-[0.72rem] text-neutral-400 sm:text-xs">
            Every action, attendance marked, fee paid, remark added, bus delay logged, flows through
            the same source of truth instead of disappearing into disconnected apps and
            spreadsheets.
          </p>
        </div>

        {/* Why it matters */}
        <div
          ref={whyRef}
          className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-neutral-950/90 p-6 sm:p-8"
        >
          {/* Background accent glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl" />

          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.02)1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.02)1px,transparent_1px)] bg-[size:40px_40px] opacity-50" />

          <div className="relative space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-1 w-8 rounded-full bg-gradient-to-r from-blue-400 to-emerald-400" />
              <p className="text-[0.7rem] uppercase tracking-[0.4em] text-neutral-400">
                Why it matters
              </p>
            </div>
            <p className="text-base font-semibold leading-relaxed text-white sm:text-lg">
              One ecosystem means fewer tools, fewer logins, and fewer places for data to go
              missing.
            </p>
          </div>

          <ul className="relative space-y-3 text-[0.85rem] text-neutral-300 sm:text-sm">
            {[
              "Leaders see the whole campus at a glance, not in fragments.",
              "Staff avoid duplicate work moving data between apps.",
              "Parents use one channel instead of juggling multiple groups.",
              "Future modules and integrations plug into the same backbone.",
            ].map((item, idx) => (
              <li
                key={idx}
                className="js-why-item flex items-start gap-3"
              >
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-br from-blue-400 to-emerald-400" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>

          <div className="relative mt-auto pt-2">
            <a
              href="/ecosystem"
              className="group inline-flex items-center gap-2 rounded-lg border border-blue-400/20 bg-blue-500/5 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.3em] text-blue-400 transition-all hover:border-blue-400/40 hover:bg-blue-500/10 hover:text-blue-300"
            >
              Explore our ecosystem
              <ArrowUpRight className={"h-4 w-4 animate-pulse"} />
            </a>
          </div>
        </div>
      </div>

      {/* Ecosystem modules grid */}
      <div ref={cardsRef} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {ecosystemItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="js-ecosystem-card ecosystem-card relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/90 p-4 shadow-[0_14px_50px_rgba(0,0,0,0.6)] backdrop-blur"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.12),transparent_60%)] opacity-60" />
              <div className="relative z-10 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.28em] text-neutral-400">
                    <Icon className="h-3.5 w-3.5 text-neutral-300" />
                    {item.label}
                  </span>
                  <span className="rounded-full bg-white/5 px-2 py-1 text-[0.65rem] uppercase tracking-[0.22em] text-neutral-300">
                    {item.tag}
                  </span>
                </div>
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <p className="text-[0.75rem] text-neutral-300 sm:text-xs">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Hierarchy / RBAC */}
      <EcosystemHierarchy />
    </section>
  );
}

function EcosystemHierarchy() {
  const ref = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<HTMLDivElement | null>(null);

  useGsapReveal(ref, { y: 20, threshold: 0.1 });
  useGsapReveal(itemsRef, { selector: ".js-hierarchy-item", stagger: 0.08, threshold: 0.1 });

  return (
    <div
      ref={ref}
      className="mx-auto mt-12 w-full max-w-5xl rounded-3xl border border-white/10 bg-gradient-to-b from-neutral-900/60 to-neutral-950/80 p-6 sm:mt-16 sm:p-8 shadow-xl shadow-black/50"
    >
      <p className="mb-3 text-xs uppercase tracking-[0.5em] text-white/40">Hierarchy · RBAC</p>
      <h3 className="mb-6 text-xl font-semibold text-white md:text-2xl">
        A structure that mirrors real institutions
      </h3>

      <div ref={itemsRef} className="relative space-y-6 pl-6">
        {/* vertical connector */}
        <div className="connection-line absolute left-[12px] top-0 h-full w-[2px] bg-gradient-to-b from-blue-500/40 via-sky-400/30 to-purple-500/40" />

        <HierarchyItem
          title="Organisation"
          desc="Central billing, reporting, security policies, and oversight across every school and campus."
        />
        <HierarchyItem
          title="School"
          desc="Brand-level controls and templates applied across all campuses under the same school group."
        />
        <HierarchyItem
          title="Campus"
          desc="Local operations: academics, finance, transport, communication, and facilities in each location."
        />
        <HierarchyItem
          title="Departments"
          desc="Academic departments and offices with scoped access to the data they need, and nothing more."
        />
        <HierarchyItem
          title="Roles & distributed RBAC"
          desc="Fine-grained permissions for organisation admins, school admins, campus admins, department heads, teachers, finance, transport, parents, and students."
        />
      </div>
    </div>
  );
}

function HierarchyItem({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="js-hierarchy-item hierarchy-item relative">
      <span className="absolute -left-[18px] top-[7px] h-3 w-3 rounded-full bg-gradient-to-br from-sky-400 to-violet-500" />
      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="mt-1 text-[0.7rem] text-neutral-300 sm:text-xs">{desc}</p>
      </div>
    </div>
  );
}
