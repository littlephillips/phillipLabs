import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useSettings } from "../lib/settings";
import Wrap from "./Wrap";

// Home ends on one clear action. The guided brief lives on /contact.
export default function HomeCta() {
  const { wa } = useSettings();
  return (
    <section className="pb-section">
      <Wrap>
        <div className="bg-ink text-white rounded-3xl px-6 py-8 sm:px-10 sm:py-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div>
            <h2 className="text-3xl font-bold tracking-[-0.02em] mb-1">Got a project in mind?</h2>
            <p className="text-white/65">Free 20-minute call. No pressure, no obligation.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 bg-accent-strong text-white px-6 py-3.5 rounded-xl font-bold no-underline hover:bg-accent-hover">
              Start a brief <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <a href={wa("Hi phillipLabs! I have a project in mind.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-3.5 rounded-xl font-bold no-underline hover:bg-white/20">
              <MessageCircle size={17} aria-hidden="true" /> WhatsApp us
            </a>
          </div>
        </div>
      </Wrap>
    </section>
  );
}
