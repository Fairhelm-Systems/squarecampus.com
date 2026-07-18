import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Sora } from "next/font/google";
import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { ScrollToTop } from "@/components/scroll-to-top";
import { ThemeScript } from "@/components/site/theme-script";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { SEO_CONFIG } from "@/lib/seo";
import "./globals.css";

const bodyFont = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const monoFont = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

const displayFont = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SEO_CONFIG.baseUrl),
  title: {
    default: "SquareCampus | Sovereign School OS & School Management System in India",
    template: "%s | SquareCampus",
  },
  description:
    "SquareCampus is a School OS for Indian school groups, connecting admissions, academics, finance, communication, compliance, and operations in one governed system of record.",
  alternates: {
    canonical: `${SEO_CONFIG.baseUrl}/`,
  },
  openGraph: {
    type: "website",
    url: "https://squarecampus.com/",
    title: "SquareCampus | Sovereign School OS for Indian School Groups",
    description:
      "Run every campus. Govern the institution. SquareCampus connects admissions, academics, finance, communication, and operations in one governed system of record.",
    siteName: "SquareCampus",
    locale: "en_IN",
    images: [
      {
        url: "https://squarecampus.com/brand/squarecampus.png",
        width: 1200,
        height: 630,
        alt: "SquareCampus - School OS for India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SquareCampus | Sovereign School OS for Indian School Groups",
    description:
      "SquareCampus keeps admissions, academics, finance, communication, and operations in sync for school groups in India.",
    images: ["https://squarecampus.com/brand/squarecampus.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  referrer: "same-origin",
  other: {
    "permissions-policy": "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${monoFont.variable} ${displayFont.variable} scroll-smooth`}
      suppressHydrationWarning
      data-theme="light"
    >
      <head>
        <ThemeScript />
      </head>
      <body suppressHydrationWarning className="antialiased">
        <ScrollToTop />
        {/* Plain script tag: server-rendered so non-JS crawlers see the schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://squarecampus.com/#org",
                  name: "SquareCampus",
                  legalName: "Fairhelm Systems OPC",
                  url: "https://squarecampus.com",
                  logo: SEO_CONFIG.logo,
                  sameAs: [
                    "https://www.linkedin.com/company/square-campus",
                    "https://x.com/squarecampus",
                    "https://instagram.com/squarecampus",
                  ],
                  brand: "SquareCampus",
                  areaServed: {
                    "@type": "Country",
                    name: "India",
                  },
                  contactPoint: [
                    {
                      "@type": "ContactPoint",
                      contactType: "sales",
                      email: "contact@squarecampus.com",
                    },
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://squarecampus.com/#website",
                  url: "https://squarecampus.com",
                  name: "SquareCampus",
                  publisher: { "@id": "https://squarecampus.com/#org" },
                  inLanguage: "en-IN",
                },
                {
                  "@type": "SoftwareApplication",
                  name: "SquareCampus",
                  applicationCategory: "EducationalApplication",
                  operatingSystem: "Web",
                  url: "https://app.squarecampus.com",
                  publisher: { "@id": "https://squarecampus.com/#org" },
                  inLanguage: "en",
                },
              ],
            }),
          }}
        />
        {children}
        <ThemeToggle />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
