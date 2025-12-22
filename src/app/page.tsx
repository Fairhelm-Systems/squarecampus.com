import type { Metadata } from "next";
import { ContactUs } from "@/components/marketing/contact-us";
import { CTA } from "@/components/marketing/cta";
import { EcosystemSection } from "@/components/marketing/ecosystem";
import { FAQ } from "@/components/marketing/faq";
import { Features } from "@/components/marketing/features";
import { FloatingHomeButton } from "@/components/marketing/floating-home-button";
import { Footer } from "@/components/marketing/footer";
import { Hero } from "@/components/marketing/hero";
import { MacbookIntroOverlay } from "@/components/marketing/macbook-intro-overlay";
import { Navbar } from "@/components/marketing/navbar";
import { Operations } from "@/components/marketing/operations";
import { TrustBanner } from "@/components/marketing/trust-banner";
import { WhyDifferent } from "@/components/marketing/why-different";

export const metadata: Metadata = {
  title: "SquareCampus | School Management System & School ERP in India",
  description:
    "SquareCampus is a school management system built for India—admissions, academics, fees, transport, communication, and compliance in one connected School OS.",
  keywords: [
    "school management system",
    "school management system India",
    "school ERP",
    "school ERP software India",
    "school management software",
    "CBSE school ERP",
    "ICSE school management system",
    "K-12 school management",
    "college management system India",
    "university management system India",
  ],
};

export default function Home() {
  return (
    <main className={"bg-black text-white"}>
      <MacbookIntroOverlay />
      <Navbar />
      <Hero />
      <Operations />
      <Features />
      <WhyDifferent />
      <CTA />
      <EcosystemSection />
      <TrustBanner />
      <FAQ />
      <ContactUs />
      <Footer />
      <FloatingHomeButton label="Back to top" variant="top" />
    </main>
  );
}
