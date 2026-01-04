import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { BrowserWarning } from "@/components/browser-warning";
import { DevtoolsGuard } from "@/components/devtools-guard";
import { ScrollBeam } from "@/components/marketing/scroll-beam";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "Arial", "sans-serif"],
  adjustFontFallback: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://squarecampus.com"),
  title: {
    default: "SquareCampus | School OS & School Management System in India",
    template: "%s | SquareCampus",
  },
  description:
    "SquareCampus is the School OS for India—admissions, academics, fees, transport, communication, compliance, and analytics connected in one school management system.",
  keywords: [
    "school management system",
    "school management system India",
    "school ERP",
    "school ERP software",
    "school management software",
    "CBSE school ERP",
    "ICSE school management",
    "K-12 school software",
    "college management system",
    "university management system",
    "student information system India",
    "fee management system",
    "attendance management system",
    "transport management for schools",
    "parent app for schools",
  ],
  alternates: {
    canonical: "https://squarecampus.com/",
  },
  openGraph: {
    type: "website",
    url: "https://squarecampus.com/",
    title: "SquareCampus | School OS & School Management System in India",
    description:
      "Run every campus day on rails with unified admissions, academics, fees, transport, communication, and compliance.",
    siteName: "SquareCampus",
    locale: "en_IN",
    images: [
      {
        url: "https://cdn.squarecampus.in/application_files/logo-light.png",
        width: 1200,
        height: 630,
        alt: "SquareCampus - The Operating System for Every School",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SquareCampus | School OS & School Management System in India",
    description:
      "School management system for India: admissions, academics, fees, transport, and communication in one School OS.",
    images: ["https://cdn.squarecampus.in/application_files/logo-light.png"],
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
    <html lang="en" className={"dark scrollbar-auto scroll-smooth"}>
      <head>
        <link rel="preconnect" href="https://cdn.squarecampus.in" />
        <link rel="dns-prefetch" href="https://cdn.squarecampus.in" />
        <link rel="preconnect" href="https://app.squarecampus.com" />
        <link rel="dns-prefetch" href="https://app.squarecampus.com" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased select-none`}>
        <DevtoolsGuard />
        <BrowserWarning />
        <ScrollBeam />
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://squarecampus.com/#org",
                  name: "SquareCampus",
                  url: "https://squarecampus.com",
                  logo: "https://squarecampus.com/logo.png",
                  sameAs: ["https://www.linkedin.com/company/square-campus"],
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
                  url: "https://squarecampus.com",
                  name: "SquareCampus",
                  potentialAction: {
                    "@type": "SearchAction",
                    target: "https://squarecampus.com/search?q={search_term_string}",
                    "query-input": "required name=search_term_string",
                  },
                  inLanguage: "en-IN",
                },
                {
                  "@type": "SoftwareApplication",
                  name: "SquareCampus",
                  applicationCategory: "EducationalApplication",
                  operatingSystem: "Web",
                  url: "https://app.squarecampus.com",
                  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
                  potentialAction: {
                    "@type": "Action",
                    name: "Login",
                    target: "https://app.squarecampus.com",
                  },
                  publisher: { "@id": "https://squarecampus.com/#org" },
                  inLanguage: "en",
                },
              ],
            }),
          }}
        />
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
