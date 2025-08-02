import {Hero} from "@/components/marketing/hero";
import {Features} from "@/components/marketing/features";
import {CTA} from "@/components/marketing/cta";
import {ContactUs} from "@/components/marketing/contact-us";
import {FAQ} from "@/components/marketing/faq";
import {Footer} from "@/components/marketing/footer";
import {Navbar} from "@/components/marketing/navbar";

export default function Home() {
  return (
      <main className={'bg-black'}>
        <Navbar />
        <Hero/>
        <Features/>
        <CTA/>
        <FAQ/>
        <ContactUs />
        <Footer />
      </main>
  );
}
