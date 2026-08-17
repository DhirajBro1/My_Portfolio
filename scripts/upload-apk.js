#!/usr/bin/env node

/**
 * Script to upload AgriFarm.apk to MongoDB GridFS
 * Run: node scripts/upload-apk.js
 */

async function uploadAPK() {
  const { default: dotenv } = await import('dotenv');
  const { MongoClient, GridFSBucket } = await import('mongodb');
  const fs = await import('fs');
  const path = await import('path');

  dotenv.config({ path: '.env.local' });

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('❌ MONGODB_URI environment variable is not set.');
    console.error('Create a .env.local file with your MongoDB connection string.');
    process.exit(1);
  }

  const dbName = process.env.MONGODB_DB || 'portfolio';
  const client = new MongoClient(uri);

  try {
    console.log('📚 Connecting to MongoDB...');
    await client.connect();
    const db = client.db(dbName);
    const bucket = new GridFSBucket(db);

    const apkPath = path.join(process.cwd(), 'public', 'AgriFarm.apk');

    // Check if file exists
    if (!fs.existsSync(apkPath)) {
      console.error(`❌ APK file not found at: ${apkPath}`);
      process.exit(1);
    }

    const stats = fs.statSync(apkPath);
    console.log(`📦 Found APK: ${(stats.size / (1024 * 1024)).toFixed(2)} MB`);

    // Check if file already exists in GridFS and delete it
    const existingFile = await db.collection('fs.files').findOne({ filename: 'AgriFarm.apk' });
    if (existingFile) {
      console.log('🗑️  Removing existing APK from GridFS...');
      await bucket.delete(existingFile._id);
    }

    // Upload the APK
    console.log('⏳ Uploading APK to MongoDB GridFS...');
    const uploadStream = bucket.openUploadStream('AgriFarm.apk');
    const fileStream = fs.createReadStream(apkPath);

    await new Promise((resolve, reject) => {
      fileStream
        .pipe(uploadStream)
        .on('finish', () => {
          console.log('✅ APK uploaded successfully to MongoDB!');
          resolve(null);
        })
        .on('error', reject);
    });

    // Verify upload
    const uploadedFile = await db.collection('fs.files').findOne({ filename: 'AgriFarm.apk' });
    console.log(`✨ File ID: ${uploadedFile?._id}`);
    console.log(`📥 Download available at: /api/apk`);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('❌ Error:', message);
    process.exit(1);
  } finally {
    await client.close();
  }
}

uploadAPK();
