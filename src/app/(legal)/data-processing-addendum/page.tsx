import { LegalSection, LegalShell } from "@/components/legal/legal-shell";
import { Separator } from "@/components/ui/separator";

export default function DataProcessingAddendumPage() {
  return (
    <LegalShell
      title="Data Processing Addendum"
      currentPage="Data Processing Addendum"
      description="Details about how SquareCampus processes Institution data on behalf of our customers."
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
            { label: "Subject Matter and Duration", href: "#subject-duration" },
            { label: "Roles of the Parties", href: "#roles" },
            { label: "Categories of Data and Data Subjects", href: "#categories" },
            { label: "Processor Obligations", href: "#processor-obligations" },
            { label: "Controller Obligations", href: "#controller-obligations" },
            { label: "Security Measures", href: "#security-measures" },
            { label: "Sub-processors", href: "#subprocessors" },
            { label: "Data Subject Requests", href: "#data-requests" },
            { label: "Data Breach Notification", href: "#breach" },
            { label: "Data Retention and Deletion", href: "#retention" },
            { label: "Priority and Conflicts", href: "#priority" },
            { label: "Governing Law", href: "#governing-law" },
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
          <p>References to "SquareCampus" in this DPA mean MDTechSpire LLP.</p>
          <p>
            This Data Processing Addendum (“DPA”) forms part of the agreement between MDTechSpire
            LLP and the Institution when referenced in an order form or contract.
          </p>
        </LegalSection>

        <LegalSection title="2. Subject Matter and Duration" id="subject-duration">
          <p>
            This DPA governs SquareCampus’s processing of personal data on behalf of the Institution
            while providing the SquareCampus Service. The duration of this DPA matches the
            Institution’s subscription or the underlying agreement, unless otherwise required by
            law.
          </p>
        </LegalSection>

        <LegalSection title="3. Roles of the Parties" id="roles">
          <p>
            The Institution determines the purposes and means of processing personal data and acts
            as the Controller; MDTechSpire LLP processes personal data solely on behalf of the
            Institution as the Processor.
          </p>
        </LegalSection>

        <LegalSection title="4. Categories of Data and Data Subjects" id="categories">
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

        <LegalSection title="5. Processor Obligations" id="processor-obligations">
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

        <LegalSection title="6. Controller Obligations" id="controller-obligations">
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

        <LegalSection title="7. Security Measures" id="security-measures">
          <p>
            SquareCampus maintains administrative, technical, and organisational safeguards
            appropriate to the nature of the data and the risks presented by processing, including
            access controls, encryption in transit and at rest, monitoring, and backup procedures.
          </p>
          <p>
            SquareCampus service data is hosted and processed in India. We do not transfer or store
            customer data outside India.
          </p>
          <p>We pledge to keep data within the borders of India, no excuses or compromises.</p>
        </LegalSection>

        <LegalSection title="8. Sub-processors" id="subprocessors">
          <p>
            The Institution authorises SquareCampus to engage sub-processors such as cloud hosts,
            SMS/email gateways, and backup providers.
          </p>
          <p>A current list of sub-processors is available upon request.</p>
          <p>SquareCampus shall:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Impose data protection obligations on sub-processors comparable to this DPA;</li>
            <li>
              Remain responsible for sub-processor acts and omissions as if performed by
              SquareCampus.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="9. Data Subject Requests" id="data-requests">
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

        <LegalSection title="10. Data Breach Notification" id="breach">
          <p>In the event of a personal data breach under this DPA, SquareCampus shall:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Notify the Institution without undue delay after becoming aware of the breach;</li>
            <li>
              Share information reasonably available to support the Institution’s regulatory or
              notification obligations.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="11. Data Retention and Deletion" id="retention">
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

        <LegalSection title="12. Priority and Conflicts" id="priority">
          <p>
            In the event of a conflict between this DPA and the main agreement or Terms of Service,
            this DPA governs data processing obligations.
          </p>
        </LegalSection>

        <LegalSection title="13. Governing Law" id="governing-law">
          <p>
            This DPA is governed by Indian law. Disputes are subject to the jurisdiction provisions
            of the main agreement, typically the courts of Bengaluru, Karnataka, India.
          </p>
        </LegalSection>
      </div>

      <Separator className="mt-10" />
      <p className="text-xs text-muted-foreground">
        This Data Processing Addendum describes data processing obligations and should be reviewed
        by legal counsel to ensure compliance with applicable law.
      </p>
    </LegalShell>
  );
}
