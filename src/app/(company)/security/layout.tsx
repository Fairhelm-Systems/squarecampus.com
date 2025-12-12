import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Trust & Security | SquareCampus",
  description:
    "Learn how SquareCampus protects your institution's data with bank-grade security, compliance-ready infrastructure, and transparent data practices.",
};

type SecurityLayoutProps = {
  children: ReactNode;
};

export default function SecurityLayout({ children }: SecurityLayoutProps) {
  return <>{children}</>;
}
