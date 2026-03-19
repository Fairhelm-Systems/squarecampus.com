"use client";

import { animate, stagger } from "animejs";
import type { ReactNode } from "react";
import { useEffect, useEffectEvent, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  once?: boolean;
  staggerChildren?: boolean;
}

export function Reveal({
  children,
  className,
  delay = 0,
  distance = 20,
  once = true,
  staggerChildren = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const hasAnimatedRef = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  const runAnimation = useEffectEvent(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    animate(node, {
      opacity: [0, 1],
      y: [distance, 0],
      duration: 820,
      delay,
      ease: "out(3)",
    });

    if (!staggerChildren) {
      return;
    }

    const targets = node.querySelectorAll("[data-reveal-item]");
    if (!targets.length) {
      return;
    }

    animate(targets, {
      opacity: [0, 1],
      y: [16, 0],
      delay: stagger(80, { start: delay + 60 }),
      duration: 700,
      ease: "out(3)",
    });
  });

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

    if (once && hasAnimatedRef.current) {
      node.style.opacity = "1";
      node.style.transform = "none";
      return;
    }

    node.style.opacity = "0";
    node.style.transform = `translateY(${distance}px)`;

    if (staggerChildren) {
      const targets = node.querySelectorAll("[data-reveal-item]");
      for (const target of targets) {
        const element = target as HTMLElement;
        element.style.opacity = "0";
        element.style.transform = "translateY(16px)";
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          if (once && hasAnimatedRef.current) {
            continue;
          }

          hasAnimatedRef.current = true;
          runAnimation();

          if (once) {
            observer.disconnect();
          }
        }
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.18,
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [delay, distance, once, prefersReducedMotion, runAnimation, staggerChildren]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
