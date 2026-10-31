import { Check, Wallet, Clock, ShieldCheck } from "lucide-react";
import { getIcon } from "../utils/icons";
import { PACKAGES, ADDONS, PRICING_TERMS, waMsg } from "../data/constants";
import Reveal from "./Reveal";
import Wrap from "./Wrap";

export default function Pricing() {
  return (
    <section id="pricing" className="py-section bg-[#fafafa]">
      <Wrap>
        <Reveal as="h2" className="text-4xl font-semibold tracking-[-0.02em] mb-2.5">
          Packages & pricing
        </Reveal>
        <Reveal as="p" delay={40} className="text-muted max-w-[720px] mb-5">
          Start where your business is today. Every package can grow into the next, fixed price, agreed upfront.
        </Reveal>

        <Reveal as="div" delay={70} className="flex flex-wrap gap-x-[22px] gap-y-2.5 mb-8">
          <span className="inline-flex items-center gap-[7px] text-[0.85rem] text-muted">
            <Wallet size={15} strokeWidth={2} className="text-accent shrink-0" /> {PRICING_TERMS.deposit}
          </span>
          <span className="inline-flex items-center gap-[7px] text-[0.85rem] text-muted">
            <Clock size={15} strokeWidth={2} className="text-accent shrink-0" /> {PRICING_TERMS.timeline}
          </span>
          <span className="inline-flex items-center gap-[7px] text-[0.85rem] text-muted">
            <ShieldCheck size={15} strokeWidth={2} className="text-accent shrink-0" /> {PRICING_TERMS.urgency}
          </span>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PACKAGES.map((p, i) => {
            const Icon = getIcon(p.icon);
            return (
              <Reveal
                as="div"
                delay={i * 50}
                key={p.tier}
                className={`relative bg-white rounded-2xl px-5 pt-6 pb-[22px] flex flex-col transition-[transform,box-shadow] hover:-translate-y-[5px] ${
                  p.featured
                    ? "border border-accent shadow-[0_14px_32px_-16px_rgba(224,123,31,0.32)] hover:shadow-[0_20px_36px_-18px_rgba(16,16,20,0.2)]"
                    : "border border-line shadow-[0_1px_3px_rgba(16,16,20,0.04)] hover:shadow-[0_20px_36px_-18px_rgba(16,16,20,0.2)]"
                }`}
                style={{ borderTop: `3px solid ${p.color}` }}
              >
                {p.featured && (
                  <span className="absolute -top-3 left-5 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">
                    Most popular
                  </span>
                )}

                <div
                  className="w-9 h-9 rounded-[9px] flex items-center justify-center mb-3.5"
                  style={{ background: `${p.color}16`, color: p.color }}
                >
                  <Icon size={19} strokeWidth={1.75} />
                </div>
                <div className="text-sm font-bold uppercase tracking-[0.03em]">{p.tier}</div>
                <div className="text-xs text-muted mb-3.5">{p.label}</div>

                <div className="text-2xl font-bold mb-[3px]">
                  <span className="text-sm font-semibold text-muted">Ksh</span> {p.price}
                </div>
                <div className="text-xs text-muted mb-[18px]">
                  {p.pages} · {p.revisions}
                </div>

                <ul className="flex flex-col gap-[9px] mb-[18px] flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="text-sm flex gap-[9px] items-start">
                      <Check size={14} strokeWidth={2.5} className="shrink-0 mt-[3px]" style={{ color: p.color }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-xs text-muted mb-4 leading-[1.5]">
                  <strong className="text-ink font-semibold">Best for:</strong> {p.best}
                </p>

                <a
                  href={waMsg(`Hi phillipLabs, I'm interested in the ${p.tier} package (${p.label}). Can we talk?`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-center py-3 rounded-lg font-semibold text-sm no-underline transition-[filter] hover:brightness-105 ${
                    p.featured
                      ? "bg-accent text-white shadow-[0_10px_24px_rgba(224,123,31,0.32)]"
                      : "bg-transparent text-ink border border-line-strong"
                  }`}
                >
                  Get started
                </a>
              </Reveal>
            );
          })}
        </div>

        <Reveal as="div" delay={220} className="mt-12">
          <h3 className="text-lg font-semibold mb-3.5">Ongoing support add-ons</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {ADDONS.map((a) => (
              <div key={a.name} className="border border-line rounded-[10px] p-3.5 bg-white">
                <div className="font-semibold text-sm">{a.name}</div>
                <div className="text-accent text-sm font-semibold my-1">{a.price}</div>
                <div className="text-muted text-xs">{a.desc}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted mt-3.5">{PRICING_TERMS.currency}</p>
        </Reveal>
      </Wrap>
    </section>
  );
}
