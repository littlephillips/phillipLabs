import Seo from "../components/Seo";
import Services from "../components/Services";

export default function ServicesPage() {
  return (
    <>
      <Seo title="Web Development & Business Systems | phillipLabs" description="Business websites, online stores with M-Pesa, SEO, dashboards, CRM and custom systems for Kenyan businesses. See what we build." path="/services" />
      <Services standalone />
    </>
  );
}
