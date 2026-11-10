import React from 'react';
import { motion } from 'framer-motion';

export default function OrderSummary({ cartItems, cartTotal, address, payment, showBreakdown = true }) {
  const shipping = cartTotal >= 2999 ? 0 : 199;
  const tax = Math.round(cartTotal * 0.05);
  const grandTotal = cartTotal + shipping + tax;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="checkout-side"
    >
      <h3 className="sum-title">Order Summary</h3>

      <div className="sum-items">
        {cartItems.map((item) => (
          <div key={item.id} className="sum-item">
            <div
              className="sum-item-img"
              style={{ background: `linear-gradient(135deg, ${item.color1}, ${item.color2})` }}
            >
              {item.icon}
            </div>
            <div className="sum-item-info">
              <div className="sum-item-name">{item.name}</div>
              <div className="sum-item-meta">
                Qty: {item.quantity}
                {item.size && ` • Size ${item.size}`}
              </div>
            </div>
            <div className="sum-item-price">
              ₹{(item.price * item.quantity).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {showBreakdown && (
        <>
          <div className="sum-divider" />
          <div className="sum-row"><span>Subtotal</span><span>₹{cartTotal.toLocaleString()}</span></div>
          <div className="sum-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? <span style={{ color: '#2e7d32', fontWeight: 600 }}>FREE</span> : `₹${shipping}`}</span>
          </div>
          <div className="sum-row"><span>Tax (5% GST)</span><span>₹{tax.toLocaleString()}</span></div>
          <div className="sum-total"><span>Total</span><span>₹{grandTotal.toLocaleString()}</span></div>
        </>
      )}

      {address && (
        <>
          <div className="sum-divider" />
          <div style={{ fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', color: '#7B1E3A', marginBottom: 8, fontWeight: 700 }}>
            Delivering to
          </div>
          <div style={{ fontSize: 13, color: '#2A1A1F', lineHeight: 1.6 }}>
            <div style={{ fontWeight: 600 }}>{address.fullName}</div>
            <div>{address.addressLine1}</div>
            {address.addressLine2 && <div>{address.addressLine2}</div>}
            <div>{address.city}, {address.state} - {address.pincode}</div>
            <div style={{ color: '#6B5A5F' }}>📞 {address.phone}</div>
          </div>
        </>
      )}

      {payment && (
        <>
          <div className="sum-divider" />
          <div style={{ fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', color: '#7B1E3A', marginBottom: 8, fontWeight: 700 }}>
            Payment Method
          </div>
          <div style={{ fontSize: 13, color: '#2A1A1F', fontWeight: 600 }}>
            {payment.method === 'upi' && `UPI • ${payment.upiId || '••••'}`}
            {payment.method === 'card' && `Card •••• ${payment.cardNumber?.slice(-4) || '••••'}`}
            {payment.method === 'netbanking' && `Net Banking • ${payment.bank || 'Selected Bank'}`}
            {payment.method === 'cod' && 'Cash on Delivery'}
          </div>
        </>
      )}
    </motion.div>
  );
}