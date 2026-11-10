import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useIsMobile, useLockScroll } from '../../Hooks/useMediaQuery';
import { Icons } from '../../utils/icons';

const menuItems = [
  { label: 'Trending', path: '/trending' },
  { label: 'Special Collection', path: '/special' },
  { label: 'Sarees', path: '/category/Sarees' },
  { label: 'Lehengas', path: '/category/Lehengas' },
  { label: 'About', path: '/about' },
];

export default function Navbar({ isScrolled }) {
  const {
    cartCount, setIsCartOpen, setIsSearchOpen,
    isMobileMenuOpen, setIsMobileMenuOpen, wishlist,
  } = useCart();
  const { user, openAuthModal, logout } = useAuth();
  const isMobile = useIsMobile();
  useLockScroll(isMobileMenuOpen);

  const SearchIcon = Icons.search;
  const HeartIcon = Icons.heart;
  const UserIcon = Icons.user;
  const BagIcon = Icons.bag;
  const MenuIcon = Icons.menu;
  const CloseIcon = Icons.close;

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'sticky', top: 0, zIndex: 100,
          background: isScrolled ? 'rgba(250,246,240,.94)' : 'rgba(250,246,240,.8)',
          backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
          borderBottom: isScrolled ? '1px solid rgba(123,30,58,.12)' : '1px solid transparent',
          boxShadow: isScrolled ? '0 6px 24px rgba(123,30,58,.06)' : 'none',
          transition: 'background .35s, box-shadow .35s, border-color .35s',
        }}
      >
        <div className="nav-inner">
          <Link to="/" className="nav-logo" onClick={() => setIsMobileMenuOpen(false)}>
            <span className="nav-logo-mark">✦</span>
            <span>Vastra</span>
          </Link>

          <ul className="desktop-menu">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink to={item.path}>{item.label}</NavLink>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <button className="nav-icon-btn" onClick={() => setIsSearchOpen(true)} aria-label="Search">
              <SearchIcon size={20} />
            </button>

            <Link to="/wishlist" className="nav-icon-btn nav-hide-sm" aria-label="Wishlist" style={{ position: 'relative', textDecoration: 'none', color: 'inherit', display: 'grid', placeItems: 'center' }}>
  <HeartIcon size={20} />
  {wishlist?.length > 0 && (
    <span style={{
      position: 'absolute', top: 2, right: 2,
      background: '#7B1E3A', color: '#FAF6F0',
      borderRadius: '50%', width: 16, height: 16,
      fontSize: 10, display: 'grid', placeItems: 'center',
      fontWeight: 700,
    }}>
      {wishlist.length}
    </span>
  )}
</Link>

            {/* USER BUTTON — UPDATED */}
            {user ? (
              <UserMenu user={user} onLogout={logout} onOpenAuth={openAuthModal} />
            ) : (
              <button
                className="nav-icon-btn nav-hide-sm"
                onClick={() => openAuthModal('login')}
                aria-label="Sign in"
                title="Sign in"
              >
                <UserIcon size={20} />
              </button>
            )}

            <motion.button
              whileTap={{ scale: 0.95 }}
              className="cart-btn"
              onClick={() => setIsCartOpen(true)}
              aria-label={`Bag, ${cartCount} items`}
            >
              <BagIcon size={18} />
              <span className="cart-btn-label">Bag</span>
              <span className="cart-badge">{cartCount}</span>
            </motion.button>

            <button
              className="mobile-toggle"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <MenuIcon size={24} />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && isMobile && (
          <motion.div
            className="mobile-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 300 }}
          >
            <div className="mobile-drawer-head">
              <span className="nav-logo"><span className="nav-logo-mark">✦</span>Vastra</span>
              <button
                className="nav-icon-btn"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <CloseIcon size={24} />
              </button>
            </div>

            <div className="mobile-drawer-body">
              {/* User section in mobile menu */}
              <div style={{
                padding: '16px 0 20px',
                borderBottom: '1px solid rgba(0,0,0,.06)',
                marginBottom: 8,
              }}>
                {user ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: '50%',
                      background: 'linear-gradient(135deg, #7B1E3A, #C9A961)',
                      display: 'grid', placeItems: 'center',
                      color: '#FAF6F0', fontWeight: 700, fontSize: 16,
                    }}>
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, fontWeight: 600, color: '#2A1A1F' }}>
                        {user.name}
                      </div>
                      <div style={{ fontSize: 12, color: '#6B5A5F' }}>
                        {user.email}
                      </div>
                    </div>
                    <button
                      onClick={logout}
                      style={{
                        background: 'none', border: 'none',
                        color: '#7B1E3A', fontSize: 12,
                        fontWeight: 600, cursor: 'pointer',
                      }}
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => { setIsMobileMenuOpen(false); openAuthModal('login'); }}
                    style={{
                      width: '100%', padding: '14px',
                      background: '#7B1E3A', color: '#FAF6F0',
                      border: 'none', borderRadius: 30,
                      fontSize: 13, fontWeight: 700,
                      letterSpacing: '.1em', textTransform: 'uppercase',
                      cursor: 'pointer',
                    }}
                  >
                    Sign In / Sign Up
                  </button>
                )}
              </div>

              {menuItems.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i + 0.1 }}
                >
                  <Link to={item.path} className="mobile-drawer-link" onClick={() => setIsMobileMenuOpen(false)}>
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <div className="mobile-drawer-foot">
                <button><HeartIcon size={16} style={{ marginRight: 6 }} /> Wishlist</button>
                {!user && (
                  <button onClick={() => { setIsMobileMenuOpen(false); openAuthModal('signup'); }}>
                    <UserIcon size={16} style={{ marginRight: 6 }} /> Create Account
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// User dropdown menu component
function UserMenu({ user, onLogout, onOpenAuth }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const initial = user.name.charAt(0).toUpperCase();

  return (
    <div ref={ref} style={{ position: 'relative' }} className="nav-hide-sm">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        style={{
          width: 40, height: 40, borderRadius: '50%',
          background: 'linear-gradient(135deg, #7B1E3A, #C9A961)',
          border: 'none', cursor: 'pointer',
          color: '#FAF6F0', fontWeight: 700, fontSize: 15,
          display: 'grid', placeItems: 'center',
          boxShadow: '0 4px 12px rgba(123,30,58,.25)',
        }}
        aria-label="User menu"
      >
        {initial}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              top: 'calc(100% + 12px)',
              right: 0,
              background: '#FAF6F0',
              borderRadius: 16,
              padding: 8,
              minWidth: 240,
              boxShadow: '0 20px 50px rgba(42,26,31,.15)',
              border: '1px solid rgba(123,30,58,.1)',
              zIndex: 150,
            }}
          >
            {/* User info */}
            <div style={{
              padding: '12px 14px',
              borderBottom: '1px solid rgba(123,30,58,.08)',
              marginBottom: 4,
            }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#2A1A1F' }}>
                {user.name}
              </div>
              <div style={{ fontSize: 12, color: '#6B5A5F', marginTop: 2 }}>
                {user.email}
              </div>
            </div>

            {/* Menu items */}
            {[
              { label: 'My Orders', icon: '📦' },
              { label: 'Wishlist', icon: '♡' },
              { label: 'Addresses', icon: '📍' },
              { label: 'Settings', icon: '⚙️' },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => setOpen(false)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  width: '100%', padding: '10px 14px',
                  background: 'transparent', border: 'none',
                  cursor: 'pointer', fontSize: 13,
                  color: '#2A1A1F', textAlign: 'left',
                  borderRadius: 8,
                  transition: 'background .2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(123,30,58,.05)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <span style={{ fontSize: 16 }}>{item.icon}</span>
                {item.label}
              </button>
            ))}

            {/* Logout */}
            <button
              onClick={() => { onLogout(); setOpen(false); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                width: '100%', padding: '10px 14px',
                background: 'transparent', border: 'none',
                cursor: 'pointer', fontSize: 13,
                color: '#c0392b', textAlign: 'left',
                borderRadius: 8, marginTop: 4,
                borderTop: '1px solid rgba(123,30,58,.08)',
                transition: 'background .2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(192,57,43,.05)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <span style={{ fontSize: 16 }}>🚪</span>
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}