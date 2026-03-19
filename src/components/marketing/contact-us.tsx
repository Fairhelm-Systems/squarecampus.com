"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IconMailFilled } from "@tabler/icons-react";
import Link from "next/link";
import type React from "react";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { MacbookScroll } from "./macbook";
import { toast } from "sonner";
import { MaskedDots } from "./backgrounds/masked-dots";
import { Logo } from "./logo";
import { ArrowUpRight, ArrowRight, ChevronDown } from "../icons";
import { useDeviceCapabilities } from "@/hooks/use-device-capabilities";

gsap.registerPlugin(ScrollTrigger);

export type ContactFormData = {
  name: string;
  email: string;
  institution: string;
  role?: string;
  students?: string;
  message?: string;
  website?: string;
};

type GridPatternProps = React.SVGProps<SVGSVGElement> & {
  width: number;
  height: number;
  x?: number | string;
  y?: number | string;
  squares?: Array<[number, number]>;
};

const contactHighlights = [
  "Response windows shared after inquiry",
  "Strategic onboarding for every campus",
  "Dedicated customer success and security reviews",
];

export function ContactUs() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const leftPaneRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormExpanded, setIsFormExpanded] = useState(false);
  const { isMobile } = useDeviceCapabilities();
  const mountedRef = useRef(true);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    institution: "",
    role: "",
    students: "",
    message: "",
    website: "",
  });

  // GSAP scroll animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (leftPaneRef.current) {
        gsap.fromTo(
          leftPaneRef.current,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: leftPaneRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
        if (mountedRef.current) {
          setFormData({
            name: "",
            email: "",
            institution: "",
            role: "",
            students: "",
            message: "",
            website: "",
          });
        }
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to submit form. Please try again.");
    } finally {
      if (mountedRef.current) {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full px-4 py-16 md:px-6 md:py-20"
      id="contact-us"
    >
      <MaskedDots className="opacity-70 sm:opacity-85" />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Left pane: narrative + contact options */}
        <div
          ref={leftPaneRef}
          className="relative flex flex-col gap-6 overflow-hidden rounded-2xl border border-white/[0.08] bg-neutral-900/50 p-6 backdrop-blur-sm sm:p-8"
        >
          {/* Background effects */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl" />

          <div className="relative flex items-center justify-between">
            <FeatureIconContainer className="flex items-center justify-center overflow-hidden">
              <IconMailFilled className="h-6 w-6 text-blue-400" />
            </FeatureIconContainer>
            <span className="text-[0.55rem] font-medium uppercase tracking-[0.4em] text-neutral-500 sm:text-[0.6rem]">
              Let&apos;s talk
            </span>
          </div>

          <div className="relative">
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl">
              Build your campus{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                command center
              </span>{" "}
              with us
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-400 sm:text-base">
              Tell us about your campuses, goals, and timelines, and get a tailored rollout plan,
              migration approach, and pricing designed for your branches.
            </p>
          </div>

          <div className="relative grid gap-3 text-sm text-neutral-200 sm:grid-cols-2">
            <a
              href="mailto:contact@squarecampus.com"
              className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-left transition-all duration-300 hover:border-white/15 hover:bg-white/[0.05]"
            >
              <p className="text-[0.6rem] font-medium uppercase tracking-[0.3em] text-neutral-500">
                Email
              </p>
              <p className="text-sm text-white">contact@squarecampus.com</p>
            </a>
            <a
              href="#contact-form"
              className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-left transition-all duration-300 hover:border-white/15 hover:bg-white/[0.05]"
            >
              <p className="text-[0.6rem] font-medium uppercase tracking-[0.3em] text-neutral-500">
                Call
              </p>
              <p className="text-sm text-white">Request a callback</p>
            </a>
          </div>

          <div className="relative grid gap-2">
            {contactHighlights.map((highlight) => (
              <p
                key={highlight}
                className="rounded-lg border border-white/[0.04] bg-white/[0.02] px-3 py-2 text-center text-[0.55rem] font-medium uppercase tracking-[0.3em] text-neutral-500 sm:text-[0.6rem]"
              >
                {highlight}
              </p>
            ))}
          </div>

          <div className="relative flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#contact-form"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full p-[1px]"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative flex items-center gap-2 rounded-full bg-neutral-950 px-5 py-2.5 text-[0.65rem] font-medium uppercase tracking-[0.25em] text-white transition-colors duration-300 group-hover:bg-neutral-900 sm:text-[0.7rem]">
                Book a demo
              </span>
            </a>
            <Link
              href="/ecosystem"
              className="group ml-auto inline-flex items-center gap-1 text-sm text-blue-400 transition-colors duration-300 hover:text-blue-300"
            >
              Explore ecosystem
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Stats cards */}
          <div className="relative grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {[
              {
                label: "Go-live",
                value: "Guided rollout",
                sub: "Migration + role-based training",
              },
              {
                label: "Security pack",
                value: "Available",
                sub: "Policies, audits, and controls",
              },
              {
                label: "Support",
                value: "Responsive",
                sub: "Dedicated success partner",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3"
              >
                <p className="text-[0.55rem] font-medium uppercase tracking-[0.25em] text-neutral-500">
                  {item.label}
                </p>
                <p className="text-base font-semibold text-white sm:text-lg">{item.value}</p>
                <p className="text-[0.65rem] text-neutral-400">{item.sub}</p>
              </div>
            ))}
          </div>

          {/* Fast track card */}
          <div className="relative rounded-xl border border-white/[0.08] bg-gradient-to-br from-blue-500/[0.08] via-neutral-900/50 to-purple-500/[0.08] p-4">
            <p className="text-[0.6rem] font-medium uppercase tracking-[0.3em] text-neutral-500">
              Fast track
            </p>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
                <p className="text-sm font-semibold text-white">Campus blueprint</p>
                <p className="text-[0.65rem] leading-relaxed text-neutral-400">
                  Map admissions, academics, finance, and communication in one working session.
                </p>
              </div>
              <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
                <p className="text-sm font-semibold text-white">Migration clinic</p>
                <p className="text-[0.65rem] leading-relaxed text-neutral-400">
                  We migrate your active term data and set guardrails for go-live across branches.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right pane: form - Collapsible on mobile */}
        <div className="relative flex flex-col lg:h-full">
          {/* Mobile: Collapsible header */}
          {isMobile && (
            <button
              type="button"
              onClick={() => setIsFormExpanded(!isFormExpanded)}
              className="mb-3 flex w-full items-center justify-between rounded-xl border border-white/[0.08] bg-neutral-900/50 p-4 text-left backdrop-blur-sm lg:hidden"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                  <IconMailFilled className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Contact Form</p>
                  <p className="text-xs text-neutral-400">Fill out to book a demo</p>
                </div>
              </div>
              <ChevronDown
                className={cn(
                  "h-5 w-5 text-white/50 transition-transform duration-200",
                  isFormExpanded && "rotate-180"
                )}
              />
            </button>
          )}

          {/* Form - Always visible on desktop, collapsible on mobile */}
          <div
            className={cn(
              "transition-all duration-300 ease-in-out lg:block lg:h-full lg:flex-1",
              isMobile && !isFormExpanded ? "hidden" : "block"
            )}
          >
            <form
              ref={formRef}
              id="contact-form"
              onSubmit={handleSubmit}
              className="relative mx-auto flex h-full w-full max-w-2xl flex-col gap-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-neutral-900/50 p-5 backdrop-blur-sm sm:p-8 md:p-10"
            >
              <Grid size={20} />

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

              <div className="space-y-2">
                <label
                  className="text-[0.6rem] font-medium uppercase tracking-[0.3em] text-neutral-500"
                  htmlFor="name"
                >
                  Full name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  placeholder="What should we call you?"
                  className="w-full rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-neutral-600 transition-all duration-300 focus:border-white/20 focus:bg-white/[0.04] focus:outline-none focus:ring-2 focus:ring-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <div className="space-y-2">
                <label
                  className="text-[0.6rem] font-medium uppercase tracking-[0.3em] text-neutral-500"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  placeholder="email@yourschool.com"
                  className="w-full rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-neutral-600 transition-all duration-300 focus:border-white/20 focus:bg-white/[0.04] focus:outline-none focus:ring-2 focus:ring-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <div className="space-y-2">
                <label
                  className="text-[0.6rem] font-medium uppercase tracking-[0.3em] text-neutral-500"
                  htmlFor="institution"
                >
                  Institution
                </label>
                <input
                  id="institution"
                  name="institution"
                  type="text"
                  required
                  value={formData.institution}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  placeholder="Your school or college"
                  className="w-full rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-neutral-600 transition-all duration-300 focus:border-white/20 focus:bg-white/[0.04] focus:outline-none focus:ring-2 focus:ring-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label
                    className="text-[0.6rem] font-medium uppercase tracking-[0.3em] text-neutral-500"
                    htmlFor="role"
                  >
                    Role
                  </label>
                  <input
                    id="role"
                    name="role"
                    type="text"
                    value={formData.role}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    placeholder="Administrator, Dean..."
                    className="w-full rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-neutral-600 transition-all duration-300 focus:border-white/20 focus:bg-white/[0.04] focus:outline-none focus:ring-2 focus:ring-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    className="text-[0.6rem] font-medium uppercase tracking-[0.3em] text-neutral-500"
                    htmlFor="students"
                  >
                    Students
                  </label>
                  <input
                    id="students"
                    name="students"
                    type="text"
                    value={formData.students}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    placeholder="e.g., 1,200 across 2 branches"
                    className="w-full rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-neutral-600 transition-all duration-300 focus:border-white/20 focus:bg-white/[0.04] focus:outline-none focus:ring-2 focus:ring-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  className="text-[0.6rem] font-medium uppercase tracking-[0.3em] text-neutral-500"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  placeholder="Tell us about your goals, current stack, and timeline"
                  className="w-full resize-none rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-neutral-600 transition-all duration-300 focus:border-white/20 focus:bg-white/[0.04] focus:outline-none focus:ring-2 focus:ring-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative mt-2 inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl p-[1px] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-50" />
                <span className="relative flex w-full items-center justify-center gap-2 rounded-[11px] bg-neutral-950 py-4 text-sm font-medium uppercase tracking-[0.25em] text-white transition-colors duration-300 group-hover:bg-neutral-900">
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send message
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </span>
              </button>

              <p className="mt-1 text-center text-[0.65rem] text-neutral-500">
                We usually respond within one business day for new campus inquiries.
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* MacBook showcase */}
      <div className="hidden md:block">
        <MacbookScroll showGradient>
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-950 to-black">
            <div className="scale-150">
              <Logo />
            </div>
          </div>
        </MacbookScroll>
      </div>
    </section>
  );
}

export const FeatureIconContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative h-14 w-14 rounded-xl bg-gradient-to-b from-neutral-800 to-neutral-950 p-[4px]",
        className
      )}
    >
      <div className={cn("relative z-20 h-full w-full rounded-[10px] bg-neutral-800", className)}>
        {children}
      </div>
      <div className="absolute inset-x-0 bottom-0 z-30 mx-auto h-4 w-full rounded-full bg-neutral-600 opacity-50 blur-lg" />
      <div className="absolute inset-x-0 bottom-0 mx-auto h-px w-[60%] bg-gradient-to-r from-transparent via-gray-500 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 mx-auto h-[8px] w-[60%] bg-gradient-to-r from-transparent via-gray-600 to-transparent blur-sm" />
    </div>
  );
};

export const Grid = ({ pattern, size }: { pattern?: Array<[number, number]>; size?: number }) => {
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
  const p =
    pattern ??
    (() => {
      const rand = seededRandom(seed);
      return Array.from({ length: 5 }, (): [number, number] => [
        Math.floor(rand() * 4) + 7,
        Math.floor(rand() * 6) + 1,
      ]);
    })();
  return (
    <div className="pointer-events-none absolute left-1/2 top-0 -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/30 to-zinc-900/30 opacity-10 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)]">
        <GridPattern
          width={size ?? 20}
          height={size ?? 20}
          x="-12"
          y="4"
          squares={p}
          className="absolute inset-0 h-full w-full fill-white/100 stroke-white/100 mix-blend-overlay"
        />
      </div>
    </div>
  );
};

export function GridPattern({ width, height, x, y, squares, ...props }: GridPatternProps) {
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
          {squares.map(([sx, sy], idx) => (
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
