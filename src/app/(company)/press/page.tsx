// app/press/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { FloatingHomeButton } from "@/components/marketing/floating-home-button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Press | SquareCampus",
  description: "Press resources, company overview, and media contact information for SquareCampus.",
};

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
      <main className="bg-neutral-950 min-h-[100dvh] px-4 py-16 sm:px-6 lg:px-10 flex flex-col">
        <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10">
          {/* Header */}
          <section className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground/80">
              Press
            </p>
            <div className="space-y-3">
              <h1 className="text-3xl font-semibold text-neutral-50 md:text-4xl">
                Press resources & media contact
              </h1>
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                For journalists, partners, and event organizers who need a concise view of what
                SquareCampus does and how to reach us.
              </p>
            </div>
          </section>

          {/* Company snapshot */}
          <section className="grid gap-6 md:grid-cols-3">
            <Card className="border border-neutral-800/70 bg-neutral-900/60">
              <CardContent className="space-y-2 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">
                  Overview
                </p>
                <p className="text-xs leading-relaxed text-neutral-300">
                  SquareCampus is an operating system for schools and colleges, connecting
                  admissions, academics, finance, and communication into one platform.
                </p>
              </CardContent>
            </Card>
            <Card className="border border-neutral-800/70 bg-neutral-900/60">
              <CardContent className="space-y-2 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">
                  Founded
                </p>
                <p className="text-xs leading-relaxed text-neutral-300">
                  SquareCampus Private Limited is led by Founder &amp; CTO Mohit Gupta and
                  Co-founder &amp; CMO Dhanraj Kotian.
                </p>
              </CardContent>
            </Card>
            <Card className="border border-neutral-800/70 bg-neutral-900/60">
              <CardContent className="space-y-2 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">
                  Media contact
                </p>
                <p className="text-xs leading-relaxed text-neutral-300">
                  For media enquiries, please write to{" "}
                  <Link
                    href="mailto:press@squarecampus.com"
                    className="text-neutral-100 underline underline-offset-4 hover:text-white"
                  >
                    press@squarecampus.com
                  </Link>
                  .
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Press releases / coverage */}
          <section className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-neutral-400">
                Press releases & coverage
              </h2>
              <span className="text-xs text-neutral-500">
                {hasPress ? `${pressItems.length} item(s)` : "No press items yet"}
              </span>
            </div>

            {hasPress ? (
              <div className="space-y-4">
                {pressItems.map((item) => (
                  <Card
                    key={item.slug}
                    className="border border-neutral-800/70 bg-neutral-900/60 transition-colors hover:border-neutral-300/70"
                  >
                    <CardContent className="flex flex-col gap-3 p-5 md:flex-row md:items-start md:justify-between">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400">
                          <span className="uppercase tracking-[0.2em]">{item.outlet}</span>
                          <span className="h-1 w-1 rounded-full bg-neutral-500" />
                          <span>{item.date}</span>
                        </div>
                        <p className="text-sm font-semibold text-neutral-50">{item.title}</p>
                        <p className="text-xs leading-relaxed text-neutral-300">{item.summary}</p>
                      </div>
                      {item.href && (
                        <div className="pt-2 md:pt-0">
                          <Link
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex rounded-full border border-neutral-600 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-neutral-200 transition hover:border-neutral-300 hover:text-white"
                          >
                            View article
                          </Link>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border border-dashed border-neutral-800 bg-neutral-900/60">
                <CardContent className="space-y-4 p-6">
                  <p className="text-sm font-semibold text-neutral-50">
                    No press releases published yet.
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    We&apos;ll share announcements and coverage here as we grow. For official
                    quotes, background, or data points, reach out and we&apos;ll respond with what
                    you need.
                  </p>
                  <div className="flex flex-wrap gap-3 text-xs">
                    <Link
                      href="mailto:press@squarecampus.com"
                      className="inline-flex items-center justify-center rounded-full border border-neutral-700 bg-neutral-900 px-4 py-2 font-semibold uppercase tracking-[0.22em] text-neutral-200 transition hover:border-neutral-300 hover:text-white"
                    >
                      Email media contact
                    </Link>
                    <Link
                      href="https://www.linkedin.com/company/square-campus"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-neutral-700/70 px-4 py-2 font-semibold uppercase tracking-[0.22em] text-neutral-200 transition hover:border-neutral-300 hover:text-white"
                    >
                      Follow on LinkedIn
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
