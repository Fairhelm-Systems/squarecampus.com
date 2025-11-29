import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "About | SquareCampus",
  description:
    "Learn about SquareCampus, the operating system for modern schools and colleges, and the team building it.",
};

type AboutLayoutProps = {
  children: ReactNode;
};

export default function AboutLayout({ children }: AboutLayoutProps) {
  // This segment layout simply passes through the About page content.
  // Global shell (nav, footer, theme) should live in the root layout.
  return <>{children}</>;
}
