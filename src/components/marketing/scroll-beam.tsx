"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollBeamProps {
  /** Gradient colors for the bar */
  colors?: {
    from: string;
    via?: string;
    to: string;
  };
  /** Height of the bar in pixels */
  height?: number;
  /** Z-index for stacking */
  zIndex?: number;
  /** Position: top or bottom */
  position?: "top" | "bottom";
  /** Scrub smoothness (0 = instant, higher = smoother) */
  scrub?: number;
}

export function ScrollBeam({
  colors = { from: "rgb(16, 185, 129)", via: "rgb(59, 130, 246)", to: "rgb(157, 16, 185)" },
  height = 1,
  zIndex = 1000,
  position = "top",
  scrub = 0.3,
}: ScrollBeamProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!barRef.current) return;

    const bar = barRef.current;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const getMaxScroll = () =>
      Math.max(1, ScrollTrigger.maxScroll(window) || document.documentElement.scrollHeight - window.innerHeight);

    const setScale = gsap.quickTo(bar, "scaleX", {
      duration: prefersReducedMotion ? 0 : scrub,
      ease: "power2.out",
    });

    const syncProgress = () => {
      const maxScroll = getMaxScroll();
      const progress = maxScroll === 0 ? 0 : window.scrollY / maxScroll;
      setScale(Math.min(Math.max(progress, 0), 1));
    };

    const refresh = () => ScrollTrigger.refresh();
    const handleResize = () => {
      refresh();
      syncProgress();
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", syncProgress, { passive: true });
    ScrollTrigger.addEventListener("refresh", syncProgress);

    const resizeObserver = new ResizeObserver(() => refresh());
    resizeObserver.observe(document.body);

    const raf = requestAnimationFrame(() => {
      refresh();
      syncProgress();
    });
    const timeout = window.setTimeout(() => {
      refresh();
      syncProgress();
    }, 400);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", syncProgress);
      ScrollTrigger.removeEventListener("refresh", syncProgress);
      resizeObserver.disconnect();
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, [scrub, pathname]);

  const gradientStyle = colors.via
    ? `linear-gradient(to right, ${colors.from}, ${colors.via}, ${colors.to})`
    : `linear-gradient(to right, ${colors.from}, ${colors.to})`;

  return (
    <div
      ref={barRef}
      className="pointer-events-none fixed left-0 w-full origin-left"
      style={{
        [position]: 0,
        height: `${height}px`,
        zIndex,
        transform: "scaleX(0)",
        background: gradientStyle,
      }}
    />
  );
}
