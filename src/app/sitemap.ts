export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { blogPosts } from "@/content/blog/posts";
import { SEO_CONFIG } from "@/lib/seo";

/**
 * SquareCampus Sitemap
 * -------------------
 * Think of this file as our guest list for Googlebot.
 * We don't invite everyone to the party — only the pages that matter.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const SITE_URL = SEO_CONFIG.baseUrl;

  /**
   * The lastmod field should reflect *content* change, not “we deployed again”.
   * In a perfect world, these dates come from a CMS, markdown frontmatter,
   * or git commit timestamps. Until then, we keep it honest and explicit.
   */
  const LASTMOD = {
    home: new Date("2025-12-20T00:00:00.000Z"),
    core: new Date("2025-12-20T00:00:00.000Z"),
    company: new Date("2025-12-20T00:00:00.000Z"),
    blogIndex: new Date("2025-12-20T00:00:00.000Z"),
    legal: new Date("2025-12-20T00:00:00.000Z"),
  } as const;

  /**
   * Our crawl strategy:
   * - The money pages are the crown jewels.
   * - The supporting pages stay visible, but not louder than the core.
   * - Legal pages exist for trust, not traffic.
   */
  const routes: Array<{
    path: `/${string}` | "/";
    lastModified: Date;
    changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
    priority: number;
  }> = [
    // Primary intent / “rank me for this” page
    {
      path: "/school-management-system",
      lastModified: LASTMOD.core,
      changeFrequency: "weekly",
      priority: 1.0,
    },

    // Home: high authority, frequent link target
    {
      path: "/",
      lastModified: LASTMOD.home,
      changeFrequency: "daily",
      priority: 0.9,
    },

    // Conversion + differentiation pages
    {
      path: "/why-squarecampus",
      lastModified: LASTMOD.core,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      path: "/platform",
      lastModified: LASTMOD.core,
      changeFrequency: "weekly",
      priority: 0.88,
    },
    {
      path: "/aegis",
      lastModified: new Date("2026-07-11T00:00:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      path: "/rollout",
      lastModified: LASTMOD.core,
      changeFrequency: "weekly",
      priority: 0.82,
    },
    {
      path: "/ecosystem",
      lastModified: LASTMOD.core,
      changeFrequency: "weekly",
      priority: 0.8,
    },

    // Trust pages
    {
      path: "/security",
      lastModified: LASTMOD.company,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      path: "/about",
      lastModified: LASTMOD.company,
      changeFrequency: "monthly",
      priority: 0.6,
    },

    // Content hub
    {
      path: "/blog",
      lastModified: LASTMOD.blogIndex,
      changeFrequency: "daily",
      priority: 0.7,
    },

    // Individual blog posts (dynamically added)
    ...blogPosts.map((post) => ({
      path: `/blog/${post.slug}` as const,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),

    // Support & contact
    {
      path: "/faq",
      lastModified: LASTMOD.company,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      path: "/demo",
      lastModified: LASTMOD.company,
      changeFrequency: "monthly",
      priority: 0.7,
    },

    // Company / PR
    {
      path: "/careers",
      lastModified: LASTMOD.company,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      path: "/press",
      lastModified: LASTMOD.company,
      changeFrequency: "monthly",
      priority: 0.4,
    },

    // Legal: required, but not SEO targets
    {
      path: "/terms-of-service",
      lastModified: LASTMOD.legal,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      path: "/privacy-policy",
      lastModified: LASTMOD.legal,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      path: "/acceptable-use",
      lastModified: LASTMOD.legal,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      path: "/data-processing-addendum",
      lastModified: LASTMOD.legal,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  return routes.map((r) => ({
    url: `${SITE_URL}${r.path === "/" ? "" : r.path}`,
    lastModified: r.lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
