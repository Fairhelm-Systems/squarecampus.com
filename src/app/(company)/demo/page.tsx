import { BadgeCheck, Building2, CalendarClock, FileSpreadsheet, UsersRound } from "lucide-react";
import type { Metadata } from "next";
import { ContactForm } from "@/components/site/contact-form";
import { Reveal } from "@/components/site/reveal";
import { SectionShell } from "@/components/site/section-shell";

export const metadata: Metadata = {
  title: "Demo",
  description:
    "Book a guided SquareCampus demo and see how the School OS maps to admissions, academics, finance, communication, and institutional operations.",
};

const expectations = [
  {
    title: "Live platform walkthrough",
    icon: Building2,
    body: "See how SquareCampus handles the actual workflows institutions compare vendors on: admissions, academics, fees, communication, visibility, and controls.",
  },
  {
    title: "Migration and rollout framing",
    icon: FileSpreadsheet,
    body: "Bring your current systems, spreadsheets, or operating pain points. We map how the shift would realistically happen.",
  },
  {
    title: "Stakeholder alignment",
    icon: UsersRound,
    body: "Principals, trustees, operations, finance, and administrators usually care about different things. The demo can be structured around all of them.",
  },
  {
    title: "Implementation reality",
    icon: CalendarClock,
    body: "We discuss go-live sequencing, training, and what your institution would need to make a switch responsibly.",
  },
] as const;

export default function DemoPage() {
  return (
    <main>
      <SectionShell className="pt-12 sm:pt-16">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal className="space-y-6">
            <p className="section-kicker">Guided demo</p>
            <h1 className="font-display text-4xl leading-none tracking-[-0.06em] sm:text-5xl lg:text-6xl">
              Bring the patchwork. We will show the operating model.
            </h1>
            <p className="max-w-xl text-lg leading-8 text-[color:var(--muted-foreground)]">
              A SquareCampus demo is not a feature parade. It is a guided review of how your
              institution currently runs, where the patchwork breaks, and how a School OS changes
              the day-to-day reality for operators and leadership.
            </p>
            <div className="grid gap-3">
              {[
                "Built for schools, colleges, and multi-campus institutions in India.",
                "Structured for leadership, operations, finance, and academic stakeholders.",
                "Grounded in rollout, controls, adoption, and practical replacement planning.",
              ].map((item) => (
                <div
                  key={item}
                  className="surface-panel rounded-[1.35rem] px-4 py-3 text-sm leading-6 text-[color:var(--muted-foreground)]"
                >
                  {item}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120} className="surface-panel-strong rounded-[2rem] p-6 lg:p-8">
            <p className="section-kicker">Request walkthrough</p>
            <h2 className="mt-4 font-display text-3xl tracking-[-0.05em]">
              Tell us what needs replacing.
            </h2>
            <p className="mt-3 max-w-xl text-base leading-7 text-[color:var(--muted-foreground)]">
              The more specific you are, the better the session. Admissions chaos, fee operations,
              parent communication overload, fragmented reporting, or all of the above.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="What to expect"
        title="A serious evaluation session, not a generic sales call"
        body="SquareCampus should feel credible to institutional buyers. The demo process reflects that."
      >
        <Reveal staggerChildren className="grid gap-4 md:grid-cols-2">
          {expectations.map((item) => (
            <article
              key={item.title}
              data-reveal-item
              className="surface-panel rounded-[1.6rem] p-6"
            >
              <item.icon className="size-5 text-[color:var(--brand)]" />
              <h2 className="mt-5 font-display text-2xl tracking-[-0.04em]">{item.title}</h2>
              <p className="mt-3 text-base leading-7 text-[color:var(--muted-foreground)]">
                {item.body}
              </p>
            </article>
          ))}
        </Reveal>
      </SectionShell>

      <SectionShell className="pb-22">
        <Reveal className="surface-panel rounded-[1.8rem] p-8 lg:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr] lg:items-center">
            <div>
              <p className="section-kicker">Confidence check</p>
              <h2 className="mt-4 font-display text-3xl tracking-[-0.05em] sm:text-4xl">
                The goal is clarity.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[color:var(--muted-foreground)]">
                By the end of the session, your team should know whether SquareCampus can replace
                the current stack, what rollout would involve, and how the School OS model changes
                reporting, communication, and institutional control.
              </p>
            </div>
            <div className="grid gap-3">
              {[
                "One connected system for operations, not a collection of isolated demos.",
                "A serious India-first product posture across language, trust, and compliance realities.",
                "A rollout conversation that respects calendar pressure and internal complexity.",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[1.2rem] border border-[color:var(--line)] bg-[color:var(--surface-muted)] px-4 py-4 text-sm leading-6 text-[color:var(--muted-foreground)]"
                >
                  <BadgeCheck className="mb-3 size-4 text-[color:var(--teal)]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </SectionShell>
    </main>
  );
}
