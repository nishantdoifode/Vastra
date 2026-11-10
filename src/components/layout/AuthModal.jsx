import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { Icons } from '../../utils/icons';

export default function AuthModal() {
  const {
    isAuthModalOpen, closeAuthModal, authMode, setAuthMode,
    login, signup,
  } = useAuth();

  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef(null);

  const UserIcon = Icons.user;
  const MailIcon = Icons.mail;
  const PhoneIcon = Icons.phone;
  const CloseIcon = Icons.close;
  const CheckIcon = Icons.check;

  useEffect(() => {
    if (isAuthModalOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 200);
    }
    if (!isAuthModalOpen) {
      setForm({ name: '', email: '', phone: '', password: '' });
      setErrors({});
      setShowPassword(false);
    }
  }, [isAuthModalOpen, authMode]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') closeAuthModal();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [closeAuthModal]);

  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const validate = () => {
    const e = {};
    if (authMode === 'signup' && form.name.trim().length < 3) {
      e.name = 'Name must be at least 3 characters';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'Enter a valid email';
    }
    if (authMode === 'signup' && !/^\d{10}$/.test(form.phone)) {
      e.phone = 'Enter valid 10-digit phone';
    }
    if (form.password.length < 6) {
      e.password = 'Password must be at least 6 characters';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      if (authMode === 'login') {
        login({ name: form.email.split('@')[0], ...form });
      } else {
        signup(form);
      }
      setLoading(false);
    }, 1200);
  };

  const switchMode = () => {
    setAuthMode(authMode === 'login' ? 'signup' : 'login');
  };

  const Field = ({ name, label, type = 'text', icon: Icon, placeholder, refProp, extra }) => (
    <div style={{ marginBottom: 16 }}>
      <label style={{
        display: 'block', fontSize: 12, fontWeight: 600,
        color: '#2A1A1F', marginBottom: 6,
        letterSpacing: '.05em', textTransform: 'uppercase',
      }}>
        {label} <span style={{ color: '#7B1E3A' }}>*</span>
      </label>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '0 14px',
        border: `1.5px solid ${errors[name] ? '#c0392b' : 'rgba(42,26,31,.15)'}`,
        borderRadius: 10,
        background: '#fff',
        transition: 'border-color .2s, box-shadow .2s',
      }}>
        {Icon && <Icon size={16} color="#7B1E3A" style={{ flexShrink: 0 }} />}
        <input
          ref={refProp}
          type={type === 'password' && showPassword ? 'text' : type}
          placeholder={placeholder}
          value={form[name]}
          onChange={(e) => update(name, e.target.value)}
          style={{
            flex: 1, padding: '13px 0',
            border: 'none', background: 'transparent',
            fontSize: 14, color: '#2A1A1F', outline: 'none',
            fontFamily: 'inherit',
          }}
          {...extra}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 12, color: '#7B1E3A', fontWeight: 600,
              padding: '4px 8px',
            }}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        )}
      </div>
      {errors[name] && (
        <div style={{ fontSize: 11, color: '#c0392b', marginTop: 4 }}>
          {errors[name]}
        </div>
      )}
    </div>
  );

  return (
    <AnimatePresence>
      {isAuthModalOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAuthModal}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(42,26,31,.6)',
              backdropFilter: 'blur(8px)',
              zIndex: 300,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: 440,
                maxHeight: 'calc(100vh - 40px)',
                background: '#FAF6F0',
                borderRadius: 24,
                overflow: 'hidden',
                boxShadow: '0 30px 80px rgba(42,26,31,.3)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Header with gradient */}
              <div style={{
                background: 'linear-gradient(135deg, #7B1E3A, #C9A961)',
                padding: '32px 32px 28px',
                position: 'relative',
                overflow: 'hidden',
                flexShrink: 0,
              }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,.15), transparent 50%)',
                }} />
                <button
                  onClick={closeAuthModal}
                  style={{
                    position: 'absolute', top: 16, right: 16,
                    background: 'rgba(250,246,240,.2)',
                    border: 'none', cursor: 'pointer',
                    width: 32, height: 32, borderRadius: '50%',
                    display: 'grid', placeItems: 'center',
                    color: '#FAF6F0',
                    zIndex: 2,
                  }}
                >
                  <CloseIcon size={16} />
                </button>
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{
                    fontSize: 11, letterSpacing: '.3em',
                    textTransform: 'uppercase',
                    color: 'rgba(250,246,240,.8)',
                    fontStyle: 'italic',
                    fontFamily: "'Playfair Display', serif",
                    marginBottom: 8,
                  }}>
                    — Welcome to Vastra —
                  </div>
                  <h2 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 32, fontWeight: 700,
                    color: '#FAF6F0',
                    lineHeight: 1.1,
                  }}>
                    {authMode === 'login' ? 'Sign In' : 'Create Account'}
                  </h2>
                  <p style={{
                    fontSize: 13, color: 'rgba(250,246,240,.85)',
                    marginTop: 8,
                  }}>
                    {authMode === 'login'
                      ? 'Welcome back! Enter your details.'
                      : 'Join us and discover timeless elegance.'}
                  </p>
                </div>
              </div>

              {/* Form */}
              <div style={{
                padding: '28px 32px 32px',
                overflowY: 'auto',
                flex: 1,
              }}>
                <form onSubmit={handleSubmit}>
                  {authMode === 'signup' && (
                    <Field
                      name="name"
                      label="Full Name"
                      icon={UserIcon}
                      placeholder="Priya Sharma"
                    />
                  )}

                  <Field
                    name="email"
                    label="Email Address"
                    type="email"
                    icon={MailIcon}
                    placeholder="you@example.com"
                    refProp={authMode === 'login' ? inputRef : undefined}
                    extra={{ autoComplete: 'email' }}
                  />

                  {authMode === 'signup' && (
                    <Field
                      name="phone"
                      label="Phone Number"
                      type="tel"
                      icon={PhoneIcon}
                      placeholder="9876543210"
                      extra={{ maxLength: 10, inputMode: 'numeric' }}
                    />
                  )}

                  <Field
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    refProp={authMode === 'signup' ? inputRef : undefined}
                    extra={{ autoComplete: authMode === 'login' ? 'current-password' : 'new-password' }}
                  />

                  {authMode === 'login' && (
                    <div style={{
                      display: 'flex', justifyContent: 'flex-end',
                      marginBottom: 20, marginTop: -8,
                    }}>
                      <button
                        type="button"
                        style={{
                          background: 'none', border: 'none',
                          color: '#7B1E3A', fontSize: 13,
                          fontWeight: 600, cursor: 'pointer',
                          padding: 0,
                        }}
                      >
                        Forgot Password?
                      </button>
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    style={{
                      width: '100%',
                      background: '#7B1E3A',
                      color: '#FAF6F0',
                      border: 'none',
                      padding: 16,
                      borderRadius: 40,
                      fontSize: 14,
                      fontWeight: 700,
                      letterSpacing: '.15em',
                      textTransform: 'uppercase',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      boxShadow: '0 8px 24px rgba(123,30,58,.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 10,
                      opacity: loading ? 0.8 : 1,
                    }}
                  >
                    {loading ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          style={{ display: 'inline-block' }}
                        >
                          <CheckIcon size={16} />
                        </motion.span>
                        {authMode === 'login' ? 'Signing In...' : 'Creating Account...'}
                      </>
                    ) : (
                      <>{authMode === 'login' ? 'Sign In' : 'Create Account'}</>
                    )}
                  </motion.button>
                </form>

                {/* Divider */}
                <div style={{
                  display: 'flex', alignItems: 'center',
                  margin: '24px 0',
                  gap: 12,
                }}>
                  <div style={{ flex: 1, height: 1, background: 'rgba(123,30,58,.15)' }} />
                  <span style={{ fontSize: 11, color: '#6B5A5F', letterSpacing: '.1em' }}>OR</span>
                  <div style={{ flex: 1, height: 1, background: 'rgba(123,30,58,.15)' }} />
                </div>

                {/* Social login */}
                <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
                  <button style={{
                    flex: 1, padding: 12,
                    border: '1.5px solid rgba(42,26,31,.15)',
                    borderRadius: 10, background: '#fff',
                    cursor: 'pointer', fontSize: 13,
                    fontWeight: 600, color: '#2A1A1F',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', gap: 8,
                  }}>
                    <span style={{ fontSize: 16 }}>🔵</span> Google
                  </button>
                  <button style={{
                    flex: 1, padding: 12,
                    border: '1.5px solid rgba(42,26,31,.15)',
                    borderRadius: 10, background: '#fff',
                    cursor: 'pointer', fontSize: 13,
                    fontWeight: 600, color: '#2A1A1F',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', gap: 8,
                  }}>
                    <span style={{ fontSize: 16 }}>📘</span> Facebook
                  </button>
                </div>

                {/* Switch mode */}
                <div style={{
                  textAlign: 'center',
                  fontSize: 13,
                  color: '#6B5A5F',
                }}>
                  {authMode === 'login' ? "Don't have an account?" : 'Already have an account?'}
                  <button
                    onClick={switchMode}
                    style={{
                      background: 'none', border: 'none',
                      color: '#7B1E3A', fontSize: 13,
                      fontWeight: 700, cursor: 'pointer',
                      marginLeft: 4, padding: 0,
                    }}
                  >
                    {authMode === 'login' ? 'Sign Up' : 'Sign In'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}