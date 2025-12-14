"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export function FeaturesPageHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Floating feature badges
      gsap.to(".feature-badge", {
        y: -15,
        duration: 2,
        stagger: 0.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Shimmer effect on hero
      gsap.fromTo(
        ".shimmer",
        { x: "-100%" },
        {
          x: "100%",
          duration: 2,
          ease: "power2.inOut",
          repeat: -1,
          repeatDelay: 3,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const featureBadges = [
    "Admissions Automation",
    "Fee Management",
    "Academic Tracking",
    "Communication Hub",
    "Transport Management",
    "Hostel Operations",
    "Library System",
    "HR & Payroll",
    "Exam Management",
    "Report Cards",
    "Attendance",
    "Timetabling",
  ];

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden border-b border-white/5 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 px-4 py-20 md:px-8 md:py-32"
    >
      {/* Animated background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-purple-500/10 blur-[128px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-neutral-400 backdrop-blur-sm">
            <Sparkles className="h-3 w-3 text-blue-400" />
            Complete Feature Suite
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
            Every Feature You Need.
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Nothing You Don't.
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-3xl text-lg text-neutral-300 md:text-xl">
            From admissions to graduation, SquareCampus handles every aspect of your institution.
            No bolt-ons, no integrations, no compromises. Just one powerful platform.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/#contact-us"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-4 font-semibold text-white shadow-xl shadow-blue-500/25 transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/30"
            >
              See It In Action
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="#feature-explorer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 font-semibold text-white transition-all duration-200 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
            >
              Explore Features
            </Link>
          </div>
        </motion.div>

        {/* Floating feature badges */}
        <div className="relative mt-16 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {featureBadges.map((badge, index) => (
            <motion.div
              key={badge}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="feature-badge group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 p-3 text-center backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-neutral-900/90"
            >
              {/* Shimmer effect */}
              <div className="shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              <span className="relative text-xs font-medium text-neutral-200 group-hover:text-white">
                {badge}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
