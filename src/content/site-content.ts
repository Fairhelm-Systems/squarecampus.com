export const siteCtas = {
  demoHref: "/demo",
  platformHref: "/platform",
  aegisHref: "/aegis",
  rolloutHref: "/rollout",
  whyDifferentHref: "/why-squarecampus",
  ecosystemHref: "/ecosystem",
  securityHref: "/security",
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
  { href: siteCtas.demoHref, label: "Demo" },
] as const;

export const footerGroups = [
  {
    title: "Platform",
    links: [
      { href: "/", label: "Home" },
      { href: siteCtas.platformHref, label: "Platform" },
      { href: siteCtas.aegisHref, label: "AEGIS Intelligence" },
      { href: siteCtas.rolloutHref, label: "Rollout" },
      { href: siteCtas.whyDifferentHref, label: "Why SquareCampus" },
      { href: siteCtas.ecosystemHref, label: "Ecosystem" },
      { href: siteCtas.securityHref, label: "Security" },
      { href: "/school-management-system", label: "School Management System" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/blog", label: "Blog" },
      { href: "/faq", label: "FAQ" },
      { href: "/careers", label: "Careers" },
      { href: "/press", label: "Press" },
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
    ],
  },
] as const;

export const footerContact = {
  sales: "contact@squarecampus.com",
  support: "support@squarecampus.com",
  location: "Bangalore, India",
} as const;

export const footerSignals = [
  { label: "School OS", value: "One backbone" },
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
