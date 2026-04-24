import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String, // In a real app, hash this! For now, direct comparison as requested for simplicity.
    required: true,
  },
  role: {
    type: String,
    default: 'admin',
  }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
