import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import HeroContent from '@/models/HeroContent';

// GET hero settings
export async function GET() {
  try {
    await connectToDatabase();
    let content = await HeroContent.findOne();
    
    // Create default if none exists
    if (!content) {
      content = await HeroContent.create({
        headingPrefix: "No.",
        headingMain: "1",
        subHeading: "Luxury Design",
        description: "Defining the standard of excellence in high-end design and precision printing for elite brands worldwide.",
        images: [
          { title: "Phamplate", imageUrl: "/images/printing/phamplate.png" },
          { title: "Visiting Cards", imageUrl: "/images/printing/visiting-card.png" }
        ]
      });
    }
    
    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch hero content' }, { status: 500 });
  }
}

// UPDATE hero settings
export async function POST(request) {
  try {
    await connectToDatabase();
    const data = await request.json();
    
    let content = await HeroContent.findOne();
    
    if (content) {
      content = await HeroContent.findByIdAndUpdate(content._id, data, { new: true });
    } else {
      content = await HeroContent.create(data);
    }
    
    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update hero content' }, { status: 500 });
  }
}
