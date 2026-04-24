import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import FooterSettings from '@/models/FooterSettings';

// GET footer settings
export async function GET() {
  try {
    await connectToDatabase();
    let footer = await FooterSettings.findOne();
    
    if (!footer) {
      footer = await FooterSettings.create({
        services: ["Visiting Cards", "Flex Banners", "Custom Stickers", "Bill Books", "Office Supplies"],
        quickLinks: [
          { label: "Home", href: "/" },
          { label: "Our Products", href: "/products" },
          { label: "Get a Quote", href: "/contact" }
        ]
      });
    }
    
    return NextResponse.json(footer);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch footer content' }, { status: 500 });
  }
}

// UPDATE footer settings
export async function POST(request) {
  try {
    await connectToDatabase();
    const data = await request.json();
    
    let footer = await FooterSettings.findOne();
    
    if (footer) {
      footer = await FooterSettings.findByIdAndUpdate(footer._id, data, { new: true });
    } else {
      footer = await FooterSettings.create(data);
    }
    
    return NextResponse.json(footer);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update footer content' }, { status: 500 });
  }
}
