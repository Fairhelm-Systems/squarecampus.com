"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  once?: boolean;
  staggerChildren?: boolean;
}

/**
 * Scroll-triggered entrance. All motion is CSS transitions (see the
 * `.reveal-*` utilities in globals.css); this component only toggles a
 * class when the node scrolls into view.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  distance = 20,
  once = true,
  staggerChildren = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    if (prefersReducedMotion) {
      node.classList.add("is-revealed");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            if (!once) {
              node.classList.remove("is-revealed");
            }
            continue;
          }

          node.classList.add("is-revealed");

          if (once) {
            observer.disconnect();
          }
        }
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.05,
      }
    );

    observer.observe(node);

    // Never leave content hidden if the observer misfires.
    const timeout = setTimeout(() => node.classList.add("is-revealed"), 4000);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, [once, prefersReducedMotion]);

  return (
    <div
      ref={ref}
      className={cn("reveal-root", staggerChildren && "reveal-stagger", className)}
      style={
        {
          "--reveal-delay": `${delay}ms`,
          "--reveal-distance": `${distance}px`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
