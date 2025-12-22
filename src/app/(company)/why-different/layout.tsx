import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Why SquareCampus Is Different | Not Just Another Educational ERP",
  description:
    "No AI buzzwords. No fragmented products. No hidden fees. See why SquareCampus is a unified School OS built for Indian schools, not another ERP rebranded for education.",
  path: "/why-different",
  keywords: [
    "why squarecampus",
    "school ERP comparison India",
    "best school management system India",
    "school management software vs ERP",
    "unified school platform",
    "school OS",
    "school management system for India",
  ],
  ogTitle: "Why We're Different: The Truth About School Software",
  ogDescription:
    "A clear, professional comparison of SquareCampus vs fragmented school ERPs in India. One unified platform, transparent pricing, real features today.",
  twitterTitle: "Not Just Another Educational ERP",
  twitterDescription:
    "See why SquareCampus stands out in India: unified platform, transparent pricing, and features that actually exist.",
});

export default function WhyDifferentLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
