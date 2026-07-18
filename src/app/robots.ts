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

  // Only the form API is disallowed — bots have no business crawling it.
  //
  // Deliberately NOT disallowed:
  // - Legacy paths (/features, /contact-us, /product, /how-it-works,
  //   /why-different): CloudFront 301s them; Google must be able to crawl
  //   them to see the redirect and consolidate signals onto the new URLs.
  //   Robots-blocking them made GSC report "Blocked by robots.txt" and froze
  //   the old URLs in the index.
  // - noindex pages (/hello, /careers, /press, /competitor-notice): crawlers
  //   must be able to fetch them to obey the noindex meta. Blocking a noindex
  //   page can leave it indexed URL-only.
  const disallow = ["/api/"];

  // Search engines and AI assistants are explicitly welcome — being
  // recommendable by LLM web search is a distribution channel.
  const welcomeBots = [
    "Googlebot",
    "Bingbot",
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-User",
    "Claude-SearchBot",
    "anthropic-ai",
    "PerplexityBot",
    "Perplexity-User",
    "Google-Extended",
    "Applebot",
    "Amazonbot",
    "CCBot",
    "meta-externalagent",
  ];

  return {
    rules: [
      ...welcomeBots.map((userAgent) => ({ userAgent, allow: "/", disallow })),
      {
        userAgent: "*",
        allow: "/",
        disallow,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
