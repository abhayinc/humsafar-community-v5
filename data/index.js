// ============================================================
// data/index.js — All tours, blogs, banners + SEO data
// Humsafar Community v5.0
// ============================================================

import data from './data.json';

export const SITE = data.SITE;
export const TOURS = data.TOURS;
export const BLOGS = data.BLOGS;
export const BANNERS = data.BANNERS;

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["TravelAgency", "LocalBusiness"],
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    alternateName: ["Humsafar", "Humsafar Travels", "Humsafar Tours"],
    url: SITE.url,
    logo: {
      "@type": "ImageObject",
      url: `${SITE.url}/logo.png`,
      width: 200,
      height: 60,
    },
    description:
      "India's most trusted travel community. Award-winning group tours, custom Himalayan expeditions, and corporate retreats. Serving 50,000+ travelers since 2020.",
    telephone: SITE.phone,
    email: SITE.email,
    foundingDate: SITE.founded,
    address: {
      "@type": "PostalAddress",
      streetAddress: "4th Floor, Adventure Hub, Sector 15",
      addressLocality: "Gurugram",
      addressRegion: "Haryana",
      postalCode: "122001",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.lat,
      longitude: SITE.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "10:00",
        closes: "18:00",
      },
    ],
    priceRange: "₹₹",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: SITE.ratingValue,
      reviewCount: SITE.reviewCount,
      bestRating: "5",
      worstRating: "1",
    },
    sameAs: Object.values(SITE.socials),
  };
}

export function generateTourSchema(tour) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": `${SITE.url}/packages/${tour.slug}/`,
    name: tour.title,
    description: tour.seoDesc,
    image: tour.img,
    url: `${SITE.url}/packages/${tour.slug}/`,
    offers: {
      "@type": "Offer",
      price: tour.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      validFrom: new Date().toISOString().split("T")[0],
      seller: {
        "@type": "TravelAgency",
        name: SITE.name,
        url: SITE.url,
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: tour.rating,
      reviewCount: tour.reviews,
      bestRating: "5",
    },
    provider: {
      "@type": "TravelAgency",
      "@id": `${SITE.url}/#organization`,
      name: SITE.name,
    },
    itinerary: tour.itinerary?.map((day) => ({
      "@type": "TouristAttraction",
      name: day.title,
      description: day.desc,
    })),
    ...(tour.faqs?.length > 0
      ? {
          mainEntity: tour.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : {}),
  };
}

export function generateArticleSchema(blog) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE.url}/blog/${blog.slug}/`,
    headline: blog.seoTitle || blog.title,
    description: blog.seoDesc || blog.excerpt,
    image: {
      "@type": "ImageObject",
      url: blog.coverImage,
      width: 1200,
      height: 630,
    },
    datePublished: blog.publishedAt,
    dateModified: blog.updatedAt || blog.publishedAt,
    author: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: `${SITE.url}/logo.png` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE.url}/blog/${blog.slug}/`,
    },
    keywords: blog.keywords,
    articleSection: blog.category,
    wordCount: (blog.readTime || 5) * 200,
    inLanguage: "en-IN",
    ...(blog.faqs?.length > 0
      ? {
          mainEntity: blog.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : {}),
  };
}

export function generateFAQSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
        author: { "@type": "Organization", name: SITE.name },
      },
    })),
  };
}

export function generateBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    description:
      "India's #1 travel community for group tours, Himalayan treks, and custom trips",
    inLanguage: "en-IN",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE.url}/#organization`,
    },
  };
}
