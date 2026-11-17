import { WHY } from "../data/constants";
import { getIcon } from "../utils/icons";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import SnapCarousel from "./SnapCarousel";
import { sectionPad } from "../utils/layout";
import Wrap from "./Wrap";

function WhyCard({ w }) {
  const Icon = getIcon(w.icon);
  return (
    <div className="card relative h-full p-5 overflow-hidden">
      <span aria-hidden="true" className="absolute -top-2 right-4 text-[84px] leading-none font-bold text-ink/[0.05] select-none">{w.num}</span>
      <div className="relative w-10 h-10 rounded-[10px] bg-accent-strong/10 text-accent-strong flex items-center justify-center mb-3">
        <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
      </div>
      <h3 className="relative text-xl font-semibold tracking-[-0.01em] mb-1.5">{w.title}</h3>
      <p className="relative text-muted text-sm leading-[1.55]">{w.desc}</p>
    </div>
  );
}

export default function WhyMe({ standalone = false }) {
  return (
    <section id="why" className={sectionPad(standalone)}>
      <Wrap>
        <SectionHead standalone={standalone} title="Why phillipLabs" className="mb-4" />
        <SnapCarousel className="sm:hidden" label="Why phillipLabs" slideClass="w-[78%]">
          {WHY.map((w) => <WhyCard key={w.num} w={w} />)}
        </SnapCarousel>
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-4">
          {WHY.map((w, i) => (
            <Reveal as="div" delay={i * 40} key={w.num}><WhyCard w={w} /></Reveal>
          ))}
        </div>
      </Wrap>
    </section>
  );
}
