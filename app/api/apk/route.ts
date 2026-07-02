import { MongoClient, GridFSBucket } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const ALLOWED_APK_FILES = new Set(['AgriFarm.apk', 'Ledger_MS.apk']);

function getRequestedApkFile(req: NextRequest) {
  const requestedFile = req.nextUrl.searchParams.get('file') ?? 'AgriFarm.apk';

  if (!ALLOWED_APK_FILES.has(requestedFile)) {
    return null;
  }

  return requestedFile;
}

async function uploadBufferToGridFS(buffer: Buffer, filename: string) {
  const client = new MongoClient(uri!);

  try {
    await client.connect();
    const db = client.db(process.env.MONGODB_DB ?? 'portfolio');
    const bucket = new GridFSBucket(db);

    const existingFile = await db.collection('fs.files').findOne({ filename });
    if (existingFile) {
      await bucket.delete(existingFile._id);
    }

    const uploadStream = bucket.openUploadStream(filename);
    await new Promise<void>((resolve, reject) => {
      uploadStream.on('finish', resolve);
      uploadStream.on('error', reject);
      uploadStream.end(buffer);
    });
  } finally {
    await client.close();
  }
}

async function downloadFromGridFS(filename: string) {
  const client = new MongoClient(uri!);

  try {
    await client.connect();
    const db = client.db(process.env.MONGODB_DB ?? 'portfolio');
    const bucket = new GridFSBucket(db);

    const file = await db.collection('fs.files').findOne({ filename });
    if (!file) {
      return null;
    }

    const downloadStream = bucket.openDownloadStream(file._id);
    const chunks: Buffer[] = [];

    await new Promise<void>((resolve, reject) => {
      downloadStream.on('data', (chunk) => chunks.push(chunk));
      downloadStream.on('end', resolve);
      downloadStream.on('error', reject);
    });

    return Buffer.concat(chunks);
  } finally {
    await client.close();
  }
}

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
  const requestedFile = getRequestedApkFile(req);

  if (!requestedFile) {
    return NextResponse.json({ error: 'Invalid APK file requested' }, { status: 400 });
  }

  const publicFilePath = path.join(process.cwd(), 'public', requestedFile);

  if (fs.existsSync(publicFilePath)) {
    const buffer = await fs.promises.readFile(publicFilePath);

    void uploadBufferToGridFS(buffer, requestedFile).catch((err) => {
      console.error('APK seed upload error:', err);
    });

    return new Response(buffer, {
      headers: {
        'Content-Type': 'application/vnd.android.package-archive',
        'Content-Disposition': `attachment; filename="${requestedFile}"`,
        'Content-Length': buffer.length.toString(),
      },
    });
  }

  try {
    const buffer = await downloadFromGridFS(requestedFile);

    if (!buffer) {
      return NextResponse.json({ error: 'APK not found' }, { status: 404 });
    }

    const response = new Response(buffer, {
      headers: {
        'Content-Type': 'application/vnd.android.package-archive',
        'Content-Disposition': `attachment; filename="${requestedFile}"`,
        'Content-Length': buffer.length.toString(),
      },
    });

    return response;
  } catch (err) {
    console.error('Download error:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
