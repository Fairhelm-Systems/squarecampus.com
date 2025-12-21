import type { MetadataRoute } from "next";

/**
 * SquareCampus Robots
 * ------------------
 * This is our bouncer.
 * Let the search engines into the lobby (public pages),
 * but keep them out of the back rooms (APIs, internal routes).
 */
export default function robots(): MetadataRoute.Robots {
  const SITE_URL = "https://squarecampus.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          // No bots rummaging through our machinery.
          "/api/",
          // Utility/dev-only routes should not become “content”.
          "/hello",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
