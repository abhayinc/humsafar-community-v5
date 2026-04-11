import SEOHead from "../../components/SEOHead";
import BlogCard from "../../components/BlogCard";
import Footer from "../../components/Footer";
import { getFreshData, SITE } from "../../data";
import Link from "next/link";

export default function BlogPage({ blogs, site: freshSite }) {
  const dynamicSite = freshSite || SITE || { name: "Humsafar Community", socials: {} };

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh" }}>
      <SEOHead
        title="Travel Blog | Tips & Guides | Humsafar Community"
        description="Read our latest travel guides, tips, and stories from across the globe."
        site={dynamicSite}
        url="/blog"
      />

      <nav style={{ padding: "20px", background: "#064e3b", color: "#fff" }}>
         <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Link href="/" style={{ color: "#fff", textDecoration: "none", fontWeight: 700, fontSize: 20 }}>Humsafar Blog</Link>
            <Link href="/" style={{ color: "#fff", textDecoration: "none", fontSize: 14 }}>← Back to Home</Link>
         </div>
      </nav>

      <main style={{ maxWidth: 1100, margin: "40px auto", padding: "0 20px" }}>
        <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: 40, marginBottom: 10 }}>Travel Stories & Guides</h1>
        <p style={{ color: "#64748b", marginBottom: 40 }}>Expert advice and inspiration for your next adventure.</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 30 }}>
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>

        {blogs.length === 0 && (
          <div style={{ textAlign: "center", padding: "100px", color: "#94a3b8" }}>
            No blog posts published yet.
          </div>
        )}
      </main>

      <Footer dynamicSite={dynamicSite} />
    </div>
  );
}

export async function getStaticProps() {
  const data = await getFreshData();
  return {
    props: {
      blogs: data.BLOGS,
      site: data.SITE,
    },
    revalidate: 60,
  };
}
