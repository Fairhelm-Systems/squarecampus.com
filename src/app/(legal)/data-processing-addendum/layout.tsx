import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Data Processing Addendum (DPA) | SquareCampus",
  description:
    "SquareCampus Data Processing Addendum: Legal framework governing how we process personal data on behalf of educational institutions, ensuring GDPR and Indian data protection compliance.",
  path: "/data-processing-addendum",
  ogTitle: "Data Processing Agreement | SquareCampus",
  ogDescription:
    "Our legal commitment to data protection, privacy, and compliance when processing your institution's data.",
});

export default function TOCLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
