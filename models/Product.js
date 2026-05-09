import mongoose from 'mongoose';

const QuantityOptionSchema = new mongoose.Schema({
  label: { type: String, required: true },
  price: { type: String, required: true },
  badge: { type: String, default: "" }
}, { _id: false });

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    default: []
  },
  description: {
    type: String,
    default: "High quality printing, perfect finishes and luxury look for your brand."
  },
  sizes: {
    type: [String],
    default: ["Standard (3.5 x 2 inch)", "Custom Size"]
  },
  finishes: {
    type: [String],
    default: ["Matte", "Glossy", "Velvet"]
  },
  quantityOptions: {
    type: [QuantityOptionSchema],
    default: [
      { label: "100 Cards", price: "299" },
      { label: "250 Cards", price: "599" },
      { label: "500 Cards", price: "999", badge: "Popular" },
      { label: "1000 Cards", price: "1899", badge: "Best Value" },
    ]
  },
  rating: {
    type: Number,
    default: 4.9
  },
  reviewsCount: {
    type: Number,
    default: 120
  },
  order: {
    type: Number,
    default: 0,
  }
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
