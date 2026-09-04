import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Sora } from "next/font/google";
import type { ReactNode } from "react";
import { ScrollToTop } from "@/components/scroll-to-top";
import { ThemeScript } from "@/components/site/theme-script";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { company } from "@/content/company";
import { SEO_CONFIG } from "@/lib/seo";
import "./globals.css";

const bodyFont = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const monoFont = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

// Every `font-display` element renders at the default 400 (no weight class
// anywhere sets Sora heavier), so only 400 is loaded — 500/600 were two
// unused font files on every page.
const displayFont = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SEO_CONFIG.baseUrl),
  title: {
    default: "SquareCampus | School Operating System for Institutional Command",
    template: "%s | SquareCampus",
  },
  description:
    "SquareCampus connects school operations, workflow ownership, institutional visibility and governed intelligence in one School Operating System for schools and educational trusts.",
  alternates: {
    canonical: `${SEO_CONFIG.baseUrl}/`,
  },
  openGraph: {
    type: "website",
    url: "https://squarecampus.com/",
    title: "SquareCampus | School Operating System for Institutional Command",
    description:
      "Know what requires attention today. SquareCampus connects school operations, assigns ownership to exceptions, and gives leadership a governed view of the institution.",
    siteName: "SquareCampus",
    locale: "en_IN",
    images: [
      {
        url: "https://squarecampus.com/og/home.png",
        width: 1200,
        height: 630,
        alt: "SquareCampus - Run every campus. Govern them as one.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SquareCampus | School Operating System for Institutional Command",
    description:
      "A system of record stores what happened. A decision layer shows what requires attention, who owns it, and what happens next.",
    images: ["https://squarecampus.com/og/home.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  referrer: "same-origin",
  other: {
    "permissions-policy": "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
};

// Tints the mobile browser chrome to the page background. The theme script
// defaults every visitor to light (system preference is intentionally not
// followed), so a single light value matches the rendered default — a
// prefers-color-scheme variant would mis-tint OS-dark visitors on the light page.
export const viewport: Viewport = {
  themeColor: "#faf9f6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    /*
      One language policy, applied everywhere: en-IN. The site is written in
      Indian English for Indian institutions, WebSite/WebPage JSON-LD already
      declares `inLanguage: "en-IN"`, and the OG locale is `en_IN`; `lang="en"`
      was the one signal disagreeing with the other three. No hreflang set is
      emitted: there is exactly one language, and squarecampus.in 301s here, so
      alternates would point at redirects.
    */
    <html
      lang="en-IN"
      className={`${bodyFont.variable} ${monoFont.variable} ${displayFont.variable} scroll-smooth`}
      suppressHydrationWarning
      data-theme="light"
    >
      <head>
        {/*
          Pointer to the machine-readable site summary.

          `rel="llms-txt"` is a custom relation, not a registered one: browsers
          and search engines ignore unknown rel tokens, so it costs nothing and
          risks nothing, and the tooling that does look for it finds the file
          without having to guess the conventional path. Deliberately NOT
          `rel="alternate" type="text/plain"` — that would claim llms.txt is an
          alternate representation of whichever page it appears on, which is
          false on all but the homepage.

          Discovery is layered on purpose: this tag, a footer link on every
          page, a pointer comment in robots.txt, and a sitemap entry.
        */}
        <link rel="llms-txt" href="/llms.txt" />
        <ThemeScript />
        {/*
          The scroll-reveal system starts at `opacity: 0` and relies on JS to
          add `.is-revealed`. Without JS that class never arrives, so every
          revealed block on every page would render invisible. This restores
          the fully-composed page for no-JS visitors and crawlers that do not
          execute scripts — the content is already in the HTML either way.
        */}
        <noscript>
          <style>
            {
              ".reveal-root,.reveal-stagger [data-reveal-item],.scene-root,.scene-root [data-scene-item],.scene-root [data-scene-accent],.aegis-visual [data-aegis-rise],.aegis-visual [data-aegis-dot],.aegis-console [data-console-step],nav[aria-label='Table of contents'] a{opacity:1!important;transform:none!important;animation:none!important}.aegis-visual [data-aegis-line]{stroke-dashoffset:0!important;opacity:.5!important}.aegis-visual [data-aegis-bar],.svc-flow [data-svc-bar]{transform:none!important;animation:none!important}.aegis-console .aegis-console-query{max-width:100%!important;white-space:normal!important;animation:none!important}"
            }
          </style>
        </noscript>
      </head>
      <body suppressHydrationWarning className="antialiased">
        <ScrollToTop />
        {/* Plain script tag: server-rendered so non-JS crawlers see the schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://squarecampus.com/#org",
                  name: "SquareCampus",
                  legalName: company.legalName,
                  url: "https://squarecampus.com/",
                  logo: SEO_CONFIG.logo,
                  foundingDate: company.incorporationDate,
                  email: company.email.general,
                  // Telephone is omitted until a statutory line is
                  // provisioned — an empty string would publish a claim we
                  // cannot honour.
                  ...(company.phone ? { telephone: company.phone } : {}),
                  identifier: {
                    "@type": "PropertyValue",
                    propertyID: "CIN",
                    name: "Corporate Identity Number",
                    value: company.cin,
                  },
                  address: {
                    "@type": "PostalAddress",
                    name: "Registered office",
                    streetAddress: company.address.street,
                    addressLocality: company.address.locality,
                    addressRegion: company.address.region,
                    postalCode: company.address.postalCode,
                    addressCountry: company.address.country,
                  },
                  founder: {
                    "@type": "Person",
                    name: "Mohit Gupta",
                  },
                  sameAs: [
                    "https://www.linkedin.com/company/square-campus",
                    "https://x.com/squarecampus",
                    "https://instagram.com/squarecampus",
                  ],
                  brand: "SquareCampus",
                  areaServed: {
                    "@type": "Country",
                    name: "India",
                  },
                  contactPoint: [
                    {
                      "@type": "ContactPoint",
                      contactType: "sales",
                      email: "contact@squarecampus.com",
                    },
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://squarecampus.com/#website",
                  url: "https://squarecampus.com/",
                  name: "SquareCampus",
                  publisher: { "@id": "https://squarecampus.com/#org" },
                  inLanguage: "en-IN",
                },
                {
                  "@type": "SoftwareApplication",
                  "@id": "https://squarecampus.com/#software",
                  name: "SquareCampus",
                  // Category signal: School Operating System / institutional
                  // operations, NOT "school ERP" or "school management
                  // software". `applicationCategory` stays a schema.org value;
                  // `applicationSubCategory` and `description` carry the
                  // canonical category wording. No offers/price: the site
                  // publishes no figures.
                  applicationCategory: "BusinessApplication",
                  applicationSubCategory: "School Operating System",
                  description:
                    "SquareCampus is a School Operating System and institutional decision layer for schools and educational trusts, connecting school cycles to ownership, exception handling, auditability and leadership decisions.",
                  operatingSystem: "Web",
                  url: "https://app.squarecampus.com",
                  publisher: { "@id": "https://squarecampus.com/#org" },
                  inLanguage: "en-IN",
                },
              ],
            }),
          }}
        />
        {children}
        <ThemeToggle />
      </body>
    </html>
  );
}
