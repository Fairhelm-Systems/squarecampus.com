"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { CSSProperties } from "react";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

// Illustration variants for each category
type IllustrationVariant =
  | "neural" // Executive Intelligence - interconnected nodes
  | "expand" // Growth & Scale - expanding hexagonal grid
  | "flow" // Finance & Collections - flowing currency paths
  | "shield" // Compliance & Reporting - layered shields
  | "pulse" // Parent Experience - radiating heart pulse
  | "gear" // People & Admin - interlocking gears
  | "star"; // Experience & Brand - starburst pattern

const categories = [
  {
    title: "Executive Intelligence",
    blurb: "See around corners with live signal, not gut instinct.",
    accent: { from: "#34d399", to: "#38bdf8" },
    illustration: "neural" as IllustrationVariant,
    lines: [
      "your leadership saw daily attendance, dues, and red flags before 9:30 AM",
      "you flagged at-risk students early enough to intervene this term",
      "every board review pulled live data without last-minute exports",
      "your team got next-step suggestions instead of guesswork",
      "your reports stayed fast even as campuses grew",
    ],
  },
  {
    title: "Growth & Scale",
    blurb: "Expansion feels like a switch, not a survival test.",
    accent: { from: "#f59e0b", to: "#f97316" },
    illustration: "expand" as IllustrationVariant,
    lines: [
      "a new campus went live in a week, not a month",
      "10,000 students felt like 1,000 because workflows stayed consistent",
      "onboarding finished before the next term started",
      "admission season ran without weekend overtime",
      "your accounts team still left by 5 PM during fee season",
    ],
  },
  {
    title: "Finance & Collections",
    blurb: "Cashflow, clarity, and control without the chaos.",
    accent: { from: "#22c55e", to: "#14b8a6" },
    illustration: "flow" as IllustrationVariant,
    lines: [
      "fee reconciliation wrapped up in days, not weeks",
      "most fees arrived on time because reminders were consistent",
      "you saved several lakhs a year by removing manual steps",
      "late fees applied automatically with clear parent notices",
      "you knew your cash position this morning, not at month-end",
    ],
  },
  {
    title: "Compliance & Reporting",
    blurb: "Board-ready, audit-ready, always.",
    accent: { from: "#60a5fa", to: "#38bdf8" },
    illustration: "shield" as IllustrationVariant,
    lines: [
      "accreditation packs were ready in a day, not a week",
      "compliance tasks ran on schedule, not in a quarterly scramble",
      "financial reports were ready every morning before assembly",
      "results went out within 48 hours, not two weeks",
      "exam processing needed checks, not a full team",
    ],
  },
  {
    title: "Parent Experience",
    blurb: "Parents feel informed, not frustrated.",
    accent: { from: "#ec4899", to: "#f97316" },
    illustration: "pulse" as IllustrationVariant,
    lines: [
      "parent calls dropped because updates arrived on their phone",
      "every parent saw progress, homework, and notices in one place",
      'fee receipts were instant, not "come back tomorrow"',
      "bus updates arrived automatically during pickup and drop",
      "PTMs scheduled themselves without back-and-forth",
    ],
  },
  {
    title: "People & Admin",
    blurb: "Staff focus on teaching and care, not paperwork.",
    accent: { from: "#a855f7", to: "#6366f1" },
    illustration: "gear" as IllustrationVariant,
    lines: [
      "attendance alerts reached parents the same hour",
      "timetables flagged conflicts before they were published",
      "teachers stopped re-entering attendance at day end",
      "payroll closed on time without manual cleanup",
      "library overdues updated automatically",
    ],
  },
  {
    title: "Experience & Brand",
    blurb: "Your tech becomes a reason families choose you.",
    accent: { from: "#38bdf8", to: "#22c55e" },
    illustration: "star" as IllustrationVariant,
    lines: [
      "parents chose you because updates felt clear and modern",
      "alumni stayed engaged with events and updates after graduation",
      "your staff used software that felt current, not clunky",
      "mobile worked fully, not as a reduced version",
      "training felt like hours, not weeks",
    ],
  },
] as const;

// Cycle timing
const CYCLE_DURATION = 5000; // 5 seconds per category
const TRANSITION_DURATION = 0.6;

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

// Detect low-end device
function isLowEndDevice() {
  if (typeof window === "undefined") return false;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  const cores = navigator.hardwareConcurrency;
  return (memory !== undefined && memory < 4) || (cores !== undefined && cores < 4);
}

// Pre-generated particle configs for stable keys - fewer on low-end
const PARTICLE_CONFIGS = Array.from({ length: 15 }, (_, i) => ({
  id: `whatif-particle-${String(i).padStart(2, "0")}`,
  size: 2 + (((i * 7) % 10) / 10) * 3,
  left: (i * 23) % 100,
  delay: (i * 3) % 10,
  duration: 14 + (((i * 11) % 10) / 10) * 10,
}));

// Floating particle component - GPU optimized
function Particle({
  config,
  accentFrom,
}: {
  config: (typeof PARTICLE_CONFIGS)[number];
  accentFrom: string;
}) {
  const style = useMemo(
    () =>
      ({
        "--size": `${config.size}px`,
        "--left": `${config.left}%`,
        "--delay": `${config.delay}s`,
        "--duration": `${config.duration}s`,
        "--accent": accentFrom,
      }) as CSSProperties,
    [accentFrom, config]
  );

  return <div className="whatif-particle absolute bottom-0 rounded-full opacity-0" style={style} />;
}

// Category-specific illustration component
function CategoryIllustration({
  variant,
  accentFrom,
  accentTo,
  isLowEnd,
  ringRef,
  orbitRef,
  pulseRef,
}: {
  variant: IllustrationVariant;
  accentFrom: string;
  accentTo: string;
  isLowEnd: boolean;
  ringRef: React.RefObject<HTMLDivElement | null>;
  orbitRef: React.RefObject<HTMLDivElement | null>;
  pulseRef: React.RefObject<HTMLDivElement | null>;
}) {
  // Common elements shared by all variants
  const commonGlow = (
    <div
      ref={pulseRef}
      className="absolute inset-0 rounded-full opacity-30 blur-[60px]"
      style={{
        background: `radial-gradient(circle at center, ${accentFrom}, transparent 65%)`,
        willChange: isLowEnd ? "auto" : "transform, opacity",
      }}
    />
  );

  // Variant-specific rendering
  switch (variant) {
    case "neural":
      // Executive Intelligence - interconnected neural network nodes
      return (
        <>
          {commonGlow}
          {/* Base circle with brain-like gradient */}
          <div
            className="absolute inset-6 rounded-full border border-white/5 backdrop-blur-sm"
            style={{
              background: `radial-gradient(circle at 40% 35%, rgba(52,211,153,0.08), rgba(0,0,0,0.4))`,
            }}
          />
          {/* Rotating outer ring */}
          <div
            ref={ringRef}
            className="absolute inset-0 rounded-full border border-white/[0.06]"
            style={{ willChange: isLowEnd ? "auto" : "transform" }}
          />
          {/* Neural connection lines */}
          <svg className="absolute inset-4" viewBox="0 0 200 200" fill="none">
            <title>Neural Network</title>
            {/* Central hub */}
            <circle
              cx="100"
              cy="100"
              r="12"
              fill={`${accentFrom}20`}
              stroke={accentFrom}
              strokeWidth="1.5"
            />
            {/* Outer nodes */}
            <circle
              cx="50"
              cy="60"
              r="6"
              fill={`${accentTo}30`}
              stroke={accentTo}
              strokeWidth="1"
            />
            <circle
              cx="150"
              cy="60"
              r="6"
              fill={`${accentTo}30`}
              stroke={accentTo}
              strokeWidth="1"
            />
            <circle
              cx="40"
              cy="120"
              r="5"
              fill={`${accentFrom}30`}
              stroke={accentFrom}
              strokeWidth="1"
            />
            <circle
              cx="160"
              cy="120"
              r="5"
              fill={`${accentFrom}30`}
              stroke={accentFrom}
              strokeWidth="1"
            />
            <circle
              cx="70"
              cy="160"
              r="6"
              fill={`${accentTo}30`}
              stroke={accentTo}
              strokeWidth="1"
            />
            <circle
              cx="130"
              cy="160"
              r="6"
              fill={`${accentTo}30`}
              stroke={accentTo}
              strokeWidth="1"
            />
            <circle
              cx="100"
              cy="40"
              r="5"
              fill={`${accentFrom}30`}
              stroke={accentFrom}
              strokeWidth="1"
            />
            {/* Connection lines */}
            <path
              d="M100 88 L50 66"
              stroke={`${accentFrom}40`}
              strokeWidth="1"
              strokeDasharray="4 2"
            />
            <path
              d="M100 88 L150 66"
              stroke={`${accentTo}40`}
              strokeWidth="1"
              strokeDasharray="4 2"
            />
            <path
              d="M88 100 L46 120"
              stroke={`${accentFrom}40`}
              strokeWidth="1"
              strokeDasharray="4 2"
            />
            <path
              d="M112 100 L154 120"
              stroke={`${accentTo}40`}
              strokeWidth="1"
              strokeDasharray="4 2"
            />
            <path
              d="M94 112 L76 154"
              stroke={`${accentFrom}40`}
              strokeWidth="1"
              strokeDasharray="4 2"
            />
            <path
              d="M106 112 L124 154"
              stroke={`${accentTo}40`}
              strokeWidth="1"
              strokeDasharray="4 2"
            />
            <path
              d="M100 88 L100 46"
              stroke={`${accentFrom}40`}
              strokeWidth="1"
              strokeDasharray="4 2"
            />
            {/* Pulse indicators */}
            <circle
              cx="100"
              cy="100"
              r="20"
              fill="none"
              stroke={accentFrom}
              strokeWidth="0.5"
              opacity="0.4"
            />
            <circle
              cx="100"
              cy="100"
              r="30"
              fill="none"
              stroke={accentTo}
              strokeWidth="0.5"
              opacity="0.3"
            />
          </svg>
          {/* Orbiting data point */}
          <div
            ref={orbitRef}
            className="absolute inset-2"
            style={{ willChange: isLowEnd ? "auto" : "transform" }}
          >
            <div
              className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full"
              style={{
                backgroundColor: accentTo,
                boxShadow: `0 0 10px ${accentTo}, 0 0 20px ${accentTo}`,
              }}
            />
          </div>
          {/* Concentric rings */}
          <div className="absolute inset-12 rounded-full border border-white/[0.04]" />
          <div className="absolute inset-20 rounded-full border border-white/[0.03]" />
        </>
      );

    case "expand":
      // Growth & Scale - expanding hexagonal pattern
      return (
        <>
          {commonGlow}
          {/* Base with warm gradient */}
          <div
            className="absolute inset-6 rounded-full border border-white/5 backdrop-blur-sm"
            style={{
              background: `radial-gradient(circle at 50% 50%, rgba(245,158,11,0.06), rgba(0,0,0,0.4))`,
            }}
          />
          {/* Rotating ring - faster for growth energy */}
          <div
            ref={ringRef}
            className="absolute inset-0 rounded-full"
            style={{
              border: `2px dashed ${accentFrom}20`,
              willChange: isLowEnd ? "auto" : "transform",
            }}
          />
          {/* Hexagonal expansion pattern */}
          <svg className="absolute inset-4" viewBox="0 0 200 200" fill="none">
            <title>Expansion Grid</title>
            {/* Central hexagon */}
            <polygon
              points="100,75 120,87.5 120,112.5 100,125 80,112.5 80,87.5"
              fill={`${accentFrom}15`}
              stroke={accentFrom}
              strokeWidth="1.5"
            />
            {/* Expanding hexagons */}
            <polygon
              points="100,45 130,62.5 130,97.5 100,115 70,97.5 70,62.5"
              fill="none"
              stroke={`${accentFrom}40`}
              strokeWidth="1"
            />
            <polygon
              points="100,25 145,47.5 145,102.5 100,125 55,102.5 55,47.5"
              fill="none"
              stroke={`${accentTo}30`}
              strokeWidth="0.75"
            />
            <polygon
              points="100,10 165,37.5 165,117.5 100,145 35,117.5 35,37.5"
              fill="none"
              stroke={`${accentTo}20`}
              strokeWidth="0.5"
            />
            {/* Growth arrows */}
            <path
              d="M100 75 L100 55"
              stroke={accentFrom}
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
            <path d="M115 95 L135 85" stroke={accentTo} strokeWidth="1.5" opacity="0.7" />
            <path d="M85 95 L65 85" stroke={accentTo} strokeWidth="1.5" opacity="0.7" />
            <path d="M100 115 L100 135" stroke={accentFrom} strokeWidth="1.5" opacity="0.6" />
            <defs>
              <marker
                id="arrowhead"
                markerWidth="6"
                markerHeight="6"
                refX="3"
                refY="3"
                orient="auto"
              >
                <path d="M0,0 L6,3 L0,6 Z" fill={accentFrom} />
              </marker>
            </defs>
            {/* Corner nodes representing campuses */}
            <circle cx="60" cy="50" r="4" fill={accentTo} opacity="0.6" />
            <circle cx="140" cy="50" r="4" fill={accentTo} opacity="0.6" />
            <circle cx="60" cy="150" r="4" fill={accentFrom} opacity="0.6" />
            <circle cx="140" cy="150" r="4" fill={accentFrom} opacity="0.6" />
          </svg>
          {/* Orbiting expansion dot */}
          <div
            ref={orbitRef}
            className="absolute inset-4"
            style={{ willChange: isLowEnd ? "auto" : "transform" }}
          >
            <div
              className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2"
              style={{
                backgroundColor: accentFrom,
                boxShadow: `0 0 12px ${accentFrom}`,
                clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
              }}
            />
          </div>
        </>
      );

    case "flow":
      // Finance & Collections - flowing currency paths
      return (
        <>
          {commonGlow}
          {/* Base with money green gradient */}
          <div
            className="absolute inset-6 rounded-full border border-white/5 backdrop-blur-sm"
            style={{
              background: `radial-gradient(circle at 30% 40%, rgba(34,197,94,0.08), rgba(0,0,0,0.4))`,
            }}
          />
          {/* Rotating coin ring */}
          <div
            ref={ringRef}
            className="absolute inset-0 rounded-full border-2 border-dashed"
            style={{
              borderColor: `${accentFrom}15`,
              willChange: isLowEnd ? "auto" : "transform",
            }}
          />
          {/* Cash flow visualization */}
          <svg className="absolute inset-4" viewBox="0 0 200 200" fill="none">
            <title>Cash Flow</title>
            {/* Central vault/collection point */}
            <rect
              x="80"
              y="80"
              width="40"
              height="40"
              rx="6"
              fill={`${accentFrom}20`}
              stroke={accentFrom}
              strokeWidth="1.5"
            />
            <text
              x="100"
              y="106"
              textAnchor="middle"
              fill={accentFrom}
              fontSize="16"
              fontWeight="bold"
            >
              ₹
            </text>
            {/* Flowing paths - inward money collection */}
            <path
              d="M30 100 Q 55 80, 80 100"
              stroke={accentFrom}
              strokeWidth="2"
              fill="none"
              strokeDasharray="6 3"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="-18"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </path>
            <path
              d="M170 100 Q 145 80, 120 100"
              stroke={accentTo}
              strokeWidth="2"
              fill="none"
              strokeDasharray="6 3"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="-18"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </path>
            <path
              d="M100 30 Q 80 55, 100 80"
              stroke={accentFrom}
              strokeWidth="2"
              fill="none"
              strokeDasharray="6 3"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="-18"
                dur="1.2s"
                repeatCount="indefinite"
              />
            </path>
            <path
              d="M100 170 Q 120 145, 100 120"
              stroke={accentTo}
              strokeWidth="2"
              fill="none"
              strokeDasharray="6 3"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="-18"
                dur="1.8s"
                repeatCount="indefinite"
              />
            </path>
            {/* Money sources */}
            <circle
              cx="30"
              cy="100"
              r="8"
              fill={`${accentFrom}30`}
              stroke={accentFrom}
              strokeWidth="1"
            />
            <circle
              cx="170"
              cy="100"
              r="8"
              fill={`${accentTo}30`}
              stroke={accentTo}
              strokeWidth="1"
            />
            <circle
              cx="100"
              cy="30"
              r="8"
              fill={`${accentFrom}30`}
              stroke={accentFrom}
              strokeWidth="1"
            />
            <circle
              cx="100"
              cy="170"
              r="8"
              fill={`${accentTo}30`}
              stroke={accentTo}
              strokeWidth="1"
            />
            {/* Diagonal flows */}
            <path
              d="M50 50 Q 75 75, 82 88"
              stroke={`${accentFrom}60`}
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="4 2"
            />
            <path
              d="M150 50 Q 125 75, 118 88"
              stroke={`${accentTo}60`}
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="4 2"
            />
          </svg>
          {/* Orbiting coin */}
          <div
            ref={orbitRef}
            className="absolute inset-6"
            style={{ willChange: isLowEnd ? "auto" : "transform" }}
          >
            <div
              className="absolute left-1/2 top-0 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border"
              style={{
                backgroundColor: `${accentFrom}40`,
                borderColor: accentFrom,
                boxShadow: `0 0 8px ${accentFrom}`,
              }}
            >
              <span style={{ color: accentFrom, fontSize: "8px", fontWeight: "bold" }}>₹</span>
            </div>
          </div>
        </>
      );

    case "shield":
      // Compliance & Reporting - layered protection shields
      return (
        <>
          {commonGlow}
          {/* Base with trust blue gradient */}
          <div
            className="absolute inset-6 rounded-full border border-white/5 backdrop-blur-sm"
            style={{
              background: `radial-gradient(circle at 50% 40%, rgba(96,165,250,0.08), rgba(0,0,0,0.4))`,
            }}
          />
          {/* Rotating security ring */}
          <div
            ref={ringRef}
            className="absolute inset-0 rounded-full"
            style={{
              border: `1px solid ${accentFrom}20`,
              willChange: isLowEnd ? "auto" : "transform",
            }}
          />
          {/* Layered shields */}
          <svg className="absolute inset-4" viewBox="0 0 200 200" fill="none">
            <title>Compliance Shield</title>
            {/* Outer shield */}
            <path
              d="M100 20 L160 50 L160 110 Q160 150 100 180 Q40 150 40 110 L40 50 Z"
              fill={`${accentFrom}08`}
              stroke={`${accentFrom}30`}
              strokeWidth="1"
            />
            {/* Middle shield */}
            <path
              d="M100 35 L145 58 L145 105 Q145 138 100 162 Q55 138 55 105 L55 58 Z"
              fill={`${accentFrom}12`}
              stroke={`${accentFrom}50`}
              strokeWidth="1"
            />
            {/* Inner shield */}
            <path
              d="M100 50 L130 68 L130 100 Q130 125 100 145 Q70 125 70 100 L70 68 Z"
              fill={`${accentFrom}20`}
              stroke={accentFrom}
              strokeWidth="1.5"
            />
            {/* Checkmark */}
            <path
              d="M85 100 L95 112 L118 85"
              fill="none"
              stroke={accentTo}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Document icons around shield */}
            <rect
              x="20"
              y="70"
              width="12"
              height="16"
              rx="1"
              fill={`${accentTo}30`}
              stroke={accentTo}
              strokeWidth="0.5"
            />
            <rect
              x="168"
              y="70"
              width="12"
              height="16"
              rx="1"
              fill={`${accentTo}30`}
              stroke={accentTo}
              strokeWidth="0.5"
            />
            <line x1="23" y1="75" x2="29" y2="75" stroke={accentTo} strokeWidth="0.5" />
            <line x1="23" y1="78" x2="29" y2="78" stroke={accentTo} strokeWidth="0.5" />
            <line x1="171" y1="75" x2="177" y2="75" stroke={accentTo} strokeWidth="0.5" />
            <line x1="171" y1="78" x2="177" y2="78" stroke={accentTo} strokeWidth="0.5" />
          </svg>
          {/* Orbiting verification dot */}
          <div
            ref={orbitRef}
            className="absolute inset-4"
            style={{ willChange: isLowEnd ? "auto" : "transform" }}
          >
            <div
              className="absolute left-1/2 top-0 flex h-3 w-3 -translate-x-1/2 items-center justify-center rounded-full"
              style={{
                backgroundColor: accentTo,
                boxShadow: `0 0 10px ${accentTo}`,
              }}
            >
              <span style={{ color: "white", fontSize: "6px" }}>✓</span>
            </div>
          </div>
        </>
      );

    case "pulse":
      // Parent Experience - radiating connection pulse
      return (
        <>
          {commonGlow}
          {/* Base with warm pink gradient */}
          <div
            className="absolute inset-6 rounded-full border border-white/5 backdrop-blur-sm"
            style={{
              background: `radial-gradient(circle at 50% 45%, rgba(236,72,153,0.08), rgba(0,0,0,0.4))`,
            }}
          />
          {/* Heartbeat ring */}
          <div
            ref={ringRef}
            className="absolute inset-0 rounded-full"
            style={{
              border: `1px solid ${accentFrom}25`,
              willChange: isLowEnd ? "auto" : "transform",
            }}
          />
          {/* Connection pulse visualization */}
          <svg className="absolute inset-4" viewBox="0 0 200 200" fill="none">
            <title>Connection Pulse</title>
            {/* Central heart shape */}
            <path
              d="M100 130 C70 100, 55 75, 75 55 C95 35, 100 55, 100 65 C100 55, 105 35, 125 55 C145 75, 130 100, 100 130Z"
              fill={`${accentFrom}25`}
              stroke={accentFrom}
              strokeWidth="1.5"
            />
            {/* Radiating pulse rings */}
            <circle
              cx="100"
              cy="90"
              r="35"
              fill="none"
              stroke={accentFrom}
              strokeWidth="1"
              opacity="0.5"
            >
              <animate attributeName="r" from="35" to="60" dur="2s" repeatCount="indefinite" />
              <animate
                attributeName="opacity"
                from="0.5"
                to="0"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
            <circle
              cx="100"
              cy="90"
              r="35"
              fill="none"
              stroke={accentTo}
              strokeWidth="1"
              opacity="0.5"
            >
              <animate
                attributeName="r"
                from="35"
                to="60"
                dur="2s"
                begin="0.5s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                from="0.5"
                to="0"
                dur="2s"
                begin="0.5s"
                repeatCount="indefinite"
              />
            </circle>
            <circle
              cx="100"
              cy="90"
              r="35"
              fill="none"
              stroke={accentFrom}
              strokeWidth="1"
              opacity="0.5"
            >
              <animate
                attributeName="r"
                from="35"
                to="60"
                dur="2s"
                begin="1s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                from="0.5"
                to="0"
                dur="2s"
                begin="1s"
                repeatCount="indefinite"
              />
            </circle>
            {/* Parent & child figures */}
            <circle cx="55" cy="150" r="6" fill={accentTo} opacity="0.6" />
            <circle cx="55" cy="165" r="3" fill={accentTo} opacity="0.4" />
            <circle cx="145" cy="150" r="6" fill={accentTo} opacity="0.6" />
            <circle cx="145" cy="165" r="3" fill={accentTo} opacity="0.4" />
            {/* Connection lines to heart */}
            <path
              d="M55 150 Q 77 140, 90 125"
              stroke={`${accentFrom}50`}
              strokeWidth="1"
              strokeDasharray="3 2"
            />
            <path
              d="M145 150 Q 123 140, 110 125"
              stroke={`${accentTo}50`}
              strokeWidth="1"
              strokeDasharray="3 2"
            />
            {/* Phone/notification icons */}
            <rect
              x="45"
              y="130"
              width="8"
              height="14"
              rx="1"
              fill={`${accentFrom}30`}
              stroke={accentFrom}
              strokeWidth="0.5"
            />
            <rect
              x="147"
              y="130"
              width="8"
              height="14"
              rx="1"
              fill={`${accentTo}30`}
              stroke={accentTo}
              strokeWidth="0.5"
            />
          </svg>
          {/* Orbiting message dot */}
          <div
            ref={orbitRef}
            className="absolute inset-8"
            style={{ willChange: isLowEnd ? "auto" : "transform" }}
          >
            <div
              className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full"
              style={{
                backgroundColor: accentFrom,
                boxShadow: `0 0 12px ${accentFrom}`,
              }}
            />
          </div>
        </>
      );

    case "gear":
      // People & Admin - interlocking gears system
      return (
        <>
          {commonGlow}
          {/* Base with purple gradient */}
          <div
            className="absolute inset-6 rounded-full border border-white/5 backdrop-blur-sm"
            style={{
              background: `radial-gradient(circle at 45% 45%, rgba(168,85,247,0.08), rgba(0,0,0,0.4))`,
            }}
          />
          {/* Outer ring */}
          <div
            ref={ringRef}
            className="absolute inset-0 rounded-full"
            style={{
              border: `1px solid ${accentFrom}20`,
              willChange: isLowEnd ? "auto" : "transform",
            }}
          />
          {/* Interlocking gears */}
          <svg className="absolute inset-4" viewBox="0 0 200 200" fill="none">
            <title>System Gears</title>
            {/* Main large gear */}
            <g transform="translate(100, 95)">
              <circle r="30" fill={`${accentFrom}15`} stroke={accentFrom} strokeWidth="1.5" />
              <circle r="10" fill={`${accentFrom}30`} />
              {/* Gear teeth */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <rect
                  key={angle}
                  x="-4"
                  y="-38"
                  width="8"
                  height="12"
                  rx="1"
                  fill={accentFrom}
                  opacity="0.6"
                  transform={`rotate(${angle})`}
                />
              ))}
            </g>
            {/* Secondary gear - top right */}
            <g transform="translate(145, 60)">
              <circle r="18" fill={`${accentTo}15`} stroke={accentTo} strokeWidth="1" />
              <circle r="6" fill={`${accentTo}30`} />
              {[0, 60, 120, 180, 240, 300].map((angle) => (
                <rect
                  key={angle}
                  x="-3"
                  y="-24"
                  width="6"
                  height="8"
                  rx="1"
                  fill={accentTo}
                  opacity="0.5"
                  transform={`rotate(${angle})`}
                />
              ))}
            </g>
            {/* Tertiary gear - bottom left */}
            <g transform="translate(55, 140)">
              <circle r="15" fill={`${accentFrom}12`} stroke={accentFrom} strokeWidth="1" />
              <circle r="5" fill={`${accentFrom}25`} />
              {[0, 72, 144, 216, 288].map((angle) => (
                <rect
                  key={angle}
                  x="-2.5"
                  y="-20"
                  width="5"
                  height="7"
                  rx="1"
                  fill={accentFrom}
                  opacity="0.4"
                  transform={`rotate(${angle})`}
                />
              ))}
            </g>
            {/* People icons */}
            <circle cx="100" cy="95" r="5" fill="white" opacity="0.5" />
            <circle cx="145" cy="60" r="3" fill="white" opacity="0.4" />
            <circle cx="55" cy="140" r="3" fill="white" opacity="0.4" />
            {/* Connection indicator */}
            <path
              d="M125 80 L135 70"
              stroke={`${accentTo}60`}
              strokeWidth="1"
              strokeDasharray="2 1"
            />
            <path
              d="M75 110 L65 125"
              stroke={`${accentFrom}60`}
              strokeWidth="1"
              strokeDasharray="2 1"
            />
          </svg>
          {/* Orbiting cog */}
          <div
            ref={orbitRef}
            className="absolute inset-6"
            style={{ willChange: isLowEnd ? "auto" : "transform" }}
          >
            <div
              className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2"
              style={{
                backgroundColor: accentTo,
                boxShadow: `0 0 10px ${accentTo}`,
                borderRadius: "2px",
              }}
            />
          </div>
        </>
      );

    case "star":
      // Experience & Brand - starburst brilliance
      return (
        <>
          {commonGlow}
          {/* Base with cyan-green gradient */}
          <div
            className="absolute inset-6 rounded-full border border-white/5 backdrop-blur-sm"
            style={{
              background: `radial-gradient(circle at 50% 50%, rgba(56,189,248,0.08), rgba(0,0,0,0.4))`,
            }}
          />
          {/* Sparkle ring */}
          <div
            ref={ringRef}
            className="absolute inset-0 rounded-full border border-white/[0.06]"
            style={{ willChange: isLowEnd ? "auto" : "transform" }}
          />
          {/* Starburst pattern */}
          <svg className="absolute inset-4" viewBox="0 0 200 200" fill="none">
            <title>Brand Star</title>
            {/* Central star */}
            <polygon
              points="100,30 110,75 155,75 120,105 135,150 100,125 65,150 80,105 45,75 90,75"
              fill={`${accentFrom}20`}
              stroke={accentFrom}
              strokeWidth="1.5"
            />
            {/* Radiating beams */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
              <line
                key={angle}
                x1="100"
                y1="100"
                x2={100 + Math.cos((angle * Math.PI) / 180) * 85}
                y2={100 + Math.sin((angle * Math.PI) / 180) * 85}
                stroke={angle % 60 === 0 ? accentFrom : accentTo}
                strokeWidth={angle % 60 === 0 ? "1.5" : "0.75"}
                opacity={angle % 60 === 0 ? "0.4" : "0.2"}
              />
            ))}
            {/* Sparkle dots */}
            <circle cx="100" cy="30" r="3" fill={accentFrom}>
              <animate
                attributeName="opacity"
                values="1;0.3;1"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="155" cy="75" r="2.5" fill={accentTo}>
              <animate
                attributeName="opacity"
                values="0.3;1;0.3"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="135" cy="150" r="2.5" fill={accentFrom}>
              <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="65" cy="150" r="2.5" fill={accentTo}>
              <animate
                attributeName="opacity"
                values="0.3;1;0.3"
                dur="1.8s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="45" cy="75" r="2.5" fill={accentFrom}>
              <animate
                attributeName="opacity"
                values="1;0.3;1"
                dur="1.3s"
                repeatCount="indefinite"
              />
            </circle>
            {/* Inner glow */}
            <circle cx="100" cy="100" r="20" fill={`${accentFrom}10`} />
            {/* Mobile/app icon in center */}
            <rect
              x="92"
              y="88"
              width="16"
              height="24"
              rx="2"
              fill={`${accentTo}40`}
              stroke={accentTo}
              strokeWidth="1"
            />
            <circle cx="100" cy="107" r="2" fill={accentTo} />
          </svg>
          {/* Orbiting sparkle */}
          <div
            ref={orbitRef}
            className="absolute inset-2"
            style={{ willChange: isLowEnd ? "auto" : "transform" }}
          >
            <div
              className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2"
              style={{
                backgroundColor: accentTo,
                boxShadow: `0 0 12px ${accentTo}, 0 0 24px ${accentTo}`,
                clipPath:
                  "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
              }}
            />
          </div>
        </>
      );

    default:
      return null;
  }
}

// Progress indicator dot with timer ring
function ProgressDot({
  isActive,
  category,
  onClick,
  progress,
}: {
  isActive: boolean;
  category: (typeof categories)[number];
  onClick: () => void;
  progress: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Go to ${category.title}`}
      aria-current={isActive ? "true" : undefined}
      className={cn(
        "group relative h-4 w-4 rounded-full transition-all duration-500",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950",
        isActive ? "scale-110" : "hover:scale-110"
      )}
    >
      {/* Progress ring */}
      {isActive && (
        <svg className="absolute -inset-1 h-6 w-6 -rotate-90" viewBox="0 0 24 24">
          <title>Progress</title>
          <circle
            cx="12"
            cy="12"
            r="10"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="2"
          />
          <circle
            cx="12"
            cy="12"
            r="10"
            fill="none"
            stroke={category.accent.from}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={`${progress * 62.83} 62.83`}
            className="transition-all duration-100"
          />
        </svg>
      )}
      <span
        className="absolute inset-0.5 rounded-full transition-all duration-300"
        style={{
          background: isActive
            ? `linear-gradient(135deg, ${category.accent.from}, ${category.accent.to})`
            : "rgba(255,255,255,0.15)",
          boxShadow: isActive ? `0 0 12px ${category.accent.from}50` : "none",
        }}
      />
      <span className="sr-only">{category.title}</span>
    </button>
  );
}

export function WhatIfWall() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const categoryNameRef = useRef<HTMLSpanElement | null>(null);
  const categoryTitleRef = useRef<HTMLHeadingElement | null>(null);
  const categoryBlurbRef = useRef<HTMLParagraphElement | null>(null);
  const listItemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const suffixRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const illustrationRef = useRef<HTMLDivElement | null>(null);
  const illustrationLabelRef = useRef<HTMLSpanElement | null>(null);
  const pulseRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const orbitRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const elapsedRef = useRef(0);
  const isInViewRef = useRef(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [isLowEnd, setIsLowEnd] = useState(false);

  const reduced = useMemo(() => prefersReducedMotion(), []);
  const currentCategory = categories[activeIndex];

  // Check for low-end device on mount
  useEffect(() => {
    setIsLowEnd(isLowEndDevice());
  }, []);

  // Memoized particle generation - skip on low-end or reduced motion
  const particles = useMemo(() => {
    if (reduced || isLowEnd) return null;
    return PARTICLE_CONFIGS.map((config) => (
      <Particle key={config.id} config={config} accentFrom={currentCategory.accent.from} />
    ));
  }, [currentCategory.accent.from, reduced, isLowEnd]);

  const applyCategory = useCallback((category: (typeof categories)[number], index: number) => {
    if (categoryNameRef.current) {
      categoryNameRef.current.textContent = category.title;
    }
    if (categoryTitleRef.current) {
      categoryTitleRef.current.textContent = category.title;
    }
    if (categoryBlurbRef.current) {
      categoryBlurbRef.current.textContent = category.blurb;
    }
    suffixRefs.current.forEach((el, idx) => {
      if (el) el.textContent = ` ${category.lines[idx]}`;
    });
    if (illustrationLabelRef.current) {
      illustrationLabelRef.current.textContent = category.title;
    }
    setActiveIndex(index);
  }, []);

  const animateTransition = useCallback(
    (index: number, skipAnimation = false) => {
      // Update CSS variables for color transition
      if (sectionRef.current) {
        gsap.to(sectionRef.current, {
          "--accent-from": categories[index].accent.from,
          "--accent-to": categories[index].accent.to,
          duration: skipAnimation ? 0 : 0.8,
          ease: "power2.out",
        });
      }

      if (reduced || skipAnimation) {
        applyCategory(categories[index], index);
        return;
      }

      // Cancel any running timeline
      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      const listItems = listItemRefs.current.filter(Boolean) as HTMLLIElement[];
      const contentBlocks = [
        categoryTitleRef.current,
        categoryBlurbRef.current,
        ...listItems,
      ].filter(Boolean);

      const tl = gsap.timeline();
      timelineRef.current = tl;

      // Fade out with elegant easing
      tl.to(contentBlocks, {
        opacity: 0,
        y: -12,
        filter: isLowEnd ? "none" : "blur(4px)",
        duration: TRANSITION_DURATION * 0.4,
        ease: "power3.in",
        stagger: 0.02,
      })
        .add(() => {
          applyCategory(categories[index], index);

          // Pulse the illustration
          if (pulseRef.current && !isLowEnd) {
            gsap.fromTo(
              pulseRef.current,
              { scale: 0.9, opacity: 0.15 },
              { scale: 1.1, opacity: 0.5, duration: 0.8, ease: "power2.out" }
            );
          }

          if (illustrationRef.current && !isLowEnd) {
            gsap.fromTo(
              illustrationRef.current,
              { rotate: -1.5, scale: 0.98 },
              { rotate: 0, scale: 1, duration: 0.8, ease: "power2.out" }
            );
          }
        })
        // Fade in with staggered reveal
        .fromTo(
          contentBlocks,
          {
            opacity: 0,
            y: 16,
            filter: isLowEnd ? "none" : "blur(4px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: TRANSITION_DURATION * 0.6,
            ease: "power3.out",
            stagger: 0.04,
          }
        );
    },
    [applyCategory, reduced, isLowEnd]
  );

  const goToCategory = useCallback(
    (index: number) => {
      elapsedRef.current = 0;
      setProgress(0);
      animateTransition(index);
    },
    [animateTransition]
  );

  const handleProgressClick = useCallback(
    (index: number) => {
      setIsPaused(true);
      goToCategory(index);
    },
    [goToCategory]
  );

  // Global keyboard navigation - works when section is focused or in view
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Only respond if section is in view
      if (!isInViewRef.current) return;

      // Don't interfere with input fields
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement).isContentEditable
      ) {
        return;
      }

      let newIndex = activeIndex;
      let handled = false;

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        newIndex = (activeIndex + 1) % categories.length;
        handled = true;
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        newIndex = (activeIndex - 1 + categories.length) % categories.length;
        handled = true;
      } else if (e.key === " " && e.target === document.body) {
        setIsPaused((p) => !p);
        handled = true;
      }

      if (handled) {
        e.preventDefault();
        if (newIndex !== activeIndex) {
          setIsPaused(true);
          goToCategory(newIndex);
        }
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [activeIndex, goToCategory]);

  // Card hover effect - disabled on low-end
  const handleCardMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (reduced || isLowEnd || !cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      gsap.to(cardRef.current, {
        rotateY: x * 1.5,
        rotateX: -y * 1.5,
        duration: 0.5,
        ease: "power2.out",
      });
    },
    [reduced, isLowEnd]
  );

  const handleCardMouseLeave = useCallback(() => {
    if (reduced || isLowEnd || !cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.8,
      ease: "power2.out",
    });
  }, [reduced, isLowEnd]);

  // Main animation setup
  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header entrance
      if (headingRef.current && !reduced) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            ease: "power3.out",
            duration: 1.2,
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // Card entrance
      if (cardRef.current && !reduced) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 60, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "power3.out",
            duration: 1.2,
            delay: 0.15,
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // Illustration animations - skip on low-end
      let ringTween: gsap.core.Tween | null = null;
      let orbitTween: gsap.core.Tween | null = null;

      if (!isLowEnd && !reduced) {
        if (ringRef.current) {
          ringTween = gsap.to(ringRef.current, {
            rotate: 360,
            duration: 30,
            ease: "none",
            repeat: -1,
            paused: true,
          });
        }
        if (orbitRef.current) {
          orbitTween = gsap.to(orbitRef.current, {
            rotate: -360,
            duration: 20,
            ease: "none",
            repeat: -1,
            paused: true,
          });
        }
      }

      // Track when section is in view
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
          isInViewRef.current = true;
          setIsInView(true);
          ringTween?.resume();
          orbitTween?.resume();
        },
        onLeave: () => {
          isInViewRef.current = false;
          setIsInView(false);
          ringTween?.pause();
          orbitTween?.pause();
        },
        onEnterBack: () => {
          isInViewRef.current = true;
          setIsInView(true);
          ringTween?.resume();
          orbitTween?.resume();
        },
        onLeaveBack: () => {
          isInViewRef.current = false;
          setIsInView(false);
          ringTween?.pause();
          orbitTween?.pause();
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [reduced, isLowEnd]);

  // Auto-cycle with progress tracking
  useEffect(() => {
    if (reduced) return;

    const step = (time: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
      }
      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;

      if (!isPaused && isInViewRef.current) {
        elapsedRef.current += delta;
        const nextProgress = Math.min(elapsedRef.current / CYCLE_DURATION, 1);
        setProgress(nextProgress);

        if (elapsedRef.current >= CYCLE_DURATION) {
          elapsedRef.current = 0;
          setProgress(0);
          const nextIndex = (activeIndex + 1) % categories.length;
          animateTransition(nextIndex);
        }
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      lastTimeRef.current = null;
    };
  }, [activeIndex, isPaused, reduced, animateTransition]);

  // Reset progress when paused
  useEffect(() => {
    if (isPaused) {
      setProgress(0);
    }
  }, [isPaused]);

  return (
    <section
      ref={sectionRef}
      data-section="what-if-wall"
      className={cn(
        "relative overflow-hidden bg-neutral-950 px-4 py-24 md:px-8 md:py-32",
        !isInView && "whatif-paused"
      )}
      style={
        {
          "--accent-from": categories[0].accent.from,
          "--accent-to": categories[0].accent.to,
          contentVisibility: "auto",
          containIntrinsicSize: "0 800px",
        } as CSSProperties
      }
    >
      {/* Noise texture overlay - static, no animation cost */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating particles container */}
      {particles && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">{particles}</div>
      )}

      {/* Background glows - GPU accelerated with will-change */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="whatif-glow absolute -left-32 -top-32 h-96 w-96 rounded-full opacity-40 blur-[180px]"
          style={{
            background: `radial-gradient(circle at 30% 30%, var(--accent-from), transparent 70%)`,
          }}
        />
        <div
          className="whatif-glow absolute -right-20 top-1/4 h-80 w-80 rounded-full opacity-30 blur-[200px]"
          style={{
            background: `radial-gradient(circle at 60% 20%, var(--accent-to), transparent 70%)`,
          }}
        />
        <div
          className="whatif-glow absolute -bottom-20 left-1/3 h-96 w-96 rounded-full opacity-25 blur-[220px]"
          style={{
            background: `radial-gradient(circle at 50% 50%, var(--accent-from), transparent 72%)`,
          }}
        />
        {/* Central subtle gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03),transparent_70%)]" />
      </div>

      {/* Grid pattern - static */}
      {!isLowEnd && (
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      )}

      <div className="relative mx-auto flex max-w-6xl flex-col gap-12">
        {/* Header - refined copy */}
        <div ref={headingRef} className="text-center">
          <p
            className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.4em] transition-colors duration-700"
            style={{
              borderColor: `color-mix(in srgb, var(--accent-from) 25%, transparent)`,
              color: `var(--accent-from)`,
              background: `linear-gradient(135deg, color-mix(in srgb, var(--accent-from) 6%, transparent), transparent)`,
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--accent-from)" }}
            />
            The Transformation
          </p>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
            What if your school
            <br className="hidden sm:block" />
            <span className="relative inline-block">
              <span
                className="bg-linear-to-r bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, var(--accent-from), var(--accent-to))`,
                }}
              >
                already had this?
              </span>
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-neutral-400 md:text-lg">
            Every scenario below is already live in schools like yours.
            <span className="hidden md:inline">
              {" "}
              The only question is how long you'll wait to join them.
            </span>
          </p>
        </div>

        {/* Progress indicator with timer */}
        <div
          className="flex items-center justify-center gap-2"
          role="tablist"
          aria-label="Category navigation"
        >
          {categories.map((cat, idx) => (
            <ProgressDot
              key={cat.title}
              isActive={idx === activeIndex}
              category={cat}
              onClick={() => handleProgressClick(idx)}
              progress={idx === activeIndex ? progress : 0}
            />
          ))}
          <button
            type="button"
            onClick={() => setIsPaused((p) => !p)}
            className={cn(
              "ml-2 flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
              isPaused
                ? "border-white/20 bg-white/10 text-white/80"
                : "border-white/10 bg-white/5 text-white/50 hover:border-white/20 hover:text-white/70"
            )}
            aria-label={isPaused ? "Resume auto-play" : "Pause auto-play"}
          >
            {isPaused ? (
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <title>Play</title>
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <title>Pause</title>
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            )}
          </button>
        </div>

        {/* Main content card */}
        <article
          ref={cardRef}
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
          className={cn(
            "relative rounded-[2rem] border border-white/[0.08] backdrop-blur-xl",
            "bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent",
            "shadow-[0_8px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]",
            "px-6 py-10 md:px-12 md:py-12"
          )}
          style={{
            transformStyle: "preserve-3d",
            willChange: isLowEnd ? "auto" : "transform",
          }}
        >
          {/* Inner glow border */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-25 transition-opacity duration-700"
            style={{
              background: `linear-gradient(135deg, var(--accent-from) 0%, transparent 50%, var(--accent-to) 100%)`,
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "xor",
              padding: "1px",
            }}
          />

          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            {/* Left content */}
            <div className="space-y-8">
              {/* Category badge */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[0.7rem] font-medium uppercase tracking-[0.35em] text-white/60">
                  Category
                </span>
                <span
                  ref={categoryNameRef}
                  className="whatif-content rounded-full border px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.35em] transition-colors duration-500"
                  style={{
                    borderColor: `color-mix(in srgb, var(--accent-from) 40%, transparent)`,
                    color: "var(--accent-from)",
                    background: `linear-gradient(135deg, color-mix(in srgb, var(--accent-from) 10%, transparent), transparent)`,
                  }}
                >
                  {categories[0].title}
                </span>
              </div>

              {/* Title and blurb */}
              <div>
                <h3
                  ref={categoryTitleRef}
                  className="whatif-content text-2xl font-semibold tracking-tight text-white md:text-3xl lg:text-[2rem]"
                >
                  {categories[0].title}
                </h3>
                <p
                  ref={categoryBlurbRef}
                  className="whatif-content mt-3 max-w-xl text-sm leading-relaxed text-neutral-400 md:text-base"
                >
                  {categories[0].blurb}
                </p>
              </div>

              {/* What if list */}
              <ul className="space-y-3">
                {categories[0].lines.map((line, idx) => (
                  <li
                    key={line}
                    ref={(el) => {
                      listItemRefs.current[idx] = el;
                    }}
                    onMouseEnter={() => setHoveredItem(idx)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={cn(
                      "whatif-content group relative -mx-4 flex items-start gap-4 rounded-xl px-4 py-3 transition-colors duration-300",
                      "hover:bg-white/[0.03]"
                    )}
                  >
                    {/* Animated bullet */}
                    <span className="relative mt-2.5 flex h-2.5 w-2.5 shrink-0 items-center justify-center md:mt-3">
                      <span
                        className={cn(
                          "absolute h-full w-full rounded-full transition-all duration-300",
                          hoveredItem === idx ? "scale-[2] opacity-20" : "scale-100 opacity-0"
                        )}
                        style={{ backgroundColor: "var(--accent-from)" }}
                      />
                      <span
                        className="h-2 w-2 rounded-full transition-transform duration-300 group-hover:scale-125"
                        style={{ backgroundColor: "var(--accent-from)" }}
                      />
                    </span>
                    <span className="text-base leading-relaxed text-neutral-200 md:text-lg">
                      <span
                        className="font-medium transition-colors duration-300"
                        style={{ color: "var(--accent-from)" }}
                      >
                        What if
                      </span>
                      <span
                        ref={(el) => {
                          suffixRefs.current[idx] = el;
                        }}
                        className="text-neutral-300 transition-colors duration-300 group-hover:text-white"
                      >
                        {` ${line}`}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>

              {/* Reduced motion fallback */}
              {reduced && (
                <div className="flex flex-wrap gap-2 pt-2 text-[0.6rem] uppercase tracking-[0.3em] text-white/40">
                  {categories.slice(1).map((category) => (
                    <button
                      type="button"
                      key={category.title}
                      onClick={() => goToCategory(categories.indexOf(category))}
                      className="rounded-full border border-white/10 px-3 py-1.5 transition-all hover:border-white/20 hover:text-white/60"
                    >
                      {category.title}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right illustration - category-specific */}
            <div className="relative flex items-center justify-center">
              <div
                ref={illustrationRef}
                className="relative h-64 w-64 md:h-72 md:w-72 lg:h-80 lg:w-80"
                style={{ willChange: isLowEnd ? "auto" : "transform" }}
              >
                <CategoryIllustration
                  variant={currentCategory.illustration}
                  accentFrom={currentCategory.accent.from}
                  accentTo={currentCategory.accent.to}
                  isLowEnd={isLowEnd}
                  ringRef={ringRef}
                  orbitRef={orbitRef}
                  pulseRef={pulseRef}
                />

                {/* Category label */}
                <div
                  className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/60 px-4 py-1.5 text-[0.55rem] uppercase tracking-[0.4em] text-white/70 backdrop-blur-sm"
                  style={{
                    boxShadow: `0 0 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)`,
                  }}
                >
                  <span ref={illustrationLabelRef}>{categories[0].title}</span>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Bottom hint */}
        <p className="text-center text-xs text-neutral-500">
          Press{" "}
          <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[0.65rem]">
            ←
          </kbd>{" "}
          <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[0.65rem]">
            →
          </kbd>{" "}
          to navigate
          <span className="hidden sm:inline">
            {" "}
            or{" "}
            <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[0.65rem]">
              space
            </kbd>{" "}
            to {isPaused ? "resume" : "pause"}
          </span>
        </p>
      </div>

      {/* CSS for particles and GPU optimization */}
      <style jsx>{`
        .whatif-particle {
          width: var(--size);
          height: var(--size);
          left: var(--left);
          background: var(--accent);
          animation: float-up var(--duration) ease-in-out var(--delay) infinite;
          box-shadow: 0 0 6px var(--accent);
          will-change: transform, opacity;
          contain: strict;
        }

        .whatif-glow {
          will-change: background;
          transition: background 0.8s ease-out;
        }

        .whatif-content {
          will-change: transform, opacity, filter;
          backface-visibility: hidden;
        }

        .whatif-paused .whatif-particle {
          animation-play-state: paused;
        }

        @keyframes float-up {
          0% {
            transform: translateY(0) scale(0);
            opacity: 0;
          }
          8% {
            opacity: 0.5;
            transform: translateY(-8vh) scale(1);
          }
          92% {
            opacity: 0.2;
          }
          100% {
            transform: translateY(-100vh) scale(0.4);
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .whatif-particle {
            animation: none;
            opacity: 0.3;
          }
          .whatif-glow {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
