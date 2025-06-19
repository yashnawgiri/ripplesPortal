import { Helmet } from "react-helmet-async";

interface MetaTagsProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  noindex?: boolean;
  ogImage?: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

export const MetaTags = ({
  title,
  description,
  canonicalUrl,
  noindex = false,
  ogImage = "https://ripples1static.blob.core.windows.net/images/ripples-site-metaimage.svg",
  keywords = [
    "referral program",
    "UGC rewards",
    "loyalty software",
    "D2C growth tools",
  ],
  type = "website",
  publishedTime,
  modifiedTime,
  author = "Ripples",
}: MetaTagsProps) => {
  const baseUrl = "https://goripples.com";
  const fullCanonicalUrl = canonicalUrl ? `${baseUrl}${canonicalUrl}` : baseUrl;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta content={title} name="title" />
      <meta content={description} name="description" />
      <meta content={keywords.join(", ")} name="keywords" />
      <meta content={author} name="author" />

      {/* Canonical URL */}
      <link href={fullCanonicalUrl} rel="canonical" />

      {/* Noindex if specified */}
      {noindex && <meta content="noindex,follow" name="robots" />}

      {/* Open Graph / Facebook */}
      <meta content={type} property="og:type" />
      <meta content={fullCanonicalUrl} property="og:url" />
      <meta content={title} property="og:title" />
      <meta content={description} property="og:description" />
      <meta content={ogImage} property="og:image" />
      {type === "article" && publishedTime && (
        <meta content={publishedTime} property="article:published_time" />
      )}
      {type === "article" && modifiedTime && (
        <meta content={modifiedTime} property="article:modified_time" />
      )}
      {type === "article" && (
        <meta content={author} property="article:author" />
      )}

      {/* Twitter */}
      <meta content="summary_large_image" property="twitter:card" />
      <meta content={fullCanonicalUrl} property="twitter:url" />
      <meta content={title} property="twitter:title" />
      <meta content={description} property="twitter:description" />
      <meta content={ogImage} property="twitter:image" />

      {/* Additional Meta Tags */}
      <meta content="English" name="language" />
      <meta content="7 days" name="revisit-after" />
    </Helmet>
  );
};
