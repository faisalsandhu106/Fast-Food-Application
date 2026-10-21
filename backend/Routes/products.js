import { Router } from "express";
import mongoose from "mongoose";
import Product from "../Models/Product.js";
const router = Router();
router.get("/", async (req, res) => {
  try { const q = typeof req.query.q === "string" ? req.query.q.trim().slice(0, 100) : ""; const filter = { active: true }; if (q) filter.$or = [{ name: { $regex: q, $options: "i" } }, { category: { $regex: q, $options: "i" } }, { description: { $regex: q, $options: "i" } }]; const products = await Product.find(filter).sort({ createdAt: -1 }).lean(); res.json({ products }); }
  catch { res.status(500).json({ message: "Could not fetch menu." }); }
});
router.get("/:id", async (req, res) => {
  try { const id = req.params.id; const product = mongoose.isValidObjectId(id) ? await Product.findOne({ _id: id, active: true }).lean() : await Product.findOne({ sku: id, active: true }).lean(); if (!product) return res.status(404).json({ message: "Product not found." }); res.json({ product }); }
  catch { res.status(500).json({ message: "Could not fetch product." }); }
});
export default router;
