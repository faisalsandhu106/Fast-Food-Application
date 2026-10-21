import { Router } from "express";
import mongoose from "mongoose";
import Order from "../Models/Order.js";
import Product from "../Models/Product.js";

const router = Router();

function cleanText(value, maxLength = 500) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

// POST /api/orders
router.post("/", async (req, res) => {
  try {
    const input = req.body?.customer;
    const itemsInput = req.body?.items;

    const customer = {
      name: cleanText(input?.name, 100),
      email: cleanText(input?.email, 150).toLowerCase(),
      phone: cleanText(input?.phone, 30),
      address: cleanText(input?.address, 500),
      notes: cleanText(input?.notes, 500),
    };

    if (!customer.name || !customer.phone || !customer.address) {
      return res.status(400).json({ message: "Name, phone, and delivery address are required." });
    }
    if (customer.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
      return res.status(400).json({ message: "Enter a valid email address." });
    }
    if (!Array.isArray(itemsInput) || itemsInput.length < 1 || itemsInput.length > 50) {
      return res.status(400).json({ message: "Your cart is empty or contains too many items." });
    }

    // Merge duplicate IDs and validate quantities.
    const quantities = new Map();
    for (const item of itemsInput) {
      const productId = cleanText(item?.productId, 100);
      const quantity = Number(item?.quantity);
      if (!productId || !Number.isSafeInteger(quantity) || quantity < 1 || quantity > 99) {
        return res.status(400).json({ message: "A product ID or quantity is invalid." });
      }
      const next = (quantities.get(productId) || 0) + quantity;
      if (next > 99) {
        return res.status(400).json({ message: "Maximum quantity per product is 99." });
      }
      quantities.set(productId, next);
    }

    const orderItems = [];
    let subtotal = 0;

    for (const [productId, quantity] of quantities) {
      let product = null;

      // IDs from this app's static menu are SKUs (e.g. "smash-burger").
      if (mongoose.isValidObjectId(productId)) {
        product = await Product.findOne({ _id: productId, active: true }).lean();
      }
      if (!product) {
        product = await Product.findOne({ sku: productId, active: true }).lean();
      }

      if (!product) {
        console.error(`Checkout product not found or inactive: ${productId}`);
        return res.status(400).json({
          message: `Product "${productId}" was not found or is inactive. Refresh your menu and try again.`,
        });
      }

      const price = Number(product.price);
      if (!Number.isFinite(price) || price < 0) {
        console.error(`Invalid database price for product: ${productId}`);
        return res.status(500).json({ message: "A product has an invalid database price." });
      }

      const lineTotal = Math.round(price * quantity * 100) / 100;
      subtotal += lineTotal;
      orderItems.push({
        productId: product._id,
        name: product.name,
        price,
        quantity,
        lineTotal,
      });
    }

    subtotal = Math.round(subtotal * 100) / 100;
    const deliveryFee = 0;
    const total = Math.round((subtotal + deliveryFee) * 100) / 100;

    const order = await Order.create({
      customer,
      items: orderItems,
      subtotal,
      deliveryFee,
      total,
      paymentMethod: "cash_on_delivery",
      paymentStatus: "pending",
      status: "placed",
    });

    return res.status(201).json({
      message: "Order placed successfully.",
      order: {
        id: order._id,
        status: order.status,
        items: order.items,
        subtotal: order.subtotal,
        deliveryFee: order.deliveryFee,
        total: order.total,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
        createdAt: order.createdAt,
      },
    });
  } catch (error) {
    console.error("Create order error:", error);
    return res.status(500).json({ message: "Unable to place your order. Please try again." });
  }
});

// Demo lookup. In production, protect this endpoint with authentication or a secure order token.
router.get("/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    if (!mongoose.isValidObjectId(orderId)) {
      return res.status(400).json({ message: "Invalid order ID." });
    }
    const order = await Order.findById(orderId).lean();
    if (!order) return res.status(404).json({ message: "Order not found." });

    return res.json({
      order: {
        id: order._id,
        status: order.status,
        items: order.items,
        subtotal: order.subtotal,
        deliveryFee: order.deliveryFee,
        total: order.total,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
        createdAt: order.createdAt,
      },
    });
  } catch (error) {
    console.error("Get order error:", error);
    return res.status(500).json({ message: "Unable to retrieve this order." });
  }
});

export default router;
