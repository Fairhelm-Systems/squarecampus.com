import type { Metadata } from "next";
import Link from "next/link";
import { FloatingHomeButton } from "@/components/marketing/floating-home-button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Careers | SquareCampus",
  description:
    "Join SquareCampus and help build the operating system for modern schools and colleges.",
};

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
      <main className="bg-neutral-950 min-h-[100dvh] px-4 py-16 sm:px-6 lg:px-10 flex flex-col">
        <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10">
          {/* Header */}
          <section className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground/80">
              Careers
            </p>
            <div className="space-y-3">
              <h1 className="text-3xl font-semibold text-neutral-50 md:text-4xl">
                Build the backbone of modern institutions
              </h1>
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                SquareCampus is building long-term infrastructure for schools and colleges. That
                means thoughtful engineering, calm execution, and a team that cares about
                reliability as much as speed.
              </p>
            </div>
          </section>

          {/* Working at SquareCampus */}
          <section className="grid gap-6 md:grid-cols-3">
            <Card className="border border-neutral-800/70 bg-neutral-900/60">
              <CardContent className="space-y-2 p-5">
                <p className="text-sm font-semibold text-neutral-50">Product-first culture</p>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  We optimise for quality of product and long-term stability over quick wins that
                  don&apos;t hold in production.
                </p>
              </CardContent>
            </Card>
            <Card className="border border-neutral-800/70 bg-neutral-900/60">
              <CardContent className="space-y-2 p-5">
                <p className="text-sm font-semibold text-neutral-50">Thoughtful pace</p>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  We move quickly, but not chaotically. Clear scopes, clear ownership, and minimal
                  unnecessary meetings.
                </p>
              </CardContent>
            </Card>
            <Card className="border border-neutral-800/70 bg-neutral-900/60">
              <CardContent className="space-y-2 p-5">
                <p className="text-sm font-semibold text-neutral-50">Impact on real campuses</p>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Work that directly improves how schools and colleges operate every single day.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Open roles / empty state */}
          <section className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-neutral-400">
                Open roles
              </h2>
              <span className="text-xs text-neutral-500">
                {hasJobs ? `${jobs.length} position(s)` : "No open positions"}
              </span>
            </div>

            {hasJobs ? (
              <div className="space-y-4">
                {jobs.map((job) => (
                  <Card
                    key={job.id}
                    className="border border-neutral-800/70 bg-neutral-900/60 transition-colors hover:border-neutral-300/70"
                  >
                    <CardContent className="flex flex-col gap-3 p-5 md:flex-row md:items-start md:justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-neutral-50">{job.title}</p>
                        <p className="text-xs text-neutral-400">
                          {job.location} · {job.type}
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-neutral-300">
                          {job.description}
                        </p>
                      </div>
                      <div className="pt-2 md:pt-0">
                        {/* Later: link to /careers/[id] or external ATS */}
                        <Link
                          href={`mailto:careers@squarecampus.com?subject=${encodeURIComponent(
                            `Application: ${job.title}`
                          )}`}
                          className="inline-flex rounded-full border border-neutral-600 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-neutral-200 transition hover:border-neutral-300 hover:text-white"
                        >
                          Apply
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border border-dashed border-neutral-800 bg-neutral-900/60">
                <CardContent className="space-y-4 p-6">
                  <p className="text-sm font-semibold text-neutral-50">
                    We&apos;re not hiring for specific roles right now.
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    We&apos;ll publish roles here as we expand the team. If you strongly believe you
                    can help shape SquareCampus, you can still reach out with a short note and your
                    profile.
                  </p>
                  <div className="flex flex-wrap gap-3 text-xs">
                    <Link
                      href="mailto:careers@squarecampus.com?subject=General%20application%20for%20SquareCampus"
                      className="inline-flex items-center justify-center rounded-full border border-neutral-700 bg-neutral-900 px-4 py-2 font-semibold uppercase tracking-[0.22em] text-neutral-200 transition hover:border-neutral-300 hover:text-white"
                    >
                      Send a general application
                    </Link>
                    <Link
                      href="https://www.linkedin.com/company/square-campus"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-neutral-700/70 px-4 py-2 font-semibold uppercase tracking-[0.22em] text-neutral-200 transition hover:border-neutral-300 hover:text-white"
                    >
                      Follow updates on LinkedIn
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </section>
        </div>
      </main>
      <FloatingHomeButton href="/" label="Back to home" />
    </>
  );
}
