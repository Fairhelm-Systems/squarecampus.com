// SEO configuration and utilities for consistent metadata across the application

export const SEO_CONFIG = {
  baseUrl: "https://squarecampus.com",
  siteName: "SquareCampus",
  defaultTitle: "SquareCampus | The Operating System for Every School",
  defaultDescription:
    "SquareCampus is the operating system for modern schools and colleges, unifying admissions, academics, finance, communication, transport, and compliance into one predictable platform.",
  ogImage: {
    default: "https://cdn.squarecampus.in/application_files/logo-light.png",
    width: 1200,
    height: 630,
  },
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
 * Follows Next.js 14+ App Router metadata conventions
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

  const canonicalUrl = `${SEO_CONFIG.baseUrl}${path}`;
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
      locale: "en_US",
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
 * Generate JSON-LD structured data for WebPage
 */
export function createWebPageSchema(config: { name: string; description: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: config.name,
    description: config.description,
    url: config.url,
    inLanguage: "en",
    isPartOf: {
      "@id": `${SEO_CONFIG.baseUrl}/#website`,
    },
  };
}

/**
 * Generate JSON-LD BreadcrumbList schema
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
 * Generate JSON-LD AboutPage schema
 */
export function createAboutPageSchema(config: { name: string; description: string; url: string }) {
  return {
    "@type": "AboutPage",
    "@id": `${config.url}#aboutpage`,
    url: config.url,
    name: config.name,
    description: config.description,
    inLanguage: "en",
  };
}
