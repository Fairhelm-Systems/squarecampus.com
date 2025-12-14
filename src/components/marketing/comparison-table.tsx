"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { AnimatedCounter } from "./backgrounds/why-different-bg";
import { Check, X } from "@/icons";

type ComparisonRow = {
  metric: string;
  them: string | number;
  us: string | number;
  themBad?: boolean;
  animated?: boolean;
  examples?: {
    title: string;
    items: string[];
  };
};

// GSAP-animated hover card showing competitor examples
function ExampleHoverCard({ examples }: { examples: { title: string; items: string[] } }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const items = itemsRef.current?.children;
    if (!card || !items) return;

    // GSAP entrance animation
    const tl = gsap.timeline();

    // Animate card entrance
    gsap.fromTo(
      card,
      { scale: 0.8, opacity: 0, y: 10 },
      { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.7)" }
    );

    // Animate items with stagger
    gsap.fromTo(
      items,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.3, stagger: 0.05, delay: 0.15, ease: "power2.out" }
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="pointer-events-none absolute left-full top-1/2 z-[100] ml-4 w-80 -translate-y-1/2 rounded-xl border border-rose-500/40 bg-gradient-to-br from-rose-950/98 via-neutral-900/98 to-neutral-950/98 p-5 shadow-2xl shadow-rose-500/30 backdrop-blur-xl"
    >
      {/* Arrow pointing to the row */}
      <div className="absolute right-full top-1/2 -mr-px -translate-y-1/2 border-[10px] border-transparent border-r-rose-950/98" />

      <div className="mb-3 flex items-center gap-2">
        <div className="h-2 w-2 animate-pulse rounded-full bg-rose-400" />
        <p className="text-xs font-bold uppercase tracking-wider text-rose-400">
          {examples.title}
        </p>
      </div>
      <div ref={itemsRef} className="space-y-2.5">
        {examples.items.map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-2 text-sm text-neutral-200"
          >
            <span className="mt-0.5 font-bold text-rose-400">→</span>
            <span className="leading-relaxed">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ComparisonTable({ rows }: { rows: ComparisonRow[] }) {
  return (
    <div className="group relative overflow-visible rounded-2xl border border-neutral-800/60 bg-gradient-to-br from-neutral-900/60 via-neutral-950 to-neutral-950 shadow-2xl shadow-black/40 transition-all duration-500 hover:border-neutral-700/80 hover:shadow-2xl hover:shadow-blue-500/10">
      {/* Glow effects */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-500/0 blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:bg-blue-500/20" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-40 w-40 rounded-full bg-purple-500/0 blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:bg-purple-500/15" />
      {/* Header */}
      <div className="relative grid grid-cols-3 gap-4 border-b border-white/10 bg-neutral-900/50 p-4 backdrop-blur-sm md:p-6">
        <div className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
          Metric
        </div>
        <div className="flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-wider text-rose-400">
          <X className="h-4 w-4" />
          Them
        </div>
        <div className="flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-wider text-emerald-400">
          <Check className="h-4 w-4" />
          Us
        </div>
      </div>

      {/* Rows */}
      <div className="relative divide-y divide-white/5">
        {rows.map((row, index) => (
          <TableRow key={row.metric} row={row} index={index} />
        ))}
      </div>
    </div>
  );
}

// Individual table row with hover card
function TableRow({ row, index }: { row: ComparisonRow; index: number }) {
  const [showExamples, setShowExamples] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative grid grid-cols-3 gap-4 p-4 transition-all duration-200 md:p-6 ${row.examples
          ? "cursor-pointer hover:bg-rose-500/5 hover:border-l-2 hover:border-l-rose-500/50"
          : "hover:bg-white/[0.02]"
        }`}
      onMouseEnter={() => row.examples && setShowExamples(true)}
      onMouseLeave={() => setShowExamples(false)}
    >
      {/* Show hover card if examples exist */}
      {showExamples && row.examples && (
        <ExampleHoverCard examples={row.examples} />
      )}

      <div className="flex items-center gap-2 text-sm text-neutral-300 md:text-base">
        {row.metric}
        {row.examples && (
          <span className="inline-flex items-center gap-1 rounded-full border border-rose-500/30 bg-rose-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-rose-400">
            <span className="h-1 w-1 animate-pulse rounded-full bg-rose-400" />
            hover for details
          </span>
        )}
      </div>
      <div className="flex items-center justify-center">
        <span
          className={`text-center text-lg font-bold md:text-2xl ${row.themBad ? "text-rose-400" : "text-neutral-400"
            }`}
        >
          {typeof row.them === "number" && row.animated ? (
            <AnimatedCounter end={row.them} suffix="+" />
          ) : (
            row.them
          )}
        </span>
      </div>
      <div className="flex items-center justify-center">
        <span className="text-center text-lg font-bold text-emerald-400 md:text-2xl">
          {typeof row.us === "number" && row.animated ? (
            <AnimatedCounter end={row.us} />
          ) : (
            row.us
          )}
        </span>
      </div>
    </motion.div>
  );
}

// Visual stats cards with animated progress bars
export function StatCard({
  label,
  themValue,
  usValue,
  icon: Icon,
  delay = 0,
}: {
  label: string;
  themValue: number;
  usValue: number;
  icon: React.ComponentType<{ className?: string }>;
  delay?: number;
}) {
  const maxValue = Math.max(themValue, usValue);
  const themPercentage = (themValue / maxValue) * 100;
  const usPercentage = (usValue / maxValue) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group relative overflow-hidden rounded-2xl border border-neutral-800/60 bg-gradient-to-br from-neutral-900/60 via-neutral-950 to-neutral-950 p-6 shadow-xl shadow-black/20 transition-all duration-500 hover:scale-[1.02] hover:border-neutral-700/80 hover:shadow-xl hover:shadow-blue-500/10"
    >
      {/* Glow effect */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-500/0 blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:bg-blue-500/20" />

      <div className="relative mb-4 flex items-center gap-3">
        <div className="rounded-lg border border-white/10 bg-white/5 p-2">
          <Icon className="h-5 w-5 text-blue-400" />
        </div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
          {label}
        </h3>
      </div>

      {/* Them */}
      <div className="relative mb-4 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-neutral-500">Others</span>
          <span className="font-mono font-semibold text-rose-400">
            <AnimatedCounter end={themValue} />
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-neutral-800">
          <motion.div
            className="h-full bg-gradient-to-r from-rose-500 to-red-600"
            initial={{ width: 0 }}
            whileInView={{ width: `${themPercentage}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: delay + 0.3, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Us */}
      <div className="relative space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-neutral-500">SquareCampus</span>
          <span className="font-mono font-semibold text-emerald-400">
            <AnimatedCounter end={usValue} />
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-neutral-800">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-500 to-green-600"
            initial={{ width: 0 }}
            whileInView={{ width: `${usPercentage}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: delay + 0.3, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
