import { Metadata } from "next";
import { SEO_CONFIG } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Features | SquareCampus - Complete School Management Platform",
  description:
    "Explore SquareCampus features: real-time academic intelligence, student lifecycle automation, unified communication, multi-language support, and enterprise-grade infrastructure. One platform for admissions, academics, finance, and operations.",
  keywords: [
    "school management features",
    "school management system India",
    "school ERP features",
    "campus management system",
    "academic intelligence",
    "student lifecycle automation",
    "school communication platform",
    "multi-language school software",
    "real-time attendance tracking",
    "fee management system",
    "parent communication app",
    "educational institution software",
    "CBSE school ERP",
    "ICSE school management",
  ],
  openGraph: {
    title: "Features - SquareCampus School Management Platform",
    description:
      "Real-time intelligence, automated workflows, unified communication, and enterprise infrastructure. Explore features that make SquareCampus the complete School OS.",
    url: `${SEO_CONFIG.baseUrl}/features`,
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: `${SEO_CONFIG.baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "SquareCampus Features",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Features - SquareCampus School Management Platform",
    description:
      "Real-time intelligence, automated workflows, unified communication. Explore features that make SquareCampus the complete School OS.",
    images: [`${SEO_CONFIG.baseUrl}/og-image.png`],
  },
  alternates: {
    canonical: `${SEO_CONFIG.baseUrl}/features`,
  },
};

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
