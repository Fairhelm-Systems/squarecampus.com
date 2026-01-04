"use client";
import { useRef, useState } from "react";
import Link from "next/link";

import { ChevronDown, ChevronUp } from "@/components/icons";
import { useGsapReveal } from "@/lib/gsap-utils";
import { cn } from "@/lib/utils";

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
  const listRef = useRef<HTMLDivElement | null>(null);

  useGsapReveal(sectionRef, { y: 24 });
  useGsapReveal(listRef, { selector: ".js-faq-item", stagger: 0.06 });

  return (
    <div
      ref={sectionRef}
      className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 md:grid-cols-[2fr,1fr] md:px-8 md:py-20"
      id={"faq"}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-medium tracking-tight text-neutral-50 sm:text-4xl md:text-5xl">
            Frequently asked questions
          </h2>
          <p className="max-w-xl text-sm text-neutral-200 sm:text-base">
            Everything you need to know about adopting SquareCampus, and why campuses of every size
            call it their operating system.
          </p>
        </div>
        <div className="grid gap-3 rounded-2xl border border-white/10 bg-neutral-900/80 p-4 text-xs uppercase tracking-[0.4em] text-white/70 sm:grid-cols-3">
          {faqHighlights.map((highlight, idx) => (
            <p
              key={highlight}
              className={cn("text-center text-[0.6rem] sm:text-[0.65rem]", idx === 2 && "hidden sm:block")}
            >
              {highlight}
            </p>
          ))}
        </div>
        <div ref={listRef} className="space-y-4">
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
      <div className="space-y-4">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-neutral-900/80 to-neutral-950 p-6 shadow-2xl shadow-black/50">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/60">
            Need a faster answer?
          </p>
          <h3 className="mt-3 text-xl font-semibold text-white">Talk to a human</h3>
          <p className="mt-2 text-sm text-neutral-200">
            Get a tailored walkthrough, migration plan, and security notes in one call.
          </p>
          <div className="mt-4 space-y-2 text-sm text-neutral-100">
            <a
              href="mailto:support@squarecampus.com"
              className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-white/40"
            >
              <span>Email: support@squarecampus.com</span>
              <span className="text-xs uppercase tracking-[0.3em] text-blue-300">Quick reply</span>
            </a>
            <Link
              href="#contact-us"
              className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-white/40"
            >
              <span>Book a demo</span>
              <span className="text-xs uppercase tracking-[0.3em] text-blue-300">Personalized</span>
            </Link>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/10 via-neutral-900 to-purple-500/10 p-6 shadow-2xl shadow-black/50">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/60">
            Objection busters
          </p>
          <ul className="mt-3 space-y-3 text-sm text-neutral-100">
            <li className="flex items-start gap-2">
              <span className="mt-[6px] inline-flex h-2 w-2 rounded-full bg-blue-400" />
              <span>Multi-branch ready with consistent policies and branch-level controls.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-[6px] inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              <span>
                Migration support for admissions, academics, finance, and communication history.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-[6px] inline-flex h-2 w-2 rounded-full bg-orange-400" />
              <span>
                Role-based onboarding and training for admins, teachers, finance, and support teams.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-[6px] inline-flex h-2 w-2 rounded-full bg-purple-400" />
              <span>Offline-safe workflows with sync for low-connectivity environments.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
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

  return (
    <button
      type="button"
      onClick={() => setOpen(isOpen ? null : question)}
      className={cn(
        "relative w-full rounded-2xl border border-white/10 bg-neutral-900/70 p-4 text-left shadow-lg shadow-black/40 transition-all duration-300",
        "hover:border-white/25 hover:bg-neutral-900 hover:-translate-y-0.5 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60",
        "js-faq-item"
      )}
    >
      <span className="absolute inset-x-4 top-0 block h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-60" />

      <div className="flex items-start gap-3">
        <div className="relative mt-1 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70">
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-300",
              isOpen && "-rotate-180 opacity-0"
            )}
          />
          <ChevronUp
            className={cn(
              "absolute h-4 w-4 transition-transform duration-300",
              isOpen ? "rotate-0 opacity-100" : "rotate-180 opacity-0"
            )}
          />
        </div>

        <div className="flex-1 space-y-2">
          <h3 className="text-base font-semibold text-neutral-50">{question}</h3>

          {isOpen && (
            <p className="text-xs leading-relaxed text-neutral-300 sm:text-sm">{answer}</p>
          )}
        </div>
      </div>
    </button>
  );
};
