import React, { useEffect, useState } from 'react';
import styles from './SavedConfigs.module.css';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

export default function SavedConfigs() {
  const [configs, setConfigs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchConfigs() {
      try {
        const res = await fetch(`${BASE_URL}/configure`);
        const json = await res.json();
        setConfigs(json.data);
      } catch (err) {
        console.error('Failed to fetch configs', err);
      } finally {
        setLoading(false);
      }
    }
    fetchConfigs();
  }, []);

  if (loading) return <div className={styles.state}>Loading configurations...</div>;

  if (configs.length === 0) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyTitle}>No saved configurations yet</p>
        <p className={styles.emptySub}>Configure a product and save it to see it here.</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h2 className={styles.title}>My Configurations</h2>
        <p className={styles.sub}>{configs.length} saved configuration{configs.length !== 1 ? 's' : ''}</p>
      </div>
      <div className={styles.list}>
        {configs.map(config => (
          <div key={config.id} className={styles.card}>
            <div className={styles.cardTop}>
              <div>
                <p className={styles.configId}>{config.id}</p>
                <h3 className={styles.productName}>{config.productName}</h3>
                {config.customerName && config.customerName !== 'Guest' && (
                  <p className={styles.customer}>Saved by: {config.customerName}</p>
                )}
              </div>
              <span className={styles.price}>${config.totalPrice}</span>
            </div>
            <div className={styles.options}>
              {Object.entries(config.selectedOptions).map(([cat, val]) => (
                <span key={cat} className={styles.tag}>
                  {cat.replace(/([A-Z])/g, ' $1')}: {val.replace(/-/g, ' ')}
                </span>
              ))}
            </div>
            <p className={styles.date}>
              {new Date(config.createdAt).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
