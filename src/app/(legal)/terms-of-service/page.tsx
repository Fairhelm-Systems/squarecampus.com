import { LegalSection, LegalShell } from "@/components/legal/legal-shell";
import { Separator } from "@/components/ui/separator";

export default function TermsOfServicePage() {
  return (
    <LegalShell
      title="Terms of Service"
      currentPage="Terms of Service"
      description="The rules, rights, and responsibilities that govern your access to SquareCampus."
    >
      <p className="text-sm font-medium text-muted-foreground">
        Effective Date: 27 November 2025
        <br />
        Last Updated: 27 November 2025
      </p>

      <div className="space-y-10">
        <LegalSection title="1. Parties and Authority">
          <p>
            These Terms form a binding agreement between SquareCampus Private Limited and the
            Institution or individual User accessing the Service. If you are accepting these Terms
            on behalf of an Institution, you confirm that you have the authority to bind that
            Institution.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>The Institution is the entity subscribing to SquareCampus (“Institution”); and</li>
            <li>
              Individuals who access the Service under that Institution’s account are considered
              “Users.”
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="2. Description of the Service">
          <p>
            SquareCampus is a SaaS platform for schools, colleges, and other educational
            institutions to manage admissions, attendance, grades, examinations, fees,
            communication, and related academic workflows.
          </p>
          <p>
            We may evolve, update, or retire features from time to time to keep the Service modern
            and secure.
          </p>
        </LegalSection>

        <LegalSection title="3. Account Registration and Security">
          <p>Institutions and Users agree to:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Provide accurate and complete registration information;</li>
            <li>
              Keep login credentials confidential and not share them beyond authorised personnel;
            </li>
            <li>
              Ensure only authorised staff, teachers, and students have access to their designated
              accounts;
            </li>
            <li>
              Promptly notify SquareCampus of unauthorised access, misuse, or security incidents.
            </li>
          </ul>
          <p className="text-sm text-muted-foreground">
            Institutions are responsible for all activity within their organisation account.
          </p>
        </LegalSection>

        <LegalSection title="4. License and Permitted Use">
          <p>
            Subject to these Terms and any applicable order form, SquareCampus grants Institutions a
            limited, revocable, non-exclusive, non-transferable license to use the Service for
            internal educational and administrative purposes.
          </p>
          <p>Unless expressly permitted, you must not:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Copy, modify, or derive works from the Service;</li>
            <li>Reverse engineer or attempt to extract the platform source code;</li>
            <li>Resell or re-distribute the Service outside your Institution;</li>
            <li>Use the Service to build a competing product;</li>
            <li>Circumvent usage limits, quotas, or licensing restrictions; or</li>
            <li>Use the Service in violation of applicable laws or regulations.</li>
          </ul>
        </LegalSection>

        <LegalSection title="5. Subscription, Fees, and Billing">
          <p>
            Access is provided on a subscription basis. Pricing, billing frequency, and modules are
            defined in the relevant proposal or order form.
          </p>
          <p>Unless otherwise agreed:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Fees are payable in advance per billing period;</li>
            <li>Add-ons or overages may be billed pro-rata for the remaining period;</li>
            <li>Fees are non-refundable except where required by law or our Refund Policy.</li>
          </ul>
          <p>Non-payment may result in suspension or termination of Service access.</p>
        </LegalSection>

        <LegalSection title="6. Data Ownership and Rights">
          <p>Subject to these Terms:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              The Institution retains ownership of data uploaded or generated through the Service;
            </li>
            <li>
              SquareCampus retains rights over the platform, metadata, usage stats, and anonymised
              data.
            </li>
          </ul>
          <p>
            Institutions may request export of their data during an active subscription in a
            reasonable format, subject to feasibility and applicable fees.
          </p>
        </LegalSection>

        <LegalSection title="7. Privacy and Data Protection">
          <p>
            SquareCampus processes personal data according to its Privacy Policy, which forms part
            of these Terms.
          </p>
          <p>
            We strive to comply with applicable Indian data protection laws, including the IT Act,
            2000, and the DPDP Act, 2023.
          </p>
          <p>
            Institutions remain responsible for obtaining any consents required for processing
            student, staff, or parent data.
          </p>
        </LegalSection>

        <LegalSection title="8. Service Availability and Maintenance">
          <p>
            We aim to offer a reliable Service but cannot guarantee uninterrupted or error-free
            operation.
          </p>
          <p>
            Scheduled maintenance or emergency work may temporarily affect availability; we will
            provide notice where possible.
          </p>
        </LegalSection>

        <LegalSection title="9. Prohibited Conduct">
          <p>
            You must not use the Service to store, share, or process content that is unlawful,
            harmful, defamatory, obscene, or otherwise objectionable.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Infringe third-party rights, including IP or privacy rights;</li>
            <li>Introduce malware, viruses, or any malicious payload;</li>
            <li>Engage in conduct described in the Acceptable Use Policy.</li>
          </ul>
        </LegalSection>

        <LegalSection title="10. Term, Suspension, and Termination">
          <p>
            These Terms remain effective until the Institution’s subscription ends or the Agreement
            is terminated.
          </p>
          <p>SquareCampus may suspend or terminate if:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Fees are unpaid;</li>
            <li>Material breach occurs and is uncured;</li>
            <li>Law or government order requires suspension;</li>
            <li>Usage poses security, legal, or operational risk to others.</li>
          </ul>
          <p>
            After termination, access ceases and data may be retained for a limited period for
            legal, accounting, or backup reasons.
          </p>
        </LegalSection>

        <LegalSection title="11. Intellectual Property">
          <p>
            All rights to the Service, interfaces, documentation, and technology belong to
            SquareCampus or its licensors.
          </p>
          <p>
            Nothing in these Terms grants you ownership of SquareCampus trademarks, logos, or
            software.
          </p>
        </LegalSection>

        <LegalSection title="12. Disclaimers">
          <p>The Service is provided “as is” and “as available.”</p>
          <p>
            To the fullest extent permitted by law, SquareCampus disclaims express, implied,
            statutory, and other warranties, including merchantability and fitness for a particular
            purpose.
          </p>
        </LegalSection>

        <LegalSection title="13. Limitation of Liability">
          <p>
            SquareCampus shall not be liable for indirect, incidental, consequential, special,
            exemplary, or punitive damages, or loss of profits, data, or goodwill arising out of the
            Service.
          </p>
          <p>
            Where liability cannot be excluded, our aggregate liability is capped at the
            subscription fees paid in the preceding twelve months.
          </p>
        </LegalSection>

        <LegalSection title="14. Changes to the Terms">
          <p>
            We may update these Terms from time to time. The “Last Updated” date at the top will
            change, and we may provide additional notice.
          </p>
          <p>Your continued use after changes means you accept the revised Terms.</p>
        </LegalSection>

        <LegalSection title="15. Governing Law and Jurisdiction">
          <p>These Terms are governed by Indian law, without regard to conflict of law rules.</p>
          <p>
            Subject to mandatory requirements, the courts in Bengaluru, Karnataka, India have
            exclusive jurisdiction over disputes.
          </p>
        </LegalSection>

        <LegalSection title="16. Contact Information">
          <p>If you have questions about these Terms, contact:</p>
          <p>
            <strong>SquareCampus Private Limited</strong>
            <br />
            Email: <a href="mailto:support@squarecampus.com">support@squarecampus.com</a>
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
        This Terms of Service page is for informational purposes and does not constitute legal
        advice. Institutions should consult counsel to ensure compliance with applicable laws.
      </p>
    </LegalShell>
  );
}
