import {Metadata} from "next";
import {ReactNode} from "react";

export const metadata: Metadata = {
    title: "Terms of Service | SquareCampus",
    description:
      "Terms of Service governing use of the SquareCampus school and college management platform.",
  };

export default function TOCLayout ({ children }: { children: ReactNode }) {
    return <>{children}</>;
}
