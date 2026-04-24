import mongoose from 'mongoose';

const HeroImageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

const HeroContentSchema = new mongoose.Schema({
  headingPrefix: { type: String, default: "No." },
  headingMain: { type: String, default: "1" },
  subHeading: { type: String, default: "Luxury Design" },
  description: { type: String, required: true },
  ctaText: { type: String, default: "Get Quote" },
  images: [HeroImageSchema],
}, { timestamps: true });

export default mongoose.models.HeroContent || mongoose.model('HeroContent', HeroContentSchema);
