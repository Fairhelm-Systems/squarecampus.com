export const siteCtas = {
  demoHref: "/demo",
  platformHref: "/platform",
  aegisHref: "/aegis",
  rolloutHref: "/rollout",
  whyDifferentHref: "/why-squarecampus",
  ecosystemHref: "/ecosystem",
  securityHref: "/security",
  pricingHref: "/pricing",
  launchPartnersHref: "/launch-partners",
  loginHref: "https://app.squarecampus.com",
} as const;

export const primaryNavigation = [
  { href: "/", label: "Home" },
  { href: siteCtas.platformHref, label: "Platform" },
  { href: siteCtas.aegisHref, label: "AEGIS" },
  { href: siteCtas.rolloutHref, label: "Rollout" },
  { href: siteCtas.whyDifferentHref, label: "Why us?" },
  { href: siteCtas.ecosystemHref, label: "Ecosystem" },
  { href: siteCtas.securityHref, label: "Security" },
  { href: siteCtas.pricingHref, label: "Pricing" },
] as const;

/**
 * Five balanced columns rather than one long "Platform" list and three short
 * ones. Grouped by what the reader is trying to do — understand the product,
 * evaluate commercially, learn about the company, verify trust, read terms.
 * Home is omitted: the footer brand mark already links there.
 *
 * Careers and Press stay out until they have real content; both are noindex
 * and reachable by direct link only.
 */
export const footerGroups = [
  {
    title: "Product",
    links: [
      { href: "/what-is-squarecampus", label: "What is SquareCampus?" },
      { href: siteCtas.platformHref, label: "Platform" },
      { href: siteCtas.aegisHref, label: "AEGIS Intelligence" },
      { href: siteCtas.ecosystemHref, label: "Ecosystem" },
      { href: siteCtas.rolloutHref, label: "Rollout" },
      { href: "/services", label: "Data & Integration Services" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { href: "/school-erp-software", label: "School ERP Software" },
      { href: "/fee-management-software-for-schools", label: "Fee Management" },
      { href: "/school-attendance-management-system", label: "Attendance" },
      { href: "/school-admission-management-software", label: "Admissions" },
      { href: "/school-exam-management-software", label: "Exams & Results" },
      { href: "/parent-communication-app-for-schools", label: "Parent Communication" },
    ],
  },
  {
    title: "Institutions",
    links: [
      { href: "/school-management-system", label: "School Management System" },
      { href: "/multi-campus-school-management-software", label: "Multi-Campus Groups" },
      { href: "/school-management-software-for-cbse-schools", label: "CBSE Schools" },
      { href: "/school-management-software-for-icse-schools", label: "ICSE Schools" },
      { href: "/school-management-software-for-state-board-schools", label: "State Board Schools" },
      { href: "/launch-partners/higher-education", label: "Higher Education" },
      { href: siteCtas.launchPartnersHref, label: "Founding Partners" },
    ],
  },
  {
    title: "Evaluate",
    links: [
      { href: siteCtas.pricingHref, label: "Pricing" },
      { href: siteCtas.whyDifferentHref, label: "Why SquareCampus" },
      { href: "/compare", label: "Compare School ERPs" },
      { href: "/faq", label: "FAQ" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    title: "Company & Trust",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: siteCtas.securityHref, label: "Security" },
      { href: "/infrastructure", label: "Infrastructure" },
      { href: "/pgp", label: "PGP Key" },
      /*
        The site's machine-readable summary. It sat at /llms.txt with nothing
        on the site linking to it, so the only crawlers that could find it were
        the ones already guessing the conventional path. One real internal
        link, on every page, is what makes it discoverable to the rest —
        including the search crawlers that do not know the convention.

        Rendered as a plain anchor rather than a <Link>: it is a file, not a
        route, and the client router has nothing to navigate to. The footer
        decides that from the extension, the same test the edge function uses.
      */
      { href: "/llms.txt", label: "llms.txt" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms-of-service", label: "Terms of Service" },
      { href: "/acceptable-use", label: "Acceptable Use" },
      { href: "/refund-policy", label: "Cancellation & Refunds" },
      { href: "/data-processing-addendum", label: "Data Processing Addendum" },
      { href: "/data-retention", label: "Data Retention" },
    ],
  },
] as const;

export const footerContact = {
  sales: "contact@squarecampus.com",
  support: "support@squarecampus.com",
  location: "Bangalore, India",
} as const;

export const footerSignals = [
  { label: "School OS", value: "One governed system" },
  { label: "India-first", value: "Local reality" },
  { label: "Rollout", value: "Guided go-live" },
] as const;

export const socialLinks = [
  {
    href: "https://www.linkedin.com/company/square-campus",
    label: "LinkedIn",
    icon: "linkedin",
  },
  {
    href: "https://x.com/squarecampushq",
    label: "X",
    icon: "x",
  },
  {
    href: "https://instagram.com/squarecampus",
    label: "Instagram",
    icon: "instagram",
  },
  {
    href: "https://github.com/Fairhelm-Systems",
    label: "GitHub",
    icon: "github",
  },
] as const;
