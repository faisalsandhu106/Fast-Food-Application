import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: { type: String, trim: true, maxlength: 1000, default: "" },
    category: { type: String, trim: true, maxlength: 80, default: "Popular", index: true },
    image: { type: String, trim: true, maxlength: 1000, default: "" },
    emoji: { type: String, trim: true, maxlength: 12, default: "🍔" },
    active: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
