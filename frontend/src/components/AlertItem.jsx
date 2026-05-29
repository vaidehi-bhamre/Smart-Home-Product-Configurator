import React, { useEffect, useState } from 'react';
import styles from './AlertItem.module.css';

export default function AlertItem({ message, type = 'success', onDismiss, autoDismiss = 4000 }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!autoDismiss) return;
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDismiss, 300);
    }, autoDismiss);
    return () => clearTimeout(timer);
  }, [autoDismiss, onDismiss]);

  return (
    <div className={`${styles.alert} ${styles[type]} ${!visible ? styles.hide : ''}`}>
      <span className={styles.icon}>{type === 'success' ? '✓' : '✕'}</span>
      <span className={styles.message}>{message}</span>
      <button className={styles.close} onClick={onDismiss}>×</button>
    </div>
  );
}
