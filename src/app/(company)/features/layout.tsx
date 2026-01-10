import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

// Features page - showcase all product capabilities
// Target: Feature-specific searches and comparison queries

export const metadata: Metadata = createPageMetadata({
  title: "School Management System Features | SquareCampus School OS India",
  description:
    "Explore 50+ features of SquareCampus school management system: admissions, fee collection, attendance, exams, timetable, transport, parent app, reports & analytics. All-in-one School OS for India.",
  path: "/features",
  keywords: [
    // Core feature categories
    "school management system features",
    "school ERP features",
    "school software features",
    "school management modules",

    // Admission management
    "school admission management",
    "online admission system",
    "admission form software",
    "student enrollment system",
    "admission tracking software",
    "school registration system",

    // Fee management
    "school fee management system",
    "fee collection software",
    "online fee payment school",
    "fee receipt generation",
    "fee reminder system",
    "fee defaulter management",
    "installment fee system",
    "sibling discount management",
    "late fee calculation",
    "fee structure management",

    // Attendance management
    "student attendance system",
    "biometric attendance school",
    "RFID attendance system",
    "online attendance marking",
    "attendance report software",
    "leave management school",
    "absentee SMS alert",

    // Academic management
    "exam management system",
    "online examination software",
    "result processing system",
    "report card generation",
    "grade management system",
    "CBSE result software",
    "CCE grading system",
    "mark sheet generation",

    // Timetable management
    "school timetable software",
    "automatic timetable generation",
    "class scheduling software",
    "teacher timetable management",
    "substitution management",

    // Transport management
    "school transport management",
    "school bus tracking",
    "GPS tracking for school bus",
    "route management software",
    "transport fee management",
    "vehicle maintenance tracking",

    // Communication
    "parent communication app",
    "school notification system",
    "SMS integration school",
    "WhatsApp school communication",
    "parent teacher messaging",
    "school announcement system",
    "circular management",
    "homework notification app",

    // HR & Payroll
    "school HR management",
    "teacher payroll software",
    "staff attendance system",
    "leave management system",
    "salary slip generation",

    // Library management
    "school library software",
    "book issue management",
    "library barcode system",
    "digital library school",

    // Inventory & Assets
    "school inventory management",
    "asset tracking software",
    "lab equipment management",

    // Reports & Analytics
    "school analytics dashboard",
    "MIS reports school",
    "student performance analytics",
    "attendance analytics",
    "fee collection reports",
    "custom report builder",

    // Mobile apps
    "school mobile app",
    "parent app for school",
    "student app",
    "teacher app",
    "school management app Android",
    "school management app iOS",

    // Integration features
    "payment gateway integration",
    "Razorpay school integration",
    "biometric integration",
    "CCTV integration school",
    "ERP integration",

    // Security features
    "role based access control",
    "data security school",
    "audit trail school software",
    "RBAC school management",

    // Comparison terms
    "school ERP feature comparison",
    "best school software features",
    "comprehensive school management",
    "complete school ERP features",
  ],
  ogTitle: "50+ Features | SquareCampus School Management System",
  ogDescription:
    "Admissions, fees, attendance, exams, transport, parent app & more. Explore all features of India's most comprehensive school management system.",
  twitterTitle: "School Management Features | SquareCampus India",
  twitterDescription:
    "50+ integrated features for school management. Admissions, fees, attendance, exams, transport, parent communication. All in one platform.",
});

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
