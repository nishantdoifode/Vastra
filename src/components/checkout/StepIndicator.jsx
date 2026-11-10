import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  { num: 1, label: 'Address' },
  { num: 2, label: 'Payment' },
  { num: 3, label: 'Review' },
];

export default function StepIndicator({ current }) {
  return (
    <div className="steps">
      {steps.map((s) => {
        const state = current === s.num ? 'active' : current > s.num ? 'done' : '';
        return (
          <motion.div
            key={s.num}
            className={`step ${state}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: s.num * 0.08 }}
          >
            <div className="step-dot">
              {state === 'done' ? '✓' : s.num}
            </div>
            <div className="step-label">{s.label}</div>
          </motion.div>
        );
      })}
    </div>
  );
}