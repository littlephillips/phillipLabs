import { useEffect, useRef } from "react";
import { X, Check, MessageCircle } from "lucide-react";
import { LANES } from "../data/constants";
import { useSettings } from "../lib/settings";
import { getIcon } from "../utils/icons";

export default function ServiceModal({ service, onClose }) {
  const { wa } = useSettings();
  const closeRef = useRef(null);
  const Icon = getIcon(service.icon);
  const lane = LANES.find((l) => l.id === service.lane);

  useEffect(() => {
    const prevFocus = document.activeElement;
    closeRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      prevFocus?.focus?.();
    };
  }, [onClose]);

  const msg = `Hi phillipLabs, I'd like to enquire about ${service.enquiry}. Can we talk?`;

  return (
    <div className="fixed inset-0 z-[1100] flex items-end sm:items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="svc-title">
      <div className="absolute inset-0 bg-[rgba(10,10,15,0.45)]" onClick={onClose} aria-hidden="true" />
      <div className="relative w-full sm:max-w-[560px] max-h-[90vh] overflow-y-auto bg-white rounded-t-3xl sm:rounded-2xl p-6 sm:p-8 shadow-[0_30px_80px_-20px_rgba(16,16,20,0.5)]">
        <button ref={closeRef} onClick={onClose} aria-label="Close" className="absolute top-4 right-4 w-10 h-10 rounded-full bg-surface-low hover:bg-surface-high flex items-center justify-center border-none cursor-pointer">
          <X size={18} />
        </button>
        <div className="w-11 h-11 rounded-xl bg-accent/10 text-accent-strong flex items-center justify-center mb-4">
          <Icon size={22} strokeWidth={1.75} />
        </div>
        <div className="text-[11px] font-bold uppercase tracking-[0.06em] text-accent-strong mb-1">{lane?.title}</div>
        <h2 id="svc-title" className="text-3xl font-semibold tracking-[-0.02em] mb-3">{service.title}</h2>
        <p className="text-muted mb-5 leading-[1.6]">{service.long}</p>
        <ul className="flex flex-col gap-2.5 mb-5 list-none p-0">
          {service.includes.map((i) => (
            <li key={i} className="flex gap-2.5 text-sm">
              <Check size={16} strokeWidth={2.5} className="text-accent-strong shrink-0 mt-0.5" aria-hidden="true" />
              {i}
            </li>
          ))}
        </ul>
        <p className="text-sm bg-surface-low rounded-xl px-4 py-3 mb-6">
          <strong className="font-semibold">Good for:</strong> <span className="text-muted">{service.goodFor}</span>
        </p>
        <div className="flex gap-3 flex-wrap">
          <a
            href={wa(msg)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-w-[180px] inline-flex items-center justify-center gap-2 bg-wa text-white px-5 py-3 rounded-lg font-semibold text-sm no-underline hover:brightness-110"
          >
            <MessageCircle size={16} aria-hidden="true" /> Enquire on WhatsApp
          </a>
          <button onClick={onClose} className="px-5 py-3 rounded-lg font-semibold text-sm bg-surface-low hover:bg-surface-high border-none cursor-pointer text-ink">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
