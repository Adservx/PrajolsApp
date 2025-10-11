# Quick Start Guide

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Login to Expo

You'll need an Expo account (free). Create one at https://expo.dev if needed.

```bash
npm run eas:login
```

Or use npx directly:
```bash
npx eas-cli login
```

## Step 3: Run Development Server

```bash
npm start
```

This will start the Expo development server. You can:
- Press `a` to open on Android emulator
- Scan the QR code with Expo Go app on your Android device

## Step 4: Build APK with EAS (Optional)

To create a standalone APK:

```bash
npm run eas:build:preview
```

Or use npx directly:
```bash
npx eas-cli build --platform android --profile preview
```

This will:
1. Upload your code to EAS servers
2. Build the APK in the cloud
3. Provide a download link when complete

### Build Profiles

- **development**: For development builds with debugging
- **preview**: For internal testing (APK)
- **production**: For production release

## Troubleshooting

### npm issues
If you encounter npm errors, try fixing npm configuration:
```bash
npm config set prefix "C:\\Users\\YOUR_USERNAME\\AppData\\Roaming\\npm"
```

### First time EAS build
On your first build, EAS will ask you to:
1. Create a new project or link to existing
2. Generate Android keystore (for signing APK)

Just follow the interactive prompts - it's automated!

## Next Steps

1. Modify `App.js` to customize your app
2. Update `app.json` with your app name and identifiers
3. Replace placeholder assets in `assets/` folder
4. Build and test!
