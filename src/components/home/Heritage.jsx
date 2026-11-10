import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Heritage({
  manifesto = [],
  visuals = [],
  stats = [],
  cta = { text: 'Discover Our Story', link: '/about' },
}) {
  const containerRef = useRef(null);

  // Global scroll progress for the whole section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Parallax for the background decorative element
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <section
      ref={containerRef}
      style={{
        padding: 'clamp(100px, 15vw, 200px) 0',
        background: '#FAF6F0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle Background Element */}
      <motion.div
        style={{
          y: bgY,
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: '80%',
          background: 'radial-gradient(circle, rgba(201,169,97,0.06) 0%, transparent 60%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 clamp(20px, 5vw, 40px)', position: 'relative', zIndex: 10 }}>
        
        {/* 1. THE MANIFESTO (Huge Typography) */}
        <div className="heritage-manifesto">
          {manifesto.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`manifesto-line ${i === manifesto.length - 1 ? 'italic' : ''}`}
            >
              {line}
            </motion.div>
          ))}
        </div>

        {/* 2. OVERLAPPING PARALLAX VISUALS */}
        {visuals.length >= 2 && (
          <div className="heritage-visuals">
            {/* Back Image (Moves Slower) */}
            <ParallaxImage 
              src={visuals[0].image} 
              caption={visuals[0].caption} 
              location={visuals[0].location}
              speed={0.15}
              className="visual-back"
            />
            {/* Front Image (Moves Faster) */}
            <ParallaxImage 
              src={visuals[0].image} 
              caption={visuals[0].caption} 
              location={visuals[0].location}
              speed={0.3}
              className="visual-front"
            />
          </div>
        )}

        {/* 3. MINIMALIST STATS */}
        <div className="heritage-stats-grid">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="stat-item"
            >
              <div className="stat-number">{stat.number}</div>
              <div className="stat-divider" />
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        {cta.link && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ textAlign: 'center', marginTop: 'clamp(60px, 10vw, 100px)' }}
          >
            <Link to={cta.link} className="heritage-cta">
              {cta.text}
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// ===== PARALLAX IMAGE COMPONENT =====
function ParallaxImage({ src, caption, location, speed, className }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [speed * 200, -speed * 200]);

  return (
    <motion.div ref={ref} className={`heritage-img-wrap ${className}`} style={{ y }}>
      <div className="heritage-img-inner">
        <img src={src} alt={caption} loading="lazy" />
      </div>
      <div className="heritage-img-caption">
        <span className="caption-text">{caption}</span>
        <span className="caption-loc">{location}</span>
      </div>
    </motion.div>
  );
}