import React from 'react';
import { motion } from 'framer-motion';

/**
 * Testimonials — Infinite Marquee Component
 * 
 * Props:
 * - reviews: array of review objects
 * - title: section title
 * - subtitle: section subtitle
 * - eyebrow: eyebrow text
 */
export default function Testimonials({
  reviews = [],
  title = 'Loved by Thousands',
  subtitle = 'Real stories from our cherished community of fashion lovers.',
  eyebrow = '— Client Diaries —',
}) {
  if (reviews.length === 0) return null;

  // Duplicate reviews for seamless infinite scroll
  const marqueeItems = [...reviews, ...reviews];

  return (
    <section style={{
      padding: 'clamp(60px, 10vw, 100px) 0',
      background: 'linear-gradient(180deg, #FAF6F0 0%, #F5EFE4 100%)',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 clamp(16px, 4vw, 40px)' }}>
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 60px)' }}
        >
          <div className="section-eyebrow">{eyebrow}</div>
          <h2 className="section-title">{title}</h2>
          <p style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', color: '#6B5A5F', maxWidth: 500, margin: '12px auto 0', lineHeight: 1.6 }}>
            {subtitle}
          </p>
        </motion.div>
      </div>

      {/* Marquee Container */}
      <div className="marquee-container">
        <div className="marquee-track">
          {marqueeItems.map((review, i) => (
            <ReviewCard key={`${review.id}-${i}`} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== REVIEW CARD =====
function ReviewCard({ review }) {
  return (
    <div className="review-card">
      {/* Top Row: Avatar & Rating */}
      <div className="review-header">
        <div className="review-avatar" style={{ background: 'linear-gradient(135deg, #7B1E3A, #C9A961)' }}>
          {review.avatar}
        </div>
        <div className="review-meta">
          <h4 className="review-name">{review.name}</h4>
          <p className="review-location">{review.location}</p>
        </div>
        <div className="review-stars">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={`star ${i < review.rating ? 'filled' : ''}`}>★</span>
          ))}
        </div>
      </div>

      {/* Quote */}
      <p className="review-text">"{review.text}"</p>

      {/* Footer: Product Link */}
      <div className="review-footer">
        <span className="review-label">Purchased</span>
        <span className="review-product">{review.product}</span>
      </div>
    </div>
  );
}