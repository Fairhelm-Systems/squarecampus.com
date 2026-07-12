"use client";

import { Network, Sparkles } from "lucide-react";
import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

/**
 * Device mockups. The frames are transparent PNGs with a screen cutout;
 * the screen content is a pre-rendered product illustration from
 * /public/images/screens (laptop: 2560x1600 @ 16:10, mobile: 1170x2532
 * @ 390:844 — both match their cutouts exactly).
 */

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

  // Entrance and float loops are pure CSS (`.scene-*` rules in globals.css);
  // this only flips a class once the scene scrolls into view.
  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    if (prefersReducedMotion) {
      node.classList.add("is-live");
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
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.22,
      }
    );

    observer.observe(node);
    const timeout = setTimeout(() => node.classList.add("is-live"), 4000);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={ref}
      className={cn(
        "scene-root relative select-none",
        floatPrimary && "scene-float-primary",
        floatSecondary && "scene-float-secondary",
        className
      )}
    >
      {children}
    </div>
  );
}

function LaptopFrame({
  title,
  screenSrc,
  screenAlt,
  className,
  motionRole,
  priority = false,
}: {
  title: string;
  screenSrc: string;
  screenAlt: string;
  className?: string;
  motionRole?: "primary" | "secondary";
  priority?: boolean;
}) {
  return (
    <div
      className={cn("relative mx-auto w-full max-w-[56rem]", className)}
      data-scene-item
      data-float={motionRole}
    >
      <div className="mb-3 flex items-center justify-between px-3">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
          {title}
        </p>
        <span className="rounded-full border border-(--line) bg-(--surface-strong) px-2.5 py-1 font-mono text-[0.54rem] uppercase tracking-[0.22em] text-muted-foreground">
          Live surface
        </span>
      </div>
      <div className="relative aspect-[3880/2300]">
        <div
          className="absolute overflow-hidden rounded-[0.8rem] bg-(--surface)"
          style={laptopScreenStyle}
        >
          <Image
            src={screenSrc}
            alt={screenAlt}
            fill
            sizes="(max-width: 768px) 100vw, 896px"
            className="object-fill"
            priority={priority}
          />
          <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(135deg,rgba(255,255,255,0.04)_0%,transparent_40%,transparent_60%,rgba(255,255,255,0.02)_100%)]" />
        </div>
        <div className="pointer-events-none absolute inset-0 z-20">
          <Image
            src="/images/devices/macbook-air-figma.webp"
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 896px"
            className="object-contain"
            priority={priority}
          />
        </div>
      </div>
    </div>
  );
}

function PhoneFrame({
  title,
  screenSrc,
  screenAlt,
  className,
  motionRole,
}: {
  title: string;
  screenSrc: string;
  screenAlt: string;
  className?: string;
  motionRole?: "primary" | "secondary";
}) {
  return (
    <div
      className={cn("relative w-full max-w-[17rem]", className)}
      data-scene-item
      data-float={motionRole}
    >
      <div className="mb-3 text-center font-mono text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
        {title}
      </div>
      <div className="relative mx-auto aspect-[390/844] w-full">
        <div className="absolute inset-0 overflow-hidden rounded-[1.75rem] bg-[#f4f2ee] shadow-[inset_0_0_16px_rgba(0,0,0,0.05)]">
          <Image src={screenSrc} alt={screenAlt} fill sizes="272px" className="object-fill" />
          <div className="pointer-events-none absolute inset-0 z-5 rounded-[1.75rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.06)_0%,transparent_50%)]" />
        </div>
        <div className="pointer-events-none absolute inset-x-[-9.9%] inset-y-[-3.32%] z-20">
          <Image
            src="/images/devices/iphone-13-silver-portrait.webp"
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

export function HeroMockupCluster() {
  return (
    <AnimatedScene className="mx-auto max-w-[60rem]">
      <LaptopFrame
        title="Admin command center"
        screenSrc="/images/screens/laptop/institution-command-center.webp"
        screenAlt="SquareCampus institution command center with multi-campus attendance, fees, and academic health roll-up"
        motionRole="primary"
        priority
      />
      <PhoneFrame
        title="Student experience"
        screenSrc="/images/screens/mobile/student-day-view.webp"
        screenAlt="SquareCampus student app showing the day's timetable, next class, and assignments due soon"
        className="absolute -bottom-6 right-0 hidden max-w-[13rem] md:block lg:-right-2"
        motionRole="secondary"
      />
      <div
        className="surface-panel pointer-events-none absolute -bottom-14 left-4 hidden max-w-[14rem] rounded-[1.4rem] p-4 lg:block"
        data-scene-accent
      >
        <div className="flex items-center gap-2 text-sm text-foreground">
          <Sparkles className="size-4 text-(--amber)" />
          AEGIS governed intelligence
        </div>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Surfaces cross-workflow anomalies without changing the core operational model.
        </p>
      </div>
    </AnimatedScene>
  );
}

export function PlatformMockupRow() {
  return (
    <AnimatedScene className="mx-auto max-w-[60rem]">
      <LaptopFrame
        title="Platform architecture"
        screenSrc="/images/screens/laptop/platform-architecture.webp"
        screenAlt="SquareCampus platform architecture surface with module integration health and shared institutional core"
        motionRole="primary"
        priority
      />
      <PhoneFrame
        title="Teacher workspace"
        screenSrc="/images/screens/mobile/teacher-attendance.webp"
        screenAlt="SquareCampus teacher app marking class attendance with present, absent, and late states"
        className="absolute -bottom-6 right-0 hidden max-w-[13rem] md:block lg:-right-2"
        motionRole="secondary"
      />
      <div
        className="surface-panel pointer-events-none absolute -bottom-14 left-4 hidden max-w-[14rem] rounded-[1.4rem] p-4 lg:block"
        data-scene-accent
      >
        <div className="flex items-center gap-2 text-sm text-foreground">
          <Network className="size-4 text-(--brand)" />
          Shared data model
        </div>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Every surface reads and writes the same institutional record.
        </p>
      </div>
    </AnimatedScene>
  );
}

export function RolloutMockup() {
  return (
    <AnimatedScene className="mx-auto max-w-[56rem]" floatSecondary={false}>
      <LaptopFrame
        title="Implementation program"
        screenSrc="/images/screens/laptop/rollout-control-room.webp"
        screenAlt="SquareCampus rollout control room with six-week timeline, migration status, and go-live readiness"
      />
    </AnimatedScene>
  );
}

export function EcosystemMockup() {
  return (
    <AnimatedScene className="mx-auto max-w-[60rem]">
      <LaptopFrame
        title="Connected ecosystem"
        screenSrc="/images/screens/laptop/ecosystem-operations.webp"
        screenAlt="SquareCampus ecosystem operations map connecting audiences, shared backbone, and module groups"
        motionRole="primary"
      />
      <PhoneFrame
        title="Transport live status"
        screenSrc="/images/screens/mobile/transport-live-status.webp"
        screenAlt="SquareCampus parent app showing live bus route progress with stop-by-stop status"
        className="absolute -bottom-6 right-0 hidden max-w-[13rem] md:block lg:-right-2"
        motionRole="secondary"
      />
    </AnimatedScene>
  );
}

export function SecurityMockup() {
  return (
    <AnimatedScene className="mx-auto max-w-[56rem]" floatSecondary={false}>
      <LaptopFrame
        title="Trust architecture"
        screenSrc="/images/screens/laptop/security-audit-center.webp"
        screenAlt="SquareCampus trust and security center with India data residency, encryption posture, and live audit trail"
      />
    </AnimatedScene>
  );
}
