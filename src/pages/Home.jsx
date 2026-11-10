import React from 'react';
import HeroSlider from '../components/home/HeroSlider';
import Categories from '../components/home/Categories';
import FeaturedProducts from '../components/home/FeaturedProducts';
import ParallaxShowcase from '../components/home/ParallaxShowcase';
import Testimonials from '../components/home/Testimonials';
import Heritage from '../components/home/Heritage';
import Newsletter from '../components/home/Newsletter';
import Hero from '../components/home/Hero';
import { 
  getFeaturedProducts, 
  getParallaxProducts, 
  getAllCategories,
  getAllTestimonials,
  getHeritageData
} from '../data/config';

export default function Home() {
  const featuredProducts = getFeaturedProducts(8);
  const parallaxProducts = getParallaxProducts(6);
  const categories = getAllCategories();
  const testimonials = getAllTestimonials();
  const heritage = getHeritageData();
  

  return (
    <> <Hero />
      <HeroSlider />
      
      <Categories
        categories={categories}
        title="Shop by Category"
        eyebrow="— Curated Collections —"
      />

      <FeaturedProducts
        products={featuredProducts}
        title="Bestsellers"
        eyebrow="— Handpicked for You —"
        showFilters={true}
        ctaLink="/trending"
        ctaText="View All Products →"
      />

      <ParallaxShowcase
        products={parallaxProducts}
        title="Stories Woven in Silk"
        eyebrow="— The Heritage Edit —"
        ctaLink="/special"
        ctaText="Explore Special Collection →"
      />

      <Testimonials
        reviews={testimonials}
        title="Loved by Thousands"
        subtitle="Real stories from our cherished community of fashion lovers."
        eyebrow="— Client Diaries —"
      />

      {/* Heritage Section */}
      <Heritage
        manifesto={heritage.manifesto}
        visuals={heritage.visuals}
        stats={heritage.stats}
        cta={heritage.cta}
      />

      <Newsletter />
    </>
  );
}