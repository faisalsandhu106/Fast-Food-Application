import "dotenv/config";
import mongoose from "mongoose";
import Product from "../Models/Product.js";

const menuItems = [
  { sku: "smash-burger", name: "Tahas Smash Burger", price: 850, category: "Burgers", description: "Juicy smashed beef patty, cheddar, lettuce, pickles and house sauce.", emoji: "🍔", active: true },
  { sku: "crispy-chicken", name: "Crispy Chicken Burger", price: 720, category: "Burgers", description: "Crunchy chicken fillet with creamy mayo and fresh lettuce.", emoji: "🍗", active: true },
  { sku: "loaded-fries", name: "Loaded Fire Fries", price: 480, category: "Sides", description: "Golden fries topped with cheese sauce and smoky seasoning.", emoji: "🍟", active: true },
  { sku: "zinger-wrap", name: "Zinger Wrap", price: 590, category: "Wraps", description: "Crispy chicken, crunchy vegetables and tangy signature dressing.", emoji: "🌯", active: true },
  { sku: "bbq-wings", name: "BBQ Wings (6 pcs)", price: 650, category: "Sides", description: "Tender wings coated in a sweet and smoky BBQ glaze.", emoji: "🍗", active: true },
  { sku: "choco-shake", name: "Chocolate Shake", price: 390, category: "Drinks", description: "A rich, creamy chocolate shake served chilled.", emoji: "🥤", active: true },
];

async function main() {
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is missing in backend/.env");
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB.");

  for (const item of menuItems) {
    await Product.updateOne(
      { sku: item.sku },
      {
        $set: { name: item.name, price: item.price, category: item.category, description: item.description, emoji: item.emoji, active: item.active },
        $setOnInsert: { sku: item.sku },
      },
      { upsert: true }
    );
    console.log(`Ready: ${item.name} (${item.sku})`);
  }
  console.log("All menu products are ready.");
}

main()
  .catch((error) => {
    console.error("Product seeding failed:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
