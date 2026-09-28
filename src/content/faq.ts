import {
  availability,
  foundingProgramme,
  identity,
  integrationScope,
  pricingAvailability,
} from "./commercial";
import { retentionReuse } from "./retention";

export type FaqCategoryId = "getting-started" | "features" | "security" | "pricing";

export type FaqItem = {
  question: string;
  answer: string;
  category: FaqCategoryId;
};

export const faqCategories: Array<{ id: FaqCategoryId | "all"; name: string }> = [
  { id: "all", name: "All questions" },
  { id: "getting-started", name: "Getting started" },
  { id: "features", name: "Features & modules" },
  { id: "security", name: "Security & data" },
  { id: "pricing", name: "Pricing & support" },
];

export const faqs: FaqItem[] = [
  // Getting started
  {
    question: "What does SquareCampus actually replace?",
    answer:
      "SquareCampus consolidates admissions, academics, finance, communication, transport, hostel, library, and compliance into one OS, replacing the patchwork of ERPs, SMS tools, and spreadsheets. Instead of juggling multiple disconnected systems, you get a single source of truth for all campus operations.",
    category: "getting-started",
  },
  {
    question: "Who is SquareCampus for?",
    answer:
      "Schools, educational trusts, multi-campus school groups and, as a governed operating layer over the systems they already run, higher-education institutions in India. It suits institutions that want operational governance, accountable ownership and leadership visibility, whether they run one campus or many. It is not designed for an institution that needs only basic attendance, fees and report cards at the lowest possible licence price.",
    category: "getting-started",
  },
  {
    question: "How fast can we go live?",
    answer:
      "We provide migration support, role-based training, and a dedicated success partner to configure your policies and timelines. Rollout is sequenced around your academic calendar, and the timeline is agreed during scoping based on your data complexity.",
    category: "getting-started",
  },
  {
    question: "How do we get started?",
    answer:
      "Book a guided demo. We map your workflows, share a rollout plan, and align on timelines and commercial terms. After discovery you receive a written proposal with the licence, the separately scoped lines such as migration and integrations, the training schedule and go-live milestones.",
    category: "getting-started",
  },
  {
    question: "What data can be migrated from our existing systems?",
    answer:
      "We support migration of student records, fee history, attendance data, academic records, staff information, and communication history. Our team works with you to map your existing data structure to SquareCampus and validates the migration with a parallel run before go-live.",
    category: "getting-started",
  },

  // Features & modules
  {
    question: "What modules are included in SquareCampus?",
    answer:
      "SquareCampus covers admissions, student management, academics, fee & finance, attendance, timetable & scheduling, communication, transport, hostel, library, HR & payroll, and reports & analytics. Every module works on the same unified institutional data model, so records stay consistent across workflows.",
    category: "features",
  },
  {
    question: "Will it integrate with our existing systems?",
    answer: `Where they offer a documented API, usually yes — as scoped work. ${integrationScope.summary}`,
    category: "features",
  },
  {
    question: "Can we build our own frontend or mobile apps on SquareCampus?",
    answer:
      "Yes, as scoped work. Institutions that want their own portal, frontend or mobile apps can scope access to SquareCampus development APIs. Access is scoped to the same role-based permissions and audit trail as the platform and is granted after a compliance review, so what you build inherits the institution's governance rather than bypassing it.",
    category: "features",
  },
  {
    question: "Do you have mobile apps?",
    answer: `The standard SquareCampus parent and staff mobile apps are included in the licence. They are designed for fee payments, attendance, progress reports and announcements, and staff also get a responsive web experience for day-to-day operations. ${availability.languages} ${availability.short}`,
    category: "features",
  },
  {
    question: "Can we customize workflows and forms?",
    answer:
      "Absolutely. SquareCampus supports configurable approval workflows, custom form fields, and flexible fee structures. You can define your own admission stages, leave policies, exam patterns, and report formats without writing code.",
    category: "features",
  },
  {
    question: "How does the multi-campus feature work?",
    answer:
      "Multi-campus support includes centralized policy management with branch-level overrides, consolidated reporting across all locations, unified student database with campus-specific views, and role-based access that respects organizational hierarchy. Head office sees everything; branch admins see their campus.",
    category: "features",
  },
  {
    question: "How often is the product updated?",
    answer:
      "Updates ship continuously, covering new capabilities, performance improvements, and security patches. Releases are planned to avoid disrupting school hours, and admins are notified of significant updates through in-app announcements.",
    category: "features",
  },

  // Security & data
  {
    question: "How secure is our data?",
    answer:
      "Data is encrypted in transit and at rest. Access is role-based with granular permissions, audit trails are part of the product design, and availability and backup design are documented in writing during security review. Detailed security documentation is available through the security review process.",
    category: "security",
  },
  {
    question: "Where is our data stored?",
    answer:
      "The platform is designed with an India-first hosting posture, keeping institutional data in an Indian cloud region. Hosting details and backup design are documented and shared during security review.",
    category: "security",
  },
  {
    question: "What compliance standards do you follow?",
    answer: retentionReuse.faqCompliance,
    category: "security",
  },
  {
    question: "Can we control who sees what data?",
    answer:
      "Yes. Our 5-tier RBAC (Role-Based Access Control) system provides granular permissions at Organization, School, Campus, Department, and Staff levels. You define exactly what each role can view, create, edit, or delete across every module.",
    category: "security",
  },
  {
    question: "What happens to our data if we leave?",
    answer: retentionReuse.faqExit,
    category: "security",
  },
  {
    question: "Can an institution use normal SquareCampus credentials?",
    answer: `Yes. ${identity.baseline.body} Single sign-on is an option, not a requirement.`,
    category: "security",
  },
  {
    question: "Does Pro support institutional single sign-on?",
    answer: `Yes. ${identity.pro.body} The institution chooses the sign-in mode: ${identity.modes.join("; ")}.`,
    category: "security",
  },
  {
    question: "Does SquareCampus access our Outlook or Microsoft 365 data?",
    answer:
      "No. Standard Microsoft Entra ID sign-in is used to authenticate identity. Access to email, files, Teams, SharePoint or other Microsoft Graph data is not required for sign-in.",
    category: "security",
  },
  {
    question: "Does single sign-on automatically create and remove users?",
    answer:
      "No. Single sign-on authenticates users. Automated provisioning, deprovisioning and joiner-mover-leaver lifecycle controls are identity governance requirements scoped under Enterprise rather than part of SSO.",
    category: "security",
  },
  {
    question: "What identity governance does Enterprise add?",
    answer: `${identity.enterprise.body} ${identity.principle}`,
    category: "security",
  },

  // Pricing & support
  {
    question: "Is pricing public?",
    answer: `${pricingAvailability.short} ${pricingAvailability.model}`,
    category: "pricing",
  },
  {
    question: "What is included, and what is scoped separately?",
    answer: `${pricingAvailability.included} ${pricingAvailability.scopedSeparately} There is no hidden module wall inside the licence, and every separately scoped line appears in the proposal before you sign.`,
    category: "pricing",
  },
  {
    question: "What happens as enrolment grows?",
    answer: pricingAvailability.volume,
    category: "pricing",
  },
  {
    question: "Is SquareCampus appropriate if we only need attendance and fees?",
    answer: `Usually not. ${pricingAvailability.positioning}`,
    category: "pricing",
  },
  {
    question: "How many Founding Institutional Partner positions exist?",
    answer: `${foundingProgramme.positionsStatement} ${foundingProgramme.nature} Under the executed agreement a Founding Partner receives defined roadmap influence, a protected ${foundingProgramme.enterpriseDiscountPercent}% discount on Enterprise commercial terms, white-labelled mobile apps without the standard white-label charge, and any other privileges explicitly agreed.`,
    category: "pricing",
  },
  {
    question: "Is the mobile app charged separately?",
    answer:
      "No. The SquareCampus parent and staff mobile apps are included in every plan at no additional charge. A white-labelled Android and iOS build, published under your institution's own branding and store listings, carries a single charge that covers the entire agreed term, whether that is one year or many. Founding Institutional Partners receive the white-labelled build without the standard white-label charge.",
    category: "pricing",
  },
  {
    question: "What about support after launch?",
    answer:
      "You get a named success partner, live chat/email support during business hours, and proactive health checks. We help with new session rollovers, audits, policy tweaks, and any questions that arise. Premium support tiers with extended hours are available.",
    category: "pricing",
  },
  {
    question: "How is value measured?",
    answer:
      "SquareCampus publishes no measured outcomes. A pilot is designed to measure one agreed metric against a written baseline: for example, days between an attendance threshold breach and a recorded follow-up, or the time from collection close to a reconciled position. The value case is specific to the institution and is judged on that evidence, not on a vendor's percentage.",
    category: "pricing",
  },
  {
    question: "Is there a trial or pilot option?",
    answer:
      "A pilot is a paid, scoped 60–90 day engagement on one campus or one workflow bundle, judged against a written baseline, that ends in convert, extend or stop. There is no free trial. A guided demo environment with synthetic data is available for evaluation.",
    category: "pricing",
  },
];
