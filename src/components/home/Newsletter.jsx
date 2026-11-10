import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) { setSubmitted(true); setTimeout(() => { setSubmitted(false); setEmail(''); }, 3000); }
  };

  return (
    <section className="v-container v-section">
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="newsletter-card">
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 20% 20%, rgba(201,169,97,.15), transparent 50%)' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 600, margin: '0 auto' }}>
          <div className="section-eyebrow" style={{ color: '#C9A961' }}>— Join Our Community —</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: '#FAF6F0', lineHeight: 1.2, marginBottom: 20 }}>
            Be the First to Know
          </h2>
          <p style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', color: 'rgba(250,246,240,.8)', lineHeight: 1.7, marginBottom: 40 }}>
            Subscribe for exclusive access to new collections, festive offers, and styling inspiration.
          </p>
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input className="newsletter-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
            <motion.button whileTap={{ scale: 0.98 }} type="submit" className="newsletter-btn">
              {submitted ? '✓ Subscribed!' : 'Subscribe'}
            </motion.button>
          </form>
          <p style={{ fontSize: 12, color: 'rgba(250,246,240,.6)', marginTop: 20 }}>No spam, unsubscribe anytime.</p>
        </div>
      </motion.div>
    </section>
  );
}