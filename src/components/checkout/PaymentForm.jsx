import React, { useState } from 'react';
import { motion } from 'framer-motion';

const methods = [
  { id: 'upi', icon: '📱', name: 'UPI' },
  { id: 'card', icon: '💳', name: 'Card' },
  { id: 'netbanking', icon: '🏦', name: 'Net Banking' },
  { id: 'cod', icon: '💵', name: 'COD' },
];

const banks = ['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra', 'Punjab National Bank', 'Other'];

export default function PaymentForm({ initialData, onBack, onNext }) {
  const [form, setForm] = useState(initialData || { method: 'upi', upiId: '', cardNumber: '', cardName: '', expiry: '', cvv: '', bank: '' });
  const [errors, setErrors] = useState({});

  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const formatCard = (v) => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  const formatExpiry = (v) => {
    const d = v.replace(/\D/g, '').slice(0, 4);
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  const validate = () => {
    const e = {};
    if (form.method === 'upi') {
      if (!/^.+@.+$/.test(form.upiId)) e.upiId = 'Enter valid UPI ID (e.g. name@upi)';
    } else if (form.method === 'card') {
      if (form.cardNumber.replace(/\s/g, '').length < 16) e.cardNumber = 'Enter 16-digit card number';
      if (!form.cardName.trim()) e.cardName = 'Enter name on card';
      if (!/^\d{2}\/\d{2}$/.test(form.expiry)) e.expiry = 'Format MM/YY';
      if (!/^\d{3}$/.test(form.cvv)) e.cvv = 'Enter 3-digit CVV';
    } else if (form.method === 'netbanking') {
      if (!form.bank) e.bank = 'Select a bank';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onNext(form);
  };

  return (
    <motion.form
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      onSubmit={handleSubmit}
      className="form-section"
    >
      <h2 className="form-title">Payment Method</h2>
      <p className="form-sub">Choose how you'd like to pay. All transactions are secure.</p>

      <div className="pay-methods">
        {methods.map((m) => (
          <motion.button
            key={m.id}
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => update('method', m.id)}
            className={`pay-method ${form.method === m.id ? 'selected' : ''}`}
          >
            <div className="pay-method-icon">{m.icon}</div>
            <div className="pay-method-name">{m.name}</div>
          </motion.button>
        ))}
      </div>

      <div className="form-grid">
        {form.method === 'upi' && (
          <div className="full">
            <label className="field-label">UPI ID <span className="req">*</span></label>
            <input
              type="text"
              placeholder="yourname@paytm"
              className={`field-input ${errors.upiId ? 'error' : ''}`}
              value={form.upiId}
              onChange={(e) => update('upiId', e.target.value)}
            />
            <div className="field-error">{errors.upiId || ''}</div>
          </div>
        )}

        {form.method === 'card' && (
          <>
            <div className="full">
              <label className="field-label">Card Number <span className="req">*</span></label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="1234 5678 9012 3456"
                className={`field-input ${errors.cardNumber ? 'error' : ''}`}
                value={form.cardNumber}
                onChange={(e) => update('cardNumber', formatCard(e.target.value))}
              />
              <div className="field-error">{errors.cardNumber || ''}</div>
            </div>
            <div className="full">
              <label className="field-label">Name on Card <span className="req">*</span></label>
              <input
                type="text"
                placeholder="John Doe"
                className={`field-input ${errors.cardName ? 'error' : ''}`}
                value={form.cardName}
                onChange={(e) => update('cardName', e.target.value)}
              />
              <div className="field-error">{errors.cardName || ''}</div>
            </div>
            <div>
              <label className="field-label">Expiry <span className="req">*</span></label>
              <input
                type="text"
                placeholder="MM/YY"
                className={`field-input ${errors.expiry ? 'error' : ''}`}
                value={form.expiry}
                onChange={(e) => update('expiry', formatExpiry(e.target.value))}
              />
              <div className="field-error">{errors.expiry || ''}</div>
            </div>
            <div>
              <label className="field-label">CVV <span className="req">*</span></label>
              <input
                type="password"
                inputMode="numeric"
                maxLength={3}
                placeholder="•••"
                className={`field-input ${errors.cvv ? 'error' : ''}`}
                value={form.cvv}
                onChange={(e) => update('cvv', e.target.value.replace(/\D/g, ''))}
              />
              <div className="field-error">{errors.cvv || ''}</div>
            </div>
          </>
        )}

        {form.method === 'netbanking' && (
          <div className="full">
            <label className="field-label">Select Bank <span className="req">*</span></label>
            <select
              className={`field-select ${errors.bank ? 'error' : ''}`}
              value={form.bank}
              onChange={(e) => update('bank', e.target.value)}
            >
              <option value="">Choose your bank...</option>
              {banks.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
            <div className="field-error">{errors.bank || ''}</div>
          </div>
        )}

        {form.method === 'cod' && (
          <div className="full" style={{
            padding: 20, background: 'rgba(201,169,97,.1)',
            borderRadius: 12, border: '1px solid rgba(201,169,97,.3)',
          }}>
            <div style={{ fontSize: 14, color: '#2A1A1F', fontWeight: 600, marginBottom: 6 }}>
              💵 Cash on Delivery
            </div>
            <div style={{ fontSize: 13, color: '#6B5A5F', lineHeight: 1.6 }}>
              Pay when your order arrives. Keep exact change ready for smooth delivery.
            </div>
          </div>
        )}
      </div>

      <div style={{
        marginTop: 20, padding: 14,
        background: 'rgba(123,30,58,.04)', borderRadius: 10,
        fontSize: 12, color: '#6B5A5F', display: 'flex', gap: 8, alignItems: 'center',
      }}>
        🔒 Your payment information is encrypted and secure.
      </div>

      <div className="btn-row">
        <button type="button" onClick={onBack} className="btn btn-secondary">← Back</button>
        <button type="submit" className="btn btn-primary">Review Order →</button>
      </div>
    </motion.form>
  );
}