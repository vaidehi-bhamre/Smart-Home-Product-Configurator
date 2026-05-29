import React from 'react';
import styles from './ProductCard.module.css';

export default function ProductCard({ product, onSelect }) {
  return (
    <div className={styles.card} onClick={() => onSelect(product.id)}>
      <div className={styles.imageWrap}>
        <img src={product.image} alt={product.name} className={styles.image} />
        <span className={styles.category}>{product.category}</span>
      </div>
      <div className={styles.body}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.footer}>
          <span className={styles.price}>From ${product.basePrice}</span>
          <button className={styles.cta}>Configure →</button>
        </div>
      </div>
    </div>
  );
}
