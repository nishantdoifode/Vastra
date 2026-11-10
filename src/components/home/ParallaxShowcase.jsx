import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PARALLAX_LAYOUT } from '../../data/config';


export default function ParallaxShowcase({
  products = [],
  title = 'Stories Woven in Silk',
  subtitle = 'Discover our most exclusive pieces, where every thread tells a tale of tradition and artistry.',
  eyebrow = '— The Heritage Edit —',
  ctaLink = '/special',
  ctaText = 'Explore Special Collection →',
  maxItems = PARALLAX_LAYOUT.maxItems,
}) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const bgY1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const displayProducts = products.slice(0, maxItems);

  return (
    <section
      ref={containerRef}
      style={{
        padding: 'clamp(80px, 12vw, 140px) 0',
        background: '#FAF6F0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background blobs */}
      <motion.div
        style={{
          y: bgY1,
          position: 'absolute',
          top: '10%',
          left: '-5%',
          width: 'clamp(200px, 30vw, 400px)',
          height: 'clamp(200px, 30vw, 400px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,169,97,0.12), transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />
      <motion.div
        style={{
          y: bgY2,
          position: 'absolute',
          bottom: '10%',
          right: '-5%',
          width: 'clamp(200px, 30vw, 400px)',
          height: 'clamp(200px, 30vw, 400px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(123,30,58,0.1), transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 clamp(16px, 4vw, 40px)', position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 70px)' }}
        >
          <div className="section-eyebrow">{eyebrow}</div>
          <h2 className="section-title">
            {title.split(' ').map((word, i) => 
              i === title.split(' ').length - 1 ? (
                <span key={i} style={{ fontStyle: 'italic', color: '#7B1E3A' }}>{word} </span>
              ) : (
                <span key={i}>{word} </span>
              )
            )}
          </h2>
          <p style={{ fontSize: 'clamp(14px, 1.6vw, 17px)', color: '#6B5A5F', maxWidth: 600, margin: '16px auto 0', lineHeight: 1.7 }}>
            {subtitle}
          </p>
        </motion.div>

        {/* Editorial Grid */}
        <div className="editorial-grid">
          {displayProducts.map((product, i) => (
            <EditorialCard
              key={product.id}
              product={product}
              index={i}
              staggerDelay={PARALLAX_LAYOUT.staggerDelay}
            />
          ))}
        </div>

        {/* CTA */}
        {ctaLink && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ textAlign: 'center', marginTop: 'clamp(40px, 6vw, 70px)' }}
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

// ===== EDITORIAL CARD =====
function EditorialCard({ product, index, staggerDelay }) {
  const cardRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: index * staggerDelay, ease: [0.22, 1, 0.36, 1] }}
      className="editorial-card"
    >
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
        <div className="editorial-card-inner">
          <div className="editorial-image-wrap">
            <motion.div
              className="editorial-image-inner"
              style={{
                y: imageY,
                background: `linear-gradient(135deg, ${product.color1}, ${product.color2})`,
              }}
            >
              {product.image ? (
                <img src={product.image} alt={product.name} loading="lazy" className="editorial-img" />
              ) : (
                <div className="editorial-icon">{product.icon}</div>
              )}
            </motion.div>

            <div className="editorial-overlay" />

            {product.tag && <div className="editorial-tag">{product.tag}</div>}

            <div className="editorial-content">
              <div className="editorial-category">{product.category}</div>
              <h3 className="editorial-title">{product.name}</h3>
              <p className="editorial-desc">{product.description}</p>
              <div className="editorial-btn-wrap">
                <div className="editorial-view-btn">Explore Piece →</div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}