import { Router } from "express";
import Contact from "../Models/Contact.js";
const router = Router();
router.post("/", async (req, res) => {
  try { const { name, email, subject, message } = req.body || {}; const clean = (v, n) => typeof v === "string" ? v.trim().slice(0, n) : ""; const data = { name: clean(name, 100), email: clean(email, 150).toLowerCase(), subject: clean(subject, 150) || "General enquiry", message: clean(message, 2000) }; if (!data.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || data.message.length < 5) return res.status(400).json({ message: "Enter your name, a valid email and a message of at least 5 characters." }); const contact = await Contact.create(data); res.status(201).json({ message: "Thanks! Your message has been sent.", id: contact._id }); }
  catch { res.status(500).json({ message: "Could not send your message. Please try again." }); }
});
export default router;
