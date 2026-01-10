import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Us | SquareCampus",
  description:
    "Get in touch with SquareCampus. Book a demo, request a callback, or discuss how we can help transform your institution's operations.",
  path: "/contact-us",
  keywords: [
    "contact SquareCampus",
    "school management demo",
    "school ERP demo India",
    "education software consultation",
    "campus management inquiry",
    "school software pricing",
  ],
  ogTitle: "Contact SquareCampus | Book a Demo",
  ogDescription:
    "Tell us about your institution and get a tailored rollout plan, migration approach, and pricing.",
  twitterDescription:
    "Book a demo with SquareCampus. Get a tailored plan for your school or college.",
});

type ContactLayoutProps = {
  children: ReactNode;
};

export default function ContactLayout({ children }: ContactLayoutProps) {
  return <>{children}</>;
}
