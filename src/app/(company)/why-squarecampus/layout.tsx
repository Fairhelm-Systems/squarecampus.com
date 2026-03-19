import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/seo";

// Comparison/decision page - captures comparison searches and switching intent
// Target: Users comparing school ERPs, looking for alternatives, making decisions

export const metadata: Metadata = createPageMetadata({
  title: "Why SquareCampus | Best School Management System vs Traditional ERPs",
  description:
    "See why 500+ schools chose SquareCampus over traditional school ERPs. Unified platform vs fragmented tools, transparent pricing, modern UX, and features that actually work. Compare now.",
  path: "/why-squarecampus",
  keywords: [
    // Comparison intent
    "school ERP comparison",
    "school management system comparison",
    "compare school software",
    "best school ERP comparison India",
    "school software comparison chart",
    "which school management system",

    // Why/Best queries
    "why SquareCampus",
    "best school management system",
    "best school ERP India",
    "best school software",
    "top school management system India",
    "top 10 school ERP India",
    "leading school management system",
    "#1 school ERP",

    // Alternative searches (competitor targeting)
    "Fedena alternative",
    "Fedena vs SquareCampus",
    "better than Fedena",
    "Entab alternative",
    "Entab vs SquareCampus",
    "Campus Care alternative",
    "Campus Care vs SquareCampus",
    "Teachmint alternative",
    "Teachmint vs SquareCampus",
    "MyClassCampus alternative",
    "Vidyalaya alternative",
    "SchoolAdmin alternative",
    "Classe365 alternative",
    "Gradelink alternative",
    "PowerSchool alternative India",
    "Skolaro alternative",
    "eSchool alternative",

    // Switching intent
    "switch school ERP",
    "change school management system",
    "migrate school software",
    "replace school ERP",
    "upgrade school management",
    "modern school ERP",
    "new school management system",

    // Problem-aware
    "school ERP problems",
    "school software issues",
    "fragmented school tools",
    "integrated school platform",
    "unified school management",
    "all in one school software",
    "single school platform",
    "connected school system",

    // Decision stage
    "school ERP buying guide",
    "how to choose school ERP",
    "school management system selection",
    "school software evaluation",
    "school ERP RFP",
    "school software requirements",
    "school ERP checklist",

    // Value propositions
    "affordable school ERP",
    "transparent pricing school",
    "no hidden fees school software",
    "value for money school ERP",
    "ROI school management system",
    "cost effective school software",

    // Modern vs legacy
    "modern school ERP",
    "cloud based school management",
    "next generation school ERP",
    "school OS vs ERP",
    "school platform vs software",
    "SaaS school management",
    "legacy school ERP replacement",

    // User experience
    "easy to use school ERP",
    "user friendly school software",
    "intuitive school management",
    "simple school ERP",
    "modern UI school software",
    "mobile first school ERP",

    // Trust signals
    "trusted school ERP India",
    "proven school management system",
    "reliable school software",
    "500+ schools trust",
    "school ERP testimonials",
    "school software reviews India",
  ],
  ogTitle: "Why SquareCampus Beats Traditional School ERPs",
  ogDescription:
    "Unified platform vs fragmented tools. Transparent pricing vs hidden fees. Modern UX vs legacy interfaces. See why 500+ schools made the switch.",
  twitterTitle: "Why SquareCampus | School ERP Comparison",
  twitterDescription:
    "Compare SquareCampus vs traditional school ERPs. See why 500+ Indian schools chose the unified School OS approach.",
});

export default function WhyDifferentLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
