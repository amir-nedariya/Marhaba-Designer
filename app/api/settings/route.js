import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Settings from '@/models/Settings';

export async function GET() {
  try {
    await connectToDatabase();
    const settings = await Settings.find({});
    const settingsObj = settings.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
    return NextResponse.json(settingsObj);
  } catch (error) {
    return NextResponse.json({ error: 'Fetch failed', details: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const { key, value } = await request.json();
    if (!key) return NextResponse.json({ error: 'Key required' }, { status: 400 });

    const updated = await Settings.findOneAndUpdate(
      { key },
      { value },
      { upsert: true, new: true }
    );
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Save failed', details: error.message }, { status: 500 });
  }
}
