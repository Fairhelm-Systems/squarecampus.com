// app/press/layout.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/seo";

// No press releases are published yet, so this page stays noindex until it
// has real content. Reachable directly, but kept out of primary crawl paths.
export const metadata: Metadata = createPageMetadata({
  title: "Press | SquareCampus",
  description: "Press resources, company overview, and media contact information for SquareCampus.",
  path: "/press",
  noIndex: true,
});

type PressLayoutProps = {
  children: ReactNode;
};

export default function PressLayout({ children }: PressLayoutProps) {
  return <>{children}</>;
}
