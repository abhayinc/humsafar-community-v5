// pages/blog/[slug].jsx — Blog detail with improved accessibility and CSS classes
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import SEOHead from "../../components/SEOHead";
import FAQAccordion from "../../components/FAQAccordion";
import {
  SITE,
  getFreshData,
  generateArticleSchema,
  generateOrganizationSchema,
  generateFAQSchema,
} from "../../data";

export default function BlogDetailPage({ blog, relatedBlogs, site: freshSite }) {
  const dynamicSite = freshSite || SITE || { name: "Humsafar Community", whatsapp: "916268496389" };
  const router = useRouter();
  const [expandedFaq, setExpandedFaq] = useState(null);

  if (router.isFallback) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        Loading...
      </div>
    );
  }
  if (!blog) return null;

  const schemas = [
    generateOrganizationSchema(dynamicSite),
    generateArticleSchema(blog, dynamicSite),
    ...(blog.faqs?.length > 0 ? [generateFAQSchema(blog.faqs, dynamicSite)] : []),
  ];

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Travel Blog", path: "/blog" },
    { name: blog.title, path: `/blog/${blog.slug}` },
  ];

  return (
    <>
      <SEOHead
        title={blog.seoTitle || blog.title}
        description={blog.seoDesc || blog.excerpt}
        keywords={blog.keywords}
        image={blog.coverImage}
        url={`/blog/${blog.slug}`}
        type="article"
        publishedAt={blog.publishedAt}
        updatedAt={blog.updatedAt}
        author={blog.author}
        schemas={schemas}
        breadcrumbs={breadcrumbs}
        site={dynamicSite}
      />

      <nav className="breadcrumb" aria-label="Breadcrumb">
        <ol>
          {breadcrumbs.map((crumb, i) => (
            <li key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {i < breadcrumbs.length - 1 ? (
                <>
                  <Link href={crumb.path}>{crumb.name}</Link>
                  <span>/</span>
                </>
              ) : (
                <span style={{ color: "#94a3b8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 200 }}>{crumb.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <article itemScope itemType="https://schema.org/BlogPosting">
        <div className="page-container">
          {/* Direct answer */}
          {blog.directAnswer && (
            <div style={{ background: "#f0fdf4", padding: "16px 24px", borderBottom: "1px solid #bbf7d0" }}>
              <p className="speakable" style={{ fontSize: 14, color: "#065f46", lineHeight: 1.7 }}>
                <strong>Quick Answer:</strong> {blog.directAnswer}
              </p>
            </div>
          )}

          <h1 className="article-hero" itemProp="headline">{blog.title}</h1>

          <div className="article-meta">
            <span>✍️ <span itemProp="author" itemScope itemType="https://schema.org/Organization"><span itemProp="name">{blog.author}</span></span></span>
            <span>•</span>
            <span>📅 <time itemProp="datePublished" dateTime={blog.publishedAt}>{blog.publishedAt}</time></span>
            <span>•</span>
            <span>⏱ {blog.readTime} min read</span>
            <meta itemProp="dateModified" content={blog.updatedAt || blog.publishedAt} />
          </div>

          {blog.coverImage && (
            <div className="article-cover">
              <Image
                src={blog.coverImage}
                alt={blog.title}
                fill
                priority
                sizes="(max-width: 800px) 100vw, 800px"
                style={{ objectFit: "cover" }}
                itemProp="image"
              />
            </div>
          )}

          <div className="article-body" itemProp="articleBody">
            {(blog.content || []).map((block, i) => {
              switch (block.type) {
                case "h2":
                  return <h2 key={i}>{block.text}</h2>;
                case "h3":
                  return <h3 key={i}>{block.text}</h3>;
                case "para":
                  return <p key={i} className="speakable">{block.text}</p>;
                case "quote":
                  return (
                    <blockquote key={i} className="article-quote">{block.text}</blockquote>
                  );
                case "hr":
                  return <hr key={i} className="article-hr" />;
                case "list":
                  return (
                    <ul key={i}>
                      {(block.items || []).map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  );
                case "img":
                  return block.url ? (
                    <figure key={i}>
                      <img src={block.url} alt={block.caption || blog.title} loading="lazy" decoding="async" className="article-img" />
                      {block.caption && <figcaption style={{ textAlign: "center", fontSize: 13, color: "#94a3b8", fontStyle: "italic", marginTop: 8, marginBottom: 16 }}>{block.caption}</figcaption>}
                    </figure>
                  ) : null;
                default:
                  return null;
              }
            })}
          </div>

          {/* FAQ Section — use shared FAQAccordion for accessibility */}
          {blog.faqs?.length > 0 && (
            <section className="faq-section" aria-label="Frequently asked questions" itemScope itemType="https://schema.org/FAQPage">
              <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 30, fontWeight: 700, marginBottom: 6 }}>Frequently Asked Questions</h2>
              <p style={{ fontSize: 13, color: "#94a3b8", marginBottom: 24 }}>Answered by our travel experts at {dynamicSite.name}</p>
              <FAQAccordion faqs={blog.faqs} />
            </section>
          )}

          {/* CTA */}
          <div className="cta-box">
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 26, fontWeight: 700, marginBottom: 10 }}>Ready for Your Adventure?</h2>
            <p style={{ opacity: 0.8, marginBottom: 22, fontSize: 15 }}>Talk to our experts and book the perfect trip today.</p>
            <a
              href={`https://wa.me/${dynamicSite.whatsapp}?text=${encodeURIComponent(`Hi Humsafar! I read your blog about ${blog.title} and want to book a trip.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn"
              onClick={() => window.gtag?.('event', 'whatsapp_click', { event_label: 'Blog CTA' })}
            >
              💬 Chat on WhatsApp
            </a>
          </div>
        </div>
      </article>

      {/* Related blogs */}
      {relatedBlogs?.length > 0 && (
        <section className="related-section">
          <div className="page-container">
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 26, fontWeight: 700, marginBottom: 24, color: "#0e1117" }}>Related Articles</h2>
            <div className="related-grid">
              {relatedBlogs.map((rb) => (
                <Link key={rb.id} href={`/blog/${rb.slug}`} style={{ textDecoration: 'none' }}>
                  <article className="related-card" tabIndex={0} aria-label={rb.title}>
                    {rb.coverImage && <img src={rb.coverImage} alt={rb.title} style={{ width: '100%', height: 140, objectFit: 'cover' }} loading="lazy" />}
                    <div className="related-card-content">
                      <span style={{ fontSize: 11, color: "#065f46", fontWeight: 600 }}>{rb.category}</span>
                      <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 15, fontWeight: 700, color: '#0e1117', marginTop: 6, lineHeight: 1.3 }}>{rb.title}</h3>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export async function getStaticPaths() {
  const data = await getFreshData();
  const paths = data.BLOGS
    .filter((blog) => blog && typeof blog.slug === 'string')
    .map((blog) => ({
      params: { slug: blog.slug },
    }));
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const data = await getFreshData();
  const blog = data.BLOGS.find((b) => b.slug === params.slug);
  if (!blog) return { notFound: true };

  const relatedBlogs = data.BLOGS.filter(
    (b) => b.id !== blog.id && b.category === blog.category
  ).slice(0, 3);

  return {
    props: { blog, relatedBlogs, site: data.SITE },
    revalidate: 60,
  };
}
