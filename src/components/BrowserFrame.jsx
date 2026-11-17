export default function BrowserFrame({ src, alt, urlLabel, priority = false, className = "", imgClassName = "", crop = false }) {
  return (
    <div className={`rounded-xl overflow-hidden bg-white ${className}`}>
      <div className="flex items-center gap-2 px-3 py-2.5 bg-surface-high">
        <span className="w-2 h-2 rounded-full bg-[#e3564a]" />
        <span className="w-2 h-2 rounded-full bg-[#e8ac3d]" />
        <span className="w-2 h-2 rounded-full bg-[#3fb950]" />
        {urlLabel && (
          <span className="ml-2 flex-1 bg-white rounded-[5px] px-2.5 py-0.5 text-[11px] text-muted overflow-hidden text-ellipsis whitespace-nowrap">
            {urlLabel}
          </span>
        )}
      </div>
      {/* Full screenshot, never cropped: width-driven height keeps every part visible. */}
      <div className={`bg-surface-low ${crop ? "lg:aspect-[2.7/1] lg:overflow-hidden" : ""}`}>
        <img
          src={src}
          alt={alt}
          width="900"
          height="435"
          loading={priority ? "eager" : "lazy"}
          fetchpriority={priority ? "high" : "auto"}
          decoding="async"
          className={`w-full h-auto block ${crop ? "lg:h-full lg:object-cover lg:object-top" : ""} ${imgClassName}`}
        />
      </div>
    </div>
  );
}
