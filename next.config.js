// ============================================================
// HUMSAFAR — Next.js Configuration
// File: next.config.js
// PURPOSE: Performance, security, and SEO optimization settings
// SXO: Image optimization, caching headers
// GEO: Security headers that don't block AI crawlers
// ============================================================

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── SXO: Enable React strict mode (better error detection) ──
  reactStrictMode: true,

  // ── SEO: Trailing slash consistency (avoids duplicate content) ──
  trailingSlash: false,

  // ── SXO: Image optimization (improves LCP — Core Web Vitals) ──
  images: {
    formats: ["image/avif", "image/webp"],
    domains: [
      "images.unsplash.com",
      "humsafarcommunity.com",
      "uttarakhandtourism.gov.in",
      "hikerwolf.com",
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },

  // ── SXO + GEO: HTTP Response Headers ──────────────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self)",
          },
          {
            key: "Cache-Control",
            value: process.env.NODE_ENV === "production" 
              ? "public, max-age=31536000, immutable"
              : "no-store, max-age=0",
          },
        ],
      },
      {
        source: "/(packages|blog|upcoming-tours)(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
          },
        ],
      },
    ];
  },

  // ── SEO: URL redirects ──
  async redirects() {
    return [
      {
        source: "/tours/:slug",
        destination: "/packages/:slug",
        permanent: true,
      },
      {
        source: "/tour/:slug",
        destination: "/packages/:slug",
        permanent: true,
      },
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ];
  },

  // ── SXO: Compiler options ──
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // ── FIX: Prevent HMR loop on data.json ──
  webpack: (config) => {
    config.watchOptions = {
      ...(config.watchOptions || {}),
      ignored: ["**/node_modules/**", "**/data/data.json"],
    };
    return config;
  },
};

module.exports = nextConfig;
