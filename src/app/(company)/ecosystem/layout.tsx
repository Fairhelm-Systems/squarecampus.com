import { Metadata } from "next";
import { SEO_CONFIG } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Ecosystem | SquareCampus - Connected School Management Platform",
  description:
    "Explore the SquareCampus ecosystem: admin console, teacher tools, parent & student apps, integrations, security layer, and AI-powered operations. One platform, multiple touchpoints, single source of truth.",
  keywords: [
    "school management ecosystem",
    "connected campus platform",
    "school management system India",
    "admin console",
    "teacher tools",
    "parent app",
    "student app",
    "school integrations",
    "payment gateway integration",
    "SMS integration",
    "WhatsApp school communication",
    "role-based access control",
    "school hierarchy management",
    "multi-campus management",
    "college management system India",
    "university management system India",
  ],
  openGraph: {
    title: "Ecosystem - SquareCampus Connected School Platform",
    description:
      "One platform with multiple touchpoints: admin console, teacher workspace, mobile apps for parents & students, integrations, and AI layer. Single source of truth.",
    url: `${SEO_CONFIG.baseUrl}/ecosystem`,
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: `${SEO_CONFIG.baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "SquareCampus Ecosystem",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ecosystem - SquareCampus Connected School Platform",
    description:
      "Admin console, teacher tools, mobile apps, integrations, and AI. One platform, multiple touchpoints, single source of truth.",
    images: [`${SEO_CONFIG.baseUrl}/og-image.png`],
  },
  alternates: {
    canonical: `${SEO_CONFIG.baseUrl}/ecosystem`,
  },
};

export default function EcosystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
