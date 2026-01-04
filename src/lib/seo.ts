// SEO configuration and utilities for consistent metadata across the application
// --------------------------------------------------------------
// This file is the “identity kit” we hand to search engines.
// Not hype. Not vibes. Just clear, consistent signals.

export const SEO_CONFIG = {
  baseUrl: "https://squarecampus.com",
  siteName: "SquareCampus",
  // Your category: School OS. Your search reality: “school management system”.
  // Our metadata must hold both truths without sounding confused.
  defaultTitle: "SquareCampus | School OS & School Management System in India",
  defaultDescription:
    "SquareCampus is the School OS for India—admissions, academics, fees, transport, communication, compliance, and analytics connected in one school management system.",
  defaultKeywords: [
    "school management system",
    "school management system India",
    "school ERP",
    "school ERP software",
    "school management software",
    "CBSE school ERP",
    "ICSE school management",
    "K-12 school software",
    "college management system",
    "university management system",
    "student information system India",
    "fee management system",
    "attendance management system",
    "transport management for schools",
    "parent app for schools",
  ],
  language: "en-IN",
  openGraphLocale: "en_IN",
  ogImage: {
    default: "https://cdn.squarecampus.in/application_files/logo-light.png",
    width: 1200,
    height: 630,
  },

  // Optional, but powerful when set: links that reinforce brand/entity.
  // Fill these when ready.
  sameAs: [
    // "https://www.linkedin.com/company/squarecampus",
    // "https://x.com/squarecampus",
    // "https://www.youtube.com/@squarecampus",
  ],
  // Logo used in structured data.
  logo: "https://cdn.squarecampus.in/application_files/logo-light.png",
} as const;

export type PageMetadataConfig = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
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
 * - OG/Twitter are consistent across pages (avoid mismatch penalties).
 * - robots flags are configurable per route.
 */
export function createPageMetadata(config: PageMetadataConfig) {
  const {
    title,
    description,
    path,
    keywords,
    ogTitle,
    ogDescription,
    twitterTitle,
    twitterDescription,
    ogImage,
    noIndex = false,
    noFollow = false,
  } = config;

  const canonicalUrl = `${SEO_CONFIG.baseUrl}${path}`;
  const imageUrl = ogImage || SEO_CONFIG.ogImage.default;

  return {
    title,
    description,
    keywords: keywords?.length ? Array.from(keywords) : Array.from(SEO_CONFIG.defaultKeywords),
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
 * JSON-LD: WebSite schema (site-level identity).
 * This anchors the #website entity referenced by other schemas.
 */
export function createWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SEO_CONFIG.baseUrl}/#website`,
    url: SEO_CONFIG.baseUrl,
    name: SEO_CONFIG.siteName,
    description: SEO_CONFIG.defaultDescription,
    inLanguage: SEO_CONFIG.language,
  };
}

/**
 * JSON-LD: Organization schema (brand/entity).
 * This helps Google connect the site to a real-world entity.
 */
export function createOrganizationSchema(config?: {
  name?: string;
  url?: string;
  logo?: string;
  sameAs?: string[];
}) {
  const name = config?.name ?? SEO_CONFIG.siteName;
  const url = config?.url ?? SEO_CONFIG.baseUrl;
  const logo = config?.logo ?? SEO_CONFIG.logo;
  const sameAs = config?.sameAs ?? SEO_CONFIG.sameAs;

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${url}/#organization`,
    name,
    url,
    logo,
    sameAs: sameAs.length ? sameAs : undefined,
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

/**
 * JSON-LD: AboutPage schema
 */
export function createAboutPageSchema(config: { name: string; description: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${config.url}#aboutpage`,
    url: config.url,
    name: config.name,
    description: config.description,
    inLanguage: SEO_CONFIG.language,
    isPartOf: {
      "@id": `${SEO_CONFIG.baseUrl}/#website`,
    },
  };
}

/**
 * JSON-LD: SoftwareApplication schema (SquareCampus is a product, not just a website).
 * Use this on high-intent pages like:
 * - /school-management-system
 * - /features
 * - /ecosystem
 *
 * Note: Keep claims conservative; avoid review/rating unless you have real review data.
 */
export function createSoftwareApplicationSchema(config?: {
  name?: string;
  url?: string;
  description?: string;
  operatingSystem?: string;
  applicationCategory?: string;
}) {
  const name = config?.name ?? "SquareCampus";
  const url = config?.url ?? SEO_CONFIG.baseUrl;
  const description = config?.description ?? SEO_CONFIG.defaultDescription;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    url,
    description,
    applicationCategory: config?.applicationCategory ?? "EducationalApplication",
    operatingSystem: config?.operatingSystem ?? "Web",
    offers: {
      "@type": "Offer",
      // Avoid hard pricing here if you do “book a call” style pricing.
      price: "0",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
    publisher: {
      "@id": `${SEO_CONFIG.baseUrl}/#organization`,
    },
  };
}
