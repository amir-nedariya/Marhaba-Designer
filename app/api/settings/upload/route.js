import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import connectToDatabase from '@/lib/mongodb';
import Settings from '@/models/Settings';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let fileUrl = '';
    const isVercel = process.env.VERCEL === '1' || process.env.NODE_ENV === 'production';

    // Attempt local storage save (Only works in Dev/Local)
    try {
      const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
      const uploadDir = join(process.cwd(), 'public', 'uploads');
      
      await mkdir(uploadDir, { recursive: true });
      const path = join(uploadDir, filename);
      await writeFile(path, buffer);
      
      fileUrl = `/uploads/${filename}`;
    } catch (fsError) {
      console.warn('Local FS write failed, falling back to Base64 (Expected on Vercel)');
      
      // FALLBACK: Convert to Data URI for Vercel
      const base64 = buffer.toString('base64');
      const mime = file.type || 'image/png';
      fileUrl = `data:${mime};base64,${base64}`;
    }

    // Update settings in MongoDB
    await connectToDatabase();
    await Settings.findOneAndUpdate(
      { key: 'header_logo' },
      { value: fileUrl },
      { upsert: true }
    );

    return NextResponse.json({ 
      success: true, 
      url: fileUrl 
    });

  } catch (error) {
    console.error('Settings Upload Error:', error);
    return NextResponse.json({ 
      error: 'Upload failed', 
      details: error.message 
    }, { status: 500 });
  }
}
