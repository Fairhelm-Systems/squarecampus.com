"use client";

import { motion } from "@/lib/motion";
import { useEffect, useRef, useState } from "react";
import { Check, X } from "@/icons";

type ComparisonRow = {
  metric: string;
  them: string | number;
  us: string | number;
  themBad?: boolean;
  animated?: boolean;
  takeaway?: string;
  examples?: {
    title: string;
    items: string[];
  };
};

// GSAP-animated hover card showing competitor examples
function InlineExamples({ examples }: { examples: { title: string; items: string[] } }) {
  return (
    <div className="col-span-3 mt-4 rounded-xl border border-rose-500/30 bg-gradient-to-br from-rose-950/80 via-neutral-900/90 to-neutral-950/95 p-4 text-sm text-neutral-200">
      <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-rose-300">
        <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
        {examples.title}
      </div>
      <div className="space-y-2">
        {examples.items.map((item, index) => (
          <div key={index} className="flex items-start gap-2">
            <span className="mt-1 text-rose-300">→</span>
            <span className="leading-relaxed">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ComparisonTable({ rows }: { rows: ComparisonRow[] }) {
  const [openRowIndex, setOpenRowIndex] = useState<number | null>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Close on click outside for touch devices
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (tableRef.current && !tableRef.current.contains(event.target as Node)) {
        setOpenRowIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={tableRef}
      className="group relative overflow-visible rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900/60 via-neutral-950 to-neutral-950 p-1 shadow-2xl shadow-black/50 transition-all duration-500 hover:border-white/20"
    >
      {/* Glow effects */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-500/0 blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:bg-blue-500/15" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-36 w-36 rounded-full bg-purple-500/0 blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:bg-purple-500/12" />
      <div className="relative overflow-hidden rounded-[22px] border border-white/5 bg-neutral-950/70">
        {/* Header */}
        <div className="relative grid grid-cols-3 gap-4 border-b border-white/10 bg-neutral-900/60 p-4 backdrop-blur-sm md:p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-500">
            Metric
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-rose-400">
            <X className="h-4 w-4" />
            Others
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-300">
            <Check className="h-4 w-4" />
            SquareCampus
          </div>
        </div>

        {/* Rows */}
        <div className="relative divide-y divide-white/5">
          {rows.map((row, index) => (
            <TableRow
              key={row.metric}
              row={row}
              index={index}
              isOpen={openRowIndex === index}
              onToggle={() => setOpenRowIndex(openRowIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Individual table row with hover card
function TableRow({
  row,
  index,
  isOpen,
  onToggle,
}: {
  row: ComparisonRow;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const handleClick = () => {
    if (row.examples) onToggle();
  };
  const themValue = typeof row.them === "number" ? row.them.toString() : row.them;
  const usValue = typeof row.us === "number" ? row.us.toString() : row.us;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative grid grid-cols-3 gap-4 p-4 transition-colors duration-200 md:p-6 ${
        row.examples
          ? "cursor-pointer border-l-2 border-transparent hover:bg-rose-500/5 hover:border-l-rose-500/50"
          : "hover:bg-white/[0.02]"
      } ${isOpen ? "bg-rose-500/5 border-l-rose-500/60" : ""}`}
      onClick={handleClick}
    >
      <div className="space-y-1 text-sm text-neutral-300 md:text-base">
        <div>{row.metric}</div>
        {row.takeaway && (
          <div className="text-[11px] uppercase tracking-[0.24em] text-neutral-500">
            {row.takeaway}
          </div>
        )}
      </div>
      <div className="flex items-center justify-center">
        <span
          className={`rounded-full border px-3 py-1 text-center text-lg font-semibold md:text-2xl ${
            row.themBad
              ? "border-rose-500/30 bg-rose-500/10 text-rose-300"
              : "border-neutral-700/60 bg-neutral-900/60 text-neutral-300"
          }`}
        >
          {themValue}
        </span>
      </div>
      <div className="flex items-center justify-center">
        <span className="rounded-full border border-emerald-500/40 bg-emerald-500/15 px-3 py-1 text-center text-lg font-semibold text-emerald-300 shadow-[0_0_18px_rgba(16,185,129,0.2)] md:text-2xl">
          {usValue}
        </span>
      </div>

      {isOpen && row.examples && <InlineExamples examples={row.examples} />}
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
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/70 p-6 shadow-xl shadow-black/30 transition-all duration-500 hover:border-white/20"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />

      <div className="relative mb-4 flex items-center gap-3">
        <div className="rounded-lg border border-white/10 bg-white/5 p-2">
          <Icon className="h-5 w-5 text-blue-300" />
        </div>
        <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-neutral-400">
          {label}
        </h3>
      </div>

      {/* Them */}
      <div className="relative mb-4 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-neutral-500">Others</span>
          <span className="font-mono text-base font-semibold text-rose-400">{themValue}</span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-neutral-800/80">
          <motion.div
            className="h-full bg-gradient-to-r from-rose-500 to-red-600"
            initial={{ width: 0 }}
            whileInView={{ width: `${themPercentage}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: delay + 0.25, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Us */}
      <div className="relative space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-neutral-500">SquareCampus</span>
          <span className="font-mono text-base font-semibold text-emerald-400">{usValue}</span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-neutral-800/80">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-500 to-green-600"
            initial={{ width: 0 }}
            whileInView={{ width: `${usPercentage}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: delay + 0.25, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
