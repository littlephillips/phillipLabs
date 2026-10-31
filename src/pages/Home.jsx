import { Helmet } from "react-helmet-async";
import { siteUrl } from "../config/site";
import Hero from "../components/Hero";
import ProofStrip from "../components/ProofStrip";
import Services from "../components/Services";
import Work from "../components/Work";
import Process from "../components/Process";
import Pricing from "../components/Pricing";
import WhyMe from "../components/WhyMe";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>phillipLabs | Websites & Business Systems That Actually Sell — Kenya</title>
        <meta
          name="description"
          content="phillipLabs builds websites and business systems (CRM, bookings, orders) for Kenyan SMBs — one place to get found by customers and run the business."
        />
        <link rel="canonical" href={siteUrl("/")} />
        <meta property="og:title" content="phillipLabs | Websites & Business Systems That Actually Sell — Kenya" />
        <meta
          property="og:description"
          content="phillipLabs builds websites and business systems (CRM, bookings, orders) for Kenyan SMBs — one place to get found by customers and run the business."
        />
        <meta property="og:url" content={siteUrl("/")} />
        <meta property="og:type" content="website" />
      </Helmet>
      <Hero />
      <ProofStrip />
      <Services />
      <Work />
      <Process />
      <Pricing />
      <WhyMe />
      <FAQ />
      <Contact />
    </>
  );
}
