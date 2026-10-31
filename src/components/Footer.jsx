import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Mail, Clock, MapPin} from "lucide-react";
import { SOCIALS, EMAIL, NAV_LINKS, BOOKING_URL, LOCATION } from "../data/constants";
import Wrap from "./Wrap";

export default function Footer() {
  const year = new Date().getFullYear();
  const { pathname } = useLocation();
  const showCtaBand = pathname !== "/";

  return (
    <footer className="border-t border-line bg-[#fafafa]">
      {/* Closing CTA band */}
      {showCtaBand && (
        <div className="bg-[#0b0b10]">
          <Wrap className="py-10 flex items-center justify-between flex-wrap gap-5">
            <div>
              <h2 className="text-white text-2xl mb-1">Got a project in mind?</h2>
              <p className="text-white/55 text-sm">Free 20-min call. No pressure, no obligation.</p>
            </div>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent text-white px-[22px] py-3 rounded-lg font-semibold no-underline shrink-0 transition-[filter,transform] hover:brightness-105 hover:-translate-y-px"
            >
              Text Us on WhatsApp <ArrowRight size={16} strokeWidth={2.25} />
            </a>
          </Wrap>
        </div>
      )}

      {/* Link columns - flex clusters, not a stretched grid track (fixed a dead-space bug earlier) */}
      <Wrap className="py-11 pb-7 flex justify-between flex-wrap gap-x-[60px] gap-y-10">
        <div>
          <div className="flex items-center gap-[9px] mb-3">
            <img src="/assets/img/logo-mark.png" alt="" className="w-7 h-7 object-contain rounded-[7px] bg-ink" />
            <span className="font-bold text-[1.05rem]">
              phillip<span className="text-accent">Labs</span>
            </span>
          </div>
          <p className="text-muted text-sm max-w-[280px] leading-[1.55]">
            Nairobi-based web developer. Websites and business systems for Kenyan SMBs.
          </p>
          <div className="flex items-center gap-1.5 mt-3 text-xs text-muted">
            <Clock size={13} strokeWidth={2} />
            Usually replies within a few hours
          </div>
        </div>

        <div className="flex gap-36 flex-wrap">
          <div className="flex flex-col gap-2.5">
            <div className="text-[11px] font-bold uppercase tracking-[0.05em] text-muted mb-0.5 ">Services</div>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {["Marketing Websites","CRM & Dashboards","Internal tools", "E-commerce","SEO & Performance","WhatsApp Integration","Website Maintenance"].map(s => (
                <span key={s} className="text-sm text-ink no-underline w-fit hover:text-accent">{s}</span>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col gap-2.5">
            <div className="text-[11px] font-bold uppercase tracking-[0.05em] text-muted mb-0.5">Site</div>
            {NAV_LINKS.map((link) =>
              link === "Blog" ? (
                <Link key={link} to="/blog" className="text-sm text-ink no-underline w-fit hover:text-accent">
                  {link}
                </Link>
              ) : (
                <a key={link} href={`/#${link.toLowerCase()}`} className="text-sm text-ink no-underline w-fit hover:text-accent">
                  {link}
                </a>
              )
            )}
          </div>

          <div className="flex flex-col gap-2.5">
            <div className="text-[11px] font-bold uppercase tracking-[0.05em] text-muted mb-0.5 ">Legal & contact</div>
            <Link to="/privacy" className="text-sm text-ink no-underline w-fit hover:text-accent">Privacy Policy</Link>

            <a
              target="_blank" rel="noopener noreferrer" href={`mailto:${EMAIL}`} className="text-sm text-muted no-underline w-fit inline-flex items-center gap-1.5 hover:text-accent">
              <Mail size={13} strokeWidth={2} /> {EMAIL} </a>

            <span className="text-sm text-muted no-underline w-fit inline-flex items-center gap-1.5 hover:text-accent">
              <MapPin size={13} strokeWidth={2} /> {LOCATION}</span>
          </div>
        </div>
      </Wrap>

      {/* Bottom bar */}
      <Wrap className="border-t border-line py-5 flex justify-between items-center flex-wrap gap-3">
        <span className="text-xs text-muted">© {year} phillip<span className="text-accent">Labs</span>. All rights reserved.</span>
        <div className="flex gap-2 flex-wrap justify-end max-sm:justify-start">
          {SOCIALS.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              title={s.name}
              className="w-8 h-8 max-sm:w-11 max-sm:h-11 border border-line rounded-lg flex items-center justify-center text-muted transition-colors hover:border-line-strong hover:text-accent"
            >
              <span className="w-[13px] h-[13px] flex" dangerouslySetInnerHTML={{ __html: s.svg }} />
            </a>
          ))}
        </div>
      </Wrap>
    </footer>
  );
}
