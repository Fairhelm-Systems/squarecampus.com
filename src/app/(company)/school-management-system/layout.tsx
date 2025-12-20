import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "School Management System for Indian Schools | SquareCampus",
  description:
    "SquareCampus is a school management system built for Indian schools—fees, attendance, exams, communication, and compliance in one unified operating system.",
  path: "/school-management-system",
  ogTitle: "School Management System for Indian Schools | SquareCampus",
  ogDescription:
    "Define, deploy, and run a complete school management system built for India with SquareCampus—fees, attendance, exams, communication, and compliance in one OS.",
});

export default function SchoolManagementSystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
