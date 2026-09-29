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
  note: "This is how SquareCampus is designed to work. Your written proposal confirms what your institution gets, and when.",
  short: "Your written proposal confirms which modules, apps, languages and integrations you get.",
  languages:
    "Designed to reach each family in its own language; your proposal confirms which languages.",
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
        "Payments run through your institution's own gateway account, and SquareCampus never handles the money. SMS and WhatsApp come with a monthly allowance; usage beyond it is prepaid.",
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
    "One annual institutional licence, calculated on progressive student-volume bands and shaped by the plan (Starter, Pro or Enterprise), the institution's complexity and its deployment profile.",
  volume:
    "Billable enrolment is the active enrolled students agreed in the order form. The per-student rate falls as enrolment moves up through the volume bands; growth is reconciled through an agreed true-up, and reductions are normally considered at renewal.",
  included:
    "The licence covers the plan's platform capability, the standard SquareCampus parent and staff mobile apps, self-serve reporting, implementation and support, and a monthly usage allowance. Pro and Enterprise also include data migration.",
  scopedSeparately:
    "Migration on Starter, custom integrations and engineering, fixed-format documents made for one institution, private-cloud or on-premises deployment, a custom SLA and usage beyond the allowance are quoted as their own lines, not folded into the licence.",
  positioning:
    "SquareCampus is priced for institutions that want governance, workflow ownership, exception management, visibility and auditability. To one that needs only the cheapest attendance, fees and report-card product it will look expensive — and that reading is correct.",
  taxes:
    "Quoted commercial figures are exclusive of applicable taxes unless the proposal states otherwise.",
} as const;

/**
 * What the licence absorbs, so the price does not grow after signature.
 *
 * Owner-confirmed 2026-09-30: migration is included in Pro and Enterprise on a
 * best-effort basis (quoted on Starter); Enterprise includes implementation and
 * support, with only a custom SLA quoted; every plan carries a monthly usage
 * allowance with prepaid top-ups; payments run on the institution's own gateway
 * account. Nothing here promises a complete migration.
 *
 * Owner-confirmed 2026-09-30, second pass: reporting is self-serve in every
 * plan (the data table in the product UI library: filters, grouping, totals,
 * charts, saved views, CSV/Excel/PDF export; saved views still need their
 * backend endpoint, so it is described as design). Enterprise identity
 * governance is part of the Enterprise licence, established in discovery.
 * Third pass: there is no premium or paid implementation tier on any plan;
 * the rollout is the same for everyone and designed to need little training.
 * (Campus visits are currently free, but that is deliberately not published.)
 */
export const commercialScope = {
  migration: "Data migration is included in Pro and Enterprise, and quoted on Starter.",
  migrationLimit:
    "We move everything your current system can export in usable form. If it lacks data SquareCampus needs, or is too fragmented to reconcile, we show you what cannot move before go-live instead of guessing.",
  migrationShort:
    "Everything your current system can export in usable form. Anything that cannot move is shown before go-live.",
  reporting:
    "Reporting is self-serve in every plan: staff filter, group, total and chart their tables, save views for the team and export to Excel, CSV or PDF. A fixed-format document made only for your institution, such as your own report-card layout, is quoted; a format many schools need becomes a standard report at no charge.",
  implementation:
    "Implementation and support are included in every plan, and every institution gets the same rollout: there is no paid fast track. SquareCampus is designed to need little or no training. Only a custom SLA, such as 24×7 cover or guaranteed response times, is quoted.",
  allowance:
    "Every plan includes a monthly allowance for SMS, WhatsApp and storage, and for AEGIS where the plan includes it. Usage beyond it is bought in advance at the rates in your proposal, so there is never a bill after the fact.",
  paymentGateway:
    "Fee payments run through your institution's own payment-gateway account. SquareCampus never handles the money; the gateway's fees are between you and the gateway.",
  noSurprises:
    "Everything optional is priced in the proposal before you sign, and usage beyond the allowance is prepaid, so the proposal you sign is the bill you get.",
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
