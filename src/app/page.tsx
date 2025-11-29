import {Hero} from "@/components/marketing/hero";
import {Features} from "@/components/marketing/features";
import {CTA} from "@/components/marketing/cta";
import {ContactUs} from "@/components/marketing/contact-us";
import {FAQ} from "@/components/marketing/faq";
import {Footer} from "@/components/marketing/footer";
import {FloatingHomeButton} from "@/components/marketing/floating-home-button";
import {Navbar} from "@/components/marketing/navbar";
import { Operations } from "@/components/marketing/operations";
import type { Metadata } from "next";
import { EcosystemSection } from "@/components/marketing/ecosystem";

export const metadata: Metadata = {
  title: "SquareCampus | The Operating System for Every School",
  description:
    "SquareCampus unifies admissions, academics, finance, communication, and compliance so schools of every size run predictable, connected operations.",
};

export default function Home() {
  return (
      <main className={'bg-black'}>
        <Navbar />
        <Hero/>
        <Operations />
        <Features/>
        <CTA/>
        <EcosystemSection />
        <FAQ/>
        <ContactUs />
        <Footer />
        <FloatingHomeButton label="Back to top" variant="top" />
      </main>
  );
}
