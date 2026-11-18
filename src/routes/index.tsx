import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { FAQ, FAQS } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Industries } from "@/components/sections/Industries";
import { Marquee } from "@/components/sections/Marquee";
import { ModuleShowcase } from "@/components/sections/ModuleShowcase";
import { Pricing } from "@/components/sections/Pricing";
import { Problem } from "@/components/sections/Problem";
import { TrustStrip } from "@/components/sections/TrustStrip";

const TITLE = "DevOps Manager — Run your whole business from one screen";
const DESCRIPTION =
  "Sales & CRM, inventory, HR & payroll, GST invoicing, logistics and analytics in one workspace built for Indian SMBs. Explore the DevOps Manager preview.";

const SOFTWARE_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "DevOps Manager",
  alternateName: "Manager – Modern Business Management Suite",
  publisher: { "@type": "Organization", name: "DevOps Manager LLP" },
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: DESCRIPTION,
  url: "https://themgr.in",
  inLanguage: ["en-IN", "hi-IN"],
  offers: [
    { "@type": "Offer", name: "Starter", price: "999", priceCurrency: "INR" },
    { "@type": "Offer", name: "Growth", price: "2499", priceCurrency: "INR" },
  ],
};

const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(SOFTWARE_LD) },
      { type: "application/ld+json", children: JSON.stringify(FAQ_LD) },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        {/* Everything after the hero sits above it so it slides over the pinned hero. */}
        <div className="relative z-10 rounded-t-[2rem] border-t border-glass-border bg-background shadow-[0_-30px_80px_-20px_var(--shadow-overlap)] md:rounded-t-[3rem]">
        <TrustStrip />
        <Problem />
        <ModuleShowcase />
        <Marquee />
        <BentoGrid />
        <Industries />
        <HowItWorks />
        <Pricing />
        <FAQ />
        <FinalCTA />
        </div>
      </main>
      <Footer />
    </>
  );
}
