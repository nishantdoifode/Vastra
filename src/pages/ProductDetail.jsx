import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import productsData from '../data/products.json'; // ✅ Raw data ke liye
import { getProductsByCategory } from '../data/config'; // ✅ Functions ke liye
import { useCart } from '../context/CartContext';
import ProductCard from '../components/shared/ProductCard';
import { Icons, ProductIcons } from '../utils/icons';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart, wishlist, toggleWishlist } = useCart();
  
  // ✅ JSON se products array nikalna
  const products = productsData.products;
  const product = products.find((p) => p.id === parseInt(id));
  
  const [selectedSize, setSelectedSize] = useState('M');
  const [imageError, setImageError] = useState(false);
  
  const StarIcon = Icons.star;
  const TruckIcon = Icons.truck;
  const RefreshIcon = Icons.refresh;
  const CardIcon = Icons.card;
  const HeartIcon = Icons.heart;

  useEffect(() => {
    window.scrollTo(0, 0);
    setImageError(false); // Reset on product change
  }, [id]);

  if (!product) {
    return (
      <div style={{ padding: '120px 40px', textAlign: 'center' }}>
        <h2>Product not found</h2>
        <Link to="/" style={{ color: '#7B1E3A' }}>← Back to home</Link>
      </div>
    );
  }

  // ✅ Recommended products logic (config se)
  const recommended = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const isWishlisted = wishlist.some((p) => p.id === product.id);
  const showImage = product.image && !imageError;

  const handleAddToCart = () => {
    addToCart({ ...product, size: selectedSize });
  };

  return (
    <div className="v-container v-page">
      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          fontSize: 13,
          color: '#6B5A5F',
          marginBottom: 32,
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <Link to="/" style={{ color: '#6B5A5F', textDecoration: 'none' }}>Home</Link>
        <span>/</span>
        <Link to={`/category/${product.category}`} style={{ color: '#6B5A5F', textDecoration: 'none' }}>
          {product.category}
        </Link>
        <span>/</span>
        <span style={{ color: '#2A1A1F' }}>{product.name}</span>
      </motion.div>

      <div className="pd-grid">
        {/* LEFT: Product Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="pd-media"
          style={{ background: `linear-gradient(135deg, ${product.color1}, ${product.color2})` }}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,.3), transparent 60%)', zIndex: 1, pointerEvents: 'none' }} />

          {showImage ? (
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              decoding="async"
              onError={() => setImageError(true)}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
            />
          ) : (
            <div className="pd-icon">{ProductIcons[product.category] || '✨'}</div>
          )}

          {product.tag && (
            <div style={{ position: 'absolute', top: 24, left: 24, background: '#FAF6F0', color: '#7B1E3A', padding: '8px 16px', borderRadius: 20, fontSize: 12, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', zIndex: 2 }}>
              {product.tag}
            </div>
          )}
        </motion.div>

        {/* RIGHT: Product Info */}
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <div className="section-eyebrow">{product.category}</div>
          <h1 className="pd-title">{product.name}</h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
            <div style={{ display: 'flex', gap: 2 }}>
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} size={16} fill="#C9A961" color="#C9A961" />
              ))}
            </div>
            <span style={{ fontSize: 13, color: '#6B5A5F' }}>(128 reviews)</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 32, flexWrap: 'wrap' }}>
            <span className="pd-price">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <>
                <span style={{ fontSize: 18, color: '#6B5A5F', textDecoration: 'line-through' }}>
                  ₹{product.originalPrice.toLocaleString()}
                </span>
                <span style={{ background: '#E8C5C5', color: '#7B1E3A', padding: '4px 10px', borderRadius: 12, fontSize: 12, fontWeight: 700 }}>
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </span>
              </>
            )}
          </div>

          <p style={{ fontSize: 15, color: '#6B5A5F', lineHeight: 1.7, marginBottom: 32 }}>
            {product.description}
          </p>

          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#2A1A1F', marginBottom: 12, letterSpacing: '.1em', textTransform: 'uppercase' }}>
              Select Size
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {sizes.map((size) => (
                <motion.button
                  key={size}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedSize(size)}
                  className="pd-size"
                  style={{
                    border: selectedSize === size ? '2px solid #7B1E3A' : '2px solid rgba(42,26,31,.2)',
                    background: selectedSize === size ? '#7B1E3A' : 'transparent',
                    color: selectedSize === size ? '#FAF6F0' : '#2A1A1F',
                    padding: '10px 20px',
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontWeight: 600,
                  }}
                >
                  {size}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="pd-actions" style={{ display: 'flex', gap: 16, marginBottom: 32 }}>
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              style={{
                flex: 1,
                background: '#7B1E3A',
                color: '#FAF6F0',
                border: 'none',
                padding: 18,
                borderRadius: 40,
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: '.15em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(123,30,58,.3)',
              }}
            >
              Add to Bag
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleWishlist(product)}
              style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                border: '2px solid #7B1E3A',
                background: isWishlisted ? '#7B1E3A' : 'transparent',
                cursor: 'pointer',
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <HeartIcon size={22} fill={isWishlisted ? '#FAF6F0' : 'none'} color={isWishlisted ? '#FAF6F0' : '#7B1E3A'} />
            </motion.button>
          </div>

          <div style={{ borderTop: '1px solid rgba(123,30,58,.1)', paddingTop: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#2A1A1F', marginBottom: 16, letterSpacing: '.1em', textTransform: 'uppercase' }}>
              Product Details
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {product.details.map((d, i) => (
                <li
                  key={i}
                  style={{ fontSize: 14, color: '#6B5A5F', padding: '8px 0', borderBottom: '1px solid rgba(0,0,0,.04)', display: 'flex', alignItems: 'center', gap: 10 }}
                >
                  <span style={{ color: '#C9A961' }}>✦</span>
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <div className="pd-perks" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 32 }}>
            {[
              { icon: TruckIcon, label: 'Free Shipping' },
              { icon: RefreshIcon, label: 'Easy Returns' },
              { icon: CardIcon, label: 'Secure Pay' },
            ].map((item, i) => {
              const IconComponent = item.icon;
              return (
                <div key={i} style={{ textAlign: 'center', padding: 16, background: 'rgba(123,30,58,.04)', borderRadius: 12 }}>
                  <div style={{ marginBottom: 6 }}>
                    <IconComponent size={24} color="#7B1E3A" />
                  </div>
                  <div style={{ fontSize: 11, color: '#6B5A5F', letterSpacing: '.05em' }}>{item.label}</div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Recommended Products */}
      {recommended.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginTop: 'clamp(60px, 8vw, 100px)' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-eyebrow">— You May Also Like —</div>
            <h2 className="section-title">Recommended for You</h2>
          </div>
          <div className="grid-products">
            {recommended.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}