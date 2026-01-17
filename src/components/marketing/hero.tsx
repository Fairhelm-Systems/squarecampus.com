"use client";

import gsap from "gsap";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import Balancer from "react-wrap-balancer";
import {
  ArrowRight,
  FileCheck,
  Lock,
  Shield,
  Users,
  Zap,
} from "@/components/icons";
import { cn } from "@/lib/utils";
import { BackgroundLines } from "./backgrounds/dot-and-glow";
import { BookCallCta } from "./ctas";

const trustSignals = [
  { icon: Shield, label: "Security-first architecture" },
  { icon: FileCheck, label: "Audit-friendly records" },
  { icon: Lock, label: "Data ownership & privacy" },
  { icon: Zap, label: "Built for peak-hour loads" },
  { icon: Users, label: "Minimal training required" },
];

// Detect if device is mobile/tablet or has touch
function useDeviceDetection() {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(true); // Default true for SSR/mobile-first

  useEffect(() => {
    const checkDevice = () => {
      const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 1024;
      setIsMobileOrTablet(hasTouch || isSmallScreen);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  return isMobileOrTablet;
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const isMobileOrTablet = useDeviceDetection();

  // Mouse parallax effect - ONLY on desktop
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isMobileOrTablet) return;
      if (!contentRef.current || !glowRef.current) return;

      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const xNorm = (clientX / innerWidth - 0.5) * 2;
      const yNorm = (clientY / innerHeight - 0.5) * 2;

      gsap.to(contentRef.current, {
        x: xNorm * 8,
        y: yNorm * 5,
        duration: 0.8,
        ease: "power2.out",
      });

      gsap.to(glowRef.current, {
        x: xNorm * 60,
        y: yNorm * 40,
        duration: 1.2,
        ease: "power2.out",
      });
    },
    [isMobileOrTablet]
  );

  useEffect(() => {
    if (!heroRef.current || hasAnimated.current) return;

    const prefersReduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Skip all animations if reduced motion preferred
    if (prefersReduced) return;

    hasAnimated.current = true;

    const ctx = gsap.context(() => {
      // DESKTOP ONLY: Add subtle enhancements (content is already visible)
      if (!isMobileOrTablet) {
        // Gentle glow breathing - doesn't affect LCP
        gsap.to(glowRef.current, {
          scale: 1.1,
          opacity: 0.8,
          duration: 3,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 0.5,
        });

        // Floating trust icons
        const trustIcons = heroRef.current?.querySelectorAll(".js-trust-icon") ?? [];
        trustIcons.forEach((icon, i) => {
          gsap.to(icon, {
            y: -3,
            duration: 1.5 + i * 0.2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 0.5 + i * 0.1,
          });
        });

        // CTA glow pulse
        const primaryCta = heroRef.current?.querySelector(".js-cta-primary");
        if (primaryCta) {
          gsap.to(primaryCta, {
            boxShadow: "0 0 30px rgba(59, 130, 246, 0.4), 0 0 60px rgba(59, 130, 246, 0.2)",
            duration: 1.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 0.3,
          });
        }
      }
    }, heroRef);

    // Only add mouse listener on desktop
    if (!isMobileOrTablet) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove, isMobileOrTablet]);

  const headlineText = "A School OS that keeps everything in sync";
  const subheadlineText =
    "Admissions, academics, attendance, fees, communication—one connected system built for real school operations.";

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-black px-4 py-16 sm:px-6 md:px-8 md:py-24"
    >
      <BackgroundLines />

      {/* Glow orb - smaller on mobile */}
      <div
        ref={glowRef}
        className={cn(
          "pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-r from-blue-500/20 via-purple-500/15 to-cyan-500/20",
          isMobileOrTablet
            ? "h-[300px] w-[300px] blur-[60px]"
            : "h-[500px] w-[500px] blur-[100px]"
        )}
      />

      <div
        ref={contentRef}
        className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center"
      >
        {/* Headline - ALWAYS VISIBLE, no animation hiding */}
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
          <Balancer>{headlineText}</Balancer>
        </h1>

        {/* Subheadline - ALWAYS VISIBLE */}
        <p className="mt-5 max-w-xl text-base leading-relaxed text-neutral-300 sm:mt-6 sm:text-lg md:text-xl">
          {subheadlineText}
        </p>

        {/* CTAs - ALWAYS VISIBLE */}
        <div className="mt-8 flex w-full flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:justify-center sm:gap-4">
          <BookCallCta
            context="hero"
            label="Book a demo"
            variant="primary"
            className="js-cta-primary w-full max-w-xs justify-center sm:w-auto"
          />

          <Link
            href="#why-different"
            className={cn(
              "group inline-flex w-full max-w-xs items-center justify-center gap-2",
              "rounded-full border border-white/10 bg-white/5 px-5 py-2.5",
              "text-sm font-medium text-neutral-200",
              "transition-all duration-200 hover:border-white/20 hover:bg-white/10",
              "sm:w-auto"
            )}
          >
            <span>See how it works</span>
            <ArrowRight
              className="h-4 w-4 text-neutral-400 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* Trust Strip - ALWAYS VISIBLE */}
        <div className="mt-10 w-full border-t border-white/5 pt-8 sm:mt-14 sm:pt-10">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-x-8">
            {trustSignals.map((signal) => (
              <li
                key={signal.label}
                className="flex items-center gap-2 text-xs text-neutral-400 sm:text-sm"
              >
                <signal.icon
                  className="js-trust-icon h-4 w-4 shrink-0 text-neutral-500"
                  aria-hidden="true"
                />
                <span>{signal.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
