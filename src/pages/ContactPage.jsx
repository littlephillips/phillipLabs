import Seo from "../components/Seo";
import Contact from "../components/Contact";

export default function ContactPage() {
  return (
    <>
      <Seo title="Contact phillipLabs | Free 20-Minute Call, Nairobi" description="Tell us about your project. Send a quick brief on WhatsApp or book a free 20-minute call." path="/contact" />
      <Contact standalone />
    </>
  );
}
