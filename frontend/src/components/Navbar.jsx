import React from 'react';
import styles from './Navbar.module.css';

export default function Navbar({ currentPage, onNavigate }) {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo} onClick={() => onNavigate('home')}>
        <span className={styles.logoText}>KOHLER</span>
        <span className={styles.logoSub}>Configurator</span>
      </div>
      <div className={styles.links}>
        <button
          className={`${styles.link} ${currentPage === 'home' ? styles.active : ''}`}
          onClick={() => onNavigate('home')}
        >
          Products
        </button>
        <button
          className={`${styles.link} ${currentPage === 'saved' ? styles.active : ''}`}
          onClick={() => onNavigate('saved')}
        >
          My Configurations
        </button>
      </div>
    </nav>
  );
}
