import mongoose from "mongoose";
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, trim: true, lowercase: true, maxlength: 150 },
  subject: { type: String, trim: true, maxlength: 150, default: "General enquiry" },
  message: { type: String, required: true, trim: true, maxlength: 2000 },
  status: { type: String, enum: ["new", "read", "resolved"], default: "new" },
}, { timestamps: true });
export default mongoose.models.Contact || mongoose.model("Contact", contactSchema);
