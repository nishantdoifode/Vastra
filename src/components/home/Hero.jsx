import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="hero-magazine">
      {/* Full Background Image */}
      <div className="hero-bg-image">
        
        <div className="hero-bg-overlay" />
      </div>

      {/* Top Navigation Bar (Inside Hero) */}
      <motion.div 
        className="hero-top-bar"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="hero-brand">VASTRA</div>
        <div className="hero-edition">Festive Edition 2026</div>
      </motion.div>

      {/* Main Content - Centered */}
      <div className="hero-content-wrapper">
        
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hero-eyebrow"
        >
          — The Art of Indian Weaving —
        </motion.div>

        {/* Giant Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="hero-giant-title"
        >
          WEAVE<br />
          <span className="hero-title-italic">Your</span><br />
          HERITAGE
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="hero-subtitle"
        >
          Handcrafted sarees, lehengas & ethnic wear — celebrating timeless artistry.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="hero-cta-group"
        >
          <Link to="/category/Sarees" className="hero-cta-primary">
            Explore Collection
          </Link>
          <Link to="/special" className="hero-cta-secondary">
            View Lookbook
          </Link>
        </motion.div>
      </div>

    
     
    </section>
  );
}