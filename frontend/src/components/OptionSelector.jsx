import React from 'react';
import styles from './OptionSelector.module.css';

export default function OptionSelector({ label, options, selected, onChange, type = 'radio' }) {
  if (type === 'swatch') {
    return (
      <div className={styles.group}>
        <div className={styles.labelRow}>
          <span className={styles.label}>{label}</span>
          <span className={styles.selected}>
            {options.find(o => o.id === selected)?.label}
          </span>
        </div>
        <div className={styles.swatches}>
          {options.map(option => (
            <button
              key={option.id}
              className={`${styles.swatch} ${selected === option.id ? styles.swatchActive : ''}`}
              style={{ background: option.hex }}
              onClick={() => onChange(option.id)}
              title={option.label}
              aria-label={option.label}
              aria-pressed={selected === option.id}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.group}>
      <span className={styles.label}>{label}</span>
      <div className={styles.options}>
        {options.map(option => (
          <button
            key={option.id}
            className={`${styles.option} ${selected === option.id ? styles.optionActive : ''}`}
            onClick={() => onChange(option.id)}
            aria-pressed={selected === option.id}
          >
            <span className={styles.optionLabel}>{option.label}</span>
            {option.price > 0 && (
              <span className={styles.optionPrice}>+${option.price}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
