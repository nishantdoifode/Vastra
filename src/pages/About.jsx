import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="v-container v-page" style={{ maxWidth: 1000 }}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: 'clamp(32px, 5vw, 60px)' }}>
        <div className="section-eyebrow">— Our Story —</div>
        <h1 className="section-title">About <span style={{ fontStyle: 'italic', color: '#7B1E3A' }}>Vastra</span></h1>
        <p style={{ fontSize: 'clamp(14px, 1.8vw, 18px)', color: '#6B5A5F', lineHeight: 1.8, maxWidth: 700, margin: '24px auto 0' }}>Weaving heritage into modern elegance, one thread at a time.</p>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="about-card">
        <p style={{ fontSize: 16, color: '#2A1A1F', lineHeight: 1.8, marginBottom: 20 }}>Vastra was born from a deep reverence for India's rich textile heritage. For centuries, master weavers have transformed simple threads into breathtaking works of art.</p>
        <p style={{ fontSize: 16, color: '#2A1A1F', lineHeight: 1.8, marginBottom: 20 }}>Today, we partner with over 500 artisans across 50+ weaving clusters to bring you authentic, handcrafted ethnic wear.</p>
        <p style={{ fontSize: 16, color: '#2A1A1F', lineHeight: 1.8 }}>Every piece is more than clothing — it's a celebration of craft, a connection to heritage, and a testament to timeless elegance.</p>
      </motion.div>
    </div>
  );
}