import { HERO, BOOKING_URL } from "../data/constants";
import Reveal from "./Reveal";
import BrowserFrame from "./BrowserFrame";
import Wrap from "./Wrap";

export default function Hero() {
  return (
    <section id="hero" className="py-8 sm:py-12 lg:py-[60px] overflow-hidden relative">
      <Wrap className="flex flex-col lg:flex-row items-center gap-10">
        <div className="min-w-0 w-full lg:flex-[1.05]">
          <Reveal as="h1" className="flex flex-col text-6xl mb-5 font-bold tracking-[-0.03em] leading-[1.08] text-ink">
            {HERO.headline}
            <span className="font-serif italic text-accent font-normal mt-0.5">{HERO.headlineAccent}</span>
          </Reveal>

          <Reveal as="p" delay={80} className="text-lg text-muted max-w-[560px] mb-[30px]">
            {HERO.sub}
          </Reveal>

          <Reveal as="div" delay={140} className="flex gap-3.5 flex-wrap">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent text-white px-[26px] py-3.5 rounded-lg font-semibold no-underline text-base shadow-[0_8px_22px_rgba(224,123,31,0.3)] transition-[filter,transform] hover:brightness-105 hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              {HERO.ctaPrimary} →
            </a>
            <a
              href="#work"
              className="border border-line-strong px-[26px] py-3.5 rounded-lg font-semibold no-underline text-base text-ink transition-colors hover:bg-[#f7f7f7] hover:border-muted focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              {HERO.ctaSecondary}
            </a>
          </Reveal>
        </div>

        {/* Real product mockup, anchors the "systems, not just sites" */}
        <Reveal as="div" delay={120} className="min-w-0 w-full lg:flex-[0.95] relative mt-10 lg:mt-0">
          <div
            aria-hidden="true"
            className="absolute rounded-full border-[1.7px] border-accent opacity-55 pointer-events-none w-[260px] h-[260px] -top-[30px] -right-5 rotate-[-18deg] sm:w-[340px] sm:h-[340px] sm:-right-10 lg:w-[460px] lg:h-[460px] lg:-top-[60px] lg:-right-20"
          />


          <div className="hidden sm:block absolute -top-[88px] -right-20 w-[50%] lg:w-[78%] rotate-[2deg] z-[-2]">
            <BrowserFrame
              src="/assets/img/work/estakapart_crm.jpg"
              alt="A marketing website built by phillipLabs, for an event planner company"
              urlLabel="allinevents.org/admin"
              priority
              className="shadow-[0_34px_100px_-14px_rgba(10,10,15,0.28)]"
            />
          </div>

          <div className="relative rotate-[1.2deg]">
            <BrowserFrame
              src="/assets/img/work/estakaparts.png"
              alt="A marketing website built by phillipLabs, showing products, active items and an contact details"
              urlLabel="estakaparts.co.ke/"
              priority
              className="shadow-[0_24px_60px_-14px_rgba(10,10,15,0.28)]"
            />
          </div>

          <div className="hidden sm:block absolute -bottom-[46px] -left-16 w-[55%] lg:w-[68%] rotate-[-3deg] z-[2]">
            <BrowserFrame
              src="/assets/img/work/qwetumovers.jpg"
              alt="A client-facing business website built by phillipLabs"
              urlLabel="qwetumovers.co.ke"
              className="shadow-[0_20px_44px_-12px_rgba(10,10,15,0.3)]"
            />
          </div>
        </Reveal>
      </Wrap>
    </section>
  );
}
