import { LegalSection, LegalShell } from "@/components/legal/legal-shell";
import { Separator } from "@/components/ui/separator";

export default function AcceptableUsePage() {
  return (
    <LegalShell
      title="Acceptable Use Policy"
      currentPage="Acceptable Use"
      description="SquareCampus exists to help institutions operate safely while keeping misuse or disruption out of the system."
    >
      <p className="text-sm font-medium text-muted-foreground">Effective Date: 27 November 2025</p>

      <div className="space-y-10">
        <LegalSection title="1. Scope and Purpose">
          <p>
            These guidelines apply to everyone who accesses SquareCampus, including institutions,
            staff, teachers, parents, and students. The Service must be used for its intended
            academic and administrative purposes while respecting laws, institutional rules, and the
            rights of other users.
          </p>
          <p>
            We expect decisions made on the platform to be grounded in the academic mission of the
            institution, and we retain the right to remediate any behaviour that compromises the
            platform or the people it serves.
          </p>
        </LegalSection>

        <LegalSection title="2. Permitted Use">
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

        <LegalSection title="3. Prohibited Conduct">
          <p>You must not use the Service to:</p>
          <ul className="list-disc pl-5">
            <li>Store or share unlawful, obscene, defamatory, harassing, or infringing content.</li>
            <li>
              Reverse engineer, attack, overload, or otherwise interfere with the platform or its
              infrastructure.
            </li>
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
          </ul>
        </LegalSection>

        <LegalSection title="4. Security, Enforcement, and Reporting">
          <p>
            We may suspend or terminate access if we observe activities that threaten the Service,
            violate applicable laws, or place an undue burden on the platform. Institutions remain
            responsible for the conduct of their users.
          </p>
          <p>
            Please report suspected abuse or vulnerabilities to{" "}
            <a href="mailto:support@squarecampus.com" className="text-white">
              support@squarecampus.com
            </a>{" "}
            so we can act swiftly.
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
