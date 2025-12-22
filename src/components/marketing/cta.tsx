"use client";

import gsap from "gsap";
import Link from "next/link";
import React, { useEffect } from "react";
import { ArrowRight } from "@/components/icons";
import { useGsapReveal } from "@/lib/gsap-utils";
import { cn } from "@/lib/utils";

const BackgroundGrid = ({ className }: { className?: string }) => {
  const ref = React.useRef<HTMLDivElement | null>(null);

  useGsapReveal(ref, { y: 0, opacity: 0, duration: 1 });

  return (
    <div
      ref={ref}
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div
        className="absolute h-full w-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(40,40,40,0.8) 0%, rgba(30,30,30,0.6) 30%, rgba(20,20,20,0.6) 55%, rgba(0,0,0,0.4) 80%)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.28) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.28) 1px, transparent 1px)",
            backgroundSize: "120px 120px",
            opacity: 0.18,
          }}
        />
      </div>
    </div>
  );
};

const LineGradient = ({ position }: { position: "left" | "right" }) => {
  const ref = React.useRef<SVGSVGElement | null>(null);
  const pathRef = React.useRef<SVGPathElement | null>(null);

  useEffect(() => {
    if (!ref.current || !pathRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const length = pathRef.current?.getTotalLength() ?? 0;
          gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length, opacity: 0 });
          gsap.to(pathRef.current, { strokeDashoffset: 0, opacity: 1, duration: 1.5, ease: "power2.inOut" });
          observer.disconnect();
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const path =
    position === "left"
      ? "M1 0.23938V207.654L88 285.695C88 285.695 87.5 493.945 88 567.813"
      : "M88 0.23938V207.654L1 285.695C1 285.695 1.5 493.945 1 567.813";

  return (
    <svg
      ref={ref}
      className={cn(
        "pointer-events-none absolute hidden h-full lg:block",
        position === "left" ? "left-0" : "right-0"
      )}
      xmlns="http://www.w3.org/2000/svg"
      width="89"
      height="568"
      viewBox="0 0 89 568"
      fill="none"
    >
      <path ref={pathRef} d={path} stroke="url(#animation_gradient)" />
      <path d={path} stroke={`url(#paint0_linear_${position})`} />
      <defs>
        <linearGradient
          id="animation_gradient"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2EB9DF" stopOpacity="0" />
          <stop stopColor="#2EB9DF" />
          <stop offset="1" stopColor="#9E00FF" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id={`paint0_linear_${position}`}
          x1={position === "left" ? "1" : "88"}
          y1="4.50012"
          x2={position === "left" ? "1" : "88"}
          y2="568"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6F6F6F" stopOpacity="0.3" />
          <stop offset="0.8" stopColor="#6F6F6F" />
          <stop offset="1" stopColor="#6F6F6F" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const ctaHighlights = [
  "Replace admissions, academics, finance, and communication silos with one OS.",
  "Give staff live visibility, parents radical transparency, and students clarity.",
  "Launch in under 7 days with migration, training, and a dedicated success partner.",
];

const ctaSignals = [
  { label: "Go-live", value: "< 7 days" },
  { label: "Uptime", value: "99.9%" },
  { label: "Teams saved", value: "15–20 hrs/wk" },
];

export function CTA() {
  const ref = React.useRef<HTMLDivElement | null>(null);

  useGsapReveal(ref, { y: 24, duration: 0.8 });

  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8">
      <div className="relative mx-auto flex min-h-[30vh] max-w-7xl items-center justify-center md:min-h-[60vh]">
        <LineGradient position="left" />
        <div
          ref={ref}
          className="relative z-10 mx-auto w-full max-w-3xl py-8 text-center sm:py-10 md:py-12"
        >
          <BackgroundGrid className="z-0" />

          <div className="relative z-10 space-y-5 sm:space-y-6 md:space-y-8">
            <h2
              className={cn(
                "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight",
                "bg-gradient-to-b from-[#A7A7A7] via-[#FFFFFF] to-[#787878]",
                "bg-clip-text text-transparent"
              )}
            >
              Make every school day predictable
            </h2>

            <p className="mx-auto max-w-md text-xs text-neutral-400 sm:max-w-lg sm:text-sm md:max-w-xl md:text-base">
              SquareCampus is the single operating system for modern schools and colleges,
              digitizing every workflow from admissions to alumni so teams execute faster and
              families always know what&apos;s going on.
            </p>

            <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-2 text-[0.65rem] uppercase tracking-[0.35em] text-white/60 sm:gap-3 sm:text-[0.7rem]">
              {ctaSignals.map((signal) => (
                <span
                  key={signal.label}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/70"
                >
                  {signal.label} · {signal.value}
                </span>
              ))}
            </div>

            <ul className="mx-auto max-w-sm space-y-2.5 text-left text-[0.78rem] text-neutral-200 sm:max-w-md sm:text-sm">
              {ctaHighlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-2 text-neutral-300">
                  <span className="mt-1 inline-flex h-1.5 w-1.5 flex-none rounded-full bg-gradient-to-br from-sky-400 to-violet-500" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>

            <div className="pt-3">
              <Link
                href="#contact-us"
                className={cn(
                  "inline-flex items-center justify-center gap-2 rounded-full",
                  "bg-primary text-primary-foreground text-xs font-semibold sm:text-sm md:text-base",
                  "h-10 px-6 sm:h-11 sm:px-8 md:h-12 md:px-10",
                  "shadow-[0_12px_40px_rgba(59,130,246,0.25)] hover:shadow-[0_16px_48px_rgba(59,130,246,0.35)]",
                  "transition-transform duration-200 hover:-translate-y-0.5",
                  "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-neutral-950"
                )}
              >
                <span>Get a tailored demo</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
        <LineGradient position="right" />
      </div>
    </section>
  );
}
