import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import orderRoutes from "./Routes/orders.js";
import productRoutes from "./Routes/products.js";
import contactRoutes from "./Routes/contacts.js";
import adminRoutes from "./Routes/admin.js";

const app = express();
const PORT = Number(process.env.PORT) || 5000;

const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    // Permit requests without Origin (curl/health checks) and configured frontend origins.
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Origin is not allowed by CORS."));
  },
}));
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    message: "Tahas Bite API is running.",
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/admin", adminRoutes);

app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
});

app.use((error, _req, res, _next) => {
  console.error("API error:", error.message);
  res.status(500).json({ message: "An unexpected server error occurred." });
});

async function startServer() {
  const uri = process.env.MONGODB_URI;
  if (!uri || (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://")) || uri.includes("YOUR_REAL_CLUSTER") || uri.includes("YOUR_USERNAME") || uri.includes("YOUR_REAL_MONGODB_CONNECTION_STRING")) {
    throw new Error("Set a real MONGODB_URI in backend/.env before starting the backend.");
  }

  await mongoose.connect(uri);
  console.log("Connected to MongoDB.");

  app.listen(PORT, () => {
    console.log(`Tahas Bite API listening on http://localhost:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Could not start backend:", error.message);
  process.exit(1);
});
