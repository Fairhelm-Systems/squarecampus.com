"use client";

import Link from "next/link";
import { motion } from "@/lib/motion";
import { FloatingHomeButton } from "@/components/marketing/floating-home-button";
import { Card, CardContent } from "@/components/ui/card";
import { Users } from "@/icons";

type Job = {
  id: string;
  title: string;
  location: string;
  type: string;
  description: string;
  // Optional later: department, level, salaryRange, applyLink, etc.
};

// Blueprint for future roles – just add objects here when roles open.
const jobs: Job[] = [
  // {
  //   id: "founding-engineer-backend",
  //   title: "Founding Backend Engineer",
  //   location: "Remote, India",
  //   type: "Full-time",
  //   description:
  //     "Help design and scale the core systems that power SquareCampus across institutions.",
  // },
];

export default function CareersPage() {
  const hasJobs = jobs.length > 0;

  return (
    <>
      <main className="relative min-h-[100dvh] overflow-hidden bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 px-4 py-16 sm:px-6 lg:px-10">
        {/* Animated background orbs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-emerald-500/10 blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-[128px]" />
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
              <Users className="h-3 w-3" />
              Careers
            </div>
            <div className="space-y-3">
              <h1 className="bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-3xl font-bold text-transparent md:text-5xl">
                Build the backbone of modern institutions
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-neutral-300">
                SquareCampus is building long-term infrastructure for schools and colleges. That
                means thoughtful engineering, calm execution, and a team that cares about
                reliability as much as speed.
              </p>
            </div>
          </motion.section>

          {/* Working at SquareCampus */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid gap-6 md:grid-cols-3"
          >
            {[
              {
                title: "Product-first culture",
                description:
                  "We optimise for quality of product and long-term stability over quick wins that don't hold in production.",
              },
              {
                title: "Thoughtful pace",
                description:
                  "We move quickly, but not chaotically. Clear scopes, clear ownership, and minimal unnecessary meetings.",
              },
              {
                title: "Impact on real campuses",
                description:
                  "Work that directly improves how schools and colleges operate every single day.",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <Card className="group relative overflow-hidden border border-white/10 bg-gradient-to-br from-neutral-900/80 to-neutral-950 shadow-xl shadow-black/20 transition-all duration-300 hover:border-white/20 hover:scale-[1.02]">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-cyan-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <CardContent className="relative space-y-2 p-6">
                    <p className="text-base font-semibold text-white">{value.title}</p>
                    <p className="text-sm leading-relaxed text-neutral-300">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.section>

          {/* Open roles / empty state */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between gap-2">
              <h2 className="bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-sm font-semibold uppercase tracking-[0.25em] text-transparent">
                Open roles
              </h2>
              <span className="text-xs text-neutral-500">
                {hasJobs ? `${jobs.length} position(s)` : "No open positions"}
              </span>
            </div>

            {hasJobs ? (
              <div className="space-y-4">
                {jobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  >
                    <Card className="group relative overflow-hidden border border-white/10 bg-gradient-to-br from-neutral-900/80 to-neutral-950 shadow-xl shadow-black/20 transition-all duration-300 hover:border-white/20 hover:shadow-2xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-cyan-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <CardContent className="relative flex flex-col gap-3 p-6 md:flex-row md:items-start md:justify-between">
                        <div className="space-y-2">
                          <p className="text-lg font-semibold text-white">{job.title}</p>
                          <p className="text-sm text-neutral-400">
                            {job.location} · {job.type}
                          </p>
                          <p className="text-sm leading-relaxed text-neutral-300">
                            {job.description}
                          </p>
                        </div>
                        <div className="pt-2 md:pt-0">
                          {/* Later: link to /careers/[id] or external ATS */}
                          <Link
                            href={`mailto:careers@squarecampus.com?subject=${encodeURIComponent(
                              `Application: ${job.title}`
                            )}`}
                            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white transition-all hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
                          >
                            Apply
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <Card className="relative overflow-hidden border border-dashed border-white/10 bg-gradient-to-br from-neutral-900/60 to-neutral-950/80 shadow-xl backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent" />
                <CardContent className="relative space-y-4 p-8">
                  <div className="inline-flex rounded-lg border border-white/10 bg-white/5 p-3">
                    <Users className="h-6 w-6 text-emerald-400" />
                  </div>
                  <p className="text-lg font-semibold text-white">
                    We're not hiring for specific roles right now.
                  </p>
                  <p className="text-sm leading-relaxed text-neutral-300">
                    We'll publish roles here as we expand the team. If you strongly believe you can
                    help shape SquareCampus, you can still reach out with a short note and your
                    profile.
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <Link
                      href="mailto:careers@squarecampus.com?subject=General%20application%20for%20SquareCampus"
                      className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 font-semibold uppercase tracking-[0.22em] text-white transition-all hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
                    >
                      Send a general application
                    </Link>
                    <Link
                      href="https://www.linkedin.com/company/square-campus"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 font-semibold uppercase tracking-[0.22em] text-white transition-all hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
                    >
                      Follow updates on LinkedIn
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
