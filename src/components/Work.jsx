import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronLeft, ChevronRight, ArrowRight, Globe, LayoutDashboard } from "lucide-react";
import { PROJECTS as FALLBACK_PROJECTS, WORK_KINDS } from "../data/constants";
import { listPublishedProjects } from "../lib/projects";
import Reveal from "./Reveal";
import BrowserFrame from "./BrowserFrame";
import SectionHead from "./SectionHead";
import Segmented from "./Segmented";
import SnapCarousel from "./SnapCarousel";
import { sectionPad } from "../utils/layout";
import Wrap from "./Wrap";

const PAGE_SIZE = 6;

const label = (p) => p.url.replace(/^https?:\/\//, "").replace(/\/$/, "");
// Firestore docs created before `kind` existed: admin variant => system.
const kindOf = (p) => p.kind || (p.variant === "admin" ? "system" : "website");

function ProjectCard({ p }) {
  const kind = kindOf(p);
  const KindIcon = kind === "system" ? LayoutDashboard : Globe;
  // Only real http(s) links are clickable (blocks javascript: and placeholders).
  const live = /^https?:\/\//i.test(p.url || "");
  const Wrapper = live ? "a" : "div";
  const props = live ? { href: p.url, target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <Wrapper {...props} className="card-interactive group flex flex-col h-full no-underline text-inherit p-2.5">
      <div className="relative">
        {p.img ? (
          <BrowserFrame src={p.img} alt={`${p.title} screenshot`} urlLabel={live ? label(p) : "preview"} className="ring-1 ring-black/5" crop />
        ) : (
          <div className="aspect-[2/1] rounded-xl bg-surface-high flex items-center justify-center text-xs text-muted">Preview coming soon</div>
        )}
        {/* Type marker sits on the screenshot corner: reads as a label, not a button */}
        <span className={`absolute top-8 left-2 inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-white shadow-[0_4px_10px_-2px_rgba(0,0,0,0.4)] backdrop-blur ${kind === "system" ? "bg-accent-strong/95" : "bg-ink/85"}`}>
          <KindIcon size={11} strokeWidth={2.5} aria-hidden="true" />
          {kind === "system" ? "System" : "Website"}{p.tag ? ` · ${p.tag}` : ""}
        </span>
      </div>
      <div className="px-2 pt-3 pb-1.5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-1">
          <h3 className="text-lg font-semibold tracking-[-0.01em] leading-tight">{p.title}</h3>
          {live && <ArrowUpRight size={18} className="shrink-0 text-accent-strong mt-0.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-label="Opens the live site" />}
        </div>
        <p className="text-muted text-sm leading-[1.45] line-clamp-2">{p.desc}</p>
      </div>
    </Wrapper>
  );
}

export default function Work({ standalone = false, limit }) {
  // Firestore is the source of truth; constants.js is the fallback when it is
  // empty, unreachable or not yet configured.
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const [kind, setKind] = useState("all");
  const [page, setPage] = useState(1);

  useEffect(() => {
    let cancelled = false;
    listPublishedProjects()
      .then((d) => !cancelled && d.length > 0 && setProjects(d))
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const counts = useMemo(() => {
    const c = { all: projects.length, website: 0, system: 0 };
    projects.forEach((p) => c[kindOf(p)]++);
    return c;
  }, [projects]);

  const filtered = useMemo(() => projects.filter((p) => kind === "all" || kindOf(p) === kind), [projects, kind]);
  const preview = limit ? filtered.slice(0, limit) : null;
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const shown = preview ?? filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const topRef = useRef(null);
  const pick = (id) => {
    setKind(id);
    setPage(1);
  };
  // After changing page keep the user at the top of the grid, not the footer.
  const goPage = (n) => {
    setPage(n);
    requestAnimationFrame(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };
  const options = WORK_KINDS.map((k) => ({ ...k, count: counts[k.id] }));

  return (
    <section id="work" className={sectionPad(standalone)}>
      <Wrap>
        <div ref={topRef} className="scroll-mt-[84px]" />
        <SectionHead standalone={standalone} title="Recent work" sub="Real client projects. Every one is live: open it and judge for yourself." className="mb-4" />

        {!limit && (
          <div className="flex items-center justify-between gap-3 mb-4">
            <Segmented options={options} value={kind} onChange={pick} label="Filter projects" className="w-full sm:w-auto sm:min-w-[380px]" />
            {pages > 1 && (
              <nav className="hidden md:flex items-center gap-1.5" aria-label="Pagination">
                <span className="text-sm text-muted mr-1 tabular-nums">{page} / {pages}</span>
                <button onClick={() => goPage(Math.max(1, page - 1))} disabled={page === 1} aria-label="Previous page" className="w-10 h-10 rounded-full bg-white shadow-[0_0_0_1px_rgba(40,28,8,0.12)] hover:bg-ink hover:text-white disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-inherit border-none cursor-pointer flex items-center justify-center transition-colors">
                  <ChevronLeft size={18} />
                </button>
                <button onClick={() => goPage(Math.min(pages, page + 1))} disabled={page === pages} aria-label="Next page" className="w-10 h-10 rounded-full bg-ink text-white hover:bg-accent-strong disabled:opacity-40 disabled:hover:bg-ink border-none cursor-pointer flex items-center justify-center transition-colors">
                  <ChevronRight size={18} />
                </button>
              </nav>
            )}
          </div>
        )}

        {/* Mobile: swipe carousel (users see the next card peeking). */}
        <SnapCarousel className="md:hidden" label="Projects" key={kind}>
          {(preview ?? filtered).map((p) => (
            <ProjectCard key={p.id || p.title} p={p} />
          ))}
        </SnapCarousel>

        {/* Tablet/desktop: grid, 6 per page (3 x 2). */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 items-stretch">
          {shown.map((p, i) => (
            <Reveal as="div" key={p.id || p.title} delay={(i % 3) * 45}>
              <ProjectCard p={p} />
            </Reveal>
          ))}
        </div>

        {limit && (
          <div className="mt-6 text-center">
            <Link to="/work" className="inline-flex items-center gap-2 bg-ink text-white px-6 py-3 rounded-lg font-semibold text-sm no-underline hover:bg-[#2a2a2a]">
              See all {projects.length} projects <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        )}
      </Wrap>
    </section>
  );
}
