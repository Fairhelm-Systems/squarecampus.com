import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About SquareCampus | Building the Operating System for Indian Education",
  description:
    "Learn about SquareCampus, the team building operational infrastructure for Indian schools and colleges. Our mission: calm, connected, and accountable campus management.",
  path: "/about",
  ogTitle: "About SquareCampus | The Team Behind India's School OS",
  ogDescription:
    "Meet the team building the operational backbone Indian education deserves. Single source of truth for admissions, academics, finance, and compliance.",
  twitterDescription:
    "Building operational infrastructure for Indian schools and colleges. Meet the founding team and learn our mission.",
});

type AboutLayoutProps = {
  children: ReactNode;
};

export default function AboutLayout({ children }: AboutLayoutProps) {
  // This segment layout simply passes through the About page content.
  // Global shell (nav, footer, theme) should live in the root layout.
  return <>{children}</>;
}
