import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

// THE money page. This should rank #1 for "school management system India"
// and all related high-intent product searches.

export const metadata: Metadata = createPageMetadata({
  title: "Best School Management System in India | SquareCampus School OS",
  description:
    "SquareCampus is India's #1 school management system. Unified platform for admissions, fees, academics, attendance, transport, exams & parent communication. Trusted by 500+ schools. Book a free demo.",
  path: "/school-management-system",
  keywords: [
    // Primary high-intent keywords
    "school management system",
    "school management system India",
    "best school management system",
    "best school management system India",
    "school management software",
    "school management software India",
    "school ERP",
    "school ERP India",
    "school ERP software",
    "school ERP software India",

    // Product category
    "school OS",
    "school operating system",
    "unified school platform",
    "integrated school management",
    "all-in-one school software",
    "complete school management solution",
    "cloud school management system",
    "online school management system",
    "SaaS school management",
    "web based school management",

    // Feature-specific
    "school admission management system",
    "school fee management system",
    "student attendance management system",
    "school transport management system",
    "school exam management system",
    "student information system",
    "school timetable management",
    "school library management system",
    "school inventory management",
    "school HR management system",
    "school payroll software",
    "school accounting software",
    "parent teacher communication app",
    "school mobile app",
    "parent portal for schools",
    "student portal",
    "teacher management system",
    "online fee payment for schools",
    "school SMS system",
    "school WhatsApp integration",

    // Board-specific
    "CBSE school management system",
    "CBSE school ERP",
    "ICSE school management system",
    "ICSE school ERP",
    "state board school software",
    "IGCSE school management",
    "IB school ERP",
    "Cambridge school software",
    "NIOS school management",

    // Institution type
    "K-12 school management system",
    "primary school management software",
    "secondary school ERP",
    "senior secondary school management",
    "play school management software",
    "preschool management system",
    "kindergarten management software",
    "high school management system",
    "college management system",
    "college management system India",
    "university management system",
    "university ERP India",
    "coaching institute management",
    "tuition management software",
    "international school ERP",
    "boarding school management",
    "convent school software",
    "DAV school management",
    "KV school software",
    "private school management system",
    "public school ERP",
    "government school software",

    // Location-specific
    "school management system Mumbai",
    "school ERP Delhi",
    "school software Bangalore",
    "school management Hyderabad",
    "school ERP Pune",
    "school software Chennai",
    "school management Kolkata",
    "school ERP Ahmedabad",
    "school management Jaipur",
    "school software Gujarat",
    "school ERP Maharashtra",
    "school management Karnataka",
    "school software Tamil Nadu",
    "school ERP Uttar Pradesh",
    "school management Rajasthan",
    "school software Kerala",
    "school ERP Madhya Pradesh",
    "school management West Bengal",
    "school software Telangana",
    "school ERP Andhra Pradesh",

    // Use case specific
    "multi-branch school management",
    "school chain management software",
    "group of schools ERP",
    "centralized school management",
    "school digital transformation",
    "paperless school management",
    "school automation software",
    "smart school management",
    "AI school management system",
    "modern school ERP",

    // Comparison/switching
    "best school ERP India 2024",
    "top school management system",
    "school management system comparison",
    "Fedena alternative",
    "Entab alternative",
    "Campus Care alternative",
    "Teachmint alternative",
    "MyClassCampus alternative",

    // Problem-aware
    "school management solution",
    "school administration software",
    "educational institution management",
    "school data management",
    "student lifecycle management",
    "school workflow automation",

    // Long-tail
    "school management system with mobile app",
    "school ERP with parent app",
    "affordable school management system",
    "easy to use school software",
    "school management system for 1000 students",
    "school ERP implementation",
    "school management system free trial",
  ],
  ogTitle: "Best School Management System in India | SquareCampus",
  ogDescription:
    "India's #1 school management system. Unified platform for admissions, fees, academics, attendance, transport & parent communication. 500+ schools trust SquareCampus.",
  twitterTitle: "Best School Management System India | SquareCampus",
  twitterDescription:
    "India's leading school management system. One platform for admissions, fees, academics, attendance & communication. Trusted by 500+ schools.",
});

export default function SchoolManagementSystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
