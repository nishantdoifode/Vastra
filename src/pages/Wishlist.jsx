import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/shared/ProductCard';

export default function Wishlist() {
  const { wishlist } = useCart();

  return (
    <div className="v-container v-page">
      {/* Page Hero */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="page-hero" 
        style={{ background: 'linear-gradient(135deg, #E8C5C5 0%, #FAF6F0 100%)' }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,.4), transparent 60%)' }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <div style={{ fontSize: 'clamp(40px, 6vw, 56px)', marginBottom: 16 }}>❤️</div>
          <div className="section-eyebrow" style={{ color: '#7B1E3A' }}>— Saved for You —</div>
          <h1 className="page-hero-title" style={{ color: '#2A1A1F' }}>My Wishlist</h1>
          <p style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', color: '#6B5A5F', maxWidth: 500, margin: '12px auto 0' }}>
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved for later
          </p>
        </div>
      </motion.div>

      {/* Content Area */}
      <div style={{ padding: 'clamp(40px, 6vw, 80px) 0' }}>
        {wishlist.length === 0 ? (
          /* Empty State */
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            style={{ 
              textAlign: 'center', 
              padding: 'clamp(60px, 10vw, 100px) 20px',
              background: '#fff',
              borderRadius: 24,
              boxShadow: '0 8px 32px rgba(42,26,31,0.06)'
            }}
          >
            <div style={{ fontSize: 64, marginBottom: 24, opacity: 0.3 }}>♡</div>
            <h2 style={{ 
              fontFamily: "'Playfair Display', serif", 
              fontSize: 'clamp(24px, 3vw, 32px)', 
              color: '#2A1A1F', 
              marginBottom: 12 
            }}>
              Your wishlist is empty
            </h2>
            <p style={{ fontSize: 15, color: '#6B5A5F', marginBottom: 32, maxWidth: 400, margin: '0 auto 32px' }}>
              Discover our exclusive collections and save your favorite pieces here.
            </p>
            <Link to="/category/Sarees" className="hero-btn-primary" style={{ 
              display: 'inline-block', 
              padding: '16px 32px', 
              background: '#7B1E3A', 
              color: '#FAF6F0', 
              borderRadius: 40, 
              fontSize: 13, 
              fontWeight: 700, 
              letterSpacing: '0.1em', 
              textTransform: 'uppercase', 
              textDecoration: 'none',
              transition: 'all 0.3s'
            }}>
              Start Shopping →
            </Link>
          </motion.div>
        ) : (
          /* Products Grid */
          <motion.div 
            layout 
            className="grid-products"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            {wishlist.map((product) => (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.5 }}
              >
                {/* ProductCard already has toggleWishlist built-in, so clicking the heart will remove it */}
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}