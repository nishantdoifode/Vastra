import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useIsTouch } from '../../Hooks/useMediaQuery';
import { Icons } from '../../utils/icons';

const HeartIcon = Icons.heart;
const BagIcon = Icons.bag;

export default function ShowcaseCard({ product, variant = 'normal', index = 0 }) {
  const { wishlist, toggleWishlist, addToCart } = useCart();
  const isTouch = useIsTouch();
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [imgError, setImgError] = useState(false);

  const isWished = wishlist.some((p) => p.id === product.id);
  const showImg = product.image && !imgError;

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  // Subtle tilt — sirf desktop pe, sirf normal cards pe
  const handleMove = (e) => {
    if (isTouch || variant !== 'normal' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: y * -4, y: x * 4 });
  };

  // Entry direction — variant ke hisaab se alag
  const entry = {
    wide: { opacity: 0, x: -40 },
    tall: { opacity: 0, y: 50 },
    normal: { opacity: 0, y: 30 },
  }[variant];

  return (
    <motion.article
      ref={ref}
      className={`sc sc--${variant}`}
      initial={entry}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.7,
        delay: Math.min(index, 5) * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      animate={isTouch ? {} : { rotateX: tilt.x, rotateY: tilt.y }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="sc-inner">
        {/* ============ MEDIA ============ */}
        <Link to={`/product/${product.id}`} className="sc-media-link" aria-label={product.name}>
          <div
            className="sc-media"
            style={{ background: `linear-gradient(135deg, ${product.color1}, ${product.color2})` }}
          >
            {showImg ? (
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                decoding="async"
                onError={() => setImgError(true)}
                className="sc-img"
              />
            ) : (
              <div className="sc-fallback">{product.icon}</div>
            )}

            {/* bottom scrim — text readable rahe */}
            <div className="sc-scrim" />

            {/* index number — editorial touch */}
            <span className="sc-index">{String(index + 1).padStart(2, '0')}</span>

            {/* tag */}
            {product.tag && <span className="sc-tag">{product.tag}</span>}

            {/* discount */}
            {discount > 0 && <span className="sc-off">−{discount}%</span>}

            {/* WIDE card ke liye image ke andar heading */}
            {variant === 'wide' && (
              <div className="sc-media-caption">
                <span className="sc-cat sc-cat--light">{product.category}</span>
                <h3 className="sc-title sc-title--light">{product.name}</h3>
              </div>
            )}
          </div>
        </Link>

        {/* wishlist — link ke bahar */}
        <button
          className={`sc-wish ${isWished ? 'is-active' : ''}`}
          onClick={() => toggleWishlist(product)}
          aria-label="Wishlist"
        >
          <HeartIcon size={16} fill={isWished ? 'currentColor' : 'none'} />
        </button>

        {/* quick add — hover pe slide up (touch pe always visible) */}
        <button
          className="sc-quick"
          onClick={() => addToCart(product)}
          aria-label={`Add ${product.name} to bag`}
        >
          <BagIcon size={14} />
          <span>Quick Add</span>
        </button>

        {/* ============ BODY ============ */}
        <div className="sc-body">
          {variant !== 'wide' && (
            <>
              <span className="sc-cat">{product.category}</span>
              <h3 className="sc-title">
                <Link to={`/product/${product.id}`}>{product.name}</Link>
              </h3>
            </>
          )}

          {/* sirf wide + tall me description */}
          {variant !== 'normal' && (
            <p className="sc-desc">{product.description}</p>
          )}

          {/* sirf wide me fabric details */}
          {variant === 'wide' && product.details?.length > 0 && (
            <ul className="sc-specs">
              {product.details.slice(0, 3).map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          )}

          <div className="sc-foot">
            <div className="sc-prices">
              <span className="sc-price">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="sc-price-old">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <Link to={`/product/${product.id}`} className="sc-cta">
              {variant === 'wide' ? 'View Piece' : 'View'}
              <span className="sc-cta-arrow">→</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}