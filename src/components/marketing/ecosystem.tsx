"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";
import {
  AppWindow,
  Layers,
  Network,
  Smartphone,
  ShieldCheck,
  Sparkles,
} from "@/components/icons";
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
    label: "AI Layer",
    title: "Intelligent campus ops",
    description:
      "Predictive timetables, anomaly detection, parent nudges, and staffing insights powered by SquareCampus AI.",
    icon: Sparkles,
    tag: "Intelligent",
  },
];

const OrbitDot = ({ className }: { className?: string }) => (
  <motion.span
    className={cn(
      "h-2 w-2 rounded-full bg-gradient-to-br from-sky-400 to-violet-500",
      className,
    )}
    animate={{ opacity: [0.4, 1, 0.6], scale: [0.9, 1.15, 1] }}
    transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
  />
);

export function EcosystemSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { amount: 0.1, once: true });

  return (
    <motion.section
      id="ecosystem"
      ref={sectionRef}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
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
        <p className="text-xs font-semibold uppercase tracking-[0.5em] text-white/50">
          Ecosystem
        </p>
        <h2 className="text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
          One platform. Multiple touchpoints. Single source of truth.
        </h2>
        <p className="max-w-2xl text-xs text-neutral-400 sm:text-sm md:text-base">
          SquareCampus isn&apos;t just an ERP screen for admins. It&apos;s a
          connected ecosystem for management, staff, parents, and students, with
          integrations that keep data flowing without duplication.
        </p>
      </div>

      {/* Top row: map + why it matters */}
      <div className="mb-10 grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-950/90 p-5 sm:p-6"
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <p className="text-[0.7rem] uppercase tracking-[0.4em] text-neutral-400">
              How pieces connect
            </p>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.65rem] uppercase tracking-[0.25em] text-neutral-300">
              Admin · Staff · Parents · Students
            </span>
          </div>

          <div className="relative flex items-center justify-center py-8">
            {/* Orbit container */}
            <div className="relative flex h-48 w-48 items-center justify-center rounded-full border border-white/15 bg-neutral-900/80 shadow-[0_18px_60px_rgba(0,0,0,0.7)]">
              {/* slow glow */}
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-full"
                animate={{
                  boxShadow: [
                    "0 0 0px rgba(56,189,248,0.05)",
                    "0 0 40px rgba(56,189,248,0.20)",
                    "0 0 0px rgba(56,189,248,0.05)",
                  ],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <div className="relative z-10 flex flex-col items-center gap-1 text-center">
                <span className="text-[0.7rem] uppercase tracking-[0.35em] text-neutral-400">
                  Core OS
                </span>
                <span className="text-sm font-semibold text-white">
                  SquareCampus
                </span>
              </div>
            </div>

            {/* Orbiting nodes + labels */}
            <div className="pointer-events-none absolute inset-0">
              {/* Admin console */}
              <div className="absolute left-[10%] top-[30%] flex -translate-y-1/2 flex-col items-center gap-1 text-[0.7rem] text-neutral-200">
                <OrbitDot className="mb-1" />
                <span>Admin console</span>
                <span className="text-[0.65rem] text-neutral-400">
                  Roles • Workflows • Controls
                </span>
              </div>

              {/* Teacher tools */}
              <div className="absolute right-[8%] top-[35%] flex -translate-y-1/2 flex-col items-center gap-1 text-[0.7rem] text-neutral-200">
                <OrbitDot className="mb-1" />
                <span>Teacher tools</span>
                <span className="text-[0.65rem] text-neutral-400">
                  Lessons • Assessments • Remarks
                </span>
              </div>

              {/* Parent app */}
              <div className="absolute left-[8%] bottom-[22%] flex translate-y-1/2 flex-col items-center gap-1 text-[0.7rem] text-neutral-200">
                <OrbitDot className="mb-1" />
                <span>Parent app</span>
                <span className="text-[0.65rem] text-neutral-400">
                  Homework • Fees • Updates
                </span>
              </div>

              {/* Integrations */}
              <div className="absolute right-[10%] bottom-[20%] flex translate-y-1/2 flex-col items-center gap-1 text-[0.7rem] text-neutral-200">
                <OrbitDot className="mb-1" />
                <span>Integrations</span>
                <span className="text-[0.65rem] text-neutral-400">
                  UPI • Messaging • Billing
                </span>
              </div>
            </div>
          </div>

          <p className="mt-4 text-[0.78rem] text-neutral-400 sm:text-xs">
          Every action, attendance marked, fee paid, remark added, bus delay logged, flows through the same source of truth instead of disappearing into disconnected apps and spreadsheets.
          </p>
        </motion.div>

        {/* Why it matters */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-neutral-950/90 p-6 sm:p-8"
        >
          {/* Background accent glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl" />
          
          {/* Subtle grid pattern */}
          <div className='absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.02)1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.02)1px,transparent_1px)] bg-[size:40px_40px] opacity-50' />
          
          <div className="relative space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-1 w-8 rounded-full bg-gradient-to-r from-blue-400 to-emerald-400" />
              <p className="text-[0.7rem] uppercase tracking-[0.4em] text-neutral-400">
                Why it matters
              </p>
            </div>
            <p className="text-base font-semibold leading-relaxed text-white sm:text-lg">
              One ecosystem means fewer tools, fewer logins, and fewer places
              for data to go missing.
            </p>
          </div>

          <ul className="relative space-y-3 text-[0.85rem] text-neutral-300 sm:text-sm">
            {[
              'Leaders see the whole campus at a glance, not in fragments.',
              'Staff avoid duplicate work moving data between apps.',
              'Parents use one channel instead of juggling multiple groups.',
              'Future modules and integrations plug into the same backbone.',
            ].map((item, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + idx * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-3"
              >
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-br from-blue-400 to-emerald-400" />
                <span className="leading-relaxed">{item}</span>
              </motion.li>
            ))}
          </ul>

          <div className="relative pt-2">
            <a
              href="#contact-us"
              className="group inline-flex items-center gap-2 rounded-lg border border-blue-400/20 bg-blue-500/5 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.3em] text-blue-400 transition-all hover:border-blue-400/40 hover:bg-blue-500/10 hover:text-blue-300"
            >
              Talk about your ecosystem
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                className="text-base"
              >
                ↗
              </motion.span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Ecosystem modules grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {ecosystemItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.04 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/90 p-4 shadow-[0_14px_50px_rgba(0,0,0,0.6)] backdrop-blur"
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
                <p className="text-sm font-semibold text-white">
                  {item.title}
                </p>
                <p className="text-[0.8rem] text-neutral-300 sm:text-xs">
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Hierarchy / RBAC */}
      <EcosystemHierarchy />
    </motion.section>
  );
}

function EcosystemHierarchy() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.1, once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="mx-auto mt-16 w-full max-w-5xl rounded-3xl border border-white/10 bg-gradient-to-b from-neutral-900/60 to-neutral-950/80 p-6 sm:p-8 shadow-xl shadow-black/50"
    >
      <p className="mb-3 text-xs uppercase tracking-[0.5em] text-white/40">
        Hierarchy · RBAC
      </p>
      <h3 className="mb-6 text-xl font-semibold text-white md:text-2xl">
        A structure that mirrors real institutions
      </h3>

      <div className="relative space-y-6 pl-6">
        {/* vertical connector */}
        <div className="absolute left-[12px] top-0 h-full w-[2px] bg-gradient-to-b from-blue-500/40 via-sky-400/30 to-purple-500/40" />

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
    </motion.div>
  );
}

function HierarchyItem({ title, desc }: { title: string; desc: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="relative"
    >
      <span className="absolute -left-[18px] top-[7px] h-3 w-3 rounded-full bg-gradient-to-br from-sky-400 to-violet-500" />
      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="mt-1 text-xs text-neutral-300">{desc}</p>
      </div>
    </motion.div>
  );
}
