import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';

const allProducts = [
  { id: 1, name: 'Royal Banarasi Silk', category: 'Sarees', price: 12999, icon: '🥻', color1: '#7B1E3A', color2: '#C9A961' },
  { id: 2, name: 'Bridal Lehenga Choli', category: 'Lehengas', price: 45999, icon: '💃', color1: '#5a1529', color2: '#E8C5C5' },
  { id: 3, name: 'Chanderi Suit Set', category: 'Suits', price: 8499, icon: '✨', color1: '#C9A961', color2: '#7B1E3A' },
  { id: 4, name: 'Emerald Anarkali', category: 'Gowns', price: 18999, icon: '👗', color1: '#E8C5C5', color2: '#5a1529' },
  { id: 5, name: 'Kanjivaram Heritage', category: 'Sarees', price: 24999, icon: '🥻', color1: '#7B1E3A', color2: '#E8C5C5' },
];

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, addToCart } = useCart();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) setTimeout(() => inputRef.current.focus(), 100);
    if (!isSearchOpen) setQuery('');
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setIsSearchOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [setIsSearchOpen]);

  const results = query.trim() ? allProducts.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase())) : [];

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={() => setIsSearchOpen(false)}
          className="search-overlay"
          style={{ position: 'fixed', inset: 0, background: 'rgba(42,26,31,.6)', backdropFilter: 'blur(8px)', zIndex: 300, display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}
        >
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -30, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()} className="search-panel"
          >
            <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(123,30,58,.1)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 20, color: '#7B1E3A' }}>🔍</span>
              <input ref={inputRef} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search sarees, lehengas..." style={{ flex: 1, border: 'none', background: 'transparent', fontSize: 16, color: '#2A1A1F', outline: 'none', fontFamily: 'inherit' }} />
              <button onClick={() => setIsSearchOpen(false)} style={{ background: 'rgba(123,30,58,.08)', border: 'none', padding: '4px 10px', borderRadius: 6, fontSize: 11, color: '#6B5A5F', cursor: 'pointer', fontWeight: 600 }}>ESC</button>
            </div>
            <div style={{ overflowY: 'auto', padding: 12, flex: 1 }}>
              {!query.trim() ? (
                <div style={{ padding: '40px 20px', textAlign: 'center', color: '#6B5A5F', fontSize: 14 }}>
                  <p style={{ marginBottom: 8 }}>Try:</p>
                  <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
                    {['Banarasi', 'Lehenga', 'Silk'].map((tag) => (
                      <button key={tag} onClick={() => setQuery(tag)} style={{ background: 'rgba(123,30,58,.08)', border: 'none', padding: '6px 14px', borderRadius: 20, fontSize: 12, color: '#7B1E3A', cursor: 'pointer' }}>{tag}</button>
                    ))}
                  </div>
                </div>
              ) : results.length === 0 ? (
                <div style={{ padding: '40px 20px', textAlign: 'center', color: '#6B5A5F' }}>No results for "{query}"</div>
              ) : (
                results.map((p) => (
                  <motion.div
                    key={p.id}
                    whileHover={{ backgroundColor: 'rgba(123,30,58,.04)' }}
                    style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 12, borderRadius: 12, cursor: 'pointer' }}
                    onClick={() => { addToCart(p); setIsSearchOpen(false); }}
                  >
                    <div style={{ width: 50, height: 60, borderRadius: 8, background: `linear-gradient(135deg, ${p.color1}, ${p.color2})`, display: 'grid', placeItems: 'center', fontSize: 22, flexShrink: 0 }}>{p.icon}</div>
                    <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 600, color: '#2A1A1F', marginBottom: 2 }}>{p.name}</div><div style={{ fontSize: 12, color: '#6B5A5F' }}>{p.category}</div></div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#7B1E3A' }}>₹{p.price.toLocaleString()}</div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}