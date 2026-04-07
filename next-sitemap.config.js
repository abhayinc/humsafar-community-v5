// next-sitemap.config.js
// Run: npx next-sitemap after build

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://humsafarcommunity.com",
  generateRobotsTxt: false, // We have our own custom robots.txt
  generateIndexSitemap: true,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 7000,
  
  // Exclude pages that shouldn't be indexed
  exclude: [
    "/admin",
    "/admin/*",
    "/api/*",
    "/404",
    "/500",
    "/search",
  ],

  // Custom priorities for different page types
  transform: async (config, path) => {
    // Homepage — highest priority
    if (path === "/") {
      return {
        loc: path,
        changefreq: "daily",
        priority: 1.0,
        lastmod: new Date().toISOString(),
      };
    }

    // Tour package pages — very high priority
    if (path.startsWith("/packages/") && path !== "/packages") {
      return {
        loc: path,
        changefreq: "weekly",
        priority: 0.9,
        lastmod: new Date().toISOString(),
      };
    }

    // Package listing page
    if (path === "/packages") {
      return {
        loc: path,
        changefreq: "daily",
        priority: 0.85,
        lastmod: new Date().toISOString(),
      };
    }

    // Blog posts — high priority for SEO
    if (path.startsWith("/blog/") && path !== "/blog") {
      return {
        loc: path,
        changefreq: "monthly",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      };
    }

    // Blog listing
    if (path === "/blog") {
      return {
        loc: path,
        changefreq: "weekly",
        priority: 0.75,
        lastmod: new Date().toISOString(),
      };
    }

    // Other pages
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    };
  },

  // Additional sitemaps for images
  additionalPaths: async (config) => {
    // Import tours data to generate image sitemap entries
    const tours = [
      {
        slug: "manali-kasol-solang-valley-atal-tunnel",
        title: "Manali Kasol Group Tour",
        img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200",
      },
      {
        slug: "kedarnath-yatra-char-dham-trek",
        title: "Kedarnath Yatra Package",
        img: "https://images.unsplash.com/photo-1562016600-ece13e8ba570?q=80&w=1200",
      },
      {
        slug: "jaisalmer-desert-safari-golden-fort",
        title: "Jaisalmer Desert Safari",
        img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1200",
      },
    ];

    return tours.map((tour) => ({
      loc: `/packages/${tour.slug}`,
      lastmod: new Date().toISOString(),
      changefreq: "weekly",
      priority: 0.9,
      // Image sitemap data
      images: [
        {
          loc: tour.img,
          title: tour.title,
          caption: `${tour.title} — Humsafar Community`,
        },
      ],
    }));
  },
};
