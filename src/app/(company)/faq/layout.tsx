import type { Metadata } from "next";
import type { ReactNode } from "react";
import { faqs as faqData } from "@/content/faq";
import {
  createBreadcrumbSchema,
  createPageMetadata,
  createWebPageSchema,
  SEO_CONFIG,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Frequently Asked Questions | SquareCampus School Management System",
  description:
    "Find answers to common questions about SquareCampus school management system, including features, pricing, security, implementation, and support for schools in India.",
  path: "/faq",
  ogImage: "https://squarecampus.com/og/faq.png",
  ogTitle: "FAQ | SquareCampus School Management System",
  ogDescription:
    "Answers to common questions about SquareCampus — a school management system for admissions, academics, fees, and operations in India.",
});

// Server-side structured data for FAQ page
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    createWebPageSchema({
      name: "Frequently Asked Questions | SquareCampus",
      description:
        "Find answers to common questions about SquareCampus school management system, including features, pricing, security, and implementation.",
      url: `${SEO_CONFIG.baseUrl}/faq`,
    }),
    createBreadcrumbSchema([
      { name: "Home", url: SEO_CONFIG.baseUrl },
      { name: "FAQ", url: `${SEO_CONFIG.baseUrl}/faq` },
    ]),
    {
      "@type": "FAQPage",
      "@id": `${SEO_CONFIG.baseUrl}/faq#faqpage`,
      mainEntity: faqData.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

type FAQLayoutProps = {
  children: ReactNode;
};

export default function FAQLayout({ children }: FAQLayoutProps) {
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
