import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Sora } from "next/font/google";
import Script from "next/script";
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
    default: "SquareCampus | School OS & School Management System in India",
    template: "%s | SquareCampus",
  },
  description:
    "SquareCampus is the School OS for India, connecting admissions, academics, finance, communication, compliance, and operations in one institutional backbone.",
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
    canonical: `${SEO_CONFIG.baseUrl}/`,
  },
  openGraph: {
    type: "website",
    url: "https://squarecampus.com/",
    title: "SquareCampus | School OS & School Management System in India",
    description:
      "SquareCampus is the School OS for institutions that need admissions, academics, finance, communication, and operations to stay in sync.",
    siteName: "SquareCampus",
    locale: "en_IN",
    images: [
      {
        url: "https://cdn.mdtechspire.com/application_files/logo/squarecampus.png",
        width: 1200,
        height: 630,
        alt: "SquareCampus - School OS for India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SquareCampus | School OS & School Management System in India",
    description:
      "SquareCampus keeps admissions, academics, finance, communication, and operations in sync for institutions in India.",
    images: ["https://cdn.mdtechspire.com/application_files/logo/squarecampus.png"],
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
        <link rel="preconnect" href="https://cdn.mdtechspire.com" />
        <link rel="dns-prefetch" href="https://cdn.mdtechspire.com" />
      </head>
      <body suppressHydrationWarning className="antialiased">
        <ScrollToTop />
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
                {
                  "@type": "LocalBusiness",
                  "@id": "https://squarecampus.com/#localbusiness",
                  name: "SquareCampus",
                  description:
                    "School OS provider offering operational infrastructure for schools, colleges, and educational institutions across India.",
                  url: "https://squarecampus.com",
                  logo: "https://squarecampus.com/logo.png",
                  email: "contact@squarecampus.com",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Mumbai",
                    addressRegion: "Maharashtra",
                    addressCountry: "IN",
                  },
                  areaServed: {
                    "@type": "Country",
                    name: "India",
                  },
                  priceRange: "₹₹",
                  openingHoursSpecification: {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                    opens: "09:00",
                    closes: "18:00",
                  },
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
