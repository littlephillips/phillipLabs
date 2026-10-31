import { useInView } from "../hooks/useInView";

export default function Reveal({ as: Tag = "div", className = "", delay = 0, children, ...rest }) {
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      className={`transition-all duration-400 ease-out motion-reduce:transition-none motion-reduce:transform-none ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      } ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
