import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Acceptable Use Policy | SquareCampus",
  description:
    "Acceptable Use Policy that explains permitted and prohibited behaviour on the SquareCampus platform.",
};

export default function TOCLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
