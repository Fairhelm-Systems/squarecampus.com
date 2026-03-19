"use client";

import { animate, stagger } from "animejs";
import {
  BellRing,
  BookOpenCheck,
  ChartNoAxesCombined,
  FileSpreadsheet,
  Fingerprint,
  MessageSquareShare,
  Radar,
  ShieldCheck,
  WalletCards,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

const sourceCards = [
  {
    title: "Role graph",
    detail: "Trustees, principals, finance, teachers, parents",
    icon: Fingerprint,
    position: "left-[4%] top-[5%] md:left-[4%] md:top-[7%]",
    line: "M250 240 C210 180 150 118 84 86",
  },
  {
    title: "Admissions",
    detail: "Applications, documents, offers, enrollment",
    icon: BookOpenCheck,
    position: "right-[4%] top-[8%] md:right-[5%] md:top-[10%]",
    line: "M250 240 C300 176 372 120 438 92",
  },
  {
    title: "Attendance",
    detail: "Classroom signal, staff follow-through, exceptions",
    icon: BellRing,
    position: "left-[4%] top-[49%] md:left-[6%] md:top-[46%]",
    line: "M250 240 C184 238 124 246 66 280",
  },
  {
    title: "Finance ledger",
    detail: "Dues, receipts, concessions, approval history",
    icon: WalletCards,
    position: "right-[4%] top-[49%] md:right-[6%] md:top-[46%]",
    line: "M250 240 C316 238 382 246 454 282",
  },
  {
    title: "Communication",
    detail: "App, WhatsApp, circulars, acknowledgements",
    icon: MessageSquareShare,
    position: "left-[8%] bottom-[2%] md:left-[9%] md:bottom-[4%]",
    line: "M250 240 C202 308 154 350 112 392",
  },
  {
    title: "Leadership view",
    detail: "Campus health, branch risk, cross-team visibility",
    icon: ChartNoAxesCombined,
    position: "right-[8%] bottom-[2%] md:right-[9%] md:bottom-[4%]",
    line: "M250 240 C300 308 348 350 408 392",
  },
] as const;

const signalBars = [
  { label: "Admissions context", width: "84%" },
  { label: "Fee and receipt state", width: "92%" },
  { label: "Parent communication trail", width: "78%" },
  { label: "Role-aware answer safety", width: "95%" },
] as const;

export function NexusIntegrationsVisual({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const shell = node.querySelector<HTMLElement>("[data-nexus-shell]");
    const center = node.querySelector<HTMLElement>("[data-nexus-center]");
    const cards = Array.from(node.querySelectorAll<HTMLElement>("[data-nexus-card]"));
    const dots = Array.from(node.querySelectorAll<HTMLElement>("[data-nexus-dot]"));
    const lines = Array.from(node.querySelectorAll<SVGPathElement>("[data-nexus-line]"));
    const bars = Array.from(node.querySelectorAll<HTMLElement>("[data-nexus-bar-fill]"));
    const pills = Array.from(node.querySelectorAll<HTMLElement>("[data-nexus-pill]"));
    const summaries = Array.from(node.querySelectorAll<HTMLElement>("[data-nexus-summary]"));
    const animations: Array<{ pause?: () => void }> = [];

    if (!shell || !center) {
      return;
    }

    if (prefersReducedMotion) {
      node.style.opacity = "1";
      node.style.transform = "none";

      for (const element of [shell, center, ...cards, ...dots, ...bars, ...pills, ...summaries]) {
        element.style.opacity = "1";
        element.style.transform = "none";
      }

      for (const path of lines) {
        path.style.opacity = "0.5";
      }

      for (const bar of bars) {
        bar.style.transform = "scaleX(1)";
      }

      return;
    }

    node.style.opacity = "0";
    node.style.transform = "translateY(24px)";
    shell.style.opacity = "0";
    shell.style.transform = "scale(0.97)";
    center.style.opacity = "0";
    center.style.transform = "translate(-50%, -50%) scale(0.92)";

    for (const card of cards) {
      card.style.opacity = "0";
      card.style.transform = "translateY(18px)";
    }

    for (const dot of dots) {
      dot.style.opacity = "0";
      dot.style.transform = "scale(0.65)";
    }

    for (const pill of pills) {
      pill.style.opacity = "0";
      pill.style.transform = "translateY(10px)";
    }

    for (const summary of summaries) {
      summary.style.opacity = "0";
      summary.style.transform = "translateY(14px)";
    }

    const lineLengths = new Map<SVGPathElement, number>();
    for (const path of lines) {
      const length = path.getTotalLength();
      lineLengths.set(path, length);
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
      path.style.opacity = "0.1";
    }

    for (const bar of bars) {
      bar.style.transformOrigin = "left center";
      bar.style.transform = "scaleX(0)";
      bar.style.opacity = "0.65";
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          observer.disconnect();

          animations.push(
            animate(node, {
              opacity: [0, 1],
              y: [24, 0],
              duration: 840,
              ease: "out(3)",
            }),
          );

          animations.push(
            animate(shell, {
              opacity: [0, 1],
              scale: [0.97, 1],
              duration: 920,
              ease: "out(4)",
            }),
          );

          animations.push(
            animate(center, {
              opacity: [0, 1],
              scale: [0.92, 1],
              duration: 900,
              delay: 120,
              ease: "out(4)",
            }),
          );

          for (const [index, path] of lines.entries()) {
            const length = lineLengths.get(path) ?? 0;
            animations.push(
              animate(path, {
                strokeDashoffset: [length, 0],
                opacity: [0.1, 0.56],
                delay: 120 + index * 90,
                duration: 860,
                ease: "out(3)",
              }),
            );
          }

          if (cards.length) {
            animations.push(
              animate(cards, {
                opacity: [0, 1],
                y: [18, 0],
                delay: stagger(85, { start: 220 }),
                duration: 760,
                ease: "out(3)",
              }),
            );
          }

          if (dots.length) {
            animations.push(
              animate(dots, {
                opacity: [0, 1],
                scale: [0.65, 1],
                delay: stagger(90, { start: 360 }),
                duration: 620,
                ease: "out(4)",
              }),
            );

            animations.push(
              animate(dots, {
                scale: [1, 1.32],
                opacity: [0.8, 1],
                delay: stagger(240, { start: 1100 }),
                duration: 1500,
                loop: true,
                alternate: true,
                ease: "inOutSine",
              }),
            );
          }

          if (bars.length) {
            animations.push(
              animate(bars, {
                scaleX: [0, 1],
                opacity: [0.65, 1],
                delay: stagger(80, { start: 480 }),
                duration: 720,
                ease: "out(3)",
              }),
            );
          }

          if (pills.length) {
            animations.push(
              animate(pills, {
                opacity: [0, 1],
                y: [10, 0],
                delay: stagger(70, { start: 620 }),
                duration: 620,
                ease: "out(3)",
              }),
            );
          }

          if (summaries.length) {
            animations.push(
              animate(summaries, {
                opacity: [0, 1],
                y: [14, 0],
                delay: stagger(85, { start: 720 }),
                duration: 700,
                ease: "out(3)",
              }),
            );
          }
        }
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.18,
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      for (const animation of animations) {
        animation.pause?.();
      }
    };
  }, [prefersReducedMotion]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <div
        data-nexus-shell
        className="surface-panel-strong relative overflow-hidden rounded-[2rem] p-5 md:p-6"
      >
        <div className="pointer-events-none absolute inset-x-[14%] top-8 h-28 rounded-full bg-[radial-gradient(circle,rgba(88,124,204,0.22),transparent_70%)] blur-3xl dark:bg-[radial-gradient(circle,rgba(88,124,204,0.16),transparent_72%)]" />

        <div className="space-y-4">
          <div className="relative min-h-[34rem] md:min-h-[37rem]">
            <svg
              viewBox="0 0 500 480"
              className="pointer-events-none absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              {sourceCards.map((item) => (
                <path
                  key={item.title}
                  d={item.line}
                  data-nexus-line
                  fill="none"
                  stroke="var(--brand)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              ))}
            </svg>

            <div className="pointer-events-none absolute inset-x-[20%] top-[15%] h-[18rem] rounded-full bg-[radial-gradient(circle,rgba(88,124,204,0.1),transparent_72%)] blur-3xl dark:bg-[radial-gradient(circle,rgba(88,124,204,0.12),transparent_74%)]" />

            {sourceCards.map((item) => (
              <div
                key={item.title}
                data-nexus-card
                className={cn(
                  "absolute z-10 w-[42%] rounded-[1.3rem] border border-[color:var(--line)] bg-[color:var(--surface)] p-4 shadow-[0_18px_40px_rgba(8,15,30,0.08)] backdrop-blur-md md:w-[11rem]",
                  item.position,
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <item.icon className="size-4 text-[color:var(--brand)]" />
                  <span
                    data-nexus-dot
                    className="mt-0.5 size-2 rounded-full bg-[color:var(--brand)]"
                  />
                </div>
                <p className="mt-4 font-display text-[1rem] tracking-[-0.03em] text-[color:var(--foreground)]">
                  {item.title}
                </p>
                <p className="mt-2 text-[0.72rem] leading-5 text-[color:var(--muted-foreground)]">
                  {item.detail}
                </p>
              </div>
            ))}

            <div
              data-nexus-center
              className="absolute left-1/2 top-[37%] z-20 w-[76%] max-w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-[1.7rem] border border-[color:var(--line-strong)] bg-[color:var(--surface-strong)] p-5 shadow-[0_26px_70px_rgba(8,15,30,0.14)] backdrop-blur-xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[0.56rem] uppercase tracking-[0.22em] text-[color:var(--muted-foreground)]">
                    Nexus intelligence layer
                  </p>
                  <h3 className="mt-3 font-display text-2xl tracking-[-0.05em] text-[color:var(--foreground)]">
                    Connected SquareCampus context
                  </h3>
                </div>
                <div className="rounded-full bg-[linear-gradient(135deg,var(--brand-soft),transparent_70%)] p-2.5">
                  <Radar className="size-4 text-(--brand)" />
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Nexus reads the same role graph, timeline, fee state, communication trail, and campus
                visibility that already live inside the School OS.
              </p>

              <div className="mt-5 space-y-3">
                {signalBars.map((bar) => (
                  <div key={bar.label}>
                    <div className="mb-2 flex items-center justify-between text-[0.68rem]">
                      <span className="text-foreground">{bar.label}</span>
                      <span className="font-mono uppercase tracking-[0.16em] text-muted-foreground">
                        Ready
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-(--surface-muted)">
                      <div
                        data-nexus-bar-fill
                        className="h-full rounded-full bg-[linear-gradient(90deg,var(--brand),var(--teal))]"
                        style={{ width: bar.width }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  "Role-aware answers",
                  "Exception detection",
                  "Institution-safe next steps",
                ].map((item) => (
                  <div
                    key={item}
                    data-nexus-pill
                    className="rounded-full border border-(--line) bg-(--surface) px-3 py-2 font-mono text-[0.52rem] uppercase tracking-[0.18em] text-muted-foreground"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                text: "Same trust boundaries and role-aware controls as the core platform.",
              },
              {
                icon: FileSpreadsheet,
                text: "Works on live dues, approvals, receipts, and compliance records.",
              },
              {
                icon: Radar,
                text: "Surfaces signals across finance, academics, communication, and operations.",
              },
            ].map((item) => (
              <div
                key={item.text}
                data-nexus-summary
                className="rounded-[1.2rem] border border-(--line) bg-(--surface) px-4 py-4"
              >
                <item.icon className="mb-3 size-4 text-(--brand)" />
                <p className="text-[0.8rem] leading-6 text-muted-foreground">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
