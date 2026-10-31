import { STATS } from "../data/constants";
import Reveal from "./Reveal";
import Wrap from "./Wrap";

export default function ProofStrip() {
  return (
    <section className="border-t border-b border-line">
      <Wrap className="grid grid-cols-2 sm:grid-cols-4 gap-5 py-8">
        {STATS.map(([num, label], i) => (
          <Reveal as="div" delay={i * 60} key={label} className="text-center">
            <div className="text-2xl font-bold">{num}</div>
            <div className="text-xs text-muted">{label}</div>
          </Reveal>
        ))}
      </Wrap>
    </section>
  );
}
