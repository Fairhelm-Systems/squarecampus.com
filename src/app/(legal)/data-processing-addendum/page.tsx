import { LegalSection, LegalShell } from "@/components/legal/legal-shell";
import { Separator } from "@/components/ui/separator";

export default function DataProcessingAddendumPage() {
  return (
    <LegalShell
      title="Data Processing Addendum"
      currentPage="Data Processing Addendum"
      description="Details about how SquareCampus processes Institution data on behalf of our customers."
    >
      <p className="text-sm font-medium text-muted-foreground">Effective Date: 27 November 2025</p>

      <div className="space-y-10">
        <LegalSection title="1. Subject Matter and Duration">
          <p>
            This DPA governs SquareCampus’s processing of personal data on behalf of the Institution
            while providing the SquareCampus Service. The duration of this DPA matches the
            Institution’s subscription or the underlying agreement, unless otherwise required by
            law.
          </p>
        </LegalSection>

        <LegalSection title="2. Roles of the Parties">
          <p>
            The Institution determines the purposes and means of processing personal data and acts
            as the Controller; SquareCampus processes personal data solely on behalf of the
            Institution as the Processor.
          </p>
        </LegalSection>

        <LegalSection title="3. Categories of Data and Data Subjects">
          <p>
            The data processed depends on the Institution’s configuration and usage and may include:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Student data (names, contact details, academic records, attendance, photos);</li>
            <li>Staff and teacher data (roles, timetables, salary metadata if stored);</li>
            <li>Parent/guardian information (contacts, relationship to students);</li>
            <li>Institutional administrative and billing data;</li>
            <li>Technical and usage logs associated with user accounts.</li>
          </ul>
          <p className="text-sm text-muted-foreground/80">
            Data subjects may include students, parents/guardians, teachers, staff, and other
            authorised users of the Service.
          </p>
        </LegalSection>

        <LegalSection title="4. Processor Obligations">
          <p>SquareCampus shall:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Process data only on documented instructions from the Institution;</li>
            <li>Ensure authorised personnel are subject to confidentiality obligations;</li>
            <li>Implement appropriate technical and organisational security measures;</li>
            <li>Notify the Institution without undue delay upon discovering a data breach;</li>
            <li>
              Assist the Institution with subject requests or regulator interactions when requested;
            </li>
            <li>
              Provide information to demonstrate compliance and allow for audits under reasonable
              conditions.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="5. Controller Obligations">
          <p>The Institution shall:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Ensure it has rights, consents, and legal bases for supplying personal data;</li>
            <li>Remain responsible for the accuracy and legality of the data submitted;</li>
            <li>
              Comply with applicable data protection obligations, including notices to subjects;
            </li>
            <li>
              Not instruct SquareCampus to process data in a manner that violates applicable law.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="6. Sub-processors">
          <p>
            The Institution authorises SquareCampus to engage sub-processors such as cloud hosts,
            SMS/email gateways, and backup providers.
          </p>
          <p>SquareCampus shall:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Impose data protection obligations on sub-processors comparable to this DPA;</li>
            <li>
              Remain responsible for sub-processor acts and omissions as if performed by
              SquareCampus.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="7. International Data Transfers">
          <p>
            Where data transfers outside India are required, SquareCampus will take reasonable steps
            to comply with applicable laws, including implementing safeguards where required.
          </p>
        </LegalSection>

        <LegalSection title="8. Data Subject Requests">
          <p>
            If SquareCampus receives a data subject request, we will direct the request to the
            Institution, unless we are authorised or legally required to respond directly.
          </p>
          <p>
            SquareCampus will assist the Institution in fulfilling requests such as access,
            correction, or deletion, subject to technical feasibility and the Institution’s
            instructions.
          </p>
        </LegalSection>

        <LegalSection title="9. Data Breach Notification">
          <p>In the event of a personal data breach under this DPA, SquareCampus shall:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Notify the Institution without undue delay after becoming aware of the breach;</li>
            <li>
              Share information reasonably available to support the Institution’s regulatory or
              notification obligations.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="10. Data Retention and Deletion">
          <p>Upon termination of the subscription or upon written request, SquareCampus shall:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Delete or anonymise personal data processed on behalf of the Institution; or</li>
            <li>Return the data in a reasonable format where export functionality is agreed.</li>
          </ul>
          <p>
            SquareCampus may retain data where required by law, dispute resolution, or backup
            purposes, after which it will be deleted or anonymised.
          </p>
        </LegalSection>

        <LegalSection title="11. Priority and Conflicts">
          <p>
            In the event of a conflict between this DPA and the main agreement or Terms of Service,
            this DPA governs data processing obligations.
          </p>
        </LegalSection>

        <LegalSection title="12. Governing Law">
          <p>
            This DPA is governed by Indian law. Disputes are subject to the jurisdiction provisions
            of the main agreement, typically the courts of Bengaluru, Karnataka, India.
          </p>
        </LegalSection>
      </div>

      <Separator className="mt-10" />
      <p className="text-xs text-muted-foreground">
        This Data Processing Addendum is a template for educational purposes and should be reviewed
        by legal counsel to ensure compliance.
      </p>
    </LegalShell>
  );
}
