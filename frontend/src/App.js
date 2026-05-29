import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Configurator from './pages/Configurator';
import SavedConfigs from './pages/SavedConfigs';

export default function App() {
  const [page, setPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState(null);

  function handleSelectProduct(productId) {
    setSelectedProductId(productId);
    setPage('configurator');
  }

  function handleNavigate(target) {
    setPage(target);
    if (target !== 'configurator') setSelectedProductId(null);
  }

  return (
    <>
      <Navbar
        currentPage={page === 'configurator' ? 'home' : page}
        onNavigate={handleNavigate}
      />
      {page === 'home' && (
        <Home onSelectProduct={handleSelectProduct} />
      )}
      {page === 'configurator' && selectedProductId && (
        <Configurator
          productId={selectedProductId}
          onBack={() => handleNavigate('home')}
        />
      )}
      {page === 'saved' && (
        <SavedConfigs />
      )}
    </>
  );
}
