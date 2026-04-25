import mongoose from 'mongoose';

const ServiceOptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    default: 0,
  }
}, { timestamps: true });

export default mongoose.models.ServiceOption || mongoose.model('ServiceOption', ServiceOptionSchema);
