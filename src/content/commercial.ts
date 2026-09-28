/**
 * Canonical commercial, identity and programme facts.
 *
 * One module that every commercial surface derives from — the pricing UI,
 * FAQs, structured data, /llms.txt and the regression tests in tests/ — so a
 * commercial statement is written once and cannot drift between pages.
 *
 * RULES OF THIS FILE
 * - Facts only. No rupee amounts, rates, "starting from" figures or
 *   discounts other than the Founding Partner term stated below; the rate
 *   card lives in the proposal and the order form (see content/pricing.ts).
 * - No capability is described as available unless the platform implements
 *   it or it is explicitly approved for launch. Identity wording is checked
 *   against the platform's authentication implementation before it changes;
 *   see docs/marketing-claims-register.md.
 * - Programme facts (positions, discount) are deliberate commercial policy.
 *   Change them only against a product decision, and update the tests.
 */

import { company } from "./company";

const SITE = "https://squarecampus.com";

/** Stable public product facts, for machine-readable contexts and listings. */
export const product = {
  name: "SquareCampus",
  category: "School Operating System",
  /**
   * The one canonical short description. Every machine-readable context —
   * SoftwareApplication JSON-LD, the llms.txt summary, listing copy — uses
   * this sentence verbatim; natural page copy may paraphrase it.
   */
  shortDescription:
    "SquareCampus is a School Operating System for schools, educational trusts, multi-campus school groups and higher-education institutions in India, focused on connected operations, institutional governance, accountability and operational visibility.",
  audiences: [
    "Standalone schools with governance, identity or audit requirements",
    "Educational trusts and multi-campus school groups",
    "Church-run and society-run school chains",
    "Private universities and multi-school higher-education groups, as a governed operating layer over the systems they already run",
  ],
  geography:
    "India-first. The platform is hosted on Microsoft Azure in India. Enterprise private deployments are available on AWS, in a private cloud or on premises, subject to scoping.",
  /**
   * How "School OS" relates to the categories buyers search for. SquareCampus
   * is school management software; "School OS" describes how it is built, not
   * a claim that it belongs to a different category. Every page that explains
   * the relationship (About, Home, Platform, the category pages, the ERP FAQ)
   * uses these sentences, so the answer cannot differ between pages.
   */
  categoryDescriptor: "School management software for Indian schools and trusts",
  categoryRelationship:
    "SquareCampus is school management software built as a connected School OS. It covers the record-keeping and workflows schools expect from school management and ERP software, and connects them with owners, approvals and audit history on one institutional record.",
  distinction:
    "A system of record stores what happened. SquareCampus also carries the workflows, ownership, exceptions, approvals and audit history that turn records into accountable operations, and shows leadership what requires attention, who owns it and what happens next.",
  competesOn: [
    "Operational governance",
    "Workflow ownership",
    "Exception management",
    "Institutional visibility",
    "Accountability",
    "Auditability",
    "Multi-campus command",
    "Interoperability",
    "Institutional control",
    "Long-term operational quality",
  ],
  evidenceNote:
    "SquareCampus publishes no customer counts, rankings, uptime figures, measured outcomes, testimonials or named institutional customers. Statements on the site describe what the product is designed to do, not results that have been measured in production.",
  operator: {
    legalName: company.legalNameDisplay,
    cin: company.cin,
    locality: "Bangalore, Karnataka, India",
  },
  urls: {
    site: `${SITE}/`,
    app: "https://app.squarecampus.com",
    pricing: `${SITE}/pricing/`,
    contact: `${SITE}/contact/`,
    demo: `${SITE}/demo/`,
    security: `${SITE}/security/`,
    privacy: `${SITE}/privacy-policy/`,
    terms: `${SITE}/terms-of-service/`,
    dpa: `${SITE}/data-processing-addendum/`,
    logo: `${SITE}/brand/squarecampus.png`,
    llms: `${SITE}/llms.txt`,
  },
} as const;

/**
 * Availability, stated once.
 *
 * The site describes how SquareCampus is designed to work. Which modules,
 * apps, languages and integrations an institution receives, and when, is a
 * matter for the proposal — never for a page. Every surface that lists
 * capabilities carries this note (see components/site/availability-note.tsx)
 * rather than implying that everything described is switched on for everyone.
 * Deployment state is deliberately not described here or anywhere public.
 */
export const availability = {
  note: "Capabilities on this site describe how SquareCampus is designed to work. The modules, apps, languages and integrations included in your rollout, and when each becomes available to your institution, are confirmed in writing in your proposal.",
  short:
    "Modules, apps, languages and integrations for your rollout are confirmed in writing in your proposal.",
  languages:
    "Parent-facing screens and messages are designed to reach each family in its preferred language. The languages available to your institution are confirmed in your proposal.",
} as const;

/** Status vocabulary for deployment options and integrations. */
export type OfferStatus = "Default" | "Scoped service" | "Not offered today";

/**
 * Deployment options, with an explicit status each. Every page that mentions
 * where SquareCampus runs derives from this list, so an option cannot be
 * "available" on one page and "coming soon" on another.
 */
export const deploymentOptions = [
  {
    id: "managed",
    title: "Managed cloud",
    status: "Default" as OfferStatus,
    body: "SquareCampus on our Microsoft Azure infrastructure in India, operated and maintained by us. Every plan starts here.",
  },
  {
    id: "private",
    title: "Enterprise private deployment",
    status: "Scoped service" as OfferStatus,
    body: "A dedicated SquareCampus environment on AWS, in a private cloud or on premises, for institutions with strict segregation requirements. Enterprise only; scope, responsibilities and charges are agreed in writing.",
  },
  {
    id: "byoc",
    title: "Your own cloud account (BYOC)",
    status: "Not offered today" as OfferStatus,
    body: "Running SquareCampus inside the institution's own cloud account is not offered today. If your governance requires it, raise it during scoping.",
  },
] as const;

/** One sentence for surfaces that name deployment without the full list. */
export const deploymentSummary =
  "Managed cloud on Microsoft Azure in India by default; Enterprise private deployment on AWS, in a private cloud or on premises as a scoped service.";

/**
 * Integration scope. SquareCampus publishes no catalogue of pre-built
 * connectors, so no page may imply that a named tool connects automatically.
 */
export const integrationScope = {
  summary:
    "SquareCampus does not publish a catalogue of pre-built connectors. Connecting another system is scoped work: we assess each tool during discovery, and what connects, in which direction, how often and at what cost is confirmed in writing before any build.",
  prerequisites: [
    "The other system must offer a documented API or a data export the institution is licensed to use.",
    "Vendor access, vendor-side charges and the vendor's own limits remain the institution's.",
    "Sync direction, frequency, error handling and ownership of each record are agreed per integration.",
  ],
  groups: [
    {
      label: "Sign-in",
      status: "By plan",
      detail:
        "SquareCampus-managed credentials in every plan; Microsoft Entra ID single sign-on from Pro, subject to technical onboarding.",
    },
    {
      label: "Payment gateway, SMS and WhatsApp",
      status: "Scoped service",
      detail:
        "The provider is confirmed during scoping; metered usage is passed through rather than folded into the licence.",
    },
    {
      label: "Accounting software, biometric devices, LMS and government portals",
      status: "Scoped service",
      detail:
        "Assessed tool by tool. There is no pre-built connector; each one is scoped, quoted and confirmed in writing.",
    },
    {
      label: "Development APIs for the institution's own apps",
      status: "Scoped service",
      detail:
        "Scoped per institution and granted after a compliance review, inside the same role-based permissions and audit trail.",
    },
  ],
} as const;

/** The three plans as a hierarchy of institutional depth, not feature bundles. */
export const planHierarchy = [
  {
    id: "starter",
    name: "Starter",
    summary: "Connected core school operations on one institutional backbone.",
    suitedFor:
      "Schools replacing fragmented spreadsheets and disconnected tools, and institutions that need reliable core workflows before anything else.",
  },
  {
    id: "pro",
    name: "Pro",
    summary:
      "Stronger operational visibility, accountability, workflows and institutional capability, with optional institutional single sign-on.",
    suitedFor:
      "Growing schools taking on more operational complexity, and institutions introducing management dashboards, workflow governance and cross-functional accountability.",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    summary:
      "Institutional governance, cross-campus command, advanced controls, deeper integration, identity governance and advanced auditability for larger or more complex institutions.",
    suitedFor:
      "Educational trusts, multi-campus groups and standalone institutions whose governance, identity or audit requirements sit above Pro. Enterprise is selected by governance requirement, not by enrolment.",
  },
] as const;

/**
 * Pricing availability, stated once.
 *
 * The model is public; the figures are not, because the licence depends on
 * enrolment, plan depth, institutional complexity and deployment profile.
 * Every page that touches pricing says exactly this, in these terms.
 */
export const pricingAvailability = {
  short:
    "The licensing model is published on the pricing page; figures are issued in a written proposal after institutional discovery.",
  model:
    "One annual institutional licence, calculated through progressive student-volume bands and shaped by the plan selected (Starter, Pro or Enterprise), the institution's complexity and its deployment profile.",
  volume:
    "Billable enrolment is agreed in the order form using active enrolled students. The marginal per-student rate reduces as enrolment grows through successive volume bands; growth is reconciled through an agreed true-up mechanism, and reductions are normally considered at renewal.",
  included:
    "The licence covers the platform capability represented by the plan, the standard SquareCampus parent and staff mobile apps, and the standard onboarding and support that belong to that plan.",
  scopedSeparately:
    "Complex legacy migration and data cleaning, bespoke integrations, custom engineering, premium implementation, private-cloud or on-premises deployment, exceptional SLA or support requirements and metered third-party usage are scoped and quoted as their own lines rather than folded into the licence.",
  positioning:
    "SquareCampus is priced for institutions that want operational governance, workflow ownership, exception management, institutional visibility, accountability and auditability. To an institution that needs only the cheapest attendance, fees and report-card product it will look expensive, and that is a correct reading rather than a misunderstanding.",
  taxes:
    "Quoted commercial figures are exclusive of applicable taxes unless the proposal states otherwise.",
} as const;

/**
 * Identity and access, by plan.
 *
 * Implementation status at the time of writing (see the claims register):
 * the platform validates Microsoft Entra ID sign-in; Google Workspace, SAML,
 * SCIM and multi-directory federation are not implemented, so none of them
 * is described here as available. Enterprise identity governance is worded
 * as requirements that are scoped, not as shipped features.
 */
export const identity = {
  principle:
    "The identity provider establishes who a person is. SquareCampus decides what that person may do: institution membership, campus scope, roles, workflow privileges, record access and operational permissions are governed inside SquareCampus and are never derived from an email address or domain alone.",
  baseline: {
    name: "SquareCampus-managed sign-in",
    body: "Every plan includes SquareCampus-managed credentials with role-based access. Privileged roles are designed to carry additional sign-in verification, applied according to the institution's policy.",
  },
  pro: {
    name: "Institutional single sign-on",
    body: "Pro adds optional single sign-on with Microsoft Entra ID for the institution's own tenant, subject to technical onboarding. Staff sign in with their existing institutional accounts under the institution's own MFA, Conditional Access and user-assignment policies, and SquareCampus continues to govern authorisation.",
  },
  enterprise: {
    name: "Identity governance",
    body: "Enterprise is differentiated by identity governance rather than by having SSO. Identity requirements across several campuses or directories, directory-group to role mappings, SSO enforcement policy, joiner-mover-leaver lifecycle controls, identity migration and identity audit controls are scoped as Enterprise requirements during technical discovery.",
  },
  /** The institution chooses the mode; SSO is never mandatory because it exists. */
  modes: [
    "SquareCampus-managed credentials only",
    "SquareCampus credentials alongside institutional single sign-on",
    "Institution-enforced single sign-on, where the institution's policy requires it and the configuration supports it",
  ],
  notes: [
    "Single sign-on is optional. An institution is not required to adopt it, and is not required to move between Google Workspace and Microsoft to use SquareCampus.",
    "Standard sign-in authenticates identity only. It does not require access to email, files, Teams, SharePoint or other Microsoft 365 data.",
    "Single sign-on authenticates users; it does not create or remove them. Automated provisioning and deprovisioning are a lifecycle requirement scoped under Enterprise.",
    "Where institution-enforced single sign-on is configured, SquareCampus credentials are designed not to act as an ordinary alternative route around the institution's identity policy.",
  ],
  byPlan: [
    {
      capability: "SquareCampus-managed credentials with role-based access",
      starter: "Included",
      pro: "Included",
      enterprise: "Included",
    },
    {
      capability: "Microsoft Entra ID single sign-on for the institution's own tenant",
      starter: "Not included",
      pro: "Optional, subject to technical onboarding",
      enterprise: "Optional, subject to technical onboarding",
    },
    {
      capability: "Sign-in mode chosen by the institution (credentials, both, or enforced SSO)",
      starter: "Credentials",
      pro: "Institution's choice",
      enterprise: "Institution's choice, with enforcement policy scoped",
    },
    {
      capability: "Multi-campus and multi-directory identity governance",
      starter: "Not included",
      pro: "Not included",
      enterprise: "Scoped as an Enterprise requirement",
    },
    {
      capability: "Directory-group to role mappings, lifecycle controls, identity audit",
      starter: "Not included",
      pro: "Not included",
      enterprise: "Scoped as an Enterprise requirement",
    },
    {
      capability: "Authorisation: membership, campus scope, roles, records, workflows",
      starter: "Governed in SquareCampus",
      pro: "Governed in SquareCampus",
      enterprise: "Governed in SquareCampus",
    },
  ],
} as const;

/**
 * Founding Institutional Partner programme facts.
 *
 * Two positions, ever. Nothing here may use securities, equity, debt,
 * ownership or board language, state a duration for the price protection, or
 * call the discount "lifetime": those belong in the executed agreement, not
 * on a public page. See docs/marketing-claims-register.md.
 */
export const foundingProgramme = {
  name: "Founding Institutional Partner programme",
  href: "/launch-partners",
  positions: 2,
  positionLabels: ["One school or eligible school institution", "One university"],
  positionsStatement:
    "There are exactly two Founding Institutional Partner positions, ever: one school or eligible school institution, and one university. Once both positions are allocated, the programme closes permanently.",
  nature:
    "A Founding Institutional Partner is not an ordinary customer. The position involves a strategic capital commitment under a separately executed agreement, material participation in product validation, and structured roadmap input.",
  enterpriseDiscountPercent: 40,
  entitlements: [
    {
      title: "Defined roadmap influence",
      body: "Structured, written consideration of the partner's operating requirements in roadmap planning, as defined in the executed agreement.",
    },
    {
      title: "Protected 40% Enterprise discount",
      body: "A protected 40% discount on Enterprise commercial terms, as set out in the executed agreement.",
    },
    {
      title: "White-labelled mobile apps",
      body: "The SquareCampus parent and staff apps published under the institution's own branding and store listings, without the standard white-label charge.",
    },
    {
      title: "Other agreed founding privileges",
      body: "Any further privileges are those explicitly agreed in the executed agreement, and no others.",
    },
  ],
  boundaries: [
    "Roadmap influence is not a veto, ownership of the roadmap, product or architectural control, ownership of intellectual property, or an entitlement to unlimited custom development.",
    "SquareCampus retains final product, architecture, security and engineering authority unless a signed agreement explicitly states otherwise.",
    "Founding status does not create exclusivity or territory rights.",
    "Entitlements are governed by the executed agreement. This page describes the programme; it is not an offer.",
  ],
  closure:
    "Once both positions are allocated, the Founding Institutional Partner programme closes permanently.",
} as const;

/** Buyer qualification. The purpose is fit, not self-deprecation. */
export const fit = {
  bestFor: [
    "Institutions where leadership wants to know what requires attention today, who owns it and whether it was closed",
    "Trusts and groups balancing central policy with campus-level accountability",
    "Institutions that need auditability, approval chains and role-scoped access as institutional configuration rather than as favours from a vendor",
    "Institutions that expect their systems to interoperate rather than to be replaced wholesale",
  ],
  notRightFitIf: [
    "The requirement is limited to basic attendance, fee collection and report cards",
    "The lowest possible licence price is the dominant selection criterion",
    "The institution does not need workflow ownership, exception management, governance or cross-campus visibility",
    "Leadership wants a tool for one office rather than an operating system for the institution",
  ],
} as const;

/** What Enterprise adds beyond ordinary ERP modules, dimension by dimension. */
export const enterpriseBeyondModules = [
  {
    dimension: "Institutional structure",
    modules: "Several schools run as separate instances or branches",
    enterprise:
      "Trust, school and campus modelled as one hierarchy: policy set once, executed locally, deviations recorded as exceptions",
  },
  {
    dimension: "Command",
    modules: "Consolidated reports prepared from each branch",
    enterprise: "Cross-campus command views built on the same records the campuses run on",
  },
  {
    dimension: "Governance",
    modules: "Approval steps inside individual modules",
    enterprise:
      "Approval and governance chains with configurable exception ownership across workflows and campuses",
  },
  {
    dimension: "Identity",
    modules: "User accounts per instance",
    enterprise:
      "Identity governance: multi-directory requirements, group-to-role mappings, SSO enforcement policy and lifecycle controls, scoped during discovery",
  },
  {
    dimension: "Auditability",
    modules: "Change logs per module",
    enterprise: "Advanced policy and audit controls, advanced audit exports and data portability",
  },
  {
    dimension: "Intelligence",
    modules: "Reports and dashboards",
    enterprise:
      "Governed AEGIS access within an agreed allowance: permission-scoped, source-grounded, audited",
  },
  {
    dimension: "Deployment and integration",
    modules: "Vendor cloud, standard connectors",
    enterprise:
      "Managed cloud, private-cloud or on-premises eligibility, enterprise integrations and implementation governance",
  },
] as const;

/**
 * Multi-campus governance versus merely supporting several campuses. Used on
 * the multi-campus page and in the definition glossary.
 */
export const multiCampusContrast = [
  {
    dimension: "Structure",
    supports: "Each campus is a separate instance or a branch code on the same records",
    governs: "Trust, school and campus are one hierarchy in the institutional model",
  },
  {
    dimension: "Policy",
    supports: "Head office circulates a policy; each campus configures its own version",
    governs:
      "Policy is set once at the trust level and inherited; local variation is recorded as an exception with a reason",
  },
  {
    dimension: "Access",
    supports: "Campus users are separated by login",
    governs:
      "Scope is a property of the role: a principal sees one campus, a trust officer sees across campuses, on every screen, report and AEGIS answer",
  },
  {
    dimension: "Exceptions",
    supports: "Each campus escalates by phone or email",
    governs:
      "Collections behind plan, attendance drift and stalled approvals surface as owned exceptions, whichever campus they belong to",
  },
  {
    dimension: "Reporting",
    supports: "Campus reports are consolidated before the board meeting",
    governs:
      "Board views come from the records the campuses run on, with nothing to reconcile first",
  },
] as const;
