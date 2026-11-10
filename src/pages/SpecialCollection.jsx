import React from 'react';
import { motion } from 'framer-motion';
import { getSpecialProducts } from '../data/config';
import ProductCard from '../components/shared/ProductCard';

export default function SpecialCollection() {
  const special = getSpecialProducts();

  return (
    <div className="v-container v-page">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="page-hero" style={{ background: 'linear-gradient(135deg, #5a1529, #E8C5C5)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,.2), transparent 60%)' }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ fontSize: 'clamp(36px, 6vw, 48px)', marginBottom: 16 }}>💎</div>
          <div className="section-eyebrow" style={{ color: 'rgba(250,246,240,.85)' }}>— Exclusive —</div>
          <h1 className="page-hero-title">Special Collection</h1>
        </div>
      </motion.div>
      <motion.div layout className="grid-products">
        {special.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
      </motion.div>
    </div>
  );
}