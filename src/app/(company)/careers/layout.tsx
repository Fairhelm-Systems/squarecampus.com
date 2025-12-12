// app/careers/layout.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";

const baseUrl = "https://squarecampus.com";

export const metadata: Metadata = {
  title: {
    default: "Careers | SquareCampus",
    template: "%s | Careers at SquareCampus",
  },
  description:
    "Join SquareCampus and help build the operating system for modern schools and colleges across India and beyond.",
  alternates: {
    canonical: `${baseUrl}/careers`,
  },
  openGraph: {
    title: "Careers at SquareCampus",
    description:
      "We’re building long-term infrastructure for schools and colleges. Explore roles and opportunities at SquareCampus.",
    type: "website",
    url: `${baseUrl}/careers`,
    siteName: "SquareCampus",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers at SquareCampus",
    description: "Help design and scale the operating system for modern institutions.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

type CareersLayoutProps = {
  children: ReactNode;
};

export default function CareersLayout({ children }: CareersLayoutProps) {
  return <>{children}</>;
}
