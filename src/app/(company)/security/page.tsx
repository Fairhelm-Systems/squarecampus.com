import {
  Bell,
  Database,
  Fingerprint,
  Globe2,
  LockKeyhole,
  MapPin,
  ShieldCheck,
  TimerReset,
} from "lucide-react";
import { ButtonLink } from "@/components/site/button-link";
import { SecurityMockup } from "@/components/site/mockups";
import { Reveal } from "@/components/site/reveal";
import { SectionShell } from "@/components/site/section-shell";
import { siteCtas } from "@/content/site-content";

const controls = [
  {
    title: "India-aware hosting posture",
    icon: MapPin,
    body: "SquareCampus is built with an India-first operational posture around hosting, institutional trust, and jurisdictional clarity.",
  },
  {
    title: "Access control and identity",
    icon: Fingerprint,
    body: "Role-based access, administrative boundaries, and least-privilege expectations are part of how the product is structured.",
  },
  {
    title: "Encryption and transport security",
    icon: LockKeyhole,
    body: "Data protection in transit and at rest is treated as baseline product infrastructure, not optional hardening.",
  },
  {
    title: "Auditability and traceability",
    icon: Database,
    body: "Institutional operators need to understand who changed what, when, and in which operational context.",
  },
  {
    title: "Operational reliability",
    icon: Bell,
    body: "Uptime, backups, alerting, and recovery posture matter because the platform is part of daily campus operations.",
  },
  {
    title: "Incident readiness",
    icon: TimerReset,
    body: "A credible security posture includes how issues are monitored, handled, communicated, and learned from.",
  },
] as const;

const trustNotes = [
  "Security should support institutional calm on pressure days, not just satisfy a procurement checklist.",
  "Role-based access matters because real institutions span trustees, principals, finance teams, teachers, operators, parents, and students.",
  "Audit-ready operations matter because education institutions are accountable to boards, regulators, families, and internal leadership.",
  "India-aware posture matters because data trust and operational context are not abstract concerns in this category.",
] as const;

export default function SecurityPage() {
  return (
    <main>
      <SectionShell className="pt-12 sm:pt-16">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <Reveal className="space-y-6">
            <p className="section-kicker">Trust and security</p>
            <h1 className="font-display text-4xl leading-none tracking-[-0.06em] sm:text-5xl lg:text-6xl">
              Security is the campus nervous system. It has to stay calm under load.
            </h1>
            <p className="max-w-xl text-lg leading-8 text-[color:var(--muted-foreground)]">
              SquareCampus treats trust as part of the product. Access control, India-aware hosting
              posture, auditability, and operational reliability are built into how institutions run
              on the system every day.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={siteCtas.demoHref} label="Request security walkthrough" />
              <ButtonLink
                href="mailto:security@squarecampus.com"
                label="Contact security"
                variant="secondary"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <SecurityMockup />
          </Reveal>
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Control domains"
        title="The trust posture is designed for institutional accountability"
        body="Security is not a decorative trust page. It is the control layer that lets schools and colleges rely on the platform for real operational work."
      >
        <Reveal staggerChildren className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {controls.map((item) => (
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

      <SectionShell
        eyebrow="Why this matters"
        title="The security story is really an operations story"
        body="Institutions trust software when it remains understandable, controllable, and accountable during the moments that matter."
      >
        <Reveal className="grid gap-4 lg:grid-cols-[1fr_0.92fr]">
          <div className="surface-panel rounded-[1.8rem] p-7">
            <p className="section-kicker">Institutional realities</p>
            <div className="mt-5 grid gap-3">
              {trustNotes.map((note) => (
                <div
                  key={note}
                  className="rounded-[1.2rem] bg-[color:var(--surface-muted)] px-4 py-4 text-sm leading-6 text-[color:var(--muted-foreground)]"
                >
                  {note}
                </div>
              ))}
            </div>
          </div>
          <div className="surface-panel-strong rounded-[1.8rem] p-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line)] bg-[color:var(--surface)] px-3 py-2 text-sm text-[color:var(--foreground)]">
              <Globe2 className="size-4 text-[color:var(--brand)]" />
              Trust posture summary
            </div>
            <div className="mt-5 grid gap-3">
              {[
                {
                  icon: ShieldCheck,
                  text: "Controls are part of the School OS, not isolated to a security appendix.",
                },
                {
                  icon: Bell,
                  text: "Monitoring and reliability matter because the product supports daily campus motion.",
                },
                {
                  icon: Database,
                  text: "Audit trails and role boundaries matter because institutional accountability is not optional.",
                },
              ].map((item) => (
                <div
                  key={item.text}
                  className="rounded-[1.2rem] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-4 text-sm leading-6 text-[color:var(--muted-foreground)]"
                >
                  <item.icon className="mb-3 size-4 text-[color:var(--brand)]" />
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </SectionShell>

      <SectionShell className="pb-22">
        <Reveal className="surface-panel-strong rounded-[2rem] p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.82fr] lg:items-center">
            <div>
              <p className="section-kicker">Security review</p>
              <h2 className="mt-4 font-display text-3xl tracking-[-0.05em] sm:text-4xl">
                Bring your questionnaire, policy concerns, or institutional requirements.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[color:var(--muted-foreground)]">
                The right trust conversation covers the real product controls, the operating
                posture, and how the institution can stay confident after go-live.
              </p>
            </div>
            <div className="grid gap-3">
              <ButtonLink href={siteCtas.demoHref} label="Book trust review" />
              <ButtonLink
                href="mailto:security@squarecampus.com"
                label="Email security"
                variant="secondary"
              />
            </div>
          </div>
        </Reveal>
      </SectionShell>
    </main>
  );
}
