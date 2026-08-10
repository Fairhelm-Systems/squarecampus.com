/**
 * Commercial model content for /pricing.
 *
 * RULE OF THIS FILE: no rupee amounts, per-student rates, "starting from"
 * figures, discounts, savings percentages or monthly equivalents — here or in
 * any component that consumes it. The public page explains the *model*; the
 * rate card lives in the order form, not on the website.
 *
 * Capability themes below are indicative positioning, not entitlement limits.
 * Every plan block therefore carries `scopeNote`, which the page renders.
 */

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
      "Role-based access",
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
      "API and standard integration readiness",
      "AEGIS eligibility or controlled access",
    ],
    deployment: "Managed SquareCampus Cloud, with priority implementation and support options.",
    cta: { label: "Explore Pro", href: "/demo" },
  },
  {
    id: "enterprise",
    step: "03",
    name: "Enterprise",
    positioning: "Trust-level governance and institutional command across campuses.",
    problem:
      "Central policy and local accountability pull against each other, and no single view reconciles what every campus is actually doing.",
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
      "Approval and governance chains",
      "Advanced policy and audit controls",
      "Microsoft Entra ID SSO",
      "Governed AEGIS access within an allowance",
      "Advanced audit exports and data portability",
    ],
    deployment:
      "Managed cloud, private-cloud or on-premises eligibility, with enterprise implementation governance and tailored support structures.",
    badge: "Selected by governance need",
    spotlight: {
      title: "Microsoft Entra ID SSO",
      body: "Let staff authenticate through your institution's Microsoft identity environment while SquareCampus continues to enforce campus-aware roles, permissions and workflow boundaries.",
      labels: [
        "Institution-managed identity",
        "Microsoft Entra ID SSO",
        "Customer MFA and Conditional Access compatibility",
        "SquareCampus-governed authorisation",
      ],
      note: "Enterprise includes Microsoft Entra ID SSO for one approved institutional tenant, available subject to technical onboarding. Automated provisioning, additional identity tenants and complex federation requirements are scoped separately.",
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
    "Institution-managed identity and Microsoft Entra ID SSO",
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
      { label: "White-label Android and iOS apps", tag: "One-time" },
    ],
  },
  {
    id: "identity",
    group: "Identity and federation",
    items: [
      { label: "SCIM 2.0 provisioning and deprovisioning" },
      { label: "Additional Microsoft Entra ID tenants" },
      { label: "SAML or non-Microsoft identity providers" },
      { label: "Identity migration" },
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
 * The standard SquareCampus parent and staff apps carry no additional licence
 * charge in any plan. Only a white-labelled build — the institution's own
 * branding and its own Play Store / App Store listings — is chargeable, and
 * that charge is one-time rather than recurring.
 */
export const MOBILE_APP_NOTE =
  "The SquareCampus parent and staff mobile apps are included in every plan at no additional licence charge. Only white-labelled Android and iOS builds published under the institution's own branding carry a one-time charge.";

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
    question: "Why are exact prices not published?",
    answer:
      "The annual licence is calculated from student volume, the selected plan, institutional complexity and the deployment profile. A published figure would be wrong for most institutions in both directions, so SquareCampus issues a written proposal after discovery instead.",
  },
  {
    question: "How is student count determined?",
    answer:
      "Billable enrolment is agreed in the order form using active enrolled records. Growth may be reconciled through an agreed true-up mechanism, while reductions are normally considered at renewal. The signed order form governs in every case.",
  },
  {
    question: "Does the marginal rate decrease at larger volumes?",
    answer:
      "Yes. Pricing uses progressive, volume-based student bands, so the marginal per-student rate reduces as enrolment grows. Larger institutions receive the benefit of platform economies of scale rather than paying the entry rate indefinitely.",
  },
  {
    question: "Can we keep our existing ERP during the pilot?",
    answer:
      "Yes. A design-partner pilot is deliberately scoped to one campus or one workflow bundle so the existing system keeps running alongside it. There is no compulsory rip-and-replace before the institution has evidence.",
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
    answer:
      "No. The SquareCampus parent and staff mobile apps are included in every plan at no additional licence charge. A white-labelled Android and iOS build — published under your institution's own branding and store listings — is a separately scoped one-time charge.",
  },
  {
    question: "Does Microsoft SSO use our institution's existing accounts?",
    answer:
      "Yes. Enterprise customers can authenticate staff through their own Microsoft Entra ID tenant. Their institution continues to control identity policies such as MFA and Conditional Access, while SquareCampus controls campus, role, record and workflow permissions.",
  },
  {
    question: "Does SquareCampus access our Outlook or Microsoft 365 data?",
    answer:
      "No. Standard Microsoft Entra ID SSO is used to authenticate identity. Access to email, files, Teams, SharePoint or other Microsoft Graph data is not required for basic sign-in.",
  },
  {
    question: "Does SSO automatically create and remove users?",
    answer:
      "SSO authenticates users. Automated user provisioning and deprovisioning require a separately configured lifecycle-integration capability such as SCIM, which is scoped as an Enterprise service rather than included by default.",
  },
  {
    question: "Can a trust use more than one Microsoft tenant?",
    answer:
      "Enterprise includes Microsoft Entra ID SSO for one approved institutional tenant. Multiple Entra tenants can be supported as an Enterprise federation requirement and are scoped during technical discovery.",
  },
  {
    question: "Is GST included?",
    answer:
      "Quoted commercial figures are exclusive of applicable taxes unless the proposal states otherwise. Applicable Indian taxes are shown on the order form and invoices.",
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
    question: "What happens if enrolment changes during the year?",
    answer:
      "Material growth is reconciled through the true-up mechanism agreed in the order form. Reductions are normally considered at renewal rather than mid-term, so the institution has a predictable annual commitment.",
  },
] as const;
