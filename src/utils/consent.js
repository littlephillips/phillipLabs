const KEY = "pl_cookie_consent"; // "accepted" | "declined"
const CLARITY_ID = import.meta.env.VITE_CLARITY_ID || "w0xfvtimb6";

export function getConsent() {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function setConsent(value) {
  try {
    localStorage.setItem(KEY, value);
  } catch {
    /* ignore */
  }
  if (value === "accepted") loadAnalytics();
}

export function loadAnalytics() {
  if (typeof window === "undefined" || window.clarity) return;
  (function (c, l, a, r, i, t, y) {
    c[a] =
      c[a] ||
      function () {
        (c[a].q = c[a].q || []).push(arguments);
      };
    t = l.createElement(r);
    t.async = 1;
    t.src = "https://www.clarity.ms/tag/" + i;
    y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
  })(window, document, "clarity", "script", CLARITY_ID);
}

// If the person already consented on a previous visit, load analytics immediately.
export function initAnalyticsIfConsented() {
  if (getConsent() === "accepted") loadAnalytics();
}
