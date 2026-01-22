// app/careers/layout.tsx
import type { Metadata } from "next";
import Script from "next/script";
import type { ReactNode } from "react";
import { createBreadcrumbSchema, createPageMetadata, SEO_CONFIG } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Careers | SquareCampus - Join Our Team",
  description:
    "Join SquareCampus and help build the operating system for modern schools and colleges across India. Explore engineering, product, and growth roles.",
  path: "/careers",
  keywords: [
    "SquareCampus careers",
    "edtech jobs India",
    "school software jobs",
    "education technology careers",
    "startup jobs Mumbai",
    "SaaS jobs India",
    "engineering jobs edtech",
    "product jobs education",
  ],
  ogTitle: "Careers at SquareCampus",
  ogDescription:
    "We're building long-term infrastructure for schools and colleges. Explore roles and opportunities at SquareCampus.",
});

// Server-side structured data for careers page
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SEO_CONFIG.baseUrl}/careers#webpage`,
      url: `${SEO_CONFIG.baseUrl}/careers`,
      name: "Careers at SquareCampus",
      description:
        "Join SquareCampus and help build the operating system for modern schools and colleges across India.",
      isPartOf: {
        "@id": `${SEO_CONFIG.baseUrl}/#website`,
      },
      inLanguage: SEO_CONFIG.language,
    },
    createBreadcrumbSchema([
      { name: "Home", url: SEO_CONFIG.baseUrl },
      { name: "Careers", url: `${SEO_CONFIG.baseUrl}/careers` },
    ]),
    {
      "@type": "Organization",
      "@id": `${SEO_CONFIG.baseUrl}/#hiring-org`,
      name: "SquareCampus",
      url: SEO_CONFIG.baseUrl,
      logo: SEO_CONFIG.logo,
      description:
        "SquareCampus builds the operating system for modern schools and colleges in India. Join us to shape the future of education technology.",
      foundingDate: "2023",
      foundingLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Mumbai",
          addressCountry: "IN",
        },
      },
      numberOfEmployees: {
        "@type": "QuantitativeValue",
        minValue: 10,
        maxValue: 50,
      },
      knowsAbout: [
        "School Management Systems",
        "Education Technology",
        "ERP Software",
        "SaaS Development",
      ],
      slogan: "The Operating System for Every School",
    },
  ],
};

type CareersLayoutProps = {
  children: ReactNode;
};

export default function CareersLayout({ children }: CareersLayoutProps) {
  return (
    <>
      <Script
        id="careers-structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {children}
    </>
  );
}
