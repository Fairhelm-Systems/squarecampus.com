import {
  BadgeCheck,
  Building2,
  CalendarClock,
  ClipboardList,
  FileSpreadsheet,
  Layers,
  Scale,
  UsersRound,
} from "lucide-react";
import type { Metadata } from "next";
import { ContactForm } from "@/components/site/contact-form";
import { PageSchema } from "@/components/site/page-schema";
import { Reveal } from "@/components/site/reveal";
import { SectionShell } from "@/components/site/section-shell";
import { demoIntentScript, demoIntents } from "@/content/demo-intents";
import { createPageMetadata } from "@/lib/seo";

/**
 * One page, two intents. `/demo/?intent=founding-partner` reframes the page as
 * a Founding Institutional Partner diagnosis; every other request gets the
 * guided demo unchanged.
 *
 * Metadata, canonical and structured data are deliberately intent-independent:
 * a query string is not a separate document, `/demo/` stays the one canonical
 * URL, and there is no second page for a crawler to split authority across.
 *
 * The page renders both variants and hides one with CSS (see globals.css and
 * src/content/demo-intents.ts). Two consequences worth stating, because they
 * are the reason this is structured the way it is:
 *
 *  - There is exactly ONE `<h1>` element. The two headings are spans inside
 *    it, not two competing headings, so the "one H1 per page" property holds
 *    in the markup and not merely in what renders.
 *  - Every variant pair sits inside a stable wrapper, so `space-y-*` on the
 *    parent counts real slots. Swapping siblings directly would leave the
 *    hidden first child's margin logic applying to the visible second one.
 */
export const metadata: Metadata = createPageMetadata({
  title: "Book a Guided Demo",
  description:
    "Book a guided SquareCampus demo and see how the School OS maps to admissions, academics, finance, communication, and institutional operations.",
  path: "/demo",
  ogImage: "https://squarecampus.com/og/demo.png",
});

const INTENTS = ["demo", "founding-partner"] as const;

const expectations = {
  demo: [
    {
      title: "Platform walkthrough",
      icon: Building2,
      body: "See how SquareCampus handles the actual workflows institutions compare vendors on: admissions, academics, fees, communication, visibility, and controls.",
    },
    {
      title: "Coexistence and rollout framing",
      icon: FileSpreadsheet,
      body: "Bring your current systems, spreadsheets, or operating pain points. We map where SquareCampus would sit against them, and what a first deployment would realistically involve.",
    },
    {
      title: "Stakeholder alignment",
      icon: UsersRound,
      body: "Principals, trustees, operations, finance, and administrators usually care about different things. The demo can be structured around all of them.",
    },
    {
      title: "Implementation reality",
      icon: CalendarClock,
      body: "We discuss go-live sequencing, training, what stays in place while adoption happens, and what your institution would need to do this responsibly.",
    },
  ],
  "founding-partner": [
    {
      title: "One bottleneck, examined properly",
      icon: ClipboardList,
      body: "We take the workflow you nominate and trace it end to end: where it starts, who owns each hand-off, where it stalls, and what the delay currently costs in time, money or trust.",
    },
    {
      title: "Where SquareCampus would sit",
      icon: Layers,
      body: "Above or alongside your existing ERP, LMS, payment portal, identity provider and communication tools. We map the integration surface and the boundary before anything is proposed.",
    },
    {
      title: "The baseline and the measure",
      icon: Scale,
      body: "A pilot is only evidence if the starting position is written down. We agree what is being measured, who the accountable executive sponsor is, and what would count as a result.",
    },
    {
      title: "Scope, commercials and the decision",
      icon: CalendarClock,
      body: "Founding pilots are paid, scoped commercial engagements. Scope, success measures, fees and conversion terms are agreed in writing before implementation begins — and the close is convert, extend or stop.",
    },
  ],
} as const;

export default function DemoPage() {
  return (
    <main>
      {/*
        Sets `data-demo-intent` before the page paints, so the founding-partner
        heading does not flash the generic one first. A soft navigation does not
        re-run an inline script; ContactForm keeps the attribute correct after
        hydration for that case.

        The markup is self-authored and takes no input: the script reads the
        query string but never renders it, and the only value it can write is
        one of our own constants.
      */}
      <script dangerouslySetInnerHTML={{ __html: demoIntentScript }} />

      <PageSchema
        name="Book a Guided Demo"
        description="Request a guided SquareCampus walkthrough mapped to the institution's own admissions, academics, finance, communication and governance workflows."
        path="/demo"
      />

      <SectionShell className="pt-12 sm:pt-16">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal immediate className="space-y-6">
            <div>
              {INTENTS.map((intent) => (
                <p key={intent} data-when-intent={intent} className="section-kicker">
                  {demoIntents[intent].eyebrow}
                </p>
              ))}
            </div>

            <h1 className="font-display text-4xl leading-none tracking-[-0.06em] sm:text-5xl lg:text-6xl">
              {INTENTS.map((intent) => (
                <span key={intent} data-when-intent={intent}>
                  {demoIntents[intent].heading}
                </span>
              ))}
            </h1>

            <div>
              {INTENTS.map((intent) => (
                <p
                  key={intent}
                  data-when-intent={intent}
                  className="max-w-xl text-lg leading-8 text-[color:var(--muted-foreground)]"
                >
                  {demoIntents[intent].lead}
                </p>
              ))}
            </div>

            <div>
              {INTENTS.map((intent) => (
                <div key={intent} data-when-intent={intent} className="grid gap-3">
                  {demoIntents[intent].points.map((item) => (
                    <div
                      key={item}
                      className="surface-panel rounded-[1.35rem] px-4 py-3 text-sm leading-6 text-[color:var(--muted-foreground)]"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120} className="surface-panel-strong rounded-[2rem] p-6 lg:p-8">
            {INTENTS.map((intent) => (
              <div key={intent} data-when-intent={intent}>
                <p className="section-kicker">{demoIntents[intent].form.eyebrow}</p>
                <h2 className="mt-4 font-display text-3xl tracking-[-0.05em]">
                  {demoIntents[intent].form.heading}
                </h2>
                <p className="mt-3 max-w-xl text-base leading-7 text-[color:var(--muted-foreground)]">
                  {demoIntents[intent].form.body}
                </p>
              </div>
            ))}
            <div className="mt-6">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </SectionShell>

      {INTENTS.map((intent) => (
        <div key={intent} data-when-intent={intent}>
          <SectionShell
            eyebrow={demoIntents[intent].expectations.eyebrow}
            title={demoIntents[intent].expectations.heading}
            body={demoIntents[intent].expectations.body}
          >
            <Reveal staggerChildren className="grid gap-4 md:grid-cols-2">
              {expectations[intent].map((item) => (
                <article
                  key={item.title}
                  data-reveal-item
                  className="surface-panel rounded-[1.6rem] p-6"
                >
                  <item.icon aria-hidden className="size-5 text-[color:var(--brand)]" />
                  <h3 className="mt-5 font-display text-2xl tracking-[-0.04em]">{item.title}</h3>
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
                  <p className="section-kicker">{demoIntents[intent].close.eyebrow}</p>
                  <h2 className="mt-4 font-display text-3xl tracking-[-0.05em] sm:text-4xl">
                    {demoIntents[intent].close.heading}
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-[color:var(--muted-foreground)]">
                    {demoIntents[intent].close.body}
                  </p>
                </div>
                <div className="grid gap-3">
                  {demoIntents[intent].close.points.map((item) => (
                    <div
                      key={item}
                      className="rounded-[1.2rem] border border-[color:var(--line)] bg-[color:var(--surface-muted)] px-4 py-4 text-sm leading-6 text-[color:var(--muted-foreground)]"
                    >
                      <BadgeCheck aria-hidden className="mb-3 size-4 text-[color:var(--teal)]" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </SectionShell>
        </div>
      ))}
    </main>
  );
}
