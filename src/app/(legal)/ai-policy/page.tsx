import { LegalSection, LegalShell } from "@/components/legal/legal-shell";
import { Separator } from "@/components/ui/separator";

export default function AIPolicyPage() {
  return (
    <LegalShell
      title="AI Policy"
      currentPage="AI Policy"
      description="How SquareCampus uses AI responsibly to support schools and institutions."
    >
      <p className="text-sm font-medium text-muted-foreground">
        Effective Date: 27 November 2025
        <br />
        Last Updated: 27 November 2025
      </p>

      <nav
        aria-label="Table of contents"
        className="rounded-2xl border border-neutral-800/60 bg-neutral-900/60 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
      >
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground/80">
            On this page
          </p>
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-emerald-200/70">
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
              className="rounded-lg border border-transparent bg-neutral-950/40 px-3 py-2 transition hover:border-white/15 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="space-y-10">
        <LegalSection title="1. Company & Scope" id="company-scope">
          <p>
            SquareCampus is a trademark and product brand of MDTechSpire. All services are
            provided by MDTechSpire, unless otherwise stated in a written agreement or order
            form.
          </p>
          <p>References to "SquareCampus" in this Policy mean MDTechSpire.</p>
          <p>
            This AI Policy explains how SquareCampus uses artificial intelligence to assist
            institutions with workflows, insights, and user experience. AI is an assistive layer and
            does not replace institutional decision-making.
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
            AI features follow the same privacy, access control, and retention policies as the rest
            of the SquareCampus platform.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>We do not use customer data to train general-purpose AI models without explicit written authorisation.</li>
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
            <a href="mailto:support@squarecampus.com" className="text-white">
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
  );
}
