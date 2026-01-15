import type { Metadata } from "next";
import {
  BulletList,
  DataTable,
  EvidenceFooter,
  ExampleBox,
  ExpandableSection,
  Hero,
  InfoBox,
  NoticeSection,
  Paragraph,
  ReportingCTA,
  ShareActions,
  Strong,
  SubHeading,
  TableOfContents,
  TableOfContentsSidebar,
  WarningBox,
} from "@/components/competitor-notice";
import "@/styles/competitor-notice-print.css";

export const metadata: Metadata = {
  title: "Notice to Competitors | SquareCampus",
  description:
    "Legal notice regarding unauthorized access to SquareCampus. MDTechSpire maintains zero tolerance for competitive espionage, credential solicitation, or unauthorized access.",
  keywords: [
    "competitor notice",
    "legal notice",
    "unauthorized access",
    "SquareCampus",
    "MDTechSpire",
    "competitive espionage",
    "IP protection",
  ],
  openGraph: {
    title: "Notice to Competitors | SquareCampus",
    description:
      "Legal notice regarding unauthorized access to SquareCampus. Zero tolerance policy for competitive espionage.",
    type: "website",
    url: "https://squarecampus.com/competitor-notice",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CompetitorNoticePage() {
  return (
    <>
      {/* Skip to content for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-black"
      >
        Skip to main content
      </a>

      <main id="main-content" className="min-h-screen bg-neutral-950">
        <Hero />
        <ShareActions />
        <TableOfContents />

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid grid-cols-1 gap-12 xl:grid-cols-[1fr_280px]">
            {/* Main Content */}
            <div className="space-y-12">
              {/* Section 1: Zero Tolerance Policy */}
              <NoticeSection
                id="zero-tolerance"
                number={1}
                title="Zero Tolerance Policy"
                severity="critical"
              >
                <Paragraph>
                  MDTechSpire (trading as SquareCampus) maintains a{" "}
                  <Strong>zero-tolerance policy</Strong> for any form of unauthorized access,
                  competitive espionage, or improper solicitation of access to our proprietary
                  platform.
                </Paragraph>

                <SubHeading>Absolutely Prohibited Activities:</SubHeading>
                <BulletList
                  type="x"
                  items={[
                    "Soliciting customer credentials or access to SquareCampus",
                    "Requesting product demonstrations under false pretenses",
                    'Conducting "reference calls" for competitive intelligence purposes',
                    "Attempting to reverse engineer or analyze our platform",
                    "Obtaining architectural, technical, or proprietary business information",
                    "Accessing the platform through any unauthorized means",
                    "Using information obtained through unauthorized access",
                  ]}
                />

                <SubHeading>Our Response:</SubHeading>
                <Paragraph>
                  Every violation results in immediate, aggressive legal action across civil,
                  criminal, and regulatory channels simultaneously. We commit significant resources
                  to identifying, documenting, and prosecuting violators.
                </Paragraph>

                <InfoBox variant="green">
                  <SubHeading>Fair Competition Statement</SubHeading>
                  <Paragraph>
                    We strongly support fair, ethical competition in the educational technology
                    market. Legitimate competitive activities include:
                  </Paragraph>
                  <BulletList
                    type="check"
                    items={[
                      "Marketing your own products based on their merits",
                      "Requesting authorized demonstrations of SquareCampus through proper channels",
                      "Publicly available information from our website and marketing materials",
                      "Customer testimonials obtained without soliciting confidential information",
                      "Independent feature comparisons based on authorized access",
                    ]}
                  />
                  <Paragraph>
                    We will never pursue legal action against competitors engaged in ethical
                    business practices. This notice targets only those who attempt to gain unfair
                    advantage through improper means.
                  </Paragraph>
                </InfoBox>
              </NoticeSection>

              {/* Section 2: Definition of Prohibited Activities */}
              <NoticeSection
                id="prohibited-activities"
                number={2}
                title="Definition of Prohibited Activities"
                severity="critical"
              >
                <Paragraph>
                  The following activities constitute violations triggering full legal consequences:
                </Paragraph>

                <ExpandableSection title="A. Credential Solicitation" defaultExpanded>
                  <Paragraph>
                    Requesting, encouraging, or accepting SquareCampus login credentials from:
                  </Paragraph>
                  <BulletList
                    type="default"
                    items={[
                      "Current or former customers",
                      "Employees or contractors of institutions using SquareCampus",
                      "Third-party service providers with access",
                      "Any person with authorized access",
                    ]}
                  />
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-semibold text-neutral-300">Examples:</p>
                    <ExampleBox type="violation">
                      &quot;Can you show me how your system works?&quot; [asking customer for demo]
                    </ExampleBox>
                    <ExampleBox type="violation">
                      &quot;We&apos;re doing market research, can we see your dashboard?&quot;
                      [false pretense]
                    </ExampleBox>
                    <ExampleBox type="violation">
                      &quot;I&apos;m evaluating solutions, can you give me a tour?&quot; [without
                      proper authorization]
                    </ExampleBox>
                  </div>
                </ExpandableSection>

                <ExpandableSection title="B. False Pretense Access">
                  <Paragraph>
                    Misrepresenting identity, purpose, or affiliation to gain access:
                  </Paragraph>
                  <BulletList
                    type="x"
                    items={[
                      "Posing as prospective customer while being competitor",
                      'Claiming "academic research" to access proprietary features',
                      "Using shell companies to hide true identity",
                      "Hiring third parties to access on your behalf",
                    ]}
                  />
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-semibold text-neutral-300">Examples:</p>
                    <ExampleBox type="violation">
                      Creating account under fake school name
                    </ExampleBox>
                    <ExampleBox type="violation">
                      &quot;I&apos;m writing a research paper on school systems&quot; [when building
                      competing product]
                    </ExampleBox>
                    <ExampleBox type="violation">
                      Hiring consultant to &quot;evaluate solutions&quot; and report back
                    </ExampleBox>
                  </div>
                </ExpandableSection>

                <ExpandableSection title="C. Reference Call Abuse">
                  <Paragraph>
                    Conducting customer calls that solicit competitive intelligence:
                  </Paragraph>
                  <BulletList
                    type="x"
                    items={[
                      "Asking detailed technical implementation questions",
                      "Requesting demonstrations or screenshots",
                      "Inquiring about pricing, contracts, or terms",
                      "Discussing SquareCampus weaknesses or limitations for competitive advantage",
                    ]}
                  />
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-semibold text-neutral-300">Examples:</p>
                    <ExampleBox type="violation">
                      &quot;How does SquareCampus handle attendance compared to [competitor]?&quot;
                    </ExampleBox>
                    <ExampleBox type="violation">
                      &quot;Can you show me the reporting interface?&quot;
                    </ExampleBox>
                    <ExampleBox type="violation">
                      &quot;What made you choose SquareCampus over [competitor]?&quot;
                    </ExampleBox>
                  </div>
                </ExpandableSection>

                <ExpandableSection title="D. Reverse Engineering">
                  <Paragraph>
                    Analyzing, decompiling, or extracting technical information:
                  </Paragraph>
                  <BulletList
                    type="x"
                    items={[
                      "Network traffic analysis",
                      "API endpoint discovery",
                      "Database schema inference",
                      "UI/UX pattern extraction",
                    ]}
                  />
                </ExpandableSection>

                <ExpandableSection title="E. Information Solicitation">
                  <Paragraph>Requesting confidential business information:</Paragraph>
                  <BulletList
                    type="x"
                    items={[
                      "Pricing and contract terms",
                      "Implementation timelines and costs",
                      "Customer lists or institutional names",
                      "Product roadmap or future features",
                      "Architecture or technical stack details",
                    ]}
                  />
                </ExpandableSection>

                <ExpandableSection title="F. Social Engineering">
                  <Paragraph>Manipulating individuals to disclose information:</Paragraph>
                  <BulletList
                    type="x"
                    items={[
                      "Befriending employees to gain insights",
                      "Recruiting former employees for competitive intelligence",
                      "Offering incentives for confidential information",
                      "Building relationships to access proprietary data",
                    ]}
                  />
                </ExpandableSection>
              </NoticeSection>

              {/* Section 3: Legal Consequences Summary */}
              <NoticeSection
                id="legal-consequences"
                number={3}
                title="Legal Consequences Summary"
                severity="critical"
              >
                <Paragraph>
                  Violations trigger immediate action across ALL the following channels:
                </Paragraph>

                <DataTable
                  headers={["Consequence Type", "Timeline", "Typical Outcome"]}
                  rows={[
                    ["Civil Litigation", "Within 48 hours", "Injunction + Damages ₹25L-₹1Cr+"],
                    [
                      "Criminal Complaint",
                      "Within 24 hours",
                      "Investigation + Potential imprisonment",
                    ],
                    [
                      "Regulatory Notification",
                      "Within 72 hours",
                      "Industry sanctions + Public record",
                    ],
                    ["Public Disclosure", "Within 7 days", "Press release naming violator"],
                    ["Customer Notification", "Immediate", "Warning to your customers"],
                    [
                      "Investor Notification",
                      "Within 14 days",
                      "Disclosure of unethical practices",
                    ],
                  ]}
                />

                <SubHeading>We Will:</SubHeading>
                <BulletList
                  type="check"
                  items={[
                    "File civil lawsuits for trade secret misappropriation, unfair competition, tortious interference",
                    "File criminal complaints under IT Act Sections 43, 66, 66B and IPC Sections 405, 420, 425",
                    "Seek immediate ex-parte injunctive relief to halt access and require destruction of materials",
                    "Report violations to NASSCOM, IAMAI, and relevant industry bodies",
                    "Issue press releases identifying your company and detailing violations",
                    "Notify your investors, board members, and key customers",
                    "Pursue individual liability against employees and officers involved",
                    "Seek maximum statutory damages plus actual damages and attorneys' fees",
                    "Request criminal prosecution with imprisonment and fines",
                    "Pursue contempt proceedings for non-compliance with court orders",
                  ]}
                />

                <SubHeading>We Have:</SubHeading>
                <BulletList
                  type="check"
                  items={[
                    "Dedicated legal counsel specializing in cybercrime and IP protection",
                    "Relationships with cybercrime cells and law enforcement",
                    "Documented evidence collection and preservation procedures",
                    "Prior successful prosecutions of violators",
                    "Significant resources allocated to enforcement",
                    "Executive commitment to making public examples",
                  ]}
                />
              </NoticeSection>

              {/* Section 4: Civil Remedies & Damages */}
              <NoticeSection
                id="civil-remedies"
                number={4}
                title="Civil Remedies & Damages"
                severity="high"
              >
                <SubHeading>A. Liquidated Damages</SubHeading>
                <Paragraph>
                  Contractual damages our customers owe us for facilitating competitor access:
                </Paragraph>
                <BulletList
                  type="default"
                  items={[
                    "Base Penalty: ₹25,00,000 per incident",
                    "Daily Penalty: ₹1,00,000 per day violation continues",
                    "Data Exposure: ₹5,00,000 per 1,000 student records accessed",
                    "Trade Secret: ₹10,00,000 per proprietary element disclosed",
                    "Multiple Competitor: All penalties apply separately per competitor",
                  ]}
                />

                <InfoBox variant="blue">
                  <Strong>Example Calculation:</Strong>
                  <br />
                  Competitor accesses system with 5,000 student records for 3 days:
                  <br />• Base: ₹25,00,000
                  <br />• Daily: ₹3,00,000 (₹1L × 3)
                  <br />• Data: ₹25,00,000 (₹5L × 5 units)
                  <br />
                  <Strong>Total: ₹53,00,000</Strong>
                </InfoBox>

                <SubHeading>B. Actual Damages</SubHeading>
                <Paragraph>Beyond liquidated damages, we pursue:</Paragraph>
                <BulletList
                  type="default"
                  items={[
                    "Lost competitive advantage (calculated from customer acquisition costs)",
                    "Development investment disclosed (engineering hours × market rates)",
                    "Trade secret value (market differentiation × revenue impact)",
                    "Cost of forensic investigation and remediation",
                    "Reputation damage and business interruption",
                    "Future business opportunities lost",
                  ]}
                />

                <SubHeading>C. Injunctive Relief</SubHeading>
                <Paragraph>Court orders we will seek:</Paragraph>
                <BulletList
                  type="default"
                  items={[
                    "Immediate cease and desist of all access and use",
                    "Destruction of all materials obtained (with sworn certification)",
                    "Forensic audit of your systems to verify destruction",
                    "Prohibition on contacting SquareCampus customers",
                    "Prohibition on using any information obtained",
                    "Ongoing monitoring and compliance reporting",
                  ]}
                />

                <SubHeading>D. Attorneys&apos; Fees and Costs</SubHeading>
                <Paragraph>You pay our legal costs:</Paragraph>
                <BulletList
                  type="default"
                  items={[
                    "Attorneys' fees (typically ₹5L-₹20L for prosecution)",
                    "Expert witness fees (forensic analysts, technical experts)",
                    "Court costs and filing fees",
                    "Investigation and evidence collection costs",
                    "Ongoing enforcement and monitoring costs",
                  ]}
                />

                <SubHeading>E. Punitive Damages</SubHeading>
                <Paragraph>If willful and malicious conduct proven:</Paragraph>
                <BulletList
                  type="default"
                  items={[
                    "2x-5x actual damages as punishment",
                    "Additional amounts to deter future violations",
                    "Enhanced damages for repeat offenders",
                  ]}
                />
              </NoticeSection>

              {/* Section 5: Criminal Prosecution */}
              <NoticeSection
                id="criminal-prosecution"
                number={5}
                title="Criminal Prosecution"
                severity="critical"
              >
                <WarningBox title="Criminal Liability Warning" severity="critical">
                  <Paragraph>
                    Unauthorized access attempts constitute criminal offenses under Indian law. We
                    file criminal complaints and cooperate with law enforcement to prosecute
                    violators.
                  </Paragraph>
                </WarningBox>

                <SubHeading>A. IT Act 2000 Violations</SubHeading>

                <ExpandableSection title="Section 43: Unauthorized Access to Computer Systems">
                  <BulletList
                    type="default"
                    items={[
                      "Offense: Accessing computer resource without permission",
                      "Penalty: Damages up to ₹1 Crore",
                      "Our Action: File complaint with Cyber Crime Cell within 24 hours",
                    ]}
                  />
                </ExpandableSection>

                <ExpandableSection title="Section 66: Computer Related Offenses">
                  <BulletList
                    type="default"
                    items={[
                      "Offense: Dishonestly or fraudulently using computer resources",
                      "Penalty: Imprisonment up to 3 years + fine up to ₹5 Lakh",
                      "Our Action: Pursue maximum penalties with evidence of dishonest intent",
                    ]}
                  />
                </ExpandableSection>

                <ExpandableSection title="Section 66B: Dishonestly Receiving Stolen Computer Resource">
                  <BulletList
                    type="default"
                    items={[
                      "Offense: Receiving or retaining information knowing it was obtained through unauthorized access",
                      "Penalty: Imprisonment up to 3 years + fine up to ₹1 Lakh",
                      "Our Action: Target both accessor and recipient of information",
                    ]}
                  />
                </ExpandableSection>

                <ExpandableSection title="Section 66C: Identity Theft">
                  <BulletList
                    type="default"
                    items={[
                      "Offense: Fraudulently using electronic identity",
                      "Penalty: Imprisonment up to 3 years + fine up to ₹1 Lakh",
                      "Our Action: Prosecute false account creation or identity misrepresentation",
                    ]}
                  />
                </ExpandableSection>

                <SubHeading>B. Indian Penal Code 1860 Violations</SubHeading>

                <ExpandableSection title="Section 405: Criminal Breach of Trust">
                  <BulletList
                    type="default"
                    items={[
                      "Offense: Person in position of trust misappropriating property",
                      "Penalty: Imprisonment up to 3 years + fine",
                      "Applies to: Customers who breach trust by sharing access",
                    ]}
                  />
                </ExpandableSection>

                <ExpandableSection title="Section 420: Cheating and Dishonestly Inducing Delivery">
                  <BulletList
                    type="default"
                    items={[
                      "Offense: Deceiving person to deliver property or consent",
                      "Penalty: Imprisonment up to 7 years + fine",
                      "Applies to: False pretense access, social engineering",
                    ]}
                  />
                </ExpandableSection>

                <ExpandableSection title="Section 425: Mischief">
                  <BulletList
                    type="default"
                    items={[
                      "Offense: Causing damage or harm to property",
                      "Penalty: Imprisonment + fine",
                      "Applies to: Causing damage to business through unauthorized access",
                    ]}
                  />
                </ExpandableSection>

                <SubHeading>C. Individual Criminal Liability</SubHeading>
                <Paragraph>Criminal prosecution targets:</Paragraph>
                <BulletList
                  type="default"
                  items={[
                    "Individual employees who accessed system",
                    "Managers who directed unauthorized access",
                    "Executives who approved competitive intelligence gathering",
                    "Company owners who benefited from information obtained",
                  ]}
                />

                <WarningBox title="Your employer cannot protect you from:" severity="warning">
                  <BulletList
                    type="x"
                    items={[
                      "Criminal investigation and arrest",
                      "Criminal trial and conviction",
                      "Imprisonment and criminal fines",
                      "Criminal record affecting future employment",
                      "Professional license implications",
                      "Immigration/visa consequences (if applicable)",
                    ]}
                  />
                </WarningBox>
              </NoticeSection>

              {/* Section 6: Regulatory Complaints */}
              <NoticeSection
                id="regulatory-complaints"
                number={6}
                title="Regulatory Complaints"
                severity="high"
              >
                <Paragraph>We file complaints with industry bodies and regulators to:</Paragraph>
                <BulletList
                  type="default"
                  items={[
                    "Create public record of unethical conduct",
                    "Trigger industry sanctions and blacklisting",
                    "Damage your reputation with customers and investors",
                    "Demonstrate pattern of bad behavior",
                  ]}
                />

                <SubHeading>A. Industry Association Complaints</SubHeading>

                <ExpandableSection title="NASSCOM (National Association of Software and Service Companies)">
                  <BulletList
                    type="default"
                    items={[
                      "Complaint Type: Unethical business practices, IP violation",
                      "Impact: Public censure, membership suspension/termination",
                      "Database: Complaint becomes part of permanent record",
                    ]}
                  />
                </ExpandableSection>

                <ExpandableSection title="IAMAI (Internet and Mobile Association of India)">
                  <BulletList
                    type="default"
                    items={[
                      "Complaint Type: Cyber misconduct, unfair competition",
                      "Impact: Industry-wide notification, reputation damage",
                    ]}
                  />
                </ExpandableSection>

                <SubHeading>B. Government and Regulatory Notifications</SubHeading>
                <BulletList
                  type="default"
                  items={[
                    "Ministry of Education: Warning to schools about your company",
                    "Ministry of Electronics and IT (MeitY): Report of cyber misconduct",
                    "Data Protection Authorities: Investigation under DPDP Act 2023",
                  ]}
                />

                <SubHeading>C. Impact on Your Business</SubHeading>
                <Paragraph>Regulatory complaints create:</Paragraph>
                <BulletList
                  type="default"
                  items={[
                    "Permanent public records of misconduct",
                    "Difficulty winning enterprise customers (who conduct background checks)",
                    "Problems with vendor due diligence processes",
                    "Challenges raising capital (investors check regulatory filings)",
                    "Partnership restrictions (partners avoid tainted companies)",
                    "Government tender disqualification",
                  ]}
                />
              </NoticeSection>

              {/* Section 7: Reputational Consequences */}
              <NoticeSection
                id="reputational-consequences"
                number={7}
                title="Reputational Consequences"
                severity="high"
              >
                <Paragraph>
                  We believe in radical transparency about violations. When we catch you, we tell
                  everyone.
                </Paragraph>

                <SubHeading>A. Public Disclosure</SubHeading>
                <Paragraph>Within 7 days of confirmed violation, we publish:</Paragraph>

                <ExpandableSection title="Press Release">
                  <Paragraph>
                    Distributed to tech media, education publications, business press:
                  </Paragraph>
                  <BulletList
                    type="default"
                    items={[
                      "Your company name and individuals involved",
                      "Detailed description of violation",
                      "Legal actions taken",
                      "Impact on SquareCampus and customers",
                      "Warning to others about your practices",
                    ]}
                  />
                </ExpandableSection>

                <ExpandableSection title="Social Media Campaign">
                  <BulletList
                    type="default"
                    items={[
                      "LinkedIn posts tagging your company and executives",
                      "Twitter threads detailing the violation",
                      "Industry forum posts and discussions",
                      "Community warnings in EdTech groups",
                    ]}
                  />
                </ExpandableSection>

                <SubHeading>B. Customer Notification</SubHeading>
                <Paragraph>We inform ALL SquareCampus customers:</Paragraph>
                <BulletList
                  type="default"
                  items={[
                    "Your company name and what you attempted",
                    "Warning not to trust you with their data or access",
                    "Advice to audit their own security if you contacted them",
                    "Encouragement to share warning with peer institutions",
                  ]}
                />

                <SubHeading>C. Investor and Partner Notification</SubHeading>
                <Paragraph>We research and contact:</Paragraph>
                <BulletList
                  type="default"
                  items={[
                    "Your venture capital investors",
                    "Angel investors and board members",
                    "Strategic partners and resellers",
                    "Banking and financial relationships",
                  ]}
                />

                <SubHeading>D. SEO and Online Reputation</SubHeading>
                <Paragraph>Our publications appear when:</Paragraph>
                <BulletList
                  type="default"
                  items={[
                    "Potential customers Google your company name",
                    "Investors do due diligence searches",
                    "Employees research your company culture",
                    "Partners evaluate your trustworthiness",
                  ]}
                />

                <InfoBox variant="teal">
                  <Strong>Waiver of Defamation Claims:</Strong> By attempting unauthorized access,
                  you waive any defamation, privacy, or reputational damage claims arising from our
                  truthful disclosure of your violation and its consequences.
                </InfoBox>
              </NoticeSection>

              {/* Section 8: Evidence Preservation */}
              <NoticeSection
                id="evidence-preservation"
                number={8}
                title="Evidence Preservation"
                severity="info"
              >
                <Paragraph>
                  Everything you do leaves a trail. We collect, preserve, and weaponize it.
                </Paragraph>

                <SubHeading>A. What We Log</SubHeading>

                <ExpandableSection title="Access Attempts">
                  <BulletList
                    type="default"
                    items={[
                      "IP addresses (source and geolocation)",
                      "Device fingerprints (browser, OS, hardware signatures)",
                      "Timestamps (precise to millisecond)",
                      "Session durations and activity patterns",
                      "Pages accessed and features used",
                      "Data queries and exports",
                      "API calls and parameters",
                    ]}
                  />
                </ExpandableSection>

                <ExpandableSection title="Communications">
                  <BulletList
                    type="default"
                    items={[
                      "Emails soliciting access or information",
                      "Phone calls (recorded with consent/notice)",
                      "Chat transcripts and support tickets",
                      "Social media interactions",
                      "Conference/meeting recordings",
                    ]}
                  />
                </ExpandableSection>

                <SubHeading>B. Evidence You Leave</SubHeading>
                <Paragraph>Even if you think you covered your tracks:</Paragraph>
                <BulletList
                  type="default"
                  items={[
                    "Browser fingerprints (unique even with VPN)",
                    "Typing patterns and behavioral biometrics",
                    "LinkedIn views and social media stalking",
                    "Email read receipts and link tracking",
                    "Phone numbers and call metadata",
                    "IP addresses (VPNs still leave signatures)",
                  ]}
                />

                <SubHeading>C. Evidence Retention</SubHeading>
                <Paragraph>We retain evidence:</Paragraph>
                <BulletList
                  type="default"
                  items={[
                    "Indefinitely for confirmed violations",
                    "Minimum 7 years for suspicious activity",
                    "Full chain of custody documentation",
                    "Multiple backup locations",
                    "Encrypted and access-controlled",
                    "Ready for immediate production in court",
                  ]}
                />

                <WarningBox title="You Cannot Hide" severity="warning">
                  <Paragraph>Common mistakes that don&apos;t work:</Paragraph>
                  <BulletList
                    type="x"
                    items={[
                      "Using VPN (we track behavioral patterns)",
                      "Fake email addresses (we trace back)",
                      "Burner phones (call metadata, voice analysis)",
                      "Incognito mode (doesn't hide server-side logs)",
                      "Having others access on your behalf (conspiracy charges)",
                      "Waiting until statute expires (ongoing offense while you retain info)",
                    ]}
                  />
                </WarningBox>
              </NoticeSection>

              {/* Section 9: Individual Liability */}
              <NoticeSection
                id="individual-liability"
                number={9}
                title="Individual Liability"
                severity="critical"
              >
                <WarningBox title="Personal Consequences" severity="critical">
                  Your employer cannot protect you. You face personal consequences.
                </WarningBox>

                <SubHeading>A. Who Is Personally Liable</SubHeading>

                <BulletList
                  type="default"
                  items={[
                    'Sales Representatives: Who solicited customer access or conducted "reference calls"',
                    "Marketing Personnel: Who directed competitive intelligence gathering",
                    "Product Managers: Who requested competitive feature analysis",
                    "Executives and Leadership: Who approved unethical practices",
                    "Consultants and Contractors: Who accessed on behalf of competitor",
                  ]}
                />

                <SubHeading>B. Personal Legal Consequences</SubHeading>

                <ExpandableSection title="Civil Liability">
                  <BulletList
                    type="default"
                    items={[
                      "Joint and several liability with your employer",
                      "Personal financial judgments that survive bankruptcy",
                      "Wage garnishment and asset seizure",
                      "Affect personal credit rating",
                    ]}
                  />
                </ExpandableSection>

                <ExpandableSection title="Criminal Liability">
                  <BulletList
                    type="default"
                    items={[
                      "Personal arrest and criminal charges",
                      "Individual imprisonment (up to 7 years)",
                      "Personal criminal fines",
                      "Criminal record affecting future employment",
                    ]}
                  />
                </ExpandableSection>

                <SubHeading>C. No Corporate Shield</SubHeading>
                <Paragraph>
                  Your employer&apos;s indemnification doesn&apos;t protect you from:
                </Paragraph>
                <BulletList
                  type="x"
                  items={[
                    "Criminal prosecution (company can't go to jail for you)",
                    "Professional license discipline",
                    "Personal reputation damage",
                    "Ethics investigations",
                    "Employment consequences",
                  ]}
                />

                <SubHeading>D. Think About Your Future</SubHeading>
                <Paragraph>
                  Before you follow orders to access SquareCampus, ask yourself:
                </Paragraph>
                <BulletList
                  type="default"
                  items={[
                    "Is this worth risking my freedom?",
                    "Do I want a criminal record?",
                    "Will my employer really protect me?",
                    "What happens to my family if I go to jail?",
                    "Can I afford the legal fees to defend myself?",
                    "Is my career worth ruining for this?",
                  ]}
                />

                <InfoBox variant="green">
                  <Strong>The answer is NO.</Strong> Instead of participating, consider our
                  Whistleblower Program (Section 12) for rewards up to ₹5,00,000 and protection from
                  retaliation.
                </InfoBox>
              </NoticeSection>

              {/* Section 10: Proper Evaluation Channels */}
              <NoticeSection
                id="proper-evaluation"
                number={10}
                title="Proper Evaluation Channels"
                severity="info"
              >
                <InfoBox variant="green">
                  <Strong>WE SUPPORT FAIR COMPETITION</Strong>
                  <br />
                  If you want to legitimately evaluate SquareCampus, we welcome it. Here&apos;s how:
                </InfoBox>

                <SubHeading>A. Authorized Evaluation Process</SubHeading>

                <ExpandableSection title="Step 1: Honest Contact" defaultExpanded>
                  <BulletList
                    type="default"
                    items={[
                      "Email: sales@squarecampus.com",
                      'Subject: "Competitor Evaluation Request"',
                      "Disclose: Your company name and competing products",
                      "Purpose of evaluation (feature comparison, market research, etc.)",
                      "Specific information needs",
                      "Intended use of information",
                    ]}
                  />
                </ExpandableSection>

                <ExpandableSection title="Step 2: NDA Execution">
                  <Paragraph>We will provide:</Paragraph>
                  <BulletList
                    type="default"
                    items={[
                      "Standard mutual NDA",
                      "Competitor-specific restrictions",
                      "Clear scope of what may/may not be disclosed",
                      "Duration and survival terms",
                    ]}
                  />
                </ExpandableSection>

                <ExpandableSection title="Step 3: Limited Demonstration">
                  <Paragraph>We may provide:</Paragraph>
                  <BulletList
                    type="default"
                    items={[
                      "Controlled demo environment (not customer data)",
                      "Specific features you wish to evaluate",
                      "Sales representative present during demonstration",
                      "Time-limited access",
                      "Documented limitations on use",
                    ]}
                  />
                </ExpandableSection>

                <SubHeading>B. What We Refuse</SubHeading>
                <Paragraph>We will NOT provide:</Paragraph>
                <BulletList
                  type="x"
                  items={[
                    "Access to customer production environments",
                    "Customer contact information or facilitated reference calls",
                    "Source code or architecture diagrams",
                    "Database schemas or API documentation beyond public",
                    "Unrestricted or unsupervised access",
                    "Information that constitutes trade secrets",
                  ]}
                />

                <SubHeading>C. If You&apos;re Unsure</SubHeading>
                <Paragraph>Questions about what&apos;s acceptable? Contact:</Paragraph>
                <BulletList
                  type="default"
                  items={[
                    "Email: legal@squarecampus.com",
                    'Subject: "Competitive Intelligence Ethics Inquiry"',
                    "We'll respond within 24 business hours",
                    "Better to ask than assume and face consequences",
                  ]}
                />

                <InfoBox variant="teal">
                  <Strong>We prefer education over enforcement.</Strong> But if you violate after
                  being warned, consequences are severe.
                </InfoBox>
              </NoticeSection>

              {/* Section 11: Cease and Desist Requirements */}
              <NoticeSection
                id="cease-desist"
                number={11}
                title="Cease and Desist Requirements"
                severity="high"
              >
                <Paragraph>
                  If you&apos;ve already violated, immediate action may reduce (but not eliminate)
                  consequences.
                </Paragraph>

                <SubHeading>A. If You&apos;ve Already Accessed</SubHeading>
                <Paragraph>
                  <Strong>Within 48 Hours, You Must:</Strong>
                </Paragraph>

                <ExpandableSection title="1. Cease All Use Immediately" defaultExpanded>
                  <BulletList
                    type="default"
                    items={[
                      "Stop accessing SquareCampus through any means",
                      "Discontinue any analysis or reverse engineering",
                      "Stop using any information obtained",
                      "Terminate any ongoing access or monitoring",
                    ]}
                  />
                </ExpandableSection>

                <ExpandableSection title="2. Destroy All Materials">
                  <BulletList
                    type="default"
                    items={[
                      "Delete all screenshots and screen recordings",
                      "Destroy all notes, analysis, and documentation",
                      "Purge all emails and communications containing information",
                      "Erase all copies from all systems and backups",
                      "Certify destruction in writing under oath",
                    ]}
                  />
                </ExpandableSection>

                <ExpandableSection title="3. Notify Us in Writing">
                  <BulletList
                    type="default"
                    items={[
                      "Email: legal@squarecampus.com",
                      'Subject: "Voluntary Disclosure - Unauthorized Access"',
                      "Include: Your company name and role",
                      "Dates and methods of access",
                      "What information was accessed",
                      "How information was used",
                      "Who else has access to information",
                      "Proof of destruction",
                      "Sworn statement of completeness",
                    ]}
                  />
                </ExpandableSection>

                <SubHeading>B. What Does NOT Reduce Consequences</SubHeading>
                <Paragraph>The following do NOT help:</Paragraph>
                <BulletList
                  type="x"
                  items={[
                    "\"We didn't know it was wrong\" (you're reading this notice)",
                    '"The customer volunteered the access" (still unauthorized)',
                    '"We were just doing research" (false pretense)',
                    '"Everyone in the industry does it" (not a defense)',
                    '"We didn\'t use the information" (access itself is violation)',
                    '"We\'ll delete it now" (damage already done)',
                  ]}
                />

                <WarningBox title="Time Is Critical" severity="warning">
                  <Paragraph>Every day you delay:</Paragraph>
                  <BulletList
                    type="default"
                    items={[
                      "Increases damages and consequences",
                      "Reduces our willingness to negotiate",
                      "Allows information to spread further",
                      "Makes verification more difficult",
                      "Demonstrates bad faith and lack of remorse",
                    ]}
                  />
                  <Paragraph>
                    <Strong>Act immediately if you&apos;ve violated.</Strong>
                  </Paragraph>
                </WarningBox>
              </NoticeSection>

              {/* Section 12: Whistleblower Protection Program */}
              <NoticeSection
                id="whistleblower"
                number={12}
                title="Whistleblower Protection Program"
                severity="info"
              >
                <InfoBox variant="green">
                  <Strong>WHISTLEBLOWER PROTECTION & REWARDS</Strong>
                  <br />
                  We protect and reward individuals who report unethical competitive practices.
                </InfoBox>

                <SubHeading>A. Who Should Report</SubHeading>

                <ExpandableSection title="Employees of Competitors" defaultExpanded>
                  <BulletList
                    type="default"
                    items={[
                      "Sales reps asked to solicit access",
                      "Marketing staff directed to gather intelligence improperly",
                      "Product managers told to analyze stolen information",
                      "Executives aware of unethical practices",
                      "Anyone uncomfortable with company's methods",
                    ]}
                  />
                </ExpandableSection>

                <ExpandableSection title="Third Parties">
                  <BulletList
                    type="default"
                    items={[
                      "Consultants hired to access on behalf of competitors",
                      "Former employees with knowledge of violations",
                      "Industry insiders aware of misconduct",
                      "Customers approached by competitors improperly",
                    ]}
                  />
                </ExpandableSection>

                <SubHeading>B. How to Report</SubHeading>
                <BulletList
                  type="default"
                  items={[
                    "Email (Encrypted Available): whistleblower@squarecampus.com",
                    "PGP key available at squarecampus.com/pgp",
                    "Anonymous: Use ProtonMail or similar if preferred",
                    "Secure Web Form: squarecampus.com/report-violation",
                  ]}
                />

                <SubHeading>C. Reward Program</SubHeading>
                <DataTable
                  headers={["Tier", "Criteria", "Reward Amount"]}
                  rows={[
                    ["Tier 1", "Leads to cease and desist compliance", "₹50,000"],
                    ["Tier 2", "Leads to settlement or documented violation", "₹2,00,000"],
                    [
                      "Tier 3",
                      "Leads to successful litigation or criminal prosecution",
                      "₹5,00,000",
                    ],
                  ]}
                />

                <SubHeading>D. Confidentiality Protection</SubHeading>
                <Paragraph>
                  <Strong>We Guarantee:</Strong>
                </Paragraph>
                <BulletList
                  type="check"
                  items={[
                    "Your identity remains confidential",
                    "Information provided not disclosed without consent",
                    "Secure communication channels",
                    "No public disclosure linking you to report",
                    "Legal protection from retaliation (where applicable)",
                  ]}
                />

                <SubHeading>E. Anti-Retaliation Protection</SubHeading>
                <Paragraph>
                  <Strong>If Your Employer Retaliates, We Will:</Strong>
                </Paragraph>
                <BulletList
                  type="default"
                  items={[
                    "Document retaliation for your legal action",
                    "Provide evidence for your wrongful termination case",
                    "Connect you with employment attorneys",
                    "Serve as witness to your good faith report",
                    "Publicize retaliatory actions (with your consent)",
                  ]}
                />

                <InfoBox variant="teal">
                  <Strong>Make the Right Choice:</Strong> You don&apos;t owe loyalty to unethical
                  practices. Protecting customers and fair competition is right. Financial rewards
                  offset employment risk. You can report anonymously. We support you throughout the
                  process.
                </InfoBox>
              </NoticeSection>
            </div>

            {/* Sidebar TOC - Desktop only */}
            <TableOfContentsSidebar />
          </div>
        </div>

        <ReportingCTA />
        <EvidenceFooter />
      </main>
    </>
  );
}
