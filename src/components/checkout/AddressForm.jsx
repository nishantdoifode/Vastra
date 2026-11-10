import React, { useState } from 'react';
import { motion } from 'framer-motion';

const initial = {
  fullName: '', phone: '', pincode: '',
  addressLine1: '', addressLine2: '',
  city: '', state: '', country: 'India',
};

const indianStates = [
  'Andhra Pradesh','Bihar','Delhi','Goa','Gujarat','Haryana','Karnataka',
  'Kerala','Madhya Pradesh','Maharashtra','Punjab','Rajasthan','Tamil Nadu',
  'Telangana','Uttar Pradesh','West Bengal','Other',
];

export default function AddressForm({ initialData, onNext }) {
  const [form, setForm] = useState(initialData || initial);
  const [errors, setErrors] = useState({});

  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.fullName.trim() || form.fullName.trim().length < 3) e.fullName = 'Enter full name';
    if (!/^\d{10}$/.test(form.phone)) e.phone = 'Enter valid 10-digit phone';
    if (!/^\d{6}$/.test(form.pincode)) e.pincode = 'Enter valid 6-digit pincode';
    if (!form.addressLine1.trim()) e.addressLine1 = 'Address required';
    if (!form.city.trim()) e.city = 'City required';
    if (!form.state) e.state = 'Select state';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onNext(form);
  };

  const field = (name, label, type = 'text', extra = {}) => (
    <div className={extra.full ? 'full' : ''}>
      <label className="field-label">
        {label} <span className="req">*</span>
      </label>
      {type === 'select' ? (
        <select
          className={`field-select ${errors[name] ? 'error' : ''}`}
          value={form[name]}
          onChange={(e) => update(name, e.target.value)}
        >
          <option value="">Select...</option>
          {extra.options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          className={`field-textarea ${errors[name] ? 'error' : ''}`}
          value={form[name]}
          onChange={(e) => update(name, e.target.value)}
          rows={2}
        />
      ) : (
        <input
          type={type}
          className={`field-input ${errors[name] ? 'error' : ''}`}
          value={form[name]}
          onChange={(e) => update(name, e.target.value)}
          maxLength={extra.maxLength}
          inputMode={extra.inputMode}
        />
      )}
      <div className="field-error">{errors[name] || ''}</div>
    </div>
  );

  return (
    <motion.form
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      onSubmit={handleSubmit}
      className="form-section"
    >
      <h2 className="form-title">Shipping Address</h2>
      <p className="form-sub">Where should we deliver your order?</p>

      <div className="form-grid">
        {field('fullName', 'Full Name')}
        {field('phone', 'Phone Number', 'tel', { maxLength: 10, inputMode: 'numeric' })}
        {field('pincode', 'Pincode', 'text', { maxLength: 6, inputMode: 'numeric' })}
        {field('city', 'City')}
        {field('addressLine1', 'Address Line 1', 'textarea', { full: true })}
        {field('addressLine2', 'Address Line 2 (Optional)', 'textarea', { full: true })}
        {field('state', 'State', 'select', { options: indianStates })}
        {field('country', 'Country')}
      </div>

      <div className="btn-row">
        <button type="submit" className="btn btn-primary">Continue to Payment →</button>
      </div>
    </motion.form>
  );
}