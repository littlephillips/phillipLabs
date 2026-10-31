import { useState, useEffect, useRef } from "react";

export function useInView(threshold = 0.12) {
  const ref = useRef(null);
  // Default to visible if IntersectionObserver isn't available (very old
  // browsers, some crawlers, SSR) or if the user prefers reduced motion —
  // in both cases we'd rather show content than risk it never revealing.
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const noObserverSupport =
    typeof window !== "undefined" && !("IntersectionObserver" in window);
  // Set by scripts/prerender.mjs before the app boots, so the prerendered
  // HTML snapshot captures every section fully visible instead of only
  // whatever happened to be scrolled into view at capture time.
  const isPrerendering =
    typeof window !== "undefined" && window.__PRERENDER__ === true;

  const [inView, setInView] = useState(
    prefersReducedMotion || noObserverSupport || isPrerendering
  );

  useEffect(() => {
    if (prefersReducedMotion || noObserverSupport || isPrerendering) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      // Extend the viewport's bottom edge by 150px so elements start
      // revealing just before they're actually visible, not after —
      // this is what prevents the "pop in" / blank-then-appear flash on
      // fast scrolls or slower devices.
      { threshold, rootMargin: "0px 0px 150px 0px" }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold, prefersReducedMotion, noObserverSupport, isPrerendering]);

  return [ref, inView];
}
