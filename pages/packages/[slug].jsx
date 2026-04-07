// pages/packages/[slug].jsx — Dynamic tour detail page
// Full SEO + AEO + GEO + SXO + AIO optimization

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import SEOHead from "../../components/SEOHead";
import {
  SITE,
  TOURS,
  generateTourSchema,
  generateOrganizationSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "../../data";

export default function TourDetailPage({ tour, relatedTours }) {
  const router = useRouter();
  const [activeDate, setActiveDate] = useState(null);
  const [pax, setPax] = useState(1);
  const [sharing, setSharing] = useState("Quad");
  const [expandedDay, setExpandedDay] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Get next 5 Saturdays
  const saturdays = getNextSaturdays(5);
  useEffect(() => {
    if (!activeDate && saturdays.length > 0) setActiveDate(saturdays[0]);
  }, []);

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

  const waMessage = `Hi Humsafar! I am interested in *${tour.title}*.\n\n🗓 Date: ${activeDate ? new Date(activeDate).toDateString() : "TBD"}\n🏨 Sharing: ${sharing}\n👥 People: ${pax}\n💰 Total: ₹${totalPrice.toLocaleString("en-IN")}\n⏱ Duration: ${tour.duration}\n\nPlease share more details.`;

  const schemas = [
    generateOrganizationSchema(),
    generateTourSchema(tour),
    ...(tour.faqs?.length > 0 ? [generateFAQSchema(tour.faqs)] : []),
  ];

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Tour Packages", path: "/packages" },
    { name: tour.title, path: `/packages/${tour.slug}` },
  ];

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
      />

      {/* Schema breadcrumb display */}
      <nav
        aria-label="Breadcrumb"
        style={{
          background: "#f8fafc",
          padding: "12px 24px",
          borderBottom: "1px solid #e2e8f0",
          fontFamily: "Plus Jakarta Sans, sans-serif",
          fontSize: 13,
          color: "#64748b",
        }}
      >
        <ol
          style={{ display: "flex", gap: 8, listStyle: "none", maxWidth: 1100, margin: "0 auto", flexWrap: "wrap" }}
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          {breadcrumbs.map((crumb, i) => (
            <li
              key={i}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              {i < breadcrumbs.length - 1 ? (
                <>
                  <Link href={crumb.path} itemProp="item" style={{ color: "#064e3b", textDecoration: "none" }}>
                    <span itemProp="name">{crumb.name}</span>
                  </Link>
                  <span>/</span>
                </>
              ) : (
                <span itemProp="name" style={{ color: "#94a3b8" }}>
                  {crumb.name}
                </span>
              )}
              <meta itemProp="position" content={i + 1} />
            </li>
          ))}
        </ol>
      </nav>

      {/* Mobile booking bar */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: "#fff",
          borderTop: "1px solid #e2e8f0",
          padding: "12px 20px 22px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 -8px 32px rgba(0,0,0,0.1)",
        }}
        className="mobile-book-bar"
      >
        <div>
          <div style={{ fontSize: 10, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1, fontFamily: "Plus Jakarta Sans, sans-serif" }}>
            {pax} Pax · {sharing} Sharing
          </div>
          <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "Playfair Display, serif" }}>
            ₹{totalPrice.toLocaleString("en-IN")}
          </div>
        </div>
        <a
          href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(waMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: "#22c55e",
            color: "#fff",
            padding: "13px 22px",
            borderRadius: 14,
            fontWeight: 700,
            fontSize: 14,
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 7,
            fontFamily: "Plus Jakarta Sans, sans-serif",
          }}
          onClick={() => window.gtag?.("event", "whatsapp_click", { event_label: "Mobile Book Bar", value: totalPrice })}
        >
          💬 Book Now
        </a>
      </div>

      {/* Hero Image */}
      <div style={{ position: "relative", height: "56vh", overflow: "hidden" }}>
        <img
          src={tour.img}
          alt={`${tour.title} — ${tour.location}`}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          fetchpriority="high"
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.82),rgba(0,0,0,0.18))" }} />
        <Link href="/packages" style={{ position: "absolute", top: 88, left: 24, background: "rgba(255,255,255,0.18)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", borderRadius: 999, padding: "9px 20px", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "Plus Jakarta Sans, sans-serif", textDecoration: "none" }}>
          ← All Packages
        </Link>
        <div style={{ position: "absolute", bottom: 28, left: 24, right: 24, maxWidth: 1060, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
            <span style={{ background: "rgba(16,185,129,0.85)", color: "#fff", fontSize: 11, padding: "3px 12px", borderRadius: 6, fontWeight: 700, textTransform: "uppercase", fontFamily: "Plus Jakarta Sans, sans-serif" }}>
              {tour.region}
            </span>
            <span style={{ background: "rgba(200,134,10,0.9)", color: "#fff", fontSize: 11, padding: "3px 12px", borderRadius: 6, fontWeight: 700, fontFamily: "Plus Jakarta Sans, sans-serif" }}>
              From ₹{Number(tour.price).toLocaleString("en-IN")}
            </span>
            <span style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(4px)", color: "#fff", fontSize: 11, padding: "3px 12px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.2)", fontFamily: "Plus Jakarta Sans, sans-serif" }}>
              {tour.duration}
            </span>
          </div>
          <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(24px,4vw,50px)", fontWeight: 700, color: "#fff", marginBottom: 10, lineHeight: 1.1, textShadow: "0 4px 20px rgba(0,0,0,0.3)" }}>
            {tour.title}
          </h1>
          <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, display: "flex", gap: 18, flexWrap: "wrap", fontFamily: "Plus Jakarta Sans, sans-serif" }}>
            <span>📍 {tour.location}</span>
            <span>⭐ {tour.rating} ({tour.reviews} reviews)</span>
            {tour.interested && <span>👥 {tour.interested}+ interested</span>}
          </div>
        </div>
      </div>

      {/* AEO: Direct answer paragraph (machine-readable summary) */}
      {tour.directAnswer && (
        <div style={{ background: "#f0fdf4", padding: "16px 24px", borderBottom: "1px solid #bbf7d0" }}>
          <div style={{ maxWidth: 1060, margin: "0 auto" }}>
            <p className="speakable" style={{ fontSize: 14, color: "#065f46", lineHeight: 1.7, fontFamily: "Plus Jakarta Sans, sans-serif" }}>
              <strong>Quick Summary:</strong> {tour.directAnswer}
            </p>
          </div>
        </div>
      )}

      {/* Main content */}
      <main style={{ background: "#f8fafc", minHeight: "100vh", paddingBottom: 100, fontFamily: "Plus Jakarta Sans, sans-serif" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto", padding: "32px 20px", display: "grid", gridTemplateColumns: "1fr 330px", gap: 28 }}>
          <div>
            {/* Highlights */}
            <section aria-label="Trip highlights" style={{ background: "#fff", borderRadius: 18, padding: "26px 28px", marginBottom: 22, border: "1px solid #e2e8f0" }}>
              <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 24, fontWeight: 700, marginBottom: 18 }}>Trip Highlights</h2>
              <ul style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 11, listStyle: "none" }}>
                {tour.highlights?.map((h, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 22, height: 22, borderRadius: 999, background: "#ecfdf5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 12 }}>✓</div>
                    <span style={{ fontSize: 14, color: "#374151", fontWeight: 500 }}>{h}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Itinerary */}
            {tour.itinerary?.length > 0 && (
              <section aria-label="Trip itinerary" style={{ marginBottom: 22 }}>
                <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 24, fontWeight: 700, marginBottom: 14 }}>
                  📅 Day-by-Day Itinerary
                </h2>
                {tour.itinerary.map((day, i) => (
                  <div key={i} style={{ background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0", marginBottom: 10, overflow: "hidden" }}>
                    <button
                      onClick={() => setExpandedDay(expandedDay === i ? -1 : i)}
                      aria-expanded={expandedDay === i}
                      style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "17px 22px", background: "none", border: "none", cursor: "pointer", textAlign: "left", fontFamily: "Plus Jakarta Sans, sans-serif" }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 999, background: expandedDay === i ? "#064e3b" : "#ecfdf5", color: expandedDay === i ? "#fff" : "#064e3b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, flexShrink: 0 }}>
                          D{day.day}
                        </div>
                        <div>
                          <div style={{ fontSize: 15, fontWeight: 700, color: "#0e1117" }}>{day.title}</div>
                          {day.meals && <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>🍽️ {day.meals}</div>}
                        </div>
                      </div>
                      <span style={{ fontSize: 18, color: "#94a3b8", marginLeft: 8 }}>{expandedDay === i ? "−" : "+"}</span>
                    </button>
                    {expandedDay === i && (
                      <div style={{ padding: "4px 22px 20px 75px", fontSize: 14, color: "#475569", lineHeight: 1.8 }}>
                        {day.desc}
                      </div>
                    )}
                  </div>
                ))}
              </section>
            )}

            {/* Inclusions / Exclusions */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 22 }}>
              {[
                { title: "What's Included", items: tour.inclusions, icon: "✓", bg: "#ecfdf5", col: "#065f46" },
                { title: "What's Excluded", items: tour.exclusions, icon: "✗", bg: "#fef2f2", col: "#dc2626" },
              ].map((sec) => (
                <section key={sec.title} aria-label={sec.title} style={{ background: "#fff", borderRadius: 16, padding: "22px", border: "1px solid #e2e8f0" }}>
                  <h3 style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1.5, color: sec.col, marginBottom: 14 }}>{sec.title}</h3>
                  <ul style={{ listStyle: "none" }}>
                    {sec.items?.map((item, i) => (
                      <li key={i} style={{ display: "flex", gap: 10, marginBottom: 9 }}>
                        <div style={{ width: 20, height: 20, borderRadius: 999, background: sec.bg, flexShrink: 0, marginTop: 1, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: sec.col }}>
                          {sec.icon}
                        </div>
                        <span style={{ fontSize: 13, color: "#475569", lineHeight: 1.5 }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>

            {/* FAQs — AEO: Powers "People Also Ask" in Google */}
            {tour.faqs?.length > 0 && (
              <section
                aria-label="Frequently asked questions"
                style={{ background: "#fff", borderRadius: 18, padding: "26px 28px", border: "1px solid #e2e8f0" }}
                itemScope
                itemType="https://schema.org/FAQPage"
              >
                <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 24, fontWeight: 700, marginBottom: 6 }}>
                  Frequently Asked Questions
                </h2>
                <p style={{ fontSize: 13, color: "#94a3b8", marginBottom: 20 }}>
                  Everything you need to know before booking
                </p>
                {tour.faqs.map((faq, i) => (
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
          </div>

          {/* Booking Sidebar */}
          <aside style={{ position: "sticky", top: 90, height: "fit-content" }}>
            <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.1)" }}>
              <div style={{ background: "#064e3b", padding: "22px", textAlign: "center", color: "#fff" }}>
                <div style={{ fontSize: 10, opacity: 0.7, textTransform: "uppercase", letterSpacing: 2, marginBottom: 4, fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                  Total Cost
                </div>
                <div style={{ fontSize: 38, fontWeight: 900, fontFamily: "Playfair Display, serif" }}>
                  ₹{totalPrice.toLocaleString("en-IN")}
                </div>
                <div style={{ fontSize: 12, opacity: 0.75, marginTop: 4, fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                  {pax} Person(s) · {sharing} Sharing
                </div>
              </div>
              <div style={{ padding: 20 }}>
                {/* Date selection */}
                <div style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1.5, color: "#374151", marginBottom: 10, fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                  Select Departure Date
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6, marginBottom: 18 }}>
                  {saturdays.map((d, i) => {
                    const dateStr = d.toISOString();
                    const isActive = activeDate === dateStr;
                    return (
                      <button
                        key={i}
                        onClick={() => setActiveDate(dateStr)}
                        style={{ padding: "9px 4px", borderRadius: 10, border: `2px solid ${isActive ? "#064e3b" : "#e2e8f0"}`, background: isActive ? "#ecfdf5" : "#fff", cursor: "pointer", textAlign: "center", fontFamily: "Plus Jakarta Sans, sans-serif", transition: "all 0.15s" }}
                      >
                        <div style={{ fontSize: 9, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1 }}>
                          {d.toLocaleDateString("en-IN", { month: "short" })}
                        </div>
                        <div style={{ fontSize: 18, fontWeight: 900, color: "#0e1117", fontFamily: "Playfair Display, serif" }}>
                          {d.getDate()}
                        </div>
                        <div style={{ fontSize: 9, color: "#94a3b8" }}>Sat</div>
                      </button>
                    );
                  })}
                </div>

                {/* Sharing type */}
                <div style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1.5, color: "#374151", marginBottom: 10, fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                  Occupancy Type
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6, marginBottom: 18 }}>
                  {sharingOptions.map((o) => (
                    <button
                      key={o.type}
                      onClick={() => setSharing(o.type)}
                      style={{ padding: "9px 4px", borderRadius: 10, border: `2px solid ${sharing === o.type ? "#064e3b" : "#e2e8f0"}`, background: sharing === o.type ? "#ecfdf5" : "#fff", cursor: "pointer", textAlign: "center", fontFamily: "Plus Jakarta Sans, sans-serif" }}
                    >
                      <div style={{ fontSize: 12, fontWeight: 700, color: "#0e1117" }}>{o.type}</div>
                      <div style={{ fontSize: 10, color: "#94a3b8" }}>
                        {o.surcharge === 0 ? "Base" : `+₹${o.surcharge.toLocaleString()}`}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Pax counter */}
                <div style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1.5, color: "#374151", marginBottom: 10, fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                  Number of Travelers
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#f8fafc", borderRadius: 12, padding: "10px 14px", marginBottom: 18, border: "1px solid #e2e8f0" }}>
                  <button onClick={() => setPax(Math.max(1, pax - 1))} style={{ width: 34, height: 34, borderRadius: 10, background: "#fff", border: "1px solid #e2e8f0", cursor: "pointer", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                  <span style={{ fontSize: 24, fontWeight: 900, fontFamily: "Playfair Display, serif" }}>{pax}</span>
                  <button onClick={() => setPax(pax + 1)} style={{ width: 34, height: 34, borderRadius: 10, background: "#fff", border: "1px solid #e2e8f0", cursor: "pointer", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                </div>

                <a
                  href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(waMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", background: "#22c55e", color: "#fff", padding: "15px", borderRadius: 14, fontWeight: 800, fontSize: 14, textDecoration: "none", boxSizing: "border-box", fontFamily: "Plus Jakarta Sans, sans-serif" }}
                  onClick={() => window.gtag?.("event", "whatsapp_click", { event_label: "Tour Sidebar", value: totalPrice })}
                >
                  💬 Book on WhatsApp
                </a>
                <p style={{ textAlign: "center", fontSize: 11, color: "#94a3b8", marginTop: 10, fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                  No payment needed to enquire.
                </p>
              </div>
            </div>

            {/* Trust indicators */}
            <div style={{ background: "#fff", borderRadius: 16, padding: 20, marginTop: 16, border: "1px solid #e2e8f0" }}>
              {[
                "✅ Trusted by 50,000+ travelers",
                "⭐ 4.8/5 Google Rating",
                "🔒 100% Secure WhatsApp Booking",
                "💰 No Advance Payment to Enquire",
                "↩️ Easy Cancellation Policy",
              ].map((item, i) => (
                <div key={i} style={{ fontSize: 12, color: "#374151", marginBottom: 8, fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                  {item}
                </div>
              ))}
            </div>
          </aside>
        </div>
      </main>

      <style jsx>{`
        @media (max-width: 768px) {
          .mobile-book-bar { display: flex !important; }
          main > div { grid-template-columns: 1fr !important; }
          aside { display: none !important; }
        }
      `}</style>
    </>
  );
}

function getNextSaturdays(n = 5) {
  const dates = [];
  let d = new Date();
  d.setDate(d.getDate() + ((6 - d.getDay() + 7) % 7 || 7));
  for (let i = 0; i < n; i++) {
    dates.push(new Date(d));
    d.setDate(d.getDate() + 7);
  }
  return dates;
}

// SSG with ISR for maximum SEO performance
export async function getStaticPaths() {
  const paths = TOURS.map((tour) => ({
    params: { slug: tour.slug },
  }));
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const tour = TOURS.find((t) => t.slug === params.slug);
  if (!tour) return { notFound: true };

  const relatedTours = TOURS.filter(
    (t) => t._id !== tour._id && t.region === tour.region
  ).slice(0, 3);

  return {
    props: { tour, relatedTours },
    revalidate: 60, // ISR: Update every 60s (SXO: Fresh content)
  };
}
