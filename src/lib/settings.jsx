import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore/lite";
import { db, firebaseReady } from "./firebase";
import { DEFAULT_SETTINGS, waLink } from "../data/constants";
import { BOOKING_URL } from "../config/site";

// Public contact details, availability, stats and deposit % come from
// Firestore doc `settings/site`, merged over DEFAULT_SETTINGS. The site renders
// instantly with defaults and updates when (if) the doc loads. A failed or
// empty read never breaks the page.

const Ctx = createContext({ ...DEFAULT_SETTINGS, wa: (m) => waLink(DEFAULT_SETTINGS.phone, m), bookingHref: "#" });

const SETTINGS_REF = () => doc(db, "settings", "site");

export async function getSettings() {
  if (!firebaseReady) return {};
  const snap = await getDoc(SETTINGS_REF());
  const d = snap.exists() ? snap.data() : {};
  // Firestore cannot store nested arrays, so stats are saved as {value,label}.
  if (Array.isArray(d.stats)) {
    d.stats = d.stats.filter((r) => r && r.value && r.label).map((r) => [String(r.value), String(r.label)]);
    if (d.stats.length === 0) delete d.stats;
  }
  return d;
}

export async function saveSettings(data) {
  if (Array.isArray(data.stats)) data = { ...data, stats: data.stats.map(([value, label]) => ({ value, label })) };
  return setDoc(SETTINGS_REF(), { ...data, updatedAt: serverTimestamp() }, { merge: true });
}

export function SettingsProvider({ children }) {
  const [remote, setRemote] = useState({});

  useEffect(() => {
    let cancelled = false;
    getSettings()
      .then((d) => !cancelled && setRemote(d))
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(() => {
    const s = { ...DEFAULT_SETTINGS };
    for (const [k, v] of Object.entries(remote)) {
      if (k in DEFAULT_SETTINGS && v !== "" && v != null) s[k] = v;
    }
    const wa = (msg) => waLink(s.phone, msg);
    const bookingMsg = "Hi phillipLabs, I'd like to book a free 20-min call about a website or system for my business.";
    return {
      ...s,
      wa,
      hasScheduler: Boolean(BOOKING_URL),
      bookingHref: BOOKING_URL || wa(bookingMsg),
    };
  }, [remote]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useSettings = () => useContext(Ctx);
