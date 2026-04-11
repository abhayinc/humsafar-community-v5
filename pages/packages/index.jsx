import { useState } from "react";
import SEOHead from "../../components/SEOHead";
import TourCard from "../../components/TourCard";
import Footer from "../../components/Footer";
import { getFreshData, SITE } from "../../data";
import Link from "next/link";

export default function PackagesPage({ tours, site: freshSite }) {
  const dynamicSite = freshSite || SITE || { name: "Humsafar Community", socials: {} };
  const [selectedRegion, setSelectedRegion] = useState("all");
  
  const regions = [
    { id: "all", label: "All Destinations" },
    { id: "himachal", label: "Himachal Pradesh" },
    { id: "uttarakhand", label: "Uttarakhand" },
    { id: "rajasthan", label: "Rajasthan" },
    { id: "international", label: "International" },
    { id: "other", label: "Rest of India" },
  ];

  const filtered = tours.filter(
    (t) => selectedRegion === "all" || t.region === selectedRegion
  );

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh" }}>
      <SEOHead
        title="All Tour Packages | Humsafar Community"
        description="Explore all our group tours and travel packages across India and International destinations."
        site={dynamicSite}
        url="/packages"
      />

      <nav style={{ padding: "20px", background: "#064e3b", color: "#fff" }}>
         <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Link href="/" style={{ color: "#fff", textDecoration: "none", fontWeight: 700, fontSize: 20 }}>Humsafar</Link>
            <Link href="/" style={{ color: "#fff", textDecoration: "none", fontSize: 14 }}>← Back to Home</Link>
         </div>
      </nav>

      <main style={{ maxWidth: 1100, margin: "40px auto", padding: "0 20px" }}>
        <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: 40, marginBottom: 20 }}>Our Tour Packages</h1>
        
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 40 }}>
          {regions.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelectedRegion(r.id)}
              style={{
                padding: "10px 20px",
                borderRadius: 12,
                border: "none",
                background: selectedRegion === r.id ? "#064e3b" : "#fff",
                color: selectedRegion === r.id ? "#fff" : "#64748b",
                cursor: "pointer",
                fontWeight: 600,
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
              }}
            >
              {r.label}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 30 }}>
          {filtered.map((tour) => (
            <TourCard key={tour._id} tour={tour} />
          ))}
        </div>
        
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "100px", color: "#94a3b8" }}>
            No packages found in this category.
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
      tours: data.TOURS,
      site: data.SITE,
    },
    revalidate: 60,
  };
}
