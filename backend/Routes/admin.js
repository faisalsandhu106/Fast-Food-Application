import { Router } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Product from "../Models/Product.js";
import Order from "../Models/Order.js";
import Contact from "../Models/Contact.js";
import { requireAdmin } from "../Middleware/adminAuth.js";

const router = Router();
const allowedStatuses = ["placed", "confirmed", "preparing", "out_for_delivery", "delivered", "cancelled"];
const clean = (value, max = 500) => typeof value === "string" ? value.trim().slice(0, max) : "";

router.post("/login", (req, res) => {
  const email = clean(req.body?.email, 150).toLowerCase();
  const password = typeof req.body?.password === "string" ? req.body.password : "";
  const adminEmail = (process.env.ADMIN_EMAIL || "").toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || "";
  if (!adminEmail || !adminPassword || !process.env.JWT_SECRET) {
    return res.status(503).json({ message: "Admin credentials are not configured in backend/.env." });
  }
  if (email !== adminEmail || password !== adminPassword) {
    return res.status(401).json({ message: "Incorrect email or password." });
  }
  const token = jwt.sign({ role: "admin", email }, process.env.JWT_SECRET, { expiresIn: "5h" });
  res.json({ token, admin: { email } });
});


router.get("/stats", requireAdmin, async (_req, res) => {
  try {
    const [products, orders, contacts, revenue, pendingOrders] = await Promise.all([
      Product.countDocuments(), Order.countDocuments(), Contact.countDocuments(),
      Order.aggregate([{ $match: { status: { $ne: "cancelled" } } }, { $group: { _id: null, total: { $sum: "$total" } } }]),
      Order.countDocuments({ status: { $in: ["placed", "confirmed"] } }),
    ]);
    res.json({ stats: { products, orders, contacts, revenue: revenue[0]?.total || 0, pendingOrders } });
  } catch { res.status(500).json({ message: "Could not load dashboard stats." }); }
});

// Product management
router.get("/products", requireAdmin, async (req, res) => {
  try {
    const q = clean(req.query.q, 100);
    const filter = q ? { $or: [{ name: { $regex: q, $options: "i" } }, { sku: { $regex: q, $options: "i" } }, { category: { $regex: q, $options: "i" } }] } : {};
    const sortMap = { newest: { createdAt: -1 }, oldest: { createdAt: 1 }, name: { name: 1 }, priceAsc: { price: 1 }, priceDesc: { price: -1 } };
    const products = await Product.find(filter).sort(sortMap[req.query.sort] || sortMap.newest).lean();
    res.json({ products });
  } catch { res.status(500).json({ message: "Could not fetch products." }); }
});


router.get("/products/:id", requireAdmin, async (req, res) => {
  try {
    const product = mongoose.isValidObjectId(req.params.id) ? await Product.findById(req.params.id).lean() : await Product.findOne({ sku: req.params.id }).lean();
    if (!product) return res.status(404).json({ message: "Product not found." });
    res.json({ product });
  } catch { res.status(500).json({ message: "Could not fetch product." }); }
});


router.post("/products", requireAdmin, async (req, res) => {
  try {
    const body = req.body || {};
    const sku = clean(body.sku, 80).toLowerCase().replace(/\s+/g, "-");
    const name = clean(body.name, 120);
    const price = Number(body.price);
    if (!sku || !name || !Number.isFinite(price) || price < 0) return res.status(400).json({ message: "SKU, name and a valid non-negative price are required." });
    const product = await Product.create({ sku, name, price, active: body.active !== false, description: clean(body.description, 1000), category: clean(body.category, 80) || "Popular", image: clean(body.image, 1000), emoji: clean(body.emoji, 12) || "🍔" });
    res.status(201).json({ product });
  } catch (error) { res.status(error.code === 11000 ? 409 : 400).json({ message: error.code === 11000 ? "That SKU already exists." : "Could not create product. Check the fields." }); }
});


router.put("/products/:id", requireAdmin, async (req, res) => {
  try {
    const body = req.body || {};
    const update = {};
    for (const key of ["sku", "name", "description", "category", "image", "emoji"]) if (body[key] !== undefined) update[key] = clean(body[key], key === "description" ? 1000 : 120);
    if (body.price !== undefined) { const price = Number(body.price); if (!Number.isFinite(price) || price < 0) return res.status(400).json({ message: "Price must be zero or more." }); update.price = price; }
    if (body.active !== undefined) update.active = Boolean(body.active);
    if (update.sku) update.sku = update.sku.toLowerCase().replace(/\s+/g, "-");
    const product = await Product.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ message: "Product not found." });
    res.json({ product });
  } catch (error) { res.status(error.code === 11000 ? 409 : 400).json({ message: "Could not update product. Check the fields." }); }
});


router.delete("/products/:id", requireAdmin, async (req, res) => {
  try { const product = await Product.findByIdAndDelete(req.params.id); if (!product) return res.status(404).json({ message: "Product not found." }); res.json({ message: "Product deleted." }); }
  catch { res.status(500).json({ message: "Could not delete product." }); }
});


// Order list, individual order, status updates and deletion
router.get("/orders", requireAdmin, async (req, res) => {
  try {
    const q = clean(req.query.q, 100); const status = clean(req.query.status, 40);
    const filter = {};
    if (allowedStatuses.includes(status)) filter.status = status;
    if (q) filter.$or = [{ "customer.name": { $regex: q, $options: "i" } }, { "customer.phone": { $regex: q, $options: "i" } }, { "customer.email": { $regex: q, $options: "i" } }, ...(mongoose.isValidObjectId(q) ? [{ _id: q }] : [])];
    const sort = req.query.sort === "oldest" ? { createdAt: 1 } : req.query.sort === "totalAsc" ? { total: 1 } : req.query.sort === "totalDesc" ? { total: -1 } : { createdAt: -1 };
    const orders = await Order.find(filter).sort(sort).limit(500).lean(); res.json({ orders });
  } catch { res.status(500).json({ message: "Could not fetch orders." }); }
});


router.get("/orders/:id", requireAdmin, async (req, res) => {
  try { if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: "Invalid order ID." }); const order = await Order.findById(req.params.id).lean(); if (!order) return res.status(404).json({ message: "Order not found." }); res.json({ order }); }
  catch { res.status(500).json({ message: "Could not fetch order." }); }
});


router.patch("/orders/:id", requireAdmin, async (req, res) => {
  try { if (!allowedStatuses.includes(req.body?.status)) return res.status(400).json({ message: "Invalid order status." }); const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true }); if (!order) return res.status(404).json({ message: "Order not found." }); res.json({ order }); }
  catch { res.status(500).json({ message: "Could not update order." }); }
});


router.delete("/orders/:id", requireAdmin, async (req, res) => {
  try { const order = await Order.findByIdAndDelete(req.params.id); if (!order) return res.status(404).json({ message: "Order not found." }); res.json({ message: "Order deleted." }); }
  catch { res.status(500).json({ message: "Could not delete order." }); }
});

// Contact inbox
router.get("/contacts", requireAdmin, async (req, res) => {
  try { const q = clean(req.query.q, 100); const status = clean(req.query.status, 20); const filter = {}; if (["new", "read", "resolved"].includes(status)) filter.status = status; if (q) filter.$or = ["name", "email", "subject", "message"].map((key) => ({ [key]: { $regex: q, $options: "i" } })); const contacts = await Contact.find(filter).sort({ createdAt: -1 }).limit(500).lean(); res.json({ contacts }); }
  catch { res.status(500).json({ message: "Could not fetch contact messages." }); }
});


router.patch("/contacts/:id", requireAdmin, async (req, res) => {
  try { if (!["new", "read", "resolved"].includes(req.body?.status)) return res.status(400).json({ message: "Invalid contact status." }); const contact = await Contact.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true }); if (!contact) return res.status(404).json({ message: "Message not found." }); res.json({ contact }); }
  catch { res.status(500).json({ message: "Could not update message." }); }
});


router.delete("/contacts/:id", requireAdmin, async (req, res) => {
  try { const contact = await Contact.findByIdAndDelete(req.params.id); if (!contact) return res.status(404).json({ message: "Message not found." }); res.json({ message: "Message deleted." }); }
  catch { res.status(500).json({ message: "Could not delete message." }); }
});


export default router;
