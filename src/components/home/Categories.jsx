import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

/**
 * Categories — Interactive Explorer Component
 * 
 * Props:
 * - categories: array of category objects
 * - title: section title
 * - eyebrow: eyebrow text
 */
export default function Categories({
  categories = [],
  title = 'Shop by Category',
  eyebrow = '— Curated Collections —',
}) {
  // Default to first category
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCategory = categories[activeIndex] || categories[0];

  if (!activeCategory) return null;

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
          style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 70px)' }}
        >
          <div className="section-eyebrow">{eyebrow}</div>
          <h2 className="section-title">{title}</h2>
        </motion.div>

        {/* Interactive Layout */}
        <div className="category-explorer">
          
          {/* LEFT: Category List */}
          <div className="category-list">
            {categories.map((cat, i) => (
              <motion.button
                key={cat.name}
                onClick={() => setActiveIndex(i)}
                onMouseEnter={() => setActiveIndex(i)}
                className={`category-item ${i === activeIndex ? 'active' : ''}`}
                whileHover={{ x: 10 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="category-item-content">
                  <span className="category-icon">{cat.icon}</span>
                  <div className="category-text">
                    <h3 className="category-name">{cat.name}</h3>
                    <p className="category-count">{cat.count}+ Pieces</p>
                  </div>
                </div>
                <div className="category-arrow">→</div>
              </motion.button>
            ))}
          </div>

          {/* RIGHT: Dynamic Preview Panel */}
          <div className="category-preview">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="preview-card"
                style={{
                  background: `linear-gradient(135deg, ${activeCategory.color1}, ${activeCategory.color2})`,
                }}
              >
                {/* Decorative Pattern */}
                <div className="preview-pattern" />
                
                {/* Large Icon */}
                <motion.div
                  initial={{ rotate: -10, scale: 0.8 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="preview-icon"
                >
                  {activeCategory.icon}
                </motion.div>

                {/* Content */}
                <div className="preview-content">
                  <div className="preview-eyebrow">Explore Collection</div>
                  <h3 className="preview-title">{activeCategory.name}</h3>
                  <p className="preview-desc">
                    Discover our exclusive range of {activeCategory.name.toLowerCase()}, 
                    crafted with precision and heritage.
                  </p>
                  <Link to={`/category/${activeCategory.name}`} className="preview-btn">
                    Shop {activeCategory.name} →
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}