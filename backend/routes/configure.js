const express = require("express");
const router = express.Router();
const products = require("../data/products");

// In-memory store (replace with a real DB in production)
const configurations = [];

// POST /api/configure — save a configuration
router.post("/", (req, res) => {
  const { productId, selectedOptions, customerName, customerEmail } = req.body;

  if (!productId || !selectedOptions) {
    return res.status(400).json({
      success: false,
      message: "productId and selectedOptions are required"
    });
  }

  const product = products.find((p) => p.id === productId);
  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  // Calculate total price
  let totalPrice = product.basePrice;
  for (const [category, selectedId] of Object.entries(selectedOptions)) {
    const optionList = product.options[category];
    if (optionList) {
      const match = optionList.find((o) => o.id === selectedId);
      if (match) totalPrice += match.price;
    }
  }

  const config = {
    id: `CFG-${Date.now()}`,
    productId,
    productName: product.name,
    selectedOptions,
    totalPrice,
    customerName: customerName || "Guest",
    customerEmail: customerEmail || null,
    createdAt: new Date().toISOString()
  };

  configurations.push(config);

  res.status(201).json({
    success: true,
    message: "Configuration saved successfully",
    data: config
  });
});

// GET /api/configure — list all saved configurations
router.get("/", (req, res) => {
  res.json({ success: true, count: configurations.length, data: configurations });
});

// GET /api/configure/:id — get a specific config
router.get("/:id", (req, res) => {
  const config = configurations.find((c) => c.id === req.params.id);
  if (!config) {
    return res.status(404).json({ success: false, message: "Configuration not found" });
  }
  res.json({ success: true, data: config });
});

module.exports = router;
