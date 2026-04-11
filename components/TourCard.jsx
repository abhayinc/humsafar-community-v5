import Link from 'next/link';
import Image from 'next/image';

export default function TourCard({ tour }) {
  if (!tour) return null;
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
      <div style={{ position: "relative", paddingTop: "64%", overflow: "hidden" }}>
        <Image
          src={tour.img}
          alt={`${tour.title} — ${tour.location}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{
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
