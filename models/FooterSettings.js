import mongoose from 'mongoose';

const FooterSettingsSchema = new mongoose.Schema({
  tagline: { type: String, default: "Your one-stop solution for all professional printing and design needs. Excellence in every detail." },
  
  // Social Media Links
  socials: {
    facebook: { type: String, default: "#" },
    instagram: { type: String, default: "#" },
    twitter: { type: String, default: "#" },
  },

  // Contact Information
  contact: {
    address: { type: String, default: "Near Makki Masjid, Behind Ami Restaurent, Chhapi Highway, Ta.Vadgam, Dist. Banaskantha, Gujarat - 385210" },
    phone: { type: String, default: "+91 70162 27040" },
    email: { type: String, default: "marhabadesigner786@gmail.com" },
  },

  // Dynamic Lists
  services: [{ type: String }],
  quickLinks: [
    { label: { type: String }, href: { type: String } }
  ],

}, { timestamps: true });

export default mongoose.models.FooterSettings || mongoose.model('FooterSettings', FooterSettingsSchema);
