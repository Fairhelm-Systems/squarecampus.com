"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { BookCallCta } from "@/components/marketing/ctas";
import { FloatingHomeButton } from "@/components/marketing/floating-home-button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Database, Eye, FileCheck, Lock, Shield } from "@/components/icons";

type SecurityFeature = {
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string[];
};

type ComplianceItem = {
  title: string;
  status: "Ready" | "Aligned" | "Compliant";
  description: string;
};

const complianceStatusStyles: Record<ComplianceItem["status"], string> = {
  Compliant: "bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/30",
  Aligned: "bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/30",
  Ready: "bg-amber-500/20 text-amber-400 ring-1 ring-amber-500/30",
};

const heroSignals = [
  {
    icon: <Lock className="h-4 w-4" />,
    title: "Encryption everywhere",
    description: "TLS 1.3 in transit, AES-256 at rest, keys rotated.",
  },
  {
    icon: <Eye className="h-4 w-4" />,
    title: "Observable & auditable",
    description: "Immutable audit logs across admin, finance, and student data.",
  },
  {
    icon: <Shield className="h-4 w-4" />,
    title: "Zero trust posture",
    description: "MFA, RBAC, IP controls, and least-privilege by design.",
  },
];

const heroStats = [
  { label: "Uptime SLA", value: "99.9%", accent: "bg-emerald-500/20 text-emerald-200" },
  { label: "Breach notify", value: "< 24h", accent: "bg-blue-500/15 text-blue-100" },
  { label: "Data residency", value: "India", accent: "bg-cyan-500/15 text-cyan-100" },
];

const securityFeatures: SecurityFeature[] = [
  {
    icon: <Lock className="h-5 w-5" />,
    title: "Data Encryption",
    description: "Bank-grade encryption protecting your data at every layer",
    details: [
      "AES-256 encryption at rest",
      "TLS 1.3 encryption in transit",
      "Encrypted database backups",
      "Key rotation and management protocols",
    ],
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Access Controls",
    description: "Granular permissions ensuring only authorized access",
    details: [
      "Role-based access control (RBAC)",
      "Multi-factor authentication (MFA)",
      "IP whitelisting for admin access",
      "Session management and auto-logout",
    ],
  },
  {
    icon: <Eye className="h-5 w-5" />,
    title: "Audit & Monitoring",
    description: "Complete visibility into every action and change",
    details: [
      "Immutable audit logs for all data changes",
      "24x7 security monitoring and alerts",
      "Real-time threat detection",
      "Automated anomaly detection",
    ],
  },
  {
    icon: <Database className="h-5 w-5" />,
    title: "Data Residency",
    description: "Your data stays in India, under Indian jurisdiction",
    details: [
      "All data stored in India (AWS Mumbai / Azure India)",
      "No cross-border data transfers by default",
      "Compliance with data localization norms",
      "Option to choose specific data center regions",
    ],
  },
  {
    icon: <FileCheck className="h-5 w-5" />,
    title: "Backup & Recovery",
    description: "Reliable disaster recovery to protect against data loss",
    details: [
      "Daily automated backups with encryption",
      "99.9% uptime SLA with redundancy",
      "Point-in-time recovery capabilities",
      "Tested disaster recovery procedures",
    ],
  },
  {
    icon: <AlertCircle className="h-5 w-5" />,
    title: "Incident Response",
    description: "Rapid response protocols for security events",
    details: [
      "24-hour breach notification protocol",
      "Dedicated incident response team",
      "Clear escalation procedures",
      "Post-incident analysis and reporting",
    ],
  },
];

const complianceItems: ComplianceItem[] = [
  {
    title: "Digital Personal Data Protection Act (DPDPA) 2023",
    status: "Aligned",
    description:
      "Our platform is designed to align with India's primary data protection legislation, with controls for consent, data subject rights, and processing transparency.",
  },
  {
    title: "IT Act 2000 & IT Rules",
    status: "Compliant",
    description:
      "Full compliance with Indian information technology regulations, including reasonable security practices for sensitive personal data.",
  },
  {
    title: "RBI Payment Guidelines",
    status: "Compliant",
    description:
      "Payment processing follows Reserve Bank of India guidelines for digital transactions, UPI, and card payments.",
  },
  {
    title: "ISO 27001 (In Progress)",
    status: "Ready",
    description:
      "We are pursuing ISO 27001 certification for information security management systems, with current practices aligned to the standard.",
  },
];

export default function SecurityPage() {
  return (
    <>
      <main className="relative overflow-hidden bg-neutral-950 px-4 py-16 sm:px-6 lg:px-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-10 top-10 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute right-6 top-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-[110px]" />
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        </div>

        <div className="relative mx-auto flex max-w-6xl flex-col gap-16">
          {/* Hero Section */}
          <section className="relative overflow-hidden rounded-3xl border border-blue-500/15 bg-gradient-to-br from-blue-950/60 via-neutral-950 to-neutral-950 p-8 shadow-xl shadow-blue-500/10 md:p-10">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl" />
              <div className="absolute right-2 top-0 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl" />
              <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            <div className="relative grid items-start gap-10 lg:grid-cols-[1.6fr_1fr]">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-blue-200"
                >
                  <Shield className="h-4 w-4" />
                  Trust & Security
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl"
                >
                  Security that stays ahead of the semester.
                  <span className="block bg-gradient-to-r from-blue-400 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                    Built-in, always-on, and accountable.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="max-w-3xl text-lg leading-relaxed text-neutral-300 md:text-xl"
                >
                  SquareCampus protects student data, finance operations, and everyday workflows
                  with a layered security program—covering controls, monitoring, incident readiness,
                  and transparent communication.
                </motion.p>

                <div className="grid gap-4 md:grid-cols-3">
                  {heroSignals.map((signal, idx) => (
                    <motion.div
                      key={signal.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + idx * 0.08 }}
                      className="group relative overflow-hidden rounded-xl border border-neutral-800/60 bg-neutral-900/40 p-4"
                    >
                      <div className="absolute -right-6 -top-8 h-16 w-16 rounded-full bg-blue-500/0 blur-2xl transition-all duration-500 group-hover:bg-emerald-400/20" />
                      <div className="relative flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-300 ring-1 ring-blue-500/20">
                          {signal.icon}
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-semibold text-neutral-100">{signal.title}</p>
                          <p className="text-xs leading-relaxed text-neutral-400">
                            {signal.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-emerald-500/15 via-neutral-950 to-neutral-950 p-6 shadow-lg shadow-emerald-500/10"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.18),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.12),transparent_35%)]" />
                <div className="relative space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-emerald-100 ring-1 ring-emerald-500/30">
                    <AlertCircle className="h-3.5 w-3.5" />
                    Operational posture
                  </div>
                  <p className="text-sm leading-relaxed text-neutral-200">
                    India data residency, quarterly DR drills, and a 24-hour breach notification
                    policy backed by a dedicated response team.
                  </p>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {heroStats.map((stat) => (
                      <div
                        key={stat.label}
                        className={`rounded-xl border border-white/5 px-3 py-3 ${stat.accent}`}
                      >
                        <div className="text-lg font-semibold">{stat.value}</div>
                        <p className="text-[12px] text-white/70">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-400">
                    <div className="h-2 w-2 rounded-full bg-emerald-400" />
                    External VAPT annually + continuous monitoring every day.
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Security Infrastructure */}
          <section className="space-y-8">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-white md:text-4xl">Security Infrastructure</h2>
              <p className="max-w-3xl text-base leading-relaxed text-neutral-400">
                Multi-layered security architecture protecting your institution's data at every
                level.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {securityFeatures.map((feature, idx) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Card className="group relative h-full overflow-hidden border border-neutral-800/70 bg-gradient-to-br from-neutral-900/80 to-neutral-950/60 transition-all duration-300 hover:scale-[1.02] hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/10">
                    <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-500/10 blur-3xl transition-all duration-500 group-hover:scale-150" />

                    <CardContent className="relative space-y-4 p-6">
                      <div className="inline-flex items-center justify-center rounded-lg bg-blue-500/10 p-3 text-blue-400 ring-1 ring-blue-500/20">
                        {feature.icon}
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-base font-semibold text-neutral-100">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>

                      <ul className="space-y-2 text-xs text-neutral-400">
                        {feature.details.map((detail, detailIdx) => (
                          <li key={detailIdx} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-blue-400" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Compliance Framework */}
          <section className="space-y-8">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-white md:text-4xl">Compliance Framework</h2>
              <p className="max-w-3xl text-base leading-relaxed text-neutral-400">
                Built to align with Indian data protection regulations and industry standards.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {complianceItems.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                >
                  <Card className="group relative h-full overflow-hidden border border-neutral-800/70 bg-gradient-to-br from-neutral-900/80 to-neutral-950/60 transition-all duration-300 hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-500/5">
                    <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-emerald-500/10 blur-3xl transition-all duration-500 group-hover:scale-150" />

                    <CardContent className="relative space-y-3 p-6">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-sm font-semibold text-neutral-100">{item.title}</h3>
                        <span
                          className={`shrink-0 rounded-full px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide ${complianceStatusStyles[item.status]}`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-6"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-blue-500/10 p-2 text-blue-400">
                  <FileCheck className="h-5 w-5" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-neutral-100">Regular Security Audits</p>
                  <p className="text-sm leading-relaxed text-neutral-400">
                    We conduct annual third-party Vulnerability Assessment and Penetration Testing
                    (VAPT) to identify and address potential security vulnerabilities before they
                    become issues.
                  </p>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Data Protection & Your Rights */}
          <section className="space-y-8">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-white md:text-4xl">Your Data, Your Control</h2>
              <p className="max-w-3xl text-base leading-relaxed text-neutral-400">
                We believe you should have complete control over your institutional data.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  title: "Data Portability",
                  description:
                    "Export your complete data anytime in standard formats. No lock-in, no hassle.",
                  icon: <Database className="h-5 w-5" />,
                },
                {
                  title: "Right to Deletion",
                  description:
                    "Request deletion of student or staff data in compliance with DPDPA and institutional policies.",
                  icon: <AlertCircle className="h-5 w-5" />,
                },
                {
                  title: "Access Transparency",
                  description: "Complete audit logs showing who accessed what data, when, and why.",
                  icon: <Eye className="h-5 w-5" />,
                },
                {
                  title: "Data Processing Agreement",
                  description:
                    "Clear contractual commitments on how we process and protect your data.",
                  icon: <FileCheck className="h-5 w-5" />,
                },
              ].map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group flex gap-4 rounded-lg border border-neutral-800/60 bg-neutral-900/40 p-5 transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-900/60"
                >
                  <div className="rounded-lg bg-neutral-800/60 p-3 text-neutral-400 transition-colors group-hover:bg-neutral-800 group-hover:text-blue-400">
                    {item.icon}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-neutral-100">{item.title}</h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Security Documentation */}
          <section className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-white md:text-3xl">Security Documentation</h2>
              <p className="max-w-3xl text-base leading-relaxed text-neutral-400">
                Access detailed documentation about our security practices and compliance
                commitments.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {[
                { title: "Privacy Policy", href: "/privacy-policy" },
                { title: "Data Processing Addendum", href: "/data-processing-addendum" },
                { title: "Terms of Service", href: "/terms-of-service" },
              ].map((doc, idx) => (
                <motion.div
                  key={doc.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                  <Link
                    href={doc.href}
                    className="group flex items-center justify-between rounded-lg border border-neutral-800/60 bg-neutral-900/40 p-4 transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-900/60"
                  >
                    <span className="text-sm font-medium text-neutral-200 group-hover:text-white">
                      {doc.title}
                    </span>
                    <svg
                      className="h-4 w-4 text-neutral-500 transition-transform group-hover:translate-x-1 group-hover:text-neutral-300"
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
              ))}
            </div>
          </section>

          {/* Questions or Security Review CTA */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-8 rounded-2xl border border-neutral-800/80 bg-gradient-to-r from-neutral-900/80 via-neutral-900/60 to-neutral-900/40 p-8"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-neutral-50">
                  Need a security review or have questions?
                </h3>
                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  Our team can walk you through our security architecture, provide audit reports, or
                  arrange a dedicated security review for your institution's requirements.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <BookCallCta context="security-page" className="justify-center sm:w-auto" />
                <Link
                  href="mailto:security@squarecampus.com"
                  className="inline-flex items-center justify-center rounded-full border border-neutral-700 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-200 transition hover:border-white hover:text-white"
                >
                  Email Security Team
                </Link>
              </div>
            </div>
          </motion.section>

          {/* Footer Note */}
          <div className="rounded-lg border border-neutral-800/40 bg-neutral-900/20 p-6">
            <p className="text-xs leading-relaxed text-neutral-500">
              <strong className="text-neutral-400">Security Disclosure:</strong> If you discover a
              security vulnerability in SquareCampus, please report it to{" "}
              <a
                href="mailto:security@squarecampus.com"
                className="text-blue-400 hover:text-blue-300"
              >
                security@squarecampus.com
              </a>
              . We take all reports seriously and will respond within 24 hours. We appreciate
              responsible disclosure and will work with you to address any issues promptly.
            </p>
          </div>
        </div>
      </main>

      <FloatingHomeButton href="/" label="Back to home" />
    </>
  );
}
