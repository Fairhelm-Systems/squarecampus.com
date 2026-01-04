import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "School Management System for Indian Schools | SquareCampus",
  description:
    "SquareCampus is a school management system built for Indian schools—fees, attendance, exams, communication, and compliance in one unified School OS.",
  path: "/school-management-system",
  keywords: [
    "school management system India",
    "school ERP India",
    "school management software",
    "CBSE school ERP",
    "ICSE school management system",
    "K-12 school management",
    "college management system India",
    "university management system India",
    "fee management system for schools",
    "attendance management system",
    "transport management system for schools",
    "parent communication app",
  ],
  ogTitle: "School Management System for Indian Schools | SquareCampus",
  ogDescription:
    "Define, deploy, and run a complete school management system built for India with SquareCampus—fees, attendance, exams, communication, and compliance in one School OS.",
});

export default function SchoolManagementSystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
