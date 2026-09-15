// pages/packages/[slug].jsx — Dynamic tour detail page (refactored for accessibility & CSS classes)
// Full SEO + AEO + GEO + SXO + AIO optimization

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import SEOHead from "../../components/SEOHead";
import FAQAccordion from "../../components/FAQAccordion";
import {
  SITE,
  getFreshData,
  generateTourSchema,
  generateOrganizationSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "../../data";

export default function TourDetailPage({ tour, relatedTours, site: freshSite }) {
  const dynamicSite = freshSite || SITE || { whatsapp: "916268496389", name: "Humsafar Community" };
  const router = useRouter();
  const [activeDate, setActiveDate] = useState(null);
  const [pax, setPax] = useState(1);
  const [sharing, setSharing] = useState("Quad");
  const [expandedDay, setExpandedDay] = useState(-1);

  // Get next 5 Saturdays
  const saturdays = getNextSaturdays(5);
  useEffect(() => {
    if (!activeDate && saturdays.length > 0) setActiveDate(saturdays[0].toISOString());
  }, [saturdays]);

  if (router.isFallback) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!tour) return null;

  const sharingOptions = [
    { type: "Quad", surcharge: 0 },
    { type: "Triple", surcharge: 1500 },
    { type: "Double", surcharge: 3000 },
  ];

  const currentSurcharge = sharingOptions.find((o) => o.type === sharing)?.surcharge || 0;
  const pricePerPerson = Number(tour.price) + currentSurcharge;
  const totalPrice = pricePerPerson * pax;

  const waMessage = `Hi Humsafar! I am interested in *${tour.title}*.*\n\n*Date:* ${activeDate ? new Date(activeDate).toDateString() : "TBD"}*\n*Sharing:* ${sharing}*\n*People:* ${pax}*\n*Total:* ₹${totalPrice.toLocaleString("en-IN")}`;

  const schemas = [
    generateOrganizationSchema(dynamicSite),
    generateTourSchema(tour, dynamicSite),
    ...(tour.faqs?.length > 0 ? [generateFAQSchema(tour.faqs, dynamicSite)] : []),
  ];

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Tour Packages", path: "/packages" },
    { name: tour.title, path: `/packages/${tour.slug}` },
  ];

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history && window.history.length > 2) {
      router.back();
    } else {
      router.push("/packages");
    }
  };

  return (
    <>
      <SEOHead
        title={tour.seoTitle || tour.title}
        description={tour.seoDesc}
        keywords={tour.keywords}
        image={tour.img}
        url={`/packages/${tour.slug}`}
        type="product"
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
                <span style={{ color: "#94a3b8" }}>{crumb.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Mobile booking bar (CSS controls visibility) */}
      <div className="mobile-book-bar" role="region" aria-label="Quick booking bar" style={{ display: "none" }}>
        <div>
          <div style={{ fontSize: 10, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1 }}> {pax} Pax · {sharing} Sharing</div>
          <div style={{ fontSize: 22, fontWeight: 900 }}>₹{totalPrice.toLocaleString("en-IN")}</div>
        </div>
        <a
          href={`https://wa.me/${dynamicSite.whatsapp}?text=${encodeURIComponent(waMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-btn"
          onClick={() => typeof window !== 'undefined' && window.gtag?.('event', 'whatsapp_click', { event_label: 'Mobile Book Bar', value: totalPrice })}
        >
          💬 Book Now
        </a>
      </div>

      {/* Hero Image */}
      <div className="article-cover" style={{ height: '56vh' }}>
        <Image src={tour.img} alt={`${tour.title} — ${tour.location}`} fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(0,0,0,0.82),rgba(0,0,0,0.18))' }} />
        <button className="back-btn" onClick={handleBack} style={{ position: 'absolute', top: 88, left: 24 }}>
          ← All Packages
        </button>

        <div style={{ position: 'absolute', bottom: 28, left: 24, right: 24, maxWidth: 1060, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
            <span style={{ background: 'rgba(16,185,129,0.85)', color: '#fff', fontSize: 11, padding: '3px 12px', borderRadius: 6, fontWeight: 700 }}>{tour.region}</span>
            <span style={{ background: 'rgba(200,134,10,0.9)', color: '#fff', fontSize: 11, padding: '3px 12px', borderRadius: 6, fontWeight: 700 }}>From ₹{Number(tour.price).toLocaleString('en-IN')}</span>
            <span style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(4px)', color: '#fff', fontSize: 11, padding: '3px 12px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.12)' }}>{tour.duration}</span>
          </div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(24px,4vw,50px)', fontWeight: 700, color: '#fff', marginBottom: 10, lineHeight: 1.1 }}>{tour.title}</h1>
          <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, display: 'flex', gap: 18, flexWrap: 'wrap' }}>
            <span>📍 {tour.location}</span>
            <span>⭐ {tour.rating} ({tour.reviews} reviews)</span>
            {tour.interested && <span>👥 {tour.interested}+ interested</span>}
          </div>
        </div>
      </div>

      {/* AEO: Direct answer paragraph (machine-readable summary) */}
      {tour.directAnswer && (
        <div style={{ background: '#f0fdf4', padding: '16px 24px', borderBottom: '1px solid #bbf7d0' }}>
          <div style={{ maxWidth: 1060, margin: '0 auto' }}>
            <p className="speakable" style={{ fontSize: 14, color: '#065f46', lineHeight: 1.7 }}><strong>Quick Summary:</strong> {tour.directAnswer}</p>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="page-container" style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: 100 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 330px', gap: 28 }}>
          <div>
            {/* Highlights */}
            <section className="card" style={{ marginBottom: 22 }} aria-label="Trip highlights">
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 700, marginBottom: 18 }}>Trip Highlights</h2>
              <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 11, listStyle: 'none', padding: 0 }}>
                {tour.highlights?.map((h, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 22, height: 22, borderRadius: 999, background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>✓</div>
                    <span style={{ fontSize: 14, color: '#374151', fontWeight: 500 }}>{h}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Itinerary */}
            {tour.itinerary?.length > 0 && (
              <section style={{ marginBottom: 22 }} aria-label="Trip itinerary">
                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 700, marginBottom: 14 }}>📅 Day-by-Day Itinerary</h2>
                {tour.itinerary.map((day, i) => {
                  const panelId = `it-day-${i}`;
                  const isOpen = expandedDay === i;
                  return (
                    <div key={i} className="card" style={{ marginBottom: 10 }}>
                      <button
                        onClick={() => setExpandedDay(isOpen ? -1 : i)}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        className="faq-question"
                        style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
                          <div style={{ width: 40, height: 40, borderRadius: 999, background: isOpen ? '#064e3b' : '#ecfdf5', color: isOpen ? '#fff' : '#064e3b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>D{day.day}</div>
                          <div>
                            <div style={{ fontSize: 15, fontWeight: 700, color: '#0e1117' }}>{day.title}</div>
                            {day.meals && <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>🍽️ {day.meals}</div>}
                          </div>
                        </div>
                        <span style={{ fontSize: 18, color: '#94a3b8', marginLeft: 8 }}>{isOpen ? '−' : '+'}</span>
                      </button>
                      <div id={panelId} role="region" aria-hidden={!isOpen} style={{ display: isOpen ? 'block' : 'none', padding: '4px 22px 20px 75px', fontSize: 14, color: '#475569', lineHeight: 1.8 }}>
                        {day.desc}
                      </div>
                    </div>
                  );
                })}
              </section>
            )}

            {/* Inclusions / Exclusions */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 22 }}>
              {[{ title: "What's Included", items: tour.inclusions, icon: '✓', bg: '#ecfdf5', col: '#065f46' }, { title: "What's Excluded", items: tour.exclusions, icon: '✗', bg: '#fef2f2', col: '#dc2626' }].map((sec) => (
                <section key={sec.title} className="card">
                  <h3 style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.5, color: sec.col, marginBottom: 14 }}>{sec.title}</h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {sec.items?.map((item, i) => (
                      <li key={i} style={{ display: 'flex', gap: 10, marginBottom: 9 }}>
                        <div style={{ width: 20, height: 20, borderRadius: 999, background: sec.bg, flexShrink: 0, marginTop: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{sec.icon}</div>
                        <span style={{ fontSize: 13, color: '#475569' }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>

            {/* FAQs — use shared FAQAccordion */}
            {tour.faqs?.length > 0 && (
              <section style={{ marginBottom: 22 }} aria-label="Frequently asked questions" itemScope itemType="https://schema.org/FAQPage">
                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 700, marginBottom: 6 }}>Frequently Asked Questions</h2>
                <p style={{ fontSize: 13, color: '#94a3b8', marginBottom: 20 }}>Everything you need to know before booking</p>
                <FAQAccordion faqs={tour.faqs} />
              </section>
            )}
          </div>

          {/* Booking Sidebar */}
          <aside style={{ position: 'sticky', top: 90, height: 'fit-content' }}>
            <div className="card" style={{ overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
              <div style={{ background: '#064e3b', padding: 22, textAlign: 'center', color: '#fff' }}>
                <div style={{ fontSize: 10, opacity: 0.7, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 4 }}>Total Cost</div>
                <div style={{ fontSize: 38, fontWeight: 900 }}>₹{totalPrice.toLocaleString('en-IN')}</div>
                <div style={{ fontSize: 12, opacity: 0.75, marginTop: 4 }}>{pax} Person(s) · {sharing} Sharing</div>
              </div>

              <div style={{ padding: 20 }}>
                {/* Date selection */}
                <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.5, color: '#374151', marginBottom: 10 }}>Select Departure Date</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6, marginBottom: 18 }}>
                  {saturdays.map((d, i) => {
                    const dateStr = d.toISOString();
                    const isActive = activeDate === dateStr;
                    return (
                      <button key={i} onClick={() => setActiveDate(dateStr)} aria-pressed={isActive} className="btn" style={{ padding: '9px 4px', borderRadius: 10 }}>
                        <div style={{ fontSize: 9, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1 }}>{d.toLocaleDateString('en-IN', { month: 'short' })}</div>
                        <div style={{ fontSize: 18, fontWeight: 900 }}>{d.getDate()}</div>
                        <div style={{ fontSize: 9, color: '#94a3b8' }}>Sat</div>
                      </button>
                    );
                  })}
                </div>

                {/* Sharing type */}
                <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.5, color: '#374151', marginBottom: 10 }}>Occupancy Type</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6, marginBottom: 18 }}>
                  {sharingOptions.map((o) => (
                    <button key={o.type} onClick={() => setSharing(o.type)} aria-pressed={sharing === o.type} className="btn" style={{ padding: '9px 4px', borderRadius: 10 }}>
                      <div style={{ fontSize: 12, fontWeight: 700 }}>{o.type}</div>
                      <div style={{ fontSize: 10, color: '#94a3b8' }}>{o.surcharge === 0 ? 'Base' : `+₹${o.surcharge.toLocaleString()}`}</div>
                    </button>
                  ))}
                </div>

                {/* Pax counter */}
                <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.5, color: '#374151', marginBottom: 10 }}>Number of Travelers</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f8fafc', borderRadius: 12, padding: '10px 14px', marginBottom: 18 }}>
                  <button onClick={() => setPax(Math.max(1, pax - 1))} aria-label="Decrease travelers" className="btn" style={{ width: 34, height: 34, borderRadius: 10 }}>−</button>
                  <span style={{ fontSize: 24, fontWeight: 900 }}>{pax}</span>
                  <button onClick={() => setPax(pax + 1)} aria-label="Increase travelers" className="btn" style={{ width: 34, height: 34, borderRadius: 10 }}>+</button>
                </div>

                <a href={`https://wa.me/${dynamicSite.whatsapp}?text=${encodeURIComponent(waMessage)}`} target="_blank" rel="noopener noreferrer" className="cta-btn" onClick={() => typeof window !== 'undefined' && window.gtag?.('event', 'whatsapp_click', { event_label: 'Tour Sidebar', value: totalPrice })}>
                  💬 Book on WhatsApp
                </a>
                <p style={{ textAlign: 'center', fontSize: 11, color: '#94a3b8', marginTop: 10 }}>No payment needed to enquire.</p>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="card" style={{ marginTop: 16, padding: 20 }}>
              {[
                '✅ Trusted by 50,000+ travelers',
                '⭐ 4.8/5 Google Rating',
                '🔒 100% Secure WhatsApp Booking',
                '💰 No Advance Payment to Enquire',
                '↩️ Easy Cancellation Policy',
              ].map((item, i) => (
                <div key={i} style={{ fontSize: 12, color: '#374151', marginBottom: 8 }}>{item}</div>
              ))}
            </div>
          </aside>
        </div>
      </main>

      <style jsx>{`@media (max-width: 768px) { .mobile-book-bar { display: flex !important; } main > div { grid-template-columns: 1fr !important; } aside { display: none !important; } }`}</style>
    </>
  );
}

function getNextSaturdays(n = 5) {
  const dates = [];
  let d = new Date();
  // Advance to next Saturday
  const daysUntilSat = (6 - d.getDay() + 7) % 7 || 7;
  d.setDate(d.getDate() + daysUntilSat);
  for (let i = 0; i < n; i++) {
    dates.push(new Date(d));
    d.setDate(d.getDate() + 7);
  }
  return dates;
}

export async function getStaticPaths() {
  const data = await getFreshData();
  const paths = data.TOURS.filter((t) => t && typeof t.slug === 'string').map((t) => ({ params: { slug: t.slug } }));
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const data = await getFreshData();
  const tour = data.TOURS.find((t) => t.slug === params.slug);
  if (!tour) return { notFound: true };
  const relatedTours = data.TOURS.filter((t) => t._id !== tour._id && t.region === tour.region).slice(0, 3);
  return { props: { tour, relatedTours, site: data.SITE }, revalidate: 60 };
}
