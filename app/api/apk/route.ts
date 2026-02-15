import { MongoClient, GridFSBucket } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('MONGODB_URI is not set');
}

export async function POST(req: NextRequest) {
  const client = new MongoClient(uri!);

  try {
    await client.connect();
    const db = client.db(process.env.MONGODB_DB ?? 'portfolio');
    const bucket = new GridFSBucket(db);

    // Check if file already exists
    const existingFiles = await db
      .collection('fs.files')
      .findOne({ filename: 'AgriFarm.apk' });

    if (existingFiles) {
      await bucket.delete(existingFiles._id);
    }

    // Read APK from public folder
    const apkPath = path.join(process.cwd(), 'public', 'AgriFarm.apk');
    const fileStream = fs.createReadStream(apkPath);

    // Upload to GridFS
    await fileStream.pipe(bucket.openUploadStream('AgriFarm.apk')).on('error', (err) => {
      throw err;
    });

    return NextResponse.json({ success: true, message: 'APK uploaded to MongoDB' });
  } catch (err) {
    console.error('Upload error:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  } finally {
    await client.close();
  }
}

export async function GET(req: NextRequest) {
  const client = new MongoClient(uri!);

  try {
    await client.connect();
    const db = client.db(process.env.MONGODB_DB ?? 'portfolio');
    const bucket = new GridFSBucket(db);

    // Find the APK file
    const file = await db
      .collection('fs.files')
      .findOne({ filename: 'AgriFarm.apk' });

    if (!file) {
      return NextResponse.json({ error: 'APK not found' }, { status: 404 });
    }

    // Download from GridFS
    const downloadStream = bucket.openDownloadStream(file._id);

    // Convert stream to buffer
    const chunks: Buffer[] = [];
    await new Promise((resolve, reject) => {
      downloadStream.on('data', (chunk) => chunks.push(chunk));
      downloadStream.on('end', resolve);
      downloadStream.on('error', reject);
    });

    const buffer = Buffer.concat(chunks);

    const response = new Response(buffer, {
      headers: {
        'Content-Type': 'application/vnd.android.package-archive',
        'Content-Disposition': 'attachment; filename="AgriFarm.apk"',
        'Content-Length': buffer.length.toString(),
      },
    });

    return response;
  } catch (err) {
    console.error('Download error:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  } finally {
    await client.close();
  }
}
