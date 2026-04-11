import { useState } from 'react';

export default function FAQAccordion({ faqs }) {
  const [open, setOpen] = useState(null);
  if (!faqs || faqs.length === 0) return null;

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
