import { MessageCircle, Mail, ArrowRight } from "lucide-react";
import { EMAIL, PHONE, SOCIALS, waMsg, BOOKING_URL } from "../data/constants";
import OrderForm from "./OrderForm";
import Reveal from "./Reveal";
import Wrap from "./Wrap";

export default function Contact() {
  return (
    <section id="contact" className="py-section">
      <Wrap className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <Reveal as="div">
          <h2 className="text-4xl font-semibold tracking-[-0.02em] mb-3.5">Ready to build something?</h2>
          <p className="text-muted mb-[26px] max-w-[420px]">
            Whether it's a simple website or a full business system, start with a free 20-minute call. No pressure , no obligation.
          </p>

          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent text-white px-[22px] py-[13px] rounded-lg font-semibold no-underline mb-[26px] shadow-[0_8px_20px_rgba(224,123,31,0.28)] focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2">
               {/* Book a free 20-min call  */}
               Text us on WhatsApp
               <ArrowRight size={16} strokeWidth={2.25} />
          </a>

          <div className="flex flex-col gap-2 mb-[22px]">
            <a
              href={waMsg("Hi phillipLabs! I want to discuss a web project.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-[15px] py-[13px] border border-line rounded-[10px] no-underline text-ink transition-colors hover:border-line-strong hover:bg-[#fafafa]"
            >
              <span className="w-[34px] h-[34px] rounded-lg bg-wa/10 text-wa flex items-center justify-center shrink-0">
                <MessageCircle size={17} strokeWidth={2} />
              </span>
              <span>
                <span className="block font-bold text-sm">WhatsApp</span>
                <span className="block text-muted text-[0.8rem]">{PHONE}</span>
              </span>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`mailto:${EMAIL}`}
              className="flex items-center gap-3 px-[15px] py-[13px] border border-line rounded-[10px] no-underline text-ink transition-colors hover:border-line-strong hover:bg-[#fafafa]"
            >
              <span className="w-[34px] h-[34px] rounded-lg bg-accent/10 text-accent flex items-center justify-center shrink-0">
                <Mail size={17} strokeWidth={2} />
              </span>
              <span>
                <span className="block font-bold text-sm">Email</span>
                <span className="block text-muted text-[0.8rem]">{EMAIL}</span>
              </span>
            </a>
          </div>

          <div className="flex gap-2 flex-wrap">
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                title={s.name}
                className="w-9 h-9 max-sm:w-11 max-sm:h-11 border border-line rounded-lg flex items-center justify-center text-muted transition-colors hover:border-line-strong hover:text-ink"
              >
                <span className="w-3.5 h-3.5 flex" dangerouslySetInnerHTML={{ __html: s.svg }} />
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal as="div" delay={80}>
          <OrderForm />
        </Reveal>
      </Wrap>
    </section>
  );
}
