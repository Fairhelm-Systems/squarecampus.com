"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  Eye,
  FileCheck,
  Lock,
  Shield,
  Sparkles,
} from "@/icons";

gsap.registerPlugin(ScrollTrigger);

const trustFeatures = [
  {
    icon: Shield,
    title: "Data Residency",
    description: "All data stored in India",
    glowColor: "rgba(59, 130, 246, 0.3)",
  },
  {
    icon: Lock,
    title: "Bank-Grade Encryption",
    description: "AES-256 at rest, TLS 1.3 in transit",
    glowColor: "rgba(16, 185, 129, 0.3)",
  },
  {
    icon: Eye,
    title: "Complete Audit Trails",
    description: "Every action logged and traceable",
    glowColor: "rgba(139, 92, 246, 0.3)",
  },
  {
    icon: FileCheck,
    title: "Compliance Ready",
    description: "DPDPA, IT Act, RBI aligned",
    glowColor: "rgba(236, 72, 153, 0.3)",
  },
];

// Floating particles
function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-blue-400/30"
          style={{
            left: `${15 + Math.random() * 70}%`,
            top: `${15 + Math.random() * 70}%`,
            animation: `trust-float ${5 + Math.random() * 5}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes trust-float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-15px) translateX(8px);
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
}

export function TrustBanner() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const assuranceRef = useRef<HTMLDivElement | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // GSAP scroll animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main content animation
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Feature cards animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".js-trust-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Assurance card animation
      if (assuranceRef.current) {
        gsap.fromTo(
          assuranceRef.current,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: assuranceRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-10"
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-8 top-10 mx-auto h-72 max-w-4xl rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_70%)] blur-3xl" />
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-950/50 via-neutral-950 to-neutral-950 p-8 shadow-2xl shadow-blue-500/10 md:p-12">
        <FloatingParticles />

        {/* Animated gradient shimmer */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
          <div className="absolute -inset-full animate-trust-shimmer bg-gradient-to-r from-transparent via-blue-400/[0.07] to-transparent" />
        </div>

        {/* Glow orbs */}
        <div className="pointer-events-none absolute -left-16 -top-20 h-44 w-44 rounded-full bg-blue-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -right-16 h-44 w-44 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative space-y-8">
          {/* Header */}
          <div
            ref={contentRef}
            className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 backdrop-blur-sm">
                <Shield className="h-3.5 w-3.5 text-blue-300" />
                <span className="text-[0.65rem] font-medium uppercase tracking-[0.25em] text-blue-200">
                  Trust & Security
                </span>
              </div>

              <h2 className="text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
                Security is the campus nervous system.
                <span className="mt-1 block bg-gradient-to-r from-blue-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                  We harden it so you can focus on outcomes.
                </span>
              </h2>

              <p className="max-w-2xl text-sm leading-relaxed text-neutral-400 md:text-base">
                Enterprise-grade controls for student data, payments, and daily
                operations—built with transparent processes, verifiable
                encryption, and always-on monitoring.
              </p>
            </div>

            <div className="flex flex-col items-start gap-3 md:items-end">
              <Link
                href="/security"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full p-[1px]"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-emerald-500 to-cyan-500 opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-emerald-500 to-cyan-500 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-50" />
                <span className="relative flex items-center gap-2 rounded-full bg-neutral-950 px-6 py-3 text-sm font-medium text-white transition-colors duration-300 group-hover:bg-neutral-900">
                  <span>View Security Posture</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
              <p className="text-[0.65rem] text-neutral-500">
                Regular audits, India data residency, no dark patterns.
              </p>
            </div>
          </div>

          {/* Features & Assurance Grid */}
          <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
            {/* Features Grid */}
            <div ref={cardsRef} className="grid gap-4 sm:grid-cols-2">
              {trustFeatures.map((feature, idx) => {
                const Icon = feature.icon;
                const isHovered = hoveredIndex === idx;
                return (
                  <div
                    key={feature.title}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={cn(
                      "js-trust-card group relative overflow-hidden rounded-xl",
                      "border border-white/[0.08] bg-neutral-900/50 p-5 backdrop-blur-sm",
                      "transition-all duration-500",
                      "hover:border-white/15 hover:bg-neutral-900/70"
                    )}
                    style={{
                      transform: isHovered
                        ? "translateY(-4px) scale(1.02)"
                        : "translateY(0) scale(1)",
                    }}
                  >
                    {/* Hover glow */}
                    <div
                      className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full blur-2xl transition-all duration-500"
                      style={{
                        backgroundColor: feature.glowColor,
                        opacity: isHovered ? 0.5 : 0,
                      }}
                    />

                    <div className="relative z-10 space-y-3">
                      <div className="inline-flex items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 p-2.5 text-blue-300 transition-all duration-300 group-hover:border-blue-400/40 group-hover:bg-blue-500/20 group-hover:scale-110">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-sm font-semibold text-white">
                        {feature.title}
                      </h3>
                      <p className="text-xs leading-relaxed text-neutral-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Assurance card */}
            <div
              ref={assuranceRef}
              className="relative overflow-hidden rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-neutral-900/60 to-neutral-950 p-6"
            >
              <div className="pointer-events-none absolute -right-6 -top-8 h-24 w-24 rounded-full bg-emerald-500/15 blur-3xl" />

              <div className="relative flex items-start justify-between gap-4">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
                    <span className="text-[0.6rem] font-medium uppercase tracking-[0.2em] text-emerald-200">
                      Proof, not promises
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed text-neutral-200">
                    Annual VAPT, anomaly detection, and defined breach-notify
                    timelines backed by clear processes.
                  </p>

                  <ul className="space-y-2.5">
                    {[
                      "Indian data residency & isolation by default",
                      "Human + automated monitoring for privileged access",
                      "Transparent audit logs available to admins",
                    ].map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-xs text-neutral-400"
                      >
                        <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/security"
                  className="group mt-1 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-200 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/60 hover:bg-emerald-500/20"
                >
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Footer stats */}
          <div className="flex flex-wrap items-center gap-3 border-t border-white/[0.06] pt-6 text-xs text-neutral-400 sm:gap-4">
            {[
              { label: "Uptime commitments", color: "bg-emerald-400" },
              { label: "Security monitoring", color: "bg-blue-400" },
              { label: "Regular third-party audits", color: "bg-cyan-400" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1.5"
              >
                <div className={cn("h-1.5 w-1.5 rounded-full", item.color)} />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Shimmer animation */}
      <style jsx>{`
        @keyframes trust-shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-trust-shimmer {
          animation: trust-shimmer 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
