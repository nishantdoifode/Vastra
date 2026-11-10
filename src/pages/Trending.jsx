import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getTrendingProducts, getAllCategories } from '../data/config'; // ✅ categories bhi import karo
import ProductCard from '../components/shared/ProductCard';

export default function Trending() {
  const trending = getTrendingProducts();
  const categories = getAllCategories(); // ✅ Yeh line add karo

  return (
    <div className="v-container v-page">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="page-hero" style={{ background: 'linear-gradient(135deg, #7B1E3A, #C9A961)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,.25), transparent 60%)' }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ fontSize: 'clamp(36px, 6vw, 48px)', marginBottom: 16 }}>🔥</div>
          <div className="section-eyebrow" style={{ color: 'rgba(250,246,240,.85)' }}>— What's Hot —</div>
          <h1 className="page-hero-title">Trending Now</h1>
          <p style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', color: 'rgba(250,246,240,.9)', maxWidth: 500, margin: '12px auto 0' }}>The most loved pieces this season</p>
        </div>
      </motion.div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 'clamp(32px, 5vw, 60px)', flexWrap: 'wrap', justifyContent: 'center' }}>
        {categories.map((cat) => {
          const count = trending.filter((p) => p.category === cat.name).length;
          return (
            <Link key={cat.name} to={`/category/${cat.name}`} style={{ textDecoration: 'none' }}>
              <motion.div whileHover={{ y: -4 }} style={{ padding: '14px 24px', borderRadius: 40, background: '#FAF6F0', border: '1px solid rgba(123,30,58,.1)', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 4px 16px rgba(42,26,31,.06)' }}>
                <span style={{ fontSize: 24 }}>{cat.icon}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#2A1A1F', marginBottom: 2 }}>{cat.name}</div>
                  <div style={{ fontSize: 11, color: '#7B1E3A', letterSpacing: '.1em' }}>{count}+ pieces →</div>
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>

      <motion.div layout className="grid-products">
        {trending.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
      </motion.div>
    </div>
  );
}