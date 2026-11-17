import { PROCESS } from "../data/constants";
import { getIcon } from "../utils/icons";
import { sectionPad } from "../utils/layout";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import Wrap from "./Wrap";

// One list, two layouts. Mobile: vertical timeline. Desktop: five step cards
// joined by a connector line. `compact` (Home) hides step descriptions on phones.
export default function Process({ standalone = false, compact = false }) {
  return (
    <section id="process" className={sectionPad(standalone)}>
      <Wrap>
        <SectionHead standalone={standalone} title="How it works" sub="Five steps, start to finish. No surprises on price or timeline." className="mb-6" />

        <ol className="relative list-none m-0 p-0 flex flex-col gap-5 lg:grid lg:grid-cols-5 lg:gap-4">
          <span aria-hidden="true" className="absolute left-[19px] top-3 bottom-3 w-0.5 bg-line-strong lg:hidden" />
          {PROCESS.map((p, i) => {
            const Icon = getIcon(p.icon);
            return (
              <Reveal as="li" delay={i * 50} key={p.step} className="relative flex gap-4 lg:card lg:flex-col lg:gap-3 lg:p-5">
                <div className="relative z-[1] shrink-0 w-10 h-10 rounded-full bg-accent-strong text-white flex items-center justify-center shadow-[0_0_0_5px_var(--color-surface)] lg:shadow-none lg:rounded-xl">
                  <Icon size={19} strokeWidth={1.75} aria-hidden="true" />
                </div>
                <div>
                  <div className="text-xs font-bold text-accent-strong tracking-[0.06em] mb-0.5">STEP {p.step}</div>
                  <h3 className="text-lg font-semibold tracking-[-0.01em] mb-1">{p.title}</h3>
                  <p className={`text-muted text-sm leading-[1.5] ${compact ? "hidden sm:block" : ""}`}>{p.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </Wrap>
    </section>
  );
}
