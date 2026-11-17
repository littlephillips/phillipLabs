import Reveal from "./Reveal";

// Heading block shared by every section. `standalone` = the section is the
// whole page (own route), so it renders the page's single <h1>. On Home the
// sub-line is hidden on phones to keep the page short.
export default function SectionHead({ title, sub, standalone = false, className = "mb-5", subMobile = standalone }) {
  return (
    <div className={className}>
      <Reveal as={standalone ? "h1" : "h2"} className="text-4xl font-bold tracking-[-0.02em] mb-1.5">
        {title}
      </Reveal>
      {sub && (
        <Reveal as="p" delay={40} className={`text-muted max-w-[760px] ${subMobile ? "" : "hidden sm:block"}`}>
          {sub}
        </Reveal>
      )}
    </div>
  );
}
