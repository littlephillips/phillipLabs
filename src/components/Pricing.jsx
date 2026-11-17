import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Wallet, Clock, ShieldCheck, Globe, LayoutDashboard, ArrowRight, Sparkles, HeartHandshake } from "lucide-react";
import { PACKAGES, SYSTEMS_PRICING, ADDONS, pricingTerms } from "../data/constants";
import { useSettings } from "../lib/settings";
import { sectionPad } from "../utils/layout";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import Segmented from "./Segmented";
import SnapCarousel from "./SnapCarousel";
import Wrap from "./Wrap";

function TierCard({ p, popular }) {
  return (
    <div className={`relative h-full flex flex-col p-4 sm:p-5 ${popular ? "card ring-2 ring-accent-strong shadow-[0_18px_40px_-18px_rgba(180,90,10,0.5)]" : "card"}`}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-[0.06em] leading-none">{p.tier}</h3>
          <div className="text-xs text-muted mt-1">{p.label}</div>
        </div>
        {popular && (
          <span className="inline-flex items-center gap-1 bg-accent-strong text-white text-[11px] font-bold uppercase tracking-[0.05em] px-2.5 py-1 rounded-md">
            <Sparkles size={11} aria-hidden="true" /> Most popular
          </span>
        )}
      </div>
      <div className="text-3xl font-extrabold leading-none"><span className="text-sm font-semibold text-muted">Ksh</span> {p.price}</div>
      <div className="text-xs text-muted mt-1 mb-3 pb-3 border-b border-line">{p.pages} · {p.revisions}</div>
      <ul className="flex flex-col gap-1.5 mb-3 flex-1 list-none p-0">
        {p.features.map((f) => (
          <li key={f} className="text-[13px] sm:text-sm flex gap-2 items-start leading-snug">
            <Check size={14} strokeWidth={2.75} className="shrink-0 mt-[3px] text-accent-strong" aria-hidden="true" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <p className="hidden sm:block text-xs text-muted mb-3 leading-[1.45]"><strong className="text-ink font-semibold">Best for:</strong> {p.best}</p>
      <Link
        to={`/contact?need=website&package=${p.tier}`}
        className={`group inline-flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm no-underline transition-[background-color,transform,box-shadow] hover:-translate-y-px ${
          popular
            ? "bg-accent-strong text-white shadow-[0_10px_22px_-8px_rgba(180,90,10,0.7)] hover:bg-accent-hover"
            : "bg-ink text-white shadow-[0_10px_22px_-10px_rgba(17,17,17,0.7)] hover:bg-[#2c2c2c]"
        }`}
      >
        Choose {p.tier} <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </Link>
    </div>
  );
}

function SystemsCard() {
  const s = SYSTEMS_PRICING;
  return (
    <div className="bg-ink text-white rounded-2xl p-5 sm:p-7 grid lg:grid-cols-[1.1fr_1fr_1fr] gap-5 lg:gap-8 shadow-[0_18px_40px_-20px_rgba(17,17,17,0.6)]">
      <div className="flex flex-col">
        <div className="text-xs font-bold uppercase tracking-[0.06em] text-accent mb-1.5">Business systems</div>
        <div className="text-4xl font-extrabold mb-2 leading-none"><span className="text-base font-semibold text-white/60">From Ksh</span> {s.price}</div>
        <p className="text-white/70 text-sm leading-[1.55] mb-4 max-w-[420px]">{s.intro}</p>
        <Link to="/contact?need=system" className="group mt-auto inline-flex items-center justify-center gap-2 w-fit bg-white text-ink px-5 py-3 rounded-xl font-bold text-sm no-underline shadow-[0_10px_22px_-8px_rgba(255,255,255,0.3)] hover:bg-surface-high">
          Book a free scoping call <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </div>
      <div>
        <div className="text-sm font-semibold mb-2">What you get</div>
        <ul className="flex flex-col gap-1.5 list-none p-0">
          {s.includes.map((i) => (
            <li key={i} className="flex gap-2 text-[13px] sm:text-sm text-white/80 leading-snug"><Check size={14} strokeWidth={2.75} className="text-accent shrink-0 mt-[3px]" aria-hidden="true" />{i}</li>
          ))}
        </ul>
      </div>
      <div>
        <div className="text-sm font-semibold mb-2">What decides the price</div>
        <ul className="flex flex-col gap-1.5 list-none p-0">
          {s.drivers.map((i) => (
            <li key={i} className="text-[13px] sm:text-sm text-white/70 pl-4 relative leading-snug before:content-[''] before:absolute before:left-0 before:top-[8px] before:w-1.5 before:h-1.5 before:rounded-full before:bg-white/30">{i}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Care plans sit right under the packages, in the same view, as a compact band.
function CareBand({ currency }) {
  return (
    <div className="card mt-4 p-3 sm:p-4">
      <div className="flex items-center justify-between gap-3 mb-2.5">
        <h3 className="inline-flex items-center gap-2 text-sm font-bold"><HeartHandshake size={16} className="text-accent-strong" aria-hidden="true" /> Care plans <span className="font-medium text-muted">(optional, monthly)</span></h3>
        <span className="hidden md:inline text-xs text-muted">{currency}</span>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {ADDONS.map((a) => (
          <div key={a.name} className="rounded-xl bg-surface px-3 py-2.5">
            <div className="font-semibold text-[13px] leading-tight">{a.name}</div>
            <div className="text-accent-strong text-sm font-bold">{a.price}</div>
            <div className="hidden sm:block text-muted text-xs leading-snug mt-0.5">{a.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const TABS = [
  { id: "websites", label: "Websites", icon: Globe },
  { id: "systems", label: "Business systems", icon: LayoutDashboard },
];

export default function Pricing({ standalone = false }) {
  const { depositPercent, popularTier } = useSettings();
  const terms = pricingTerms(depositPercent);
  const [tab, setTab] = useState("websites");

  return (
    <section id="pricing" className={sectionPad(standalone)}>
      <Wrap>
        <SectionHead standalone={standalone} title="Packages & pricing" sub="Websites have fixed packages. Systems are scoped on a call, then priced in writing." className="mb-3" />

        <Reveal as="ul" delay={70} className="flex flex-wrap gap-x-5 gap-y-1 mb-4 list-none p-0">
          {[[Wallet, terms.deposit], [Clock, terms.timeline], [ShieldCheck, terms.urgency]].map(([Icon, text], i) => (
            <li key={text} className={`items-center gap-2 text-[13px] text-muted ${i === 2 ? "hidden lg:inline-flex" : "inline-flex"}`}><Icon size={14} strokeWidth={2} className="text-accent-strong shrink-0" aria-hidden="true" />{text}</li>
          ))}
        </Reveal>

        <Segmented options={TABS} value={tab} onChange={setTab} label="Pricing type" className="mb-4 w-full sm:w-[380px]" />

        {tab === "websites" ? (
          <>
            <SnapCarousel className="md:hidden" label="Website packages" slideClass="w-[86%]" startAt={Math.max(0, PACKAGES.findIndex((p) => p.tier === popularTier))}>
              {PACKAGES.map((p) => <TierCard key={p.tier} p={p} popular={p.tier === popularTier} />)}
            </SnapCarousel>
            <div className="hidden md:grid grid-cols-3 gap-4 lg:gap-5 items-stretch">
              {PACKAGES.map((p, i) => <Reveal as="div" delay={i * 50} key={p.tier}><TierCard p={p} popular={p.tier === popularTier} /></Reveal>)}
            </div>
          </>
        ) : (
          <SystemsCard />
        )}

        <CareBand currency={terms.currency} />
      </Wrap>
    </section>
  );
}
