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

import { commercialScope, foundingProgramme, identity, pricingAvailability } from "./commercial";
import { company } from "./company";

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
  /**
   * What is quoted as its own line for this plan rather than folded into the
   * licence — drawn from `separatelyScoped` below, never a new commitment.
   */
  scopedExtras: readonly string[];
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
      "Self-serve reports: saved views, charts and Excel, CSV or PDF export",
    ],
    scopedExtras: [
      "Data migration and cleaning",
      "Custom integrations",
      "A custom SLA, such as 24×7 cover",
      "Usage beyond the monthly allowance, prepaid",
    ],
    deployment: "Managed SquareCampus Cloud, with implementation and support included.",
    cta: { label: "Request a Starter proposal", href: "/pricing/#request-proposal" },
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
      "Standard integrations and development API access, scoped in the proposal",
      "AEGIS, when the proposal includes it",
      "Data migration from your current system",
    ],
    scopedExtras: [
      "Custom integrations beyond the standard set",
      "A custom SLA, such as 24×7 cover",
      "Usage beyond the monthly allowance, prepaid",
    ],
    deployment: "Managed SquareCampus Cloud, with implementation and support included.",
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
    cta: { label: "Request a Pro proposal", href: "/pricing/#request-proposal" },
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
      "Identity governance, established during technical discovery",
      "Deeper and custom integrations",
      "AEGIS within an agreed allowance",
      "Advanced audit exports and data portability",
      "Data migration from your current system",
      "Implementation governance across campuses",
    ],
    scopedExtras: [
      "Private-cloud or on-premises deployment",
      "Custom integrations and engineering",
      "A custom SLA, such as 24×7 cover",
      "Usage beyond agreed allowances, prepaid",
    ],
    deployment:
      "Managed cloud, private-cloud or on-premises eligibility, with full implementation and support included.",
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
    cta: { label: "Request an Enterprise proposal", href: "/pricing/#request-proposal" },
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
    "Identity governance beyond single sign-on: enforcement, group-to-role mappings, lifecycle",
    "Deeper approval chains and exception ownership",
    "Board or trustee command views",
    "Stricter access governance and audit exports",
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
  "Enterprise capabilities are controls, not open-ended service commitments: AEGIS, messaging and storage run within agreed monthly allowances, and usage beyond them is prepaid. Implementation and support are included; custom engineering and a custom SLA are quoted. Allowances are set in the order form.";

/** Capability themes are positioning, not contractual entitlements. */
export const SCOPE_NOTE =
  "Capability themes are indicative. Final inclusions, limits and service levels are set by the proposal and the signed order form, and the modules available to your institution, and when, are confirmed there too.";

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
    summary: "Deployment, integrations and support",
    body: "The deployment profile, integrations and support model are set out explicitly rather than folded into an unstated blended rate. Migration is included from Pro.",
  },
] as const;

/** Inputs collected during institutional discovery. */
export const proposalInputs = [
  { label: "Active student count", detail: "The billable enrolment basis for the term." },
  { label: "Number of campuses", detail: "Single campus, group, or trust hierarchy." },
  { label: "Workflows selected", detail: "Which operational areas move onto the platform." },
  {
    label: "Migration volume and data quality",
    detail: "How much history moves, and in what state, so we can say early what cannot.",
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
    detail: "Messaging volume and document storage.",
  },
] as const;

export const DISCOVERY_NOTE =
  "Exact commercial terms are issued after a short institutional discovery.";

/**
 * What the licence already covers, drawn from `pricingAvailability.included`
 * and `commercialScope`. Shown before the optional lines so the split is
 * visible at a glance; `plans` marks an inclusion that is not in every plan.
 * Capabilities here are described as designed; the band carries the
 * availability line, and the proposal confirms what an institution gets.
 */
export const licenceIncludes: ReadonlyArray<{
  id: "platform" | "apps" | "reports" | "support" | "allowance" | "migration";
  title: string;
  detail: string;
  plans?: string;
}> = [
  {
    id: "platform",
    title: "Your plan's platform",
    detail: "Every capability theme listed for your plan.",
  },
  {
    id: "apps",
    title: "Parent and staff apps",
    detail: "The standard SquareCampus apps, at no extra charge.",
  },
  {
    id: "reports",
    title: "Your own reports",
    detail:
      "Filter, group, total and chart your tables, save views and export to Excel, CSV or PDF.",
  },
  {
    id: "support",
    title: "Implementation and support",
    detail: "In every plan, with no paid fast track. Designed to need little or no training.",
  },
  {
    id: "allowance",
    title: "Monthly usage allowance",
    detail: "SMS, WhatsApp and storage, plus AEGIS where your plan includes it.",
  },
  {
    id: "migration",
    title: "Data migration",
    detail: commercialScope.migrationShort,
    plans: "Pro and Enterprise",
  },
];

/** The usage group's one line: top-ups are prepaid, so nothing is billed afterwards. */
export const USAGE_NOTE =
  "Top-ups are bought in advance at the rates in your proposal, so there is never a bill after the fact.";

/**
 * Scoped independently so the licence stays predictable. Not punitive.
 *
 * `tag` carries only what is factually established: the plans a line applies
 * to, a one-time charge, a prepaid top-up, or a fee SquareCampus never bills.
 * Items with no tag are ordinary scoped work — no commercial shape is implied.
 */
export type ScopedGroupId = "data" | "engineering" | "metered";

export const separatelyScoped: ReadonlyArray<{
  id: ScopedGroupId;
  group: string;
  items: ReadonlyArray<{ label: string; tag?: string }>;
}> = [
  {
    id: "data",
    group: "Data, reports and SLAs",
    items: [
      { label: "Data migration and cleaning", tag: "On Starter" },
      { label: "Fixed-format documents made only for you" },
      { label: "A custom SLA, such as 24×7 cover" },
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
    id: "metered",
    group: "Usage beyond the allowance",
    items: [
      { label: "SMS and WhatsApp", tag: "Prepaid" },
      { label: "Storage", tag: "Prepaid" },
      { label: "AEGIS", tag: "Prepaid" },
      { label: "Payment-gateway fees", tag: "Not billed by us" },
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
export const WHITE_LABEL_NOTE =
  "White-labelled Android and iOS apps under your own branding carry one charge for the whole agreed term. Founding Institutional Partners receive them without it.";

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
    answer: `${pricingAvailability.short} One published figure would be wrong for most institutions, in both directions.`,
  },
  {
    question: "What does Enterprise add beyond ordinary ERP modules?",
    answer:
      "Governance rather than modules: the trust-school-campus hierarchy, cross-campus command, approval chains with exception ownership, identity governance, advanced policy and audit controls with audit exports and data portability, AEGIS within an agreed allowance, and private-cloud or on-premises eligibility. It is chosen by governance need, not enrolment.",
  },
  {
    question: "Is SquareCampus appropriate if we only need attendance and fees?",
    answer: `Usually not. ${pricingAvailability.positioning}`,
  },
  {
    question: "Can we keep our existing ERP during the pilot?",
    answer:
      "Yes. A pilot covers one campus or one workflow bundle, and your ERP keeps running and stays authoritative. Replacing anything is a later decision, taken on evidence.",
  },
  {
    question: "Is migration included?",
    answer: `${commercialScope.migration} ${commercialScope.migrationLimit}`,
  },
  {
    question: "Do custom reports cost extra?",
    answer: commercialScope.reporting,
  },
  {
    question: "What does implementation cost?",
    answer: `Nothing extra. ${commercialScope.implementation}`,
  },
  {
    question: "Can the price grow after we sign?",
    answer: `Not by surprise. ${commercialScope.noSurprises} Enrolment growth is reconciled through the agreed true-up.`,
  },
  {
    question: "Can SquareCampus run in our own cloud account?",
    answer:
      "Not today. Enterprise can scope a dedicated deployment on AWS, in a private cloud or on premises, with responsibilities set out before implementation.",
  },
  {
    question: "Which sign-in options does each plan have?",
    answer: `${identity.baseline.body} From Pro: ${identity.pro.body} Enterprise: ${identity.enterprise.body}`,
  },
  {
    question: "Does SquareCampus access our Outlook or Microsoft 365 data?",
    answer:
      "No. Entra ID sign-in authenticates identity only; no access to email, files, Teams or SharePoint is needed.",
  },
  {
    question: "Does single sign-on automatically create and remove users?",
    answer:
      "No. Single sign-on authenticates. Automated provisioning and joiner-mover-leaver controls are identity governance, part of Enterprise and established during technical discovery.",
  },
  {
    question: "Is GST included?",
    answer: `${pricingAvailability.taxes} Applicable Indian taxes are shown on the order form and on tax invoices issued by ${company.legalNameDisplay} under GSTIN ${company.gstin}.`,
  },
  {
    question: "How is AEGIS usage handled?",
    answer:
      "Not included in Starter; in Pro when the proposal includes it; in Enterprise within an agreed monthly allowance. Usage beyond the allowance is prepaid, so it never becomes a surprise bill.",
  },
  {
    question: "Can a trust contract cover multiple campuses?",
    answer:
      "Yes. One trust-level agreement can cover several campuses under central policy; coverage is defined in the order form.",
  },
  {
    question: "How many Founding Institutional Partner positions exist?",
    answer: `${foundingProgramme.positionsStatement} ${foundingProgramme.nature}`,
  },
] as const;
