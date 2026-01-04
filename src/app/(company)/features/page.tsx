"use client";

import Script from "next/script";
import { FeaturesPageHero } from "@/components/marketing/features-page-hero";
import { FeatureExplorer } from "@/components/marketing/feature-explorer";
import { LanguageSupportSection } from "@/components/marketing/features";
import { FloatingHomeButton } from "@/components/marketing/floating-home-button";
import {
  createWebPageSchema,
  createBreadcrumbSchema,
  SEO_CONFIG,
} from "@/lib/seo";

export default function FeaturesPage() {
  const pageUrl = `${SEO_CONFIG.baseUrl}/features`;
  const pageName = "SquareCampus Features";
  const pageDescription =
    "Connected features for school operations: admissions, academics, finance, communication, and enterprise controls in one School OS.";

  const webPageSchema = createWebPageSchema({
    name: pageName,
    description: pageDescription,
    url: pageUrl,
  });

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: SEO_CONFIG.baseUrl },
    { name: "Features", url: pageUrl },
  ]);

  return (
    <>
      <div className="relative min-h-screen bg-neutral-950 text-white">
        <FeaturesPageHero />
        <FeatureExplorer />
        <LanguageSupportSection />

        {/* Structured Data */}
        <Script
          id="webpage-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
        />
        <Script
          id="breadcrumb-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </div>

      <FloatingHomeButton href="/" label="Back to home" />
    </>
  );
}
