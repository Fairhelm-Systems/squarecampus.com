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
  return {
    canonical: canonicalUrl(path),
  };
}

/**
 * The one true URL for a route.
 *
 * `trailingSlash: true` (next.config.ts) means `/pricing` is not a page — the
 * edge 301s it to `/pricing/`. Anything that emits a URL (canonical, OG url,
 * sitemap entry, JSON-LD `url`/`item`/`@id`) has to emit the destination, not
 * the redirect: a BreadcrumbList pointing at a 301 makes Google resolve the
 * hop before it can trust the item, and a sitemap of redirects is a crawl
 * budget tax. Everything routes through here so the four signals cannot drift
 * apart again.
 */
export function canonicalUrl(path: string) {
  // A path whose last segment carries an extension is a file, not a route:
  // /llms.txt is served as-is and /llms.txt/ is a 404. `canonicalise()` below
  // already applied this rule to absolute URLs; the two disagreed, which is
  // exactly the kind of drift this module exists to prevent.
  const lastSegment = path.slice(path.lastIndexOf("/") + 1);
  if (lastSegment.includes(".")) {
    return `${baseUrl}${path}`;
  }
  const withSlash = path === "/" ? "/" : path.endsWith("/") ? path : `${path}/`;
  return `${baseUrl}${withSlash}`;
}

export const SEO_CONFIG = {
  baseUrl,
  siteName: "SquareCampus",
  // Canonical category: School Operating System / institutional decision
  // layer. ERP and "school management system" terminology is deliberately
  // confined to search-intent routes (/school-management-system, /compare,
  // /school-erp-alternative) so the brand pages resolve to the right category.
  defaultTitle: "SquareCampus | School Operating System for Institutional Command",
  defaultDescription:
    "SquareCampus connects school operations, workflow ownership, institutional visibility and governed intelligence in one School Operating System for schools and educational trusts.",
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

  const pageUrl = canonicalUrl(path);
  const imageUrl = ogImage || SEO_CONFIG.ogImage.default;

  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: ogTitle || title,
      description: ogDescription || description,
      url: pageUrl,
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
 * Normalise an absolute site URL to its canonical, 200-status form.
 *
 * Callers pass `${baseUrl}/pricing`; the live URL is `${baseUrl}/pricing/`.
 * Fragment identifiers (`#faqpage`) and file URLs (`/og/home.png`) are left
 * alone — only directory-style paths get the slash.
 */
function canonicalise(url: string) {
  const hash = url.indexOf("#");
  const base = hash === -1 ? url : url.slice(0, hash);
  const fragment = hash === -1 ? "" : url.slice(hash);
  if (base.endsWith("/")) {
    return `${base}${fragment}`;
  }
  // Split off the origin first. Without this the host itself ("squarecampus.com")
  // looks like a filename because of the dot, and the bare origin used as the
  // "Home" breadcrumb never gains its slash.
  const originEnd = base.indexOf("/", base.indexOf("//") + 2);
  const path = originEnd === -1 ? "" : base.slice(originEnd);
  const lastSegment = path.slice(path.lastIndexOf("/") + 1);
  if (lastSegment.includes(".")) {
    return `${base}${fragment}`;
  }
  return `${base}/${fragment}`;
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
    url: canonicalise(config.url),
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
      item: canonicalise(crumb.url),
    })),
  };
}
