# Custom Development Client Setup

## Why Custom Dev Client?

The Google Sign-In native module (`@react-native-google-signin/google-signin`) requires native code that is **not available in Expo Go**. You must use a **custom development client** to use this feature.

## ✅ Setup Complete

The following has been configured:
- ✅ `expo-dev-client` installed
- ✅ `expo-dev-client` plugin added to `app.json`
- ✅ Google Sign-In plugin configured in `app.json`

## 🚀 Build & Run Your Custom Dev Client

### Option 1: Local Development Build (Recommended for Testing)

This builds the app locally on your machine:

```bash
# For Android
npx expo run:android
```

This command will:
1. Build a development version of your app with native code
2. Install it on your connected device/emulator
3. Start the Metro bundler

**Requirements:**
- Android Studio installed
- Android SDK configured
- Physical device or emulator connected

### Option 2: EAS Build (For Team Sharing)

Build in the cloud using Expo Application Services:

```bash
# Login to EAS (if not already logged in)
npx eas login

# Build for Android development
npx eas build --profile development --platform android
```

After the build completes:
1. Download and install the `.apk` on your Android device
2. Start the dev server: `npx expo start --dev-client`
3. Open the app and connect to the dev server

## 📱 Running Your App

### After Building with `expo run:android`:
Just run:
```bash
npm start
# or
npx expo start
```

### After Building with EAS:
```bash
npx expo start --dev-client
```

## 🔍 Verify It's Working

When you run your app, you should see:
- ✅ "🚀 Supabase initialized" log
- ✅ NO error about "RN GoogleSignin native module not correctly linked"

## 📋 Common Commands

| Command | Description |
|---------|-------------|
| `npm start` | Start Metro bundler (after dev build) |
| `npx expo run:android` | Build and run dev client locally |
| `npx eas build --profile development --platform android` | Build dev client in cloud |
| `npx expo start --dev-client` | Start for EAS dev client |

## ⚠️ Important Notes

1. **Don't use Expo Go** - It won't work with Google Sign-In
2. **First build takes time** - Initial build can take 10-15 minutes
3. **Subsequent changes** - Most JS changes hot reload; native changes need rebuild
4. **Google Web Client ID** - Already configured in `app.json` extra section

## 🔧 Troubleshooting

### Build fails with Gradle errors
- Make sure Android SDK is properly installed
- Check `ANDROID_HOME` environment variable
- Ensure Gradle can download dependencies

### Can't connect to dev server
- Make sure device and computer are on the same network
- Check firewall settings
- Try using tunnel: `npx expo start --tunnel`

### Google Sign-In still not working
- Verify SHA-1 certificate is added in Google Cloud Console
- Check Google Web Client ID in `app.json`
- Ensure Android package name matches in Google Console

## 📚 Next Steps

1. Build your custom dev client using one of the options above
2. Test Google Sign-In functionality
3. Continue developing with hot reload support

## 🔗 Resources

- [Expo Dev Client Docs](https://docs.expo.dev/develop/development-builds/introduction/)
- [Google Sign-In Setup](./GOOGLE_SIGNIN_SETUP.md)
- [EAS Build Guide](https://docs.expo.dev/build/introduction/)
