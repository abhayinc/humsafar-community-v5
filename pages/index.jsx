import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SEOHead from '../components/SEOHead';
import TourCard from '../components/TourCard';
import BlogCard from '../components/BlogCard';
import { SITE, getFreshData } from '../data';

export default function Home({ data }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!data) return null;

  return (
    <>
      <SEOHead site={data.SITE} />

      <main>
        <section style={{ padding: '24px 20px' }}>
          <div style={{ maxWidth: 1060, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 330px', gap: 28 }} className="page-grid">
            <div>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, marginBottom: 18 }}>Featured Trips</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 20 }}>
                {data.TOURS.slice(0, 6).map((t) => (
                  <TourCard key={t._id} tour={t} />
                ))}
              </div>

              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, margin: '36px 0 14px' }}>From the Blog</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: 20 }}>
                {data.BLOGS.slice(0, 4).map((b) => (
                  <BlogCard key={b.id} blog={b} />
                ))}
              </div>
            </div>

            <aside className="sidebar" style={{ height: 'fit-content', position: 'sticky', top: 90 }}>
              <div style={{ background: '#fff', borderRadius: 20, padding: 18, border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: 13, fontWeight: 800, marginBottom: 8 }}>Search Trips</h3>
                <input placeholder="Search by destination" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0' }} />
              </div>
            </aside>
          </div>
        </section>
      </main>

      <style jsx>{`
        @media (max-width: 768px) {
          .page-grid { grid-template-columns: 1fr !important; }
          .sidebar { display: none !important; }
        }
      `}</style>
    </>
  );
}

export async function getStaticProps(){
  const data = await getFreshData();
  return { props: { data }, revalidate: 60 }
}
