// pages/index.jsx — Homepage with complete 5-layer optimization
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import SEOHead from "../components/SEOHead";
import {
  SITE,
  TOURS,
  BLOGS,
  BANNERS,
  generateOrganizationSchema,
  generateWebsiteSchema,
  generateFAQSchema,
} from "../data";

// ──────────────────────────────────────────────────────────────────
// HOMEPAGE COMPONENT
// ──────────────────────────────────────────────────────────────────
export default function HomePage({ tours, blogs, banners }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Auto-advance hero slider
  useEffect(() => {
    const timer = setInterval(
      () => setCurrentSlide((p) => (p + 1) % banners.length),
      5500
    );
    return () => clearInterval(timer);
  }, [banners.length]);

  // SXO: Scroll detection for sticky nav
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const filtered = tours.filter(
    (t) =>
      (selectedRegion === "all" || t.region === selectedRegion) &&
      (selectedType === "all" || t.type === selectedType)
  );
  const bestsellers = tours.filter((t) => t.bestseller).slice(0, 4);
  const isDefault = selectedRegion === "all" && selectedType === "all";

  // AEO: Homepage FAQs for "People Also Ask"
  const homepageFAQs = [
    {
      q: "Which is the best travel company for Manali tour packages?",
      a: "Humsafar Community is rated 4.8/5 by 2,847+ travelers and is one of India's highest-rated travel companies for Manali tours. Packages start at ₹6,999/person for 6 days 5 nights including transport, hotel, meals, and sightseeing.",
    },
    {
      q: "What tour packages does Humsafar Community offer?",
      a: "Humsafar Community offers group tours to Himachal Pradesh (Manali, Kasol, Spiti), Uttarakhand (Kedarnath, Rishikesh), Rajasthan (Jaisalmer, Jodhpur), Kerala backwaters, and international tours. Custom private trips and corporate retreats are also available.",
    },
    {
      q: "How can I book a tour with Humsafar Community?",
      a: "Book via WhatsApp at +91 62684 96389 — no advance payment required to enquire. Select your tour on humsafarcommunity.com, choose your departure date, and click 'Book on WhatsApp'. Our team responds within 2 hours.",
    },
    {
      q: "What is the cheapest tour package from Delhi?",
      a: "Humsafar's most affordable package is Rishikesh Rafting & Camping at ₹3,999/person (2 days). Kasol weekend trip: ₹4,999. Manali group tour: ₹6,999/person for 6 days. All prices include transport, accommodation, and most meals.",
    },
  ];

  // Schema.org structured data for homepage (GEO + AIO)
  const schemas = [
    generateOrganizationSchema(),
    generateWebsiteSchema(),
    generateFAQSchema(homepageFAQs),
    // ItemList schema for tours (helps AI systems understand your offerings)
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Best Tour Packages India 2025",
      description:
        "Curated travel packages by Humsafar Community for India and international destinations",
      numberOfItems: tours.length,
      itemListElement: tours.map((tour, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: tour.title,
        url: `${SITE.url}/packages/${tour.slug}/`,
        description: tour.seoDesc,
      })),
    },
  ];

  const regions = [
    { id: "all", label: "All Destinations" },
    { id: "himachal", label: "Himachal Pradesh" },
    { id: "uttarakhand", label: "Uttarakhand" },
    { id: "rajasthan", label: "Rajasthan" },
    { id: "international", label: "International" },
    { id: "other", label: "Rest of India" },
  ];

  const types = [
    { id: "all", label: "All Types" },
    { id: "group", label: "Group Tours" },
    { id: "corporate", label: "Corporate" },
    { id: "custom", label: "Custom" },
    { id: "educational", label: "Educational" },
  ];

  return (
    <>
      {/* ── SEO HEAD ─────────────────────────────────────────────── */}
      <SEOHead
        title="Best Tour Packages India 2025 | Group Tours & Himalayan Treks"
        description={`Book group tours, custom trips & Himalayan treks with ${SITE.name}. Manali ₹6,999 | Kedarnath ₹10,500 | Jaisalmer ₹7,500. Fixed Saturday departures from Delhi. 4.8⭐ rated by 2,847+ travelers.`}
        keywords="group tours india 2025, manali tour package from delhi, kedarnath yatra package, jaisalmer desert safari, himalayan trek packages, corporate team outing, custom trip planning india, travel community india"
        image={SITE.defaultOGImage}
        url="/"
        schemas={schemas}
        breadcrumbs={[{ name: "Home", path: "/" }]}
      />

      {/* ── NAVIGATION ───────────────────────────────────────────── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: isScrolled ? "12px 24px" : "18px 24px",
          background: isScrolled ? "rgba(255,255,255,0.97)" : "transparent",
          backdropFilter: isScrolled ? "blur(20px)" : "none",
          borderBottom: isScrolled ? "1px solid #e2e8f0" : "none",
          boxShadow: isScrolled ? "0 2px 20px rgba(0,0,0,0.07)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <Link
            href="/"
            style={{ textDecoration: "none", lineHeight: 1.1 }}
            aria-label="Humsafar Community Home"
          >
            <div
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: 24,
                fontWeight: 700,
                color: isScrolled ? "#064e3b" : "#fff",
                letterSpacing: -0.5,
              }}
            >
              Humsafar
            </div>
            <div
              style={{
                fontSize: 8,
                fontWeight: 700,
                letterSpacing: 3.5,
                textTransform: "uppercase",
                color: isScrolled ? "#94a3b8" : "rgba(255,255,255,0.6)",
                marginTop: 1,
              }}
            >
              Community
            </div>
          </Link>

          {/* Desktop nav */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              marginLeft: "auto",
            }}
          >
            {[
              { href: "/", label: "Explore" },
              { href: "/upcoming", label: "Upcoming Tours" },
              { href: "/custom-trips", label: "Custom Trips" },
              { href: "/blog", label: "Travel Blog" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: 600,
                  color: isScrolled ? "#4b5563" : "rgba(255,255,255,0.88)",
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                  transition: "color 0.15s",
                }}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: isScrolled ? "#064e3b" : "#fff",
                color: isScrolled ? "#fff" : "#064e3b",
                padding: "10px 20px",
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 700,
                textDecoration: "none",
                fontFamily: "Plus Jakarta Sans, sans-serif",
                boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                transition: "all 0.2s",
              }}
              // SXO: Track WhatsApp conversions
              onClick={() => {
                if (window.gtag) {
                  window.gtag("event", "whatsapp_click", {
                    event_category: "Conversion",
                    event_label: "Header CTA",
                  });
                }
              }}
            >
              💬 Chat Now
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO SECTION ─────────────────────────────────────────── */}
      <section
        aria-label="Hero section with featured destinations"
        style={{
          position: "relative",
          minHeight: "94vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          background: "#064e3b",
        }}
      >
        {/* Background images */}
        {banners.map((b, i) => (
          <div
            key={b.id}
            style={{
              position: "absolute",
              inset: 0,
              opacity: i === currentSlide ? 1 : 0,
              transition: "opacity 1.3s ease",
              zIndex: i === currentSlide ? 1 : 0,
            }}
          >
            <img
              src={b.url}
              alt={b.tag}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              // SXO: Only load visible image eagerly
              loading={i === 0 ? "eager" : "lazy"}
              fetchpriority={i === 0 ? "high" : "auto"}
            />
          </div>
        ))}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg,rgba(0,0,0,0.3) 0%,rgba(0,0,0,0.12) 40%,rgba(0,0,0,0.65) 100%)",
            zIndex: 2,
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 3,
            textAlign: "center",
            width: "100%",
            maxWidth: 860,
            padding: "100px 24px 120px",
          }}
        >
          {/* AEO/GEO: Hero content is what AI reads first */}
          <div key={currentSlide}>
            <p
              style={{
                display: "inline-block",
                marginBottom: 18,
                padding: "6px 22px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.25)",
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(12px)",
                color: "#fff",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 3.5,
                textTransform: "uppercase",
                fontFamily: "Plus Jakarta Sans, sans-serif",
              }}
            >
              {banners[currentSlide]?.tag}
            </p>

            {/* AEO: H1 must contain primary keyword — AI systems weight H1 very heavily */}
            <h1
              className="speakable"
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "clamp(44px,8vw,96px)",
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.0,
                marginBottom: 20,
                letterSpacing: -1,
                textShadow: "0 4px 30px rgba(0,0,0,0.25)",
              }}
            >
              India&apos;s Best{" "}
              <em style={{ color: "#6ee7b7", fontStyle: "italic" }}>
                Travel Community
              </em>
            </h1>

            {/* AEO: Direct answer paragraph — exactly what featured snippets show */}
            <p
              className="speakable"
              style={{
                fontSize: "clamp(15px,2vw,18px)",
                color: "rgba(255,255,255,0.88)",
                maxWidth: 580,
                margin: "0 auto 44px",
                lineHeight: 1.7,
                fontWeight: 300,
                fontFamily: "Plus Jakarta Sans, sans-serif",
              }}
            >
              Book group tours to Manali (₹6,999), Kedarnath Yatra (₹10,500),
              Jaisalmer Desert Safari (₹7,500). Fixed Saturday departures from
              Delhi. 4.8⭐ rated by 50,000+ travelers since 2020.
            </p>
          </div>

          {/* Search form */}
          <form
            onSubmit={handleSearch}
            role="search"
            aria-label="Search destinations"
            style={{
              display: "flex",
              background: "rgba(255,255,255,0.97)",
              backdropFilter: "blur(20px)",
              borderRadius: 999,
              padding: "6px 6px 6px 22px",
              maxWidth: 580,
              margin: "0 auto",
              boxShadow: "0 24px 64px rgba(0,0,0,0.28)",
              alignItems: "center",
              gap: 8,
            }}
          >
            <label htmlFor="hero-search" style={{ display: "none" }}>
              Search travel destinations
            </label>
            <input
              id="hero-search"
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Manali, Kedarnath, Jaisalmer..."
              aria-label="Search destinations"
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                fontSize: 15,
                color: "#0e1117",
                background: "transparent",
                fontFamily: "Plus Jakarta Sans, sans-serif",
                padding: "10px 0",
              }}
            />
            <button
              type="submit"
              aria-label="Search"
              style={{
                background: "#064e3b",
                color: "#fff",
                border: "none",
                borderRadius: 999,
                padding: "12px 28px",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
                flexShrink: 0,
                fontFamily: "Plus Jakarta Sans, sans-serif",
              }}
            >
              Search
            </button>
          </form>

          {/* Slider dots */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 8,
              marginTop: 32,
            }}
          >
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                style={{
                  width: i === currentSlide ? 32 : 8,
                  height: 8,
                  borderRadius: 999,
                  background:
                    i === currentSlide
                      ? "#6ee7b7"
                      : "rgba(255,255,255,0.35)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.35s ease",
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST SIGNALS (SXO: Reduce bounce rate) ──────────────── */}
      <section
        aria-label="Trust signals and statistics"
        style={{
          background: "#064e3b",
          padding: "20px 24px",
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
            gap: 48,
            flexWrap: "wrap",
          }}
        >
          {[
            { value: "50,000+", label: "Happy Travelers" },
            { value: "4.8⭐", label: "Google Rating" },
            { value: "200+", label: "Trips Annually" },
            { value: "Since 2020", label: "Trusted Since" },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 900,
                  color: "#6ee7b7",
                  fontFamily: "Playfair Display, serif",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.65)",
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                  marginTop: 2,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FILTER BAR ───────────────────────────────────────────── */}
      <div style={{ padding: "0 20px" }}>
        <div
          style={{
            background: "#fff",
            borderRadius: 20,
            margin: "-20px auto 0",
            maxWidth: 1100,
            padding: "24px 28px",
            boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
            border: "1px solid #e2e8f0",
            position: "relative",
            zIndex: 20,
          }}
        >
          <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 220 }}>
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  color: "#94a3b8",
                  textTransform: "uppercase",
                  letterSpacing: 2,
                  marginBottom: 11,
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                }}
              >
                Destination
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {regions.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setSelectedRegion(r.id)}
                    aria-pressed={selectedRegion === r.id}
                    style={{
                      padding: "7px 14px",
                      borderRadius: 10,
                      border: `2px solid ${selectedRegion === r.id ? "#064e3b" : "#e2e8f0"}`,
                      background:
                        selectedRegion === r.id ? "#064e3b" : "#fff",
                      color:
                        selectedRegion === r.id ? "#fff" : "#64748b",
                      cursor: "pointer",
                      fontSize: 12,
                      fontWeight: 600,
                      transition: "all 0.15s",
                      fontFamily: "Plus Jakarta Sans, sans-serif",
                    }}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  color: "#94a3b8",
                  textTransform: "uppercase",
                  letterSpacing: 2,
                  marginBottom: 11,
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                }}
              >
                Experience
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {types.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedType(t.id)}
                    aria-pressed={selectedType === t.id}
                    style={{
                      padding: "7px 14px",
                      borderRadius: 10,
                      border: `2px solid ${selectedType === t.id ? "#c8860a" : "#e2e8f0"}`,
                      background:
                        selectedType === t.id ? "#c8860a" : "#fff",
                      color:
                        selectedType === t.id ? "#fff" : "#64748b",
                      cursor: "pointer",
                      fontSize: 12,
                      fontWeight: 600,
                      transition: "all 0.15s",
                      fontFamily: "Plus Jakarta Sans, sans-serif",
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── TOURS SECTION ────────────────────────────────────────── */}
      <main>
        <section
          aria-label="Tour packages"
          style={{ padding: "60px 20px", background: "#fff" }}
        >
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            {!isDefault ? (
              <>
                <h2
                  style={{
                    fontFamily: "Playfair Display, serif",
                    fontSize: 34,
                    fontWeight: 700,
                    color: "#0e1117",
                    marginBottom: 8,
                  }}
                >
                  Showing {filtered.length} Package
                  {filtered.length !== 1 ? "s" : ""}
                </h2>
                <p
                  style={{
                    color: "#64748b",
                    marginBottom: 32,
                    fontFamily: "Plus Jakarta Sans, sans-serif",
                    fontSize: 14,
                  }}
                >
                  Filtered by:{" "}
                  {selectedRegion !== "all" &&
                    regions.find((r) => r.id === selectedRegion)?.label}
                  {selectedType !== "all" &&
                    ` · ${types.find((t) => t.id === selectedType)?.label}`}
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill,minmax(280px,1fr))",
                    gap: 24,
                  }}
                >
                  {filtered.map((tour) => (
                    <TourCard key={tour._id} tour={tour} />
                  ))}
                </div>
                {filtered.length === 0 && (
                  <div
                    style={{
                      textAlign: "center",
                      padding: 80,
                      color: "#94a3b8",
                    }}
                  >
                    No packages match your filters.
                  </div>
                )}
              </>
            ) : (
              <>
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#10b981",
                    textTransform: "uppercase",
                    letterSpacing: 2,
                    marginBottom: 8,
                    fontFamily: "Plus Jakarta Sans, sans-serif",
                  }}
                >
                  Traveler Favorites
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    marginBottom: 32,
                    flexWrap: "wrap",
                    gap: 12,
                  }}
                >
                  <h2
                    style={{
                      fontFamily: "Playfair Display, serif",
                      fontSize: 38,
                      fontWeight: 700,
                      color: "#0e1117",
                    }}
                  >
                    Bestselling Tour Packages
                  </h2>
                  <Link
                    href="/packages"
                    style={{
                      color: "#064e3b",
                      fontWeight: 700,
                      fontSize: 14,
                      textDecoration: "none",
                      fontFamily: "Plus Jakarta Sans, sans-serif",
                    }}
                  >
                    View All Packages →
                  </Link>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill,minmax(280px,1fr))",
                    gap: 24,
                  }}
                >
                  {bestsellers.map((tour) => (
                    <TourCard key={tour._id} tour={tour} />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* ── AEO SECTION: Direct answers for voice search ──────── */}
        <section
          aria-label="Frequently asked questions"
          style={{ padding: "60px 20px", background: "#f8fafc" }}
        >
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#7c3aed",
                textTransform: "uppercase",
                letterSpacing: 2,
                marginBottom: 10,
                fontFamily: "Plus Jakarta Sans, sans-serif",
                textAlign: "center",
              }}
            >
              Quick Answers
            </p>
            <h2
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: 34,
                fontWeight: 700,
                color: "#0e1117",
                marginBottom: 8,
                textAlign: "center",
              }}
            >
              Common Travel Questions
            </h2>
            <p
              style={{
                color: "#64748b",
                fontSize: 14,
                marginBottom: 40,
                textAlign: "center",
                fontFamily: "Plus Jakarta Sans, sans-serif",
              }}
            >
              Direct answers to help you plan your perfect trip
            </p>
            <FAQAccordion faqs={homepageFAQs} />
          </div>
        </section>

        {/* ── BLOG SECTION ─────────────────────────────────────────── */}
        {blogs.length > 0 && (
          <section
            aria-label="Travel blog and guides"
            style={{ padding: "60px 20px", background: "#fff" }}
          >
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#10b981",
                  textTransform: "uppercase",
                  letterSpacing: 2,
                  marginBottom: 8,
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                }}
              >
                Travel Knowledge
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  marginBottom: 32,
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                <h2
                  style={{
                    fontFamily: "Playfair Display, serif",
                    fontSize: 38,
                    fontWeight: 700,
                    color: "#0e1117",
                  }}
                >
                  From Our Travel Blog
                </h2>
                <Link
                  href="/blog"
                  style={{
                    color: "#064e3b",
                    fontWeight: 700,
                    fontSize: 14,
                    textDecoration: "none",
                    fontFamily: "Plus Jakarta Sans, sans-serif",
                  }}
                >
                  All Blog Posts →
                </Link>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
                  gap: 24,
                }}
              >
                {blogs.slice(0, 3).map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── NEWSLETTER (SXO: Engagement signal) ─────────────────── */}
        <section
          aria-label="Newsletter signup"
          style={{
            padding: "72px 20px",
            background: "#064e3b",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "url(https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.1,
            }}
          />
          <div
            style={{
              position: "relative",
              maxWidth: 560,
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#6ee7b7",
                textTransform: "uppercase",
                letterSpacing: 3,
                marginBottom: 14,
                fontFamily: "Plus Jakarta Sans, sans-serif",
              }}
            >
              Join 20,000+ Travelers
            </p>
            <h2
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "clamp(28px,4vw,48px)",
                color: "#fff",
                marginBottom: 16,
                lineHeight: 1.15,
              }}
            >
              Get Exclusive Deals. Delivered Weekly.
            </h2>
            <form
              onSubmit={(e) => e.preventDefault()}
              style={{ display: "flex", gap: 10, maxWidth: 440, margin: "0 auto" }}
            >
              <label htmlFor="newsletter-email" style={{ display: "none" }}>
                Email address for newsletter
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Your email address"
                required
                style={{
                  flex: 1,
                  padding: "14px 18px",
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,0.2)",
                  background: "rgba(255,255,255,0.1)",
                  color: "#fff",
                  fontSize: 14,
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                }}
              />
              <button
                type="submit"
                style={{
                  background: "#10b981",
                  color: "#fff",
                  border: "none",
                  borderRadius: 12,
                  padding: "14px 22px",
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: "pointer",
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                  whiteSpace: "nowrap",
                }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <Footer />

      {/* ── WHATSAPP FLOAT ───────────────────────────────────────── */}
      <a
        href={`https://wa.me/${SITE.whatsapp}?text=Hi Humsafar! I want to book a tour package.`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          background: "#22c55e",
          color: "#fff",
          width: 58,
          height: 58,
          borderRadius: 999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 28px rgba(34,197,94,0.42)",
          zIndex: 50,
          textDecoration: "none",
          fontSize: 26,
        }}
        onClick={() => {
          if (window.gtag) {
            window.gtag("event", "whatsapp_click", {
              event_category: "Conversion",
              event_label: "Float Button",
            });
          }
        }}
      >
        💬
      </a>
    </>
  );
}

// ──────────────────────────────────────────────────────────────────
// TOUR CARD COMPONENT (Semantic HTML for SEO)
// ──────────────────────────────────────────────────────────────────
function TourCard({ tour }) {
  return (
    <article
      style={{
        background: "#fff",
        borderRadius: 18,
        overflow: "hidden",
        border: "1px solid #e2e8f0",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.28s ease, box-shadow 0.28s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 20px 48px rgba(0,0,0,0.13)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
      }}
      itemScope
      itemType="https://schema.org/TouristTrip"
    >
      {/* SEO: Image with proper alt text */}
      <div style={{ position: "relative", paddingTop: "64%", overflow: "hidden" }}>
        <img
          src={tour.img}
          alt={`${tour.title} — ${tour.location}`}
          loading="lazy"
          decoding="async"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          itemProp="image"
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top,rgba(0,0,0,0.6),transparent 60%)",
          }}
        />
        {tour.bestseller && (
          <div
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              background: "#fbbf24",
              color: "#78350f",
              fontSize: 10,
              fontWeight: 800,
              padding: "3px 10px",
              borderRadius: 6,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            ⭐ Bestseller
          </div>
        )}
        <div
          style={{
            position: "absolute",
            bottom: 12,
            left: 12,
            color: "#fff",
            fontSize: 12,
            fontFamily: "Plus Jakarta Sans, sans-serif",
          }}
        >
          📍 <span itemProp="touristType">{tour.location}</span>
        </div>
      </div>

      <div
        style={{
          padding: "18px 20px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <span
            style={{
              background: "#ecfdf5",
              color: "#065f46",
              fontSize: 11,
              fontWeight: 700,
              padding: "4px 10px",
              borderRadius: 6,
              fontFamily: "Plus Jakarta Sans, sans-serif",
            }}
            itemProp="duration"
          >
            🕐 {tour.duration}
          </span>
          <span
            style={{
              fontSize: 12,
              fontFamily: "Plus Jakarta Sans, sans-serif",
            }}
            itemProp="aggregateRating"
            itemScope
            itemType="https://schema.org/AggregateRating"
          >
            <meta itemProp="ratingValue" content={tour.rating} />
            <meta itemProp="reviewCount" content={tour.reviews} />
            ⭐{" "}
            <strong style={{ color: "#0e1117" }}>{tour.rating}</strong>{" "}
            <span style={{ color: "#94a3b8" }}>({tour.reviews})</span>
          </span>
        </div>

        <h3
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: 17,
            fontWeight: 700,
            color: "#0e1117",
            marginBottom: 10,
            lineHeight: 1.3,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
          itemProp="name"
        >
          {tour.title}
        </h3>

        {/* AEO: Direct answer for price query */}
        <p style={{ display: "none" }} itemProp="description">
          {tour.directAnswer}
        </p>

        <div style={{ marginTop: "auto", paddingTop: 14, borderTop: "1px dashed #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
            <meta itemProp="priceCurrency" content="INR" />
            <meta itemProp="price" content={tour.price} />
            {tour.oldPrice && (
              <div style={{ fontSize: 11, color: "#94a3b8", textDecoration: "line-through", fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                ₹{tour.oldPrice}
              </div>
            )}
            <div style={{ fontSize: 21, fontWeight: 900, color: "#0e1117", fontFamily: "Playfair Display, serif" }}>
              ₹{Number(tour.price).toLocaleString("en-IN")}{" "}
              <span style={{ fontSize: 12, fontWeight: 400, color: "#94a3b8", fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                /person
              </span>
            </div>
          </div>
          <Link
            href={`/packages/${tour.slug}`}
            style={{
              background: "#064e3b",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "9px 18px",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              textDecoration: "none",
              fontFamily: "Plus Jakarta Sans, sans-serif",
            }}
            aria-label={`View ${tour.title} details`}
          >
            View Trip
          </Link>
        </div>
      </div>
    </article>
  );
}

// ──────────────────────────────────────────────────────────────────
// BLOG CARD COMPONENT
// ──────────────────────────────────────────────────────────────────
function BlogCard({ blog }) {
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

// ──────────────────────────────────────────────────────────────────
// FAQ ACCORDION COMPONENT (AEO optimized)
// ──────────────────────────────────────────────────────────────────
function FAQAccordion({ faqs }) {
  const [open, setOpen] = useState(null);
  return (
    <div itemScope itemType="https://schema.org/FAQPage">
      {faqs.map((faq, i) => (
        <div
          key={i}
          style={{
            border: "1px solid #e2e8f0",
            borderRadius: 13,
            overflow: "hidden",
            marginBottom: 10,
          }}
          itemScope
          itemType="https://schema.org/Question"
          itemProp="mainEntity"
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            style={{
              cursor: "pointer",
              padding: "18px 22px",
              fontWeight: 600,
              fontSize: 15,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#fff",
              width: "100%",
              border: "none",
              textAlign: "left",
              fontFamily: "Plus Jakarta Sans, sans-serif",
              color: "#1e293b",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
          >
            <span itemProp="name">{faq.q}</span>
            <span style={{ marginLeft: 12, flexShrink: 0, fontSize: 18 }}>
              {open === i ? "−" : "+"}
            </span>
          </button>
          {open === i && (
            <div
              style={{
                padding: "4px 22px 18px",
                fontSize: 14,
                color: "#475569",
                lineHeight: 1.75,
                fontFamily: "Plus Jakarta Sans, sans-serif",
              }}
              itemScope
              itemType="https://schema.org/Answer"
              itemProp="acceptedAnswer"
            >
              <span itemProp="text">{faq.a}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────
// FOOTER COMPONENT
// ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      style={{
        background: "#0c0c0c",
        color: "#64748b",
        padding: "60px 24px 32px",
        fontFamily: "Plus Jakarta Sans, sans-serif",
      }}
      itemScope
      itemType="https://schema.org/WPFooter"
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
            gap: 40,
            marginBottom: 48,
          }}
        >
          <div
            itemScope
            itemType="https://schema.org/Organization"
            itemProp="publisher"
          >
            <div
              style={{
                fontFamily: "Playfair Display, serif",
                color: "#fff",
                fontSize: 26,
                fontWeight: 700,
                marginBottom: 12,
              }}
              itemProp="name"
            >
              Humsafar
            </div>
            <p
              style={{
                fontSize: 13,
                lineHeight: 1.75,
                maxWidth: 260,
                marginBottom: 20,
              }}
              itemProp="description"
            >
              India&apos;s most trusted travel community. Group tours, custom
              expeditions, and Himalayan adventures since 2020.
            </p>
            <div
              itemScope
              itemType="https://schema.org/PostalAddress"
              itemProp="address"
            >
              <div style={{ fontSize: 13, marginBottom: 8 }}>
                📍{" "}
                <span itemProp="streetAddress">Sector 15, Gurugram</span>,{" "}
                <span itemProp="addressRegion">Haryana</span>{" "}
                <span itemProp="postalCode">122001</span>
              </div>
            </div>
            <div style={{ fontSize: 13, marginBottom: 8 }}>
              📞{" "}
              <a
                href={`tel:${SITE.phone}`}
                style={{ color: "#64748b", textDecoration: "none" }}
                itemProp="telephone"
              >
                {SITE.phone}
              </a>
            </div>
            <div style={{ fontSize: 13 }}>
              ✉️{" "}
              <a
                href={`mailto:${SITE.email}`}
                style={{ color: "#64748b", textDecoration: "none" }}
                itemProp="email"
              >
                {SITE.email}
              </a>
            </div>
          </div>

          <nav aria-label="Destination links">
            <h3
              style={{
                color: "#fff",
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 2,
                marginBottom: 20,
              }}
            >
              Destinations
            </h3>
            {[
              { label: "Himachal Pradesh Tours", href: "/packages?region=himachal" },
              { label: "Uttarakhand Treks", href: "/packages?region=uttarakhand" },
              { label: "Rajasthan Packages", href: "/packages?region=rajasthan" },
              { label: "Kerala Backwaters", href: "/packages?region=other" },
              { label: "International Tours", href: "/packages?region=international" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "block",
                  color: "#64748b",
                  fontSize: 13,
                  marginBottom: 12,
                  textDecoration: "none",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#10b981")}
                onMouseLeave={(e) => (e.target.style.color = "#64748b")}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <nav aria-label="Company links">
            <h3
              style={{
                color: "#fff",
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 2,
                marginBottom: 20,
              }}
            >
              Company
            </h3>
            {[
              { label: "Custom Trips", href: "/custom-trips" },
              { label: "Travel Blog", href: "/blog" },
              { label: "Upcoming Departures", href: "/upcoming" },
              { label: "About Us", href: "/about" },
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms & Conditions", href: "/terms" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "block",
                  color: "#64748b",
                  fontSize: 13,
                  marginBottom: 12,
                  textDecoration: "none",
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div>
            <h3
              style={{
                color: "#fff",
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 2,
                marginBottom: 20,
              }}
            >
              Connect
            </h3>
            <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
              {Object.entries(SITE.socials).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow on ${platform}`}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 999,
                    background: "#1c1c1c",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textDecoration: "none",
                    fontSize: 16,
                    transition: "background 0.2s",
                  }}
                >
                  {platform === "instagram"
                    ? "📸"
                    : platform === "facebook"
                    ? "👥"
                    : platform === "youtube"
                    ? "▶️"
                    : "🐦"}
                </a>
              ))}
            </div>
            {/* Trust badges */}
            <div
              style={{
                background: "#1c1c1c",
                borderRadius: 12,
                padding: "14px 16px",
                fontSize: 12,
                lineHeight: 1.8,
              }}
            >
              <div>✅ GST Registered: 06AABCH1234F1Z5</div>
              <div>✅ MSME Certified</div>
              <div>✅ 4.8⭐ Google Rated</div>
              <div>✅ 50,000+ Travelers Served</div>
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid #1f1f1f",
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
            fontSize: 12,
          }}
        >
          <span>
            © {new Date().getFullYear()} Humsafar Tours and Travels Pvt. Ltd.
            All rights reserved.
          </span>
          <span>Made with ❤️ in India · Gurugram, Haryana</span>
        </div>
      </div>
    </footer>
  );
}

// ──────────────────────────────────────────────────────────────────
// getStaticProps — Server-side data fetching (SEO: ensures content
// is rendered server-side for Google crawl bots)
// ──────────────────────────────────────────────────────────────────
export async function getStaticProps() {
  // In production: replace with Sanity/CMS fetch
  return {
    props: {
      tours: TOURS,
      blogs: BLOGS,
      banners: BANNERS,
    },
    // ISR: Revalidate every 60 seconds (SXO: Always fresh content)
    revalidate: 60,
  };
}
