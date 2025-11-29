"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const faqHighlights = [
  "Launch and onboard in under seven working days",
  "99.9% uptime on a modern, multi-tenant cloud",
  "Dedicated success partner plus 24x7 support",
];

const FAQs = [
  {
    question: "What does SquareCampus actually replace?",
    answer:
      "SquareCampus consolidates admissions, academics, finance, communication, transport, hostel, library, and compliance into one OS,replacing the patchwork of ERPs, SMS tools, and spreadsheets.",
  },
  {
    question: "Who is it for?",
    answer:
      "Schools, colleges, universities, and multi-branch groups that need predictable, connected daily operations with enterprise-grade security.",
  },
  {
    question: "How fast can we go live?",
    answer:
      "Typical launch is under seven working days with migration support, role-based training, and a success partner to configure your policies and timelines.",
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
      "Mobile apps are on the roadmap. Today, SquareCampus is fully responsive across devices so staff, students, and parents can act from any browser.",
  },
  {
    question: "What about support after launch?",
    answer:
      "You get a named success partner, live chat/email support, and proactive health checks. We help with new session rollovers, audits, and policy tweaks.",
  },
  {
    question: "How do you price?",
    answer:
      "Pricing is based on student count, modules selected, and branches. We tailor a quote to your context during the demo.",
  },
  {
    question: "How does SquareCampus prove ROI?",
    answer:
      "Automation reduces manual hours, dues collection leakage drops, and leadership gets real-time insight,saving 15–20 hours per team weekly on average.",
  },
  {
    question: "How often is the product updated?",
    answer:
      "Updates ship continuously with zero-downtime releases,covering new capabilities, performance boosts, and security patches.",
  },
  {
    question: "How do we get started?",
    answer:
      "Book a tailored demo. We’ll map your workflows, share a rollout plan, and align on timelines and pricing.",
  },
];

export function FAQ() {
    const [open, setOpen] = useState<string | null>(null);
    return (
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-20 md:grid-cols-[2fr,1fr] md:px-8 md:py-40" id={'faq'}>
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-4xl font-medium tracking-tight text-neutral-50 md:text-5xl">
                Frequently asked questions
              </h2>
              <p className="max-w-xl text-base text-neutral-200">
                Everything you need to know about adopting SquareCampus,and why campuses of every size call it their operating system.
              </p>
            </div>
            <div className="grid gap-4 rounded-2xl border border-white/10 bg-neutral-900/80 p-4 text-xs uppercase tracking-[0.4em] text-white/70 sm:grid-cols-3">
              {faqHighlights.map((highlight) => (
                <p key={highlight} className="text-center text-[0.65rem]">
                  {highlight}
                </p>
              ))}
            </div>
            <div className="space-y-4">
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
                <a href="mailto:support@squarecampus.com" className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-white/40">
                  <span>Email: support@squarecampus.com</span>
                  <span className="text-xs uppercase tracking-[0.3em] text-blue-300">24h reply</span>
                </a>
                <Link href="#contact-us" className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-white/40">
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
                  <span>Migration support for admissions, academics, finance, and communication history.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-[6px] inline-flex h-2 w-2 rounded-full bg-orange-400" />
                  <span>Role-based onboarding and training for admins, teachers, finance, and support teams.</span>
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
        <div
            className="shadow-input mb-8 w-full cursor-pointer rounded-lg bg-neutral-900 p-4"
            onClick={() => {
                if (isOpen) {
                    setOpen(null);
                } else {
                    setOpen(question);
                }
            }}
        >
            <div className="flex items-start">
                <div className="relative mr-4 mt-1 h-6 w-6 flex-shrink-0">
                    <IconChevronUp
                        className={cn(
                            "absolute inset-0 h-6 w-6 transform text-white transition-all duration-200",
                            isOpen && "rotate-90 scale-0",
                        )}
                    />
                    <IconChevronDown
                        className={cn(
                            "absolute inset-0 h-6 w-6 rotate-90 scale-0 transform text-white transition-all duration-200",
                            isOpen && "rotate-0 scale-100",
                        )}
                    />
                </div>
                <div>
                    <h3 className="text-lg font-medium text-neutral-200">
                        {question}
                    </h3>
                    <AnimatePresence mode="wait">
                        {isOpen && (
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: "auto" }}
                                exit={{ height: 0 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="overflow-hidden text-neutral-400"
                            >
                                {answer.split("").map((line, index) => (
                                    <motion.span
                                        initial={{ opacity: 0, filter: "blur(5px)" }}
                                        animate={{ opacity: 1, filter: "blur(0px)" }}
                                        exit={{ opacity: 0, filter: "blur(0px)" }}
                                        transition={{
                                            duration: 0.2,
                                            ease: "easeOut",
                                            delay: index * 0.005,
                                        }}
                                        key={index}
                                    >
                                        {line}
                                    </motion.span>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};
