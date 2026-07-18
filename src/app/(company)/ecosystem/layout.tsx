import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

// Ecosystem page - shows the complete platform with all touchpoints
// Target: Users looking for comprehensive/integrated solutions

export const metadata: Metadata = createPageMetadata({
  title: "School Management Ecosystem | Apps, Integrations & Platform | SquareCampus",
  description:
    "The SquareCampus ecosystem: admin console, teacher workspace, parent and student apps, payment integrations, SMS, WhatsApp, and biometrics — one platform, all touchpoints.",
  path: "/ecosystem",
  ogTitle: "School Ecosystem | SquareCampus Platform",
  ogDescription:
    "Admin console, teacher workspace, parent and student apps, payment gateways, SMS, WhatsApp, biometrics. One platform connecting your entire school.",
  twitterTitle: "School Management Ecosystem | SquareCampus",
  twitterDescription:
    "Admin console, mobile apps, payment integrations, communication tools. All connected in one platform.",
});

export default function EcosystemLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
