"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IconMailFilled } from "@tabler/icons-react";
import Link from "next/link";
import Script from "next/script";
import type React from "react";
import { useEffect, useId, useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { FloatingHomeButton } from "@/components/marketing/floating-home-button";
import { Logo } from "@/components/marketing/logo";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Shield,
  Sparkles,
  Users,
  Zap,
} from "@/components/icons";
import { cn } from "@/lib/utils";
import {
  createBreadcrumbSchema,
  createContactPageSchema,
  createContactFAQSchema,
  SEO_CONFIG,
} from "@/lib/seo";

gsap.registerPlugin(ScrollTrigger);

type ContactFormData = {
  name: string;
  email: string;
  institution: string;
  role?: string;
  students?: string;
  message?: string;
  website?: string;
};

const contactMethods = [
  {
    icon: <Mail className="h-5 w-5" />,
    title: "Email us",
    value: "contact@squarecampus.com",
    href: "mailto:contact@squarecampus.com",
    description: "For general inquiries and demos",
    color: "blue",
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Security team",
    value: "security@squarecampus.com",
    href: "mailto:security@squarecampus.com",
    description: "For security reviews and compliance",
    color: "emerald",
  },
  {
    icon: <MessageSquare className="h-5 w-5" />,
    title: "Support",
    value: "support@squarecampus.com",
    href: "mailto:support@squarecampus.com",
    description: "For existing customers",
    color: "purple",
  },
];

const whyReachOut = [
  {
    icon: <Users className="h-4 w-4" />,
    title: "Book a demo",
    description: "See SquareCampus in action with your use cases",
  },
  {
    icon: <Zap className="h-4 w-4" />,
    title: "Get pricing",
    description: "Tailored to your institution size and needs",
  },
  {
    icon: <Clock className="h-4 w-4" />,
    title: "Migration support",
    description: "Understand the path from your current setup",
  },
  {
    icon: <Shield className="h-4 w-4" />,
    title: "Security review",
    description: "Request our security packet and compliance docs",
  },
];

const responseCommitments = [
  "Response within one business day",
  "Dedicated success partner assigned",
  "Security packet available on request",
];

const accentColors: Record<string, { border: string; bg: string; text: string; glow: string }> = {
  blue: { border: "border-blue-500/30", bg: "bg-blue-500/10", text: "text-blue-400", glow: "bg-blue-500/20" },
  emerald: { border: "border-emerald-500/30", bg: "bg-emerald-500/10", text: "text-emerald-400", glow: "bg-emerald-500/20" },
  purple: { border: "border-purple-500/30", bg: "bg-purple-500/10", text: "text-purple-400", glow: "bg-purple-500/20" },
};

function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className={cn(
            "absolute h-1 w-1 rounded-full",
            i % 3 === 0 ? "bg-blue-400/25" : i % 3 === 1 ? "bg-emerald-400/25" : "bg-purple-400/25"
          )}
          style={{
            left: `${8 + (i * 7) % 84}%`,
            top: `${10 + (i * 11) % 80}%`,
            animation: `float-contact ${8 + (i % 4) * 2}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes float-contact {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
          50% { transform: translateY(-15px) translateX(8px); opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}

function GridPattern({ width, height, x, y, squares, ...props }: {
  width: number;
  height: number;
  x: string;
  y: string;
  squares?: number[][];
  className?: string;
}) {
  const patternId = useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([sx, sy], idx: number) => (
            <rect
              strokeWidth="0"
              key={`${sx}-${sy}-${idx}`}
              width={width + 1}
              height={height + 1}
              x={sx * width}
              y={sy * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}

function FormGrid({ size = 20 }: { size?: number }) {
  const seed = useId();
  const seededRandom = (seedValue: string) => {
    let hash = 0;
    for (let i = 0; i < seedValue.length; i += 1) {
      hash = (hash << 5) - hash + seedValue.charCodeAt(i);
      hash |= 0;
    }
    return () => {
      hash = (hash * 1664525 + 1013904223) | 0;
      return (hash >>> 0) / 4294967296;
    };
  };
  const rand = seededRandom(seed);
  const pattern = Array.from({ length: 5 }, () => [
    Math.floor(rand() * 4) + 7,
    Math.floor(rand() * 6) + 1,
  ]);

  return (
    <div className="pointer-events-none absolute left-1/2 top-0 -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/30 to-zinc-900/30 opacity-10 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)]">
        <GridPattern
          width={size}
          height={size}
          x="-12"
          y="4"
          squares={pattern}
          className="absolute inset-0 h-full w-full fill-white/100 stroke-white/100 mix-blend-overlay"
        />
      </div>
    </div>
  );
}

export default function ContactPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const methodsRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    institution: "",
    role: "",
    students: "",
    message: "",
    website: "",
  });

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
          { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out" }
        );
      }

      // Methods section
      if (methodsRef.current) {
        gsap.fromTo(
          methodsRef.current.querySelectorAll(".js-method-card"),
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out",
            scrollTrigger: { trigger: methodsRef.current, start: "top 85%" },
          }
        );
      }

      // Form
      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { autoAlpha: 0, x: 30 },
          {
            autoAlpha: 1, x: 0, duration: 0.6, ease: "power2.out",
            scrollTrigger: { trigger: formRef.current, start: "top 85%" },
          }
        );
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (result.success) {
          toast.success(result.message);
          setFormData({
            name: "",
            email: "",
            institution: "",
            role: "",
            students: "",
            message: "",
            website: "",
          });
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        console.error("Form submission error:", error);
        toast.error("Failed to submit form. Please try again.");
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const pageUrl = `${SEO_CONFIG.baseUrl}/contact-us`;
  const contactPageSchema = createContactPageSchema({
    name: "Contact SquareCampus | Book a Demo of India's Best School Management System",
    description: "Contact SquareCampus for a personalized demo of India's leading school management system. Get pricing, migration support, and see how 500+ schools streamline operations.",
    url: pageUrl,
  });
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: SEO_CONFIG.baseUrl },
    { name: "Contact Us", url: pageUrl },
  ]);
  const faqSchema = createContactFAQSchema();

  return (
    <>
      <div ref={pageRef} className="relative min-h-screen overflow-hidden bg-neutral-950 text-white">
        {/* Background effects */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-10 top-20 h-80 w-80 rounded-full bg-blue-500/[0.06] blur-[120px]" />
          <div className="absolute right-10 top-1/3 h-72 w-72 rounded-full bg-purple-500/[0.05] blur-[100px]" />
          <div className="absolute bottom-1/4 left-1/3 h-96 w-96 rounded-full bg-emerald-500/[0.04] blur-[140px]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        </div>

        <FloatingParticles />

        {/* Hero */}
        <section ref={heroRef} className="relative px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <div className="js-hero-animate mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-blue-200">
                <Sparkles className="h-4 w-4" />
                Get in Touch
              </div>

              <h1 className="js-hero-animate mb-5 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Let's build your{" "}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                  school command center
                </span>
              </h1>

              <p className="js-hero-animate mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-neutral-300 md:text-xl">
                Tell us about your institution - campuses, goals, and timeline. Get a tailored rollout plan,
                migration approach, and pricing designed for your setup.
              </p>
            </div>

            {/* Why reach out cards */}
            <div className="js-hero-animate grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {whyReachOut.map((item) => (
                <div
                  key={item.title}
                  className="group flex gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/30">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <p className="text-xs text-neutral-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main content: Methods + Form */}
        <section ref={methodsRef} className="relative px-4 pb-16 md:px-8 md:pb-24">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_1.3fr]">
            {/* Left: Contact methods */}
            <div className="space-y-6">
              {/* Contact method cards */}
              <div className="space-y-3">
                {contactMethods.map((method) => {
                  const colors = accentColors[method.color];
                  return (
                    <a
                      key={method.title}
                      href={method.href}
                      className="js-method-card group flex gap-4 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.04]"
                    >
                      <div className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ring-1 transition-all duration-300 group-hover:scale-105", colors.bg, colors.text, colors.border)}>
                        {method.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">{method.title}</p>
                        <p className="text-sm font-semibold text-white">{method.value}</p>
                        <p className="text-xs text-neutral-400">{method.description}</p>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-neutral-500 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-neutral-300" />
                    </a>
                  );
                })}
              </div>

              {/* Response commitments */}
              <div className="js-method-card rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 backdrop-blur-sm">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-neutral-500">Our commitment</p>
                <div className="space-y-2">
                  {responseCommitments.map((commitment) => (
                    <div key={commitment} className="flex items-center gap-2 text-sm text-neutral-300">
                      <Check className="h-4 w-4 shrink-0 text-emerald-400" />
                      <span>{commitment}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Office info */}
              <div className="js-method-card rounded-xl border border-white/[0.08] bg-gradient-to-br from-blue-500/[0.05] via-neutral-950 to-purple-500/[0.05] p-5 backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 ring-1 ring-purple-500/30">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Headquarters</p>
                    <p className="mt-1 text-sm text-neutral-300">Mumbai, India</p>
                    <p className="text-xs text-neutral-500">Data hosted in India (AWS Mumbai / Azure India)</p>
                  </div>
                </div>
              </div>

              {/* Quick links */}
              <div className="js-method-card flex flex-wrap gap-2">
                <Link
                  href="/features"
                  className="group inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-2 text-xs font-medium text-neutral-300 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
                >
                  Explore features
                  <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/security"
                  className="group inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-2 text-xs font-medium text-neutral-300 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
                >
                  Security & compliance
                  <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/why-different"
                  className="group inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-2 text-xs font-medium text-neutral-300 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
                >
                  Why School OS
                  <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>

            {/* Right: Form */}
            <form
              ref={formRef}
              id="contact-form"
              onSubmit={handleSubmit}
              className="relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-sm md:p-8"
            >
              <FormGrid size={20} />

              {/* Form header */}
              <div className="relative mb-2 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-white">Send us a message</h2>
                  <p className="text-xs text-neutral-400">We'll get back to you within one business day</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10">
                  <IconMailFilled className="h-5 w-5 text-blue-400" />
                </div>
              </div>

              {/* Honeypot field */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="relative space-y-2">
                <label className="text-[0.6rem] font-medium uppercase tracking-[0.3em] text-neutral-500" htmlFor="name">
                  Full name *
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isPending}
                  placeholder="What should we call you?"
                  className="w-full rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-neutral-600 transition-all duration-300 focus:border-white/20 focus:bg-white/[0.04] focus:outline-none focus:ring-2 focus:ring-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <div className="relative space-y-2">
                <label className="text-[0.6rem] font-medium uppercase tracking-[0.3em] text-neutral-500" htmlFor="email">
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isPending}
                  placeholder="email@yourschool.com"
                  className="w-full rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-neutral-600 transition-all duration-300 focus:border-white/20 focus:bg-white/[0.04] focus:outline-none focus:ring-2 focus:ring-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <div className="relative space-y-2">
                <label className="text-[0.6rem] font-medium uppercase tracking-[0.3em] text-neutral-500" htmlFor="institution">
                  Institution *
                </label>
                <input
                  id="institution"
                  name="institution"
                  type="text"
                  required
                  value={formData.institution}
                  onChange={handleChange}
                  disabled={isPending}
                  placeholder="Your school or college"
                  className="w-full rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-neutral-600 transition-all duration-300 focus:border-white/20 focus:bg-white/[0.04] focus:outline-none focus:ring-2 focus:ring-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <div className="relative grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-[0.6rem] font-medium uppercase tracking-[0.3em] text-neutral-500" htmlFor="role">
                    Role
                  </label>
                  <input
                    id="role"
                    name="role"
                    type="text"
                    value={formData.role}
                    onChange={handleChange}
                    disabled={isPending}
                    placeholder="Administrator, Dean..."
                    className="w-full rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-neutral-600 transition-all duration-300 focus:border-white/20 focus:bg-white/[0.04] focus:outline-none focus:ring-2 focus:ring-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[0.6rem] font-medium uppercase tracking-[0.3em] text-neutral-500" htmlFor="students">
                    Students
                  </label>
                  <input
                    id="students"
                    name="students"
                    type="text"
                    value={formData.students}
                    onChange={handleChange}
                    disabled={isPending}
                    placeholder="e.g., 1,200 across 2 branches"
                    className="w-full rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-neutral-600 transition-all duration-300 focus:border-white/20 focus:bg-white/[0.04] focus:outline-none focus:ring-2 focus:ring-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="relative space-y-2">
                <label className="text-[0.6rem] font-medium uppercase tracking-[0.3em] text-neutral-500" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isPending}
                  placeholder="Tell us about your goals, current tools, and timeline"
                  className="w-full resize-none rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-neutral-600 transition-all duration-300 focus:border-white/20 focus:bg-white/[0.04] focus:outline-none focus:ring-2 focus:ring-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="group relative mt-2 inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl p-[1px] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-50" />
                <span className="relative flex w-full items-center justify-center gap-2 rounded-[11px] bg-neutral-950 py-4 text-sm font-medium uppercase tracking-[0.25em] text-white transition-colors duration-300 group-hover:bg-neutral-900">
                  {isPending ? (
                    "Sending..."
                  ) : (
                    <>
                      Send message
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </span>
              </button>

              <p className="relative mt-1 text-center text-[0.65rem] text-neutral-500">
                By submitting, you agree to our{" "}
                <Link href="/privacy-policy" className="text-blue-400 hover:text-blue-300">
                  Privacy Policy
                </Link>
              </p>
            </form>
          </div>
        </section>

        {/* Trust footer */}
        <div className="border-t border-white/[0.06] px-4 py-8 md:px-8">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-neutral-500">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Enterprise security</span>
            </div>
            <div className="h-4 w-px bg-white/10" />
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>India data residency</span>
            </div>
            <div className="h-4 w-px bg-white/10" />
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              <span>Built for peak loads</span>
            </div>
            <div className="h-4 w-px bg-white/10" />
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Response within 1 business day</span>
            </div>
          </div>
        </div>
      </div>

      {/* Structured Data for SEO */}
      <Script
        id="contactpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <FloatingHomeButton href="/" label="Back to home" />
    </>
  );
}
