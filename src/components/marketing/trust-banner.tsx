"use client";

import { motion, useInView } from "@/lib/motion";
import Link from "next/link";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Eye, FileCheck, Lock, Shield, Sparkles } from "@/icons";

const trustFeatures = [
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Data Residency",
    description: "All data stored in India",
  },
  {
    icon: <Lock className="h-5 w-5" />,
    title: "Bank-Grade Encryption",
    description: "AES-256 at rest, TLS 1.3 in transit",
  },
  {
    icon: <Eye className="h-5 w-5" />,
    title: "Complete Audit Trails",
    description: "Every action logged and traceable",
  },
  {
    icon: <FileCheck className="h-5 w-5" />,
    title: "Compliance Ready",
    description: "DPDPA, IT Act, RBI aligned",
  },
];

export function TrustBanner() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { amount: 0.2, once: true });

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-10"
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-8 top-10 mx-auto h-72 max-w-4xl rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.13),transparent_70%)] blur-3xl" />
        <div className="absolute inset-0 rounded-[28px] border border-white/5 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.08),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.08),transparent_32%)]" />
        <div className="absolute inset-10 rounded-3xl bg-[linear-gradient(120deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.03)_40%,rgba(255,255,255,0)_50%)] opacity-80 blur-xl" />
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-950/70 via-neutral-950 to-neutral-950 p-8 shadow-2xl shadow-blue-500/10 md:p-12">
        {/* Animated gradient border effect */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/0 via-blue-400/25 to-blue-500/0 opacity-60 blur-xl" />

        {/* Glow orbs */}
        <div className="pointer-events-none absolute -left-16 -top-20 h-44 w-44 rounded-full bg-blue-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -right-16 h-44 w-44 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative space-y-8">
          {/* Header */}
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="space-y-3">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-blue-200"
              >
                <Shield className="h-3.5 w-3.5" />
                Trust & Security
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-2xl font-semibold leading-tight text-white sm:text-3xl md:text-4xl"
              >
                Security is the campus nervous system.
                <span className="block bg-gradient-to-r from-blue-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                  We harden it so you can focus on outcomes.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="max-w-2xl text-sm leading-relaxed text-neutral-300 md:text-base"
              >
                Enterprise-grade controls for student data, payments, and daily operations—built
                with transparent processes, verifiable encryption, and always-on monitoring.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Link
                href="/security"
                className="group inline-flex items-center gap-2 rounded-full border border-blue-400/40 bg-blue-500/10 px-6 py-3 text-sm font-semibold text-blue-50 shadow-lg shadow-blue-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-400/60 hover:shadow-emerald-400/20"
              >
                <span>View Security Posture</span>
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
              <p className="mt-3 text-[11px] text-neutral-500">
                Annual audits, India data residency, no dark patterns.
              </p>
            </motion.div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
            {/* Features Grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              {trustFeatures.map((feature, idx) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.6 + idx * 0.08 }}
                  className={cn(
                    "group relative overflow-hidden rounded-xl border border-neutral-800/60 bg-neutral-900/40 p-5 backdrop-blur-sm transition-all duration-300",
                    "hover:border-blue-500/35 hover:bg-neutral-900/60 hover:shadow-lg hover:shadow-blue-500/10"
                  )}
                >
                  {/* Hover glow */}
                  <div className="absolute -right-10 -top-12 h-28 w-28 rounded-full bg-blue-500/0 blur-3xl transition-all duration-500 group-hover:bg-emerald-400/20" />

                  <div className="relative space-y-2">
                    <div className="inline-flex items-center justify-center rounded-lg bg-blue-500/10 p-2.5 text-blue-300 ring-1 ring-blue-500/20 transition-all group-hover:scale-105 group-hover:bg-blue-500/20 group-hover:text-blue-100 group-hover:ring-blue-500/40">
                      {feature.icon}
                    </div>
                    <h3 className="text-sm font-semibold text-neutral-100">{feature.title}</h3>
                    <p className="text-xs text-neutral-400">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Assurance card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="relative overflow-hidden rounded-xl border border-emerald-500/25 bg-gradient-to-br from-emerald-500/10 via-neutral-900/60 to-neutral-950 p-6 shadow-xl shadow-emerald-500/10"
            >
              <div className="pointer-events-none absolute -right-6 -top-8 h-24 w-24 rounded-full bg-emerald-500/15 blur-3xl" />
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-emerald-200 ring-1 ring-emerald-500/30">
                    <Sparkles className="h-3.5 w-3.5" />
                    Proof, not promises
                  </div>
                  <p className="text-sm text-neutral-200">
                    Annual VAPT, real-time anomaly detection, and breach-notify in 24 hours—no
                    exceptions.
                  </p>
                  <ul className="space-y-2 text-[12px] text-neutral-400">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Indian data residency & isolation by default
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Human + automated monitoring for privileged access
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Transparent audit logs available to admins
                    </li>
                  </ul>
                </div>
                <Link
                  href="/security"
                  className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-100 transition hover:-translate-y-0.5 hover:border-emerald-400 hover:bg-emerald-500/20"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Footer stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="flex flex-wrap items-center gap-4 border-t border-neutral-800/60 pt-6 text-xs text-neutral-400 sm:gap-6"
          >
            <div className="flex items-center gap-2 rounded-full bg-neutral-900/60 px-3 py-1.5 ring-1 ring-neutral-800">
              <div className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>99.9% Uptime SLA</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-neutral-900/60 px-3 py-1.5 ring-1 ring-neutral-800">
              <div className="h-2 w-2 rounded-full bg-blue-400" />
              <span>24x7 Security Monitoring</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-neutral-900/60 px-3 py-1.5 ring-1 ring-neutral-800">
              <div className="h-2 w-2 rounded-full bg-cyan-400" />
              <span>Annual Third-Party Audits</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
