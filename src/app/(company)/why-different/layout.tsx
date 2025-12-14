import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Why SquareCampus Is Different | Not Just Another Educational ERP",
  description:
    "No AI buzzwords. No fragmented products. No hidden fees. See why SquareCampus is a unified School OS, not another ERP rebranded for education.",
  path: "/why-different",
  ogTitle: "Why We're Different: The Truth About School Software",
  ogDescription:
    "Professional but honest comparison of SquareCampus vs. the competition. One unified platform, transparent pricing, real features that exist today.",
  twitterTitle: "Not Just Another Educational ERP",
  twitterDescription:
    "See why SquareCampus stands out: unified platform, no buzzwords, transparent pricing, features that actually exist.",
});

export default function WhyDifferentLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
