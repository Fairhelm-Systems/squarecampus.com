"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Shield, Lock, Eye, FileCheck } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
        <div className="absolute inset-x-10 top-10 mx-auto h-72 max-w-4xl rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_70%)] blur-3xl" />
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-950/40 via-neutral-900/80 to-neutral-950/80 p-8 shadow-2xl shadow-blue-500/10 md:p-12">
        {/* Animated gradient border effect */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/0 via-blue-400/20 to-blue-500/0 opacity-50 blur-xl" />

        {/* Glow orbs */}
        <div className="pointer-events-none absolute -left-12 -top-12 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl" />

        <div className="relative space-y-8">
          {/* Header */}
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="space-y-3">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-blue-300"
              >
                <Shield className="h-3.5 w-3.5" />
                Trust & Security
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-2xl font-bold text-white sm:text-3xl md:text-4xl"
              >
                Security isn't a feature.
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  It's the foundation.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="max-w-2xl text-sm leading-relaxed text-neutral-300 md:text-base"
              >
                Protecting sensitive student data, financial records, and institutional operations
                with enterprise-grade security and transparent data practices.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Link
                href="/security"
                className="group inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-500/10 px-6 py-3 text-sm font-semibold text-blue-100 shadow-lg shadow-blue-500/20 transition-all duration-300 hover:border-blue-400/60 hover:bg-blue-500/20 hover:shadow-blue-500/30"
              >
                <span>Learn More</span>
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
            </motion.div>
          </div>

          {/* Features Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trustFeatures.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.6 + idx * 0.1 }}
                className={cn(
                  "group relative overflow-hidden rounded-xl border border-neutral-800/60 bg-neutral-900/40 p-5 backdrop-blur-sm transition-all duration-300",
                  "hover:border-blue-500/30 hover:bg-neutral-900/60 hover:shadow-lg hover:shadow-blue-500/5"
                )}
              >
                {/* Hover glow */}
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-500/0 blur-2xl transition-all duration-500 group-hover:bg-blue-500/20" />

                <div className="relative space-y-2">
                  <div className="inline-flex items-center justify-center rounded-lg bg-blue-500/10 p-2.5 text-blue-400 ring-1 ring-blue-500/20 transition-all group-hover:bg-blue-500/20 group-hover:ring-blue-500/30">
                    {feature.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-neutral-100">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-neutral-400">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex flex-wrap items-center gap-6 border-t border-neutral-800/60 pt-6 text-xs text-neutral-400"
          >
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>99.9% Uptime SLA</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-400" />
              <span>24x7 Security Monitoring</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-cyan-400" />
              <span>Annual Third-Party Audits</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
