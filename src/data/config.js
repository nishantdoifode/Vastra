// ============================================
// VASTRA CONFIG — Single Source of Truth
// ============================================
import heritageData from './heritage.json';

import productsData from './products.json';
import testimonialsData from './testimonials.json';
// Extract arrays from JSON
const products = productsData.products;
const categories = productsData.categories;

// ===== FILTERS =====
export const FILTERS = ['All', 'Sarees', 'Lehengas', 'Suits', 'Gowns'];

// ===== ANIMATIONS =====
export const ANIMATIONS = {
  slideUp: { initial: { opacity: 0, y: 60 }, animate: { opacity: 1, y: 0 } },
  slideLeft: { initial: { opacity: 0, x: -80 }, animate: { opacity: 1, x: 0 } },
  slideRight: { initial: { opacity: 0, x: 80 }, animate: { opacity: 1, x: 0 } },
  zoomIn: { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 } },
  rotateIn: { initial: { opacity: 0, rotate: -5, y: 40 }, animate: { opacity: 1, rotate: 0, y: 0 } },
  slideDown: { initial: { opacity: 0, y: -60 }, animate: { opacity: 1, y: 0 } },
  scaleRotate: { initial: { opacity: 0, scale: 0.9, rotate: 3 }, animate: { opacity: 1, scale: 1, rotate: 0 } },
  diagonal: { initial: { opacity: 0, x: -60, y: 30 }, animate: { opacity: 1, x: 0, y: 0 } },
};

// ===== LAYOUT PATTERNS =====
export const FEATURED_LAYOUT = {
  maxItems: 8,
  animations: [
    ANIMATIONS.slideUp,
    ANIMATIONS.slideLeft,
    ANIMATIONS.slideRight,
    ANIMATIONS.zoomIn,
    ANIMATIONS.rotateIn,
    ANIMATIONS.slideDown,
    ANIMATIONS.scaleRotate,
    ANIMATIONS.diagonal,
  ],
  repeatAnimations: true,
};

export const PARALLAX_LAYOUT = {
  maxItems: 6,
  animation: ANIMATIONS.slideUp,
  staggerDelay: 0.15,
};

// ===== PRODUCT SELECTORS =====
export const FEATURED_PRODUCT_IDS = [1, 2, 3, 4, 5, 6, 7, 8];
export const PARALLAX_PRODUCT_IDS = [1, 11, 21, 31, 5, 13];

// ===== HELPER FUNCTIONS =====
export const getProductsByIds = (ids) => {
  return ids
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);
};

export const getProductsByCategory = (category) => {
  if (category === 'All') return products;
  return products.filter((p) => p.category === category);
};

export const getTrendingProducts = () => products.filter((p) => p.trending);
export const getSpecialProducts = () => products.filter((p) => p.special);

export const getFeaturedProducts = (count = 8) => {
  return getProductsByIds(FEATURED_PRODUCT_IDS).slice(0, count);
};

export const getParallaxProducts = (count = 6) => {
  return getProductsByIds(PARALLAX_PRODUCT_IDS).slice(0, count);
};

// ===== CATEGORY HELPER (JO MISSING THA) =====
export const getAllCategories = () => {
  return categories || [];
};
export const getAllTestimonials = () => {
  return testimonialsData || [];
};
export const getHeritageData = () => {
  return heritageData || { manifesto: [], visuals: [], stats: [] };
};

// ===== DEFAULT EXPORT =====
export default {
  FILTERS,
  ANIMATIONS,
  FEATURED_LAYOUT,
  PARALLAX_LAYOUT,
  FEATURED_PRODUCT_IDS,
  PARALLAX_PRODUCT_IDS,
  getProductsByIds,
  getProductsByCategory,
  getTrendingProducts,
  getSpecialProducts,
  getFeaturedProducts,
  getParallaxProducts,
  getAllCategories,
  getHeritageData,
};