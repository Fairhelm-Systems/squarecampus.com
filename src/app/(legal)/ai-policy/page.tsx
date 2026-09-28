// LEGAL: substantive changes to this document require legal sign-off.

import type { Metadata } from "next";
import { EntityIdentity, LegalSection, LegalShell } from "@/components/legal/legal-shell";
import { PageSchema } from "@/components/site/page-schema";
import { Separator } from "@/components/ui/separator";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "AI Policy",
  description:
    "How SquareCampus approaches AI in its products: scope, human oversight, data handling, responsible AI principles, and customer control.",
  path: "/ai-policy",
});

export default function AIPolicyPage() {
  return (
    <>
      <PageSchema
        name="AI Policy"
        description="How AEGIS and other AI features inside SquareCampus are governed: scope, permissions, auditability, and what institutional data is and is not used for."
        path="/ai-policy"
      />
      <LegalShell
        title="AI Policy"
        currentPage="AI Policy"
        description="How SquareCampus uses AI responsibly to support schools and institutions."
      >
        <nav
          aria-label="Table of contents"
          className="rounded-2xl border border-(--line) bg-(--surface-strong) p-5 shadow-[0_20px_60px_rgba(8,15,30,0.08)]"
        >
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground/80">
              On this page
            </p>
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-emerald-700/80 dark:text-emerald-200/70">
              Jump to
            </span>
          </div>
          <div className="mt-4 grid gap-3 text-xs text-muted-foreground sm:grid-cols-2">
            {[
              { label: "Company & Scope", href: "#company-scope" },
              { label: "How AI Is Used", href: "#ai-use" },
              { label: "Human Oversight", href: "#oversight" },
              { label: "Data & Privacy in AI", href: "#ai-data" },
              { label: "Responsible AI Principles", href: "#ai-principles" },
              { label: "Customer Control", href: "#customer-control" },
              { label: "Contact", href: "#contact" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg border border-transparent bg-(--surface) px-3 py-2 transition hover:border-(--line) hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        <div className="space-y-10">
          <LegalSection title="1. Company & Scope" id="company-scope">
            <EntityIdentity documentNoun="this Policy" />
            <p>
              This AI Policy explains how SquareCampus uses artificial intelligence to assist
              institutions with workflows, insights, and user experience. AI is an assistive layer
              and does not replace institutional decision-making.
            </p>
          </LegalSection>

          <LegalSection title="2. How AI Is Used" id="ai-use">
            <p>We use AI selectively to support tasks such as:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Workflow assistance and task guidance for staff.</li>
              <li>Data summarisation and operational insights for administrators.</li>
              <li>Automation support for routine actions and reminders.</li>
            </ul>
            <p>
              We do not use AI to make final decisions about students, staff, or institutional
              outcomes without human oversight.
            </p>
          </LegalSection>

          <LegalSection title="3. Human Oversight" id="oversight">
            <p>
              AI outputs are designed to be reviewable and overridable. Institutions and
              administrators remain responsible for decisions and can validate, edit, or reject AI
              suggestions at any time.
            </p>
          </LegalSection>

          <LegalSection title="4. Data & Privacy in AI" id="ai-data">
            <p>
              AI features follow the same privacy, access control, and retention policies as the
              rest of the SquareCampus platform.
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                We do not use customer data to train general-purpose AI models without explicit
                written authorisation.
              </li>
              <li>We do not sell or share customer data for third-party AI training.</li>
            </ul>
          </LegalSection>

          <LegalSection title="5. Responsible AI Principles" id="ai-principles">
            <p>We apply the following principles when designing or deploying AI features:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Fairness and bias awareness in outputs.</li>
              <li>Transparency about when AI is used and what it provides.</li>
              <li>Security and access controls consistent with platform safeguards.</li>
              <li>Purpose limitation to the tasks the Institution enables.</li>
              <li>Compliance with applicable data protection laws.</li>
            </ul>
          </LegalSection>

          <LegalSection title="6. Customer Control" id="customer-control">
            <p>Institutions retain control over:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Whether AI features are enabled.</li>
              <li>Which data inputs are available to AI features.</li>
              <li>Who can access or act on AI-assisted workflows.</li>
            </ul>
          </LegalSection>

          <LegalSection title="7. Contact" id="contact">
            <p>
              If you have questions about our AI practices, contact{" "}
              <a href="mailto:support@squarecampus.com" className="text-foreground">
                support@squarecampus.com
              </a>
              .
            </p>
          </LegalSection>
        </div>

        <Separator className="mt-10" />
        <p className="text-xs text-muted-foreground">
          This AI Policy is provided for transparency and does not constitute legal advice.
        </p>
      </LegalShell>
    </>
  );
}
