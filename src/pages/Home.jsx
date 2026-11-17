import Seo from "../components/Seo";
import Hero from "../components/Hero";
import ProofStrip from "../components/ProofStrip";
import Services from "../components/Services";
import Work from "../components/Work";
import Process from "../components/Process";
import PricingTeaser from "../components/PricingTeaser";
import WhyMe from "../components/WhyMe";
import FAQ from "../components/FAQ";
import HomeCta from "../components/HomeCta";

// Home = the whole story in one scroll. Each section is also its own route
// (/services, /work, ...) for direct links and search.
export default function Home() {
  return (
    <>
      <Seo
        title="phillipLabs | Websites & Business Systems in Kenya"
        description="Custom websites and the business systems behind them (dashboards, invoicing, bookings) for Kenyan businesses. Fixed prices, M-Pesa ready."
        path="/"
      />
      <Hero />
      <ProofStrip />
      <Services compact />
      <Work limit={3} />
      <Process compact />
      <PricingTeaser />
      <WhyMe />
      <FAQ limit={3} />
      <HomeCta />
    </>
  );
}
