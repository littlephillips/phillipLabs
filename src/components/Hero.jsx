import { Link } from "react-router-dom";
import { Check, ArrowRight, Smartphone, LayoutDashboard, Wallet } from "lucide-react";
import { HERO } from "../data/constants";
import { useSettings } from "../lib/settings";
import Reveal from "./Reveal";
import BrowserFrame from "./BrowserFrame";
import Wrap from "./Wrap";

const CHIPS = [
  { icon: Smartphone, text: "Mobile-first", pos: "left-[-2%] top-[6%]" },
  { icon: Wallet, text: "M-Pesa ready", pos: "right-[-2%] bottom-[18%]" },
  { icon: LayoutDashboard, text: "Admin dashboards", pos: "left-[22%] bottom-[-4%]" },
];

// Three browser frames in one aspect-ratio box, percentages only (never
// overflows). On phones/tablets it becomes a faint backdrop behind the text.
function HeroVisual() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.07] blur-[2px] lg:blur-none lg:opacity-100 lg:static lg:overflow-visible lg:flex-[0.95] lg:min-w-0"
    >
      {/* soft accent glow behind the frames */}
      <div className="hidden lg:block absolute right-[6%] top-[10%] w-[70%] aspect-square rounded-full bg-accent/20 blur-[90px]" />
      <div className="relative mx-auto mt-10 w-[120%] -translate-x-[8%] lg:mt-0 lg:w-full lg:max-w-[620px] lg:translate-x-0 aspect-[5/4]">
        <div className="absolute right-0 top-0 w-[54%] rotate-[2deg]">
          <BrowserFrame src="/assets/img/work/allInvents_crm.jpg" alt="" urlLabel="allinevents admin" className="shadow-[0_24px_60px_-14px_rgba(10,10,15,0.25)]" />
        </div>
        <div className="absolute left-[4%] top-[16%] w-[76%] rotate-[-1deg] z-[1]">
          <BrowserFrame src="/assets/img/work/estakaparts.jpg" alt="" urlLabel="estakaparts.web.app" priority className="shadow-[0_30px_70px_-14px_rgba(10,10,15,0.3)]" />
        </div>
        <div className="absolute left-0 bottom-0 w-[56%] rotate-[-3deg] z-[2]">
          <BrowserFrame src="/assets/img/work/qwetumovers.jpg" alt="" urlLabel="qwetumovers.co.ke" className="shadow-[0_20px_44px_-12px_rgba(10,10,15,0.3)]" />
        </div>
        {CHIPS.map(({ icon: Icon, text, pos }) => (
          <span key={text} className={`hidden lg:inline-flex absolute z-[3] items-center gap-2 bg-white rounded-xl pl-3.5 pr-3.5 py-2 text-xs font-semibold shadow-[0_0_0_1px_rgba(40,28,8,0.08),0_10px_24px_-8px_rgba(40,28,8,0.3)] ${pos}`}>
            <span className="w-6 h-6 rounded-full bg-accent-strong/10 text-accent-strong flex items-center justify-center"><Icon size={13} strokeWidth={2.25} /></span>
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const { wa } = useSettings();
  return (
    <section id="hero" className="py-8 sm:py-12 lg:py-6 overflow-hidden relative lg:min-h-[calc(100svh-68px-104px)] lg:flex lg:items-center">
      <Wrap className="relative flex flex-col lg:flex-row items-center gap-8 w-full">
        <HeroVisual />
        <div className="relative z-10 min-w-0 w-full lg:flex-[1.05]">
          <Reveal as="h1" className="flex flex-col text-6xl mb-4 font-bold tracking-[-0.03em] leading-[1.08] text-ink">
            {HERO.headline}
            <span className="font-serif italic text-accent-strong font-normal mt-1">{HERO.headlineAccent}</span>
          </Reveal>

          <Reveal as="p" delay={80} className="text-lg text-muted max-w-[520px] mb-6">
            {HERO.sub}
          </Reveal>

          <Reveal as="div" delay={140} className="flex gap-3 flex-wrap mb-5">
            <a
              href={wa("Hi phillipLabs, I'd like to talk about a website or system for my business.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent-strong text-white px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl font-semibold no-underline text-[15px] sm:text-base shadow-[0_10px_24px_-6px_rgba(180,90,10,0.5)] transition-[background-color,transform] hover:bg-accent-hover hover:-translate-y-px"
            >
              {HERO.ctaPrimary} <ArrowRight size={18} aria-hidden="true" />
            </a>
            <Link to="/work" className="inline-flex items-center gap-2 bg-white px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl font-semibold no-underline text-[15px] sm:text-base text-ink shadow-[0_0_0_2px_var(--color-ink),0_6px_14px_-8px_rgba(17,17,17,0.5)] transition-[background-color,transform] hover:bg-ink hover:text-white hover:-translate-y-px">
              {HERO.ctaSecondary} <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </Reveal>

          <Reveal as="ul" delay={200} className="flex flex-wrap gap-x-5 gap-y-1.5 list-none m-0 p-0">
            {HERO.trust.map((t) => (
              <li key={t} className="inline-flex items-center gap-1.5 text-sm text-muted">
                <Check size={15} strokeWidth={2.5} className="text-accent-strong shrink-0" aria-hidden="true" />
                {t}
              </li>
            ))}
          </Reveal>
        </div>
      </Wrap>
    </section>
  );
}
