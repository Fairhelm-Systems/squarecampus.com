"use client";

import { useEffect } from "react";
import gsap from "gsap";

type RevealOptions = {
  y?: number;
  opacity?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  selector?: string;
  threshold?: number;
  once?: boolean;
};

export function useGsapReveal(
  ref: React.RefObject<HTMLElement | null>,
  {
    y = 20,
    opacity = 0,
    duration = 0.6,
    delay = 0,
    stagger = 0,
    selector,
    threshold = 0.2,
    once = true,
  }: RevealOptions = {}
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = selector ? Array.from(el.querySelectorAll(selector)) : [el];
    if (!targets.length) return;

    gsap.set(targets, { opacity, y });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          gsap.fromTo(
            targets,
            { y, opacity },
            { y: 0, opacity: 1, duration, delay, stagger, ease: "power2.out" }
          );
          if (once) observer.disconnect();
        });
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, y, opacity, duration, delay, stagger, selector, threshold, once]);
}
