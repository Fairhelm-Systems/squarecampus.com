"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { BookOpen, GraduationCap, Home } from "@/icons";
import { BookCallCta } from "@/components/marketing/ctas";
import { LinkButton } from "@/components/marketing/link-button";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

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

      // Shimmer on 404 text
      gsap.fromTo(
        ".shimmer",
        { x: "-100%" },
        {
          x: "100%",
          duration: 2,
          ease: "power2.inOut",
          repeat: -1,
          repeatDelay: 1,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 px-4 py-12 text-white"
    >
      {/* Animated background orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-purple-500/10 blur-[128px]" />
      </div>

      {/* Floating educational elements */}
      <div className="pointer-events-none absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="floating-book absolute"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
          >
            <BookOpen className="h-8 w-8 text-blue-400/20" />
          </div>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* 404 Number with shimmer */}
        <div className="relative mb-8 inline-block">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "backOut" }}
            className="relative overflow-hidden bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-[120px] font-bold leading-none tracking-tight text-transparent md:text-[180px]"
          >
            404
            <div className="shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </motion.h1>
          <div className="grad-cap absolute -right-8 -top-8 md:-right-12 md:-top-12">
            <GraduationCap className="h-12 w-12 text-sky-400 md:h-16 md:w-16" />
          </div>
        </div>

        {/* Main message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Oops! Class Dismissed on This Page
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-neutral-300 md:text-xl">
            Looks like this page skipped class today. But while you're here, did you know SquareCampus powers
            <span className="font-semibold text-white"> complete school operations</span>-from admissions to
            graduation, in one unified platform?
          </p>
        </motion.div>

        {/* Quick value props */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8 grid gap-4 sm:grid-cols-3"
        >
          {[
            { label: "12 Modules", desc: "One Platform" },
            { label: "7 Days", desc: "To Go Live" },
            { label: "99.9%", desc: "Uptime SLA" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-200 hover:border-white/20 hover:bg-white/10"
            >
              <div className="text-2xl font-bold text-white">{stat.label}</div>
              <div className="text-xs text-neutral-400">{stat.desc}</div>
            </div>
          ))}
        </motion.div>

        {/* Friendly tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-10 inline-flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur-sm"
        >
          <p className="text-sm text-neutral-400">Here's what might have happened:</p>
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
        </motion.div>

        {/* Navigation buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-6 flex flex-wrap items-center justify-center gap-4"
        >
          <BookCallCta
            context="features-hero"
            label="Book a Demo"
            variant="primary"
          />
          <LinkButton
            href={"/"}
            variant={"dark"}
            className={"group inline-flex items-center gap-1.5"}
          >
            <span>Back to Home</span>
            <Home className={"w-4 h-4"} />
          </LinkButton>
        </motion.div>

        {/* Quick links to key pages */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-8 flex flex-wrap items-center justify-center gap-4 text-sm"
        >
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
        </motion.div>

        {/* Additional help */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 text-sm text-neutral-500"
        >
          Still can't find what you're looking for?{" "}
          <Link href="/#contact-us" className="text-sky-400 underline-offset-4 hover:underline">
            Contact our team
          </Link>
        </motion.p>
      </div>

      {/* Bottom decorative element */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.05, scale: 1 }}
        transition={{ delay: 0.4, duration: 1.2 }}
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2"
      >
        <svg
          width="800"
          height="400"
          viewBox="0 0 800 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white"
        >
          {/* School building silhouette */}
          <rect x="200" y="150" width="400" height="250" fill="currentColor" opacity="0.1" />
          <polygon points="200,150 400,50 600,150" fill="currentColor" opacity="0.15" />
          <rect x="350" y="250" width="100" height="150" fill="currentColor" opacity="0.05" />
          {/* Windows */}
          {[...Array(12)].map((_, i) => (
            <rect
              key={i}
              x={220 + (i % 4) * 90}
              y={180 + Math.floor(i / 4) * 60}
              width="40"
              height="40"
              fill="currentColor"
              opacity="0.08"
            />
          ))}
        </svg>
      </motion.div>
    </div>
  );
}
