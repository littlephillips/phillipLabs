import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { FAQ as FAQ_DATA } from "../data/constants";
import Reveal from "./Reveal";
import Wrap from "./Wrap";

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-line">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full text-left bg-transparent border-none py-5 flex justify-between items-center cursor-pointer text-base font-semibold text-ink focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
      >
        {q}
        <span className="text-muted ml-3 shrink-0">
          {open ? <Minus size={16} strokeWidth={2.25} /> : <Plus size={16} strokeWidth={2.25} />}
        </span>
      </button>
      {open && <p className="text-muted text-sm pb-5 max-w-[680px]">{a}</p>}
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-section ">
      <Wrap className="max-w-[780px]!">
        <Reveal as="h2" className="text-4xl font-semibold tracking-[-0.02em] mb-10">
          Frequently asked questions
        </Reveal>
        <div>
          {FAQ_DATA.map((item) => (
            <FAQItem key={item.q} {...item} />
          ))}
        </div>
      </Wrap>
    </section>

    
  );
}
