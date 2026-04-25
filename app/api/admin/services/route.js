import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import ServiceOption from '@/models/ServiceOption';

export async function GET() {
  try {
    await dbConnect();
    const options = await ServiceOption.find().sort({ order: 1, createdAt: -1 });
    return NextResponse.json(options);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch options' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const newOption = await ServiceOption.create(body);
    return NextResponse.json({ success: true, option: newOption });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create option' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { _id, ...updateData } = body;
    
    if (!_id) {
      return NextResponse.json({ error: 'Option ID is required' }, { status: 400 });
    }

    const updatedOption = await ServiceOption.findByIdAndUpdate(_id, updateData, { new: true });
    return NextResponse.json({ success: true, option: updatedOption });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update option' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Option ID is required' }, { status: 400 });
    }

    await ServiceOption.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete option' }, { status: 500 });
  }
}
