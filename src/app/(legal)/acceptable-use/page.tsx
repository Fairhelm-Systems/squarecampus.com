import { LegalSection, LegalShell } from "@/components/legal/legal-shell";
import { Separator } from "@/components/ui/separator";

export default function AcceptableUsePage() {
  return (
    <LegalShell
      title="Acceptable Use Policy"
      currentPage="Acceptable Use"
      description="SquareCampus exists to help institutions operate safely while keeping misuse or disruption out of the system."
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
            { label: "Scope and Purpose", href: "#scope-purpose" },
            { label: "Permitted Use", href: "#permitted-use" },
            { label: "Prohibited Conduct", href: "#prohibited-conduct" },
            { label: "Security, Enforcement, and Reporting", href: "#security-enforcement" },
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
            SquareCampus is a trademark and product brand of MDTechSpire LLP. All services are
            provided by MDTechSpire LLP, unless otherwise stated in a written agreement or order
            form.
          </p>
          <p>References to "SquareCampus" in this Policy mean MDTechSpire LLP.</p>
          <p>
            These guidelines apply to everyone who accesses SquareCampus, including institutions,
            staff, teachers, parents, and students.
          </p>
        </LegalSection>

        <LegalSection title="2. Scope and Purpose" id="scope-purpose">
          <p>
            The Service must be used for its intended academic and administrative purposes while
            respecting laws, institutional rules, and the rights of other users.
          </p>
          <p>
            We expect decisions made on the platform to be grounded in the academic mission of the
            institution, and we retain the right to remediate any behaviour that compromises the
            platform or the people it serves.
          </p>
        </LegalSection>

        <LegalSection title="3. Permitted Use" id="permitted-use">
          <p>Use SquareCampus to:</p>
          <ul className="list-disc pl-5">
            <li>
              Organise student information, attendance, grades, timetables, billing, and
              communications.
            </li>
            <li>
              Automate notifications, approvals, and workflows needed for day-to-day institutional
              operations.
            </li>
            <li>
              Keep account credentials secure, and share access only with authorised staff or
              students in accordance with institutional policies.
            </li>
            <li>Submit accurate data and cooperate with our support team if issues arise.</li>
          </ul>
        </LegalSection>

        <LegalSection title="4. Prohibited Conduct" id="prohibited-conduct">
          <p>You must not use the Service to:</p>
          <ul className="list-disc pl-5">
            <li>Store or share unlawful, obscene, defamatory, harassing, or infringing content.</li>
            <li>
              Reverse engineer, attack, overload, or otherwise interfere with the platform or its
              infrastructure.
            </li>
            <li>Circumvent security safeguards, access controls, or audit mechanisms.</li>
            <li>Share credentials with unauthorised third parties.</li>
            <li>Gain unauthorised access to another account or impersonate another user.</li>
            <li>
              Use the platform for mass spamming, scraping data without consent, or distributing
              malware.
            </li>
            <li>
              Host non-educational or unrelated products that compromise performance or violate the
              security of SquareCampus.
            </li>
            <li>
              Misuse AI features, including attempting to extract sensitive data, bypass safeguards,
              or automate decisions without institutional approval.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="5. Security, Enforcement, and Reporting" id="security-enforcement">
          <p>
            We may suspend or terminate access if we observe activities that threaten the Service,
            violate applicable laws, or place an undue burden on the platform. Institutions remain
            responsible for the conduct of their users.
          </p>
          <p>
            Please report suspected abuse to{" "}
            <a href="mailto:support@squarecampus.com" className="text-white">
              support@squarecampus.com
            </a>{" "}
            and security vulnerabilities to{" "}
            <a href="mailto:security@squarecampus.com" className="text-white">
              security@squarecampus.com
            </a>{" "}
            so we can act swiftly.
          </p>
          <p>
            We welcome good-faith security research and responsible disclosure. If you report a
            vulnerability responsibly and do not exploit it, we will not pursue action against you.
          </p>
        </LegalSection>
      </div>

      <Separator className="mt-10" />
      <p className="text-xs text-muted-foreground">
        This Acceptable Use Policy is part of the SquareCampus Terms of Service and does not replace
        any legal agreement between you and SquareCampus.
      </p>
    </LegalShell>
  );
}
