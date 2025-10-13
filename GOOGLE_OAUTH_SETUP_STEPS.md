# Google OAuth Setup - Quick Steps

## 🔧 What Was Fixed

The Google Sign-In implementation has been updated to properly handle OAuth callbacks in React Native:

1. ✅ Supabase client now detects session in URL (`detectSessionInUrl: true`)
2. ✅ OAuth flow properly opens browser with `Linking.openURL()`
3. ✅ Deep link listener added to handle OAuth callbacks (`prajolsapp://auth/callback`)
4. ✅ Tokens are extracted from callback URL and session is created

## 🚀 Setup Required in Supabase Dashboard

### Step 1: Enable Google Provider

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: **sfhkchooqiqyzrwkvziz**
3. Navigate to **Authentication** → **Providers**
4. Find **Google** and toggle it ON
5. Enter your Google OAuth credentials:
   - **Client ID**: `516581419359-vtgkrea0fh5beg2m5b108efk4s9b6bhs.apps.googleusercontent.com`
   - **Client Secret**: (Get this from [Google Cloud Console](https://console.cloud.google.com/))

### Step 2: Configure Redirect URLs

1. In Supabase Dashboard, go to **Authentication** → **URL Configuration**
2. Add these URLs to **Redirect URLs**:
   ```
   prajolsapp://auth/callback
   exp://localhost:19000/--/auth/callback
   http://localhost:19006/auth/callback
   ```

### Step 3: Configure Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Credentials**
3. Select your OAuth 2.0 Client ID (Web application)
4. Add to **Authorized redirect URIs**:
   ```
   https://sfhkchooqiqyzrwkvziz.supabase.co/auth/v1/callback
   ```
5. Click **Save**

## ✅ Testing the Flow

### Start the App:
```bash
npm start
```

### Expected Flow:
1. Tap "Continue with Google" button
2. Browser/Chrome Custom Tab opens
3. Sign in with Google account
4. Browser redirects back to app
5. App receives deep link: `prajolsapp://auth/callback#access_token=...`
6. Session is created and user is logged in ✅

## 🔍 Debugging

### Check Console Logs:
- Look for: `🔐 Starting Google OAuth sign-in...`
- Look for: `✅ Google OAuth URL generated:`
- Look for: `🔗 Deep link received:`
- Look for: `✅ OAuth session created successfully`

### Common Issues:

**Issue: "Provider not enabled"**
- ✅ Enable Google provider in Supabase Dashboard
- ✅ Add Client ID and Secret

**Issue: "Invalid redirect URL"**
- ✅ Add `prajolsapp://auth/callback` to Supabase Redirect URLs
- ✅ Add Supabase callback URL to Google Cloud Console

**Issue: Browser opens but doesn't redirect back**
- ✅ Check deep link scheme in `app.json`: `"scheme": "prajolsapp"`
- ✅ Restart the app after changing configuration
- ✅ Clear Metro cache: `npx expo start -c`

**Issue: "No tokens found in callback URL"**
- ✅ Check browser console for errors
- ✅ Verify Google OAuth credentials in Supabase
- ✅ Check Supabase logs: Authentication → Logs

## 🔐 How It Works

```
User taps button
    ↓
googleSignInWithOAuth() called
    ↓
Supabase generates OAuth URL
    ↓
Browser opens with Google login
    ↓
User signs in with Google
    ↓
Google redirects to: https://sfhkchooqiqyzrwkvziz.supabase.co/auth/v1/callback
    ↓
Supabase processes auth and redirects to: prajolsapp://auth/callback#access_token=...
    ↓
Deep link listener catches the URL
    ↓
Tokens extracted and session created
    ↓
onAuthStateChanged fires
    ↓
User is logged in! 🎉
```

## 📱 Testing on Different Platforms

### Android:
- Works with Expo Go
- Works with development build
- Opens Chrome Custom Tab for OAuth

### iOS:
- Works with Expo Go
- Works with development build
- Opens Safari View Controller for OAuth

### Web:
- Opens in same window
- Redirects back automatically

## 🔒 Security Notes

- OAuth tokens are exchanged server-side by Supabase
- Google credentials never touch your app
- Tokens are stored securely in AsyncStorage
- Session auto-refreshes when needed

## 📚 Resources

- [Supabase OAuth Docs](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [Google OAuth Setup](https://support.google.com/cloud/answer/6158849)
- [React Native Linking](https://reactnative.dev/docs/linking)
