import { useEffect, useState } from "react";
import { getSettings, saveSettings } from "../../lib/settings";
import { DEFAULT_SETTINGS, PACKAGES } from "../../data/constants";

const inputCls = "w-full px-3 py-2.5 border border-line-strong rounded-lg text-sm";

function Field({ label, hint, children }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">{label}</label>
      {children}
      {hint && <p className="text-xs text-muted mt-1">{hint}</p>}
    </div>
  );
}

// Everything an owner may need to change without a developer: contact
// details, availability, headline numbers, deposit %. Saved to settings/site.
export default function Settings() {
  const [form, setForm] = useState(null);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getSettings()
      .then((remote) => setForm({ ...DEFAULT_SETTINGS, ...remote }))
      .catch(() => setForm({ ...DEFAULT_SETTINGS }));
  }, []);

  if (!form) return <p className="text-sm text-muted">Loading…</p>;

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const setStat = (i, j, v) => set("stats", form.stats.map((row, r) => (r === i ? row.map((c, k) => (k === j ? v : c)) : row)));

  async function save() {
    setSaving(true);
    setStatus("");
    try {
      const phone = String(form.phone).replace(/\D/g, "");
      const deposit = Math.min(90, Math.max(10, Number(form.depositPercent) || 40));
      await saveSettings({
        phone,
        email: String(form.email).trim(),
        location: String(form.location).trim(),
        available: Boolean(form.available),
        availability: String(form.availability).trim(),
        depositPercent: deposit,
        popularTier: PACKAGES.some((p) => p.tier === form.popularTier) ? form.popularTier : DEFAULT_SETTINGS.popularTier,
        stats: form.stats.map(([n, l]) => [String(n), String(l)]), // saved as {value,label} by saveSettings
      });
      setStatus("Saved. The public site picks it up on the next page load.");
    } catch (e) {
      setStatus("Could not save: " + (e.message || "unknown error"));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-[-0.02em] mb-6">Site settings</h1>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <Field label="WhatsApp / phone" hint="Digits only with country code, e.g. 254710715653"><input className={inputCls} value={form.phone} onChange={(e) => set("phone", e.target.value)} /></Field>
        <Field label="Email"><input className={inputCls} value={form.email} onChange={(e) => set("email", e.target.value)} /></Field>
        <Field label="Location"><input className={inputCls} value={form.location} onChange={(e) => set("location", e.target.value)} /></Field>
        <Field label="Deposit %" hint="Shown across pricing and FAQ. 10–90."><input type="number" className={inputCls} value={form.depositPercent} onChange={(e) => set("depositPercent", e.target.value)} /></Field>
        <Field label="Most popular package" hint="Gets the highlighted badge on the pricing page.">
          <select className={inputCls} value={form.popularTier} onChange={(e) => set("popularTier", e.target.value)}>
            {PACKAGES.map((p) => <option key={p.tier} value={p.tier}>{p.tier}</option>)}
          </select>
        </Field>
        <Field label="Availability text"><input className={inputCls} value={form.availability} onChange={(e) => set("availability", e.target.value)} /></Field>
        <Field label="Taking new projects?">
          <label className="flex items-center gap-2 mt-2.5 text-sm"><input type="checkbox" checked={form.available} onChange={(e) => set("available", e.target.checked)} /> Show the green “available” dot</label>
        </Field>
      </div>

      <h2 className="text-sm font-semibold mt-6 mb-2">Headline numbers (only real, provable ones)</h2>
      <div className="grid gap-2 mb-6">
        {form.stats.map(([n, l], i) => (
          <div key={i} className="grid grid-cols-[120px_1fr] gap-2">
            <input className={inputCls} value={n} onChange={(e) => setStat(i, 0, e.target.value)} aria-label={`Stat ${i + 1} value`} />
            <input className={inputCls} value={l} onChange={(e) => setStat(i, 1, e.target.value)} aria-label={`Stat ${i + 1} label`} />
          </div>
        ))}
      </div>

      <button onClick={save} disabled={saving} className="px-4 py-2.5 bg-[#111111] text-white rounded-lg text-sm font-semibold disabled:opacity-60 border-none cursor-pointer">{saving ? "Saving…" : "Save settings"}</button>
      {status && <p role="status" className="text-sm text-muted mt-3">{status}</p>}
    </div>
  );
}
