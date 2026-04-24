import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Inquiry from '@/models/Inquiry';

export async function POST(request) {
  try {
    await connectToDatabase();
    const data = await request.json();

    const newInquiry = await Inquiry.create(data);

    return NextResponse.json({ 
      success: true, 
      message: 'Inquiry sent successfully',
      data: newInquiry 
    }, { status: 201 });

  } catch (error) {
    console.error('Inquiry API Error:', error);
    return NextResponse.json({ error: 'Failed to send inquiry' }, { status: 500 });
  }
}
