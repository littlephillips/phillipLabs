import { MessageCircle, Mail, MapPin, Clock } from "lucide-react";
import { SOCIALS } from "../data/constants";
import { useSettings } from "../lib/settings";
import { sectionPad } from "../utils/layout";
import BriefForm from "./BriefForm";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import SocialIcon from "./SocialIcon";
import Wrap from "./Wrap";

// Phones: heading, form, then direct contact details (the form is the action).
// Desktop: details on the left, form on the right.
export default function Contact({ standalone = false }) {
  const { phone, email, location, wa, bookingHref, hasScheduler } = useSettings();
  const row = "card-interactive flex items-center gap-3 px-4 py-3 no-underline text-ink";
  return (
    <section id="contact" className={sectionPad(standalone)}>
      <Wrap className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:grid-rows-[auto_1fr] gap-x-14 gap-y-5 items-start">
        <div className="lg:col-start-1 lg:row-start-1">
          <SectionHead standalone={standalone} title="Let's talk about your project" sub="Start with a free 20-minute call, or send a quick brief and we'll reply within a few hours." className="mb-0" subMobile={false} />
        </div>

        <Reveal as="div" delay={80} className="lg:col-start-2 lg:row-start-1 lg:row-span-2">
          <BriefForm />
        </Reveal>

        <div className="lg:col-start-1 lg:row-start-2 lg:self-start flex flex-col gap-2.5">
          <a href={hasScheduler ? bookingHref : wa("Hi phillipLabs! I want to discuss a project.")} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-accent-strong text-white px-6 py-3.5 rounded-xl font-bold no-underline shadow-[0_10px_22px_-8px_rgba(180,90,10,0.6)] hover:bg-accent-hover">
            <MessageCircle size={17} aria-hidden="true" /> {hasScheduler ? "Book a free call" : "Chat on WhatsApp"}
          </a>
          <a href={wa("Hi phillipLabs! I want to discuss a web project.")} target="_blank" rel="noopener noreferrer" className={row}>
            <span className="w-9 h-9 rounded-lg bg-wa/10 text-wa flex items-center justify-center shrink-0"><MessageCircle size={17} aria-hidden="true" /></span>
            <span><span className="block font-bold text-sm">WhatsApp</span><span className="block text-muted text-[0.8rem]">+{phone}</span></span>
          </a>
          <a href={`mailto:${email}`} className={row}>
            <span className="w-9 h-9 rounded-lg bg-accent-strong/10 text-accent-strong flex items-center justify-center shrink-0"><Mail size={17} aria-hidden="true" /></span>
            <span><span className="block font-bold text-sm">Email</span><span className="block text-muted text-[0.8rem] break-all">{email}</span></span>
          </a>
          <div className="flex items-center justify-between gap-3 flex-wrap pt-1">
            <div className="flex items-center gap-4 text-xs text-muted flex-wrap">
              <span className="inline-flex items-center gap-1.5"><MapPin size={13} aria-hidden="true" />{location}</span>
              <span className="inline-flex items-center gap-1.5"><Clock size={13} aria-hidden="true" />Mon–Fri, 8am–6pm</span>
            </div>
            <div className="flex gap-2">
              {SOCIALS.filter((s) => s.url).map((s) => (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.name} title={s.name}
                  className="w-10 h-10 bg-white rounded-lg shadow-[0_0_0_1px_rgba(40,28,8,0.1)] flex items-center justify-center text-muted transition-colors hover:text-accent-strong">
                  <SocialIcon id={s.id} size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </Wrap>
    </section>
  );
}
