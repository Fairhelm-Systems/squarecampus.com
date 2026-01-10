"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { BookCallCta } from "@/components/marketing/ctas";
import { FloatingHomeButton } from "@/components/marketing/floating-home-button";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertCircle,
  ChevronRight,
  Database,
  Eye,
  FileCheck,
  Lock,
  Shield,
} from "@/components/icons";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type SecurityFeature = {
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string[];
  color: string;
};

type ComplianceItem = {
  title: string;
  status: "Ready" | "Aligned" | "Compliant";
  description: string;
};

type OperationsSection = {
  title: string;
  description: string;
  bullets: string[];
  color: string;
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
    color: "blue",
  },
  {
    icon: <Eye className="h-4 w-4" />,
    title: "Observable & auditable",
    description: "Immutable audit logs across admin, finance, and student data.",
    color: "emerald",
  },
  {
    icon: <Shield className="h-4 w-4" />,
    title: "Zero trust posture",
    description: "MFA, RBAC, IP controls, and least-privilege by design.",
    color: "purple",
  },
];

const heroStats = [
  { label: "Uptime SLA", value: "Committed", color: "emerald" },
  { label: "Breach notify", value: "Defined", color: "blue" },
  { label: "Data residency", value: "India", color: "cyan" },
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
    color: "blue",
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
    color: "emerald",
  },
  {
    icon: <Eye className="h-5 w-5" />,
    title: "Audit & Monitoring",
    description: "Complete visibility into every action and change",
    details: [
      "Immutable audit logs for all data changes",
      "Continuous security monitoring and alerts",
      "Real-time threat detection",
      "Automated anomaly detection",
    ],
    color: "purple",
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
    color: "cyan",
  },
  {
    icon: <FileCheck className="h-5 w-5" />,
    title: "Backup & Recovery",
    description: "Reliable disaster recovery to protect against data loss",
    details: [
      "Daily automated backups with encryption",
      "Uptime SLA commitments with redundancy",
      "Point-in-time recovery capabilities",
      "Tested disaster recovery procedures",
    ],
    color: "amber",
  },
  {
    icon: <AlertCircle className="h-5 w-5" />,
    title: "Incident Response",
    description: "Rapid response protocols for security events",
    details: [
      "Defined breach notification protocol",
      "Dedicated incident response team",
      "Clear escalation procedures",
      "Post-incident analysis and reporting",
    ],
    color: "red",
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
      "We maintain compliance with Indian information technology regulations, including reasonable security practices for sensitive personal data.",
  },
  {
    title: "RBI Payment Guidelines",
    status: "Compliant",
    description:
      "Payment processing aligns with Reserve Bank of India guidelines for digital transactions, UPI, and card payments.",
  },
  {
    title: "ISO 27001 (In Progress)",
    status: "Ready",
    description:
      "We are pursuing ISO 27001 certification for information security management systems, with current practices aligned to the standard.",
  },
];

const operationsSections: OperationsSection[] = [
  {
    title: "Device & Endpoint Security",
    description:
      "We use enterprise-grade endpoint management and endpoint protection to secure the devices that access your data.",
    bullets: [
      "Company-managed laptops enrolled in UEM/MDM",
      "Full-disk encryption enforced (e.g., FileVault or BitLocker)",
      "Endpoint detection and response (EDR) on corporate endpoints",
      "Controlled browser and SaaS access policies to reduce data leakage",
      "Remote device lock and wipe on loss or exit",
      "USB/external storage restrictions where applicable for sensitive roles",
    ],
    color: "blue",
  },
  {
    title: "Identity & Access Controls",
    description:
      "Access is tightly governed to help ensure only the right people can reach sensitive systems and data.",
    bullets: [
      "MFA enforced for internal and administrative access",
      "Least-privilege access with role-based controls",
      "Separation of duties for billing, finance, and admin workflows",
      "Offboarding controls: access revoked, tokens rotated, and device wipe for company-owned assets",
      "Conditional access based on device compliance posture",
    ],
    color: "emerald",
  },
  {
    title: "Data Loss Prevention & Secure Sharing",
    description:
      "Policies and monitoring help prevent accidental exposure of student PII and sensitive exports.",
    bullets: [
      "Guardrails to reduce accidental sharing of student data",
      "DLP rules can block uploads of sensitive exports to personal email or drives where applicable",
      "Audit logs for export and download operations",
      "Secure sharing workflows designed to keep data within approved channels",
    ],
    color: "purple",
  },
];

const securityAssuranceItems = [
  "Security architecture overview",
  "Data flow diagram",
  "Subprocessor list",
  "Incident response process summary",
  "Pen-test/VAPT summary letter (available upon completion of the latest assessment)",
  "Vendor security questionnaire support",
];

const securityFaqs = [
  {
    question: "Where is data hosted?",
    answer:
      "SquareCampus is hosted in India by default, with data residency in India and no cross-border transfers unless explicitly requested.",
  },
  {
    question: "How is data encrypted?",
    answer:
      "We use TLS 1.3 for data in transit and AES-256 for data at rest, including encrypted backups and regular key rotation.",
  },
  {
    question: "Who can access data?",
    answer:
      "Access is role-based and least-privileged. Only authorized staff with MFA can reach administrative systems, and all access is logged.",
  },
  {
    question: "What happens if a device is lost?",
    answer:
      "Company-managed devices can be locked or wiped remotely, and access tokens are revoked to prevent further access.",
  },
  {
    question: "Do you support vendor security questionnaires?",
    answer:
      "Yes. We provide questionnaire support and can share security documentation and summaries on request.",
  },
];

const dataRightsItems = [
  {
    title: "Data Portability",
    description:
      "Export your complete data anytime in standard formats. No lock-in, no hassle.",
    icon: <Database className="h-5 w-5" />,
    color: "blue",
  },
  {
    title: "Right to Deletion",
    description:
      "Request deletion of student or staff data in compliance with DPDPA and institutional policies.",
    icon: <AlertCircle className="h-5 w-5" />,
    color: "red",
  },
  {
    title: "Access Transparency",
    description: "Complete audit logs showing who accessed what data, when, and why.",
    icon: <Eye className="h-5 w-5" />,
    color: "emerald",
  },
  {
    title: "Data Processing Agreement",
    description:
      "Clear contractual commitments on how we process and protect your data.",
    icon: <FileCheck className="h-5 w-5" />,
    color: "purple",
  },
];

const accentColors: Record<
  string,
  { border: string; bg: string; text: string; glow: string; gradient: string }
> = {
  blue: {
    border: "border-blue-500/30",
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    glow: "bg-blue-500/20",
    gradient: "from-blue-400/70 via-blue-500/15 to-transparent",
  },
  emerald: {
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    glow: "bg-emerald-500/20",
    gradient: "from-emerald-400/70 via-emerald-500/15 to-transparent",
  },
  purple: {
    border: "border-purple-500/30",
    bg: "bg-purple-500/10",
    text: "text-purple-400",
    glow: "bg-purple-500/20",
    gradient: "from-purple-400/70 via-purple-500/15 to-transparent",
  },
  cyan: {
    border: "border-cyan-500/30",
    bg: "bg-cyan-500/10",
    text: "text-cyan-400",
    glow: "bg-cyan-500/20",
    gradient: "from-cyan-400/70 via-cyan-500/15 to-transparent",
  },
  amber: {
    border: "border-amber-500/30",
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    glow: "bg-amber-500/20",
    gradient: "from-amber-400/70 via-amber-500/15 to-transparent",
  },
  red: {
    border: "border-red-500/30",
    bg: "bg-red-500/10",
    text: "text-red-400",
    glow: "bg-red-500/20",
    gradient: "from-red-400/70 via-red-500/15 to-transparent",
  },
};

function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className={cn(
            "absolute h-1 w-1 rounded-full",
            i % 3 === 0 ? "bg-blue-400/30" : i % 3 === 1 ? "bg-emerald-400/30" : "bg-purple-400/30"
          )}
          style={{
            left: `${8 + (i * 6) % 84}%`,
            top: `${12 + (i * 9) % 76}%`,
            animation: `float-security ${7 + (i % 5) * 2}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes float-security {
          0%, 100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.2; }
          25% { transform: translateY(-15px) translateX(8px) scale(1.3); opacity: 0.5; }
          50% { transform: translateY(-8px) translateX(-4px) scale(0.9); opacity: 0.3; }
          75% { transform: translateY(-20px) translateX(12px) scale(1.1); opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}

export default function SecurityPage() {
  const pageRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const operationsRef = useRef<HTMLElement>(null);
  const complianceRef = useRef<HTMLElement>(null);
  const dataRightsRef = useRef<HTMLElement>(null);
  const assuranceRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!pageRef.current) return;
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Hero animations
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelectorAll(".js-hero-animate"),
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
          }
        );
      }

      // Features section
      if (featuresRef.current) {
        gsap.fromTo(
          featuresRef.current.querySelectorAll(".js-feature-card"),
          { autoAlpha: 0, y: 40, scale: 0.95 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: featuresRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Operations section
      if (operationsRef.current) {
        gsap.fromTo(
          operationsRef.current.querySelectorAll(".js-ops-card"),
          { autoAlpha: 0, y: 30, rotateX: 8 },
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: operationsRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Compliance section
      if (complianceRef.current) {
        gsap.fromTo(
          complianceRef.current.querySelectorAll(".js-compliance-card"),
          { autoAlpha: 0, x: -20 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: complianceRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Data rights section
      if (dataRightsRef.current) {
        gsap.fromTo(
          dataRightsRef.current.querySelectorAll(".js-rights-card"),
          { autoAlpha: 0, y: 25 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: dataRightsRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Assurance section
      if (assuranceRef.current) {
        gsap.fromTo(
          assuranceRef.current.querySelectorAll(".js-assurance-animate"),
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: assuranceRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // FAQ section
      if (faqRef.current) {
        gsap.fromTo(
          faqRef.current.querySelectorAll(".js-faq-item"),
          { autoAlpha: 0, x: -15 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.4,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: faqRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // CTA section
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 85%",
            },
          }
        );
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <main
        ref={pageRef}
        className="relative overflow-hidden bg-neutral-950 px-4 py-16 sm:px-6 lg:px-10"
      >
        {/* Background effects */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-10 top-10 h-64 w-64 rounded-full bg-blue-500/[0.06] blur-3xl" />
          <div className="absolute right-6 top-24 h-72 w-72 rounded-full bg-emerald-500/[0.06] blur-[110px]" />
          <div className="absolute bottom-1/3 left-1/4 h-80 w-80 rounded-full bg-purple-500/[0.04] blur-[120px]" />
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        </div>

        <FloatingParticles />

        <div className="relative mx-auto flex max-w-6xl flex-col gap-20">
          {/* Hero Section */}
          <section
            ref={heroRef}
            className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 shadow-xl shadow-blue-500/10 backdrop-blur-sm md:p-10"
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-blue-500/[0.12] blur-3xl" />
              <div className="absolute right-2 top-0 h-56 w-56 rounded-full bg-emerald-500/[0.06] blur-3xl" />
              <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
            </div>

            <div className="relative grid items-start gap-10 lg:grid-cols-[1.6fr_1fr]">
              <div className="space-y-6">
                <div className="js-hero-animate inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-blue-200">
                  <Shield className="h-4 w-4" />
                  Trust & Security
                </div>

                <h1 className="js-hero-animate text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                  Security
                  <span className="block bg-gradient-to-r from-blue-400 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                    Built-in, always-on, and accountable.
                  </span>
                </h1>

                <p className="js-hero-animate max-w-3xl text-lg leading-relaxed text-neutral-300 md:text-xl">
                  SquareCampus is a school OS and school management platform built for student data
                  security—combining data residency in India, encryption, audit trails, and
                  continuous monitoring to protect daily campus operations. It is the foundation
                  for operational trust when teams are under pressure.
                </p>

                <div className="grid gap-4 md:grid-cols-3">
                  {heroSignals.map((signal) => {
                    const colors = accentColors[signal.color];
                    return (
                      <div
                        key={signal.title}
                        className="js-hero-animate group relative overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.04]"
                      >
                        <div
                          className={cn(
                            "absolute -right-6 -top-8 h-16 w-16 rounded-full blur-2xl transition-all duration-500 group-hover:scale-150",
                            colors.glow
                          )}
                        />
                        <div className="relative flex items-start gap-3">
                          <div
                            className={cn(
                              "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ring-1",
                              colors.bg,
                              colors.text,
                              colors.border
                            )}
                          >
                            {signal.icon}
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-semibold text-neutral-100">{signal.title}</p>
                            <p className="text-xs leading-relaxed text-neutral-400">
                              {signal.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="js-hero-animate relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-b from-emerald-500/[0.08] via-neutral-950 to-neutral-950 p-6 shadow-lg shadow-emerald-500/10 backdrop-blur-sm">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.12),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.08),transparent_35%)]" />
                <div className="relative space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-emerald-100 ring-1 ring-emerald-500/30">
                    <AlertCircle className="h-3.5 w-3.5" />
                    Operational posture
                  </div>
                  <p className="text-sm leading-relaxed text-neutral-200">
                    India data residency, quarterly DR drills, and a defined breach notification
                    policy backed by a dedicated response team.
                  </p>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {heroStats.map((stat) => {
                      const colors = accentColors[stat.color];
                      return (
                        <div
                          key={stat.label}
                          className={cn(
                            "group relative overflow-hidden rounded-xl border border-white/[0.08] px-3 py-3 transition-all duration-300 hover:border-white/[0.15]",
                            colors.bg
                          )}
                        >
                          <div
                            className={cn(
                              "absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r",
                              colors.gradient
                            )}
                          />
                          <div className={cn("text-lg font-semibold", colors.text)}>{stat.value}</div>
                          <p className="text-[12px] text-white/70">{stat.label}</p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-400">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                    External VAPT annually + continuous monitoring.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Security Infrastructure */}
          <section ref={featuresRef} className="space-y-8">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-white md:text-4xl">Security Infrastructure</h2>
              <p className="max-w-3xl text-base leading-relaxed text-neutral-400">
                Multi-layered security architecture protecting your institution's data at every
                level.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {securityFeatures.map((feature) => {
                const colors = accentColors[feature.color];
                return (
                  <Card
                    key={feature.title}
                    className="js-feature-card group relative h-full overflow-hidden border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-white/[0.15] hover:shadow-2xl"
                  >
                    <div
                      className={cn(
                        "absolute -right-8 -top-8 h-24 w-24 rounded-full blur-3xl transition-all duration-500 group-hover:scale-150",
                        colors.glow
                      )}
                    />
                    <div
                      className={cn(
                        "absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                        colors.gradient
                      )}
                    />

                    <CardContent className="relative space-y-4 p-6">
                      <div
                        className={cn(
                          "inline-flex items-center justify-center rounded-lg p-3 ring-1",
                          colors.bg,
                          colors.text,
                          colors.border
                        )}
                      >
                        {feature.icon}
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-base font-semibold text-neutral-100">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-neutral-400">{feature.description}</p>
                      </div>

                      <ul className="space-y-2 text-xs text-neutral-400">
                        {feature.details.map((detail, detailIdx) => (
                          <li key={detailIdx} className="flex items-start gap-2">
                            <span
                              className={cn(
                                "mt-1.5 h-1 w-1 shrink-0 rounded-full bg-current",
                                colors.text
                              )}
                            />
                            <span className="transition-colors duration-300 group-hover:text-neutral-300">
                              {detail}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Operational Security */}
          <section ref={operationsRef} className="space-y-8">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                Internal Operational Security
              </h2>
              <p className="max-w-3xl text-base leading-relaxed text-neutral-400">
                Security is not only about the platform. We apply operational controls across
                devices, identity, and data-sharing to support enterprise procurement and RFP
                requirements.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {operationsSections.map((section) => {
                const colors = accentColors[section.color];
                return (
                  <Card
                    key={section.title}
                    className="js-ops-card group relative h-full overflow-hidden border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm transition-all duration-300 hover:border-white/[0.15] hover:shadow-xl"
                  >
                    <div
                      className={cn(
                        "absolute -right-8 -top-8 h-24 w-24 rounded-full blur-3xl transition-all duration-500 group-hover:scale-150",
                        colors.glow
                      )}
                    />
                    <CardContent className="relative space-y-4 p-6">
                      <div className="space-y-2">
                        <h3 className="text-base font-semibold text-neutral-100">
                          {section.title}
                        </h3>
                        <p className="text-sm text-neutral-400">{section.description}</p>
                      </div>
                      <ul className="space-y-2 text-xs text-neutral-400">
                        {section.bullets.map((bullet, bulletIdx) => (
                          <li key={bulletIdx} className="flex items-start gap-2">
                            <span
                              className={cn(
                                "mt-1.5 h-1 w-1 shrink-0 rounded-full bg-current",
                                colors.text
                              )}
                            />
                            <span className="transition-colors duration-300 group-hover:text-neutral-300">
                              {bullet}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Compliance Framework */}
          <section ref={complianceRef} className="space-y-8">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-white md:text-4xl">Compliance Framework</h2>
              <p className="max-w-3xl text-base leading-relaxed text-neutral-400">
                Built to align with Indian data protection regulations and industry standards.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {complianceItems.map((item, idx) => (
                <Card
                  key={item.title}
                  className={cn(
                    "js-compliance-card group relative h-full overflow-hidden border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm transition-all duration-300 hover:border-white/[0.15] hover:shadow-xl",
                    idx % 2 === 0 ? "hover:shadow-emerald-500/5" : "hover:shadow-blue-500/5"
                  )}
                >
                  <div
                    className={cn(
                      "absolute -right-8 -top-8 h-32 w-32 rounded-full blur-3xl transition-all duration-500 group-hover:scale-150",
                      idx % 2 === 0 ? "bg-emerald-500/10" : "bg-blue-500/10"
                    )}
                  />

                  <CardContent className="relative space-y-3 p-6">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-sm font-semibold text-neutral-100">{item.title}</h3>
                      <span
                        className={cn(
                          "shrink-0 rounded-full px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide",
                          complianceStatusStyles[item.status]
                        )}
                      >
                        {item.status}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed text-neutral-400">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="js-compliance-card group relative overflow-hidden rounded-xl border border-blue-500/20 bg-blue-500/[0.03] p-6 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/30">
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl transition-all duration-500 group-hover:scale-150" />
              <div className="relative flex items-start gap-4">
                <div className="rounded-lg bg-blue-500/10 p-2 text-blue-400 ring-1 ring-blue-500/30">
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
            </div>
          </section>

          {/* Data Protection & Your Rights */}
          <section ref={dataRightsRef} className="space-y-8">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-white md:text-4xl">Your Data, Your Control</h2>
              <p className="max-w-3xl text-base leading-relaxed text-neutral-400">
                We believe you should have complete control over your institutional data.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {dataRightsItems.map((item) => {
                const colors = accentColors[item.color];
                return (
                  <div
                    key={item.title}
                    className="js-rights-card group flex gap-4 rounded-lg border border-white/[0.08] bg-white/[0.02] p-5 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.04]"
                  >
                    <div
                      className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ring-1 transition-all duration-300",
                        colors.bg,
                        colors.text,
                        colors.border,
                        "group-hover:scale-110"
                      )}
                    >
                      {item.icon}
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-semibold text-neutral-100">{item.title}</h3>
                      <p className="text-xs leading-relaxed text-neutral-400">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Security Assurance & Documentation */}
          <section ref={assuranceRef} className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-white md:text-3xl">
                Security Assurance & Documentation
              </h2>
              <p className="max-w-3xl text-base leading-relaxed text-neutral-400">
                We can provide security documentation and supporting materials under NDA to help
                with procurement, vendor assessments, and onboarding.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="js-assurance-animate relative isolate">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-6 z-0 rounded-2xl blur-2xl"
                >
                  <div
                    className="absolute inset-0 h-full w-full rounded-2xl opacity-50"
                    style={{
                      background:
                        "radial-gradient(ellipse 180% 80% at 70% -20%, rgba(30,58,138,0.25) 0%, rgba(0,0,0,0) 70%)",
                    }}
                  />
                  <div
                    className="absolute -bottom-6 left-1/2 h-28 w-52 -translate-x-1/2 rounded-full opacity-50"
                    style={{
                      background:
                        "radial-gradient(circle at 60% 40%, rgba(8,145,178,0.4) 0%, transparent 70%)",
                    }}
                  />
                </div>
                <Card className="relative z-10 border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm">
                  <CardContent className="space-y-4 p-6">
                    <h3 className="text-sm font-semibold text-neutral-100">Available on request</h3>
                    <ul className="space-y-2 text-xs text-neutral-400">
                      {securityAssuranceItems.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-blue-400" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card className="js-assurance-animate border border-white/[0.08] bg-gradient-to-br from-blue-500/[0.05] via-neutral-950 to-neutral-950 backdrop-blur-sm">
                <CardContent className="space-y-4 p-6">
                  <h3 className="text-sm font-semibold text-neutral-100">
                    Request the security packet
                  </h3>
                  <p className="text-xs leading-relaxed text-neutral-400">
                    We share documentation, summaries, and answers to vendor security questionnaires
                    within one business day.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/contact-us"
                      className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-900 transition-all duration-300 hover:bg-neutral-200"
                    >
                      Request Security Packet
                      <ChevronRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </Link>
                    <Link
                      href="/contact-us"
                      className="inline-flex items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] px-5 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-200 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]"
                    >
                      Talk to Sales
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="js-assurance-animate space-y-3">
              <h3 className="text-lg font-semibold text-neutral-100">Legal & policy documents</h3>
              <p className="max-w-3xl text-sm leading-relaxed text-neutral-400">
                Public policy documents remain available for review at any time.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {[
                { title: "Privacy Policy", href: "/privacy-policy" },
                { title: "Data Processing Addendum", href: "/data-processing-addendum" },
                { title: "Terms of Service", href: "/terms-of-service" },
              ].map((doc) => (
                <Link
                  key={doc.title}
                  href={doc.href}
                  className="js-assurance-animate group flex items-center justify-between rounded-lg border border-white/[0.08] bg-white/[0.02] p-4 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.04]"
                >
                  <span className="text-sm font-medium text-neutral-200 group-hover:text-white">
                    {doc.title}
                  </span>
                  <ChevronRight className="h-4 w-4 text-neutral-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-neutral-300" />
                </Link>
              ))}
            </div>
          </section>

          {/* Security FAQ */}
          <section ref={faqRef} className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-white md:text-3xl">Security FAQ</h2>
              <p className="max-w-3xl text-base leading-relaxed text-neutral-400">
                Quick answers for procurement teams, IT leaders, and administrators.
              </p>
            </div>

            <div className="space-y-3">
              {securityFaqs.map((faq) => (
                <details
                  key={faq.question}
                  className="js-faq-item group rounded-2xl border border-white/[0.08] bg-white/[0.02] px-5 py-4 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.12] open:border-blue-500/20 open:bg-blue-500/[0.02]"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-neutral-100">
                    <span className="transition-colors duration-300 group-hover:text-white">
                      {faq.question}
                    </span>
                    <span className="rounded-full bg-white/[0.05] px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-blue-300 transition group-open:bg-emerald-500/10 group-open:text-emerald-300">
                      View
                    </span>
                  </summary>
                  <p className="mt-3 text-xs leading-relaxed text-neutral-400">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Questions or Security Review CTA */}
          <section
            ref={ctaRef}
            className="mt-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 backdrop-blur-sm"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-neutral-50">
                  Need a security review or have questions?
                </h3>
                <p className="max-w-2xl text-sm leading-relaxed text-neutral-400">
                  Our team can walk you through our security architecture, provide audit reports, or
                  arrange a dedicated security review for your institution's requirements.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <BookCallCta context="security-page" className="justify-center sm:w-auto" />
                <Link
                  href="mailto:security@squarecampus.com"
                  className="inline-flex items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] px-5 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-200 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]"
                >
                  Email Security Team
                </Link>
              </div>
            </div>
          </section>

          {/* Footer Note */}
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.01] p-6">
            <p className="text-xs leading-relaxed text-neutral-500">
              <strong className="text-neutral-400">Security Disclosure:</strong> If you discover a
              security vulnerability in SquareCampus, please report it to{" "}
              <a
                href="mailto:security@squarecampus.com"
                className="text-blue-400 transition-colors duration-200 hover:text-blue-300"
              >
                security@squarecampus.com
              </a>
              . We take all reports seriously and will respond promptly. We appreciate responsible
              disclosure and will work with you to address any issues promptly.
            </p>
          </div>
        </div>
      </main>

      <FloatingHomeButton href="/" label="Back to home" />
    </>
  );
}
