import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  canonicalUrl,
  createBreadcrumbSchema,
  createPageMetadata,
  createWebPageSchema,
  SEO_CONFIG,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Founding Institutional Partners",
  description:
    "A measured, founder-led programme for schools, school groups and education trusts that want to shape SquareCampus against a real operating bottleneck.",
  path: "/launch-partners",
  ogTitle: "Founding Institutional Partners | SquareCampus",
  ogDescription:
    "A founder-led 60–90 day pilot against one measurable operating bottleneck, with preferential founding terms, protected expansion economics and structured roadmap participation.",
});

/**
 * Structured data for /launch-partners/.
 *
 * WebPage + BreadcrumbList only, alongside the Organization / WebSite /
 * SoftwareApplication graph the root layout already emits.
 *
 * Deliberately absent:
 * - Product/Offer — the page publishes no price and makes no offer of sale.
 * - Event — the programme is not an event with a date and a place.
 * - VideoObject — the composition on this page is a silent supplementary
 *   diagram, not a video watch page. Marking it up would claim video-result
 *   eligibility for content that is not what a viewer would be sent to watch.
 */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    createWebPageSchema({
      name: "Founding Institutional Partners | SquareCampus",
      description:
        "The SquareCampus Founding Institutional Partner programme: a founder-led 60–90 day pilot run against one measurable operating bottleneck, with preferential founding terms and structured roadmap participation.",
      url: canonicalUrl("/launch-partners"),
    }),
    createBreadcrumbSchema([
      { name: "Home", url: SEO_CONFIG.baseUrl },
      { name: "Founding Institutional Partners", url: canonicalUrl("/launch-partners") },
    ]),
  ],
};

export default function LaunchPartnersLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {children}
    </>
  );
}
