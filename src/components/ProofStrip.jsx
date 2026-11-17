import { useSettings } from "../lib/settings";
import Wrap from "./Wrap";

// Sits directly under the hero so it is visible on first landing.
export default function ProofStrip() {
  const { stats } = useSettings();
  return (
    <section aria-label="At a glance" className="pb-6 lg:pb-8">
      <Wrap>
        <ul className="card grid grid-cols-2 sm:grid-cols-4 list-none m-0 p-0 overflow-hidden">
          {stats.map(([num, label], i) => (
            <li key={label} className={`text-center py-4 px-3 ${i % 2 === 1 ? "border-l border-line" : ""} ${i > 1 ? "border-t border-line sm:border-t-0" : ""} ${i > 0 ? "sm:border-l sm:border-line" : ""}`}>
              <div className="text-2xl font-bold leading-tight">{num}</div>
              <div className="text-xs text-muted">{label}</div>
            </li>
          ))}
        </ul>
      </Wrap>
    </section>
  );
}
