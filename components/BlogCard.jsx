import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function BlogCard({ blog }) {
  const router = useRouter();
  if (!blog) return null;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      router.push(`/blog/${blog.slug}`);
    }
  };

  return (
    <article
      className="tour-card blog-card"
      itemScope
      itemType="https://schema.org/BlogPosting"
      tabIndex={0}
      role="article"
      onKeyDown={handleKeyDown}
    >
      {blog.coverImage && (
        <div className="tour-card-image blog-card-image">
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: 'cover' }}
            itemProp="image"
          />
        </div>
      )}

      <div className="tour-card-content">
        <div style={{ display: 'flex', gap: 8, marginBottom: 11 }}>
          <span
            style={{
              background: '#ecfdf5',
              color: '#065f46',
              fontSize: 11,
              padding: '3px 10px',
              borderRadius: 999,
              fontWeight: 600,
              fontFamily: 'Plus Jakarta Sans, sans-serif',
            }}
            itemProp="articleSection"
          >
            {blog.category}
          </span>
          <span style={{ color: '#94a3b8', fontSize: 11, padding: '3px 0', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            {blog.readTime} min read
          </span>
        </div>

        <h3 className="tour-card-title" itemProp="headline">
          {blog.title}
        </h3>

        <p
          style={{
            fontSize: 13,
            color: '#64748b',
            lineHeight: 1.65,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
          }}
          itemProp="description"
        >
          {blog.excerpt}
        </p>

        <Link href={`/blog/${blog.slug}`} className="btn-primary" style={{ marginTop: 14, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          Read Full Guide →
        </Link>
        <meta itemProp="datePublished" content={blog.publishedAt} />
      </div>
    </article>
  );
}
