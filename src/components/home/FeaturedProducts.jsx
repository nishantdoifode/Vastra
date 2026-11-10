import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProductCard from '../shared/ProductCard';
import { FILTERS, ANIMATIONS, FEATURED_LAYOUT } from '../../data/config';

/**
 * FeaturedProducts — Fully Reusable Component
 * 
 * Props:
 * - products: array of product objects
 * - title: section title
 * - subtitle: section subtitle
 * - eyebrow: eyebrow text
 * - showFilters: boolean
 * - maxItems: number (optional)
 * - ctaLink: string
 * - ctaText: string
 * 
 * Example usage:
 * <FeaturedProducts products={myProducts} title="Bestsellers" />
 */
export default function FeaturedProducts({
  products = [],
  title = 'Bestsellers',
  subtitle = 'Handpicked for You',
  eyebrow = '— Handpicked for You —',
  showFilters = true,
  maxItems = FEATURED_LAYOUT.maxItems,
  ctaLink = '/trending',
  ctaText = 'View All Products →',
}) {
  const [active, setActive] = useState('All');

  // Memoized filtering — performance optimization
  const filtered = useMemo(() => {
    let result = active === 'All' ? products : products.filter((p) => p.category === active);
    return result.slice(0, maxItems);
  }, [active, products, maxItems]);

  return (
    <section style={{
      padding: 'clamp(60px, 10vw, 120px) 0',
      background: '#FAF6F0',
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 clamp(16px, 4vw, 40px)' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: 'clamp(32px, 5vw, 56px)',
            flexWrap: 'wrap',
            gap: 20,
          }}
        >
          <div>
            <div className="section-eyebrow">{eyebrow}</div>
            <h2 className="section-title">{title}</h2>
          </div>

          {showFilters && (
            <div className="filters">
              {FILTERS.map((f) => (
                <motion.button
                  key={f}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActive(f)}
                  className="filter-btn"
                  style={{
                    background: active === f ? '#7B1E3A' : 'transparent',
                    color: active === f ? '#FAF6F0' : '#2A1A1F',
                    border: `1.5px solid ${active === f ? '#7B1E3A' : 'rgba(42,26,31,.2)'}`,
                  }}
                >
                  {f}
                </motion.button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Grid */}
        <div className="featured-grid">
          {filtered.map((product, i) => {
            // Animation cycle karega — 8 items ke baad repeat
            const animIndex = i % FEATURED_LAYOUT.animations.length;
            const variant = FEATURED_LAYOUT.animations[animIndex];

            return (
              <motion.div
                key={product.id}
                initial={variant.initial}
                whileInView={variant.animate}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#6B5A5F' }}>
            No products found in this category.
          </div>
        )}

        {/* CTA */}
        {ctaLink && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ textAlign: 'center', marginTop: 'clamp(40px, 6vw, 60px)' }}
          >
            <Link to={ctaLink} className="view-all-btn">
              {ctaText}
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}