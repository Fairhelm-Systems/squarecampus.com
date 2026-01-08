"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGsapReveal } from "@/lib/gsap-utils";
import {
  Activity,
  Radio,
  Shield,
  Workflow,
} from "@/components/icons";
import { cn } from "@/lib/utils";

/* ---------------------------------------------
   Component: Features (Bento Grid)
---------------------------------------------- */

export function Features() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useGsapReveal(sectionRef, { y: 24 });
  useGsapReveal(gridRef, { selector: ".bento-card", stagger: 0.08, threshold: 0.1 });

  return (
    <section
      ref={sectionRef}
      id="features"
      data-section="features"
      className="bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 py-24 px-4 md:px-8"
      aria-label="Core features of SquareCampus"
    >
      <div className="mx-auto max-w-6xl space-y-6 text-center mb-16">
        <p className="text-xs font-semibold uppercase tracking-[0.5em] text-white/50">
          Platform signals
        </p>
        <h2 className="text-3xl font-semibold text-white sm:text-4xl md:text-5xl">
          One OS for the entire School Infrastructure
        </h2>
        <p className="mx-auto max-w-2xl text-sm text-neutral-400 md:text-base">
          Run admissions, academics, finance, communication, and facilities in a single workspace.
          One login, one timeline, one source of truth.
        </p>
      </div>

      {/* Bento Grid */}
      <div
        ref={gridRef}
        className="mx-auto grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[200px]"
      >
        {/* Hero Card - Academic (Large) */}
        <article className="bento-card group relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/80 lg:col-span-7 lg:row-span-2">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-transparent" />
          <div className="pointer-events-none absolute -right-32 -top-32 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl transition-transform duration-700 group-hover:scale-150" />

          <div className="relative flex h-full flex-col p-6 lg:p-8">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl border border-blue-400/20 bg-blue-500/10 p-3">
                  <Activity className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Live Academic Visibility</h3>
                  <p className="text-sm text-neutral-400 mt-1">Real-time health of every class and student</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[0.65rem] uppercase tracking-wider text-emerald-400/80">Live</span>
              </div>
            </div>

            {/* Visual - Dashboard Preview */}
            <div className="flex-1 rounded-2xl border border-white/10 bg-black/40 p-4 overflow-hidden">
              <div className="h-full flex flex-col">
                {/* Mini metrics row */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { label: "Attendance", value: "94.2%", color: "emerald" },
                    { label: "Engagement", value: "87.5%", color: "blue" },
                    { label: "Performance", value: "91.0%", color: "purple" },
                  ].map((m) => (
                    <div key={m.label} className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
                      <p className={cn("text-xl font-bold", {
                        "text-emerald-400": m.color === "emerald",
                        "text-blue-400": m.color === "blue",
                        "text-purple-400": m.color === "purple",
                      })}>{m.value}</p>
                      <p className="text-[0.6rem] uppercase tracking-wider text-white/40 mt-1">{m.label}</p>
                    </div>
                  ))}
                </div>

                {/* Class bars */}
                <div className="flex-1 space-y-2">
                  {[
                    { name: "Class 10-A", value: 96, alert: false },
                    { name: "Class 10-B", value: 88, alert: true },
                    { name: "Class 9-A", value: 94, alert: false },
                    { name: "Class 9-B", value: 91, alert: false },
                  ].map((cls) => (
                    <div key={cls.name} className="flex items-center gap-3">
                      <span className="text-[0.7rem] text-white/60 w-20">{cls.name}</span>
                      <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className={cn("h-full rounded-full transition-all duration-1000", {
                            "bg-gradient-to-r from-blue-500 to-cyan-400": !cls.alert,
                            "bg-gradient-to-r from-amber-500 to-amber-400": cls.alert,
                          })}
                          style={{ width: `${cls.value}%` }}
                        />
                      </div>
                      <span className="text-[0.65rem] text-white/50 w-10 text-right">{cls.value}%</span>
                      {cls.alert && <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />}
                    </div>
                  ))}
                </div>

                {/* Alert */}
                <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 flex items-center gap-3">
                  <span className="text-lg">⚠️</span>
                  <p className="text-[0.7rem] text-amber-200/80 flex-1">3 students need attention in Class 10-B</p>
                  <span className="text-[0.6rem] text-amber-300 uppercase tracking-wider">Review →</span>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Lifecycle Card */}
        <article className="bento-card group relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/80 lg:col-span-5 lg:row-span-1">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-500/10 via-violet-500/5 to-transparent" />
          <div className="pointer-events-none absolute -right-20 -bottom-20 h-48 w-48 rounded-full bg-purple-500/10 blur-3xl transition-transform duration-700 group-hover:scale-150" />

          <div className="relative flex h-full flex-col p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-xl border border-purple-400/20 bg-purple-500/10 p-2.5">
                <Workflow className="h-4 w-4 text-purple-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Student Lifecycle</h3>
                <p className="text-[0.7rem] text-neutral-500">Inquiry to graduation</p>
              </div>
            </div>

            {/* Journey visualization */}
            <div className="flex-1 flex items-center justify-center">
              <div className="relative flex items-center gap-2 w-full max-w-xs">
                <div className="absolute top-1/2 left-6 right-6 h-0.5 bg-gradient-to-r from-purple-500/60 via-purple-400/40 to-white/10 -translate-y-1/2" />
                {[
                  { icon: "📝", label: "Inquiry", active: true },
                  { icon: "📋", label: "Admit", active: true },
                  { icon: "✅", label: "Enroll", active: true, current: true },
                  { icon: "🎓", label: "Graduate", active: false },
                ].map((s) => (
                  <div key={s.label} className="relative z-10 flex flex-col items-center flex-1">
                    <div className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all",
                      s.current ? "border-purple-400 bg-purple-500/40 scale-110" :
                      s.active ? "border-purple-400/50 bg-purple-500/20" :
                      "border-white/10 bg-neutral-800"
                    )}>
                      <span className="text-base">{s.icon}</span>
                    </div>
                    <span className={cn(
                      "mt-1.5 text-[0.55rem] uppercase tracking-wider",
                      s.current ? "text-purple-300" : s.active ? "text-purple-300/60" : "text-white/30"
                    )}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>

        {/* Communication Card */}
        <article className="bento-card group relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/80 lg:col-span-5 lg:row-span-1">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent" />
          <div className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl transition-transform duration-700 group-hover:scale-150" />

          <div className="relative flex h-full flex-col p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="rounded-xl border border-amber-400/20 bg-amber-500/10 p-2.5">
                  <Radio className="h-4 w-4 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Communication Hub</h3>
                  <p className="text-[0.7rem] text-neutral-500">All channels unified</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[0.55rem] text-emerald-400">Live</span>
              </div>
            </div>

            {/* Channel stats */}
            <div className="flex-1 grid grid-cols-4 gap-2">
              {[
                { icon: "📧", label: "Email", value: "2.4k" },
                { icon: "💬", label: "SMS", value: "1.8k" },
                { icon: "📱", label: "App", value: "3.2k" },
                { icon: "💚", label: "WA", value: "890" },
              ].map((ch) => (
                <div key={ch.label} className="rounded-xl border border-white/10 bg-white/5 p-2 flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors">
                  <span className="text-lg">{ch.icon}</span>
                  <p className="text-sm font-bold text-white mt-1">{ch.value}</p>
                  <p className="text-[0.5rem] text-white/40">{ch.label}</p>
                </div>
              ))}
            </div>
          </div>
        </article>

        {/* Infrastructure Card (Wide) */}
        <article className="bento-card group relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/80 lg:col-span-7 lg:row-span-1">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-green-500/5 to-transparent" />
          <div className="pointer-events-none absolute -right-32 -bottom-32 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl transition-transform duration-700 group-hover:scale-150" />

          <div className="relative flex h-full p-6 gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 p-2.5">
                  <Shield className="h-4 w-4 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Enterprise Infrastructure</h3>
                  <p className="text-[0.7rem] text-neutral-500">Secure, scalable, always-on</p>
                </div>
              </div>

              {/* Uptime stat */}
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 mt-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-white">99.97%</span>
                  <span className="text-[0.65rem] uppercase tracking-wider text-emerald-300/60">Uptime</span>
                </div>
                <p className="text-[0.65rem] text-emerald-300/50 mt-1">Last 90 days • 0 critical incidents</p>
              </div>
            </div>

            {/* Services & badges */}
            <div className="w-48 flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-2 flex-1">
                {[
                  { icon: "🗄️", name: "Database" },
                  { icon: "🔌", name: "API" },
                  { icon: "🔐", name: "Auth" },
                  { icon: "📁", name: "Storage" },
                ].map((s) => (
                  <div key={s.name} className="rounded-lg border border-white/10 bg-white/5 p-2 flex items-center gap-2">
                    <span className="text-sm">{s.icon}</span>
                    <div>
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 mb-0.5" />
                      <p className="text-[0.55rem] text-white/60">{s.name}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Status bar */}
              <div className="flex gap-0.5">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className={cn("flex-1 h-6 rounded-sm", i === 8 ? "bg-amber-400/50" : "bg-emerald-400/40")}
                  />
                ))}
              </div>
            </div>
          </div>
        </article>

        {/* Why Different Card - Comparison */}
        <article className="bento-card group relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/80 lg:col-span-5 lg:row-span-1">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-rose-500/5 via-neutral-500/5 to-emerald-500/5" />

          <div className="relative flex h-full flex-col p-6">
            <div className="flex-1 grid grid-cols-2 gap-3">
              {/* The Trap */}
              <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-3 flex flex-col">
                <p className="text-[0.6rem] uppercase tracking-wider text-rose-400/70 mb-2">The Trap</p>
                <div className="flex-1 flex flex-wrap gap-1 content-start">
                  {["ERP", "LMS", "Fee", "SMS", "Mail", "HR", "Bus"].map((tool) => (
                    <span key={tool} className="rounded bg-rose-500/10 border border-rose-500/20 px-1.5 py-0.5 text-[0.5rem] text-rose-300/60">
                      {tool}
                    </span>
                  ))}
                </div>
                <p className="text-[0.55rem] text-rose-300/50 mt-2">7+ tools, 7+ logins, 0 sync</p>
              </div>

              {/* The OS */}
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 flex flex-col">
                <p className="text-[0.6rem] uppercase tracking-wider text-emerald-400/70 mb-2">The OS</p>
                <div className="flex-1 flex items-center justify-center">
                  <div className="relative">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500/30 to-emerald-600/20 border border-emerald-400/30 flex items-center justify-center p-2">
                      <Image
                        src="https://cdn.squarecampus.in/application_files/logo-light.png"
                        alt="SquareCampus"
                        width={32}
                        height={32}
                        className="object-contain"
                      />
                    </div>
                    <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-400 border-2 border-neutral-900" />
                  </div>
                </div>
                <p className="text-[0.55rem] text-emerald-300/50 mt-2">1 platform, infinite clarity</p>
              </div>
            </div>

            <a
              href="/why-different"
              className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2 text-[0.65rem] uppercase tracking-wider text-white/60 hover:bg-white/10 hover:text-white transition-colors"
            >
              See why schools switch
              <span className="text-white/40">→</span>
            </a>
          </div>
        </article>

        {/* Stats Row - Spans full width on large screens */}
        <article className="bento-card group relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/80 md:col-span-2 lg:col-span-12 lg:row-span-1">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-emerald-500/5" />

          <div className="relative flex h-full items-center justify-between p-6 lg:px-12">
            {[
              { value: "50+", label: "Integrated Modules", icon: "🧩" },
              { value: "10M+", label: "Student Records", icon: "📊" },
              { value: "99.97%", label: "Platform Uptime", icon: "⚡" },
              { value: "24/7", label: "Support Coverage", icon: "🛟" },
            ].map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-4">
                {i > 0 && <div className="hidden lg:block h-12 w-px bg-white/10" />}
                <div className={cn("flex items-center gap-4", i > 0 && "lg:pl-8")}>
                  <span className="text-2xl">{stat.icon}</span>
                  <div>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-[0.65rem] uppercase tracking-wider text-white/40">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
