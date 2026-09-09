/**
 * Commercial model content for /pricing.
 *
 * RULE OF THIS FILE: no rupee amounts, per-student rates, "starting from"
 * figures, savings percentages or monthly equivalents — here or in any
 * component that consumes it. The public page explains the *model*; the rate
 * card lives in the order form, not on the website. Cross-cutting commercial
 * facts (pricing availability, identity by plan, the Founding Partner
 * programme) come from content/commercial.ts so every surface states them
 * identically.
 *
 * Capability themes below are indicative positioning, not entitlement limits.
 * Every plan block therefore carries `scopeNote`, which the page renders.
 */

import { foundingProgramme, identity, pricingAvailability } from "./commercial";

export type PlanId = "starter" | "pro" | "enterprise";

export type Plan = {
  id: PlanId;
  /** Ordinal shown in the ascending capability architecture. */
  step: string;
  name: string;
  /** One-line positioning: what depth of control this plan represents. */
  positioning: string;
  /** The operational problem the plan is bought to solve. */
  problem: string;
  bestFor: readonly string[];
  capabilities: readonly string[];
  deployment: string;
  badge?: string;
  /**
   * An optional highlighted capability given its own block in the plan band,
   * for a differentiator that would be lost inside the capability list.
   */
  spotlight?: {
    title: string;
    body: string;
    labels: readonly string[];
    note: string;
  };
  cta: { label: string; href: string };
};

export const plans: readonly Plan[] = [
  {
    id: "starter",
    step: "01",
    name: "Starter",
    positioning: "Core school operations on one connected institutional backbone.",
    problem:
      "Records, attendance, fees and results live in separate tools, so every question needs a person to reconcile an answer by hand.",
    bestFor: [
      "Schools replacing fragmented spreadsheets and disconnected tools",
      "Institutions that need reliable core workflows before anything else",
      "Institutions beginning on managed SquareCampus Cloud",
    ],
    capabilities: [
      "Student and staff records",
      "Attendance workflows",
      "Fees and reconciliation",
      "Exams and reports",
      "Parent and staff communication",
      "Parent and staff mobile apps",
      "SquareCampus-managed sign-in with role-based access",
      "Audit history",
      "Standard operational dashboards",
    ],
    deployment: "Managed SquareCampus Cloud, with standard onboarding and support.",
    cta: { label: "Discuss Starter", href: "/demo" },
  },
  {
    id: "pro",
    step: "02",
    name: "Pro",
    positioning:
      "Operational command for institutions that need deeper visibility and accountability.",
    problem:
      "The core runs, but leadership still cannot see what is slipping, who owns it, or whether an exception was ever closed.",
    bestFor: [
      "Growing schools taking on more operational complexity",
      "Institutions that need management dashboards and workflow governance",
      "Institutions introducing cross-functional accountability",
    ],
    capabilities: [
      "Everything represented in Starter",
      "Owner command views",
      "Richer operational analytics",
      "Advanced exception routing",
      "Workflow SLAs",
      "Deeper auditability",
      "Optional institutional single sign-on with Microsoft Entra ID",
      "API and standard integration readiness",
      "AEGIS eligibility or controlled access",
    ],
    deployment: "Managed SquareCampus Cloud, with priority implementation and support options.",
    spotlight: {
      title: identity.pro.name,
      body: identity.pro.body,
      labels: [
        "Optional, never mandatory",
        "Institution's own Entra ID tenant",
        "Customer MFA and Conditional Access apply",
        "SquareCampus-governed authorisation",
      ],
      note: "Single sign-on is an option the institution chooses, not a requirement. SquareCampus-managed credentials remain available in every plan, and an institution is not asked to change its directory to use SquareCampus.",
    },
    cta: { label: "Explore Pro", href: "/demo" },
  },
  {
    id: "enterprise",
    step: "03",
    name: "Enterprise",
    positioning:
      "Institutional governance, cross-campus command and advanced controls for larger or more complex institutions.",
    problem:
      "Central policy and local accountability pull against each other, identity and audit requirements outgrow ordinary controls, and no single view reconciles what every campus is actually doing.",
    bestFor: [
      "Educational trusts and multi-campus groups",
      "Church-run school chains",
      "Institutions balancing central policy with local accountability",
      "Standalone schools with governance, identity or audit requirements",
    ],
    capabilities: [
      "Everything represented in Pro",
      "Trust and campus hierarchy",
      "Cross-campus command",
      "Approval and governance chains with configurable exception ownership",
      "Advanced policy and audit controls",
      "Identity governance requirements, scoped during technical discovery",
      "Deeper and custom integrations",
      "Governed AEGIS access within an allowance",
      "Advanced audit exports and data portability",
    ],
    deployment:
      "Managed cloud, private-cloud or on-premises eligibility, with enterprise implementation governance and tailored support structures.",
    badge: "Selected by governance need",
    spotlight: {
      title: identity.enterprise.name,
      body: identity.enterprise.body,
      labels: [
        "Multi-campus and multi-directory requirements",
        "Directory-group to role mappings",
        "SSO enforcement policy",
        "Lifecycle and identity audit controls",
      ],
      note: "Enterprise is not Pro with more modules. It is selected when governance, identity, audit or cross-campus requirements sit above what ordinary controls provide. Identity governance requirements are established during technical discovery and set out in the proposal.",
    },
    cta: { label: "Design an Enterprise plan", href: "/demo" },
  },
] as const;

/**
 * Enterprise is chosen by governance requirement, not by enrolment.
 *
 * The internal minimum annual commitment is deliberately NOT stated here or
 * anywhere else on the public site — only that terms follow the proposal.
 */
export const enterpriseForSmallerInstitutions = {
  heading: "Enterprise control is not reserved for large institutions.",
  body: "Enterprise is selected by governance requirement, not merely by enrolment. A standalone school may require institution-managed identity, advanced approvals, executive visibility, stricter auditability or governed intelligence even without operating a large campus network.",
  compact: "Small institution. Enterprise-grade control.",
  /** Reasons a smaller institution legitimately lands on Enterprise. */
  triggers: [
    "Identity governance beyond a single tenant's single sign-on: enforcement policy, group-to-role mappings, lifecycle controls",
    "Deeper approval chains and configurable exception ownership",
    "Executive command views for a board or trustee group",
    "Stricter access governance and advanced audit exports",
    "Governed AEGIS access within an internal allowance",
    "Implementation governance and support escalation policy",
  ],
  /** Guards against reading this as "everyone should buy Enterprise". */
  counterNote:
    "Most institutions are well served by Starter or Pro. Enterprise exists for institutions whose governance, identity or audit requirements genuinely sit above them — not as a safer version of the same product.",
} as const;

/**
 * Unit-economics guardrail, stated in buyer language.
 *
 * Enterprise carries high-value institutional capability whose marginal cost
 * is controlled. Everything with an open-ended variable cost stays metered,
 * allowance-based, separately scoped or fair-use governed — and the page says
 * so plainly rather than implying "unlimited".
 */
export const ALLOWANCE_NOTE =
  "Enterprise capabilities are institutional controls rather than open-ended service commitments. Governed AEGIS access, messaging, storage and third-party usage run within agreed allowances or on a metered basis, and implementation, migration and custom engineering are scoped as their own lines. Allowances and fair-use terms are set in the proposal and the order form.";

/** Capability themes are positioning, not contractual entitlements. */
export const SCOPE_NOTE =
  "Capability themes are indicative. Final inclusions, limits and service levels are set by the proposal and the signed order form.";

/** The four dimensions of the annual licence. Deliberately non-numeric. */
export const modelDimensions = [
  {
    id: "scale",
    term: "Scale",
    summary: "Active enrolled students",
    body: "Student volume sets the platform baseline. Larger enrolments sit in progressively better volume bands, so the marginal rate reduces as the institution grows.",
  },
  {
    id: "depth",
    term: "Depth",
    summary: "Starter, Pro or Enterprise",
    body: "The plan reflects how much operational and governance control the institution needs — from connected core operations through to trust-level command.",
  },
  {
    id: "complexity",
    term: "Complexity",
    summary: "Campuses, workflows, roles and governance",
    body: "Multiple campuses, deeper approval chains and wider role structures change the shape of the rollout and the shape of the commercial.",
  },
  {
    id: "delivery",
    term: "Delivery",
    summary: "Migration, deployment, integrations and support",
    body: "Data migration, deployment profile, integrations and the support model are scoped explicitly rather than folded into an unstated blended rate.",
  },
] as const;

/** Inputs collected during institutional discovery. */
export const proposalInputs = [
  { label: "Active student count", detail: "The billable enrolment basis for the term." },
  { label: "Number of campuses", detail: "Single campus, group, or trust hierarchy." },
  { label: "Workflows selected", detail: "Which operational areas move onto the platform." },
  {
    label: "Migration volume and data quality",
    detail: "How much history moves, and in what state.",
  },
  {
    label: "Integrations",
    detail: "Accounting, identity, payments and existing institutional systems.",
  },
  { label: "Deployment profile", detail: "Managed cloud, private cloud, or on-premises." },
  {
    label: "Support and SLA requirements",
    detail: "Response expectations and escalation structure.",
  },
  {
    label: "Governance and approval depth",
    detail: "Approval chains, policy controls and audit expectations.",
  },
  { label: "AEGIS usage", detail: "Whether governed intelligence is in scope, and at what depth." },
  {
    label: "Communication and storage requirements",
    detail: "Messaging volume and document retention.",
  },
] as const;

export const DISCOVERY_NOTE =
  "Exact commercial terms are issued after a short institutional discovery.";

/**
 * Scoped independently so the licence stays predictable. Not punitive.
 *
 * `tag` carries only what is factually established: a one-time charge, a
 * pass-through of a third party's own fee, or a metered dimension. Items with
 * no tag are ordinary scoped project work — no commercial shape is implied.
 */
export type ScopedGroupId = "data" | "engineering" | "identity" | "implementation" | "metered";

export const separatelyScoped: ReadonlyArray<{
  id: ScopedGroupId;
  group: string;
  items: ReadonlyArray<{ label: string; tag?: string }>;
}> = [
  {
    id: "data",
    group: "Data and migration",
    items: [
      { label: "Legacy data migration" },
      { label: "Historical data cleaning" },
      { label: "Bespoke reporting" },
    ],
  },
  {
    id: "engineering",
    group: "Engineering and deployment",
    items: [
      { label: "Custom integrations" },
      { label: "Private-cloud deployment" },
      { label: "On-premises deployment" },
      { label: "White-label Android and iOS apps", tag: "One charge, full term" },
    ],
  },
  {
    id: "identity",
    group: "Identity governance requirements",
    items: [
      { label: "Automated provisioning and lifecycle controls", tag: "Enterprise" },
      { label: "Multi-directory and multi-campus identity governance", tag: "Enterprise" },
      { label: "Identity migration", tag: "Enterprise" },
      { label: "Custom federation requirements", tag: "Enterprise" },
    ],
  },
  {
    id: "implementation",
    group: "Implementation and support",
    items: [{ label: "Premium implementation services" }, { label: "Premium support SLA" }],
  },
  {
    id: "metered",
    group: "Metered third-party usage",
    items: [
      { label: "SMS and WhatsApp usage", tag: "Passed through" },
      { label: "Payment-gateway charges", tag: "Passed through" },
      { label: "Excess storage", tag: "Metered" },
      { label: "Unusually high AEGIS usage", tag: "Metered" },
    ],
  },
] as const;

/**
 * The standard SquareCampus parent and staff apps carry no additional charge
 * in any plan. A white-labelled build — the institution's own branding and its
 * own Play Store / App Store listings — carries a single charge that covers
 * the whole agreed term, however long that term is. Founding Institutional
 * Partners receive the white-labelled build without that charge.
 */
export const MOBILE_APP_NOTE =
  "The SquareCampus parent and staff mobile apps are included in every plan at no additional charge. White-labelled Android and iOS apps, published under the institution's own branding and store listings, carry a single charge that covers the entire agreed term, whether that is one year or many. Founding Institutional Partners receive the white-labelled apps without the standard white-label charge.";

/** Procurement-grade fit statement, rendered on /pricing and reused elsewhere. */
export const PRICING_POSITIONING = pricingAvailability.positioning;

export const pilot = {
  window: "60–90 days",
  points: [
    { term: "Scope", detail: "One campus, or one agreed workflow bundle." },
    { term: "Measure", detail: "One agreed success metric, written down before the start." },
    { term: "Ownership", detail: "Founder-led implementation, with a written baseline." },
    { term: "Close", detail: "Measured against the baseline — then convert, extend or stop." },
  ],
} as const;

/**
 * Procurement FAQ. This array is the single source for both the rendered
 * accordion and the FAQPage JSON-LD, so the visible text and the structured
 * data cannot drift apart.
 */
export const pricingFaqs = [
  {
    question: "Is pricing public?",
    answer: `${pricingAvailability.short} ${pricingAvailability.model} A single published figure would be wrong for most institutions in both directions, so the proposal is written against the institution's actual enrolment, plan, complexity and deployment profile.`,
  },
  {
    question: "What is included in the licence, and what is scoped separately?",
    answer: `${pricingAvailability.included} ${pricingAvailability.scopedSeparately} Every separately scoped line appears in the proposal before signature.`,
  },
  {
    question: "How is student count determined?",
    answer:
      "Billable enrolment is agreed in the order form using active enrolled records. Growth may be reconciled through an agreed true-up mechanism, while reductions are normally considered at renewal. The signed order form governs in every case.",
  },
  {
    question: "What happens as enrolment grows?",
    answer: pricingAvailability.volume,
  },
  {
    question: "What does Enterprise add beyond ordinary ERP modules?",
    answer:
      "Enterprise is selected by governance requirement, not by enrolment or module count. It adds the trust-school-campus hierarchy with policy set once and executed locally, cross-campus command views built on the records campuses run on, approval and governance chains with configurable exception ownership, identity governance requirements scoped during discovery, advanced policy and audit controls with audit exports and data portability, governed AEGIS access within an agreed allowance, and managed, private-cloud or on-premises deployment eligibility with enterprise implementation governance.",
  },
  {
    question: "Is SquareCampus appropriate if we only need attendance and fees?",
    answer: `Usually not. ${pricingAvailability.positioning} Starter is the right conversation only when the institution wants those functions connected on one governed record with owners against exceptions.`,
  },
  {
    question: "Can we keep our existing ERP during the pilot?",
    answer:
      "Yes. A pilot is deliberately scoped to one campus or one workflow bundle, so the existing ERP keeps running and stays authoritative alongside it. Replacing anything is a later decision the institution takes once the evidence exists, never a precondition of starting.",
  },
  {
    question: "Is migration included?",
    answer:
      "Legacy data migration and historical data cleaning are scoped separately from the annual licence, because the effort depends entirely on how much history moves and what condition it is in. The scope and its commercial treatment are agreed in the proposal.",
  },
  {
    question: "Can SquareCampus run in our cloud account?",
    answer:
      "Private-cloud and on-premises deployment are available under Enterprise, subject to scoping. Deployment profile is one of the inputs to the proposal, and the resulting responsibilities are set out before implementation begins.",
  },
  {
    question: "Is the mobile app charged separately?",
    answer: `No. ${MOBILE_APP_NOTE}`,
  },
  {
    question: "Can an institution use normal SquareCampus credentials?",
    answer: `Yes. ${identity.baseline.body} Single sign-on is an option, not a requirement.`,
  },
  {
    question: "Does Pro support institutional single sign-on?",
    answer: `Yes. ${identity.pro.body} The institution chooses the sign-in mode: ${identity.modes.join("; ")}.`,
  },
  {
    question: "Does SquareCampus access our Outlook or Microsoft 365 data?",
    answer:
      "No. Standard Microsoft Entra ID sign-in is used to authenticate identity. Access to email, files, Teams, SharePoint or other Microsoft Graph data is not required for sign-in.",
  },
  {
    question: "Does single sign-on automatically create and remove users?",
    answer:
      "No. Single sign-on authenticates users. Automated provisioning, deprovisioning and joiner-mover-leaver lifecycle controls are identity governance requirements scoped under Enterprise rather than part of SSO.",
  },
  {
    question: "What identity governance does Enterprise add?",
    answer: `${identity.enterprise.body} ${identity.principle}`,
  },
  {
    question: "Is GST included?",
    answer: `${pricingAvailability.taxes} Applicable Indian taxes are shown on the order form and invoices.`,
  },
  {
    question: "How is AEGIS usage handled?",
    answer:
      "AEGIS availability depends on the plan, and governed usage is part of the scoping conversation. Ordinary institutional use is covered by the plan; unusually high usage is treated as a separately scoped, metered dimension so it never distorts the base licence.",
  },
  {
    question: "Can a trust contract cover multiple campuses?",
    answer:
      "Yes. Enterprise is built for trust and campus hierarchies, and a single trust-level agreement can cover multiple campuses with central policy and local accountability. Campus coverage is defined in the order form.",
  },
  {
    question: "How many Founding Institutional Partner positions exist?",
    answer: `${foundingProgramme.positionsStatement} ${foundingProgramme.nature}`,
  },
] as const;
