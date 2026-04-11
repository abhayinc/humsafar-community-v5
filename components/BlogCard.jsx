import Link from 'next/link';

export default function BlogCard({ blog }) {
  if (!blog) return null;
  return (
    <article
      style={{
        background: "#fff",
        borderRadius: 18,
        overflow: "hidden",
        border: "1px solid #e2e8f0",
        cursor: "pointer",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
      }}
      itemScope
      itemType="https://schema.org/BlogPosting"
    >
      {blog.coverImage && (
        <img
          src={blog.coverImage}
          alt={blog.title}
          loading="lazy"
          decoding="async"
          style={{ width: "100%", height: 196, objectFit: "cover", display: "block" }}
          itemProp="image"
        />
      )}
      <div style={{ padding: "20px" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 11 }}>
          <span
            style={{
              background: "#ecfdf5",
              color: "#065f46",
              fontSize: 11,
              padding: "3px 10px",
              borderRadius: 999,
              fontWeight: 600,
              fontFamily: "Plus Jakarta Sans, sans-serif",
            }}
            itemProp="articleSection"
          >
            {blog.category}
          </span>
          <span
            style={{
              color: "#94a3b8",
              fontSize: 11,
              padding: "3px 0",
              fontFamily: "Plus Jakarta Sans, sans-serif",
            }}
          >
            {blog.readTime} min read
          </span>
        </div>
        <h3
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: 18,
            fontWeight: 700,
            color: "#0e1117",
            marginBottom: 9,
            lineHeight: 1.3,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
          itemProp="headline"
        >
          {blog.title}
        </h3>
        <p
          style={{
            fontSize: 13,
            color: "#64748b",
            lineHeight: 1.65,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            fontFamily: "Plus Jakarta Sans, sans-serif",
          }}
          itemProp="description"
        >
          {blog.excerpt}
        </p>
        <Link
          href={`/blog/${blog.slug}`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            marginTop: 14,
            fontSize: 13,
            fontWeight: 700,
            color: "#064e3b",
            textDecoration: "none",
            fontFamily: "Plus Jakarta Sans, sans-serif",
          }}
        >
          Read Full Guide →
        </Link>
        <meta itemProp="datePublished" content={blog.publishedAt} />
      </div>
    </article>
  );
}
