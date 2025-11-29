import { Separator } from "@/components/ui/separator";
import { LegalSection, LegalShell } from "@/components/legal/legal-shell";

export default function PrivacyPolicyPage() {
  return (
    <LegalShell
      title="Privacy Policy"
      currentPage="Privacy Policy"
      description="How SquareCampus gathers, safeguards, and shares personal data for schools and colleges."
    >
      <p className="text-sm font-medium text-muted-foreground">
        Effective Date: 27 November 2025
        <br />
        Last Updated: 27 November 2025
      </p>

      <div className="space-y-10">
        <LegalSection title="1. Information We Collect">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-white">1.1 Institution Information</p>
              <p>
                We may collect or receive details about the Institution, including:
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Institution name, type, and registered address;</li>
                <li>Administrative contacts, emails, and phone numbers;</li>
                <li>Billing preferences and subscription configurations;</li>
                <li>Modules, features, and integrations selected by the Institution.</li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold text-white">1.2 User Information</p>
              <p>We receive, process, or store data about individual users, such as:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Names, contact details, roles (student, parent, educator, staff);</li>
                <li>Authentication records and hashed login credentials;</li>
                <li>Academic data, attendance, assignments, assessments, and grades;</li>
                <li>Messages, notifications, and collaboration history generated inside the Service.</li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold text-white">1.3 Technical and Usage Data</p>
              <p>Automatic information we collect includes:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>IP address, device, and browser metadata;</li>
                <li>Pages, modules, and features accessed with timestamps;</li>
                <li>Diagnostic logs, error events, and performance telemetry;</li>
                <li>Cookies or tokens used for authentication and session management.</li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold text-white">1.4 Sensitive Data and Minors</p>
              <p>
                SquareCampus may process information about minors (students) and
                data that may be considered sensitive (photographs, health records,
                disciplinary notes) strictly under the Institution's instructions.
              </p>
              <p>
                Institutions are responsible for obtaining any necessary parental or guardian
                permissions before submitting such data through the Service.
              </p>
            </div>
          </div>
        </LegalSection>

        <LegalSection title="2. How We Use the Information">
          <p>We use the collected data to:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Provide, operate, and improve the SquareCampus Service;</li>
            <li>Authenticate users, maintain sessions, and secure accounts;</li>
            <li>Generate attendances, reports, notifications, and academic insights;</li>
            <li>Facilitate communication between teachers, students, and parents;</li>
            <li>Analyse usage patterns for reliability, performance, and product planning;</li>
            <li>Comply with legal obligations and respond to lawful requests;</li>
            <li>Enforce our Terms of Service and detect abuse.</li>
          </ul>
          <p>We do not sell personal data to advertisers or unrelated third parties.</p>
        </LegalSection>

        <LegalSection title="3. Legal Basis for Processing">
          <p>
            Our processing is typically governed by performance of an agreement with
            the Institution, consent where appropriate, compliance with legal duties,
            or legitimate interests that do not override individual rights.
          </p>
        </LegalSection>

        <LegalSection title="4. Data Sharing and Transfers">
          <p>We may share data with:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Authorised Institution staff as allowed by internal controls;</li>
            <li>Third-party providers acting on our behalf (cloud, messaging, analytics);</li>
            <li>Professional advisers bound by confidentiality obligations;</li>
            <li>Government or law enforcement authorities when required by law.</li>
          </ul>
          <p>
            When personal data leaves India, we implement appropriate safeguards
            required by applicable law.
          </p>
        </LegalSection>

        <LegalSection title="5. Data Security">
          <p>
            We deploy administrative, technical, and physical measures such as
            encryption in transit and at rest, role-based access controls,
            infrastructure hardening, monitoring, backups, and periodic reviews
            to limit access to authorised personnel only.
          </p>
          <p>
            No system is 100% secure, but we continually invest in improving our
            posture and respond quickly to incidents.
          </p>
        </LegalSection>

        <LegalSection title="6. Data Retention">
          <p>
            Data is retained for as long as necessary to provide the Service,
            meet legal requirements, or resolve disputes. After an Institution’s
            subscription ends, we may keep backup or audit data for a limited
            period before securely deleting or anonymising it.
          </p>
        </LegalSection>

        <LegalSection title="7. Rights of Institutions and Users">
          <p>
            Subject to applicable law and our contracts with Institutions, Users
            may request access, correction, data export, or deletion, subject to
            legal and contractual limitations.
          </p>
          <p>
            Most requests should flow through the Institution, which controls user
            data. We will collaborate with Institutions to fulfil requests when required.
          </p>
        </LegalSection>

        <LegalSection title="8. Cookies and Similar Technologies">
          <p>
            Cookies and similar identifiers support authentication, session
            persistence, and preference storage. We do not use third-party
            advertising cookies in the core academic and administrative areas.
          </p>
        </LegalSection>

        <LegalSection title="9. Children’s Privacy">
          <p>
            SquareCampus is provided to Institutions, not directly to children.
            Institutions are responsible for ensuring compliance with applicable
            laws and policies regarding minors.
          </p>
        </LegalSection>

        <LegalSection title="10. Changes to This Policy">
          <p>
            We may update this Privacy Policy occasionally. Updated versions
            will appear here with a new “Last Updated” date, and we may provide
            additional notices when appropriate.
          </p>
          <p>
            Continued use after changes means acceptance of the revised policy.
          </p>
        </LegalSection>

        <LegalSection title="11. Contact Us">
          <p>If you have questions or requests, contact:</p>
          <p>
            <strong>SquareCampus Private Limited</strong>
            <br />
            Email: <a href="mailto:privacy@squarecampus.com">privacy@squarecampus.com</a>
            <br />
            Website:{" "}
            <a href="https://squarecampus.com" target="_blank" rel="noopener noreferrer">
              https://squarecampus.com
            </a>
          </p>
        </LegalSection>
      </div>

      <Separator className="mt-10" />
      <p className="text-xs text-muted-foreground">
        This Privacy Policy is intended for transparency and does not constitute
        legal advice. Institutions should consult legal counsel to confirm
        compliance with applicable privacy laws.
      </p>
    </LegalShell>
  );
}
