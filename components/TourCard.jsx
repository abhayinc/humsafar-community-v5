import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function TourCard({ tour }) {
  const router = useRouter();
  if (!tour) return null;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      router.push(`/packages/${tour.slug}`);
    }
  };

  return (
    <article
      className="tour-card"
      itemScope
      itemType="https://schema.org/TouristTrip"
      tabIndex={0}
      role="article"
      onKeyDown={handleKeyDown}
    >
      <div className="tour-card-image">
        <Image
          src={tour.img}
          alt={`${tour.title} — ${tour.location}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{ objectFit: 'cover' }}
          itemProp="image"
        />
        <div className="tour-card-overlay" aria-hidden />
        {tour.bestseller && <div className="tour-card-badge">⭐ Bestseller</div>}

        <div className="tour-card-location">📍 <span itemProp="touristType">{tour.location}</span></div>
      </div>

      <div className="tour-card-content">
        <div className="tour-card-meta">
          <span className="tour-card-duration" itemProp="duration">🕐 {tour.duration}</span>

          <span className="tour-card-rating" itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
            <meta itemProp="ratingValue" content={String(tour.rating)} />
            <meta itemProp="reviewCount" content={String(tour.reviews)} />
            ⭐ <strong className="rating-value">{tour.rating}</strong> <span className="rating-count">({tour.reviews})</span>
          </span>
        </div>

        <h3 className="tour-card-title" itemProp="name">{tour.title}</h3>

        <div className="tour-card-footer">
          <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
            <meta itemProp="priceCurrency" content="INR" />
            <meta itemProp="price" content={String(tour.price)} />
            {tour.oldPrice && <div className="old-price">₹{tour.oldPrice}</div>}
            <div className="price">₹{Number(tour.price).toLocaleString('en-IN')} <span className="per-person">/person</span></div>
          </div>

          <Link href={`/packages/${tour.slug}`} aria-label={`View ${tour.title} details`} className="btn-primary">
            View Trip
          </Link>
        </div>
      </div>
    </article>
  );
}
