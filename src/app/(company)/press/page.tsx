"use client";

import Link from "next/link";
import { motion } from "@/lib/motion";
import { FloatingHomeButton } from "@/components/marketing/floating-home-button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare } from "@/icons";

type PressItem = {
  slug: string;
  title: string;
  date: string;
  outlet: string;
  summary: string;
  href?: string; // optional external link if covered by media
};

// Press releases & coverage – add items here as they go live.
const pressItems: PressItem[] = [
  // {
  //   slug: "seed-round-announcement",
  //   title: "SquareCampus announces seed funding to power modern schools",
  //   date: "2026-02-01",
  //   outlet: "SquareCampus",
  //   summary:
  //     "Funding to deepen product, expand infrastructure, and support institutions across India.",
  //   href: "https://squarecampus.com/blog/seed-round-announcement",
  // },
];

export default function PressPage() {
  const hasPress = pressItems.length > 0;

  return (
    <>
      <main className="relative min-h-[100dvh] overflow-hidden bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 px-4 py-16 sm:px-6 lg:px-10">
        {/* Animated background orbs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-sky-500/10 blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-violet-500/10 blur-[128px]" />
        </div>

        <div className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10">
          {/* Header */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-neutral-400 backdrop-blur-sm">
              <MessageSquare className="h-3 w-3" />
              Press
            </div>
            <div className="space-y-3">
              <h1 className="bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-3xl font-bold text-transparent md:text-5xl">
                Press resources & media contact
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-neutral-300">
                For journalists, partners, and event organizers who need a concise view of what
                SquareCampus does and how to reach us.
              </p>
            </div>
          </motion.section>

          {/* Company snapshot */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid gap-6 md:grid-cols-3"
          >
            {[
              {
                title: "Overview",
                content:
                  "SquareCampus is an operating system for schools and colleges, connecting admissions, academics, finance, and communication into one platform.",
              },
              {
                title: "Founded",
                content:
                  "SquareCampus Private Limited is led by Founder & CTO Mohit Gupta and Co-founder & CMO Dhanraj Kotian.",
              },
              {
                title: "Media contact",
                content: (
                  <>
                    For media enquiries, please write to{" "}
                    <Link
                      href="mailto:press@squarecampus.com"
                      className="text-sky-400 underline-offset-4 hover:underline"
                    >
                      press@squarecampus.com
                    </Link>
                    .
                  </>
                ),
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <Card className="relative overflow-hidden border border-white/10 bg-gradient-to-br from-neutral-900/80 to-neutral-950 shadow-xl shadow-black/20 transition-all duration-300 hover:border-white/20">
                  <CardContent className="space-y-2 p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">
                      {item.title}
                    </p>
                    <p className="text-sm leading-relaxed text-neutral-300">{item.content}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.section>

          {/* Press releases / coverage */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between gap-2">
              <h2 className="bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-sm font-semibold uppercase tracking-[0.25em] text-transparent">
                Press releases & coverage
              </h2>
              <span className="text-xs text-neutral-500">
                {hasPress ? `${pressItems.length} item(s)` : "No press items yet"}
              </span>
            </div>

            {hasPress ? (
              <div className="space-y-4">
                {pressItems.map((item, index) => (
                  <motion.div
                    key={item.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  >
                    <Card className="group relative overflow-hidden border border-white/10 bg-gradient-to-br from-neutral-900/80 to-neutral-950 shadow-xl shadow-black/20 transition-all duration-300 hover:border-white/20 hover:shadow-2xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 via-violet-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <CardContent className="relative flex flex-col gap-3 p-6 md:flex-row md:items-start md:justify-between">
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400">
                            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 uppercase tracking-[0.2em]">
                              {item.outlet}
                            </span>
                            <span>{item.date}</span>
                          </div>
                          <p className="text-base font-semibold text-white">{item.title}</p>
                          <p className="text-sm leading-relaxed text-neutral-300">{item.summary}</p>
                        </div>
                        {item.href && (
                          <div className="pt-2 md:pt-0">
                            <Link
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white transition-all hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
                            >
                              View article
                            </Link>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <Card className="relative overflow-hidden border border-dashed border-white/10 bg-gradient-to-br from-neutral-900/60 to-neutral-950/80 shadow-xl backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent" />
                <CardContent className="relative space-y-4 p-8">
                  <div className="inline-flex rounded-lg border border-white/10 bg-white/5 p-3">
                    <MessageSquare className="h-6 w-6 text-sky-400" />
                  </div>
                  <p className="text-lg font-semibold text-white">
                    No press releases published yet.
                  </p>
                  <p className="text-sm leading-relaxed text-neutral-300">
                    We'll share announcements and coverage here as we grow. For official quotes,
                    background, or data points, reach out and we'll respond with what you need.
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <Link
                      href="mailto:press@squarecampus.com"
                      className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 font-semibold uppercase tracking-[0.22em] text-white transition-all hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
                    >
                      Email media contact
                    </Link>
                    <Link
                      href="https://www.linkedin.com/company/square-campus"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 font-semibold uppercase tracking-[0.22em] text-white transition-all hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
                    >
                      Follow on LinkedIn
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.section>
        </div>
      </main>
      <FloatingHomeButton href="/" label="Back to home" />
    </>
  );
}
