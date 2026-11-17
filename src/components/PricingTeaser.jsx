import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { PACKAGES, SYSTEMS_PRICING, pricingTerms } from "../data/constants";
import { useSettings } from "../lib/settings";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import Wrap from "./Wrap";

// Home version of pricing: one card, five rows, one link. Full detail lives on /pricing.
export default function PricingTeaser() {
  const { depositPercent, popularTier } = useSettings();
  const terms = pricingTerms(depositPercent);
  const rows = [
    ...PACKAGES.map((p) => ({ name: p.tier, note: p.label, price: `Ksh ${p.price}`, to: `/contact?need=website&package=${p.tier}`, popular: p.tier === popularTier })),
    { name: "Systems", note: "Scoped on a call", price: `From Ksh ${SYSTEMS_PRICING.price}`, to: "/contact?need=system", dark: true },
  ];
  return (
    <section id="pricing" className="py-section">
      <Wrap className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-5 lg:gap-12 items-center">
        <div>
          <SectionHead title="Packages & pricing" sub="Fixed prices for websites. Systems are scoped on a free call." className="mb-3" />
          <p className="hidden sm:block text-sm text-muted mb-4">{terms.deposit} {terms.currency}</p>
          <Link to="/pricing" className="inline-flex items-center gap-2 bg-ink text-white px-5 py-3 rounded-xl font-bold text-sm no-underline hover:bg-[#2c2c2c]">
            See packages & care plans <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <Reveal as="ul" className="card list-none m-0 p-1.5 flex flex-col">
          {rows.map((r) => (
            <li key={r.name}>
              <Link to={r.to} className="group flex items-center justify-between gap-3 px-3.5 py-3 rounded-xl no-underline text-ink hover:bg-surface-low transition-colors">
                <span className="flex items-center gap-2.5 min-w-0">
                  <span className="font-extrabold text-sm uppercase tracking-[0.05em]">{r.name}</span>
                  {r.popular && <span className="inline-flex items-center gap-1 bg-accent-strong text-white text-[10px] font-bold uppercase tracking-[0.05em] px-2 py-0.5 rounded"><Sparkles size={10} aria-hidden="true" />Popular</span>}
                  <span className="hidden sm:inline text-xs text-muted truncate">{r.note}</span>
                </span>
                <span className="flex items-center gap-2 shrink-0">
                  <span className="font-bold">{r.price}</span>
                  <ArrowRight size={15} className="text-accent-strong transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </Reveal>
      </Wrap>
    </section>
  );
}
