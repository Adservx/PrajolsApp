# Production Deployment Guide - Google OAuth

Your Google OAuth is now working in development! Here's how to prepare it for production.

---

## ✅ Current Status

- ✅ Google OAuth working in Expo Go (development)
- ✅ Code automatically detects development vs production
- ✅ Deep linking configured

---

## 🚀 Step 1: Configure Supabase for Production

### Add Production Redirect URLs

1. Go to https://supabase.com/dashboard/project/sfhkchooqiqyzrwkvziz/auth/url-configuration

2. Under **Redirect URLs**, ensure you have BOTH development and production URLs:

   **Development (Expo Go):**
   ```
   exp://192.168.100.4:8081/--/auth/callback
   exp://localhost:8081/--/auth/callback
   exp://127.0.0.1:8081/--/auth/callback
   ```

   **Production (Standalone App):**
   ```
   prajolsapp://auth/callback
   ```

3. Set **Site URL** to your production URL:
   ```
   prajolsapp://
   ```
   Or if you have a web version:
   ```
   https://your-domain.com
   ```

4. **Click SAVE**

---

## 🔧 Step 2: Update Google Cloud Console for Production

### Configure Android OAuth Client

1. Go to https://console.cloud.google.com/apis/credentials
2. You'll need to create an **Android OAuth client** (separate from the Web client)

#### Create Android OAuth Client:

1. Click **"Create Credentials"** → **"OAuth 2.0 Client ID"**
2. Select **Android**
3. **Name**: `Prajols App - Android`
4. **Package name**: `com.prajols.sms` (from your app.json)
5. **SHA-1 certificate fingerprint**: 
   
   **For Development (Expo):**
   ```bash
   # Get Expo's debug keystore SHA-1
   keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
   ```
   
   **For Production (EAS Build):**
   ```bash
   # After creating your production keystore
   keytool -list -v -keystore your-production-keystore.jks
   ```

6. Click **Create**

#### Update Web OAuth Client:

1. Click on your existing **Web Client**
2. Under **Authorized redirect URIs**, ensure you have:
   ```
   https://sfhkchooqiqyzrwkvziz.supabase.co/auth/v1/callback
   ```
3. Click **Save**

---

## 📱 Step 3: Build for Production with EAS

### Install EAS CLI (if not already):

```bash
npm install -g eas-cli
```

### Login to EAS:

```bash
eas login
```

### Configure EAS Build:

1. Create `eas.json` (if it doesn't exist):

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "apk"
      }
    }
  },
  "submit": {
    "production": {}
  }
}
```

### Build Android APK:

```bash
# For internal testing
eas build --platform android --profile preview

# For production
eas build --platform android --profile production
```

This will:
- Build your standalone Android app
- Use the `prajolsapp://` scheme (not `exp://`)
- Include all necessary native modules

---

## 🧪 Step 4: Test the Production Build

### After Build Completes:

1. Download the APK from EAS
2. Install it on your Android device
3. Open the app
4. Click **"Continue with Google"**
5. It should:
   - Open browser ✅
   - Sign in with Google ✅
   - Redirect to `prajolsapp://auth/callback` ✅
   - Log you into the app ✅

### If It Doesn't Work:

Check these:
1. **Supabase Redirect URLs** includes `prajolsapp://auth/callback`
2. **Google Cloud Console** has correct SHA-1 fingerprint
3. **Package name** in Google Console matches `com.prajols.sms`
4. Check device logs: `adb logcat *:E`

---

## 🔐 Step 5: Security - Remove Development Logs (Optional)

For production, you may want to reduce logging:

### Create Environment-Based Logging:

```typescript
// src/utils/logger.ts
const isDev = __DEV__;

export const logger = {
  log: (...args: any[]) => {
    if (isDev) console.log(...args);
  },
  error: (...args: any[]) => {
    console.error(...args); // Always log errors
  },
  warn: (...args: any[]) => {
    if (isDev) console.warn(...args);
  }
};
```

Then replace `console.log` with `logger.log` in production-sensitive files.

**However**, for now, keeping logs is fine for easier debugging.

---

## 📋 Step 6: Verify App Configuration

### Check `app.json`:

Your current configuration:
```json
{
  "expo": {
    "scheme": "prajolsapp",  // ✅ Correct
    "android": {
      "package": "com.prajols.sms",  // ✅ Correct
      "intentFilters": [  // ✅ Correct
        {
          "action": "VIEW",
          "data": [
            {
              "scheme": "prajolsapp",
              "host": "auth"
            }
          ],
          "category": ["BROWSABLE", "DEFAULT"]
        }
      ]
    }
  }
}
```

This looks good! ✅

---

## 🎯 Step 7: Update Google Cloud Console - OAuth Consent Screen

If your app is in **Testing mode**:

1. Go to **OAuth consent screen**
2. Either:
   - Add all test users who need access, OR
   - Click **"Publish App"** to make it public (requires verification for sensitive scopes)

For basic Google Sign-In, you can publish without verification.

---

## 📝 Step 8: Final Checklist Before Production

- [ ] **Supabase Redirect URLs** includes `prajolsapp://auth/callback`
- [ ] **Google Web Client** has Supabase callback URL
- [ ] **Google Android Client** created with correct package name and SHA-1
- [ ] **OAuth Consent Screen** published or test users added
- [ ] **EAS Build** completed successfully
- [ ] **APK tested** on real device
- [ ] **Environment variables** secured (SUPABASE_URL, ANON_KEY, etc.)
- [ ] **Error handling** tested (no internet, cancelled sign-in, etc.)

---

## 🚢 Optional: Deploy to Google Play Store

### Prepare for Play Store:

1. **Create a production keystore** (EAS can do this for you)
2. **Build for production**: `eas build --platform android --profile production`
3. **Generate App Bundle** instead of APK:
   
   Update `eas.json`:
   ```json
   {
     "build": {
       "production": {
         "android": {
           "buildType": "app-bundle"  // Changed from "apk"
         }
       }
     }
   }
   ```

4. **Submit to Play Store**: `eas submit --platform android`

---

## 🔄 Development vs Production Differences

| Feature | Development (Expo Go) | Production (Standalone) |
|---------|----------------------|------------------------|
| **Redirect URL** | `exp://IP:PORT/--/auth/callback` | `prajolsapp://auth/callback` |
| **Deep Linking** | Uses Expo's dev URL | Uses custom scheme |
| **Google OAuth** | Works with Web Client | Needs Android Client |
| **Testing** | Instant reload | Need to rebuild APK |

The code you have now **automatically handles both** environments!

---

## 🎉 You're Production Ready!

Your OAuth implementation is now production-ready with:
- ✅ **Development support** (Expo Go with exp:// URLs)
- ✅ **Production support** (Standalone app with custom scheme)
- ✅ **Automatic environment detection**
- ✅ **Proper error handling and logging**
- ✅ **Deep linking configuration**

---

## 🆘 Troubleshooting Production Issues

### Issue: "Sign-in works in Expo Go but not in production APK"

**Solution:**
1. Verify Google Android OAuth client is created
2. Check SHA-1 fingerprint matches your build keystore
3. Verify package name is exactly `com.prajols.sms`
4. Ensure `prajolsapp://auth/callback` is in Supabase

### Issue: "Invalid redirect URL" in production

**Solution:**
- Add `prajolsapp://auth/callback` to Supabase Redirect URLs
- Verify the URL exactly matches (no typos, no trailing slashes)

### Issue: "Browser doesn't redirect back to app"

**Solution:**
1. Check `intentFilters` in `app.json`
2. Test deep link manually:
   ```bash
   adb shell am start -W -a android.intent.action.VIEW -d "prajolsapp://auth/callback"
   ```
3. Ensure Android system recognizes your app's URL scheme

---

## 📚 Next Steps

1. **Build and test** the production APK
2. **Add error analytics** (e.g., Sentry) to track OAuth issues in production
3. **Implement rate limiting** on your backend if needed
4. **Add social login buttons** for other providers (Facebook, Apple, etc.)
5. **Set up CI/CD** for automated builds

**You're all set!** 🚀
