import type { Metadata } from "next";
import Script from "next/script";
import type { ReactNode } from "react";
import { createBreadcrumbSchema, createPageMetadata, createWebPageSchema, SEO_CONFIG } from "@/lib/seo";

// Security page - critical for enterprise trust and procurement decisions
// Target: Security-conscious decision makers, IT heads, compliance officers

// Security FAQs for structured data (matches page.tsx securityFaqs)
const securityFaqs = [
  {
    question: "Where is data hosted?",
    answer:
      "SquareCampus is hosted in India by default, with data residency in India and no cross-border transfers unless explicitly requested.",
  },
  {
    question: "How is data encrypted?",
    answer:
      "We use TLS 1.3 for data in transit and AES-256 for data at rest, including encrypted backups and regular key rotation.",
  },
  {
    question: "Who can access data?",
    answer:
      "Access is role-based and least-privileged. Only authorized staff with MFA can reach administrative systems, and all access is logged.",
  },
  {
    question: "What happens if a device is lost?",
    answer:
      "Company-managed devices can be locked or wiped remotely, and access tokens are revoked to prevent further access.",
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
      name: "Security & Compliance | SquareCampus",
      description:
        "Bank-grade security for your school data. SquareCampus offers encryption, India data residency, RBAC, audit trails, and compliance-ready infrastructure.",
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
  title: "Security & Compliance | SquareCampus School Management System India",
  description:
    "Bank-grade security for your school data. SquareCampus offers encryption, India data residency, RBAC, audit trails, and compliance-ready infrastructure. SOC 2 practices, GDPR aligned.",
  path: "/security",
  keywords: [
    // Primary security terms
    "school ERP security",
    "school management system security",
    "secure school software",
    "school data security",
    "student data protection",
    "school data privacy",

    // Compliance
    "school software compliance India",
    "education data compliance",
    "GDPR school software",
    "data protection school",
    "IT Act compliance school",
    "DPDP Act school software",
    "privacy compliant school ERP",

    // Technical security
    "encrypted school management system",
    "school data encryption",
    "SSL school software",
    "end to end encryption school",
    "secure cloud school ERP",
    "AWS hosted school software",
    "Azure school management",

    // Access control
    "RBAC school management",
    "role based access school",
    "school user permissions",
    "multi-level access school",
    "teacher access control",
    "parent data access",
    "admin access management",

    // Audit & monitoring
    "audit trail school software",
    "school activity logging",
    "data audit school ERP",
    "compliance audit school",
    "access logs school",

    // Data residency
    "India data residency school",
    "data localization school",
    "India hosted school ERP",
    "Mumbai data center school",
    "local data storage school",

    // Enterprise security
    "enterprise grade school ERP",
    "bank grade security school",
    "SOC 2 school software",
    "ISO 27001 school ERP",
    "penetration tested school software",
    "vulnerability assessment school",

    // Backup & recovery
    "school data backup",
    "disaster recovery school",
    "data redundancy school ERP",
    "automatic backup school",

    // Trust signals
    "trusted school management system",
    "reliable school ERP",
    "uptime guarantee school",
    "SLA school software",
    "99.9 uptime school ERP",

    // Specific concerns
    "student information security",
    "parent data security",
    "fee data security",
    "exam data protection",
    "report card security",
    "school records security",

    // Decision maker terms
    "school IT security",
    "school CTO requirements",
    "school data protection officer",
    "school security assessment",
    "school vendor security",
    "school software security review",
  ],
  ogTitle: "Enterprise Security | SquareCampus School Management System",
  ogDescription:
    "Bank-grade security for schools. Encryption, India data residency, RBAC, audit trails, and compliance-ready infrastructure. Your data is protected.",
  twitterTitle: "Security & Compliance | SquareCampus",
  twitterDescription:
    "Bank-grade security for school data. Encryption, India data residency, role-based access, and full audit trails.",
});

type SecurityLayoutProps = {
  children: ReactNode;
};

export default function SecurityLayout({ children }: SecurityLayoutProps) {
  return (
    <>
      <Script
        id="security-structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {children}
    </>
  );
}
