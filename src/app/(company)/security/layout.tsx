import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Trust & Security | SquareCampus",
  description:
    "SquareCampus protects your institution's data with bank-grade security, SOC 2 compliance-ready infrastructure, transparent audit trails, and 24-hour breach notification.",
  path: "/security",
  keywords: [
    "school ERP security",
    "school management system security",
    "data security for schools India",
    "education compliance India",
    "audit trails school software",
    "RBAC school management",
    "secure school management system",
  ],
  ogTitle: "Security & Compliance | SquareCampus",
  ogDescription:
    "Bank-grade security, compliance-ready infrastructure, and transparent data practices for Indian educational institutions.",
  twitterDescription:
    "How SquareCampus protects your institution's data: encryption, compliance, audit trails, and 24-hour breach notification.",
});

type SecurityLayoutProps = {
  children: ReactNode;
};

export default function SecurityLayout({ children }: SecurityLayoutProps) {
  return <>{children}</>;
}
