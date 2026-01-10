import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/seo";

// Comprehensive SEO metadata for the Contact Us page
// Target: Dominate search for school management system contact/demo queries in India

export const metadata: Metadata = createPageMetadata({
  title: "Contact SquareCampus | Book a Demo of India's Best School Management System",
  description:
    "Contact SquareCampus for a personalized demo of India's leading school management system. Get pricing, migration support, and see how 500+ schools streamline admissions, fees, academics & communication. Response within 24 hours.",
  path: "/contact-us",
  keywords: [
    // Primary intent: Contact/Demo
    "contact school management system",
    "school ERP demo",
    "school management software demo India",
    "book school ERP demo",
    "school management system free demo",
    "school software demo request",
    "school ERP consultation",
    "school management system trial",

    // Pricing intent
    "school management system pricing",
    "school ERP pricing India",
    "school management software cost",
    "school ERP software price",
    "affordable school management system",
    "school management system quote",
    "school ERP cost calculator",
    "school software subscription",

    // Brand + Intent
    "SquareCampus demo",
    "SquareCampus pricing",
    "SquareCampus contact",
    "SquareCampus school ERP",
    "SquareCampus review",
    "SquareCampus vs",

    // Location-specific (major Indian cities)
    "school management system Mumbai",
    "school ERP Delhi NCR",
    "school management software Bangalore",
    "school ERP Hyderabad",
    "school management system Pune",
    "school ERP Chennai",
    "school software Kolkata",
    "school management system Gujarat",
    "school ERP Maharashtra",
    "school management Karnataka",
    "school ERP Ahmedabad",
    "school management Jaipur",
    "school ERP Lucknow",
    "school management Chandigarh",
    "school ERP Noida",
    "school management Gurgaon",
    "school ERP Indore",
    "school management Nagpur",
    "school ERP Coimbatore",
    "school management Kochi",

    // Board-specific
    "CBSE school ERP demo",
    "ICSE school management demo",
    "state board school software",
    "IGCSE school management system",
    "IB school ERP India",
    "Cambridge school software",
    "NIOS school management",

    // Institution type
    "K-12 school management demo",
    "college management system demo",
    "university ERP demo India",
    "play school management software",
    "coaching institute management system",
    "tuition center software demo",
    "international school ERP",
    "boarding school management system",
    "convent school software",
    "public school ERP",
    "private school management",
    "group of schools ERP",
    "school chain management software",

    // Feature-specific contact
    "fee management system demo",
    "student attendance software demo",
    "school admission software demo",
    "parent communication app demo",
    "school transport management demo",
    "online exam software demo",
    "school timetable software demo",
    "student information system demo",
    "school accounting software demo",
    "school library management demo",
    "school payroll software demo",
    "school HR management demo",

    // Comparison/switching intent
    "switch school management system",
    "migrate from Fedena",
    "alternative to Entab",
    "replace school ERP",
    "upgrade school management software",
    "better than Campus Care",
    "MyClassCampus alternative",
    "Teachmint competitor",
    "Vidyalaya alternative",
    "SchoolAdmin alternative",

    // Problem-aware
    "best school management system India",
    "top school ERP software 2024",
    "modern school management solution",
    "cloud school management system",
    "mobile school management app",
    "AI school management system",
    "integrated school platform",
    "all-in-one school software",

    // Long-tail
    "how to choose school management system",
    "school ERP implementation partner",
    "school digital transformation",
    "school automation software India",
    "integrated school management platform",
    "school management system for 1000 students",
    "multi-branch school software",
    "school management with parent app",
    "school ERP with mobile app",
    "paperless school management",
  ],
  ogTitle: "Contact SquareCampus | Book Your Free School ERP Demo Today",
  ogDescription:
    "Get a personalized demo of SquareCampus - India's most modern school management system. See admissions, fees, academics, transport & communication unified in one platform. 500+ schools trust us.",
  twitterTitle: "Book a Demo | SquareCampus School Management System",
  twitterDescription:
    "Contact SquareCampus for a free demo. See why 500+ Indian schools chose our unified platform for admissions, fees, academics & parent communication.",
});

type ContactLayoutProps = {
  children: ReactNode;
};

export default function ContactLayout({ children }: ContactLayoutProps) {
  return <>{children}</>;
}
