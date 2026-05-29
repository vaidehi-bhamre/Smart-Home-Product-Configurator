import React, { useState, useReducer, useCallback } from 'react';
import { useProduct, useSaveConfig } from '../hooks/useApi';
import OptionSelector from '../components/OptionSelector';
import SummaryPanel from '../components/SummaryPanel';
import AlertItem from '../components/AlertItem';
import styles from './Configurator.module.css';

function optionsReducer(state, action) {
  switch (action.type) {
    case 'SET_OPTION':
      return { ...state, [action.category]: action.value };
    case 'RESET':
      return action.defaults;
    default:
      return state;
  }
}

function getDefaults(product) {
  if (!product) return {};
  return Object.fromEntries(
    Object.entries(product.options).map(([cat, opts]) => [cat, opts[0].id])
  );
}

function calculateTotal(product, selectedOptions) {
  if (!product) return 0;
  let total = product.basePrice;
  for (const [cat, selectedId] of Object.entries(selectedOptions)) {
    const match = product.options[cat]?.find(o => o.id === selectedId);
    if (match) total += match.price;
  }
  return total;
}

export default function Configurator({ productId, onBack }) {
  const { product, loading, error } = useProduct(productId);
  const { saveConfig, saving } = useSaveConfig();
  const [alerts, setAlerts] = useState([]);

  const [selectedOptions, dispatch] = useReducer(
    optionsReducer,
    {},
    () => ({})
  );

  // Sync defaults once product loads
  const [defaultsSet, setDefaultsSet] = useState(false);
  if (product && !defaultsSet) {
    dispatch({ type: 'RESET', defaults: getDefaults(product) });
    setDefaultsSet(true);
  }

  const handleOptionChange = useCallback((category, value) => {
    dispatch({ type: 'SET_OPTION', category, value });
  }, []);

  const handleSave = useCallback(async ({ customerName, customerEmail }) => {
    const result = await saveConfig({
      productId: product.id,
      selectedOptions,
      customerName,
      customerEmail
    });
    if (result) {
      setAlerts(prev => [...prev, {
        id: Date.now(),
        type: 'success',
        message: `Configuration saved! ID: ${result.id}`
      }]);
    } else {
      setAlerts(prev => [...prev, {
        id: Date.now(),
        type: 'error',
        message: 'Failed to save. Please try again.'
      }]);
    }
  }, [product, selectedOptions, saveConfig]);

  const dismissAlert = useCallback((id) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  }, []);

  if (loading) return <div className={styles.state}>Loading product...</div>;
  if (error) return <div className={styles.state}>Error: {error}</div>;
  if (!product) return null;

  const totalPrice = calculateTotal(product, selectedOptions);
  const selectedFinish = selectedOptions['finish'];
  const finishHex = product.options.finish?.find(f => f.id === selectedFinish)?.hex;

  return (
    <div className={styles.page}>
      <div className={styles.alerts}>
        {alerts.map(alert => (
          <AlertItem
            key={alert.id}
            message={alert.message}
            type={alert.type}
            onDismiss={() => dismissAlert(alert.id)}
          />
        ))}
      </div>

      <button className={styles.back} onClick={onBack}>← Back to Products</button>

      <div className={styles.layout}>
        {/* Left: Product Visual + Options */}
        <div className={styles.left}>
          <div className={styles.imageWrap} style={{ '--finish-color': finishHex || '#ccc' }}>
            <img src={product.image} alt={product.name} className={styles.image} />
            <div className={styles.finishOverlay} />
          </div>

          <div className={styles.productHeader}>
            <span className={styles.category}>{product.category}</span>
            <h2 className={styles.productName}>{product.name}</h2>
            <p className={styles.description}>{product.description}</p>
          </div>

          <div className={styles.options}>
            {Object.entries(product.options).map(([category, opts]) => {
              const isFinish = category === 'finish';
              return (
                <OptionSelector
                  key={category}
                  label={category.charAt(0).toUpperCase() + category.slice(1).replace(/([A-Z])/g, ' $1')}
                  options={opts}
                  selected={selectedOptions[category]}
                  onChange={(val) => handleOptionChange(category, val)}
                  type={isFinish ? 'swatch' : 'radio'}
                />
              );
            })}
          </div>
        </div>

        {/* Right: Summary Panel */}
        <div className={styles.right}>
          <SummaryPanel
            product={product}
            selectedOptions={selectedOptions}
            totalPrice={totalPrice}
            onSave={handleSave}
            saving={saving}
          />
        </div>
      </div>
    </div>
  );
}
