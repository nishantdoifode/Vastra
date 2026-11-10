import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function OrderSuccess() {
  const { orderId } = useParams();
  const location = useLocation();
  const { total, address } = location.state || {};

  return (
    <div className="success-wrap">
      <motion.div
        className="success-card"
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="success-icon"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          ✓
        </motion.div>

        <h1 className="success-title">Order Placed!</h1>
        <p className="success-sub">
          Thank you for shopping with Vastra. Your order has been confirmed and will be dispatched soon.
          {address && <> A confirmation has been sent to your phone <strong>{address.phone}</strong>.</>}
        </p>

        <div className="success-order">
          <div className="success-order-label">Order ID</div>
          <div className="success-order-id">{orderId}</div>
        </div>

        {total && (
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            padding: '14px 0', borderTop: '1px solid rgba(123,30,58,.1)',
            marginBottom: 24,
          }}>
            <span style={{ fontSize: 13, color: '#6B5A5F' }}>Amount Paid</span>
            <span style={{ fontSize: 16, fontWeight: 700, color: '#2A1A1F' }}>
              ₹{total.toLocaleString()}
            </span>
          </div>
        )}

        <div style={{
          display: 'flex', gap: 12, flexWrap: 'wrap',
        }}>
          <Link to="/" style={{ flex: 1, minWidth: 140, textDecoration: 'none' }}>
            <motion.button whileHover={{ scale: 1.02 }} className="btn btn-secondary" style={{ width: '100%' }}>
              Continue Shopping
            </motion.button>
          </Link>
          <motion.button whileHover={{ scale: 1.02 }} className="btn btn-primary">
            Track Order
          </motion.button>
        </div>

        <div style={{
          marginTop: 28, fontSize: 12, color: '#6B5A5F',
          lineHeight: 1.7, textAlign: 'left',
          padding: 16, background: 'rgba(123,30,58,.03)', borderRadius: 10,
        }}>
          <strong style={{ color: '#2A1A1F' }}>What's next?</strong><br />
          • You'll receive shipping updates via SMS<br />
          • Expected delivery: 5-7 business days<br />
          • Need help? Contact us at support@vastra.com
        </div>
      </motion.div>
    </div>
  );
}