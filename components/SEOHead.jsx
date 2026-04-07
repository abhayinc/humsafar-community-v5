// components/SEOHead.jsx
// Full SEO + AEO + GEO + SXO + AIO optimization in every page
import Head from "next/head";
import { SITE } from "../data";

export default function SEOHead({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
  schemas = [], // Array of JSON-LD schema objects
  noindex = false,
  canonical,
  publishedAt,
  updatedAt,
  author,
  breadcrumbs,
}) {
  const fullTitle = title ? `${title} | ${SITE.name}` : `${SITE.name} — India's #1 Travel Community`;
  const fullUrl = url ? `${SITE.url}${url}` : SITE.url;
  const ogImage = image || SITE.defaultOGImage;
  const canonicalUrl = canonical ? `${SITE.url}${canonical}` : fullUrl;

  return (
    <Head>
      {/* ── PRIMARY META ─────────────────────────────────────────── */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={author || SITE.name} />
      <link rel="canonical" href={canonicalUrl} />

      {/* ── ROBOTS (SEO + GEO: Allow AI crawlers) ─────────────────── */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <>
          <meta
            name="robots"
            content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
          />
          {/* GEO: Explicitly allow AI system crawlers */}
          <meta name="googlebot" content="index, follow, max-snippet:-1" />
          <meta name="GPTBot" content="index, follow" />
          <meta name="Claude-Web" content="index, follow" />
          <meta name="PerplexityBot" content="index, follow" />
          <meta name="Bingbot" content="index, follow" />
          <meta name="Google-Extended" content="index, follow" />
        </>
      )}

      {/* ── OPEN GRAPH (SXO: Rich previews for higher CTR) ────────── */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:locale" content="en_IN" />

      {/* ── TWITTER CARDS ─────────────────────────────────────────── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@humsafar_travel" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* ── ARTICLE META (for blog posts) ──────────────────────────── */}
      {type === "article" && publishedAt && (
        <>
          <meta property="article:published_time" content={publishedAt} />
          <meta property="article:modified_time" content={updatedAt || publishedAt} />
          <meta property="article:author" content={author || SITE.name} />
          <meta property="article:publisher" content={SITE.socials?.facebook} />
        </>
      )}

      {/* ── GEOGRAPHIC META (Local SEO) ────────────────────────────── */}
      <meta name="geo.region" content="IN-HR" />
      <meta name="geo.placename" content="Gurugram, Haryana, India" />
      <meta name="geo.position" content={`${SITE.lat};${SITE.lng}`} />
      <meta name="ICBM" content={`${SITE.lat}, ${SITE.lng}`} />

      {/* ── LANGUAGE & CONTENT TYPE ────────────────────────────────── */}
      <meta httpEquiv="content-language" content="en-in" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="general" />
      <meta name="category" content="Travel, Tourism, India" />

      {/* ── PERFORMANCE (SXO: Core Web Vitals) ─────────────────────── */}
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      <meta httpEquiv="x-dns-prefetch-control" content="on" />

      {/* Preconnect for fonts and images */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://images.unsplash.com" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

      {/* Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,900;1,600;1,700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />

      {/* ── JSON-LD STRUCTURED DATA (GEO + AIO core) ─────────────── */}
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* ── BREADCRUMB META ────────────────────────────────────────── */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: breadcrumbs.map((item, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: item.name,
                item: `${SITE.url}${item.path}`,
              })),
            }),
          }}
        />
      )}
    </Head>
  );
}
