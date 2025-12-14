"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Network } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export function EcosystemHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Rotating rings animation
      gsap.to(".ring-1", {
        rotation: 360,
        duration: 20,
        ease: "none",
        repeat: -1,
      });

      gsap.to(".ring-2", {
        rotation: -360,
        duration: 30,
        ease: "none",
        repeat: -1,
      });

      gsap.to(".ring-3", {
        rotation: 360,
        duration: 40,
        ease: "none",
        repeat: -1,
      });

      // Pulsing nodes
      gsap.to(".ecosystem-node", {
        scale: 1.2,
        opacity: 0.8,
        duration: 2,
        ease: "sine.inOut",
        stagger: 0.2,
        yoyo: true,
        repeat: -1,
      });

      // Data flow particles
      gsap.to(".data-particle", {
        x: "random(-20, 20)",
        y: "random(-20, 20)",
        duration: 3,
        ease: "sine.inOut",
        stagger: 0.1,
        yoyo: true,
        repeat: -1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden border-b border-white/5 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 px-4 py-20 md:px-8 md:py-32"
    >
      {/* Animated background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/3 top-1/4 h-96 w-96 rounded-full bg-sky-500/10 blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/3 h-96 w-96 rounded-full bg-violet-500/10 blur-[128px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-neutral-400 backdrop-blur-sm">
              <Network className="h-3 w-3 text-sky-400" />
              Connected Platform
            </div>

            <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-6xl">
              One Ecosystem.
              <span className="block bg-gradient-to-r from-sky-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                Infinite Possibilities.
              </span>
            </h1>

            <p className="mb-8 text-lg text-neutral-300 md:text-xl">
              SquareCampus isn't just software—it's a complete ecosystem. Admin console, teacher tools,
              mobile apps, integrations, and AI, all connected through a single source of truth.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/#contact-us"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-violet-500 px-8 py-4 font-semibold text-white shadow-xl shadow-sky-500/25 transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl hover:shadow-sky-500/30"
              >
                Explore the Ecosystem
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="#architecture"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 font-semibold text-white transition-all duration-200 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
              >
                See Architecture
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              {[
                { value: "6", label: "Core Modules" },
                { value: "20+", label: "Integrations" },
                { value: "1", label: "Source of Truth" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="mb-1 text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs uppercase tracking-wider text-neutral-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative flex items-center justify-center"
          >
            {/* Rotating rings */}
            <div className="relative h-[400px] w-[400px]">
              {/* Outer ring */}
              <div className="ring-1 absolute inset-0 rounded-full border-2 border-dashed border-sky-500/20" />

              {/* Middle ring */}
              <div className="ring-2 absolute inset-12 rounded-full border-2 border-dashed border-violet-500/20" />

              {/* Inner ring */}
              <div className="ring-3 absolute inset-24 rounded-full border-2 border-dashed border-purple-500/20" />

              {/* Center core */}
              <div className="absolute left-1/2 top-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white/20 bg-gradient-to-br from-sky-500/20 via-violet-500/10 to-purple-500/20 shadow-2xl shadow-sky-500/20 backdrop-blur-sm">
                <div className="text-center">
                  <div className="text-xs uppercase tracking-wider text-neutral-400">Core</div>
                  <div className="text-sm font-bold text-white">SquareCampus</div>
                </div>
              </div>

              {/* Ecosystem nodes */}
              {[
                { label: "Admin", angle: 0, ring: 1 },
                { label: "Teachers", angle: 60, ring: 1 },
                { label: "Parents", angle: 120, ring: 1 },
                { label: "Students", angle: 180, ring: 1 },
                { label: "API", angle: 240, ring: 1 },
                { label: "AI", angle: 300, ring: 1 },
              ].map((node, index) => {
                const radius = 140;
                const x = Math.cos((node.angle * Math.PI) / 180) * radius;
                const y = Math.sin((node.angle * Math.PI) / 180) * radius;

                return (
                  <div
                    key={node.label}
                    className="ecosystem-node absolute left-1/2 top-1/2"
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    }}
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-neutral-900 to-neutral-950 shadow-lg">
                      <span className="text-xs font-medium text-white">{node.label}</span>
                    </div>

                    {/* Connection line to center */}
                    <div
                      className="absolute left-1/2 top-1/2 h-0.5 origin-left bg-gradient-to-r from-sky-500/50 to-transparent"
                      style={{
                        width: `${radius - 64}px`,
                        transform: `rotate(${node.angle + 180}deg)`,
                      }}
                    />
                  </div>
                );
              })}

              {/* Data flow particles */}
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="data-particle absolute h-1 w-1 rounded-full bg-sky-400"
                  style={{
                    left: `${50 + Math.cos((i * 30 * Math.PI) / 180) * 30}%`,
                    top: `${50 + Math.sin((i * 30 * Math.PI) / 180) * 30}%`,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
