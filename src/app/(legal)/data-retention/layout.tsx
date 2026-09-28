import type { Metadata } from "next";
import type { ReactNode } from "react";
import { RETENTION_PATH, retentionPage } from "@/content/retention";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: retentionPage.metaTitle,
  description: retentionPage.description,
  path: RETENTION_PATH,
});

export default function DataRetentionLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
