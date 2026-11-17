// Segmented control with a sliding thumb. Used for Websites/Systems pricing
// and the Work filter. `options`: [{ id, label, icon?, count? }]
export default function Segmented({ options, value, onChange, label, className = "" }) {
  const n = options.length;
  const i = Math.max(0, options.findIndex((o) => o.id === value));
  return (
    <div
      role="tablist"
      aria-label={label}
      className={`relative grid p-1 rounded-xl bg-white shadow-[0_0_0_1px_rgba(40,28,8,0.1),inset_0_1px_2px_rgba(40,28,8,0.06)] ${className}`}
      style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
    >
      <span
        aria-hidden="true"
        className="absolute top-1 bottom-1 left-1 rounded-lg bg-ink shadow-[0_4px_10px_-2px_rgba(17,17,17,0.45)] transition-transform duration-300 ease-out motion-reduce:transition-none"
        style={{ width: `calc((100% - 8px) / ${n})`, transform: `translateX(${i * 100}%)` }}
      />
      {options.map(({ id, label: text, icon: Icon, count }) => {
        const on = id === value;
        return (
          <button
            key={id}
            role="tab"
            aria-selected={on}
            onClick={() => onChange(id)}
            className={`relative z-[1] inline-flex items-center justify-center gap-2 px-3 sm:px-5 py-2.5 rounded-lg text-sm font-semibold border-none bg-transparent cursor-pointer whitespace-nowrap transition-colors duration-300 ${on ? "text-white" : "text-muted hover:text-ink"}`}
          >
            {Icon && <Icon size={16} strokeWidth={2} aria-hidden="true" />}
            {text}
            {count !== undefined && <span className={`text-xs tabular-nums ${on ? "text-white/60" : "text-muted/70"}`}>{count}</span>}
          </button>
        );
      })}
    </div>
  );
}
