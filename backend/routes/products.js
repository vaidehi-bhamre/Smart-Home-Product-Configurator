const express = require("express");
const router = express.Router();
const products = require("../data/products");

// GET /api/products — list all products
router.get("/", (req, res) => {
  const { category } = req.query;
  let result = products;
  if (category) {
    result = products.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }
  res.json({
    success: true,
    count: result.length,
    data: result.map(({ id, name, category, basePrice, description, image }) => ({
      id, name, category, basePrice, description, image
    }))
  });
});

// GET /api/products/:id — single product with options
router.get("/:id", (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }
  res.json({ success: true, data: product });
});

// GET /api/products/:id/options — just options for a product
router.get("/:id/options", (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }
  res.json({ success: true, data: product.options });
});

module.exports = router;
