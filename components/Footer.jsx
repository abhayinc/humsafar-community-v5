import Link from 'next/link';

export default function Footer({ dynamicSite }) {
  if (!dynamicSite) return null;
  return (
    <footer className="site-footer" itemScope itemType="https://schema.org/WPFooter">
      <div className="container">
        <div className="footer-grid">
          <div itemScope itemType="https://schema.org/Organization" itemProp="publisher">
            <div className="footer-heading" itemProp="name" style={{ fontFamily: 'Playfair Display, serif', color: '#fff', fontSize: 26, marginBottom: 12 }}>
              {dynamicSite.name}
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.75, maxWidth: 260, marginBottom: 20 }} itemProp="description">
              {dynamicSite.name} - India&apos;s most trusted travel community. Group tours, custom expeditions, and Himalayan adventures since 2020.
            </p>

            <div itemScope itemType="https://schema.org/PostalAddress" itemProp="address">
              <div style={{ fontSize: 13, marginBottom: 8 }}>
                📍 <span itemProp="streetAddress">{dynamicSite.location || 'Sector 15, Gurugram'}</span>, <span itemProp="addressRegion">Haryana</span> <span itemProp="postalCode">122001</span>
              </div>
            </div>

            <div style={{ fontSize: 13, marginBottom: 8 }}>
              📞 <a href={`tel:${dynamicSite.phone}`} className="footer-link" itemProp="telephone">{dynamicSite.phone}</a>
            </div>
            <div style={{ fontSize: 13 }}>
              ✉️ <a href={`mailto:${dynamicSite.email}`} className="footer-link" itemProp="email">{dynamicSite.email}</a>
            </div>
          </div>

          <nav aria-label="Destination links">
            <div className="footer-heading">Destinations</div>
            {[
              { label: 'Himachal Pradesh Tours', href: '/packages?region=himachal' },
              { label: 'Uttarakhand Treks', href: '/packages?region=uttarakhand' },
              { label: 'Rajasthan Packages', href: '/packages?region=rajasthan' },
              { label: 'Kerala Backwaters', href: '/packages?region=other' },
              { label: 'International Tours', href: '/packages?region=international' },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="footer-link">
                {item.label}
              </Link>
            ))}
          </nav>

          <nav aria-label="Company links">
            <div className="footer-heading">Company</div>
            {[
              { label: 'Custom Trips', href: '/custom-trips' },
              { label: 'Travel Blog', href: '/blog' },
              { label: 'Upcoming Departures', href: '/upcoming' },
              { label: 'About Us', href: '/about' },
              { label: 'Privacy Policy', href: '/privacy' },
              { label: 'Terms & Conditions', href: '/terms' },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="footer-link">
                {item.label}
              </Link>
            ))}
          </nav>

          <div>
            <div className="footer-heading">Connect</div>
            <div className="social-row">
              {Object.entries(dynamicSite.socials || {}).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow on ${platform}`}
                  className="social-icon"
                >
                  {platform === 'instagram' ? '📸' : platform === 'facebook' ? '👥' : platform === 'youtube' ? '▶️' : '🐦'}
                </a>
              ))}
            </div>
            <div className="trust-box">
              <div>✅ GST Registered: {dynamicSite.gst}</div>
              <div>✅ MSME Certified</div>
              <div>✅ 4.8⭐ Google Rated</div>
              <div>✅ 50,000+ Travelers Served</div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {dynamicSite.name} Pvt. Ltd. All rights reserved.</span>
          <span>Made with ❤️ in India · {dynamicSite.location}</span>
        </div>
      </div>
    </footer>
  );
}
