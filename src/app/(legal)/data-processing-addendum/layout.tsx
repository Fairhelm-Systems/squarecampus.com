import {Metadata} from "next";
import {ReactNode} from "react";

export const metadata: Metadata = {
  title: "Data Processing Addendum | SquareCampus",
  description:
    "Data Processing Addendum (DPA) governing how SquareCampus processes personal data on behalf of educational institutions.",
};

export default function TOCLayout ({ children }: { children: ReactNode }) {
    return <>{children}</>;
}
