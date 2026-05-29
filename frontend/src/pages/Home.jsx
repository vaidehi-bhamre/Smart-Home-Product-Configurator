import React, { useState } from 'react';
import { useProducts } from '../hooks/useApi';
import ProductCard from '../components/ProductCard';
import styles from './Home.module.css';

export default function Home({ onSelectProduct }) {
  const { products, loading, error } = useProducts();
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Kitchen', 'Bathroom'];

  const filtered = filter === 'All'
    ? products
    : products.filter(p => p.category === filter);

  if (loading) return <div className={styles.state}>Loading products...</div>;
  if (error) return <div className={styles.state}>Error: {error}</div>;

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <p className={styles.heroEyebrow}>Configure Your Space</p>
        <h1 className={styles.heroTitle}>Design Without Compromise</h1>
        <p className={styles.heroSub}>
          Choose a product and personalize every detail — finish, style, and features.
        </p>
      </div>

      <div className={styles.filters}>
        {categories.map(cat => (
          <button
            key={cat}
            className={`${styles.filter} ${filter === cat ? styles.filterActive : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {filtered.map(product => (
          <ProductCard key={product.id} product={product} onSelect={onSelectProduct} />
        ))}
      </div>
    </div>
  );
}
