const express = require("express");
const cors = require("cors");
const productsRouter = require("./routes/products");
const configureRouter = require("./routes/configure");

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/api/products", productsRouter);
app.use("/api/configure", configureRouter);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API endpoints:`);
  console.log(`  GET  /api/products`);
  console.log(`  GET  /api/products/:id`);
  console.log(`  GET  /api/products/:id/options`);
  console.log(`  POST /api/configure`);
  console.log(`  GET  /api/configure`);
  console.log(`  GET  /api/configure/:id`);
});
