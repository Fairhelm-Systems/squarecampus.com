export const siteCtas = {
  demoHref: "/demo",
  platformHref: "/platform",
  aegisHref: "/aegis",
  rolloutHref: "/rollout",
  whyDifferentHref: "/why-squarecampus",
  ecosystemHref: "/ecosystem",
  securityHref: "/security",
  pricingHref: "/pricing",
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
      { href: "/school-management-system", label: "School Management System" },
    ],
  },
  {
    title: "Commercial",
    links: [
      { href: siteCtas.pricingHref, label: "Pricing" },
      { href: siteCtas.rolloutHref, label: "Rollout" },
      { href: "/services", label: "Data & Integration Services" },
      { href: "/compare", label: "Compare School ERPs" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: siteCtas.whyDifferentHref, label: "Why SquareCampus" },
      { href: "/blog", label: "Blog" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Trust",
    links: [
      { href: siteCtas.securityHref, label: "Security" },
      { href: "/infrastructure", label: "Infrastructure" },
      { href: "/pgp", label: "PGP Key" },
      { href: "/data-processing-addendum", label: "Data Processing" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms-of-service", label: "Terms of Service" },
      { href: "/acceptable-use", label: "Acceptable Use" },
      { href: "/refund-policy", label: "Cancellation & Refunds" },
      { href: "/contact", label: "Contact" },
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
  },
  {
    href: "https://x.com/squarecampus",
    label: "X",
  },
  {
    href: "https://instagram.com/squarecampus",
    label: "Instagram",
  },
] as const;
