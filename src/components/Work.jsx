import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS as FALLBACK_PROJECTS } from "../data/constants";
import { listPublishedProjects } from "../lib/projects";
import Reveal from "./Reveal";
import BrowserFrame from "./BrowserFrame";
import Wrap from "./Wrap";

function urlLabelFor(p) {
  return p.url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export default function Work() {
  // Firestore is the source of truth; the static array in constants.js is
  // kept only as a fallback so the section still renders something if
  // Firestore is empty, misconfigured, or the request fails (e.g. before
  // the "projects" collection has been seeded via the admin panel).
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);

  useEffect(() => {
    let cancelled = false;
    listPublishedProjects()
      .then((data) => {
        if (!cancelled && data.length > 0) setProjects(data);
      })
      .catch(() => {
        // keep the fallback silently, a broken Firestore config shouldn't
        // take the whole Work section down
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="work" className="py-section">
      <Wrap>
        <Reveal as="h2" className="text-4xl font-semibold tracking-[-0.02em] mb-2.5">
          Recent work
        </Reveal>
        <Reveal as="p" delay={40} className="text-muted max-w-[620px] mb-8">
          Real client projects, sites and dashboards. All links open the live project.
        </Reveal>

        <div className="flex flex-wrap justify-center gap-6">
          {projects.map((p, i) => (
            <Reveal
              as="div"
              delay={(i % 3) * 45}
              key={p.id || p.title}
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
            >
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="group block no-underline text-inherit">
                <div className="relative rounded-xl border border-line overflow-hidden shadow-[0_1px_2px_rgba(16,16,20,0.04)] transition-[transform,box-shadow] group-hover:-translate-y-[5px] group-hover:shadow-[0_22px_40px_-18px_rgba(16,16,20,0.28)]">
                  {p.img ? (
                    <BrowserFrame
                      src={p.img}
                      alt={`${p.title} screenshot`}
                      urlLabel={urlLabelFor(p)}
                      cropped
                      className="border-none"
                      imgClassName="transition-transform duration-[400ms] group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 px-3 py-2.5 bg-[#f2f2f2] border-b border-line">
                        <span className="w-2 h-2 rounded-full bg-[#e3564a]" />
                        <span className="w-2 h-2 rounded-full bg-[#e8ac3d]" />
                        <span className="w-2 h-2 rounded-full bg-[#3fb950]" />
                        <span className="ml-2 flex-1 bg-white border border-line rounded-[5px] px-2.5 py-0.5 text-[11px] text-muted overflow-hidden text-ellipsis whitespace-nowrap">
                          {urlLabelFor(p)}
                        </span>
                      </div>
                      <div
                        className="aspect-video flex items-center justify-center text-muted text-xs"
                        style={{ background: `linear-gradient(135deg, ${p.color}20, ${p.color}08)` }}
                      >
                        Screenshot coming soon
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-end justify-end p-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100 pointer-coarse:opacity-100 bg-gradient-to-t from-[rgba(10,10,15,0.55)] via-transparent to-transparent">
                    <span className="inline-flex items-center gap-1.5 bg-white text-ink text-xs font-bold px-[11px] py-1.5 rounded-full">
                      Visit site <ArrowUpRight size={14} strokeWidth={2.25} />
                    </span>
                  </div>
                </div>

                <div className="pt-4 px-0.5">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span
                      className="inline-block text-[11px] font-bold uppercase tracking-[0.04em] px-[9px] py-[3px] rounded-full text-white"
                      style={{ background: p.color }}
                    >
                      {p.tag}
                    </span>
                    {p.variant === "admin" && (
                      <span className="inline-block text-[11px] font-bold uppercase tracking-[0.04em] px-[9px] py-[3px] rounded-full border border-line-strong text-muted">
                        Admin dashboard
                      </span>
                    )}
                  </div>
                  <h3 className="text-base mt-[9px] mb-1.5">{p.title}</h3>
                  <p className="text-muted text-[0.85rem] mb-2.5 leading-[1.5] line-clamp-2">{p.desc}</p>
                  <div className="flex flex-wrap gap-[5px]">
                    {p.stack.slice(0, 4).map((s) => (
                      <span key={s} className="text-[11px] border border-line rounded-md px-[7px] py-0.5 text-muted">
                        {s}
                      </span>
                    ))}
                    {p.stack.length > 4 && (
                      <span className="text-[11px] border border-line rounded-md px-[7px] py-0.5 text-muted">
                        +{p.stack.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </Wrap>
    </section>
  );
}
