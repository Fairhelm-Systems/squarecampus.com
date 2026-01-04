import { Metadata } from "next";
import { SEO_CONFIG } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Features | SquareCampus School OS for India",
  description:
    "Explore SquareCampus features: connected workflows for admissions, academics, finance, communication, and operations. One School OS built for Indian institutions.",
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
    title: "Features - SquareCampus School OS",
    description:
      "Connected workflows, unified communication, and enterprise-grade controls. Explore features that make SquareCampus the School OS.",
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
    title: "Features - SquareCampus School OS",
    description:
      "Connected workflows and unified communication for Indian schools. Explore the SquareCampus School OS.",
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
