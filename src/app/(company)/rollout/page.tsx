import {
  ArrowRightLeft,
  BriefcaseBusiness,
  DatabaseBackup,
  GraduationCap,
  Handshake,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";
import type { Metadata } from "next";
import { ButtonLink } from "@/components/site/button-link";
import { RolloutMockup } from "@/components/site/mockups";
import { Reveal } from "@/components/site/reveal";
import { SectionShell } from "@/components/site/section-shell";
import { siteCtas } from "@/content/site-content";
import { createAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: createAlternates("/rollout"),
  title: "Rollout",
  description:
    "See how SquareCampus handles onboarding, migration, training, parallel runs, and go-live for schools, colleges, and multi-campus institutions.",
};

const rolloutSteps = [
  {
    title: "Institution blueprint",
    icon: BriefcaseBusiness,
    body: "We map your current operational reality: admissions, academics, finance, communication, campus structure, and approval paths.",
  },
  {
    title: "Data migration clinic",
    icon: DatabaseBackup,
    body: "Active data, hierarchy, roles, and policies are cleaned, structured, and moved with clear ownership instead of ad hoc imports.",
  },
  {
    title: "Role-based training",
    icon: GraduationCap,
    body: "Admins, academic leaders, finance teams, teachers, and support staff train against the workflows they will actually use.",
  },
  {
    title: "Parallel validation",
    icon: ArrowRightLeft,
    body: "Critical workflows are run in parallel so confidence builds before the institution fully depends on the system.",
  },
  {
    title: "Go-live under guardrails",
    icon: ShieldCheck,
    body: "Launch is staged, accountable, and supported, with escalation paths and success monitoring built in.",
  },
  {
    title: "Adoption follow-through",
    icon: UserRoundCheck,
    body: "Post-launch support focuses on adoption, operational consistency, and the places where institutions usually regress to patchwork habits.",
  },
] as const;

const rolloutSignals = [
  "Migration is treated as an operating exercise, not only a data import.",
  "Training is role-specific so the platform lands in real institutional behavior.",
  "Parallel runs reduce risk for finance, attendance, communication, and reporting.",
  "Success is measured after go-live, not only at handover.",
] as const;

const buyersQuestions = [
  {
    title: "Who owns the rollout?",
    body: "SquareCampus runs a guided process with named counterparts so institutions are not left coordinating vendors and spreadsheets alone.",
  },
  {
    title: "How do we avoid disruption?",
    body: "By sequencing migration, training, and dry runs around real calendar pressure points such as admissions, fee cycles, and exam windows.",
  },
  {
    title: "What about multiple campuses?",
    body: "The structure is designed to support institution-wide policy, branch-level variation, and phased launches without creating separate systems.",
  },
] as const;

export default function RolloutPage() {
  return (
    <main>
      <SectionShell className="pt-12 sm:pt-16">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <Reveal className="space-y-6">
            <p className="section-kicker">Rollout model</p>
            <h1 className="font-display text-4xl leading-none tracking-[-0.06em] sm:text-5xl lg:text-6xl">
              Go live like an institution, not a software experiment.
            </h1>
            <p className="max-w-xl text-lg leading-8 text-[color:var(--muted-foreground)]">
              Schools and colleges do not have the luxury of chaotic launches. SquareCampus rollout
              is designed around migration discipline, role-based training, parallel validation, and
              predictable go-live support.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={siteCtas.demoHref} label="Plan a rollout review" />
              <ButtonLink
                href={siteCtas.platformHref}
                label="See the platform"
                variant="secondary"
              />
            </div>
            <div className="grid gap-3 pt-2">
              {rolloutSignals.map((signal) => (
                <div
                  key={signal}
                  className="surface-panel rounded-[1.35rem] px-4 py-3 text-sm leading-6 text-[color:var(--muted-foreground)]"
                >
                  {signal}
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <RolloutMockup />
          </Reveal>
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Execution path"
        title="A rollout sequence built for operational reality"
        body="This is the part many vendors under-design. SquareCampus treats rollout as the institution’s first proof of product quality."
      >
        <Reveal staggerChildren className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {rolloutSteps.map((step, index) => (
            <article
              key={step.title}
              data-reveal-item
              className="surface-panel rounded-[1.6rem] p-6"
            >
              <div className="flex items-center justify-between">
                <step.icon className="size-5 text-[color:var(--brand)]" />
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-[color:var(--muted-foreground)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h2 className="mt-5 font-display text-2xl tracking-[-0.04em]">{step.title}</h2>
              <p className="mt-3 text-base leading-7 text-[color:var(--muted-foreground)]">
                {step.body}
              </p>
            </article>
          ))}
        </Reveal>
      </SectionShell>

      <SectionShell
        eyebrow="Operator confidence"
        title="Why institutions feel safer switching"
        body="The strongest implementation message is not speed alone. It is control, clarity, and a process that respects how education operations really work."
      >
        <Reveal className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="surface-panel rounded-[1.8rem] p-7">
            <p className="section-kicker">What the rollout must protect</p>
            <div className="mt-5 grid gap-3">
              {[
                "Admission teams cannot lose pipeline visibility during switch-over.",
                "Finance teams need confidence around dues, receipts, and approval trails.",
                "Academic leaders need continuity across attendance, assessments, and communication.",
                "Institution leadership needs a single owner for coordination and escalation.",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[1.2rem] bg-[color:var(--surface-muted)] px-4 py-4 text-sm leading-6 text-[color:var(--muted-foreground)]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4">
            {buyersQuestions.map((question) => (
              <div key={question.title} className="surface-panel rounded-[1.6rem] p-6">
                <Handshake className="size-5 text-[color:var(--teal)]" />
                <h2 className="mt-5 font-display text-2xl tracking-[-0.04em]">{question.title}</h2>
                <p className="mt-3 text-base leading-7 text-[color:var(--muted-foreground)]">
                  {question.body}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </SectionShell>

      <SectionShell className="pb-22">
        <Reveal className="surface-panel-strong rounded-[2rem] p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <p className="section-kicker">Next step</p>
              <h2 className="mt-4 font-display text-3xl tracking-[-0.05em] sm:text-4xl">
                Bring your current patchwork and launch constraints to the table.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[color:var(--muted-foreground)]">
                We can map your institution’s current operating stack, outline a rollout path, and
                show where SquareCampus replaces complexity without destabilizing the term in
                motion.
              </p>
            </div>
            <div className="grid gap-3">
              <ButtonLink href={siteCtas.demoHref} label="Book rollout session" />
              <ButtonLink
                href={siteCtas.whyDifferentHref}
                label="See why institutions switch"
                variant="secondary"
              />
            </div>
          </div>
        </Reveal>
      </SectionShell>
    </main>
  );
}
