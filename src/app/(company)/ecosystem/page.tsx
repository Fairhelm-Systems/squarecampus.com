"use client";

import Script from "next/script";
import { EcosystemHero } from "@/components/marketing/ecosystem-hero";
import { EcosystemModules } from "@/components/marketing/ecosystem-modules";
import { RBACShowcase } from "@/components/marketing/rbac-showcase";
import { ArchitectureDiagram } from "@/components/marketing/architecture-diagram";
import { IntegrationShowcase } from "@/components/marketing/integration-showcase";
import {
  createWebPageSchema,
  createBreadcrumbSchema,
  SEO_CONFIG,
} from "@/lib/seo";

export default function EcosystemPage() {
  const pageUrl = `${SEO_CONFIG.baseUrl}/ecosystem`;
  const pageName = "SquareCampus Ecosystem";
  const pageDescription =
    "Connected ecosystem for school management: admin console, teacher tools, mobile apps, integrations, security, and AI. One platform, multiple touchpoints, single source of truth.";

  const webPageSchema = createWebPageSchema({
    name: pageName,
    description: pageDescription,
    url: pageUrl,
  });

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: SEO_CONFIG.baseUrl },
    { name: "Ecosystem", url: pageUrl },
  ]);

  return (
    <div className="relative min-h-screen bg-neutral-950 text-white">
      <EcosystemHero />
      <EcosystemModules />
      <RBACShowcase />
      <ArchitectureDiagram />
      <IntegrationShowcase />

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
  );
}
