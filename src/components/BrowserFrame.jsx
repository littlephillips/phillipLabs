export default function BrowserFrame({ src, alt, urlLabel, priority = false, cropped = false, className = "", imgClassName = "" }) {
  return (
    <div className={`rounded-xl overflow-hidden border border-line bg-white shadow-[0_1px_2px_rgba(16,16,20,0.04)] ${className}`}>
      <div className="flex items-center gap-2 px-3 py-2.5 bg-[#f2f2f2] border-b border-line">
        <span className="w-2 h-2 rounded-full bg-[#e3564a]" />
        <span className="w-2 h-2 rounded-full bg-[#e8ac3d]" />
        <span className="w-2 h-2 rounded-full bg-[#3fb950]" />
        {urlLabel && (
          <span className="ml-2 flex-1 bg-white border border-line rounded-[5px] px-2.5 py-0.5 text-[11px] text-muted overflow-hidden text-ellipsis whitespace-nowrap">
            {urlLabel}
          </span>
        )}
      </div>
      <div className={`overflow-hidden bg-[#f4f4f4] ${cropped ? "aspect-video" : ""}`}>
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          fetchpriority={priority ? "high" : "auto"}
          decoding={priority ? "sync" : "async"}
          className={`w-full block object-cover object-top ${cropped ? "h-full" : "h-auto"} ${imgClassName}`}
        />
      </div>
    </div>
  );
}
