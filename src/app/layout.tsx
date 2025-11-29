import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";

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
    "SquareCampus is the operating system for modern schools and colleges—unifying admissions, academics, finance, communication, transport, and compliance into one predictable platform.",
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
  },
  twitter: {
    card: "summary_large_image",
    title: "SquareCampus | The Operating System for Every School",
    description:
      "All-in-one OS for schools and colleges: admissions, academics, finance, transport, and communication.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={"scrollbar-auto scroll-smooth"}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
