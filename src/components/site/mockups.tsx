"use client";

import { animate, stagger } from "animejs";
import {
  Banknote,
  Bell,
  CheckCircle2,
  Globe2,
  GraduationCap,
  type LucideIcon,
  LayoutDashboard,
  LockKeyhole,
  MessageSquareText,
  Network,
  Radar,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { Bus } from "@/components/icons";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

const laptopScreenStyle = {
  top: "8.7%",
  left: "12.84%",
  right: "12.96%",
  bottom: "13.09%",
} satisfies CSSProperties;

function AnimatedScene({
  children,
  className,
  floatPrimary = true,
  floatSecondary = false,
}: {
  children: ReactNode;
  className?: string;
  floatPrimary?: boolean;
  floatSecondary?: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    if (prefersReducedMotion) {
      node.style.opacity = "1";
      node.style.transform = "none";
      return;
    }

    node.style.opacity = "0";
    node.style.transform = "translateY(22px)";

    const targets = Array.from(node.querySelectorAll<HTMLElement>("[data-scene-item]"));
    const accents = Array.from(node.querySelectorAll<HTMLElement>("[data-scene-accent]"));
    const primary = node.querySelector<HTMLElement>('[data-float="primary"]');
    const secondary = node.querySelector<HTMLElement>('[data-float="secondary"]');
    const animations: Array<{ pause?: () => void }> = [];

    for (const target of [...targets, ...accents]) {
      target.style.opacity = "0";
      target.style.transform = "translateY(18px)";
    }

    const run = () => {
      animations.push(
        animate(node, {
          opacity: [0, 1],
          y: [22, 0],
          duration: 920,
          ease: "out(3)",
        })
      );

      if (targets.length) {
        animations.push(
          animate(targets, {
            opacity: [0, 1],
            y: [18, 0],
            delay: stagger(90, { start: 80 }),
            duration: 820,
            ease: "out(3)",
          })
        );
      }

      if (accents.length) {
        animations.push(
          animate(accents, {
            opacity: [0, 1],
            y: [18, 0],
            delay: stagger(110, { start: 200 }),
            duration: 900,
            ease: "out(4)",
          })
        );
      }

      if (floatPrimary && primary) {
        animations.push(
          animate(primary, {
            y: [0, -5],
            duration: 5400,
            loop: true,
            alternate: true,
            ease: "inOutQuad",
          })
        );
      }

      if (floatSecondary && secondary) {
        animations.push(
          animate(secondary, {
            y: [0, -7],
            rotate: [0, -0.8],
            duration: 6200,
            loop: true,
            alternate: true,
            ease: "inOutQuad",
          })
        );
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          observer.disconnect();
          run();
        }
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.22,
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      for (const animation of animations) {
        animation.pause?.();
      }
    };
  }, [floatPrimary, floatSecondary, prefersReducedMotion]);

  return (
    <div ref={ref} className={cn("relative select-none", className)}>
      {children}
    </div>
  );
}

function LaptopFrame({
  title,
  children,
  className,
  motionRole,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  motionRole?: "primary" | "secondary";
}) {
  return (
    <div
      className={cn("relative mx-auto w-full max-w-[56rem]", className)}
      data-scene-item
      data-float={motionRole}
    >
      <div className="mb-3 flex items-center justify-between px-3">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-[color:var(--muted-foreground)]">
          {title}
        </p>
        <span className="rounded-full border border-[color:var(--line)] bg-[color:var(--surface-strong)] px-2.5 py-1 font-mono text-[0.54rem] uppercase tracking-[0.22em] text-[color:var(--muted-foreground)]">
          Live surface
        </span>
      </div>
      <div className="relative aspect-[3880/2300]">
        <div
          className="absolute overflow-hidden rounded-[0.8rem] bg-[color:var(--surface)]"
          style={laptopScreenStyle}
        >
          <div className="h-full w-full origin-top-left scale-[0.55]" style={{ width: "182%", height: "182%" }}>
            {children}
          </div>
          <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(135deg,rgba(255,255,255,0.04)_0%,transparent_40%,transparent_60%,rgba(255,255,255,0.02)_100%)]" />
        </div>
        <div className="pointer-events-none absolute inset-0 z-20">
          <Image
            src="/images/devices/macbook-air-figma.png"
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 896px"
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}

function FigmaIphoneFrame({
  title,
  children,
  className,
  motionRole,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  motionRole?: "primary" | "secondary";
}) {
  return (
    <div
      className={cn("relative w-full max-w-[17rem]", className)}
      data-scene-item
      data-float={motionRole}
    >
      <div className="mb-3 text-center font-mono text-[0.62rem] uppercase tracking-[0.22em] text-[color:var(--muted-foreground)]">
        {title}
      </div>
      <div className="relative mx-auto aspect-[390/844] w-full">
        <div className="absolute inset-0 overflow-hidden rounded-[2.55rem] bg-[#f4f2ee] shadow-[inset_0_0_16px_rgba(0,0,0,0.05)]">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 px-5 pt-3">
            <div className="flex items-center justify-between text-[0.58rem] font-semibold tracking-[0.04em] text-[#0f1725]">
              <span>9:41</span>
              <div className="h-7 w-[7.25rem]" aria-hidden="true" />
              <div className="flex items-center gap-1.5">
                <div className="flex items-end gap-[2px]">
                  {[0.45, 0.6, 0.8, 1].map((scale, index) => (
                    <span
                      key={index}
                      className="block w-[3px] rounded-full bg-[#0f1725]"
                      style={{ height: `${9 * scale}px`, opacity: 0.42 + index * 0.16 }}
                    />
                  ))}
                </div>
                <div className="h-2.5 w-4 rounded-[999px] border border-[#0f1725]">
                  <div className="ml-[1px] mt-[1px] h-[6px] w-[8px] rounded-full bg-[#0f1725]" />
                </div>
              </div>
            </div>
          </div>
          {children}
          <div className="pointer-events-none absolute inset-0 z-5 rounded-[2.55rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.06)_0%,transparent_50%)]" />
        </div>
        <div className="pointer-events-none absolute inset-x-[-9.9%] inset-y-[-3.32%] z-20">
          <Image
            src="/images/devices/iphone-13-silver-portrait.png"
            alt=""
            fill
            sizes="272px"
            className="object-fill"
          />
        </div>
      </div>
    </div>
  );
}

function SurfaceCard({
  title,
  value,
  detail,
  icon: Icon,
  accent,
}: {
  title: string;
  value: string;
  detail: string;
  icon?: LucideIcon;
  accent?: "brand" | "teal" | "amber";
}) {
  return (
    <div
      className={cn(
        "rounded-[1.25rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-4",
        accent && "border-l-2",
        accent === "brand" && "border-l-[color:var(--brand)]",
        accent === "teal" && "border-l-[color:var(--teal)]",
        accent === "amber" && "border-l-[color:var(--amber)]"
      )}
    >
      <div className="flex items-center justify-between">
        <p className="font-mono text-[0.54rem] uppercase tracking-[0.22em] text-[color:var(--muted-foreground)]">
          {title}
        </p>
        {Icon && (
          <Icon
            className={cn(
              "size-4",
              accent === "brand" && "text-[color:var(--brand)]",
              accent === "teal" && "text-[color:var(--teal)]",
              accent === "amber" && "text-[color:var(--amber)]",
              !accent && "text-[color:var(--muted-foreground)]"
            )}
          />
        )}
      </div>
      <p className="mt-2 font-display text-xl tracking-[-0.03em] text-[color:var(--foreground)]">
        {value}
      </p>
      <p className="mt-2 text-sm leading-6 text-[color:var(--muted-foreground)]">{detail}</p>
    </div>
  );
}

function ProgressRing({ percent, color, size = 22 }: { percent: number; color: string; size?: number }) {
  const r = (size - 3) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - percent / 100);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="text-[color:var(--line)]"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  );
}

function HeroLaptopSurface() {
  return (
    <div className="flex h-full flex-col bg-[radial-gradient(circle_at_top_left,var(--brand-soft),transparent_36%),linear-gradient(180deg,var(--surface-strong),var(--surface))] p-3">
      {/* Institution header */}
      <div className="flex items-center justify-between rounded-[1rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] px-3 py-2">
        <div>
          <p className="font-display text-sm tracking-[-0.03em] text-[color:var(--foreground)]">
            St. Mira Group of Institutions
          </p>
          <p className="mt-0.5 font-mono text-[0.48rem] uppercase tracking-[0.22em] text-[color:var(--muted-foreground)]">
            6 campuses • 14,280 learners • 2,041 staff
          </p>
        </div>
        <div className="hidden gap-1.5 md:flex">
          {["Board review ready", "99.97% uptime"].map((item) => (
            <span
              key={item}
              className="rounded-full border border-[color:var(--line)] bg-[color:var(--surface)] px-2 py-1 font-mono text-[0.44rem] uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Command center + right column */}
      <div className="mt-2 grid gap-2 md:grid-cols-[1.18fr_0.82fr]">
        <div className="rounded-[1rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-3">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[0.48rem] uppercase tracking-[0.22em] text-[color:var(--muted-foreground)]">
              Institution command center
            </p>
            <LayoutDashboard className="size-4 text-[color:var(--brand)]" />
          </div>
          <div className="mt-2 grid gap-2 sm:grid-cols-3">
            {/* Admissions card */}
            <div className="rounded-[1rem] border border-[color:var(--line)] border-l-2 border-l-[color:var(--brand)] bg-[color:var(--surface-strong)] p-2.5">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[0.44rem] uppercase tracking-[0.22em] text-[color:var(--muted-foreground)]">
                  Admissions
                </p>
                <GraduationCap className="size-3.5 text-[color:var(--brand)]" />
              </div>
              <div className="mt-1.5 flex items-end justify-between">
                <p className="font-display text-lg tracking-[-0.03em] text-[color:var(--foreground)]">
                  184 live
                </p>
                <svg viewBox="0 0 60 24" className="h-5 w-12" aria-hidden="true">
                  <defs>
                    <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <polygon
                    points="0,18 10,14 20,16 30,8 40,10 50,4 60,6 60,24 0,24"
                    fill="url(#spark-fill)"
                  />
                  <polyline
                    points="0,18 10,14 20,16 30,8 40,10 50,4 60,6"
                    fill="none"
                    stroke="var(--brand)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            {/* Collections card */}
            <div className="rounded-[1rem] border border-[color:var(--line)] border-l-2 border-l-[color:var(--teal)] bg-[color:var(--surface-strong)] p-2.5">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[0.44rem] uppercase tracking-[0.22em] text-[color:var(--muted-foreground)]">
                  Collections
                </p>
                <Banknote className="size-3.5 text-[color:var(--teal)]" />
              </div>
              <div className="mt-1.5 flex items-end justify-between">
                <p className="font-display text-lg tracking-[-0.03em] text-[color:var(--foreground)]">
                  96.4%
                </p>
                <ProgressRing percent={96.4} color="var(--teal)" size={20} />
              </div>
            </div>
            {/* Attendance card */}
            <div className="rounded-[1rem] border border-[color:var(--line)] border-l-2 border-l-[color:var(--teal)] bg-[color:var(--surface-strong)] p-2.5">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[0.44rem] uppercase tracking-[0.22em] text-[color:var(--muted-foreground)]">
                  Attendance
                </p>
                <CheckCircle2 className="size-3.5 text-[color:var(--teal)]" />
              </div>
              <div className="mt-1.5 flex items-end justify-between">
                <p className="font-display text-lg tracking-[-0.03em] text-[color:var(--foreground)]">
                  97.2%
                </p>
                <ProgressRing percent={97.2} color="var(--teal)" size={20} />
              </div>
            </div>
          </div>
        </div>
        {/* Right column: campus status + nexus */}
        <div className="grid gap-2">
          <div className="rounded-[1rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-3">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[0.48rem] uppercase tracking-[0.22em] text-[color:var(--muted-foreground)]">
                Multi-campus status
              </p>
              <span className="rounded-full bg-[color:var(--surface)] px-2 py-0.5 font-mono text-[0.44rem] uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]">
                Live
              </span>
            </div>
            <div className="mt-2 space-y-1.5">
              {[
                ["North Campus", "Stable", "bg-emerald-500"],
                ["Central Campus", "Fee deadline", "bg-amber-500"],
                ["South Campus", "Inspection prep", "bg-[color:var(--brand)]"],
              ].map(([campus, detail, dotColor]) => (
                <div
                  key={campus}
                  className="flex items-center justify-between rounded-lg bg-[color:var(--surface)] px-2.5 py-1.5 text-xs"
                >
                  <span className="flex items-center gap-1.5">
                    <span className={cn("size-1.5 shrink-0 rounded-full", dotColor)} />
                    {campus}
                  </span>
                  <span className="text-[color:var(--muted-foreground)]">{detail}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[1rem] border border-[color:var(--line)] bg-[linear-gradient(135deg,var(--brand-soft),transparent_72%)] p-3">
            <div className="flex items-center gap-2 text-xs text-[color:var(--foreground)]">
              <Radar className="size-3.5 text-[color:var(--brand)]" />
              <span>Nexus inside SquareCampus</span>
            </div>
            <p className="mt-1.5 text-xs leading-5 text-[color:var(--muted-foreground)]">
              Detects overdue fee risk, highlights attendance anomalies, and gives operators the
              next best action.
            </p>
          </div>
        </div>
      </div>

      {/* Timeline + Chart row */}
      <div className="mt-2 grid gap-2 md:grid-cols-[1fr_1.2fr]">
        <div className="rounded-[1rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-3">
          <p className="font-mono text-[0.48rem] uppercase tracking-[0.22em] text-[color:var(--muted-foreground)]">
            Shared timeline
          </p>
          <div className="mt-2 space-y-1.5 border-l-2 border-[color:var(--line)] pl-2.5">
            {[
              "Admission offer converted and fee plan provisioned.",
              "Hindi circular delivered while English audit trail stays intact.",
              "Concession approval logged with role and timestamp.",
            ].map((item) => (
              <div
                key={item}
                className="relative flex items-start gap-2 rounded-lg bg-[color:var(--surface)] px-2.5 py-2 text-xs"
              >
                <span className="absolute -left-[0.85rem] top-2.5 size-1.5 rounded-full border-2 border-[color:var(--teal)] bg-[color:var(--surface-strong)]" />
                <CheckCircle2 className="mt-0.5 size-3 shrink-0 text-[color:var(--teal)]" />
                <span className="leading-5 text-[color:var(--muted-foreground)]">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[1rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-3">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[0.48rem] uppercase tracking-[0.22em] text-[color:var(--muted-foreground)]">
              Leadership visibility
            </p>
            <Sparkles className="size-3.5 text-[color:var(--amber)]" />
          </div>
          <div className="mt-2 grid h-[7rem] grid-cols-7 gap-1.5">
            {[
              [58, "Mon"],
              [66, "Tue"],
              [81, "Wed"],
              [89, "Thu"],
              [74, "Fri"],
              [93, "Sat"],
              [87, "Sun"],
            ].map(([value, day], index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-end rounded-lg bg-[color:var(--surface)] p-1.5"
              >
                {(value as number) === 93 && (
                  <span className="mb-0.5 font-mono text-[0.4rem] text-[color:var(--brand)]">
                    {value}%
                  </span>
                )}
                <div
                  className="w-full rounded-md bg-[linear-gradient(180deg,var(--brand),var(--teal))] shadow-[0_-3px_6px_var(--brand-soft)]"
                  style={{ height: `${value}%` }}
                />
                <span className="mt-0.5 font-mono text-[0.38rem] uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]">
                  {day as string}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ParentPhoneSurface() {
  return (
    <div className="flex h-full flex-col bg-[#f3f1ed] px-6 pb-20 pt-16 text-[#171717]">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-display text-[1.15rem] tracking-[-0.04em]">Anaya S. | Grade 8</p>
          <p className="mt-1 font-mono text-[0.5rem] uppercase tracking-[0.22em] text-[#767676]">
            SquareCampus Parent • St. Mira Central
          </p>
        </div>
        <span className="rounded-full bg-white px-3 py-2 font-mono text-[0.54rem] uppercase tracking-[0.18em] text-[#6a6a6a] shadow-[0_8px_18px_rgba(0,0,0,0.06)]">
          Live today
        </span>
      </div>

      <div className="mt-5 rounded-[1.45rem] bg-white p-4 shadow-[0_16px_32px_rgba(0,0,0,0.06)]">
        <div className="flex items-start gap-3">
          <div className="rounded-[1rem] bg-[#eef3ff] p-2 text-[#5d79c7]">
            <Bell className="size-4" />
          </div>
          <div>
            <p className="font-display text-sm tracking-[-0.03em]">Today at a glance</p>
            <p className="mt-1 text-[0.78rem] leading-5 text-[#6b6b6b]">
              Bus reached campus, attendance marked, and the April fee reminder is queued in Hindi
              and English.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {(
          [
            ["Attendance", "Present", CheckCircle2, "#dcfce7", "#22c55e"],
            ["Fees", "Due Apr 12", Banknote, "#fef3c7", "#d97706"],
            ["Transport", "Route 03", Bus, "#dbeafe", "#3b82f6"],
            ["Circulars", "2 unread", Bell, "#f3e8ff", "#a855f7"],
          ] as const
        ).map(([label, detail, Icon, iconBg, iconColor]) => (
          <div
            key={label}
            className="rounded-[1.2rem] bg-white/92 p-3 shadow-[0_14px_28px_rgba(0,0,0,0.05)]"
          >
            <div className="flex items-center gap-2">
              <span
                className="flex size-5 items-center justify-center rounded-md"
                style={{ background: iconBg }}
              >
                <Icon className="size-3" style={{ color: iconColor }} />
              </span>
              <p className="font-mono text-[0.54rem] uppercase tracking-[0.2em] text-[#7a7a7a]">
                {label}
              </p>
            </div>
            <p className="mt-1.5 text-sm tracking-[-0.02em] text-[#171717]">{detail}</p>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between">
          <p className="font-display text-[1rem] tracking-[-0.04em]">Parent timeline</p>
          <p className="font-mono text-[0.54rem] uppercase tracking-[0.2em] text-[#8a8a8a]">
            One login
          </p>
        </div>
        <div className="mt-3 space-y-2.5">
          {[
            ["Receipt generated for April installment and pushed to WhatsApp.", "10:32 AM"],
            ["Science exhibition circular translated and delivered in preferred language.", "09:15 AM"],
            ["Attendance exception linked to class teacher update and parent acknowledgment.", "08:47 AM"],
          ].map(([item, time]) => (
            <div
              key={item}
              className="rounded-[1rem] bg-white/92 px-4 py-3 shadow-[0_14px_28px_rgba(0,0,0,0.05)]"
            >
              <p className="text-[0.78rem] leading-5 text-[#5f5f5f]">{item}</p>
              <p className="mt-1 text-right font-mono text-[0.5rem] text-[#b0b0b0]">{time}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 rounded-[1.2rem] border border-[#d9d7d3] bg-[rgba(255,255,255,0.68)] p-3">
        <div className="flex items-center gap-2">
          <Globe2 className="size-4 text-[#5b887f]" />
          <p className="text-[0.74rem] leading-5 text-[#5f5f5f]">
            English / Hindi / Kannada / Tamil available where institutions need it.
          </p>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-center gap-20 pt-5 text-[0.68rem]">
        <div className="flex flex-col items-center gap-1 text-[#171717]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Home
        </div>
        <div className="flex flex-col items-center gap-1 text-[#b3b3b3]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          Updates
        </div>
      </div>
    </div>
  );
}

function RolloutSurface() {
  return (
    <div className="grid h-full gap-3 bg-[linear-gradient(180deg,var(--surface-strong),var(--surface))] p-4 md:grid-cols-[1.05fr_0.95fr]">
      <div className="rounded-[1.2rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-4">
        <p className="font-mono text-[0.54rem] uppercase tracking-[0.22em] text-[color:var(--muted-foreground)]">
          Guided rollout
        </p>
        <div className="mt-4 space-y-3">
          {[
            ["01", "Workflow mapping", "Admissions, finance, academics, communication"],
            ["02", "Migration clinic", "Active records, roles, permissions, and structure"],
            ["03", "Parallel run", "Training, dry runs, and live cutover plan"],
          ].map(([index, title, detail]) => (
            <div key={index} className="rounded-[1rem] bg-[color:var(--surface)] p-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-[color:var(--brand)]">
                  {index}
                </span>
                <p className="text-sm text-[color:var(--foreground)]">{title}</p>
              </div>
              <p className="mt-2 text-sm leading-6 text-[color:var(--muted-foreground)]">
                {detail}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="grid gap-3">
        <SurfaceCard
          title="Training"
          value="Role-based"
          detail="Admins, finance teams, teachers, and support staff train against their real workflows."
        />
        <SurfaceCard
          title="Go-live posture"
          value="Predictable"
          detail="A single owner, clear checkpoints, and escalation paths through launch week."
        />
        <SurfaceCard
          title="Post-launch"
          value="Visible"
          detail="Support, adoption monitoring, and optimization after the first term begins."
        />
      </div>
    </div>
  );
}

function EcosystemSurface() {
  return (
    <div className="grid h-full gap-3 bg-[linear-gradient(180deg,var(--surface-strong),var(--surface))] p-4 md:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-[1.2rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-4">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[0.54rem] uppercase tracking-[0.22em] text-[color:var(--muted-foreground)]">
            One ecosystem
          </p>
          <Network className="size-4 text-[color:var(--brand)]" />
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {[
            ["Admin", "Policies, approvals, reporting"],
            ["Staff", "Teaching, attendance, operations"],
            ["Parents", "Fees, updates, visibility"],
          ].map(([title, detail]) => (
            <div key={title} className="rounded-[1rem] bg-[color:var(--surface)] p-3">
              <p className="text-sm text-[color:var(--foreground)]">{title}</p>
              <p className="mt-2 text-sm leading-6 text-[color:var(--muted-foreground)]">
                {detail}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-5 gap-3">
          {["Admissions", "Academics", "Attendance", "Finance", "Communication"].map((node) => (
            <div
              key={node}
              className="rounded-[1rem] bg-[linear-gradient(135deg,var(--brand-soft),transparent_75%)] px-3 py-4 text-center text-sm"
            >
              {node}
            </div>
          ))}
        </div>
      </div>
      <div className="grid gap-3">
        <SurfaceCard
          title="Identity"
          value="Shared roles"
          detail="Permissions persist across all workflows and touchpoints."
        />
        <SurfaceCard
          title="Timeline"
          value="Continuous"
          detail="Events, payments, communication, and approvals stay connected."
        />
        <SurfaceCard
          title="Integrations"
          value="Practical"
          detail="APIs and connectors support real campus operations without fragmenting the core."
        />
      </div>
    </div>
  );
}

function SecuritySurface() {
  return (
    <div className="grid h-full gap-3 bg-[linear-gradient(180deg,var(--surface-strong),var(--surface))] p-4 md:grid-cols-[0.9fr_1.1fr]">
      <div className="grid gap-3">
        <SurfaceCard
          title="Residency"
          value="India hosted"
          detail="Institution data stays under an India-first operating posture."
        />
        <SurfaceCard
          title="Access"
          value="Role-based"
          detail="Least privilege, approval paths, and clear administrative controls."
        />
        <SurfaceCard
          title="Audit"
          value="Traceable"
          detail="Who changed what, when, and where stays available for review."
        />
      </div>
      <div className="rounded-[1.2rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-4">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[0.54rem] uppercase tracking-[0.22em] text-[color:var(--muted-foreground)]">
            Security posture
          </p>
          <ShieldCheck className="size-4 text-[color:var(--teal)]" />
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            {
              icon: LockKeyhole,
              label: "Encryption",
              detail: "In transit and at rest",
            },
            {
              icon: Bell,
              label: "Monitoring",
              detail: "Operational alerts and review trails",
            },
            {
              icon: ShieldCheck,
              label: "Controls",
              detail: "Documented access and control posture",
            },
            {
              icon: Globe2,
              label: "Compliance",
              detail: "Built for India-aware institutional operations",
            },
          ].map(({ icon: Icon, label, detail }) => (
            <div key={label} className="rounded-[1rem] bg-[color:var(--surface)] p-3">
              <Icon className="size-4 text-[color:var(--brand)]" />
              <p className="mt-3 text-sm text-[color:var(--foreground)]">{label}</p>
              <p className="mt-2 text-sm leading-6 text-[color:var(--muted-foreground)]">
                {detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function HeroMockupCluster() {
  return (
    <AnimatedScene className="mx-auto max-w-[60rem]">
      <LaptopFrame title="Admin command center" motionRole="primary">
        <HeroLaptopSurface />
      </LaptopFrame>
      <FigmaIphoneFrame
        title="Parent experience"
        className="absolute -bottom-6 right-0 hidden max-w-[13rem] md:block lg:-right-2"
        motionRole="secondary"
      >
        <ParentPhoneSurface />
      </FigmaIphoneFrame>
      <div
        className="surface-panel pointer-events-none absolute -bottom-14 left-4 hidden max-w-[14rem] rounded-[1.4rem] p-4 lg:block"
        data-scene-accent
      >
        <div className="flex items-center gap-2 text-sm text-[color:var(--foreground)]">
          <Sparkles className="size-4 text-[color:var(--amber)]" />
          Nexus intelligence layer
        </div>
        <p className="mt-2 text-sm leading-6 text-[color:var(--muted-foreground)]">
          Surfaces cross-workflow anomalies without changing the core operational model.
        </p>
      </div>
    </AnimatedScene>
  );
}

export function RolloutMockup() {
  return (
    <AnimatedScene className="mx-auto max-w-[56rem]" floatSecondary={false}>
      <LaptopFrame title="Implementation program">
        <RolloutSurface />
      </LaptopFrame>
    </AnimatedScene>
  );
}

export function EcosystemMockup() {
  return (
    <AnimatedScene className="mx-auto max-w-[56rem]" floatSecondary={false}>
      <LaptopFrame title="Connected ecosystem">
        <EcosystemSurface />
      </LaptopFrame>
    </AnimatedScene>
  );
}

export function SecurityMockup() {
  return (
    <AnimatedScene className="mx-auto max-w-[56rem]" floatSecondary={false}>
      <LaptopFrame title="Trust architecture">
        <SecuritySurface />
      </LaptopFrame>
    </AnimatedScene>
  );
}

/* ─── Platform-specific surfaces ─── */

const platformModules = [
  { label: "Admissions", color: "var(--brand)", percent: 100 },
  { label: "Academics", color: "var(--brand)", percent: 92 },
  { label: "Finance", color: "var(--teal)", percent: 88 },
  { label: "Communication", color: "var(--teal)", percent: 96 },
  { label: "Operations", color: "var(--amber)", percent: 84 },
  { label: "Compliance", color: "var(--amber)", percent: 80 },
] as const;

function PlatformLaptopSurface() {
  return (
    <div className="flex h-full flex-col bg-[radial-gradient(circle_at_top_right,var(--brand-soft),transparent_40%),linear-gradient(180deg,var(--surface-strong),var(--surface))] p-3">
      {/* Header */}
      <div className="flex items-center justify-between rounded-[1rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] px-3 py-2">
        <div>
          <p className="font-display text-sm tracking-[-0.03em] text-[color:var(--foreground)]">
            Platform architecture
          </p>
          <p className="mt-0.5 font-mono text-[0.48rem] uppercase tracking-[0.22em] text-[color:var(--muted-foreground)]">
            All modules · Single data model · Shared identity
          </p>
        </div>
        <div className="hidden gap-1.5 md:flex">
          <span className="flex items-center gap-1.5 rounded-full border border-[color:var(--line)] bg-[color:var(--surface)] px-2 py-1 font-mono text-[0.44rem] uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            All systems connected
          </span>
        </div>
      </div>

      {/* Module health + Shared core */}
      <div className="mt-2 grid gap-2 md:grid-cols-[1.25fr_0.75fr]">
        {/* Module health bars */}
        <div className="rounded-[1rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-3">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[0.48rem] uppercase tracking-[0.22em] text-[color:var(--muted-foreground)]">
              Module integration health
            </p>
            <Network className="size-3.5 text-[color:var(--brand)]" />
          </div>
          <div className="mt-3 space-y-2">
            {platformModules.map((mod) => (
              <div key={mod.label} className="flex items-center gap-2">
                <span className="w-20 font-mono text-[0.44rem] uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]">
                  {mod.label}
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-[color:var(--surface)]">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${mod.percent}%`,
                      background: `linear-gradient(90deg, ${mod.color}, ${mod.color})`,
                      opacity: 0.7,
                    }}
                  />
                </div>
                <span className="w-7 text-right font-mono text-[0.42rem] text-[color:var(--muted-foreground)]">
                  {mod.percent}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Shared core layers */}
        <div className="grid gap-2">
          {[
            { label: "Identity", value: "Single sign-on", desc: "Users, roles, permissions" },
            { label: "Data model", value: "Unified records", desc: "Admissions → academics → finance" },
            { label: "Timeline", value: "One audit trail", desc: "All actions sequenced" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-[1rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-2.5"
            >
              <p className="font-mono text-[0.44rem] uppercase tracking-[0.22em] text-[color:var(--muted-foreground)]">
                {item.label}
              </p>
              <p className="mt-1 font-display text-sm tracking-[-0.03em] text-[color:var(--foreground)]">
                {item.value}
              </p>
              <p className="mt-0.5 text-[0.6rem] leading-4 text-[color:var(--muted-foreground)]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Surface map + data flow */}
      <div className="mt-2 grid gap-2 md:grid-cols-[1fr_1fr]">
        {/* Experience surfaces */}
        <div className="rounded-[1rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-3">
          <p className="font-mono text-[0.48rem] uppercase tracking-[0.22em] text-[color:var(--muted-foreground)]">
            Experience surfaces
          </p>
          <div className="mt-2 grid grid-cols-2 gap-1.5">
            {[
              ["Admin", "Command center", "var(--brand)"],
              ["Teacher", "Workspace", "var(--teal)"],
              ["Parent", "Mobile app", "var(--amber)"],
              ["Leader", "Dashboards", "var(--brand)"],
            ].map(([role, surface, color]) => (
              <div
                key={role}
                className="rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] p-2"
              >
                <div className="flex items-center gap-1.5">
                  <span
                    className="size-1.5 rounded-full"
                    style={{ background: color }}
                  />
                  <span className="font-mono text-[0.44rem] uppercase tracking-[0.18em] text-[color:var(--foreground)]">
                    {role}
                  </span>
                </div>
                <p className="mt-0.5 text-[0.52rem] text-[color:var(--muted-foreground)]">
                  {surface}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Data flow */}
        <div className="rounded-[1rem] border border-[color:var(--line)] bg-[linear-gradient(135deg,var(--brand-soft),transparent_72%)] p-3">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[0.48rem] uppercase tracking-[0.22em] text-[color:var(--muted-foreground)]">
              Data flow
            </p>
            <Radar className="size-3.5 text-[color:var(--brand)]" />
          </div>
          <div className="mt-2 space-y-1.5">
            {[
              "Inquiry → Admission → Enrollment → Classroom",
              "Fee plan → Invoice → Receipt → Audit trail",
              "Circular → Delivery → Read receipt → Archive",
            ].map((flow) => (
              <div
                key={flow}
                className="rounded-lg bg-[color:var(--surface-strong)] px-2.5 py-1.5"
              >
                <p className="font-mono text-[0.44rem] tracking-[0.08em] text-[color:var(--muted-foreground)]">
                  {flow}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center gap-1.5">
            <ShieldCheck className="size-3 text-[color:var(--teal)]" />
            <p className="text-[0.5rem] text-[color:var(--muted-foreground)]">
              Every transition logged with role, timestamp, and campus context
            </p>
          </div>
        </div>
      </div>

      {/* Live activity + Campus metrics */}
      <div className="mt-2 grid gap-2 md:grid-cols-[1.2fr_0.8fr]">
        {/* Recent activity feed */}
        <div className="rounded-[1rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-3">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[0.48rem] uppercase tracking-[0.22em] text-[color:var(--muted-foreground)]">
              Live activity
            </p>
            <span className="flex items-center gap-1 rounded-full bg-[color:var(--surface)] px-2 py-0.5 font-mono text-[0.42rem] uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]">
              <span className="size-1 animate-pulse rounded-full bg-emerald-500" />
              Now
            </span>
          </div>
          <div className="mt-2 space-y-1.5 border-l-2 border-[color:var(--line)] pl-2.5">
            {[
              ["Fee receipt #4821 generated", "Finance → Parent app", "2m ago"],
              ["Attendance synced for 6 campuses", "Operations → Dashboard", "4m ago"],
              ["Hindi circular queued for 3,200 parents", "Communication → Delivery", "7m ago"],
              ["Admission offer converted — Riya M.", "Admissions → Academics", "12m ago"],
            ].map(([action, flow, time]) => (
              <div
                key={action}
                className="relative flex items-start justify-between rounded-lg bg-[color:var(--surface)] px-2.5 py-1.5"
              >
                <span className="absolute -left-[0.85rem] top-2 size-1.5 rounded-full border-2 border-[color:var(--brand)] bg-[color:var(--surface-strong)]" />
                <div>
                  <p className="text-xs text-[color:var(--foreground)]">{action}</p>
                  <p className="mt-0.5 font-mono text-[0.42rem] tracking-[0.06em] text-[color:var(--muted-foreground)]">
                    {flow}
                  </p>
                </div>
                <span className="shrink-0 font-mono text-[0.42rem] text-[color:var(--muted-foreground)]">
                  {time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Campus metrics */}
        <div className="rounded-[1rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-3">
          <p className="font-mono text-[0.48rem] uppercase tracking-[0.22em] text-[color:var(--muted-foreground)]">
            Campus metrics
          </p>
          <div className="mt-2 space-y-2">
            {[
              { label: "Active users today", value: "2,847", change: "+12%" },
              { label: "Records synced", value: "48.2K", change: "Live" },
              { label: "Avg response time", value: "140ms", change: "Stable" },
            ].map((metric) => (
              <div
                key={metric.label}
                className="flex items-center justify-between rounded-lg bg-[color:var(--surface)] px-2.5 py-2"
              >
                <div>
                  <p className="font-mono text-[0.44rem] uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]">
                    {metric.label}
                  </p>
                  <p className="mt-0.5 font-display text-lg tracking-[-0.03em] text-[color:var(--foreground)]">
                    {metric.value}
                  </p>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 font-mono text-[0.44rem] text-emerald-600 dark:text-emerald-400">
                  {metric.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TeacherPhoneSurface() {
  return (
    <div className="flex h-full flex-col bg-[#f3f1ed] px-6 pb-20 pt-16 text-[#171717]">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-display text-[1.15rem] tracking-[-0.04em]">Ms. Priya K.</p>
          <p className="mt-1 font-mono text-[0.5rem] uppercase tracking-[0.22em] text-[#767676]">
            Class Teacher · Grade 8-B · St. Mira Central
          </p>
        </div>
        <span className="rounded-full bg-white px-3 py-2 font-mono text-[0.54rem] uppercase tracking-[0.18em] text-[#6a6a6a] shadow-[0_8px_18px_rgba(0,0,0,0.06)]">
          Today
        </span>
      </div>

      {/* Action queue */}
      <div className="mt-5 rounded-[1.45rem] bg-white p-4 shadow-[0_16px_32px_rgba(0,0,0,0.06)]">
        <p className="font-display text-sm tracking-[-0.03em]">Action queue</p>
        <div className="mt-3 space-y-2">
          {[
            ["Mark attendance", "Grade 8-B · 42 students", "#dcfce7", "#22c55e"],
            ["Review submissions", "Math unit test · 38 pending", "#dbeafe", "#3b82f6"],
            ["Parent remark", "Aarav M. · Behaviour note", "#fef3c7", "#d97706"],
          ].map(([task, detail, bg, color]) => (
            <div key={task} className="flex items-center gap-3 rounded-[1rem] bg-[#f8f7f4] p-2.5">
              <span
                className="flex size-6 shrink-0 items-center justify-center rounded-lg"
                style={{ background: bg }}
              >
                <CheckCircle2 className="size-3.5" style={{ color }} />
              </span>
              <div className="min-w-0">
                <p className="text-[0.78rem] font-medium text-[#171717]">{task}</p>
                <p className="text-[0.62rem] text-[#8a8a8a]">{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick stats */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          ["Present", "39/42", "#22c55e"],
          ["Pending", "3 tasks", "#3b82f6"],
          ["Circulars", "1 new", "#a855f7"],
        ].map(([label, value, color]) => (
          <div key={label} className="rounded-[1rem] bg-white/92 p-2.5 text-center shadow-[0_14px_28px_rgba(0,0,0,0.05)]">
            <p className="font-display text-sm tracking-[-0.02em]" style={{ color }}>
              {value}
            </p>
            <p className="mt-0.5 font-mono text-[0.48rem] uppercase tracking-[0.2em] text-[#8a8a8a]">
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* Class timeline */}
      <div className="mt-5">
        <p className="font-display text-[1rem] tracking-[-0.04em]">Class timeline</p>
        <div className="mt-3 space-y-2.5">
          {[
            ["Attendance submitted for period 1. 3 absent, 0 late.", "08:45 AM"],
            ["Math worksheet assigned to 42 students via app.", "09:30 AM"],
          ].map(([item, time]) => (
            <div
              key={item}
              className="rounded-[1rem] bg-white/92 px-4 py-3 shadow-[0_14px_28px_rgba(0,0,0,0.05)]"
            >
              <p className="text-[0.78rem] leading-5 text-[#5f5f5f]">{item}</p>
              <p className="mt-1 text-right font-mono text-[0.5rem] text-[#b0b0b0]">{time}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto flex items-center justify-center gap-20 pt-5 text-[0.68rem]">
        <div className="flex flex-col items-center gap-1 text-[#171717]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Home
        </div>
        <div className="flex flex-col items-center gap-1 text-[#b3b3b3]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          Updates
        </div>
      </div>
    </div>
  );
}

export function PlatformMockupRow() {
  return (
    <AnimatedScene className="mx-auto max-w-[60rem]">
      <LaptopFrame title="Platform architecture" motionRole="primary">
        <PlatformLaptopSurface />
      </LaptopFrame>
      <FigmaIphoneFrame
        title="Teacher workspace"
        className="absolute -bottom-6 right-0 hidden max-w-[13rem] md:block lg:-right-2"
        motionRole="secondary"
      >
        <TeacherPhoneSurface />
      </FigmaIphoneFrame>
      <div
        className="surface-panel pointer-events-none absolute -bottom-14 left-4 hidden max-w-[14rem] rounded-[1.4rem] p-4 lg:block"
        data-scene-accent
      >
        <div className="flex items-center gap-2 text-sm text-[color:var(--foreground)]">
          <Network className="size-4 text-[color:var(--brand)]" />
          Shared data model
        </div>
        <p className="mt-2 text-sm leading-6 text-[color:var(--muted-foreground)]">
          One record flows from admissions through academics, finance, and communication.
        </p>
      </div>
    </AnimatedScene>
  );
}
