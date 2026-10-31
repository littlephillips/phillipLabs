export default function Wrap({ as: Tag = "div", className = "", children, ...rest }) {
  return (
    <Tag className={`mx-auto max-w-[1440px] px-gutter ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
