import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Mail, Clock, MapPin, Phone } from "lucide-react";
import { SOCIALS, NAV_LINKS, SERVICES, LANES } from "../data/constants";
import { useSettings } from "../lib/settings";
import SocialIcon from "./SocialIcon";
import Wrap from "./Wrap";

const head = "text-[11px] font-bold uppercase tracking-[0.06em] text-muted mb-1";
const link = "text-sm text-ink no-underline w-fit hover:text-accent-strong";

export default function Footer() {
  const year = new Date().getFullYear();
  const { pathname } = useLocation();
  const { email, location, phone, wa } = useSettings();
  // The closing CTA band shows on inner pages only: Home and Contact already end on a CTA.
  const showCtaBand = pathname !== "/" && pathname !== "/contact";

  return (
    <footer className="bg-surface-low pb-16 lg:pb-0">
      {showCtaBand && (
        <div className="bg-ink">
          <Wrap className="py-6 flex items-center justify-between flex-wrap gap-5">
            <div>
              <h2 className="text-white text-xl font-semibold mb-0.5">Got a project in mind?</h2>
              <p className="text-white/60 text-sm">Free 20-min call. No pressure, no obligation.</p>
            </div>
            <a href={wa("Hi phillipLabs! I have a project in mind.")} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent-strong text-white px-[22px] py-3 rounded-lg font-semibold no-underline shrink-0 hover:bg-accent-hover">
              Chat on WhatsApp <ArrowRight size={16} aria-hidden="true" />
            </a>
          </Wrap>
        </div>
      )}

      <Wrap className="pt-8 pb-6 grid grid-cols-2 gap-x-6 gap-y-7 lg:grid-cols-[1.5fr_1fr_0.7fr_1.3fr] lg:gap-x-10">
        <div className="col-span-2 lg:col-span-1">
          <div className="flex items-center gap-[9px] mb-2.5">
            <img src="/assets/img/logo-mark.png" alt="" width="28" height="28" className="w-7 h-7 object-contain rounded-[7px] bg-ink" />
            <span className="font-bold text-[1.05rem]">phillip<span className="text-accent-strong">Labs</span></span>
          </div>
          <p className="text-muted text-sm max-w-[300px] leading-[1.5] mb-3">
            Websites and the business systems behind them, built in Nairobi for Kenyan businesses.
          </p>
          <p className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted m-0">
            <span className="inline-flex items-center gap-1.5"><Clock size={13} aria-hidden="true" />Replies within hours</span>
            <span className="inline-flex items-center gap-1.5"><MapPin size={13} aria-hidden="true" />{location}</span>
          </p>
        </div>

        <nav aria-label="Services" className="flex flex-col gap-2">
          <div className={head}>Services</div>
          {LANES.map((lane) => SERVICES.filter((s) => s.lane === lane.id).map((s) => (
            <Link key={s.slug} to={`/services?service=${s.slug}`} className={link}>{s.title}</Link>
          )))}
        </nav>

        <nav aria-label="Site" className="flex flex-col gap-2">
          <div className={head}>Site</div>
          {NAV_LINKS.filter((l) => l.to !== "/contact").map((l) => <Link key={l.to} to={l.to} className={link}>{l.label}</Link>)}
        </nav>

        <div className="col-span-2 lg:col-span-1 flex flex-col gap-2">
          <div className={head}>Talk to us</div>
          <div className="flex flex-wrap lg:flex-col gap-x-6 gap-y-2">
            <a href={wa("Hi phillipLabs!")} target="_blank" rel="noopener noreferrer" className={`${link} inline-flex items-center gap-1.5`}><Phone size={13} aria-hidden="true" />+{phone}</a>
            <a href={`mailto:${email}`} className={`${link} inline-flex items-center gap-1.5 break-all`}><Mail size={13} aria-hidden="true" />{email}</a>
            <Link to="/privacy" className={link}>Privacy Policy</Link>
          </div>
          <div className="flex gap-2 flex-wrap mt-1.5">
            {SOCIALS.filter((s) => s.url).map((s) => (
              <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.name} title={s.name}
                className="w-10 h-10 bg-white rounded-lg shadow-[0_0_0_1px_rgba(40,28,8,0.08)] flex items-center justify-center text-muted transition-colors hover:text-accent-strong">
                <SocialIcon id={s.id} size={15} />
              </a>
            ))}
          </div>
        </div>
      </Wrap>

      <div className="bg-surface-high">
        <Wrap className="py-3 flex justify-between items-center flex-wrap gap-2 text-xs text-muted">
          <span>© {year} phillip<span className="text-accent-strong">Labs</span>. All rights reserved.</span>
        </Wrap>
      </div>
    </footer>
  );
}
