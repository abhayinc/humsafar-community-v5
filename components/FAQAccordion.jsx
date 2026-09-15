import { useState } from 'react';

export default function FAQAccordion({ faqs }) {
  const [open, setOpen] = useState(null);
  if (!faqs || faqs.length === 0) return null;

  return (
    <div itemScope itemType="https://schema.org/FAQPage">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className="faq-item"
            itemScope
            itemType="https://schema.org/Question"
            itemProp="mainEntity"
          >
            <button
              className="faq-question"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`faq-${i}`}
            >
              <span itemProp="name">{faq.q}</span>
              <span style={{ marginLeft: 12, flexShrink: 0, fontSize: 18 }}>{isOpen ? '−' : '+'}</span>
            </button>

            <div
              id={`faq-${i}`}
              className="faq-answer"
              role="region"
              aria-hidden={!isOpen}
              style={{ display: isOpen ? 'block' : 'none' }}
              itemScope
              itemType="https://schema.org/Answer"
              itemProp="acceptedAnswer"
            >
              <span itemProp="text">{faq.a}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
