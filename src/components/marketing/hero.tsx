"use client";

import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef } from "react";
import Balancer from "react-wrap-balancer";
import {
  Shield,
  FileCheck,
  Lock,
  Zap,
  Users,
  ArrowRight,
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

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    const prefersReduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const headingWords =
        headingRef.current?.querySelectorAll(".js-word") ?? [];
      const subheadingWords =
        subheadingRef.current?.querySelectorAll(".js-word") ?? [];

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Heading words animate in
      tl.fromTo(
        headingWords,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.04,
        }
      )
        // Subheading follows
        .fromTo(
          subheadingWords,
          { autoAlpha: 0, y: 16 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.015,
          },
          "-=0.3"
        )
        // CTAs fade in
        .fromTo(
          ctaRef.current,
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.5 },
          "-=0.2"
        )
        // Trust strip fades in
        .fromTo(
          trustRef.current,
          { autoAlpha: 0, y: 8 },
          { autoAlpha: 1, y: 0, duration: 0.4 },
          "-=0.15"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const headlineText = "A School OS that keeps everything in sync";
  const subheadlineText =
    "Admissions, academics, attendance, fees, communication—one connected system built for real school operations.";

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-black px-4 py-16 sm:px-6 md:px-8 md:py-24"
    >
      <BackgroundLines />

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        {/* Headline */}
        <h1
          ref={headingRef}
          className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
        >
          <Balancer>
            {headlineText.split(" ").map((word, index) => (
              <span className="js-word inline-block" key={index}>
                {word}&nbsp;
              </span>
            ))}
          </Balancer>
        </h1>

        {/* Subheadline */}
        <p
          ref={subheadingRef}
          className="mt-5 max-w-xl text-base leading-relaxed text-neutral-300 sm:mt-6 sm:text-lg md:text-xl"
        >
          {subheadlineText.split(" ").map((word, index) => (
            <span className="js-word inline-block" key={index}>
              {word}&nbsp;
            </span>
          ))}
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="mt-8 flex w-full flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:justify-center sm:gap-4"
        >
          {/* Primary CTA */}
          <BookCallCta
            context="hero"
            label="Book a demo"
            variant="primary"
            className="w-full max-w-xs justify-center sm:w-auto"
          />

          {/* Secondary CTA */}
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

        {/* Trust Strip */}
        <div
          ref={trustRef}
          className="mt-10 w-full border-t border-white/5 pt-8 sm:mt-14 sm:pt-10"
        >
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-x-8">
            {trustSignals.map((signal) => (
              <li
                key={signal.label}
                className="flex items-center gap-2 text-xs text-neutral-400 sm:text-sm"
              >
                <signal.icon
                  className="h-4 w-4 flex-shrink-0 text-neutral-500"
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
