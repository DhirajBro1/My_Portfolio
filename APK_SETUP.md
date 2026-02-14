# AgriFarm APK Download Setup

Your portfolio now supports downloading the AgriFarm APK app directly from the website!

## How It Works

1. **Backend**: MongoDB GridFS stores the APK file (supports files >16MB)
2. **API**: `/api/apk` endpoint handles upload and download
3. **Frontend**: AgriFarm project card has a green "Download APK" button

## Setup Steps

### 1. Upload APK to MongoDB (One-time)

Run this command to upload your APK to MongoDB:

```bash
node scripts/upload-apk.js
```

This will:
- Read `public/AgriFarm.apk`
- Upload it to MongoDB GridFS
- Make it available for download via `/api/apk`

### 2. Test the Download

Once deployed, users can:
- Visit your portfolio
- Go to "Featured Projects" section
- Click the green "Download APK" button on the AgriFarm project
- The APK will download automatically

## How Visitors Download the App

1. Navigate to your portfolio
2. Scroll to the "Featured Projects" section
3. Find the **AgriFarm App** card (first project)
4. Click **"Download APK"** button
5. The app downloads directly to their device

## File Locations

- **APK File**: `public/AgriFarm.apk` (105 MB)
- **API Endpoint**: `app/api/apk/route.ts`
- **Project Card**: `app/components/ProjectsSection.tsx`
- **Upload Script**: `scripts/upload-apk.js`

## Tips

- The APK is served from MongoDB, not from the public folder
- The download is direct binary streaming (fast and efficient)
- Works on all devices and browsers
- File is stored only once in MongoDB, saving space

## Troubleshooting

If the download doesn't work:

1. Check if MongoDB connection is active
2. Run `node scripts/upload-apk.js` again
3. Verify the APK file exists in `public/AgriFarm.apk`
4. Check the console for error messages

---

**Ready to deploy?** Your portfolio is now a full-featured app distributor! 🚀
