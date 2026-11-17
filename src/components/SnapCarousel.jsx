import { useRef, useState, useCallback, useEffect, Children } from "react";

// Mobile swipe carousel: CSS scroll-snap + dot indicators. No library.
// Children are the slides. Use `md:hidden` etc. from the parent to show it
// only on small screens.
export default function SnapCarousel({ children, label, slideClass = "w-[82%]", className = "", startAt = 0 }) {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const slides = Children.toArray(children);

  const onScroll = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    Array.from(el.children).forEach((child, i) => {
      const dist = Math.abs(child.offsetLeft + child.clientWidth / 2 - center);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setActive(best);
  }, []);

  // Open on a chosen slide (e.g. the "most popular" package) without scrolling the page.
  useEffect(() => {
    if (startAt > 0) {
      const el = ref.current;
      const child = el?.children[startAt];
      if (child) el.scrollTo({ left: child.offsetLeft - (el.clientWidth - child.clientWidth) / 2, behavior: "auto" });
    }
  }, [startAt]);

  const goTo = (i) => {
    const el = ref.current;
    const child = el?.children[i];
    if (child) el.scrollTo({ left: child.offsetLeft - (el.clientWidth - child.clientWidth) / 2, behavior: "smooth" });
  };

  return (
    <div className={className} role="region" aria-roledescription="carousel" aria-label={label}>
      <div
        ref={ref}
        onScroll={onScroll}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-3 -mx-gutter px-gutter [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((s, i) => (
          <div key={i} className={`snap-center shrink-0 ${slideClass}`} aria-label={`${i + 1} of ${slides.length}`}>
            {s}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-2 mt-3" role="tablist" aria-label={`${label} position`}>
        {slides.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === active}
            aria-label={`Go to ${i + 1} of ${slides.length}`}
            onClick={() => goTo(i)}
            className="p-2 -m-1 bg-transparent border-none cursor-pointer"
          >
            <span className={`block h-2 rounded-full transition-all ${i === active ? "w-6 bg-accent-strong" : "w-2 bg-line-strong"}`} />
          </button>
        ))}
      </div>
    </div>
  );
}
