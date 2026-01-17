import type { ReactNode } from "react";
import { FloatingHomeButton } from "@/components/marketing/floating-home-button";
import { Footer } from "@/components/marketing/footer";

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <FloatingHomeButton href="/" />
      <Footer />
    </>
  );
}
