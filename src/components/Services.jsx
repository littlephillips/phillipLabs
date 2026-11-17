import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SERVICES, LANES } from "../data/constants";
import { getIcon } from "../utils/icons";
import { sectionPad } from "../utils/layout";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import ServiceModal from "./ServiceModal";
import Wrap from "./Wrap";

function ServiceCard({ s, onOpen, compact }) {
  const Icon = getIcon(s.icon);
  return (
    <button
      onClick={() => onOpen(s.slug)}
      aria-haspopup="dialog"
      className="card-interactive group w-full h-full text-left p-4 sm:p-5 border-none cursor-pointer flex flex-col"
    >
      <div className="flex items-center gap-3 mb-2">
        <span className="w-10 h-10 shrink-0 rounded-[10px] bg-accent-strong/10 text-accent-strong flex items-center justify-center">
          <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
        </span>
        <h4 className="text-base sm:text-lg font-semibold tracking-[-0.01em] text-ink leading-tight">{s.title}</h4>
      </div>
      <p className={`text-muted text-sm leading-[1.5] mb-3 flex-1 ${compact ? "hidden sm:block" : ""}`}>{s.short}</p>
      <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent-strong mt-auto">
        Details <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </button>
  );
}

// Lane titles carry the weight (big, dark, with a rule); cards stay lighter.
function LaneHead({ lane }) {
  return (
    <div className="flex items-center gap-4 mb-3">
      <h3 className="text-2xl font-extrabold tracking-[-0.02em] text-ink whitespace-nowrap">{lane.title}</h3>
      <span className="hidden sm:inline text-sm text-muted whitespace-nowrap">{lane.tagline}</span>
      <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-ink/25 to-transparent" />
    </div>
  );
}

// Cards open a detail modal. Open state lives in the URL (?service=slug) so
// footer links, shared links and the back button all work.
// `compact` (Home): short tiles, all six in one grid, link to the full page.
export default function Services({ standalone = false, compact = false }) {
  const [params, setParams] = useSearchParams();
  const open = SERVICES.find((s) => s.slug === params.get("service"));
  const openService = (slug) => setParams({ service: slug }, { preventScrollReset: true });
  const close = () => setParams({}, { preventScrollReset: true });
  // Pack lanes into rows of three cards so every row is full (3 | 2+1).
  const rows = [];
  let cur = [];
  let n = 0;
  LANES.forEach((l) => {
    const c = SERVICES.filter((s) => s.lane === l.id).length;
    if (!c) return;
    if (n + c > 3) { rows.push(cur); cur = []; n = 0; }
    cur.push(l);
    n += c;
  });
  if (cur.length) rows.push(cur);

  return (
    <section id="services" className={sectionPad(standalone)}>
      <Wrap>
        <SectionHead standalone={standalone} title="What we build" sub="Websites first. When the business outgrows a website, the systems behind it." />

        {compact ? (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {SERVICES.map((s, i) => (
                <Reveal as="div" delay={i * 30} key={s.slug}><ServiceCard s={s} onOpen={openService} compact /></Reveal>
              ))}
            </div>
            <div className="mt-5">
              <Link to="/services" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-strong">See all services <ArrowRight size={14} aria-hidden="true" /></Link>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-6">
            {rows.map((row, ri) => (
              <div key={ri} className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-x-5">
                {row.map((lane) => {
                  const items = SERVICES.filter((s) => s.lane === lane.id);
                  const span = { 1: "lg:col-span-1", 2: "lg:col-span-2", 3: "lg:col-span-3" }[items.length] || "lg:col-span-3";
                  const cols = { 1: "sm:grid-cols-1", 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3" }[items.length] || "sm:grid-cols-2 lg:grid-cols-3";
                  return (
                    <div key={lane.id} className={span}>
                      <LaneHead lane={lane} />
                      <div className={`grid grid-cols-1 gap-4 ${cols}`}>
                        {items.map((s, i) => (
                          <Reveal as="div" delay={i * 40} key={s.slug}><ServiceCard s={s} onOpen={openService} /></Reveal>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </Wrap>
      {open && <ServiceModal service={open} onClose={close} />}
    </section>
  );
}
