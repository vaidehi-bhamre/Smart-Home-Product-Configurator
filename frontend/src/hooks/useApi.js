import { useState, useEffect, useCallback } from "react";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/products`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const json = await res.json();
        setProducts(json.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return { products, loading, error };
}

export function useProduct(productId) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId) return;
    async function fetchProduct() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${BASE_URL}/products/${productId}`);
        if (!res.ok) throw new Error("Product not found");
        const json = await res.json();
        setProduct(json.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [productId]);

  return { product, loading, error };
}

export function useSaveConfig() {
  const [saving, setSaving] = useState(false);
  const [savedConfig, setSavedConfig] = useState(null);
  const [error, setError] = useState(null);

  const saveConfig = useCallback(async (payload) => {
    try {
      setSaving(true);
      setError(null);
      const res = await fetch(`${BASE_URL}/configure`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to save configuration");
      const json = await res.json();
      setSavedConfig(json.data);
      return json.data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setSaving(false);
    }
  }, []);

  return { saveConfig, saving, savedConfig, error };
}
