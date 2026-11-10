import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    eyebrow: 'Heritage Weaves',
    title: 'The Grace of',
    highlight: 'Banarasi',
    subtitle: 'Handwoven in Varanasi, each thread tells a story of centuries-old craftsmanship.',
    cta: 'Explore Sarees',
    link: '/category/Sarees',
    bg: 'linear-gradient(135deg, #2A1A1F 0%, #5a1529 100%)',
    accent: '#C9A961',
    
    image: '/imgs/image-removebg-preview.png', 
  },
  {
    id: 2,
    eyebrow: 'Bridal Edit',
    title: 'Timeless',
    highlight: 'Bridal',
    subtitle: 'Exquisite lehengas crafted for your most cherished moments.',
    cta: 'Shop Bridal',
    link: '/category/Lehengas',
    bg: 'linear-gradient(135deg, #5a1529 0%, #7B1E3A 100%)',
    accent: '#E8C5C5',
   
    image: '/imgs/bridal.png', 
  },
  {
    id: 3,
    eyebrow: 'Festive Season',
    title: 'Elegance in',
    highlight: 'Every Thread',
    subtitle: 'Discover suits and ensembles that celebrate the spirit of festivity.',
    cta: 'Shop Suits',
    link: '/category/Suits',
    bg: 'linear-gradient(135deg, #C9A961 0%, #7B1E3A 100%)',
    accent: '#FAF6F0',
   
    image: '/imgs/suits.png', 
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef(null);

  // Mouse tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for mouse movement
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Parallax transforms
  const parallaxX = useTransform(smoothX, [-1, 1], [-30, 30]);
  const parallaxY = useTransform(smoothY, [-1, 1], [-30, 30]);
  const rotateX = useTransform(smoothY, [-1, 1], [5, -5]);
  const rotateY = useTransform(smoothX, [-1, 1], [-5, 5]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section
      ref={containerRef}
      className="hero-cinematic"
      style={{ background: slide.bg }}
    >
      {/* Film Grain Overlay for Premium Feel */}
      <div className="hero-grain" />

      {/* Decorative Parallax Blobs */}
      <motion.div
        className="hero-blob hero-blob-1"
        style={{ x: parallaxX, y: parallaxY }}
      />
      <motion.div
        className="hero-blob hero-blob-2"
        style={{ x: useTransform(smoothX, [-1, 1], [30, -30]), y: useTransform(smoothY, [-1, 1], [30, -30]) }}
      />

      <div className="hero-inner">
        {/* LEFT: Typography */}
        <div className="hero-content">
          <motion.div
            key={`eyebrow-${slide.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-eyebrow"
            style={{ color: slide.accent }}
          >
            — {slide.eyebrow} —
          </motion.div>

          <div className="hero-title-wrap">
            <motion.div
              key={`title1-${slide.id}`}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="hero-title-line"
            >
              {slide.title}
            </motion.div>
            <motion.div
              key={`title2-${slide.id}`}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              className="hero-title-line hero-title-highlight"
              style={{ color: slide.accent }}
            >
              {slide.highlight}
            </motion.div>
          </div>

          <motion.p
            key={`sub-${slide.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="hero-subtitle"
          >
            {slide.subtitle}
          </motion.p>

          <motion.div
            key={`cta-${slide.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link to={slide.link} className="hero-cta-btn">
              <span>{slide.cta}</span>
              <span className="hero-cta-arrow">→</span>
            </Link>
          </motion.div>
        </div>

        
        <motion.div
          className="hero-visual"
          style={{
            rotateX,
            rotateY,
            transformPerspective: 1000,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, y: -40 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="hero-svg-container"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
             
              {slide.image ? (
                <img 
                  src={slide.image} 
                  alt={slide.title} 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.4))'
                  }} 
                />
              ) : (
                slide.svg 
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Navigation Counter */}
      <div className="hero-nav">
        <div className="hero-counter">
          <span className="counter-current">0{current + 1}</span>
          <span className="counter-sep">/</span>
          <span className="counter-total">0{slides.length}</span>
        </div>
        <div className="hero-progress">
          <motion.div
            className="hero-progress-bar"
            key={current}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 6, ease: 'linear' }}
            style={{ background: slide.accent }}
          />
        </div>
      </div>
    </section>
  );
}