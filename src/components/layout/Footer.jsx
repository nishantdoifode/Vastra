import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const footerLinks = {
  Shop: ['Sarees', 'Lehengas', 'Suits', 'Gowns', 'Accessories', 'New Arrivals'],
  About: ['Our Story', 'Artisans', 'Sustainability', 'Press', 'Careers'],
  Help: ['Contact Us', 'Shipping', 'Size Guide', 'FAQ', 'Track Order'],
  Legal: ['Privacy Policy', 'Terms', 'Cookie Policy'],
};

export default function Footer() {
  return (
    <footer className="footer" style={{ background: '#2A1A1F', color: '#FAF6F0' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div className="footer-top">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Link to="/" className="nav-logo" style={{ color: '#FAF6F0', marginBottom: 20 }}>
                <span className="nav-logo-mark">✦</span>Vastra
              </Link>
              <p style={{ fontSize: 14, color: 'rgba(250,246,240,.7)', lineHeight: 1.7, marginBottom: 24, maxWidth: 320 }}>
                Celebrating the artistry of Indian weavers through timeless, handcrafted ethnic wear.
              </p>
              <div style={{ display: 'flex', gap: 16 }}>
                {['📷', '📘', '🐦', '📌'].map((icon, i) => (
                  <motion.a key={i} href="#" whileHover={{ scale: 1.15 }} style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: 'rgba(250,246,240,.1)',
                    display: 'grid', placeItems: 'center', fontSize: 18,
                    textDecoration: 'none',
                  }}>{icon}</motion.a>
                ))}
              </div>
            </motion.div>
          </div>
          <div className="footer-links">
            {Object.entries(footerLinks).map(([title, links], i) => (
              <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <h4 style={{ fontSize: 13, fontWeight: 600, letterSpacing: '.15em', textTransform: 'uppercase', marginBottom: 20, color: '#C9A961' }}>{title}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {links.map((link, j) => (
                    <li key={j} style={{ marginBottom: 12 }}>
                      <a href="#" style={{ color: 'rgba(250,246,240,.7)', textDecoration: 'none', fontSize: 14 }}>{link}</a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <div style={{ fontSize: 13, color: 'rgba(250,246,240,.6)' }}>© VASTRA made by ~Nishant All rights reserved </div>
          <div className="footer-badges" style={{ color: 'rgba(250,246,240,.6)' }}>
            <span>💳 Secure Payments</span>
            
            <span>↩️ Easy Returns</span>
          </div>
        </div>
      </div>
    </footer>
  );
}