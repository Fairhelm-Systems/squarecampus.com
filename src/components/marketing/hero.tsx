"use client";

import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef, useCallback } from "react";
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
  const contentRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Mouse parallax effect
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!contentRef.current || !glowRef.current) return;

    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    // Normalize mouse position to -1 to 1
    const xNorm = (clientX / innerWidth - 0.5) * 2;
    const yNorm = (clientY / innerHeight - 0.5) * 2;

    // Subtle parallax on content
    gsap.to(contentRef.current, {
      x: xNorm * 8,
      y: yNorm * 5,
      duration: 0.8,
      ease: "power2.out",
    });

    // Move glow orb toward cursor
    gsap.to(glowRef.current, {
      x: xNorm * 60,
      y: yNorm * 40,
      duration: 1.2,
      ease: "power2.out",
    });
  }, []);

  useEffect(() => {
    if (!heroRef.current) return;
    const prefersReduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Split heading into characters for dramatic reveal
      const headingChars =
        headingRef.current?.querySelectorAll(".js-char") ?? [];
      const subheadingWords =
        subheadingRef.current?.querySelectorAll(".js-word") ?? [];
      const trustItems =
        trustRef.current?.querySelectorAll(".js-trust-item") ?? [];
      const ctaButtons =
        ctaRef.current?.querySelectorAll(".js-cta") ?? [];

      // Set initial states
      gsap.set(headingChars, { autoAlpha: 0, y: 40, rotateX: -90 });
      gsap.set(subheadingWords, { autoAlpha: 0, y: 20 });
      gsap.set(ctaButtons, { autoAlpha: 0, y: 20, scale: 0.95 });
      gsap.set(trustItems, { autoAlpha: 0, y: 15, scale: 0.9 });
      gsap.set(glowRef.current, { autoAlpha: 0, scale: 0.8 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.2
      });

      // Glow orb fades in first
      tl.to(glowRef.current, {
        autoAlpha: 1,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
      })
      // Characters cascade in with 3D flip
      .to(
        headingChars,
        {
          autoAlpha: 1,
          y: 0,
          rotateX: 0,
          duration: 0.6,
          stagger: {
            amount: 0.8,
            from: "start",
          },
          ease: "back.out(1.2)",
        },
        "-=0.8"
      )
      // Subheading words wave in
      .to(
        subheadingWords,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          stagger: {
            amount: 0.4,
            from: "center",
          },
        },
        "-=0.3"
      )
      // CTAs pop in with elastic
      .to(
        ctaButtons,
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
        "-=0.2"
      )
      // Trust items stagger in
      .to(
        trustItems,
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: {
            amount: 0.5,
            from: "edges",
          },
          ease: "back.out(1.4)",
        },
        "-=0.3"
      );

      // Continuous floating animation on trust icons
      trustItems.forEach((item, i) => {
        const icon = item.querySelector(".js-trust-icon");
        if (icon) {
          gsap.to(icon, {
            y: -3,
            duration: 1.5 + i * 0.2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: i * 0.15,
          });
        }
      });

      // Subtle pulse on primary CTA
      const primaryCta = ctaRef.current?.querySelector(".js-cta-primary");
      if (primaryCta) {
        gsap.to(primaryCta, {
          boxShadow: "0 0 30px rgba(59, 130, 246, 0.4), 0 0 60px rgba(59, 130, 246, 0.2)",
          duration: 1.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      // Breathing glow orb
      gsap.to(glowRef.current, {
        scale: 1.1,
        opacity: 0.7,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.5,
      });

    }, heroRef);

    // Add mouse move listener for parallax
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  const headlineText = "A School OS that keeps everything in sync";
  const subheadlineText =
    "Admissions, academics, attendance, fees, communication—one connected system built for real school operations.";

  // Split text into characters for heading
  const renderHeadingChars = (text: string) => {
    return text.split(" ").map((word) => (
      <span key={`word-${word}`} className="inline-block whitespace-nowrap">
        {[...word].map((char, pos) => (
          <span
            key={`${word}-${pos}-${char}`}
            className="js-char inline-block"
            style={{ transformStyle: "preserve-3d" }}
          >
            {char}
          </span>
        ))}
        <span className="inline-block">&nbsp;</span>
      </span>
    ));
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-black px-4 py-16 sm:px-6 md:px-8 md:py-24"
    >
      <BackgroundLines />

      {/* Interactive glow orb that follows cursor */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="h-[500px] w-[500px] rounded-full bg-linear-to-r from-blue-500/20 via-purple-500/15 to-cyan-500/20 blur-[100px]" />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center"
      >
        {/* Headline with character animation */}
        <h1
          ref={headingRef}
          className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl perspective-[1000px]"
        >
          <Balancer>
            {renderHeadingChars(headlineText)}
          </Balancer>
        </h1>

        {/* Subheadline */}
        <p
          ref={subheadingRef}
          className="mt-5 max-w-xl text-base leading-relaxed text-neutral-300 sm:mt-6 sm:text-lg md:text-xl"
        >
          {subheadlineText.split(" ").map((word) => (
            <span className="js-word inline-block" key={`sub-${word}`}>
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
            className="js-cta js-cta-primary w-full max-w-xs justify-center sm:w-auto"
          />

          {/* Secondary CTA */}
          <Link
            href="#why-different"
            className={cn(
              "js-cta group inline-flex w-full max-w-xs items-center justify-center gap-2",
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
                className="js-trust-item flex items-center gap-2 text-xs text-neutral-400 sm:text-sm"
              >
                <signal.icon
                  className="js-trust-icon h-4 w-4 shrink-0 text-neutral-500 transition-colors duration-300 group-hover:text-blue-400"
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
