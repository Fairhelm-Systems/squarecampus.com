"use client";

import gsap from "gsap";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import Balancer from "react-wrap-balancer";
import { Activity, Bell, BookOpen, Bus, DollarSign, ShieldCheck } from "@/components/icons";
import { cn } from "@/lib/utils";
import { BackgroundLines } from "./backgrounds/dot-and-glow";
import { BookCallCta, LoginCta } from "./ctas";

const heroHighlights = [
  {
    title: "Single source of truth",
    detail:
      "Admissions, academics, finance, facilities, and communication stay synced across every branch.",
  },
  {
    title: "Automation for the day-to-day",
    detail:
      "Timetables, fee cycles, alerts, and approvals run on autopilot so teams focus on students.",
  },
  {
    title: "Enterprise-grade trust",
    detail:
      "Role-based permissions, audit trails, and 24x7 monitoring keep staff, teachers, and parents aligned.",
  },
];

const heroStats = [
  { value: "7 days", label: "Implementation window" },
  { value: "99.9%", label: "Uptime across regions" },
  { value: "15-20 hrs", label: "Weekly time saved per team" },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!heroRef.current || !headingRef.current || !descriptionRef.current) return;
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const words = headingRef.current?.querySelectorAll("span") ?? [];
      const tl = gsap.timeline();

      const subheaderWords =
        descriptionRef.current?.querySelectorAll(".js-hero-subheader span") ?? [];

      tl.fromTo(
        words,
        { autoAlpha: 0, y: 18 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
          stagger: 0.025,
        }
      )
        .fromTo(
          subheaderWords,
          { autoAlpha: 0, y: 12 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.012,
          },
          "-=0.25"
        )
        .fromTo(
          ".js-hero-dashboard",
          { autoAlpha: 0, y: 20, scale: 0.98 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out" },
          "-=0.15"
        );

      gsap.to(".js-hero-monitor", {
        y: -4,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="home"
      ref={heroRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-4 py-12 md:px-8 md:py-24"
    >
      <BackgroundLines />

      <div
        ref={headingRef}
        className="text-balance relative z-20 mx-auto mb-4 mt-4 max-w-4xl text-center text-3xl font-semibold tracking-tight text-neutral-300 md:text-7xl"
      >
        <h2>
          <Balancer>
            {"The operating system that keeps every school day in sync"
              .split(" ")
              .map((word, index) => (
                <span className="inline-block" key={index}>
                  {word}&nbsp;
                </span>
              ))}
          </Balancer>
        </h2>
      </div>
      <p
        ref={descriptionRef}
        className="relative z-20 mx-auto mt-4 max-w-xl overflow-hidden px-4 text-center text-base/6 text-gray-200"
      >
        <span className="js-hero-subheader block">
          {"SquareCampus is an all-in-one OS for schools and colleges, connecting admissions, academics, finance, communication, and compliance in one responsive command center. Every team works from the same playbook with zero manual stitching."
            .split(" ")
            .map((word, index) => (
              <span className="inline-block" key={index}>
                {word}&nbsp;
              </span>
            ))}
        </span>
      </p>
      <div className="relative z-20 mt-8 grid w-full max-w-3xl grid-cols-1 gap-3 text-sm text-neutral-200 sm:grid-cols-3">
        {heroHighlights.map((highlight, idx) => (
          <div
            key={highlight.title}
            className={cn(
              "rounded-2xl border border-neutral-800/60 bg-neutral-900/60 p-4 text-left",
              idx === 2 && "hidden sm:block"
            )}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
              {highlight.title}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-300">{highlight.detail}</p>
          </div>
        ))}
      </div>
      <div
        className="mb-10 mt-8 flex w-full flex-col items-center justify-center gap-4 px-8 sm:flex-row md:mb-20"
      >
        {/* Primary entry: existing users dropping into the system */}
        <LoginCta
          context="hero"
          variant="dark"
          className="w-full max-w-xs justify-center text-center sm:w-40"
        />

        {/* High-intent entry: new schools booking time with the team */}
        <BookCallCta context="hero" className="w-full max-w-xs justify-center sm:w-40" />
      </div>

      <div
        ref={containerRef}
        className="js-hero-dashboard relative mx-auto mt-8 md:mt-12 w-full max-w-[95%] lg:max-w-[85%] xl:max-w-[1400px] px-4"
      >
        {/* Stats cards use responsive padding to avoid hydration-time layout shifts. */}
        <div className="relative z-5 grid w-full grid-cols-1 gap-2 px-2 text-center sm:absolute sm:left-1/2 sm:top-0 sm:w-[77%] sm:-translate-x-1/2 sm:-translate-y-20 sm:grid-cols-3 sm:px-0">
          {heroStats.map((stat, idx) => (
            <div
              key={stat.label}
              className={cn(
                "rounded-2xl border border-neutral-800/60 bg-neutral-900/95 px-4 pt-4 text-center text-neutral-100 shadow-2xl shadow-black/50",
                "pb-6 backdrop-blur-sm sm:pb-12 sm:backdrop-blur-xl"
              )}
            >
              <p className="text-lg font-semibold text-white">{stat.value}</p>
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-0 rounded-[28px] border border-white/10 [mask-image:linear-gradient(180deg,rgba(255,255,255,0.25),rgba(255,255,255,0.05))]" />
        <div className="relative z-10 w-full">
          <div className="js-hero-monitor relative w-full aspect-[1500/906]">
            <img
              src="/images/marketing/splash.svg"
              alt=""
              className="pointer-events-none absolute inset-0 h-full w-full object-contain"
              loading="eager"
              decoding="async"
              aria-hidden="true"
            />
            <div className="absolute left-[10.2%] top-[3.3%] h-[84.3%] w-[79.9%] overflow-hidden rounded-[18px] bg-black sm:rounded-[22px] md:rounded-[24px]">
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.04)1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.04)1px,transparent_1px)] bg-[size:90px_90px] opacity-50" />
              <div className="absolute inset-6 rounded-2xl border border-white/10" />
              <div className="relative z-10 h-full w-full">
                <DashboardShowcase />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type DeckKey = "academics" | "finance" | "operations" | "communication" | "compliance";

const departmentDeck: Array<{
  key: DeckKey;
  title: string;
  subtitle: string;
  accent: DeckKey;
  icon: React.ElementType;
  stats: Array<{ label: string; value: string; detail: string }>;
  signals: Array<{ label: string; tone: "emerald" | "amber" | "sky" | "purple" }>;
  highlights: string[];
  accentColor: string;
}> = [
    {
      key: "academics",
      title: "Academics control",
      subtitle: "Attendance, assessments, timetables stay in lockstep.",
      accent: "academics",
      icon: BookOpen,
      accentColor: "text-emerald-300",
      stats: [
        { label: "Attendance", value: "96%", detail: "Live across 18 campuses" },
        { label: "Assessments", value: "128", detail: "Running this week" },
        { label: "Timetable drift", value: "+4m", detail: "Auto-resolved" },
      ],
      signals: [
        { label: "3 rooms over capacity", tone: "amber" },
        { label: "96% present · Grade 9", tone: "emerald" },
        { label: "4 escalations cleared", tone: "sky" },
      ],
      highlights: ["Guided exams", "Auto attendance sync", "Grade-level SLA"],
    },
    {
      key: "finance",
      title: "Finance command",
      subtitle: "Collections, dues, nudges, and reconciliations in one lane.",
      accent: "finance",
      icon: DollarSign,
      accentColor: "text-emerald-300",
      stats: [
        { label: "Collection", value: "87%", detail: "Week-to-date" },
        { label: "Pending", value: "₹3.2L", detail: "Fee nudges queued" },
        { label: "Cleared", value: "₹84K", detail: "Last 24 hrs" },
      ],
      signals: [
        { label: "15 auto-reminders sent", tone: "emerald" },
        { label: "2 payment gateways live", tone: "sky" },
        { label: "1 fee exception pending", tone: "amber" },
      ],
      highlights: ["Smart dues", "UPI + cards", "Board-ready exports"],
    },
    {
      key: "operations",
      title: "Operations rail",
      subtitle: "Transport, facilities, inventory, and tickets stay on time.",
      accent: "operations",
      icon: Bus,
      accentColor: "text-amber-300",
      stats: [
        { label: "Routes live", value: "18", detail: "1 delayed by 8m" },
        { label: "Tickets", value: "42", detail: "3 critical" },
        { label: "Utilization", value: "92%", detail: "Across facilities" },
      ],
      signals: [
        { label: "Route 7 rerouted", tone: "amber" },
        { label: "Lab AC maintenance", tone: "purple" },
        { label: "Inventory restocked", tone: "emerald" },
      ],
      highlights: ["Route telemetry", "Facility uptime", "Automated tickets"],
    },
    {
      key: "communication",
      title: "Communication hub",
      subtitle: "Announcements, nudges, receipts, and consent, single lane.",
      accent: "communication",
      icon: Bell,
      accentColor: "text-purple-300",
      stats: [
        { label: "Sent today", value: "342", detail: "Multi-channel" },
        { label: "Read", value: "92%", detail: "Parents & staff" },
        { label: "Two-way threads", value: "48", detail: "Open conversations" },
      ],
      signals: [
        { label: "Transport delay notice", tone: "amber" },
        { label: "Exam venue update", tone: "sky" },
        { label: "Fee receipt delivered", tone: "emerald" },
      ],
      highlights: ["SMS · Email · App", "Consent built-in", "Delivery proofs"],
    },
    {
      key: "compliance",
      title: "Trust & compliance",
      subtitle: "RBAC, audit trails, monitoring, and uptime baked in.",
      accent: "compliance",
      icon: ShieldCheck,
      accentColor: "text-sky-300",
      stats: [
        { label: "Uptime", value: "99.98%", detail: "Last 90 days" },
        { label: "Access reviews", value: "12", detail: "Completed weekly" },
        { label: "Alerts", value: "0 critical", detail: "Monitored 24x7" },
      ],
      signals: [
        { label: "IP control active", tone: "sky" },
        { label: "Audit log export ready", tone: "emerald" },
        { label: "New role templates", tone: "purple" },
      ],
      highlights: ["Granular RBAC", "Audit-ready logs", "Global monitoring"],
    },
  ];

export function DashboardShowcase() {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const surfaceRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % departmentDeck.length);
    }, 5200);
    return () => clearInterval(interval);
  }, []);

  const active = departmentDeck[current] ?? departmentDeck[0];
  if (!active) return null;

  useEffect(() => {
    if (!containerRef.current) return;
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const isMobile = window.matchMedia?.("(max-width: 640px)").matches;
    const floatY = isMobile ? 2.5 : 6;
    const driftY = isMobile ? 4 : 10;

    const ctx = gsap.context(() => {
      gsap.to(".js-dashboard-shell", {
        y: -floatY,
        duration: 4.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".js-dashboard-float", {
        y: -driftY,
        duration: 3.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.15,
      });

      gsap.to(".js-dashboard-drift", {
        x: 6,
        y: -4,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!surfaceRef.current) return;
    gsap.fromTo(
      surfaceRef.current,
      { autoAlpha: 0, y: 12, scale: 0.985 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, ease: "power2.out" }
    );
  }, [active.key]);

  return (
    <div ref={containerRef} className="js-dashboard-shell flex h-full w-full flex-col justify-between">
      <div className="flex items-center justify-between gap-3 px-4 pt-3 text-xs uppercase tracking-[0.26em] text-neutral-300">
        <div className="flex items-center gap-2">
          <Activity className="h-3.5 w-3.5 text-emerald-300" />
          Live Control Surface
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          Cycling through departments
        </div>
      </div>

      <div className="relative flex-1 px-4 pb-4 pt-3">
        <div className="pointer-events-none absolute inset-4 rounded-2xl border border-white/5" />
        <div
          ref={surfaceRef}
          className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/80 backdrop-blur"
        >
          <AccentHalo accent={active.accent} />

          <div className="flex items-center justify-between gap-3 border-b border-white/5 px-5 py-3 text-sm text-white">
            <div className="flex items-center gap-2">
              <active.icon className={cn("h-4 w-4", active.accentColor)} />
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-neutral-400">
                  {active.title}
                </p>
                <p className="text-sm text-neutral-100">{active.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.24em] text-neutral-300">
              <span className="rounded-full bg-white/5 px-2 py-1">Admin</span>
              <span className="rounded-full bg-white/5 px-2 py-1">Staff</span>
              <span className="rounded-full bg-white/5 px-2 py-1">Parents</span>
            </div>
          </div>

            <div className="grid h-[calc(100%-64px)] grid-cols-1 gap-4 p-4 md:grid-cols-[1.2fr,1fr]">
              <DepartmentCanvas active={active} />
              <PlaybookPanel highlights={active.highlights} />
            </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 px-4 pb-4">
        {departmentDeck.map((dept, idx) => (
          <button
            key={dept.key}
            onClick={() => setCurrent(idx)}
            className={cn(
              "h-2 w-8 rounded-full transition-all duration-200",
              current === idx ? "bg-emerald-400 w-10" : "bg-neutral-700 hover:bg-neutral-600"
            )}
            aria-label={`Switch to ${dept.title}`}
          />
        ))}
      </div>
    </div>
  );
}

function SignalBadge({
  signal,
  delay,
}: {
  signal: { label: string; tone: "emerald" | "amber" | "sky" | "purple" };
  delay?: number;
}) {
  const toneMap = {
    emerald: "bg-emerald-500/10 border-emerald-400/40 text-emerald-100",
    amber: "bg-amber-500/10 border-amber-400/40 text-amber-100",
    sky: "bg-sky-500/10 border-sky-400/40 text-sky-100",
    purple: "bg-purple-500/10 border-purple-400/40 text-purple-100",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 ml-3 text-sm shadow",
        toneMap[signal.tone]
      )}
    >
      <span className="h-2 w-2 rounded-full bg-current" />
      {signal.label}
    </span>
  );
}

function AccentHalo({ accent }: { accent: DeckKey }) {
  const haloMap: Record<DeckKey, string> = {
    academics: "from-sky-500/20 via-emerald-400/10 to-sky-500/5",
    finance: "from-emerald-400/20 via-blue-400/10 to-emerald-300/10",
    operations: "from-amber-500/20 via-orange-400/10 to-amber-300/5",
    communication: "from-purple-500/20 via-blue-500/10 to-sky-400/10",
    compliance: "from-emerald-500/15 via-sky-500/10 to-purple-500/10",
  };
  return (
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_40%)]">
      <div
        className={cn(
          "absolute inset-0 rounded-[20px] bg-gradient-to-br blur-3xl opacity-70",
          haloMap[accent]
        )}
      />
    </div>
  );
}

function DepartmentCanvas({ active }: { active: (typeof departmentDeck)[number] }) {
  switch (active.key) {
    case "academics":
      return (
        <div className="js-dashboard-float grid gap-3 md:grid-cols-[1.2fr,1fr] rounded-xl border border-white/10 bg-white/5 p-3 shadow-inner shadow-black/40">
          <div className="js-dashboard-float rounded-lg border border-white/10 bg-black/50 p-3 space-y-3">
            <p className="text-[0.7rem] uppercase tracking-[0.28em] text-neutral-400">
              Timetable · Week grid
            </p>
            <CalendarGrid />
          </div>
          <div className="js-dashboard-float space-y-3 rounded-lg border border-white/10 bg-black/50 p-3">
            <p className="text-[0.7rem] uppercase tracking-[0.28em] text-neutral-400">Signals</p>
            <div className="grid grid-cols-2 gap-2">
              {active.stats.slice(0, 2).map((stat) => (
                <StatCard key={stat.label} stat={stat} />
              ))}
            </div>
            <div className="grid gap-2 md:grid-cols-2">
              <DonutChart label="Attendance" value={96} segments={[60, 25, 11, 4]} tone="emerald" />
              <SparkWaveGraph tone="emerald" pointCount={30} />
            </div>
          </div>
        </div>
      );
    case "finance":
      return (
        <div className="js-dashboard-float grid gap-3 md:grid-cols-[1.1fr,1fr] rounded-xl border border-white/10 bg-white/5 p-3 shadow-inner shadow-black/40">
          <div className="js-dashboard-float rounded-lg border border-white/10 bg-black/50 p-3 space-y-3">
            <p className="text-[0.7rem] uppercase tracking-[0.28em] text-neutral-400">
              Cashflow pulse
            </p>
            <div className="grid gap-3 md:grid-cols-[1.1fr,0.9fr]">
              <SparkWaveGraph tone="emerald" pointCount={60} />
              <DonutChart label="Revenue mix" value={72} segments={[40, 24, 18, 10]} tone="sky" />
            </div>
            <div className="grid gap-2 md:grid-cols-3">
              {active.stats.map((stat) => (
                <StatCard key={stat.label} stat={stat} />
              ))}
            </div>
          </div>
          <div className="js-dashboard-float rounded-lg border border-white/10 bg-black/50 p-3 space-y-2">
            <p className="text-[0.7rem] uppercase tracking-[0.28em] text-neutral-400">
              Transactions
            </p>
            <div className="space-y-2">
              <TransactionRow label="₹12.5K · UPI" status="cleared" />
              <TransactionRow label="₹8.2K · Card" status="cleared" />
              <TransactionRow label="₹15K · Bank" status="pending" />
              <TransactionRow label="₹10.5K · UPI" status="cleared" />
            </div>
          </div>
        </div>
      );
    case "operations":
      return (
        <div className="js-dashboard-float grid grid-cols-2 gap-3 md:grid-cols-[1.2fr,1fr] rounded-xl border border-white/10 bg-white/5 p-3 shadow-inner shadow-black/40">
          <div className="js-dashboard-float rounded-lg border border-white/10 bg-black/50 p-3 space-y-3">
            <p className="text-[0.7rem] uppercase tracking-[0.28em] text-neutral-400">
              Transport · live map
            </p>
            <RouteMapVisual />
          </div>
          <div className="js-dashboard-float rounded-lg border border-white/10 bg-black/50 p-3 space-y-2">
            <p className="text-[0.7rem] uppercase tracking-[0.28em] text-neutral-400">
              Routes table
            </p>
            <div className="space-y-2">
              <RouteRow route="Route 1 ,  North" status="on-time" students={42} />
              <RouteRow route="Route 2 ,  East" status="on-time" students={38} />
              <RouteRow route="Route 3 ,  West" status="delayed" students={45} delay="8m" />
              <RouteRow route="Route 4 ,  South" status="on-time" students={40} />
            </div>
            <div className="pt-2">
              <MiniBarChart
                data={[
                  { label: "Util.", value: 92 },
                  { label: "Fuel", value: 68 },
                  { label: "Safety", value: 98 },
                ]}
                tone="amber"
              />
            </div>
          </div>
        </div>
      );
    case "communication":
      return (
        <div className="js-dashboard-float grid gap-3 md:grid-cols-[1.2fr,1fr] rounded-xl border border-white/10 bg-white/5 p-3 shadow-inner shadow-black/40">
          <div className="js-dashboard-float rounded-lg border border-white/10 bg-black/50 p-3 space-y-2">
            <p className="text-[0.7rem] uppercase tracking-[0.28em] text-neutral-400">
              Delivery stream
            </p>
            <MessageFeed />
          </div>
          <div className="js-dashboard-float rounded-lg border border-white/10 bg-black/50 p-3 space-y-3">
            <p className="text-[0.7rem] uppercase tracking-[0.28em] text-neutral-400">
              Channel mix
            </p>
            <div className="grid gap-2 md:grid-cols-2">
              <ChannelMix />
              <DonutChart label="Open rate" value={92} segments={[62, 24, 14]} tone="purple" />
            </div>
            <SparkWaveGraph tone="sky" pointCount={60} />
          </div>
        </div>
      );
    case "compliance":
    default:
      return (
        <div className="js-dashboard-float grid gap-3 md:grid-cols-[1.2fr,1fr] rounded-xl border border-white/10 bg-white/5 p-3 shadow-inner shadow-black/40">
          <div className="js-dashboard-float rounded-lg border border-white/10 bg-black/50 p-3 space-y-2">
            <p className="text-[0.7rem] uppercase tracking-[0.28em] text-neutral-400">
              Health & uptime
            </p>
            <div className="grid gap-2 md:grid-cols-3">
              <HealthStat label="API latency" value="28ms" tone="emerald" />
              <HealthStat label="Load" value="42%" tone="sky" />
              <HealthStat label="Uptime" value="99.98%" tone="emerald" />
            </div>
            <div className="grid gap-2 md:grid-cols-2 pt-2">
              <DonutChart
                label="Audit coverage"
                value={100}
                segments={[62, 20, 10, 8]}
                tone="purple"
              />
              <MiniBarChart
                data={[
                  { label: "Invoices", value: 88 },
                  { label: "Receipts", value: 93 },
                  { label: "Settlements", value: 86 },
                ]}
                tone="sky"
              />
            </div>
          </div>
          <div className="js-dashboard-float rounded-lg border border-white/10 bg-black/50 p-3 space-y-2">
            <p className="text-[0.7rem] uppercase tracking-[0.28em] text-neutral-400">
              RBAC snapshot
            </p>
            <div className="grid grid-cols-3 gap-2 text-[0.8rem] text-neutral-200">
              <RbacCell label="Org Admin" count="8" />
              <RbacCell label="School Admin" count="24" />
              <RbacCell label="Campus Admin" count="48" />
              <RbacCell label="Teachers" count="612" />
              <RbacCell label="Finance" count="42" />
              <RbacCell label="Transport" count="30" />
            </div>
            <div className="pt-2">
              <DonutChart label="Risk" value={98} segments={[70, 20, 8]} tone="sky" />
            </div>
          </div>
        </div>
      );
  }
}

function PlaybookPanel({ highlights }: { highlights: string[] }) {
  return (
    <div className="js-dashboard-float flex flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-3 shadow-inner shadow-black/40">
      <div className="flex items-center justify-between text-[0.7rem] uppercase tracking-[0.28em] text-neutral-400">
        <span>Playbook</span>
        <span className="flex items-center gap-1 text-emerald-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Auto-orchestrated
        </span>
      </div>
      <div className="space-y-2">
        {highlights.map((item, idx) => (
          <div
            key={item}
            className="overflow-hidden rounded-lg border border-white/10 bg-black/50"
          >
            <div className="flex items-center justify-between px-3 py-2 text-sm text-neutral-100">
              <span>{item}</span>
              <span className="text-[0.75rem] text-neutral-400">On</span>
            </div>
            <div className="h-1 w-full bg-neutral-800">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-sky-500 to-purple-500"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TimetableCard({
  time,
  title,
  status,
}: {
  time: string;
  title: string;
  status: "complete" | "active" | "upcoming";
}) {
  const tone =
    status === "complete"
      ? "bg-emerald-500/10 border-emerald-400/40 text-emerald-50"
      : status === "active"
        ? "bg-sky-500/10 border-sky-400/40 text-sky-50"
        : "bg-neutral-800/70 border-white/5 text-neutral-200";
  return (
    <div
      className={cn("rounded-lg border p-3 flex items-center gap-3", tone)}
    >
      <div className="rounded-md bg-black/50 px-2 py-1 text-xs text-white">{time}</div>
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-[0.75rem] text-neutral-300">
          {status === "complete" && "Synced · done"}
          {status === "active" && "In progress · monitored"}
          {status === "upcoming" && "Queued · auto-assigned"}
        </p>
      </div>
    </div>
  );
}

function PerformanceBar({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "emerald" | "sky" | "purple" | "amber";
}) {
  const map = {
    emerald: "bg-emerald-500",
    sky: "bg-sky-500",
    purple: "bg-purple-500",
    amber: "bg-amber-500",
  };
  return (
    <div>
      <div className="flex items-center justify-between text-[0.8rem] text-neutral-200">
        <span>{label}</span>
        <span className="text-white font-semibold">{value}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-neutral-800">
        <div
          className={cn("h-full rounded-full", map[tone])}
        />
      </div>
    </div>
  );
}

function StatCard({ stat }: { stat: { label: string; value: string; detail: string } }) {
  return (
    <div
      className="rounded-lg border border-white/10 bg-black/40 p-3"
    >
      <p className="text-[0.68rem] uppercase tracking-[0.24em] text-neutral-400">{stat.label}</p>
      <p className="text-lg font-semibold text-white">{stat.value}</p>
      <p className="text-[0.78rem] text-neutral-400">{stat.detail}</p>
    </div>
  );
}

function TransactionRow({ label, status }: { label: string; status: "cleared" | "pending" }) {
  const tone =
    status === "cleared"
      ? "bg-emerald-500/10 border-emerald-400/40 text-emerald-100"
      : "bg-amber-500/10 border-amber-400/40 text-amber-100";
  return (
    <div
      className={cn("flex items-center justify-between rounded-lg border px-3 py-2 text-sm", tone)}
    >
      <span>{label}</span>
      <span className="text-[0.8rem]">{status === "cleared" ? "Cleared" : "Pending"}</span>
    </div>
  );
}

function RouteRow({
  route,
  status,
  students,
  delay,
}: {
  route: string;
  status: "on-time" | "delayed";
  students: number;
  delay?: string;
}) {
  const tone =
    status === "on-time"
      ? "bg-emerald-500/10 border-emerald-400/40 text-emerald-100"
      : "bg-amber-500/10 border-amber-400/40 text-amber-100";
  return (
    <div
      className={cn("flex items-center justify-between rounded-lg border px-3 py-2 text-sm", tone)}
    >
      <div className="space-y-1">
        <p className="font-semibold text-white">{route}</p>
        <p className="text-[0.8rem] text-neutral-200">{students} students</p>
      </div>
      <div className="text-right text-[0.8rem]">
        <p>{status === "on-time" ? "On time" : `Delayed ${delay}`}</p>
      </div>
    </div>
  );
}

function TicketPill({
  label,
  tone,
}: {
  label: string;
  tone: "emerald" | "amber" | "rose" | "sky";
}) {
  const toneMap = {
    emerald: "bg-emerald-500/10 border-emerald-400/40 text-emerald-100",
    amber: "bg-amber-500/10 border-amber-400/40 text-amber-100",
    rose: "bg-rose-500/10 border-rose-400/40 text-rose-100",
    sky: "bg-sky-500/10 border-sky-400/40 text-sky-100",
  };
  return (
    <div
      className={cn("rounded-lg border px-3 py-2 text-sm", toneMap[tone])}
    >
      {label}
    </div>
  );
}

function MessageFeed() {
  const items = [
    { title: "Transport delay notice", channel: "SMS + App", tone: "amber" },
    { title: "Exam venue update", channel: "App push", tone: "sky" },
    { title: "Fee receipt delivered", channel: "Email + App", tone: "emerald" },
    { title: "PTM reminder", channel: "SMS", tone: "purple" },
  ];
  return (
    <div className="space-y-2">
      {items.map((item, idx) => (
        <SignalBadge
          key={item.title}
          signal={{ label: `${item.title} · ${item.channel}`, tone: item.tone as any }}
          delay={idx * 0.05}
        />
      ))}
    </div>
  );
}

function ChannelMix() {
  const channels = [
    { label: "App", value: 62, tone: "emerald" },
    { label: "SMS", value: 24, tone: "amber" },
    { label: "Email", value: 14, tone: "sky" },
  ];
  return (
    <div className="space-y-2">
      {channels.map((ch) => (
        <div key={ch.label}>
          <div className="flex items-center justify-between text-sm text-neutral-200">
            <span>{ch.label}</span>
            <span className="text-white font-semibold">{ch.value}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-neutral-800">
            <div
              className={cn(
                "h-full rounded-full",
                ch.tone === "emerald" && "bg-emerald-500",
                ch.tone === "amber" && "bg-amber-500",
                ch.tone === "sky" && "bg-sky-500"
              )}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function HealthStat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "emerald" | "sky";
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/50 p-3 text-sm text-neutral-200">
      <p className="text-[0.68rem] uppercase tracking-[0.24em] text-neutral-400">{label}</p>
      <p
        className={cn(
          "text-lg font-semibold",
          tone === "emerald" ? "text-emerald-300" : "text-sky-300"
        )}
      >
        {value}
      </p>
    </div>
  );
}

function RbacCell({ label, count }: { label: string; count: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/50 p-2 text-left">
      <p className="text-[0.68rem] uppercase tracking-[0.22em] text-neutral-400">{label}</p>
      <p className="text-lg font-semibold text-white">{count}</p>
    </div>
  );
}

function DonutChart({
  label,
  value,
  segments,
  tone = "emerald",
}: {
  label: string;
  value: number;
  segments: number[];
  tone?: "emerald" | "sky" | "purple";
}) {
  const strokeMap = {
    emerald: "rgb(16,185,129)",
    sky: "rgb(56,189,248)",
    purple: "rgb(147,51,234)",
  };
  const colors = ["#22c55e", "#38bdf8", "#a855f7", "#f59e0b"];
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const total = segments.reduce((a, b) => a + b, 0);

  let offset = 0;
  return (
    <div className="relative flex items-center gap-3 rounded-lg border border-white/10 bg-neutral-900/70 p-3">
      <svg className="h-24 w-24 -rotate-90">
        {segments.map((segment, idx) => {
          const dash = (segment / total) * circumference;
          const dashArray = `${dash} ${circumference - dash}`;
          const el = (
            <circle
              key={idx}
              cx="48"
              cy="48"
              r={radius}
              fill="transparent"
              stroke={colors[idx % colors.length]}
              strokeWidth="10"
              strokeDasharray={dashArray}
              strokeDashoffset={offset}
              strokeLinecap="round"
            />
          );
          offset -= dash;
          return el;
        })}
      </svg>
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-[0.28em] text-neutral-400">{label}</p>
        <p
          className={cn(
            "text-2xl font-semibold text-white",
            tone === "emerald"
              ? "text-emerald-300"
              : tone === "sky"
                ? "text-sky-300"
                : "text-purple-300"
          )}
        >
          {value}%
        </p>
        <div className="flex flex-wrap gap-2 text-[0.75rem] text-neutral-300">
          {segments.slice(0, 3).map((seg, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5"
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: colors[idx % colors.length] }}
              />
              {seg}%
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function MiniBarChart({
  data,
  tone = "emerald",
}: {
  data: Array<{ label: string; value: number }>;
  tone?: "emerald" | "sky" | "amber";
}) {
  const toneMap = {
    emerald: "bg-emerald-500",
    sky: "bg-sky-500",
    amber: "bg-amber-500",
  };
  return (
    <div className="space-y-2 rounded-lg border border-white/10 bg-neutral-900/60 p-3">
      {data.map((d) => (
        <div key={d.label}>
          <div className="flex items-center justify-between text-sm text-neutral-200">
            <span>{d.label}</span>
            <span className="text-white font-semibold">{d.value}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-neutral-800">
            <div
              className={cn("h-full rounded-full", toneMap[tone])}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function CalendarGrid() {
  const slots = [
    { day: "Mon", time: "08:00", title: "Assembly", tone: "emerald" },
    { day: "Mon", time: "10:00", title: "Mid-terms", tone: "amber" },
    { day: "Tue", time: "11:30", title: "Labs", tone: "sky" },
    { day: "Wed", time: "14:00", title: "Clubs", tone: "purple" },
    { day: "Thu", time: "09:00", title: "Assessments", tone: "emerald" },
    { day: "Fri", time: "15:30", title: "Sports", tone: "sky" },
  ];

  return (
    <div className="grid grid-cols-3 gap-2">
      {slots.map((slot, idx) => (
        <div
          key={`${slot.day}-${slot.time}`}
          className="relative overflow-hidden rounded-lg border border-white/10 bg-neutral-900/70 p-3"
        >
          <div className="flex items-center justify-between text-[0.7rem] uppercase tracking-[0.26em] text-neutral-400">
            <span>{slot.day}</span>
            <span>{slot.time}</span>
          </div>
          <p className="mt-2 text-sm font-semibold text-white">{slot.title}</p>
          <span
            className={cn(
              "mt-2 inline-flex items-center gap-2 rounded-full px-2 py-1 text-[0.7rem]",
              slot.tone === "emerald" && "bg-emerald-500/10 text-emerald-100",
              slot.tone === "amber" && "bg-amber-500/10 text-amber-100",
              slot.tone === "sky" && "bg-sky-500/10 text-sky-100",
              slot.tone === "purple" && "bg-purple-500/10 text-purple-100"
            )}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            On track
          </span>
        </div>
      ))}
    </div>
  );
}

function SparkWaveGraph({
  tone = "emerald",
  pointCount = 25,
}: {
  tone?: "emerald" | "sky" | "purple";
  pointCount?: number;
}) {
  const id = useId();
  const seededRandom = (seed: string) => {
    let hash = 0;
    for (let i = 0; i < seed.length; i += 1) {
      hash = (hash << 5) - hash + seed.charCodeAt(i);
      hash |= 0;
    }
    return () => {
      hash = (hash * 1664525 + 1013904223) | 0;
      return (hash >>> 0) / 4294967296;
    };
  };
  const toneMap = {
    emerald: {
      stroke: "rgba(16,185,129,0.95)",
      fill: "rgba(16,185,129,0.14)",
      glow: "shadow-[0_0_35px_rgba(16,185,129,0.4)]",
    },
    sky: {
      stroke: "rgba(56,189,248,0.95)",
      fill: "rgba(56,189,248,0.14)",
      glow: "shadow-[0_0_35px_rgba(56,189,248,0.4)]",
    },
    purple: {
      stroke: "rgba(147,51,234,0.95)",
      fill: "rgba(147,51,234,0.14)",
      glow: "shadow-[0_0_35px_rgba(147,51,234,0.4)]",
    },
  };

  const points = useMemo(() => {
    const rand = seededRandom(id);
    return Array.from({ length: pointCount }, () => Math.floor(rand() * (56 - 6 + 1)) + 6);
  }, [pointCount, id]);
  const safePoints = points.length >= 2 ? points : [points[0] ?? 30, points[0] ?? 30];
  const pointSpacing = safePoints.length > 1 ? 1 / (safePoints.length - 1) : 0;

  const chartWidth = Math.max(safePoints.length, 1) * 8;
  const firstPoint = safePoints[0] ?? 0;

  const path = `M 0 ${60 - firstPoint} ${safePoints
    .map((p, i) => `L ${pointSpacing * i * chartWidth} ${60 - p}`)
    .join(" ")}`;
  const lastX = chartWidth;
  const lastY = 60 - (safePoints[safePoints.length - 1] ?? firstPoint);

  return (
    <div className="relative h-32 w-full overflow-hidden rounded-lg border border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.05),transparent_35%),#0e0f14]">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.04)1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.04)1px,transparent_1px)] bg-[size:40px_40px] opacity-40" />
      <svg viewBox={`0 0 ${chartWidth} 60`} className="relative h-full w-full">
        <defs>
          <linearGradient id={`grad-${id}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={toneMap[tone].fill} />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path
          d={`${path} L ${chartWidth} 60 L 0 60 Z`}
          fill={`url(#grad-${id})`}
          stroke="none"
        />
        <path
          d={path}
          stroke={toneMap[tone].stroke}
          strokeWidth="1.5"
          fill="none"
          className={toneMap[tone].glow}
        />
        {safePoints.map((p, i) => (
          <circle
            key={i}
            cx={pointSpacing * i * chartWidth}
            cy={60 - p}
            r={1.6}
            fill={toneMap[tone].stroke}
          />
        ))}
        <circle
          cx={lastX}
          cy={lastY}
          r={2.8}
          fill={toneMap[tone].stroke}
        />
      </svg>
      <div
        className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black/50 to-transparent"
      />
    </div>
  );
}

function RouteMapVisual() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackerRef = useRef<HTMLDivElement | null>(null);

  const hubs: Array<{
    x: string;
    y: string;
    label: string;
    status: "active" | "busy" | "idle";
    connections: number[];
  }> = [
      { x: "20%", y: "25%", label: "Downtown Hub", status: "active", connections: [1, 2] },
      { x: "65%", y: "20%", label: "Airport Terminal", status: "busy", connections: [2, 3] },
      { x: "75%", y: "60%", label: "Industrial Park", status: "active", connections: [3] },
      { x: "35%", y: "70%", label: "Distribution Center", status: "idle", connections: [0] },
    ];

  const statusColors: Record<"active" | "busy" | "idle", string> = {
    active: "bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.6)]",
    busy: "bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.6)]",
    idle: "bg-slate-400 shadow-[0_0_12px_rgba(148,163,184,0.5)]",
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      const paths = gsap.utils.toArray<SVGPathElement>(".js-route-path");
      const dots = gsap.utils.toArray<HTMLElement>(".js-route-dot");
      const hubs = gsap.utils.toArray<HTMLElement>(".js-route-hub");
      const rings = gsap.utils.toArray<HTMLElement>(".js-route-ring");

      paths.forEach((path, idx) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length, opacity: 0 });
        gsap.to(path, {
          strokeDashoffset: 0,
          opacity: 0.75,
          duration: 1.6,
          delay: idx * 0.2,
          ease: "power2.inOut",
        });
        gsap.to(path, {
          strokeDashoffset: -length,
          duration: 5 + idx,
          repeat: -1,
          ease: "none",
          delay: 2.2,
        });
      });

      if (dots[0]) {
        gsap.to(dots[0], {
          keyframes: [
            { left: "20%", top: "25%" },
            { left: "42%", top: "15%" },
            { left: "65%", top: "20%" },
          ],
          duration: 3,
          repeat: -1,
          ease: "none",
        });
      }
      if (dots[1]) {
        gsap.to(dots[1], {
          keyframes: [
            { left: "65%", top: "20%" },
            { left: "72%", top: "40%" },
            { left: "75%", top: "60%" },
          ],
          duration: 3,
          repeat: -1,
          ease: "none",
          delay: 0.5,
        });
      }

      if (hubs.length) {
        gsap.to(hubs, {
          scale: 1.2,
          duration: 1.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.2,
        });
      }

      if (rings.length) {
        gsap.to(rings, {
          scale: 1.5,
          opacity: 0,
          duration: 2.2,
          repeat: -1,
          ease: "sine.out",
          stagger: 0.25,
        });
      }

      if (trackerRef.current) {
        gsap.to(trackerRef.current, {
          x: 120,
          y: 60,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="js-dashboard-drift relative h-full w-full overflow-hidden rounded-lg border border-white/10 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.08),transparent_45%),radial-gradient(circle_at_70%_70%,rgba(16,185,129,0.08),transparent_45%),#0c0c0f]"
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.03)1px,transparent_1px)] bg-[size:40px_40px] opacity-60" />

      {/* Inner frame */}
      <div className="absolute inset-3 rounded-lg border border-white/5" />

      {/* Connection lines */}
      <svg className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="route-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(16,185,129,0.4)" />
            <stop offset="100%" stopColor="rgba(59,130,246,0.4)" />
          </linearGradient>
          <linearGradient id="route-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(251,191,36,0.4)" />
            <stop offset="100%" stopColor="rgba(236,72,153,0.4)" />
          </linearGradient>
        </defs>

        {/* Route connections */}
        <path
          className="js-route-path"
          d="M 20% 25% Q 42% 15%, 65% 20%"
          stroke="url(#route-gradient-1)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="6 4"
        />
        <path
          className="js-route-path"
          d="M 65% 20% Q 72% 40%, 75% 60%"
          stroke="url(#route-gradient-2)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="6 4"
        />
        <path
          className="js-route-path"
          d="M 75% 60% Q 55% 68%, 35% 70%"
          stroke="url(#route-gradient-1)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="6 4"
        />
        <path
          className="js-route-path"
          d="M 35% 70% Q 25% 48%, 20% 25%"
          stroke="url(#route-gradient-2)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="6 4"
        />
      </svg>

      {/* Moving indicators along routes */}
      <div className="js-route-dot absolute h-1.5 w-1.5 rounded-full bg-emerald-400 blur-[1px]" />
      <div className="js-route-dot absolute h-1.5 w-1.5 rounded-full bg-amber-400 blur-[1px]" />

      {/* Live tracking overlay */}
      <div
        ref={trackerRef}
        className="absolute left-[30%] top-[42%] hidden sm:flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-2 py-1 text-[0.6rem] uppercase tracking-[0.25em] text-emerald-200"
      >
        <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
        Live tracking
      </div>

      {/* Hub nodes */}
      {hubs.map((hub, idx) => (
        <div
          key={hub.label}
          className="absolute"
          style={{ left: hub.x, top: hub.y, transform: "translate(-50%,-50%)" }}
        >
          {/* Outer pulse ring */}
          <div
            className="js-route-ring absolute inset-0 rounded-full border-2 border-white/20"
            style={{ width: "40px", height: "40px", left: "-20px", top: "-20px" }}
          />

          {/* Center node */}
          <div className="relative flex flex-col items-center gap-1.5">
            <div
              className={`js-route-hub h-3 w-3 rounded-full ${statusColors[hub.status]}`}
            />
            <div className="rounded-md border border-white/20 bg-black/80 px-2 py-1 backdrop-blur-sm">
              <div className="text-[0.65rem] font-medium text-neutral-100">{hub.label}</div>
              <div className="text-[0.55rem] text-neutral-400 capitalize">{hub.status}</div>
            </div>
          </div>
        </div>
      ))}

      {/* Activity indicators */}
      <div className="absolute bottom-3 left-3 flex gap-3 rounded-md border border-white/10 bg-black/60 px-3 py-2 backdrop-blur-sm">
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
          <span className="text-[0.65rem] text-neutral-300">Active</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
          <span className="text-[0.65rem] text-neutral-300">Busy</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-slate-400 shadow-[0_0_8px_rgba(148,163,184,0.5)]" />
          <span className="text-[0.65rem] text-neutral-300">Idle</span>
        </div>
      </div>

      {/* Stats overlay */}
      <div
        className="absolute right-3 top-3 rounded-md border border-white/10 bg-black/60 px-3 py-2 backdrop-blur-sm"
      >
        <div className="text-[0.65rem] text-neutral-400">Active Routes</div>
        <div
          className="text-lg font-semibold text-emerald-400"
        >
          4
        </div>
      </div>
    </div>
  );
}
