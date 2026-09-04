// app/blog/layout.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";

const baseUrl = "https://squarecampus.com";

export const metadata: Metadata = {
  title: {
    // Bare "Blog", not "Blog | SquareCampus": the root layout's template
    // already appends the brand, so the fuller string was rendering as
    // "Blog | SquareCampus | SquareCampus" on the index.
    default: "Blog",
    template: "%s | SquareCampus Blog",
  },
  description:
    "Product updates, implementation stories, and practical insights on how SquareCampus helps schools and colleges run on a single operating system.",
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
  // The feed is the one discovery format every aggregator and assistant
  // crawler already understands. `rel="alternate"` is correct here in a way it
  // would not be site-wide: this really is another representation of /blog/.
  alternates: {
    canonical: `${baseUrl}/blog`,
    types: {
      "application/rss+xml": [{ url: `${baseUrl}/blog/feed.xml`, title: "SquareCampus Blog" }],
    },
  },
};

type BlogLayoutProps = {
  children: ReactNode;
};

export default function BlogLayout({ children }: BlogLayoutProps) {
  // Segment layout is intentionally minimal; global shell lives in root layout.
  return <>{children}</>;
}
