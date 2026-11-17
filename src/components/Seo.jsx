import { Helmet } from "react-helmet-async";
import { siteUrl } from "../config/site";

// One place for per-route metadata. Titles <= 60 chars, descriptions <= 155.
export default function Seo({ title, description, path = "/", type = "website", noindex = false, children }) {
  const url = siteUrl(path);
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, follow" />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      {children}
    </Helmet>
  );
}
