"use client";

import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Activity,
  Bus,
  DollarSign,
  TrendingUp,
  Users,
} from "@/components/icons";

type LiveMetric = {
  label: string;
  value: number;
  suffix: string;
  trend: "up" | "down" | "stable";
  color: "emerald" | "sky" | "amber" | "purple";
};

type LogEntry = {
  id: string;
  time: string;
  category: "attendance" | "finance" | "transport" | "system" | "alert";
  message: string;
};

const initialMetrics: LiveMetric[] = [
  { label: "Attendance", value: 94, suffix: "%", trend: "up", color: "emerald" },
  { label: "Collection", value: 87, suffix: "%", trend: "up", color: "sky" },
  { label: "Routes live", value: 18, suffix: "", trend: "stable", color: "amber" },
  { label: "Alerts", value: 3, suffix: "", trend: "down", color: "purple" },
];

const logEntries: LogEntry[] = [
  { id: "1", time: "08:47:32", category: "attendance", message: "Grade 10-A attendance marked complete (42/44 present)" },
  { id: "2", time: "08:46:15", category: "finance", message: "Payment received: ₹12,500 via UPI from Parent #4521" },
  { id: "3", time: "08:45:03", category: "transport", message: "Route 7 departed from depot on schedule" },
  { id: "4", time: "08:44:28", category: "alert", message: "Lab AC maintenance scheduled for 2:00 PM today" },
  { id: "5", time: "08:43:51", category: "attendance", message: "Grade 9-B: 2 students marked late arrival" },
  { id: "6", time: "08:42:17", category: "system", message: "Auto-reminder batch sent to 24 pending fee accounts" },
  { id: "7", time: "08:41:44", category: "transport", message: "All 18 buses checked in and GPS active" },
  { id: "8", time: "08:40:22", category: "attendance", message: "Staff attendance sync completed (156/160 present)" },
  { id: "9", time: "08:39:08", category: "finance", message: "Fee receipt #4521 generated and sent via WhatsApp" },
  { id: "10", time: "08:38:33", category: "system", message: "PTM reminder scheduled for Grade 8 parents" },
  { id: "11", time: "08:37:15", category: "attendance", message: "Grade 9-A attendance marked complete (38/40 present)" },
  { id: "12", time: "08:36:02", category: "finance", message: "Payment received: ₹8,200 via Card from Parent #3892" },
  { id: "13", time: "08:35:18", category: "transport", message: "Route 12 ETA updated: arriving 3 mins early" },
  { id: "14", time: "08:34:45", category: "system", message: "Daily backup completed successfully" },
  { id: "15", time: "08:33:22", category: "attendance", message: "Grade 8-C attendance marked complete (39/41 present)" },
  { id: "16", time: "08:32:11", category: "alert", message: "Low toner alert: Admin block printer needs attention" },
  { id: "17", time: "08:31:05", category: "finance", message: "Bulk fee receipt generation completed (142 receipts)" },
  { id: "18", time: "08:30:48", category: "transport", message: "Route 3 picked up last student, en route to campus" },
  { id: "19", time: "08:29:33", category: "system", message: "Parent app sync completed: 2,847 active sessions" },
  { id: "20", time: "08:28:17", category: "attendance", message: "Biometric sync: 12 new entries from Gate 2" },
];

const departmentBars = [
  { name: "Academics", value: 94, color: "emerald" },
  { name: "Finance", value: 87, color: "sky" },
  { name: "Transport", value: 96, color: "amber" },
  { name: "Comms", value: 92, color: "purple" },
  { name: "Admission", value: 89, color: "emerald" },
  { name: "HR", value: 91, color: "sky" },
  { name: "Facilities", value: 85, color: "amber" },
  { name: "Support", value: 98, color: "purple" },
];

const classSummary = [
  { name: "Grade 10-A", present: 42, total: 44, status: "complete" },
  { name: "Grade 10-B", present: 38, total: 42, status: "complete" },
  { name: "Grade 9-A", present: 38, total: 40, status: "complete" },
  { name: "Grade 9-B", present: 36, total: 41, status: "in-progress" },
];

export const FeatureVisual = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logContainerRef = useRef<HTMLDivElement>(null);
  const [metrics, setMetrics] = useState(initialMetrics);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [bars, setBars] = useState(departmentBars);

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Cycle metrics with slight variations
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((m) => ({
          ...m,
          value: m.label === "Alerts"
            ? Math.max(0, m.value + (Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0))
            : Math.min(100, Math.max(0, m.value + (Math.random() > 0.5 ? 1 : -1) * (Math.random() > 0.7 ? 1 : 0))),
        }))
      );
      setBars((prev) =>
        prev.map((b) => ({
          ...b,
          value: Math.min(100, Math.max(80, b.value + (Math.random() > 0.5 ? 1 : -1) * (Math.random() > 0.6 ? 1 : 0))),
        }))
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // GSAP animations
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(".js-live-dot", {
        scale: 1.3,
        opacity: 0.6,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".js-metric-card", {
        y: -3,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.15,
      });

      gsap.to(".js-status-segment", {
        opacity: 0.5,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.05,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Infinite scroll for logs
  useEffect(() => {
    if (!logContainerRef.current) return;

    const container = logContainerRef.current;
    const scrollHeight = container.scrollHeight / 2; // Half because we duplicate the list

    const tween = gsap.to(container, {
      y: -scrollHeight,
      duration: 60, // Slow scroll - 60 seconds for full cycle
      ease: "none",
      repeat: -1,
    });

    return () => {
      tween.kill();
    };
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  // Duplicate logs for seamless infinite scroll
  const duplicatedLogs = [...logEntries, ...logEntries];

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden bg-neutral-950 text-white"
    >
      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.02)1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.02)1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-neutral-900/80 px-4 py-2 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-emerald-400" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-300">
              Control Surface
            </span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5">
            <span className="js-live-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="text-[0.6rem] font-semibold uppercase tracking-wider text-emerald-300">
              Live
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs text-neutral-400">
          <span className="hidden sm:inline">Multi-campus view</span>
          <span className="font-mono text-neutral-200">{formatTime(currentTime)}</span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex h-[calc(100%-40px)] flex-col gap-3 p-3 sm:p-4">
        {/* Metrics row */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
          {metrics.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
        </div>

        {/* Bottom section */}
        <div className="grid flex-1 gap-3 sm:grid-cols-[1fr_1.2fr]">
          {/* Left: Department health + Class summary */}
          <div className="flex flex-col gap-3">
            {/* Department health - Column Graph */}
            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-neutral-900/60">
              <div className="flex items-center justify-between border-b border-white/5 px-3 py-2">
                <span className="text-[0.65rem] uppercase tracking-[0.3em] text-neutral-400">
                  Department health
                </span>
                <span className="flex items-center gap-1 text-[0.6rem] text-emerald-400">
                  <TrendingUp className="h-3 w-3" />
                  All green
                </span>
              </div>
              <div className="p-3">
                <DepartmentColumnGraph bars={bars} />
              </div>
            </div>

            {/* Class summary */}
            <div className="relative flex-1 overflow-hidden rounded-xl border border-white/10 bg-neutral-900/60">
              <div className="flex items-center justify-between border-b border-white/5 px-3 py-2">
                <span className="text-[0.65rem] uppercase tracking-[0.3em] text-neutral-400">
                  Today&apos;s attendance
                </span>
                <span className="text-[0.6rem] text-neutral-500">4 classes</span>
              </div>
              <div className="flex flex-col gap-1.5 p-2">
                {classSummary.map((cls) => (
                  <div
                    key={cls.name}
                    className="flex items-center justify-between rounded-lg bg-white/5 px-2.5 py-1.5"
                  >
                    <span className="text-[0.65rem] text-white/70">{cls.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[0.65rem] text-white/50">
                        {cls.present}/{cls.total}
                      </span>
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          cls.status === "complete" ? "bg-emerald-400" : "bg-amber-400 animate-pulse"
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Status segments */}
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-neutral-900/60 px-3 py-2">
              <span className="text-[0.55rem] text-neutral-500 shrink-0">24h uptime</span>
              <div className="flex-1 flex gap-0.5">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "js-status-segment flex-1 h-3 rounded-sm",
                      i === 14 ? "bg-amber-400/60" : "bg-emerald-400/50"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Live logs with infinite scroll */}
          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-neutral-900/60">
            <div className="flex items-center justify-between border-b border-white/5 px-3 py-2">
              <span className="text-[0.65rem] uppercase tracking-[0.3em] text-neutral-400">
                Activity logs
              </span>
              <span className="rounded-full bg-white/5 px-2 py-0.5 text-[0.6rem] text-neutral-300">
                Real-time
              </span>
            </div>
            {/* Scrolling container */}
            <div className="relative h-[calc(100%-36px)] overflow-hidden">
              {/* Fade overlays */}
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-6 bg-gradient-to-b from-neutral-900/90 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-6 bg-gradient-to-t from-neutral-900/90 to-transparent" />

              <div ref={logContainerRef} className="flex flex-col gap-1 p-2">
                {duplicatedLogs.map((log, idx) => (
                  <LogRow key={`${log.id}-${idx}`} log={log} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom status bar */}
        <div className="flex items-center justify-between rounded-lg border border-white/5 bg-neutral-900/40 px-3 py-1.5">
          <div className="flex items-center gap-4 text-[0.6rem] text-neutral-400">
            <span className="flex items-center gap-1.5">
              <Users className="h-3 w-3" />
              <span className="text-neutral-200">4,812</span> students
            </span>
            <span className="hidden items-center gap-1.5 sm:flex">
              <Bus className="h-3 w-3" />
              <span className="text-neutral-200">18</span> routes
            </span>
            <span className="hidden items-center gap-1.5 sm:flex">
              <DollarSign className="h-3 w-3" />
              <span className="text-neutral-200">₹2.4L</span> today
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="text-[0.6rem] text-emerald-400">All systems operational</span>
          </div>
        </div>
      </div>
    </div>
  );
};

function MetricCard({ metric }: { metric: LiveMetric }) {
  const colorMap = {
    emerald: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/30",
    sky: "from-sky-500/20 to-sky-500/5 border-sky-500/30",
    amber: "from-amber-500/20 to-amber-500/5 border-amber-500/30",
    purple: "from-purple-500/20 to-purple-500/5 border-purple-500/30",
  };

  const textColor = {
    emerald: "text-emerald-400",
    sky: "text-sky-400",
    amber: "text-amber-400",
    purple: "text-purple-400",
  };

  return (
    <div
      className={cn(
        "js-metric-card relative overflow-hidden rounded-xl border bg-gradient-to-br p-3",
        colorMap[metric.color]
      )}
    >
      <p className="text-[0.6rem] uppercase tracking-[0.25em] text-neutral-400">
        {metric.label}
      </p>
      <div className="mt-1 flex items-baseline gap-1">
        <span className={cn("text-xl font-bold sm:text-2xl", textColor[metric.color])}>
          {metric.value}
        </span>
        <span className="text-sm text-neutral-400">{metric.suffix}</span>
      </div>
      {metric.trend === "up" && (
        <TrendingUp className={cn("absolute right-2 top-2 h-3 w-3", textColor[metric.color])} />
      )}
    </div>
  );
}

function DepartmentColumnGraph({ bars }: { bars: { name: string; value: number; color: string }[] }) {
  const graphRef = useRef<HTMLDivElement>(null);

  const colorMap: Record<string, { from: string; to: string; glow: string; particle: string }> = {
    emerald: {
      from: "#10b981",
      to: "#059669",
      glow: "rgba(16,185,129,0.6)",
      particle: "#34d399",
    },
    sky: {
      from: "#0ea5e9",
      to: "#0284c7",
      glow: "rgba(14,165,233,0.6)",
      particle: "#38bdf8",
    },
    amber: {
      from: "#f59e0b",
      to: "#d97706",
      glow: "rgba(245,158,11,0.6)",
      particle: "#fbbf24",
    },
    purple: {
      from: "#a855f7",
      to: "#9333ea",
      glow: "rgba(168,85,247,0.6)",
      particle: "#c084fc",
    },
  };

  useEffect(() => {
    if (!graphRef.current) return;

    const ctx = gsap.context(() => {
      // Liquid wave effect on bars
      gsap.to(".js-col-bar", {
        scaleY: 1.02,
        scaleX: 1.03,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { each: 0.2, from: "start" },
      });

      // Breathing glow
      gsap.to(".js-col-glow", {
        scale: 1.3,
        opacity: 0.2,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.15,
      });

      // Floating particles
      const particles = gsap.utils.toArray<HTMLElement>(".js-particle");
      particles.forEach((particle) => {
        gsap.to(particle, {
          y: -30,
          x: `random(-8, 8)`,
          opacity: 0,
          duration: `random(1.5, 2.5)`,
          repeat: -1,
          ease: "power1.out",
          delay: `random(0, 2)`,
        });
      });

      // Shimmer effect
      gsap.to(".js-shimmer", {
        backgroundPosition: "200% 0",
        duration: 2,
        repeat: -1,
        ease: "none",
        stagger: 0.3,
      });

      // Pulse ring
      gsap.to(".js-pulse-ring", {
        scale: 2,
        opacity: 0,
        duration: 2,
        repeat: -1,
        ease: "power1.out",
        stagger: { each: 0.4, repeat: -1 },
      });

      // Value counter effect
      gsap.to(".js-col-value", {
        textShadow: "0 0 8px currentColor",
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2,
      });
    }, graphRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={graphRef} className="relative h-28">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/[0.02] to-transparent rounded-lg" />

      {/* Subtle grid */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        {[0.2, 0.4, 0.6, 0.8].map((y) => (
          <line
            key={y}
            x1="10%"
            y1={`${y * 100}%`}
            x2="95%"
            y2={`${y * 100}%`}
            stroke="rgba(255,255,255,0.03)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        ))}
      </svg>

      {/* Bars */}
      <div className="relative flex items-end justify-around h-full px-2 pb-5 pt-1">
        {bars.map((bar, idx) => {
          const colors = colorMap[bar.color];
          const barHeight = (bar.value / 100) * 80;

          return (
            <div key={bar.name} className="relative flex flex-col items-center flex-1 h-full justify-end">
              {/* Floating particles */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 pointer-events-none">
                {[0, 1].map((i) => (
                  <div
                    key={i}
                    className="js-particle absolute w-0.5 h-0.5 rounded-full"
                    style={{
                      background: colors.particle,
                      boxShadow: `0 0 3px ${colors.particle}`,
                      left: `${(i - 0.5) * 4}px`,
                      bottom: `${barHeight}px`,
                    }}
                  />
                ))}
              </div>

              {/* Value label */}
              <div
                className="js-col-value absolute text-[0.5rem] font-bold transition-all duration-500"
                style={{
                  bottom: `${barHeight + 8}px`,
                  color: colors.from,
                }}
              >
                {bar.value}
              </div>

              {/* Pulse ring at top */}
              <div
                className="js-pulse-ring absolute w-3 h-3 rounded-full border opacity-40"
                style={{
                  bottom: `${barHeight + 4}px`,
                  borderColor: colors.from,
                }}
              />

              {/* Glow layer */}
              <div
                className="js-col-glow absolute bottom-5 w-5 rounded-t blur-lg"
                style={{
                  height: `${barHeight}px`,
                  background: `linear-gradient(to top, ${colors.glow}, transparent)`,
                }}
              />

              {/* Main bar */}
              <div
                className="js-col-bar relative w-3 rounded-t overflow-hidden origin-bottom"
                style={{
                  height: `${barHeight}px`,
                  background: `linear-gradient(to top, ${colors.to}, ${colors.from})`,
                  boxShadow: `0 0 12px ${colors.glow}, inset 0 1px 0 rgba(255,255,255,0.3)`,
                }}
              >
                {/* Inner highlight */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 opacity-60" />

                {/* Animated shimmer */}
                <div
                  className="js-shimmer absolute inset-0"
                  style={{
                    background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
                    backgroundSize: "200% 100%",
                  }}
                />

                {/* Bottom reflection */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1/3"
                  style={{
                    background: `linear-gradient(to top, ${colors.to}, transparent)`,
                    opacity: 0.5,
                  }}
                />
              </div>

              {/* Reflection */}
              <div
                className="absolute w-3 rounded-b opacity-15 origin-top"
                style={{
                  height: `${barHeight * 0.25}px`,
                  top: `calc(100% - 20px)`,
                  background: `linear-gradient(to bottom, ${colors.from}, transparent)`,
                  transform: "scaleY(-1)",
                  filter: "blur(1px)",
                }}
              />

              {/* Label */}
              <span className="absolute -bottom-0.5 text-[0.4rem] text-white/40 font-medium tracking-tight">
                {bar.name.slice(0, 3).toUpperCase()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LogRow({ log }: { log: LogEntry }) {
  const categoryStyles: Record<string, { bg: string; text: string; label: string }> = {
    attendance: { bg: "bg-emerald-500/15", text: "text-emerald-400", label: "ATT" },
    finance: { bg: "bg-sky-500/15", text: "text-sky-400", label: "FIN" },
    transport: { bg: "bg-amber-500/15", text: "text-amber-400", label: "TRN" },
    system: { bg: "bg-purple-500/15", text: "text-purple-400", label: "SYS" },
    alert: { bg: "bg-rose-500/15", text: "text-rose-400", label: "ALT" },
  };

  const style = categoryStyles[log.category];

  return (
    <div className="flex items-start gap-2 rounded-lg bg-white/5 px-2.5 py-2">
      <span className="font-mono text-[0.6rem] text-neutral-500 shrink-0 pt-0.5">
        {log.time}
      </span>
      <span
        className={cn(
          "shrink-0 rounded px-1.5 py-0.5 text-[0.55rem] font-semibold uppercase tracking-wider",
          style.bg,
          style.text
        )}
      >
        {style.label}
      </span>
      <p className="text-[0.65rem] text-neutral-300 leading-relaxed">{log.message}</p>
    </div>
  );
}
