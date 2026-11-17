import { useState, useEffect, useRef } from "react";

// Scroll-reveal. Content must never stay invisible: reveal starts well
// before the element enters the viewport (rootMargin), reduced-motion and
// prerender show everything immediately.
export function useInView(threshold = 0.01) {
  const ref = useRef(null);
  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const noObserverSupport = typeof window !== "undefined" && !("IntersectionObserver" in window);
  const isPrerendering = typeof window !== "undefined" && window.__PRERENDER__ === true;
  const skip = prefersReducedMotion || noObserverSupport || isPrerendering;

  const [inView, setInView] = useState(skip);

  useEffect(() => {
    if (skip) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px 25% 0px" }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold, skip]);

  return [ref, inView];
}
