import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';

export default function Toast() {
  const { toast } = useCart();

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 50, x: '-50%' }}
          style={{
            position: 'fixed',
            bottom: '30px',
            left: '50%',
            background: toast.type === 'info' ? '#2A1A1F' : '#7B1E3A',
            color: '#FAF6F0',
            padding: '14px 28px',
            borderRadius: '40px',
            fontSize: '14px',
            fontWeight: 500,
            boxShadow: '0 12px 32px rgba(42, 26, 31, 0.3)',
            zIndex: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <span>{toast.type === 'info' ? 'ℹ️' : '✓'}</span>
          {toast.message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}