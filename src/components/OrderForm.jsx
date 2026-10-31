import { useState } from "react";
import { PACKAGES, waMsg } from "../data/constants";

const inputClass =
  "w-full bg-white border border-line-strong rounded-lg px-3.5 py-3 text-[16px] text-ink font-sans outline-none box-border focus:border-accent";
const labelClass = "text-xs font-semibold text-muted block mb-1.5";

export default function OrderForm() {
  const [form, setForm] = useState({ name: "", business: "", package: "Bronze", details: "" });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const send = () => {
    if (!form.name || !form.business) {
      alert("Please fill your name and business name.");
      return;
    }
    const msg = `Hi Phillip!\n\nI'd like to order a website.\n\nName: ${form.name}\nBusiness: ${form.business}\nPackage: ${form.package}\nDetails: ${form.details || "Not specified"}`;
    window.open(waMsg(msg), "_blank");
  };

  return (
    <div className="border border-line rounded-2xl px-[26px] py-7 bg-white">
      <h3 className="text-lg font-semibold mb-1.5">Quick order via WhatsApp</h3>
      <p className="text-sm text-muted mb-6">Fill in the basics, straight to WhatsApp. No long forms.</p>

      <div className="flex flex-col gap-4">
        {[
          { k: "name", label: "Your name", ph: "Jane Mwangi" },
          { k: "business", label: "Business name", ph: "Mama's Kitchen" },
        ].map(({ k, label, ph }) => (
          <div key={k}>
            <label className={labelClass}>{label}</label>
            <input value={form[k]} onChange={set(k)} placeholder={ph} className={inputClass} />
          </div>
        ))}
        <div>
          <label className={labelClass}>Package</label>
          <select value={form.package} onChange={set("package")} className={`${inputClass} cursor-pointer`}>
            {PACKAGES.map((p) => (
              <option key={p.tier} value={p.tier}>
                {p.tier} — Ksh {p.price}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Project details</label>
          <textarea
            value={form.details}
            onChange={set("details")}
            rows={4}
            placeholder="Describe your business, what you need, any specific features..."
            className={`${inputClass} resize-y`}
          />
        </div>
        <button
          onClick={send}
          className="bg-wa text-white border-none px-5 py-[14px] text-base font-semibold rounded-lg w-full cursor-pointer transition-[filter] hover:brightness-105"
        >
          Send via WhatsApp
        </button>
      </div>
    </div>
  );
}
