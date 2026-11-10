import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
export default function CartSidebar() {
  const { cartItems, cartCount, cartTotal, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  return (
    
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(42,26,31,.5)', backdropFilter: 'blur(4px)', zIndex: 200 }} />
          <motion.aside initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }} className="cart-panel">
            <div className="cart-head" style={{ borderBottom: '1px solid rgba(123,30,58,.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: '#2A1A1F', marginBottom: 4 }}>Your Bag</h3>
                <div style={{ fontSize: 13, color: '#6B5A5F' }}>{cartCount} {cartCount === 1 ? 'item' : 'items'}</div>
              </div>
              <button onClick={() => setIsCartOpen(false)} style={{ background: 'transparent', border: 'none', fontSize: 24, cursor: 'pointer', color: '#2A1A1F', padding: 8 }}>✕</button>
            </div>

            <div className="cart-body">
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', color: '#6B5A5F' }}>
                  <div style={{ fontSize: 64, marginBottom: 16, opacity: .3 }}>🛍</div>
                  <p>Your bag is empty</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {cartItems.map((item) => (
                    <motion.div key={item.id} layout style={{ display: 'flex', gap: 16, padding: 16, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,.04)' }}>
                      <div style={{ width: 80, height: 100, borderRadius: 8, background: `linear-gradient(135deg, ${item.color1}, ${item.color2})`, flexShrink: 0, display: 'grid', placeItems: 'center', fontSize: 32 }}>{item.icon}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 11, color: '#7B1E3A', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 4 }}>{item.category}</div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: '#2A1A1F', marginBottom: 8, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</div>
                        <div style={{ fontSize: 15, fontWeight: 600, color: '#2A1A1F', marginBottom: 12 }}>₹{(item.price * item.quantity).toLocaleString()}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ width: 28, height: 28, borderRadius: '50%', border: '1px solid rgba(123,30,58,.2)', background: 'transparent', cursor: 'pointer' }}>−</button>
                          <span style={{ minWidth: 24, textAlign: 'center', fontSize: 14, fontWeight: 600 }}>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ width: 28, height: 28, borderRadius: '50%', border: '1px solid rgba(123,30,58,.2)', background: 'transparent', cursor: 'pointer' }}>+</button>
                          <button onClick={() => removeFromCart(item.id)} style={{ marginLeft: 'auto', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 12, color: '#6B5A5F', textDecoration: 'underline' }}>Remove</button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="cart-foot" style={{ borderTop: '1px solid rgba(123,30,58,.1)', background: '#fff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14, color: '#6B5A5F' }}><span>Subtotal</span><span>₹{cartTotal.toLocaleString()}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20, fontSize: 14, color: '#6B5A5F' }}><span>Shipping</span><span>{cartTotal >= 2999 ? 'FREE' : '₹199'}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20, paddingTop: 16, borderTop: '1px solid rgba(123,30,58,.1)', fontSize: 18, fontWeight: 700, color: '#2A1A1F' }}><span>Total</span><span>₹{(cartTotal + (cartTotal >= 2999 ? 0 : 199)).toLocaleString()}</span></div>
                <motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  onClick={() => { setIsCartOpen(false); navigate('/checkout'); }}
  style={{
    width: '100%', background: '#7B1E3A', color: '#FAF6F0',
    border: 'none', padding: 16, borderRadius: 40,
    fontSize: 13, fontWeight: 700, letterSpacing: '.15em',
    textTransform: 'uppercase', cursor: 'pointer',
    boxShadow: '0 8px 24px rgba(123,30,58,.3)',
  }}
>
  Checkout →
</motion.button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}