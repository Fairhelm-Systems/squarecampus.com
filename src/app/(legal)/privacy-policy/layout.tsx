import {Metadata} from "next";
import {ReactNode} from "react";

export const metadata: Metadata = {
  title: "Privacy Policy | SquareCampus",
  description:
    "Privacy Policy describing how SquareCampus Private Limited collects, uses, and protects personal data.",
};

export default function TOCLayout ({ children }: { children: ReactNode }) {
    return <>{children}</>;
}
