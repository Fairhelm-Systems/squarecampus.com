export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { SEO_CONFIG } from "@/lib/seo";

/**
 * SquareCampus Robots
 * ------------------
 * This is our bouncer.
 * Let the search engines into the lobby (public pages),
 * but keep them out of the back rooms (APIs, internal routes).
 */
export default function robots(): MetadataRoute.Robots {
  const SITE_URL = SEO_CONFIG.baseUrl;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          // Utility/dev-only routes should not become “content”.
          "/hello",
          // Moved routes; CloudFront 301s these, stubs are the fallback.
          "/features",
          "/contact-us",
          "/product",
          "/how-it-works",
          "/why-different",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
