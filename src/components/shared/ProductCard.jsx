import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useIsTouch } from '../../Hooks/useMediaQuery';
import { Icons, ProductIcons } from '../../utils/icons';

export default function ProductCard({ product, index = 0 }) {
  const { wishlist, toggleWishlist } = useCart();
  const isTouch = useIsTouch();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [imageError, setImageError] = useState(false);
  const ref = useRef(null);

  const HeartIcon = Icons.heart;
  const isWishlisted = wishlist.some((p) => p.id === product.id);
  const showImage = product.image && !imageError;

  const handleMove = (e) => {
    if (isTouch || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: y * -6, y: x * 6 });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: Math.min(index, 6) * 0.06, duration: 0.5 }}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      animate={isTouch ? {} : { rotateX: tilt.x, rotateY: tilt.y }}
      style={{ perspective: 1000, transformStyle: 'preserve-3d', height: '100%' }}
    >
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
        <div className="p-card">
          <div className="p-media" style={{ background: `linear-gradient(135deg, ${product.color1}, ${product.color2})` }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,.25), transparent 60%)', zIndex: 1 }} />

            {showImage ? (
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                decoding="async"
                onError={() => setImageError(true)}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  zIndex: 0,
                }}
              />
            ) : (
              <div className="p-icon">{ProductIcons[product.category] || '✨'}</div>
            )}

            {product.tag && <span className="p-tag">{product.tag}</span>}

            <button
              className="p-wish"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product); }}
              aria-label="Toggle wishlist"
              style={{ color: isWishlisted ? '#7B1E3A' : '#6B5A5F' }}
            >
              <HeartIcon size={18} fill={isWishlisted ? '#7B1E3A' : 'none'} />
            </button>
          </div>

          <div className="p-info">
            <div className="p-cat">{product.category}</div>
            <h3 className="p-name">{product.name}</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <span className="p-price">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="p-price-old">₹{product.originalPrice.toLocaleString()}</span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}