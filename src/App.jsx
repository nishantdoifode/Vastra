import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/shared/ErrorBoundary';  // ← NEW
import AnnouncementBar from './components/layout/AnnouncementBar';
import Navbar from './components/layout/Navbar';
import CartSidebar from './components/layout/CartSidebar';
import SearchModal from './components/layout/SearchModal';
import AuthModal from './components/layout/AuthModal';
import Toast from './components/shared/Toast';
import Footer from './components/layout/Footer';
const Wishlist = lazy(() => import('./pages/Wishlist'));
const Home = lazy(() => import('./pages/Home'));
const Trending = lazy(() => import('./pages/Trending'));
const SpecialCollection = lazy(() => import('./pages/SpecialCollection'));
const Category = lazy(() => import('./pages/Category'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));

const About = lazy(() => import('./pages/About'));
const Checkout = lazy(() => import('./pages/Checkout'));
const OrderSuccess = lazy(() => import('./pages/OrderSuccess'));

function LoadingSpinner() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      flexDirection: 'column',
      gap: 20,
      background: '#FAF6F0',
    }}>
      <div
        style={{
          width: 50,
          height: 50,
          border: '3px solid rgba(123,30,58,0.2)',
          borderTop: '3px solid #7B1E3A',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}
      />
      <div style={{
        fontSize: 14,
        color: '#6B5A5F',
        letterSpacing: '0.1em',
        fontFamily: "'Playfair Display', serif",
        fontStyle: 'italic',
      }}>
        Loading...
      </div>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

function Layout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isCheckout = location.pathname.startsWith('/checkout') || location.pathname.startsWith('/order-success');

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ background: '#FAF6F0', minHeight: '100vh' }}>
      {!isCheckout && <AnnouncementBar />}
      <Navbar isScrolled={isScrolled} />
      <ErrorBoundary>  {/* ← Wrap with ErrorBoundary */}
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/special" element={<SpecialCollection />} />
            <Route path="/category/:name" element={<Category />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/about" element={<About />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success/:orderId" element={<OrderSuccess />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
      {!isCheckout && <Footer />}
      <CartSidebar />
      <SearchModal />
      <AuthModal />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>  {/* ← Top-level ErrorBoundary */}
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Layout />
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
