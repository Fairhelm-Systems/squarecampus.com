"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight, Check, Sparkles } from "@/components/icons";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

// Enhanced background with gradient and grid
function EnhancedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Base radial gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(59,130,246,0.08) 0%, rgba(139,92,246,0.05) 30%, transparent 70%)",
        }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Animated glow orbs */}
      <div className="absolute left-1/4 top-1/3 h-[400px] w-[400px] animate-pulse rounded-full bg-blue-500/[0.06] blur-[100px]" />
      <div
        className="absolute bottom-1/3 right-1/4 h-[400px] w-[400px] animate-pulse rounded-full bg-purple-500/[0.06] blur-[100px]"
        style={{ animationDelay: "1.5s" }}
      />
    </div>
  );
}

// Animated border lines
function AnimatedLine({ position }: { position: "left" | "right" }) {
  const pathRef = useRef<SVGPathElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current || !pathRef.current) return;

    const ctx = gsap.context(() => {
      const length = pathRef.current?.getTotalLength() ?? 0;
      gsap.set(pathRef.current, {
        strokeDasharray: length,
        strokeDashoffset: length,
        opacity: 0,
      });

      gsap.to(pathRef.current, {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 2,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: svgRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const path = position === "left" ? "M1 0V180L70 250V450" : "M70 0V180L1 250V450";

  return (
    <svg
      ref={svgRef}
      className={cn(
        "pointer-events-none absolute hidden h-full lg:block",
        position === "left" ? "left-8" : "right-8"
      )}
      xmlns="http://www.w3.org/2000/svg"
      width="71"
      height="450"
      viewBox="0 0 71 450"
      fill="none"
    >
      <path ref={pathRef} d={path} stroke="url(#cta-gradient)" strokeWidth="1" />
      <defs>
        <linearGradient
          id="cta-gradient"
          x1="35"
          y1="0"
          x2="35"
          y2="450"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3B82F6" stopOpacity="0" />
          <stop offset="0.3" stopColor="#3B82F6" stopOpacity="0.5" />
          <stop offset="0.5" stopColor="#8B5CF6" stopOpacity="0.6" />
          <stop offset="0.7" stopColor="#8B5CF6" stopOpacity="0.5" />
          <stop offset="1" stopColor="#8B5CF6" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Floating particles
function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white/25"
          style={{
            left: `${15 + Math.random() * 70}%`,
            top: `${15 + Math.random() * 70}%`,
            animation: `cta-float ${5 + Math.random() * 6}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes cta-float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-25px) translateX(15px);
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}

const ctaHighlights = [
  "Replace admissions, academics, finance, and communication silos with one OS",
  "Give staff live visibility, parents radical transparency, and students clarity",
  "Launch with guided migration, training, and a dedicated success partner",
];

const ctaSignals = [
  { label: "Go-live", value: "Guided", color: "text-emerald-400" },
  { label: "Uptime", value: "Resilient", color: "text-blue-400" },
  { label: "Teams saved", value: "Hours back", color: "text-purple-400" },
];

export function CTA() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  // GSAP scroll animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        const elements = contentRef.current.children;
        gsap.fromTo(
          elements,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden px-4 py-12 sm:px-6 sm:py-20 md:py-28 lg:px-8"
    >
      {/* Background and particles hidden on mobile for performance */}
      <div className="hidden md:block">
        <EnhancedBackground />
        <FloatingParticles />
      </div>

      <div className="relative mx-auto flex max-w-7xl items-center justify-center">
        <AnimatedLine position="left" />

        <div ref={contentRef} className="relative z-10 mx-auto w-full max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 backdrop-blur-sm md:mb-8">
            <Sparkles className="h-4 w-4 text-blue-400" />
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-neutral-400">
              Your School OS awaits
            </span>
          </div>

          {/* Heading with glow */}
          <div className="relative">
            {/* Glow behind heading */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-32 w-96 rounded-full bg-blue-500/20 blur-[80px]" />
            </div>

            <h2
              className={cn(
                "relative text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl",
                "bg-gradient-to-b from-white via-white to-neutral-400",
                "bg-clip-text text-transparent"
              )}
            >
              Make every school day{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                predictable
              </span>
            </h2>
          </div>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-neutral-400 sm:text-base md:text-lg">
            SquareCampus is the single operating system for modern schools and colleges, digitizing
            every workflow from admissions to alumni.
          </p>

          {/* Signal badges */}
          <div className="mx-auto mt-5 flex flex-wrap items-center justify-center gap-3 md:mt-8">
            {ctaSignals.map((signal) => (
              <div
                key={signal.label}
                className="group flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 backdrop-blur-sm transition-all duration-300 hover:border-white/15 hover:bg-white/[0.06]"
              >
                <span className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-neutral-500">
                  {signal.label}
                </span>
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <span
                  className={cn(
                    "text-[0.7rem] font-semibold uppercase tracking-[0.15em]",
                    signal.color
                  )}
                >
                  {signal.value}
                </span>
              </div>
            ))}
          </div>

          {/* Highlights list */}
          <div className="mx-auto mt-6 max-w-lg md:mt-10">
            <ul className="space-y-3 text-left">
              {ctaHighlights.map((highlight, index) => (
                <li
                  key={index}
                  className="group flex items-start gap-3 rounded-xl border border-transparent px-4 py-2.5 transition-all duration-300 hover:border-white/[0.06] hover:bg-white/[0.02]"
                >
                  <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                    <Check className="h-3 w-3 text-blue-400" />
                  </div>
                  <span className="text-sm leading-relaxed text-neutral-300">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Button */}
          <div className="mt-6 md:mt-10">
            <Link
              href="/contact-us"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full p-[1px]"
            >
              {/* Animated gradient border */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-60" />

              {/* Shimmer effect */}
              <div className="absolute inset-0 overflow-hidden rounded-full">
                <div className="absolute -inset-full animate-cta-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>

              <span className="relative flex items-center gap-2 rounded-full bg-neutral-950 px-8 py-4 text-sm font-medium text-white transition-all duration-300 group-hover:bg-neutral-900 sm:text-base">
                <span>Get a tailored demo</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>

            <p className="mt-4 text-xs text-neutral-500">
              No commitment · 30-minute walkthrough · See your use case
            </p>
          </div>
        </div>

        <AnimatedLine position="right" />
      </div>

      {/* Shimmer animation */}
      <style jsx>{`
        @keyframes cta-shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-cta-shimmer {
          animation: cta-shimmer 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
