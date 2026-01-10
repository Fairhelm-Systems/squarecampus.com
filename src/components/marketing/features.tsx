"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Activity,
  Radio,
  Shield,
  Workflow,
} from "@/components/icons";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export function Features() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Heading animation
      if (headingRef.current) {
        const elements = headingRef.current.children;
        gsap.fromTo(
          elements,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // Card animations
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".bento-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );

        // Hover glow effect on cards
        cards.forEach((card) => {
          const glow = card.querySelector("[data-glow]");
          if (glow) {
            card.addEventListener("mouseenter", () => {
              gsap.to(glow, { opacity: 1, scale: 1.2, duration: 0.5, ease: "power2.out" });
            });
            card.addEventListener("mouseleave", () => {
              gsap.to(glow, { opacity: 0.5, scale: 1, duration: 0.5, ease: "power2.out" });
            });
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      data-section="features"
      className="relative overflow-hidden bg-neutral-950 px-4 py-24 md:px-8"
      aria-label="Core features of SquareCampus"
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,0.06),transparent_50%)]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Floating orbs */}
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-purple-500/10 blur-[120px]" />

      {/* Header */}
      <div ref={headingRef} className="relative mx-auto mb-16 max-w-6xl space-y-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-400/80">
          Platform Signals
        </p>
        <h2 className="text-3xl font-semibold text-white sm:text-4xl md:text-5xl">
          One OS for the entire school
        </h2>
        <p className="mx-auto max-w-2xl text-base text-neutral-400">
          Run admissions, academics, finance, communication, and facilities in a single workspace.
          One login, one timeline, one source of truth.
        </p>
      </div>

      {/* Bento Grid */}
      <div
        ref={gridRef}
        className="relative mx-auto grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-2 lg:auto-rows-[220px] lg:grid-cols-12"
      >
        {/* Hero Card - Academic (Large) */}
        <article className="bento-card group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-neutral-900/50 backdrop-blur-sm lg:col-span-7 lg:row-span-2">
          <div
            data-glow
            className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-blue-500/20 opacity-50 blur-[100px] transition-all duration-700"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent" />

          <div className="relative flex h-full flex-col p-6 lg:p-8">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-3 shadow-lg shadow-blue-500/10">
                  <Activity className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Live Academic Visibility</h3>
                  <p className="mt-0.5 text-sm text-neutral-500">Real-time health of every class</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-[0.65rem] font-medium uppercase tracking-wider text-emerald-400">Live</span>
              </div>
            </div>

            {/* Visual - Dashboard Preview */}
            <div className="flex-1 overflow-hidden rounded-2xl border border-white/[0.08] bg-black/40 p-4">
              <div className="flex h-full flex-col">
                {/* Mini metrics row */}
                <div className="mb-4 grid grid-cols-3 gap-3">
                  {[
                    { label: "Attendance", value: "94.2%", color: "emerald" },
                    { label: "Engagement", value: "87.5%", color: "blue" },
                    { label: "Performance", value: "91.0%", color: "purple" },
                  ].map((m) => (
                    <div
                      key={m.label}
                      className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-3 text-center transition-colors hover:bg-white/[0.05]"
                    >
                      <p
                        className={cn("text-xl font-bold", {
                          "text-emerald-400": m.color === "emerald",
                          "text-blue-400": m.color === "blue",
                          "text-purple-400": m.color === "purple",
                        })}
                      >
                        {m.value}
                      </p>
                      <p className="mt-1 text-[0.6rem] uppercase tracking-wider text-white/40">{m.label}</p>
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
                      <span className="w-20 text-[0.7rem] text-white/60">{cls.name}</span>
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                        <div
                          className={cn("h-full rounded-full transition-all duration-1000", {
                            "bg-gradient-to-r from-blue-500 to-cyan-400": !cls.alert,
                            "bg-gradient-to-r from-amber-500 to-amber-400": cls.alert,
                          })}
                          style={{ width: `${cls.value}%` }}
                        />
                      </div>
                      <span className="w-10 text-right text-[0.65rem] text-white/50">{cls.value}%</span>
                      {cls.alert && (
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Alert */}
                <div className="mt-4 flex items-center gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3">
                  <span className="text-lg">⚠️</span>
                  <p className="flex-1 text-[0.7rem] text-amber-200/80">3 students need attention in Class 10-B</p>
                  <span className="cursor-pointer text-[0.6rem] uppercase tracking-wider text-amber-300 transition-colors hover:text-amber-200">
                    Review →
                  </span>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Lifecycle Card */}
        <article className="bento-card group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-neutral-900/50 backdrop-blur-sm lg:col-span-5 lg:row-span-1">
          <div
            data-glow
            className="pointer-events-none absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-purple-500/20 opacity-50 blur-[80px] transition-all duration-700"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent" />

          <div className="relative flex h-full flex-col p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-xl border border-purple-500/30 bg-purple-500/10 p-2.5 shadow-lg shadow-purple-500/10">
                <Workflow className="h-4 w-4 text-purple-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Student Lifecycle</h3>
                <p className="text-[0.7rem] text-neutral-500">Inquiry to graduation</p>
              </div>
            </div>

            {/* Journey visualization */}
            <div className="flex flex-1 items-center justify-center">
              <div className="relative flex w-full max-w-xs items-center gap-2">
                <div className="absolute left-6 right-6 top-1/2 h-0.5 -translate-y-1/2 bg-gradient-to-r from-purple-500/60 via-purple-400/40 to-white/10" />
                {[
                  { icon: "📝", label: "Inquiry", active: true },
                  { icon: "📋", label: "Admit", active: true },
                  { icon: "✅", label: "Enroll", active: true, current: true },
                  { icon: "🎓", label: "Graduate", active: false },
                ].map((s) => (
                  <div key={s.label} className="relative z-10 flex flex-1 flex-col items-center">
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300",
                        s.current
                          ? "scale-110 border-purple-400 bg-purple-500/40 shadow-lg shadow-purple-500/30"
                          : s.active
                            ? "border-purple-400/50 bg-purple-500/20"
                            : "border-white/10 bg-neutral-800"
                      )}
                    >
                      <span className="text-base">{s.icon}</span>
                    </div>
                    <span
                      className={cn(
                        "mt-1.5 text-[0.55rem] uppercase tracking-wider",
                        s.current ? "text-purple-300" : s.active ? "text-purple-300/60" : "text-white/30"
                      )}
                    >
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>

        {/* Communication Card */}
        <article className="bento-card group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-neutral-900/50 backdrop-blur-sm lg:col-span-5 lg:row-span-1">
          <div
            data-glow
            className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full bg-amber-500/20 opacity-50 blur-[80px] transition-all duration-700"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent" />

          <div className="relative flex h-full flex-col p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-2.5 shadow-lg shadow-amber-500/10">
                  <Radio className="h-4 w-4 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Communication Hub</h3>
                  <p className="text-[0.7rem] text-neutral-500">All channels unified</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                <span className="text-[0.55rem] font-medium text-emerald-400">Live</span>
              </div>
            </div>

            {/* Channel stats */}
            <div className="grid flex-1 grid-cols-4 gap-2">
              {[
                { icon: "📧", label: "Email", value: "2.4k", color: "blue" },
                { icon: "💬", label: "SMS", value: "1.8k", color: "purple" },
                { icon: "📱", label: "App", value: "3.2k", color: "emerald" },
                { icon: "💚", label: "WA", value: "890", color: "green" },
              ].map((ch) => (
                <div
                  key={ch.label}
                  className="flex flex-col items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02] p-2 text-center transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]"
                >
                  <span className="text-lg">{ch.icon}</span>
                  <p className="mt-1 text-sm font-bold text-white">{ch.value}</p>
                  <p className="text-[0.5rem] text-white/40">{ch.label}</p>
                </div>
              ))}
            </div>
          </div>
        </article>

        {/* Infrastructure Card (Wide) */}
        <article className="bento-card group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-neutral-900/50 backdrop-blur-sm lg:col-span-7 lg:row-span-1">
          <div
            data-glow
            className="pointer-events-none absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-emerald-500/20 opacity-50 blur-[100px] transition-all duration-700"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent" />

          <div className="relative flex h-full gap-6 p-6">
            <div className="flex-1">
              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-2.5 shadow-lg shadow-emerald-500/10">
                  <Shield className="h-4 w-4 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Enterprise Infrastructure</h3>
                  <p className="text-[0.7rem] text-neutral-500">Secure, scalable, always-on</p>
                </div>
              </div>

              {/* Uptime stat */}
              <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-white">99.97%</span>
                  <span className="text-[0.65rem] uppercase tracking-wider text-emerald-300/60">Uptime</span>
                </div>
                <p className="mt-1 text-[0.65rem] text-emerald-300/50">Last 90 days • 0 critical incidents</p>
              </div>
            </div>

            {/* Services & badges */}
            <div className="flex w-48 flex-col gap-3">
              <div className="grid flex-1 grid-cols-2 gap-2">
                {[
                  { icon: "🗄️", name: "Database" },
                  { icon: "🔌", name: "API" },
                  { icon: "🔐", name: "Auth" },
                  { icon: "📁", name: "Storage" },
                ].map((s) => (
                  <div
                    key={s.name}
                    className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.02] p-2 transition-colors hover:bg-white/[0.05]"
                  >
                    <span className="text-sm">{s.icon}</span>
                    <div>
                      <div className="mb-0.5 h-1.5 w-1.5 rounded-full bg-emerald-400" />
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
                    className={cn("h-6 flex-1 rounded-sm transition-colors", i === 8 ? "bg-amber-400/50" : "bg-emerald-400/40")}
                  />
                ))}
              </div>
            </div>
          </div>
        </article>

        {/* Why Different Card - Comparison */}
        <article className="bento-card group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-neutral-900/50 backdrop-blur-sm lg:col-span-5 lg:row-span-1">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-rose-500/5 via-transparent to-emerald-500/5" />

          <div className="relative flex h-full flex-col p-6">
            <div className="grid flex-1 grid-cols-2 gap-3">
              {/* The Trap */}
              <div className="flex flex-col rounded-xl border border-rose-500/20 bg-rose-500/5 p-3">
                <p className="mb-2 text-[0.6rem] uppercase tracking-wider text-rose-400/70">The Trap</p>
                <div className="flex flex-1 flex-wrap content-start gap-1">
                  {["ERP", "LMS", "Fee", "SMS", "Mail", "HR", "Bus"].map((tool) => (
                    <span
                      key={tool}
                      className="rounded border border-rose-500/20 bg-rose-500/10 px-1.5 py-0.5 text-[0.5rem] text-rose-300/60"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
                <p className="mt-2 text-[0.55rem] text-rose-300/50">7+ tools, 7+ logins, 0 sync</p>
              </div>

              {/* The OS */}
              <div className="flex flex-col rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3">
                <p className="mb-2 text-[0.6rem] uppercase tracking-wider text-emerald-400/70">The OS</p>
                <div className="flex flex-1 items-center justify-center">
                  <div className="relative">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-400/30 bg-gradient-to-br from-emerald-500/30 to-emerald-600/20 p-2 shadow-lg shadow-emerald-500/20">
                      <Image
                        src="https://cdn.mdtechspire.com/application_files/logo/squarecampus.png"
                        alt="SquareCampus"
                        width={32}
                        height={32}
                        className="object-contain"
                      />
                    </div>
                    <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-neutral-900 bg-emerald-400" />
                  </div>
                </div>
                <p className="mt-2 text-[0.55rem] text-emerald-300/50">1 platform, infinite clarity</p>
              </div>
            </div>

            <a
              href="#why-different"
              className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] py-2.5 text-[0.65rem] uppercase tracking-wider text-white/60 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
            >
              See why schools switch
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </a>
          </div>
        </article>

        {/* Stats Row - Spans full width */}
        <article className="bento-card group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-neutral-900/50 backdrop-blur-sm md:col-span-2 lg:col-span-12 lg:row-span-1">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-emerald-500/5" />

          <div className="relative flex h-full items-center justify-between p-6 lg:px-12">
            {[
              { value: "50+", label: "Integrated Modules", icon: "🧩", color: "blue" },
              { value: "10M+", label: "Student Records", icon: "📊", color: "purple" },
              { value: "99.97%", label: "Platform Uptime", icon: "⚡", color: "emerald" },
              { value: "24/7", label: "Support Coverage", icon: "🛟", color: "amber" },
            ].map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-4">
                {i > 0 && <div className="hidden h-12 w-px bg-white/10 lg:block" />}
                <div className={cn("flex items-center gap-4", i > 0 && "lg:pl-8")}>
                  <div
                    className={cn("flex h-12 w-12 items-center justify-center rounded-xl text-2xl", {
                      "bg-blue-500/10": stat.color === "blue",
                      "bg-purple-500/10": stat.color === "purple",
                      "bg-emerald-500/10": stat.color === "emerald",
                      "bg-amber-500/10": stat.color === "amber",
                    })}
                  >
                    {stat.icon}
                  </div>
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
