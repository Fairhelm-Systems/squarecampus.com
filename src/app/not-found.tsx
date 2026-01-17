"use client";

import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { BookCallCta } from "@/components/marketing/ctas";
import { LinkButton } from "@/components/marketing/link-button";
import { BookOpen, GraduationCap, Home } from "@/icons";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!containerRef.current || hasAnimated.current) return;

    const prefersReduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    hasAnimated.current = true;

    const ctx = gsap.context(() => {
      // Floating books animation
      gsap.to(".floating-book", {
        y: -20,
        rotation: 5,
        duration: 2,
        stagger: 0.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Pulsing graduation cap
      gsap.to(".grad-cap", {
        scale: 1.1,
        duration: 1.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Decorative building fade in (non-blocking, just decorative)
      gsap.fromTo(
        ".js-building",
        { opacity: 0, scale: 0.95 },
        { opacity: 0.05, scale: 1, duration: 1.2, delay: 0.3, ease: "power2.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const valueProps = [
    { label: "Core Modules", desc: "One Platform" },
    { label: "Guided Rollout", desc: "Go Live Support" },
    { label: "Uptime SLA", desc: "Committed" },
  ];

  const bookPositions = [
    { left: "15%", top: "20%" },
    { left: "30%", top: "45%" },
    { left: "45%", top: "20%" },
    { left: "60%", top: "45%" },
    { left: "75%", top: "20%" },
    { left: "90%", top: "45%" },
  ];

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 px-4 py-12 text-white"
    >
      {/* Animated background orbs - CSS only, no JS needed */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-purple-500/10 blur-[128px]" />
      </div>

      {/* Floating educational elements */}
      <div className="pointer-events-none absolute inset-0">
        {bookPositions.map((pos) => (
          <div
            key={`book-${pos.left}-${pos.top}`}
            className="floating-book absolute"
            style={{ left: pos.left, top: pos.top }}
          >
            <BookOpen className="h-8 w-8 text-blue-400/20" />
          </div>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* 404 Number with shimmer - ALWAYS VISIBLE */}
        <div className="relative mb-8 inline-block">
          <h1 className="text-shimmer-404 relative text-[120px] font-bold leading-none tracking-tight md:text-[180px]">
            404
          </h1>
          <div className="grad-cap absolute -right-8 -top-8 md:-right-12 md:-top-12">
            <GraduationCap className="h-12 w-12 text-sky-400 md:h-16 md:w-16" />
          </div>
        </div>

        {/* Main message - ALWAYS VISIBLE */}
        <div className="mb-6">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Oops! Class Dismissed on This Page
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-neutral-300 md:text-xl">
            Looks like this page skipped class today. But while you&apos;re here, did you know
            SquareCampus powers
            <span className="font-semibold text-white"> complete school operations</span>—from
            admissions to graduation, in one unified platform?
          </p>
        </div>

        {/* Quick value props - ALWAYS VISIBLE */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {valueProps.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-200 hover:border-white/20 hover:bg-white/10"
            >
              <div className="text-2xl font-bold text-white">{stat.label}</div>
              <div className="text-xs text-neutral-400">{stat.desc}</div>
            </div>
          ))}
        </div>

        {/* Friendly tips - ALWAYS VISIBLE */}
        <div className="mb-10 inline-flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur-sm">
          <p className="text-sm text-neutral-400">Here&apos;s what might have happened:</p>
          <ul className="space-y-2 text-sm text-neutral-300">
            <li className="flex items-start gap-2">
              <span className="mt-1 text-blue-400">•</span>
              <span>The link you followed might be outdated or broken</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-purple-400">•</span>
              <span>You might have typed the URL incorrectly</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-pink-400">•</span>
              <span>We may have moved or removed this page</span>
            </li>
          </ul>
        </div>

        {/* Navigation buttons - ALWAYS VISIBLE */}
        <div className="mb-6 flex flex-wrap items-center justify-center gap-4">
          <BookCallCta context="not-found" label="Book a Demo" variant="primary" />
          <LinkButton
            href="/"
            variant="dark"
            className="group inline-flex items-center gap-1.5"
          >
            <span>Back to Home</span>
            <Home className="h-4 w-4" />
          </LinkButton>
        </div>

        {/* Quick links - ALWAYS VISIBLE */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-4 text-sm">
          <Link href="/features" className="text-sky-400 underline-offset-4 hover:underline">
            Explore Features
          </Link>
          <span className="text-neutral-600">•</span>
          <Link href="/ecosystem" className="text-sky-400 underline-offset-4 hover:underline">
            Platform Ecosystem
          </Link>
          <span className="text-neutral-600">•</span>
          <Link href="/why-different" className="text-sky-400 underline-offset-4 hover:underline">
            Why Different
          </Link>
        </div>

        {/* Additional help - ALWAYS VISIBLE */}
        <p className="mt-8 text-sm text-neutral-500">
          Still can&apos;t find what you&apos;re looking for?{" "}
          <Link href="/contact-us" className="text-sky-400 underline-offset-4 hover:underline">
            Contact our team
          </Link>
        </p>
      </div>

      {/* Bottom decorative element - starts hidden, fades in via GSAP */}
      <div className="js-building pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 opacity-0">
        <svg
          width="800"
          height="400"
          viewBox="0 0 800 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white"
          aria-hidden="true"
        >
          {/* School building silhouette */}
          <rect x="200" y="150" width="400" height="250" fill="currentColor" opacity="0.1" />
          <polygon points="200,150 400,50 600,150" fill="currentColor" opacity="0.15" />
          <rect x="350" y="250" width="100" height="150" fill="currentColor" opacity="0.05" />
          {/* Windows - 3 rows x 4 cols */}
          <rect x="220" y="180" width="40" height="40" fill="currentColor" opacity="0.08" />
          <rect x="310" y="180" width="40" height="40" fill="currentColor" opacity="0.08" />
          <rect x="400" y="180" width="40" height="40" fill="currentColor" opacity="0.08" />
          <rect x="490" y="180" width="40" height="40" fill="currentColor" opacity="0.08" />
          <rect x="220" y="240" width="40" height="40" fill="currentColor" opacity="0.08" />
          <rect x="310" y="240" width="40" height="40" fill="currentColor" opacity="0.08" />
          <rect x="400" y="240" width="40" height="40" fill="currentColor" opacity="0.08" />
          <rect x="490" y="240" width="40" height="40" fill="currentColor" opacity="0.08" />
          <rect x="220" y="300" width="40" height="40" fill="currentColor" opacity="0.08" />
          <rect x="310" y="300" width="40" height="40" fill="currentColor" opacity="0.08" />
          <rect x="400" y="300" width="40" height="40" fill="currentColor" opacity="0.08" />
          <rect x="490" y="300" width="40" height="40" fill="currentColor" opacity="0.08" />
        </svg>
      </div>
    </div>
  );
}
