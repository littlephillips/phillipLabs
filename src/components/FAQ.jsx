import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Minus, MessageCircle } from "lucide-react";
import { FAQ as FAQ_DATA } from "../data/constants";
import { useSettings } from "../lib/settings";
import { sectionPad } from "../utils/layout";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import Wrap from "./Wrap";

function Item({ q, a, i, open, toggle }) {
  const id = `faq-${i}`;
  return (
    <div className={`card transition-shadow ${open ? "shadow-[0_0_0_1.5px_var(--color-accent-strong),0_14px_28px_-18px_rgba(180,90,10,0.5)]" : ""}`}>
      <h3>
        <button
          onClick={toggle}
          aria-expanded={open}
          aria-controls={id}
          className="w-full text-left bg-transparent border-none px-4 sm:px-5 py-3.5 flex justify-between items-center gap-4 cursor-pointer text-[0.95rem] font-semibold text-ink"
        >
          {q}
          <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${open ? "bg-accent-strong text-white" : "bg-surface-low text-accent-strong"}`} aria-hidden="true">{open ? <Minus size={15} /> : <Plus size={15} />}</span>
        </button>
      </h3>
      {open && <p id={id} className="text-muted text-sm leading-[1.6] px-4 sm:px-5 pb-4 max-w-[640px]">{a}</p>}
    </div>
  );
}

// Two columns on desktop: intro + CTA on the left, answers on the right.
// `limit` shows the first N on the home page with a link to the full FAQ.
export default function FAQ({ standalone = false, limit }) {
  const [openIdx, setOpenIdx] = useState(0);
  const { wa } = useSettings();
  const items = limit ? FAQ_DATA.slice(0, limit) : FAQ_DATA;

  return (
    <section id="faq" className={sectionPad(standalone)}>
      <Wrap className="grid lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-5 lg:gap-14 items-start">
        <div className="lg:sticky lg:top-24">
          <SectionHead standalone={standalone} title="Questions, answered" sub="The things people ask before they get in touch." className="mb-4" />
          <Reveal as="div" className="card p-5 hidden sm:block">
            <p className="font-bold mb-1">Still unsure?</p>
            <p className="text-sm text-muted mb-4">Ask us directly. We reply within a few hours.</p>
            <a
              href={wa("Hi phillipLabs, I have a question before I start a project.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-wa text-white px-4 py-2.5 rounded-xl text-sm font-bold no-underline hover:brightness-110"
            >
              <MessageCircle size={16} aria-hidden="true" /> Ask on WhatsApp
            </a>
          </Reveal>
        </div>
        <div className="flex flex-col gap-2">
          {items.map((item, i) => (
            <Item key={item.q} i={i} {...item} open={openIdx === i} toggle={() => setOpenIdx(openIdx === i ? -1 : i)} />
          ))}
          {limit && (
            <Link to="/faq" className="text-sm font-semibold text-accent-strong mt-2 px-1">See all {FAQ_DATA.length} questions →</Link>
          )}
        </div>
      </Wrap>
    </section>
  );
}
