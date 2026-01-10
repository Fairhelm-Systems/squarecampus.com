import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/seo";

// Security page - critical for enterprise trust and procurement decisions
// Target: Security-conscious decision makers, IT heads, compliance officers

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
  return <>{children}</>;
}
