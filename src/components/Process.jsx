import { getIcon } from "../utils/icons";
import { PROCESS } from "../data/constants";
import Reveal from "./Reveal";
import Wrap from "./Wrap";

export default function Process() {
  return (
    <section id="process" className="py-section bg-[#fafafa]">
      <Wrap>
        <Reveal as="h2" className="text-4xl font-semibold tracking-[-0.02em] mb-2.5">
          How it works
        </Reveal>
        <Reveal as="p" delay={40} className="text-muted max-w-[560px] mb-10">
          Five steps, start to finish. No surprises on price or timeline.
        </Reveal>

        <div className="relative grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          <div className="hidden lg:block absolute top-[19px] left-[calc(10%+19px)] right-[calc(10%+19px)] h-px bg-line" aria-hidden="true" />
          {PROCESS.map((p, i) => {
            const Icon = getIcon(p.icon);
            return (
              <Reveal
                as="div"
                delay={i * 40}
                key={p.step}
                className="relative bg-white border border-line rounded-xl px-[18px] pt-5 pb-[22px] transition-[transform,box-shadow] hover:-translate-y-1 hover:shadow-[0_16px_30px_-18px_rgba(16,16,20,0.24)]"
              >
                <div className="relative z-[1] w-[38px] h-[38px] rounded-[10px] bg-accent text-white flex items-center justify-center mb-3.5">
                  <Icon size={19} strokeWidth={1.75} />
                </div>
                <div className="text-xs font-bold text-muted tracking-[0.05em] mb-1.5">{p.step}</div>
                <h3 className="text-xl font-semibold tracking-[-0.01em] mb-1.5">{p.title}</h3>
                <p className="text-muted text-sm leading-[1.55]">{p.desc}</p>
              </Reveal>
            );
          })}
        </div>
      </Wrap>
    </section>
  );
}
