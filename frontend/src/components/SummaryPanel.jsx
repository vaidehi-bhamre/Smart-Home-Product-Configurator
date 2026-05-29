import React, { useState } from 'react';
import styles from './SummaryPanel.module.css';

export default function SummaryPanel({ product, selectedOptions, totalPrice, onSave, saving }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showForm, setShowForm] = useState(false);

  function handleSave(e) {
    e.preventDefault();
    onSave({ customerName: name, customerEmail: email });
  }

  const optionLabels = Object.entries(selectedOptions).map(([category, selectedId]) => {
    const opts = product.options[category];
    const match = opts?.find(o => o.id === selectedId);
    return match ? { category, label: match.label, price: match.price } : null;
  }).filter(Boolean);

  return (
    <aside className={styles.panel}>
      <div className={styles.productInfo}>
        <img src={product.image} alt={product.name} className={styles.thumb} />
        <div>
          <h4 className={styles.productName}>{product.name}</h4>
          <p className={styles.basePrice}>Base: ${product.basePrice}</p>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.selections}>
        <p className={styles.sectionTitle}>Your Selections</p>
        {optionLabels.map(({ category, label, price }) => (
          <div key={category} className={styles.row}>
            <span className={styles.rowCategory}>
              {category.charAt(0).toUpperCase() + category.slice(1).replace(/([A-Z])/g, ' $1')}
            </span>
            <span className={styles.rowValue}>
              {label}
              {price > 0 && <span className={styles.rowPrice}> +${price}</span>}
            </span>
          </div>
        ))}
      </div>

      <div className={styles.divider} />

      <div className={styles.totalRow}>
        <span className={styles.totalLabel}>Total</span>
        <span className={styles.totalPrice}>${totalPrice}</span>
      </div>

      {!showForm ? (
        <button className={styles.saveBtn} onClick={() => setShowForm(true)}>
          Save Configuration
        </button>
      ) : (
        <form onSubmit={handleSave} className={styles.form}>
          <input
            className={styles.input}
            type="text"
            placeholder="Your name (optional)"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            className={styles.input}
            type="email"
            placeholder="Email (optional)"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button type="submit" className={styles.saveBtn} disabled={saving}>
            {saving ? 'Saving...' : 'Confirm & Save'}
          </button>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
        </form>
      )}
    </aside>
  );
}
