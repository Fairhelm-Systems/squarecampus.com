import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

// Ecosystem page - shows the complete platform with all touchpoints
// Target: Users looking for comprehensive/integrated solutions

export const metadata: Metadata = createPageMetadata({
  title: "School Management Ecosystem | Apps, Integrations & Platform | SquareCampus",
  description:
    "Complete school management ecosystem: Admin console, teacher workspace, parent app, student app, payment integrations, SMS, WhatsApp, biometrics & more. One platform, all touchpoints.",
  path: "/ecosystem",
  keywords: [
    // Ecosystem/platform terms
    "school management ecosystem",
    "connected school platform",
    "integrated school system",
    "unified school platform",
    "school management platform",
    "complete school solution",
    "end to end school management",

    // Admin/Management
    "school admin console",
    "school admin dashboard",
    "school management dashboard",
    "principal dashboard",
    "school MIS system",
    "school administration panel",
    "centralized school management",
    "multi-campus dashboard",
    "school chain management",
    "group of schools management",

    // Teacher tools
    "teacher management system",
    "teacher app",
    "teacher portal",
    "teacher workspace",
    "online gradebook",
    "digital attendance teacher",
    "lesson planning software",
    "teacher timetable app",

    // Parent engagement
    "parent app for school",
    "parent portal",
    "parent communication app",
    "school parent app India",
    "parent teacher app",
    "homework app parents",
    "fee payment app parents",
    "attendance app parents",
    "school updates app",

    // Student tools
    "student app",
    "student portal",
    "student information system",
    "online learning portal",
    "student timetable app",
    "exam results app",
    "assignment submission app",

    // Mobile apps
    "school mobile app",
    "school app Android",
    "school app iOS",
    "school management mobile",
    "white label school app",
    "custom school app",

    // Payment integrations
    "school payment gateway",
    "Razorpay school integration",
    "PayU school integration",
    "online fee payment integration",
    "UPI school payment",
    "school payment automation",
    "fee collection gateway",

    // Communication integrations
    "school SMS integration",
    "bulk SMS school",
    "WhatsApp school integration",
    "WhatsApp Business school",
    "school email integration",
    "push notification school",
    "school announcement system",

    // Hardware integrations
    "biometric attendance integration",
    "RFID attendance school",
    "smart card school",
    "CCTV integration school",
    "school access control",
    "visitor management school",

    // API & technical
    "school API integration",
    "school ERP API",
    "third party integration school",
    "custom integration school",
    "webhook school software",

    // Access control
    "role based access school",
    "RBAC school management",
    "user permissions school",
    "multi-level access control",
    "school hierarchy management",
    "branch level access",

    // Data & analytics
    "school analytics platform",
    "school data intelligence",
    "school reporting system",
    "custom reports school",
    "real-time school dashboard",
    "school KPI tracking",

    // Multi-entity
    "multi-branch school software",
    "multi-campus management",
    "school group management",
    "franchise school management",
    "centralized reporting schools",
  ],
  ogTitle: "Complete School Ecosystem | SquareCampus Platform",
  ogDescription:
    "Admin console, teacher workspace, parent & student apps, payment gateways, SMS, WhatsApp, biometrics. One platform connecting your entire school.",
  twitterTitle: "School Management Ecosystem | SquareCampus",
  twitterDescription:
    "Complete ecosystem: Admin console, mobile apps, payment integrations, communication tools. All connected in one platform.",
});

export default function EcosystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
