import Link from 'next/link';

export default function Footer({ dynamicSite }) {
  if (!dynamicSite) return null;
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
              {dynamicSite.name}
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
              {dynamicSite.name} - India&apos;s most trusted travel community. Group tours, custom
              expeditions, and Himalayan adventures since 2020.
            </p>
            <div
              itemScope
              itemType="https://schema.org/PostalAddress"
              itemProp="address"
            >
              <div style={{ fontSize: 13, marginBottom: 8 }}>
                📍{" "}
                <span itemProp="streetAddress">{dynamicSite.location || 'Sector 15, Gurugram'}</span>,{" "}
                <span itemProp="addressRegion">Haryana</span>{" "}
                <span itemProp="postalCode">122001</span>
              </div>
            </div>
            <div style={{ fontSize: 13, marginBottom: 8 }}>
              📞{" "}
              <a
                href={`tel:${dynamicSite.phone}`}
                style={{ color: "#64748b", textDecoration: "none" }}
                itemProp="telephone"
              >
                {dynamicSite.phone}
              </a>
            </div>
            <div style={{ fontSize: 13 }}>
              ✉️{" "}
              <a
                href={`mailto:${dynamicSite.email}`}
                style={{ color: "#64748b", textDecoration: "none" }}
                itemProp="email"
              >
                {dynamicSite.email}
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
              {Object.entries(dynamicSite.socials || {}).map(([platform, url]) => (
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
            <div
              style={{
                background: "#1c1c1c",
                borderRadius: 12,
                padding: "14px 16px",
                fontSize: 12,
                lineHeight: 1.8,
              }}
            >
              <div>✅ GST Registered: {dynamicSite.gst}</div>
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
            © {new Date().getFullYear()} {dynamicSite.name} Pvt. Ltd.
            All rights reserved.
          </span>
          <span>Made with ❤️ in India · {dynamicSite.location}</span>
        </div>
      </div>
    </footer>
  );
}
