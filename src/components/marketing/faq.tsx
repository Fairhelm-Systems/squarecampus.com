"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, MessageSquare } from "@/components/icons";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const faqHighlights = [
  "Launch and onboard with a guided rollout",
  "Resilient uptime on a modern cloud stack",
  "Dedicated success partner plus responsive support",
];

const FAQs = [
  {
    question: "What does SquareCampus actually replace?",
    answer:
      "SquareCampus consolidates admissions, academics, finance, communication, transport, hostel, library, and compliance into one OS, replacing the patchwork of ERPs, SMS tools, and spreadsheets.",
  },
  {
    question: "Who is it for?",
    answer:
      "Schools, colleges, universities, and multi-branch groups that need predictable, connected daily operations with enterprise-grade security.",
  },
  {
    question: "How fast can we go live?",
    answer:
      "Typical launch is measured in days, not months, with migration support, role-based training, and a success partner to configure your policies and timelines.",
  },
  {
    question: "How secure is our data?",
    answer:
      "Data is encrypted in transit and at rest, access is role-based, audit trails are default, and the platform runs on a resilient, monitored cloud with backups.",
  },
  {
    question: "Will it integrate with our existing systems?",
    answer:
      "Yes. We provide APIs and connectors for LMS, ERP, HR, and payment partners so data flows cleanly without manual exports.",
  },
  {
    question: "Do you have mobile apps?",
    answer:
      "Yes. Parents and students use mobile apps, and staff have a full responsive web experience for day-to-day work.",
  },
  {
    question: "What about support after launch?",
    answer:
      "You get a named success partner, live chat/email support, and proactive health checks. We help with new session rollovers, audits, and policy tweaks.",
  },
  {
    question: "How do you price?",
    answer:
      "Pricing is based on student count and campus structure. We share a clear quote after understanding your workflows during the demo.",
  },
  {
    question: "How does SquareCampus prove ROI?",
    answer:
      "Automation reduces manual hours, collections get more predictable, and leadership sees live insight without manual consolidation.",
  },
  {
    question: "How often is the product updated?",
    answer:
      "Updates ship continuously with zero-downtime releases, covering new capabilities, performance boosts, and security patches.",
  },
  {
    question: "How do we get started?",
    answer:
      "Book a tailored demo. We'll map your workflows, share a rollout plan, and align on timelines and pricing.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  // GSAP scroll animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // FAQ items animation
      if (listRef.current) {
        const items = listRef.current.querySelectorAll(".js-faq-item");
        gsap.fromTo(
          items,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Sidebar animation
      if (sidebarRef.current) {
        gsap.fromTo(
          sidebarRef.current.children,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sidebarRef.current,
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
      id="faq"
      className="relative mx-auto grid w-full max-w-7xl gap-8 px-4 py-16 md:grid-cols-[2fr,1fr] md:px-8 md:py-24"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/3 top-1/4 h-[400px] w-[400px] rounded-full bg-blue-500/[0.05] blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-purple-500/[0.05] blur-[100px]" />
      </div>

      <div className="space-y-6">
        {/* Heading */}
        <div ref={headingRef} className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 backdrop-blur-sm">
            <MessageSquare className="h-4 w-4 text-blue-400" />
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-neutral-400">
              FAQ
            </span>
          </div>

          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            Frequently asked{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              questions
            </span>
          </h2>

          <p className="max-w-xl text-sm leading-relaxed text-neutral-400 sm:text-base">
            Everything you need to know about adopting SquareCampus, and why
            campuses of every size call it their operating system.
          </p>
        </div>

        {/* Highlights */}
        <div className="grid gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 backdrop-blur-sm sm:grid-cols-3">
          {faqHighlights.map((highlight, idx) => (
            <p
              key={highlight}
              className={cn(
                "text-center text-[0.6rem] font-medium uppercase tracking-[0.3em] text-neutral-400 sm:text-[0.65rem]",
                idx === 2 && "hidden sm:block"
              )}
            >
              {highlight}
            </p>
          ))}
        </div>

        {/* FAQ List */}
        <div ref={listRef} className="space-y-3">
          {FAQs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              open={open}
              setOpen={setOpen}
            />
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <div ref={sidebarRef} className="space-y-4">
        {/* Talk to human card */}
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-neutral-900/50 p-6 backdrop-blur-sm">
          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl" />

          <p className="text-[0.6rem] font-medium uppercase tracking-[0.3em] text-neutral-500">
            Need a faster answer?
          </p>
          <h3 className="mt-3 text-xl font-semibold text-white">
            Talk to a human
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-neutral-400">
            Get a tailored walkthrough, migration plan, and security notes in
            one call.
          </p>

          <div className="mt-4 space-y-2">
            <a
              href="mailto:support@squarecampus.com"
              className="group flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.05]"
            >
              <span className="text-sm text-neutral-200">
                support@squarecampus.com
              </span>
              <span className="text-[0.6rem] font-medium uppercase tracking-[0.2em] text-blue-400">
                Quick reply
              </span>
            </a>
            <Link
              href="/contact-us"
              className="group flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.05]"
            >
              <span className="text-sm text-neutral-200">Book a demo</span>
              <span className="text-[0.6rem] font-medium uppercase tracking-[0.2em] text-blue-400">
                Personalized
              </span>
            </Link>
          </div>
        </div>

        {/* Objection busters card */}
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-blue-500/[0.08] via-neutral-900/50 to-purple-500/[0.08] p-6 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-blue-400" />
            <p className="text-[0.6rem] font-medium uppercase tracking-[0.3em] text-neutral-500">
              Objection busters
            </p>
          </div>

          <ul className="mt-4 space-y-3">
            {[
              {
                text: "Multi-branch ready with consistent policies and branch-level controls.",
                color: "bg-blue-400",
              },
              {
                text: "Migration support for admissions, academics, finance, and communication history.",
                color: "bg-emerald-400",
              },
              {
                text: "Role-based onboarding and training for admins, teachers, finance, and support teams.",
                color: "bg-amber-400",
              },
              {
                text: "Offline-safe workflows with sync for low-connectivity environments.",
                color: "bg-purple-400",
              },
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span
                  className={cn(
                    "mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full",
                    item.color
                  )}
                />
                <span className="text-sm leading-relaxed text-neutral-300">
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const FAQItem = ({
  question,
  answer,
  setOpen,
  open,
}: {
  question: string;
  answer: string;
  open: string | null;
  setOpen: (open: string | null) => void;
}) => {
  const isOpen = open === question;
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <button
      type="button"
      onClick={() => setOpen(isOpen ? null : question)}
      className={cn(
        "js-faq-item group relative w-full overflow-hidden rounded-xl text-left",
        "border border-white/[0.08] bg-neutral-900/50 backdrop-blur-sm",
        "transition-all duration-300",
        "hover:border-white/15 hover:bg-neutral-900/70",
        isOpen && "border-white/15"
      )}
    >
      {/* Top gradient line */}
      <span className="pointer-events-none absolute inset-x-4 top-0 block h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div
            className={cn(
              "mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg",
              "border border-white/[0.08] bg-white/[0.03]",
              "transition-all duration-300",
              isOpen && "border-blue-500/30 bg-blue-500/10"
            )}
          >
            <ChevronDown
              className={cn(
                "h-4 w-4 text-neutral-400 transition-all duration-300",
                isOpen && "rotate-180 text-blue-400"
              )}
            />
          </div>

          <div className="flex-1">
            <h3 className="text-sm font-semibold text-white sm:text-base">
              {question}
            </h3>

            <div
              ref={contentRef}
              className={cn(
                "grid transition-all duration-300",
                isOpen ? "mt-2 grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden">
                <p className="text-xs leading-relaxed text-neutral-400 sm:text-sm">
                  {answer}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};
