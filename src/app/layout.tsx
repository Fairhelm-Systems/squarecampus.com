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
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://squarecampus.com"),
  title: {
    default: "SquareCampus | The Operating System for Every School",
    template: "%s | SquareCampus",
  },
  description:
    "SquareCampus is the operating system for modern schools and colleges, unifying admissions, academics, finance, communication, transport, and compliance into one predictable platform.",
  alternates: {
    canonical: "https://squarecampus.com/",
  },
  openGraph: {
    type: "website",
    url: "https://squarecampus.com/",
    title: "SquareCampus | The Operating System for Every School",
    description:
      "Run every campus day on rails with unified admissions, academics, finance, communication, and transport on one OS.",
    siteName: "SquareCampus",
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
    title: "SquareCampus | The Operating System for Every School",
    description:
      "All-in-one OS for schools and colleges: admissions, academics, finance, transport, and communication.",
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
                  inLanguage: "en",
                },
                {
                  "@type": "SoftwareApplication",
                  name: "SquareCampus",
                  applicationCategory: "EducationalApplication",
                  operatingSystem: "Web",
                  url: "https://app.squarecampus.com",
                  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
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
