import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProductsByCategory, getAllCategories } from '../data/config'; // ✅ FIXED
import ProductCard from '../components/shared/ProductCard';

export default function Category() {
  const { name } = useParams();
  const products = getProductsByCategory(name);
  const categories = getAllCategories();
  
  // Category ki details dhundna
  const categoryInfo = categories.find((c) => c.name === name) || { 
    name: name, 
    color1: '#7B1E3A', 
    color2: '#C9A961', 
    icon: '✨' 
  };

  return (
    <div className="v-container v-page">
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="page-hero" 
        style={{ background: `linear-gradient(135deg, ${categoryInfo.color1}, ${categoryInfo.color2})` }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,.25), transparent 60%)' }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ fontSize: 'clamp(36px, 6vw, 48px)', marginBottom: 16 }}>{categoryInfo.icon}</div>
          <div className="section-eyebrow" style={{ color: 'rgba(250,246,240,.85)' }}>— Collection —</div>
          <h1 className="page-hero-title">{name}</h1>
          <p style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', color: 'rgba(250,246,240,.9)', maxWidth: 500, margin: '12px auto 0' }}>
            Explore our exquisite range of {name.toLowerCase()}
          </p>
        </div>
      </motion.div>

      {/* Category Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 'clamp(32px, 5vw, 60px)', flexWrap: 'wrap', justifyContent: 'center' }}>
        {categories.map((cat) => (
          <Link key={cat.name} to={`/category/${cat.name}`} style={{ textDecoration: 'none' }}>
            <motion.div 
              whileHover={{ y: -4 }} 
              style={{ 
                padding: '12px 20px', 
                borderRadius: 40, 
                background: cat.name === name ? '#7B1E3A' : '#FAF6F0', 
                color: cat.name === name ? '#FAF6F0' : '#2A1A1F',
                border: '1px solid rgba(123,30,58,.1)', 
                display: 'flex', 
                alignItems: 'center', 
                gap: 8, 
                boxShadow: '0 4px 16px rgba(42,26,31,.06)' 
              }}
            >
              <span style={{ fontSize: 20 }}>{cat.icon}</span>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{cat.name}</span>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <motion.div layout className="grid-products">
          {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </motion.div>
      ) : (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#6B5A5F' }}>
          No products found in this category.
        </div>
      )}
    </div>
  );
}