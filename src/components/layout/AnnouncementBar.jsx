import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AnnouncementBar() {
  const messages = [
    '✨ Free Shipping on Orders Above ₹2999',
    '🎁 Festive Sale — Flat 20% Off on All Sarees',
    '🌸 New Arrivals: Banarasi Silk Collection',
  ];
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % messages.length), 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="announce" style={{
      background: '#2A1A1F', color: '#FAF6F0',
      textAlign: 'center', height: 36,
      position: 'relative', overflow: 'hidden',
    }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{ position: 'absolute', width: '100%', left: 0, top: 10 }}
        >
          {messages[active]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}