// app/blog/layout.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";

const baseUrl = "https://squarecampus.com";

export const metadata: Metadata = {
  title: {
    default: "Blog | SquareCampus",
    template: "%s | SquareCampus Blog",
  },
  description:
    "Product updates, implementation stories, and practical insights on how SquareCampus helps schools and colleges run on a single operating system.",
  alternates: {
    canonical: `${baseUrl}/blog`,
  },
  openGraph: {
    title: "SquareCampus Blog",
    description:
      "Stories and updates from the team building the operating system for modern schools and colleges.",
    type: "website",
    url: `${baseUrl}/blog`,
    siteName: "SquareCampus",
  },
  twitter: {
    card: "summary_large_image",
    title: "SquareCampus Blog",
    description:
      "Product notes, implementation stories, and practical guidance for institutions using SquareCampus.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

type BlogLayoutProps = {
  children: ReactNode;
};

export default function BlogLayout({ children }: BlogLayoutProps) {
  // Segment layout is intentionally minimal; global shell lives in root layout.
  return <>{children}</>;
}
