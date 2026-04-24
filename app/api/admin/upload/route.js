import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

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

    // Strategy: Try Local Storage first (Dev), Waterfall to Base64 (Vercel)
    try {
      const filename = Date.now() + '-' + file.name.replace(/\s+/g, '-');
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      
      await mkdir(uploadDir, { recursive: true });
      const filePath = path.join(uploadDir, filename);
      await writeFile(filePath, buffer);
      
      fileUrl = `/uploads/${filename}`;
    } catch (err) {
      console.warn('Vercel environment detected or FS restricted. Using Base64 fallback.');
      
      // Fallback for Vercel: Return Base64 Data URI
      const base64 = buffer.toString('base64');
      const mimeType = file.type || 'image/png';
      fileUrl = `data:${mimeType};base64,${base64}`;
    }

    return NextResponse.json({ 
      success: true, 
      url: fileUrl 
    });

  } catch (error) {
    console.error('Core Upload Error:', error);
    return NextResponse.json({ 
      error: 'Failed to process file', 
      details: error.message 
    }, { status: 500 });
  }
}
