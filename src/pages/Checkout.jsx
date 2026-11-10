import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment
  const [isProcessing, setIsProcessing] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false); // For mobile

  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', address: '', city: '', pincode: '', state: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('cod');

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0 && !isProcessing) {
      navigate('/');
    }
  }, [cartItems, navigate, isProcessing]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      const orderId = 'VST' + Math.floor(Math.random() * 1000000);
      clearCart();
      navigate(`/order-success/${orderId}`);
    }, 2000);
  };

  const shippingFee = cartTotal > 2000 ? 0 : 150;
  const finalTotal = cartTotal + shippingFee;

  // Animation variants for steps
  const stepVariants = {
    enter: (direction) => ({ x: direction > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({ x: direction < 0 ? 100 : -100, opacity: 0 }),
  };

  return (
    <div className="checkout-page">
      {/* Header */}
      <div className="checkout-header">
        <Link to="/" className="checkout-logo">VASTRA</Link>
        <div className="checkout-steps">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>
            <div className="step-circle">1</div>
            <span>Shipping</span>
          </div>
          <div className="step-line" />
          <div className={`step ${step >= 2 ? 'active' : ''}`}>
            <div className="step-circle">2</div>
            <span>Payment</span>
          </div>
        </div>
      </div>

      <div className="checkout-container">
        {/* LEFT: Forms */}
        <div className="checkout-forms">
          <AnimatePresence mode="wait" custom={step}>
            {step === 1 && (
              <motion.div
                key="step1"
                custom={step}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="form-section"
              >
                <h2 className="section-title-sm">Shipping Details</h2>
                <div className="form-grid">
                  <InputField label="Full Name" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Priya Sharma" />
                  <InputField label="Email Address" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="priya@example.com" />
                  <InputField label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="9876543210" />
                  <InputField label="Pincode" name="pincode" value={formData.pincode} onChange={handleInputChange} placeholder="110001" />
                  <div className="full-width">
                    <InputField label="Address" name="address" value={formData.address} onChange={handleInputChange} placeholder="House No, Street, Locality" />
                  </div>
                  <InputField label="City" name="city" value={formData.city} onChange={handleInputChange} placeholder="New Delhi" />
                  <InputField label="State" name="state" value={formData.state} onChange={handleInputChange} placeholder="Delhi" />
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="btn-primary"
                  onClick={() => setStep(2)}
                  disabled={!formData.fullName || !formData.phone || !formData.address}
                >
                  Continue to Payment →
                </motion.button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                custom={step}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="form-section"
              >
                <h2 className="section-title-sm">Payment Method</h2>
                <div className="payment-options">
                  <PaymentCard 
                    id="cod" 
                    title="Cash on Delivery" 
                    desc="Pay when you receive" 
                    selected={paymentMethod === 'cod'} 
                    onSelect={() => setPaymentMethod('cod')} 
                  />
                  <PaymentCard 
                    id="upi" 
                    title="UPI / GPay / PhonePe" 
                    desc="Instant transfer" 
                    selected={paymentMethod === 'upi'} 
                    onSelect={() => setPaymentMethod('upi')} 
                  />
                  <PaymentCard 
                    id="card" 
                    title="Credit / Debit Card" 
                    desc="Visa, Mastercard, RuPay" 
                    selected={paymentMethod === 'card'} 
                    onSelect={() => setPaymentMethod('card')} 
                  />
                </div>

                <div className="checkout-actions">
                  <button className="btn-secondary" onClick={() => setStep(1)}>← Back</button>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="btn-primary"
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : `Place Order • ₹${finalTotal.toLocaleString()}`}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT: Sticky Order Summary */}
        <div className="checkout-summary-wrapper">
          <button className="mobile-summary-toggle" onClick={() => setSummaryOpen(!summaryOpen)}>
            <span>Order Summary ({cartItems.length} items)</span>
            <span className="toggle-icon">{summaryOpen ? '−' : '+'}</span>
          </button>
          
          <motion.div 
            className="checkout-summary"
            animate={{ height: summaryOpen ? 'auto' : 'auto' }} // Simplified for desktop
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="summary-title">Order Summary</h3>
            
            <div className="summary-items">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}`} className="summary-item">
                  <div className="summary-item-img" style={{ background: `linear-gradient(135deg, ${item.color1}, ${item.color2})` }}>
                    {item.image && <img src={item.image} alt={item.name} />}
                  </div>
                  <div className="summary-item-info">
                    <div className="summary-item-name">{item.name}</div>
                    <div className="summary-item-meta">Size: {item.size || 'M'} • Qty: {item.quantity || 1}</div>
                  </div>
                  <div className="summary-item-price">₹{item.price.toLocaleString()}</div>
                </div>
              ))}
            </div>

            <div className="summary-divider" />

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{cartTotal.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span style={{ color: shippingFee === 0 ? '#27ae60' : '#2A1A1F' }}>
                {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
              </span>
            </div>
            {shippingFee > 0 && (
              <div style={{ fontSize: 12, color: '#7B1E3A', textAlign: 'right', marginTop: -8, marginBottom: 12 }}>
                Add ₹{(2000 - cartTotal).toLocaleString()} more for free shipping
              </div>
            )}

            <div className="summary-divider" />

            <div className="summary-row total">
              <span>Total</span>
              <span>₹{finalTotal.toLocaleString()}</span>
            </div>

            <div className="secure-badge">
              <span>🔒</span> Secure 256-bit SSL Encryption
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ===== SUB-COMPONENTS =====

function InputField({ label, name, type = 'text', value, onChange, placeholder }) {
  return (
    <div className="input-group">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

function PaymentCard({ id, title, desc, selected, onSelect }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={`payment-card ${selected ? 'selected' : ''}`}
      onClick={onSelect}
    >
      <div className="payment-radio">
        <div className={`radio-inner ${selected ? 'active' : ''}`} />
      </div>
      <div className="payment-info">
        <div className="payment-title">{title}</div>
        <div className="payment-desc">{desc}</div>
      </div>
    </motion.div>
  );
}