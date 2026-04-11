// pages/blog/[slug].jsx — Blog detail with full SEO/AEO/GEO/AIO
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import SEOHead from "../../components/SEOHead";
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
    return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading...</div>;
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

      {/* Breadcrumb nav */}
      <nav aria-label="Breadcrumb" style={{ background: "#f8fafc", padding: "12px 24px", borderBottom: "1px solid #e2e8f0", fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 13, color: "#64748b" }}>
        <ol style={{ display: "flex", gap: 8, listStyle: "none", maxWidth: 800, margin: "0 auto", flexWrap: "wrap" }}>
          {breadcrumbs.map((crumb, i) => (
            <li key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {i < breadcrumbs.length - 1 ? (
                <><Link href={crumb.path} style={{ color: "#064e3b", textDecoration: "none" }}>{crumb.name}</Link><span>/</span></>
              ) : (
                <span style={{ color: "#94a3b8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 200 }}>{crumb.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <article
        style={{ background: "#fff", minHeight: "100vh", paddingTop: 0, fontFamily: "Plus Jakarta Sans, sans-serif" }}
        itemScope
        itemType="https://schema.org/BlogPosting"
      >
        {/* AEO: Direct answer para — first thing AI/Google reads */}
        {blog.directAnswer && (
          <div style={{ background: "#f0fdf4", padding: "16px 24px", borderBottom: "1px solid #bbf7d0" }}>
            <div style={{ maxWidth: 800, margin: "0 auto" }}>
              <p className="speakable" style={{ fontSize: 14, color: "#065f46", lineHeight: 1.7 }}>
                <strong>Quick Answer:</strong> {blog.directAnswer}
              </p>
            </div>
          </div>
        )}

        <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 24px 80px" }}>
          {/* Tags */}
          <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
            <span style={{ background: "#ecfdf5", color: "#065f46", fontSize: 12, padding: "4px 12px", borderRadius: 999, fontWeight: 600 }} itemProp="articleSection">
              {blog.category}
            </span>
            {(Array.isArray(blog.tags) ? blog.tags : []).map((tag) => (
              <span key={tag} style={{ background: "#f1f5f9", color: "#475569", fontSize: 12, padding: "4px 10px", borderRadius: 999 }} itemProp="keywords">
                #{tag}
              </span>
            ))}
          </div>

          {/* H1 — AEO: Must contain primary keyword */}
          <h1
            className="speakable"
            style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(26px,4vw,44px)", fontWeight: 700, color: "#0e1117", lineHeight: 1.17, marginBottom: 18 }}
            itemProp="headline"
          >
            {blog.title}
          </h1>

          {/* Author / date meta */}
          <div style={{ display: "flex", gap: 20, marginBottom: 32, paddingBottom: 24, borderBottom: "2px solid #f1f5f9", color: "#94a3b8", fontSize: 13 }}>
            <span>✍️ <span itemProp="author" itemScope itemType="https://schema.org/Organization"><span itemProp="name">{blog.author}</span></span></span>
            <span>•</span>
            <span>📅 <time itemProp="datePublished" dateTime={blog.publishedAt}>{blog.publishedAt}</time></span>
            <span>•</span>
            <span>⏱ {blog.readTime} min read</span>
            <meta itemProp="dateModified" content={blog.updatedAt || blog.publishedAt} />
          </div>

          {/* Cover image */}
          {blog.coverImage && (
            <img
              src={blog.coverImage}
              alt={blog.title}
              style={{ width: "100%", borderRadius: 20, marginBottom: 36, maxHeight: 440, objectFit: "cover", display: "block" }}
              itemProp="image"
              fetchpriority="high"
            />
          )}

          {/* Blog body */}
          <div
            itemProp="articleBody"
            style={{ fontSize: 17, lineHeight: 1.85, color: "#1e293b" }}
          >
            {(blog.content || []).map((block, i) => {
              switch (block.type) {
                case "h2":
                  return <h2 key={i} style={{ fontFamily: "Playfair Display, serif", fontSize: 28, fontWeight: 700, color: "#0e1117", margin: "40px 0 16px", lineHeight: 1.2 }}>{block.text}</h2>;
                case "h3":
                  return <h3 key={i} style={{ fontFamily: "Playfair Display, serif", fontSize: 22, fontWeight: 700, color: "#1e293b", margin: "28px 0 12px" }}>{block.text}</h3>;
                case "para":
                  return <p key={i} style={{ marginBottom: 20 }} className="speakable">{block.text}</p>;
                case "quote":
                  return (
                    <blockquote key={i} style={{ borderLeft: "4px solid #10b981", background: "#f0fdf4", padding: "18px 24px", margin: "28px 0", borderRadius: "0 12px 12px 0", fontStyle: "italic", color: "#065f46", fontSize: 18 }}>
                      {block.text}
                    </blockquote>
                  );
                case "hr":
                  return <hr key={i} style={{ border: "none", borderTop: "2px dashed #e2e8f0", margin: "36px 0" }} />;
                case "list":
                  return (
                    <ul key={i} style={{ margin: "0 0 20px 22px" }}>
                      {(block.items || []).map((item, j) => (
                        <li key={j} style={{ marginBottom: 8, lineHeight: 1.7 }}>{item}</li>
                      ))}
                    </ul>
                  );
                case "img":
                  return block.url ? (
                    <figure key={i} style={{ margin: "28px 0 8px" }}>
                      <img
                        src={block.url}
                        alt={block.caption || blog.title}
                        loading="lazy"
                        decoding="async"
                        style={{ width: "100%", borderRadius: 16, display: "block" }}
                      />
                      {block.caption && (
                        <figcaption style={{ textAlign: "center", fontSize: 13, color: "#94a3b8", fontStyle: "italic", marginTop: 8, marginBottom: 16 }}>
                          {block.caption}
                        </figcaption>
                      )}
                    </figure>
                  ) : null;
                default:
                  return null;
              }
            })}
          </div>

          {/* FAQ Section — AEO: Powers "People Also Ask" */}
          {blog.faqs?.length > 0 && (
            <section
              aria-label="Frequently asked questions"
              style={{ marginTop: 48, paddingTop: 36, borderTop: "2px solid #f1f5f9" }}
              itemScope
              itemType="https://schema.org/FAQPage"
            >
              <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 30, fontWeight: 700, marginBottom: 6 }}>
                Frequently Asked Questions
              </h2>
              <p style={{ fontSize: 13, color: "#94a3b8", marginBottom: 24 }}>
                Answered by our travel experts at {dynamicSite.name}
              </p>
              {blog.faqs.map((faq, i) => (
                <div
                  key={i}
                  style={{ border: "1px solid #e2e8f0", borderRadius: 13, overflow: "hidden", marginBottom: 10 }}
                  itemProp="mainEntity"
                  itemScope
                  itemType="https://schema.org/Question"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                    aria-expanded={expandedFaq === i}
                    style={{ cursor: "pointer", padding: "18px 22px", fontWeight: 600, fontSize: 15, display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fff", width: "100%", border: "none", textAlign: "left", fontFamily: "Plus Jakarta Sans, sans-serif", color: "#1e293b" }}
                  >
                    <span itemProp="name">{faq.q}</span>
                    <span style={{ marginLeft: 12, flexShrink: 0, fontSize: 18 }}>{expandedFaq === i ? "−" : "+"}</span>
                  </button>
                  {expandedFaq === i && (
                    <div
                      style={{ padding: "4px 22px 18px", fontSize: 14, color: "#475569", lineHeight: 1.75, fontFamily: "Plus Jakarta Sans, sans-serif" }}
                      itemProp="acceptedAnswer"
                      itemScope
                      itemType="https://schema.org/Answer"
                    >
                      <span itemProp="text">{faq.a}</span>
                    </div>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* CTA */}
          <div style={{ marginTop: 48, background: "#064e3b", borderRadius: 20, padding: "32px", textAlign: "center", color: "#fff" }}>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 26, fontWeight: 700, marginBottom: 10 }}>
              Ready for Your Adventure?
            </h2>
            <p style={{ opacity: 0.8, marginBottom: 22, fontSize: 15 }}>
              Talk to our experts and book the perfect trip today.
            </p>
            <a
              href={`https://wa.me/${dynamicSite.whatsapp}?text=Hi Humsafar! I read your blog about ${blog.title} and want to book a trip.`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#22c55e", color: "#fff", padding: "14px 28px", borderRadius: 14, fontWeight: 700, fontSize: 15, textDecoration: "none", fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              💬 Chat on WhatsApp
            </a>
          </div>
        </div>
      </article>

      {/* Related blogs */}
      {relatedBlogs?.length > 0 && (
        <section style={{ background: "#f8fafc", padding: "48px 24px", borderTop: "1px solid #e2e8f0" }}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 26, fontWeight: 700, marginBottom: 24, color: "#0e1117" }}>
              Related Articles
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 20 }}>
              {relatedBlogs.map((rb) => (
                <Link key={rb.id} href={`/blog/${rb.slug}`} style={{ textDecoration: "none" }}>
                  <article style={{ background: "#fff", borderRadius: 14, overflow: "hidden", border: "1px solid #e2e8f0", transition: "transform 0.2s ease, box-shadow 0.2s ease" }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.1)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                    {rb.coverImage && <img src={rb.coverImage} alt={rb.title} style={{ width: "100%", height: 140, objectFit: "cover" }} loading="lazy" />}
                    <div style={{ padding: 16 }}>
                      <span style={{ fontSize: 11, color: "#065f46", fontWeight: 600, fontFamily: "Plus Jakarta Sans, sans-serif" }}>{rb.category}</span>
                      <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: 15, fontWeight: 700, color: "#0e1117", marginTop: 6, lineHeight: 1.3 }}>{rb.title}</h3>
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
