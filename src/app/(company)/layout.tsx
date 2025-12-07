import type { ReactNode } from "react";
import { Footer } from "@/components/marketing/footer";

export default function CompanyLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
