// app/press/layout.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";

const baseUrl = "https://www.squarecampus.com";

export const metadata: Metadata = {
  title: {
    default: "Press | SquareCampus",
    template: "%s | SquareCampus Press",
  },
  description:
    "Press resources, company overview, and media contact information for SquareCampus.",
  alternates: {
    canonical: `${baseUrl}/press`,
  },
  openGraph: {
    title: "Press | SquareCampus",
    description:
      "Press resources, company facts, and media contact details for SquareCampus.",
    type: "website",
    url: `${baseUrl}/press`,
    siteName: "SquareCampus",
  },
  twitter: {
    card: "summary_large_image",
    title: "Press | SquareCampus",
    description:
      "Find press resources and media contact information for SquareCampus.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

type PressLayoutProps = {
  children: ReactNode;
};

export default function PressLayout({ children }: PressLayoutProps) {
  return <>{children}</>;
}
