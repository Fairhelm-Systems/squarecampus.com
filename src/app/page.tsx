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
  title: "SquareCampus | The Operating System for Every School",
  description:
    "SquareCampus unifies admissions, academics, finance, communication, and compliance so schools of every size run predictable, connected operations.",
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
