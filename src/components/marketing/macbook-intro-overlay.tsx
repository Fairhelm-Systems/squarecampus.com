"use client";

import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { DashboardShowcase } from "@/components/marketing/hero";

export const MacbookIntroOverlay = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stackRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
const [mounted, setMounted] = useState(false);
const [done, setDone] = useState(false);
const fallbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasSeenRef = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const hasSeen = localStorage.getItem("sc_intro_seen") === "1";
    hasSeenRef.current = hasSeen;
    if (hasSeen) {
      setDone(true);
    }
  }, [mounted]);

  useEffect(() => {
    if (done || !mounted || hasSeenRef.current) return;

    // Responsive values based on screen width
    const isMobile = window.innerWidth < 640;
    const isTablet = window.innerWidth >= 640 && window.innerWidth < 768;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Calculate safe scale to keep content within viewport
    let baseScale = isMobile ? 3 : isTablet ? 5 : 6;

    // For mobile, calculate scale to fit text width
    if (isMobile) {
      // Estimate: text "SquareCampus" at text-2xl is ~200px wide initially
      const estimatedTextWidth = 200;
      const maxSafeScale = (viewportWidth * 0.85) / estimatedTextWidth; // 85% of viewport for safety
      baseScale = Math.min(3, Math.max(2.2, maxSafeScale)); // Between 2.2x and 3x
    }

    // Additional height constraint for mobile vertical layout
    const minViewportHeight = isMobile ? 600 : isTablet ? 600 : 700;
    const heightScale =
      viewportHeight < minViewportHeight
        ? (viewportHeight / minViewportHeight) * baseScale
        : baseScale;
    const safeScale = Math.max(2, Math.min(baseScale, heightScale)); // Min 2x, max baseScale

    const logoMovement = isMobile ? 0 : isTablet ? -75 : -135; // No horizontal movement on mobile, more left on desktop
    const finalY = -viewportHeight * 0.25; // Shift up during zoom

    const ctx = gsap.context(() => {
      gsap.set(containerRef.current, { opacity: 1 });
      gsap.set(stackRef.current, { transformOrigin: "center center", scale: 1, y: 0 });
      gsap.set(logoRef.current, { x: 0 });
      gsap.set(textRef.current, { opacity: 0 });
      gsap.set(bgRef.current, { opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => setDone(true),
        delay: 0.1,
      });

      // Zoom MacBook (responsive scale with viewport constraints)
      tl.to(
        stackRef.current,
        { scale: safeScale, y: finalY, duration: 0.9, ease: "power3.inOut" },
        0
      );

      // Logo moves left (responsive movement)
      tl.to(logoRef.current, { x: logoMovement, duration: 0.6, ease: "power2.out" }, 0.15);

      // Text emerges from behind logo (fades in while logo moves)
      tl.to(textRef.current, { opacity: 1, duration: 0.4, ease: "power2.out" }, 0.3);

      // Dark background fades in
      tl.to(bgRef.current, { opacity: 1, duration: 0.5, ease: "power2.inOut" }, 0.35);

      // Fade out everything
      tl.to(containerRef.current, { autoAlpha: 0, duration: 0.35, ease: "power1.out" }, 0.95);
    }, containerRef);

    return () => ctx.revert();
  }, [done, mounted]);

  useEffect(() => {
    if (!mounted || done || hasSeenRef.current) return;
    // Safety net: never block the page if animation doesn't complete.
    fallbackTimer.current = setTimeout(() => setDone(true), 1600);
    return () => {
      if (fallbackTimer.current) clearTimeout(fallbackTimer.current);
    };
  }, [mounted, done]);

  useEffect(() => {
    if (!done || !mounted || hasSeenRef.current) return;
    localStorage.setItem("sc_intro_seen", "1");
  }, [done, mounted]);

  if (!mounted || done) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black"
      aria-hidden="true"
    >
      <div ref={stackRef} className="relative flex flex-col items-center gap-6">
        {/* Intro display container */}
        <div className="relative w-[360px] sm:w-[560px] md:w-[760px]">
          <div className="relative rounded-[32px] border border-neutral-800/70 bg-neutral-950/95 p-4 shadow-[0_30px_100px_rgba(0,0,0,0.7)]">
            <div className="absolute inset-0 rounded-[32px] bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.08),transparent_35%)]" />
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-neutral-700/60 bg-neutral-950">
              <DashboardShowcase />
            </div>
            <div className="mx-auto mt-5 h-2.5 w-32 rounded-t-xl bg-gradient-to-b from-neutral-800 to-neutral-900" />
            <div className="mx-auto h-2 w-44 rounded-b-lg bg-gradient-to-b from-neutral-900 to-neutral-950" />
          </div>

          {/* Dark background - fades in behind logo/text */}
          <div
            ref={bgRef}
            className="absolute inset-0 bg-black/90 rounded-xl"
            style={{ top: "-10%", bottom: "-10%", left: "-10%", right: "-10%" }}
          />

          {/* Logo + Text overlay - positioned higher */}
          <div
            className="absolute inset-0 flex items-center justify-center z-10"
            style={{ top: "-5%" }}
          >
            <div className="relative">
              {/* Logo - starts centered, moves left */}
              <div
                ref={logoRef}
                className="translate-y-[5px] sm:translate-y-[8px] md:translate-y-[10px] relative h-10 w-10 sm:h-16 sm:w-16 md:h-20 md:w-20"
              >
                <Image
                  src="/images/marketing/logo-light.png"
                  alt="SquareCampus"
                  fill
                  sizes="(max-width: 640px) 40px, (max-width: 768px) 64px, 80px"
                  className="object-contain"
                  style={{ imageRendering: "-webkit-optimize-contrast" }}
                  priority
                />
              </div>

              {/* Text - below logo on mobile, to the right on larger screens */}
              <div
                ref={textRef}
                className="absolute
                top-[44px] left-1/2 -translate-x-1/2 text-center
                sm:top-1/2 sm:left-[4px] sm:-translate-x-0 sm:-translate-y-1/2 sm:translate-y-[-20px] sm:text-left
                md:left-[2px] md:translate-y-[-24px] md:translate-x-[-24px]
                space-y-0.5 sm:space-y-1"
              >
                <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight whitespace-nowrap">
                  SquareCampus
                </p>
                <p className="text-sm sm:text-base md:text-lg uppercase tracking-[0.28em] text-white/70 whitespace-nowrap">
                  Modern School OS
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
