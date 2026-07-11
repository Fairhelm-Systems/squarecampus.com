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
      "Schools, colleges, universities, and multi-branch groups that need predictable, connected daily operations with enterprise-grade security. Whether you're a single-campus school or a network of 50+ institutions, SquareCampus scales to match your structure.",
    category: "getting-started",
  },
  {
    question: "How fast can we go live?",
    answer:
      "Typical launch is measured in days, not months. We provide migration support, role-based training, and a dedicated success partner to configure your policies and timelines. Most institutions are operational within 2-4 weeks, depending on data complexity.",
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
      "We support migration of student records, fee history, attendance data, academic records, staff information, and communication history. Our team works with you to map your existing data structure to SquareCampus, ensuring a clean transition with no data loss.",
    category: "getting-started",
  },

  // Features & modules
  {
    question: "What modules are included in SquareCampus?",
    answer:
      "SquareCampus includes 12 core modules: Admissions, Student Management, Academics, Fee & Finance, Attendance, Timetable & Scheduling, Communication, Transport, Hostel, Library, HR & Payroll, and Reports & Analytics. All modules share the same database and work together seamlessly.",
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
      "Updates ship continuously with zero-downtime releases, covering new capabilities, performance boosts, and security patches. We maintain a public changelog and notify admins of significant updates through in-app announcements.",
    category: "features",
  },

  // Security & data
  {
    question: "How secure is our data?",
    answer:
      "Data is encrypted in transit (TLS 1.3) and at rest (AES-256). Access is role-based with granular permissions, audit trails are enabled by default, and the platform runs on a resilient, monitored cloud infrastructure with automated backups. We follow OWASP security guidelines and conduct regular penetration testing.",
    category: "security",
  },
  {
    question: "Where is our data stored?",
    answer:
      "All data is stored in India-based data centers, ensuring compliance with data localization requirements. We use redundant storage with automatic failover and maintain encrypted backups with point-in-time recovery capability.",
    category: "security",
  },
  {
    question: "What compliance standards do you follow?",
    answer:
      "SquareCampus is designed with privacy-by-default principles. We support compliance with IT Act 2000, DPDP Act requirements, and education sector guidelines. Our platform includes consent management, data retention controls, and export capabilities for regulatory requests.",
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

  // Pricing & support
  {
    question: "How do you price?",
    answer:
      "Pricing is based on student count and campus structure. We offer transparent, predictable pricing with no hidden fees. You'll receive a clear quote after understanding your workflows during the demo, including all modules, support, and updates.",
    category: "pricing",
  },
  {
    question: "Are there any setup or hidden fees?",
    answer:
      "No hidden fees. The price we quote includes implementation support, data migration assistance, training, and ongoing updates. We believe in transparent pricing—what you see is what you pay.",
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
      "Automation reduces manual hours (typically 40-60% reduction in admin tasks), fee collections become more predictable with automated reminders and online payments, and leadership gets real-time insights without manual consolidation. Most institutions see positive ROI within the first academic year.",
    category: "pricing",
  },
  {
    question: "Is there a trial or pilot option?",
    answer:
      "We offer guided pilots for larger institutions where you can test the platform with a subset of users before full rollout. For smaller institutions, we provide a detailed demo environment where you can explore all features with sample data.",
    category: "pricing",
  },
];
