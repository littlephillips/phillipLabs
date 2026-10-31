import { Helmet } from "react-helmet-async";
import { EMAIL } from "../data/constants";
import { siteUrl } from "../config/site";
import Wrap from "../components/Wrap";

const sections = [
  {
    h: "What this site collects",
    p: "phillipLabs (this website) does not require you to create an account. If you use the contact or order form, the details you type (name, business name, project details) are sent directly to a WhatsApp conversation with the developer (Phillip Kinuthia), they are not stored on this website or in any database.",
  },
  {
    h: "Cookies & analytics",
    p: "With your consent (via the cookie banner shown on your first visit), this site loads Microsoft Clarity to understand how visitors use the sitem for example, which pages are viewed and how far people scroll. Clarity may use cookies and similar technologies. No analytics script runs before you accept. You can change your choice at any time by clearing your browser's site data and reloading the page.",
  },
  {
    h: "Third-party links",
    p: "This site links out to WhatsApp, email, and social media platforms. Those services have their own privacy policies, which this site does not control.",
  },
  {
    h: "Data you send directly",
    p: "Any information you send via WhatsApp, email, or a booking call is handled directly between you and the developer (Phillip Kinuthia), and is used only to respond to your enquiry and, if you proceed, to deliver the agreed work.",
  },
];

export default function Privacy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | phillipLabs</title>
        <meta name="description" content="How phillipLabs handles data collected through this site." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href={siteUrl("/privacy")} />
        <meta property="og:title" content="Privacy Policy | phillipLabs" />
        <meta property="og:description" content="How phillipLabs handles data collected through this site." />
        <meta property="og:url" content={siteUrl("/privacy")} />
        <meta property="og:type" content="website" />
      </Helmet>
      <Wrap className="max-w-[740px]! pt-[72px] pb-[100px]">
        <h1 className="text-4xl font-semibold tracking-[-0.02em] mb-2">Privacy Policy</h1>
        <p className="text-muted text-sm leading-[1.7] mb-10">Last updated: August 2, 2026</p>

        {sections.map((s) => (
          <div key={s.h} className="mb-7">
            <h2 className="text-lg mt-0 mb-2">{s.h}</h2>
            <p className="text-muted text-sm leading-[1.7]">{s.p}</p>
          </div>
        ))}

        <div className="mb-7">
          <h2 className="text-lg mt-0 mb-2">Contact</h2>
          <p className="text-muted text-sm leading-[1.7]">
            Questions about this policy? Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
          </p>
        </div>
      </Wrap>
    </>
  );
}
