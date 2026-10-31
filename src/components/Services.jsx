import { getIcon } from "../utils/icons";
import { SERVICES } from "../data/constants";
import Reveal from "./Reveal";
import Wrap from "./Wrap";

export default function Services() {
  return (
    <section id="services" className="py-section">
      <Wrap>
        <Reveal as="h2" className="text-4xl font-semibold tracking-[-0.02em] mb-2.5">
          What I build
        </Reveal>
        <Reveal as="p" delay={40} className="text-muted max-w-[600px] mb-8">
          Pick what your business needs today, everything is built so it can grow with you later.
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line rounded-xl overflow-hidden">
          {SERVICES.map((s, i) => {
            const Icon = getIcon(s.icon);
            return (
              <Reveal as="div" delay={i * 30} key={s.title} className="bg-white p-[26px] hover:bg-[#fafafa] transition-colors">
                <div className="w-[38px] h-[38px] rounded-[9px] bg-accent/10 text-accent flex items-center justify-center mb-4">
                  <Icon size={20} strokeWidth={1.75} />
                </div>
                <h3 className="text-xl font-semibold tracking-[-0.01em] mb-1.5">{s.title}</h3>
                <p className="text-muted text-sm leading-[1.55]">{s.desc}</p>
              </Reveal>
            );
          })}
        </div>
      </Wrap>
    </section>
  );
}
