import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  createBreadcrumbSchema,
  createPageMetadata,
  createWebPageSchema,
  SEO_CONFIG,
} from "@/lib/seo";

// Security page - critical for enterprise trust and procurement decisions
// Target: Security-conscious decision makers, IT heads, compliance officers
// Rule: only design-posture statements here. Specific certifications, SLAs,
// and audit artifacts are shared through the security review process.

// Security FAQs for structured data (matches the posture on page.tsx)
const securityFaqs = [
  {
    question: "Where is data hosted?",
    answer:
      "SquareCampus is designed with an India-first hosting posture. Hosting details and data-flow documentation are shared during the security review process.",
  },
  {
    question: "How is data encrypted?",
    answer:
      "Data is encrypted in transit and at rest as part of the platform's baseline design. Implementation details are available under the security review process.",
  },
  {
    question: "Who can access data?",
    answer:
      "Access is role-based and least-privileged by design, with administrative access logged and traceable.",
  },
  {
    question: "Do you support vendor security questionnaires?",
    answer:
      "Yes. We provide questionnaire support and can share security documentation and summaries on request.",
  },
];

// Server-side structured data for security page
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    createWebPageSchema({
      name: "Security & Trust | SquareCampus",
      description:
        "How SquareCampus approaches security for school data: encryption, role-based access, audit trails, and an India-first hosting posture.",
      url: `${SEO_CONFIG.baseUrl}/security`,
    }),
    createBreadcrumbSchema([
      { name: "Home", url: SEO_CONFIG.baseUrl },
      { name: "Security", url: `${SEO_CONFIG.baseUrl}/security` },
    ]),
    {
      "@type": "FAQPage",
      "@id": `${SEO_CONFIG.baseUrl}/security#faqpage`,
      mainEntity: securityFaqs.map((faq) => ({
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

export const metadata: Metadata = createPageMetadata({
  title: "Security & Trust | SquareCampus School Management System",
  description:
    "How SquareCampus approaches security for school data: encryption in transit and at rest, role-based access, audit trails, and an India-first hosting posture. Documentation available on request.",
  path: "/security",
  ogTitle: "Security & Trust | SquareCampus",
  ogDescription:
    "Encryption, role-based access, audit trails, and an India-first hosting posture. Security documentation available through the review process.",
  twitterTitle: "Security & Trust | SquareCampus",
  twitterDescription:
    "Encryption, role-based access, audit trails, and an India-first hosting posture for school data.",
});

type SecurityLayoutProps = {
  children: ReactNode;
};

export default function SecurityLayout({ children }: SecurityLayoutProps) {
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
