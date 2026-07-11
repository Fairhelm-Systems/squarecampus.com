"use client";

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
import { cn } from "@/lib/utils";

const sourceCards = [
  {
    title: "Role graph",
    detail: "Trustees, principals, finance, teachers, parents",
    icon: Fingerprint,
    position: "md:left-[4%] md:top-[7%]",
    line: "M250 240 C210 180 150 118 84 86",
  },
  {
    title: "Admissions",
    detail: "Applications, documents, offers, enrollment",
    icon: BookOpenCheck,
    position: "md:right-[5%] md:top-[10%]",
    line: "M250 240 C300 176 372 120 438 92",
  },
  {
    title: "Attendance",
    detail: "Classroom signal, staff follow-through, exceptions",
    icon: BellRing,
    position: "md:left-[6%] md:top-[46%]",
    line: "M250 240 C184 238 124 246 66 280",
  },
  {
    title: "Finance ledger",
    detail: "Dues, receipts, concessions, approval history",
    icon: WalletCards,
    position: "md:right-[6%] md:top-[46%]",
    line: "M250 240 C316 238 382 246 454 282",
  },
  {
    title: "Communication",
    detail: "App, WhatsApp, circulars, acknowledgements",
    icon: MessageSquareShare,
    position: "md:left-[9%] md:bottom-[4%]",
    line: "M250 240 C202 308 154 350 112 392",
  },
  {
    title: "Leadership view",
    detail: "Campus health, branch risk, cross-team visibility",
    icon: ChartNoAxesCombined,
    position: "md:right-[9%] md:bottom-[4%]",
    line: "M250 240 C300 308 348 350 408 392",
  },
] as const;

const governanceChecks = [
  { label: "Tenant boundary respected", width: "100%" },
  { label: "Role-based answer scope", width: "95%" },
  { label: "Audit trail on every question", width: "100%" },
  { label: "Live operating context", width: "92%" },
] as const;

/**
 * The AEGIS hub-and-spoke visual: institutional records feeding one governed
 * intelligence layer. Entrance choreography is pure CSS (`.aegis-visual`
 * rules in globals.css); this component only flips `.is-live` on scroll.
 */
export function AegisIntelligenceVisual({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            node.classList.add("is-live");
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.18 }
    );

    observer.observe(node);
    const timeout = setTimeout(() => node.classList.add("is-live"), 4000);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div ref={ref} className={cn("aegis-visual relative", className)}>
      <div className="surface-panel-strong relative overflow-hidden rounded-4xl p-5 md:p-6">
        <div className="pointer-events-none absolute inset-x-[14%] top-8 h-28 rounded-full bg-[radial-gradient(circle,rgba(88,124,204,0.22),transparent_70%)] blur-3xl dark:bg-[radial-gradient(circle,rgba(88,124,204,0.16),transparent_72%)]" />

        <div className="space-y-4">
          <div className="relative grid grid-cols-2 gap-3 md:block md:min-h-148">
            <svg
              viewBox="0 0 500 480"
              className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
              aria-hidden="true"
            >
              {sourceCards.map((item, index) => (
                <path
                  key={item.title}
                  d={item.line}
                  data-aegis-line
                  pathLength={1}
                  style={{ "--d": `${120 + index * 90}ms` } as React.CSSProperties}
                  fill="none"
                  stroke="var(--brand)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              ))}
            </svg>

            <div className="pointer-events-none absolute inset-x-[20%] top-[15%] hidden h-72 rounded-full bg-[radial-gradient(circle,rgba(88,124,204,0.1),transparent_72%)] blur-3xl md:block dark:bg-[radial-gradient(circle,rgba(88,124,204,0.12),transparent_74%)]" />

            {sourceCards.map((item, index) => (
              <div
                key={item.title}
                data-aegis-rise
                style={{ "--d": `${220 + index * 85}ms` } as React.CSSProperties}
                className={cn(
                  "z-10 rounded-[1.3rem] border border-(--line) bg-(--surface) p-4 shadow-[0_18px_40px_rgba(8,15,30,0.08)] backdrop-blur-md md:absolute md:w-44",
                  item.position
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <item.icon className="size-4 text-(--brand)" />
                  <span
                    data-aegis-dot
                    style={{ "--d": `${360 + index * 90}ms` } as React.CSSProperties}
                    className="mt-0.5 size-2 rounded-full bg-(--brand)"
                  />
                </div>
                <p className="mt-4 break-words font-display text-[0.95rem] leading-snug tracking-[-0.03em] text-foreground md:text-[1rem]">
                  {item.title}
                </p>
                <p className="mt-2 text-[0.72rem] leading-5 text-muted-foreground">{item.detail}</p>
              </div>
            ))}

            <div
              data-aegis-rise
              style={{ "--d": "120ms" } as React.CSSProperties}
              className="order-first col-span-2 z-20 rounded-[1.7rem] border border-(--line-strong) bg-(--surface-strong) p-5 shadow-[0_26px_70px_rgba(8,15,30,0.14)] backdrop-blur-xl md:order-none md:absolute md:left-1/2 md:top-[37%] md:w-[76%] md:max-w-88 md:-translate-x-1/2 md:-translate-y-1/2"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[0.56rem] uppercase tracking-[0.22em] text-muted-foreground">
                    AEGIS · Governed intelligence
                  </p>
                  <h3 className="mt-3 font-display text-2xl tracking-[-0.05em] text-foreground">
                    Ask AEGIS. Don&rsquo;t chase reports.
                  </h3>
                </div>
                <div className="rounded-full bg-[linear-gradient(135deg,var(--brand-soft),transparent_70%)] p-2.5">
                  <Radar className="size-4 text-(--brand)" />
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                AEGIS reads the same role graph, timeline, fee state, communication trail, and
                campus visibility that already live inside the School OS — never a copy of your data
                in someone else&rsquo;s system.
              </p>

              <div className="mt-5 space-y-3">
                {governanceChecks.map((bar, index) => (
                  <div key={bar.label}>
                    <div className="mb-2 flex items-center justify-between text-[0.68rem]">
                      <span className="text-foreground">{bar.label}</span>
                      <span className="font-mono uppercase tracking-[0.16em] text-muted-foreground">
                        Enforced
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-(--surface-muted)">
                      <div
                        data-aegis-bar
                        style={
                          {
                            width: bar.width,
                            "--d": `${480 + index * 80}ms`,
                          } as React.CSSProperties
                        }
                        className="h-full rounded-full bg-[linear-gradient(90deg,var(--brand),var(--teal))]"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {["Role-aware answers", "Exception detection", "Audit-ready by default"].map(
                  (item, index) => (
                    <div
                      key={item}
                      data-aegis-rise
                      style={{ "--d": `${620 + index * 70}ms` } as React.CSSProperties}
                      className="rounded-full border border-(--line) bg-(--surface) px-3 py-2 font-mono text-[0.52rem] uppercase tracking-[0.18em] text-muted-foreground"
                    >
                      {item}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="hidden gap-3 sm:grid sm:grid-cols-3">
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
            ].map((item, index) => (
              <div
                key={item.text}
                data-aegis-rise
                style={{ "--d": `${720 + index * 85}ms` } as React.CSSProperties}
                className="rounded-[1.2rem] border border-(--line) bg-(--surface) px-4 py-4"
              >
                <item.icon className="mb-3 size-4 text-(--brand)" />
                <p className="text-[0.8rem] leading-6 text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
