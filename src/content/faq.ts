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
      "Schools, colleges, universities, and multi-branch groups that need predictable, connected daily operations. Whether you're a single-campus school or a multi-campus group, SquareCampus is structured to match how your institution is organised.",
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
      "Book a tailored demo. We'll map your workflows, share a rollout plan, and align on timelines and pricing. After the demo, you'll receive a detailed proposal with migration scope, training schedule, and go-live milestones.",
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
    answer:
      "Yes. We provide APIs and connectors for LMS, ERP, HR, and payment partners so data flows cleanly without manual exports. Our REST APIs support webhooks for real-time sync, and we have pre-built integrations for popular payment gateways and government portals.",
    category: "features",
  },
  {
    question: "Do you have mobile apps?",
    answer:
      "Yes. Parents and students use dedicated mobile apps (iOS and Android) for fee payments, attendance tracking, progress reports, and announcements. Staff have a fully responsive web experience optimized for day-to-day operations on any device.",
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
      "Data is encrypted in transit and at rest. Access is role-based with granular permissions, audit trails are part of the product design, and the platform runs on monitored cloud infrastructure with automated backups. Detailed security documentation is available through the security review process.",
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
    answer:
      "SquareCampus is designed with privacy-by-default principles and built to support institutions' obligations under the IT Act 2000, the DPDP Act, and education sector guidelines. The platform includes consent management, data retention controls, and export capabilities for regulatory requests.",
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
    answer:
      "You own your data. If you decide to leave, we provide a complete export in standard formats (CSV, JSON) within 30 days of request. After the transition period, we securely delete all your data from our systems as per our data retention policy.",
    category: "security",
  },
  {
    question: "Does Microsoft SSO use our institution's existing accounts?",
    answer:
      "Yes. Enterprise customers can authenticate staff through their own Microsoft Entra ID tenant. Their institution continues to control identity policies such as MFA and Conditional Access, while SquareCampus controls campus, role, record and workflow permissions. Enterprise covers one approved institutional tenant, available subject to technical onboarding.",
    category: "security",
  },
  {
    question: "Does SquareCampus access our Outlook or Microsoft 365 data?",
    answer:
      "No. Standard Microsoft Entra ID SSO is used to authenticate identity. Access to email, files, Teams, SharePoint or other Microsoft Graph data is not required for basic sign-in.",
    category: "security",
  },
  {
    question: "Does SSO automatically create and remove users?",
    answer:
      "SSO authenticates users. Automated user provisioning and deprovisioning require a separately configured lifecycle-integration capability such as SCIM, which is scoped as an Enterprise service rather than included by default.",
    category: "security",
  },
  {
    question: "Can a trust use more than one Microsoft tenant?",
    answer:
      "Multiple Microsoft Entra ID tenants can be supported as an Enterprise federation requirement and are scoped during technical discovery.",
    category: "security",
  },

  // Pricing & support
  {
    question: "How do you price?",
    answer:
      "SquareCampus is licensed annually as one institutional platform. The licence is calculated through progressive, volume-based student bands, and the plan you select — Starter, Pro or Enterprise — reflects the operational and governance depth you need. Exact commercial terms are issued after a short institutional discovery.",
    category: "pricing",
  },
  {
    question: "Are there any setup or hidden fees?",
    answer:
      "There is no hidden module wall inside the licence. Some dimensions are scoped separately and quoted as their own lines — legacy data migration, custom integrations, private-cloud or on-premises deployment, premium implementation and support, and metered third-party usage such as SMS, WhatsApp and payment-gateway charges. Every line appears in the proposal before you sign.",
    category: "pricing",
  },
  {
    question: "Is the mobile app charged separately?",
    answer:
      "No. The SquareCampus parent and staff mobile apps are included in every plan at no additional licence charge. A white-labelled Android and iOS build — published under your institution's own branding and store listings — is a separately scoped one-time charge.",
    category: "pricing",
  },
  {
    question: "What about support after launch?",
    answer:
      "You get a named success partner, live chat/email support during business hours, and proactive health checks. We help with new session rollovers, audits, policy tweaks, and any questions that arise. Premium support tiers with extended hours are available.",
    category: "pricing",
  },
  {
    question: "How does SquareCampus prove ROI?",
    answer:
      "Automation reduces manual admin hours, fee collections become more predictable with automated reminders and online payments, and leadership gets live insight without manual consolidation. During evaluation we map these outcomes to your current workflows so the value case is specific to your institution.",
    category: "pricing",
  },
  {
    question: "Is there a trial or pilot option?",
    answer:
      "We offer guided pilots for larger institutions where you can test the platform with a subset of users before full rollout. For smaller institutions, we provide a detailed demo environment where you can explore all features with sample data.",
    category: "pricing",
  },
];
