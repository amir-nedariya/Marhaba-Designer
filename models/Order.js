import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  designUrl: { type: String },
  notes: { type: String },
  productTitle: { type: String, required: true },
  productId: { type: String, required: true },
  productImage: { type: String },
  status: { type: String, enum: ['new', 'processing', 'completed', 'cancelled'], default: 'new' }
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
