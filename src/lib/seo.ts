// SEO configuration and utilities for consistent metadata across the application.
// Rule of the file: every signal emitted here must be true and verifiable.
// No rankings, no customer counts, no keyword stuffing.

/**
 * squarecampus.com is the single canonical domain; squarecampus.in 301s to it
 * at the edge, so no hreflang set is emitted (redirecting alternates would be
 * an SEO error). NEXT_PUBLIC_SITE_URL stays overridable for previews.
 */
export const PRIMARY_DOMAIN = "https://squarecampus.com";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || PRIMARY_DOMAIN;

/**
 * Canonical for a page. Every page that exports its own metadata must set
 * this, otherwise it inherits the root layout's canonical ("/") and search
 * engines read it as a duplicate of the homepage.
 */
export function createAlternates(path: string) {
  const normalized = path === "/" ? "/" : path.endsWith("/") ? path : `${path}/`;
  return {
    canonical: `${baseUrl}${normalized}`,
  };
}

export const SEO_CONFIG = {
  baseUrl,
  siteName: "SquareCampus",
  // Category: sovereign School OS. Search reality: "school management system".
  // Metadata holds both without inventing rank or scale.
  defaultTitle: "SquareCampus | Sovereign School OS for Indian School Groups",
  defaultDescription:
    "SquareCampus is a School OS for Indian school groups: admissions, academics, fees, transport, communication, compliance, and analytics in one governed system of record.",
  language: "en-IN",
  openGraphLocale: "en_IN",
  // 1200x630 social card (correct OG/Twitter aspect ratio). The square brand
  // mark below is the JSON-LD logo, not the share image.
  ogImage: {
    default: "https://squarecampus.com/og/default.png",
    width: 1200,
    height: 630,
  },

  // Entity links: help Google/Knowledge Graph connect the brand to profiles.
  sameAs: [
    "https://www.linkedin.com/company/square-campus",
    "https://x.com/squarecampus",
    "https://instagram.com/squarecampus",
  ],
  // Logo used in structured data.
  logo: "https://squarecampus.com/brand/squarecampus.png",
} as const;

export type PageMetadataConfig = {
  title: string;
  description: string;
  path: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  ogImage?: string;
  noIndex?: boolean;
  noFollow?: boolean;
};

/**
 * Generate consistent metadata for pages
 * Follows Next.js App Router metadata conventions
 *
 * The plan:
 * - Canonicals are non-negotiable.
 * - OG/Twitter are page-specific and consistent (avoid mismatch penalties).
 * - robots flags are configurable per route.
 * - No meta keywords: they are ignored by search engines and invite stuffing.
 */
export function createPageMetadata(config: PageMetadataConfig) {
  const {
    title,
    description,
    path,
    ogTitle,
    ogDescription,
    twitterTitle,
    twitterDescription,
    ogImage,
    noIndex = false,
    noFollow = false,
  } = config;

  const normalizedPath = path === "/" ? "/" : path.endsWith("/") ? path : `${path}/`;
  const canonicalUrl = `${SEO_CONFIG.baseUrl}${normalizedPath}`;
  const imageUrl = ogImage || SEO_CONFIG.ogImage.default;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: ogTitle || title,
      description: ogDescription || description,
      url: canonicalUrl,
      siteName: SEO_CONFIG.siteName,
      type: "website" as const,
      locale: SEO_CONFIG.openGraphLocale,
      images: [
        {
          url: imageUrl,
          width: SEO_CONFIG.ogImage.width,
          height: SEO_CONFIG.ogImage.height,
          alt: ogTitle || title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: twitterTitle || ogTitle || title,
      description: twitterDescription || ogDescription || description,
      images: [imageUrl],
    },
    robots: {
      index: !noIndex,
      follow: !noFollow,
      googleBot: {
        index: !noIndex,
        follow: !noFollow,
      },
    },
  };
}

/**
 * JSON-LD: WebPage schema (page-level identity)
 */
export function createWebPageSchema(config: { name: string; description: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: config.name,
    description: config.description,
    url: config.url,
    inLanguage: SEO_CONFIG.language,
    isPartOf: {
      "@id": `${SEO_CONFIG.baseUrl}/#website`,
    },
  };
}

/**
 * JSON-LD: BreadcrumbList schema
 * Breadcrumbs help Google understand hierarchy (and sometimes show it).
 */
export function createBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}
