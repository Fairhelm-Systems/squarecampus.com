"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type ParallaxConfig = {
  strength: number;
};

const parallaxItems = new Map<HTMLElement, ParallaxConfig>();
let rafId: number | null = null;
let listening = false;

const updateParallax = () => {
  rafId = null;
  const viewportHeight = window.innerHeight || 1;

  parallaxItems.forEach((config, el) => {
    const rect = el.getBoundingClientRect();
    if (rect.bottom < -200 || rect.top > viewportHeight + 200) return;

    const progress = (rect.top + rect.height / 2 - viewportHeight / 2) / viewportHeight;
    const offset = -progress * config.strength;
    el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
  });
};

const requestParallaxUpdate = () => {
  if (rafId !== null) return;
  rafId = window.requestAnimationFrame(updateParallax);
};

const addParallaxItem = (el: HTMLElement, config: ParallaxConfig) => {
  parallaxItems.set(el, config);
  if (!listening) {
    window.addEventListener("scroll", requestParallaxUpdate, { passive: true });
    window.addEventListener("resize", requestParallaxUpdate);
    listening = true;
  }
  requestParallaxUpdate();
};

const removeParallaxItem = (el: HTMLElement) => {
  parallaxItems.delete(el);
  if (parallaxItems.size === 0 && listening) {
    window.removeEventListener("scroll", requestParallaxUpdate);
    window.removeEventListener("resize", requestParallaxUpdate);
    if (rafId !== null) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }
    listening = false;
  }
};

type ParallaxSectionProps = {
  children: ReactNode;
  strength?: number;
  className?: string;
  glow?: boolean;
  borders?: boolean;
};

export function ParallaxSection({
  children,
  strength = 24,
  className,
  glow = true,
  borders = true,
}: ParallaxSectionProps) {
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!innerRef.current) return;
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    addParallaxItem(innerRef.current, { strength });
    return () => {
      if (!innerRef.current) return;
      innerRef.current.style.transform = "";
      removeParallaxItem(innerRef.current);
    };
  }, [strength]);

  return (
    <div className={cn("relative", className)}>
      {(glow || borders) && (
        <div className="pointer-events-none absolute inset-0">
          {glow && (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.08),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(168,85,247,0.06),transparent_45%),radial-gradient(circle_at_40%_80%,rgba(14,165,233,0.05),transparent_45%)] opacity-60" />
          )}
          {borders && (
            <div className="mx-auto h-full max-w-6xl px-4 md:px-8">
              <div className="relative h-full">
                <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent opacity-60 shadow-[0_0_12px_rgba(148,163,184,0.25)]" />
                <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent opacity-60 shadow-[0_0_12px_rgba(148,163,184,0.25)]" />
              </div>
            </div>
          )}
        </div>
      )}
      <div ref={innerRef} className={cn("relative z-10 will-change-transform")}>
        {children}
      </div>
    </div>
  );
}
