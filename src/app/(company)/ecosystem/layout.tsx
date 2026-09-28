import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

// Ecosystem page - shows the complete platform with all touchpoints
// Target: Users looking for comprehensive/integrated solutions

export const metadata: Metadata = createPageMetadata({
  title: "School Management Ecosystem | Apps, Integrations and Platform",
  description:
    "The SquareCampus ecosystem: admin console, teacher workspace, and parent and student apps on one record, with integrations to the tools you keep scoped and confirmed in writing.",
  path: "/ecosystem",
  ogImage: "https://squarecampus.com/og/ecosystem.png",
  ogTitle: "School Ecosystem | SquareCampus Platform",
  ogDescription:
    "Admin console, teacher workspace, and parent and student apps on one record, with scoped integrations to the tools you keep.",
  twitterTitle: "School Management Ecosystem | SquareCampus",
  twitterDescription:
    "Admin console, teacher workspace, parent and student apps, and scoped integrations — on one record.",
});

export default function EcosystemLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
