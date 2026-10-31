import { getIcon } from "../utils/icons";
import { WHY } from "../data/constants";
import Reveal from "./Reveal";
import Wrap from "./Wrap";

export default function WhyMe() {
  return (
    <section className="py-section border-t border-b border-line">
      <Wrap>
        <Reveal as="h2" className="text-4xl font-semibold tracking-[-0.02em] mb-8">
          Why Us?
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {WHY.map((w, i) => {
            const Icon = getIcon(w.icon);
            return (
              <Reveal
                as="div"
                delay={i * 35}
                key={w.num}
                className="border border-line rounded-xl px-5 py-[22px] transition-[transform,box-shadow,border-color] hover:-translate-y-1 hover:shadow-[0_16px_30px_-18px_rgba(16,16,20,0.22)] hover:border-line-strong"
              >
                <div className="flex items-center justify-between mb-3.5">
                  <div className="w-[38px] h-[38px] rounded-[9px] bg-accent/10 text-accent flex items-center justify-center">
                    <Icon size={19} strokeWidth={1.75} />
                  </div>
                  <span className="text-sm font-bold text-line-strong">{w.num}</span>
                </div>
                <h3 className="text-xl font-semibold tracking-[-0.01em] mb-1.5">{w.title}</h3>
                <p className="text-muted text-sm leading-[1.55]">{w.desc}</p>
              </Reveal>
            );
          })}
        </div>
      </Wrap>
    </section>
  );
}
