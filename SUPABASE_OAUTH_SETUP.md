# Supabase OAuth Google Sign-In Setup

## ✅ What Changed

Your app now uses **Supabase OAuth** for Google Sign-In instead of the native module. This means:

- ✅ **Works with Expo Go** - No custom dev client needed!
- ✅ **No native dependencies** - Simpler setup
- ✅ **Web-based flow** - Opens browser for authentication
- ✅ **Automatic session management** - Supabase handles everything

## 📋 Changes Made

1. ✅ Removed `@react-native-google-signin/google-signin` package
2. ✅ Removed `expo-dev-client` package
3. ✅ Updated `app.json` - removed native plugins
4. ✅ Added deep link scheme: `prajolsapp://`
5. ✅ Implemented `googleSignInWithOAuth()` method
6. ✅ Updated auth slice to use OAuth flow

## 🚀 How It Works

### User Flow:
1. User taps "Sign in with Google" button
2. App opens browser/web view
3. User signs in with Google account
4. Browser redirects back to app: `prajolsapp://auth/callback`
5. Supabase automatically creates session
6. User is logged in!

### Code Flow:
```typescript
// In LoginScreen.tsx - already implemented
const handleGoogleSignIn = async () => {
  try {
    await dispatch(googleSignIn()).unwrap();
    // Session handled automatically by Supabase
  } catch (err) {
    Alert.alert('Google Sign-In Failed', err);
  }
};
```

## 🔧 Supabase Dashboard Setup Required

### **IMPORTANT:** Configure OAuth in Supabase

You need to configure the redirect URL in your Supabase project:

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **Authentication** → **URL Configuration**
4. Add to **Redirect URLs**:
   ```
   prajolsapp://auth/callback
   ```
5. If testing on web, also add:
   ```
   http://localhost:19006/auth/callback
   exp://localhost:19000/auth/callback
   ```

### Enable Google OAuth Provider

1. In Supabase Dashboard, go to **Authentication** → **Providers**
2. Enable **Google** provider
3. Enter your **Google Client ID** and **Client Secret**
   - Get these from [Google Cloud Console](https://console.cloud.google.com/)
   - Same credentials you're already using
4. Save changes

### Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Navigate to **APIs & Services** → **Credentials**
4. Edit your OAuth 2.0 Client ID
5. Add to **Authorized redirect URIs**:
   ```
   https://YOUR_SUPABASE_PROJECT_REF.supabase.co/auth/v1/callback
   ```
   Replace `YOUR_SUPABASE_PROJECT_REF` with your actual project ref (found in Supabase project settings)

## ✅ Testing

### Run with Expo Go:
```bash
npm start
```

Then:
1. Scan QR code with Expo Go app
2. Tap "Sign in with Google"
3. Browser opens for Google authentication
4. After sign-in, redirects back to app
5. You're logged in! 🎉

### Run on Development Build (if you already have one):
```bash
npx expo start
```

## 🔍 Troubleshooting

### "Invalid redirect URL" error
- ✅ Check that `prajolsapp://auth/callback` is added in Supabase Dashboard
- ✅ Ensure the URL scheme matches in `app.json` (`"scheme": "prajolsapp"`)

### OAuth doesn't redirect back to app
- ✅ Verify deep link scheme is configured in `app.json`
- ✅ Check that Google Cloud Console has the correct Supabase callback URL
- ✅ Make sure you're using the same device for both authentication and testing

### "Provider not enabled" error
- ✅ Enable Google provider in Supabase Dashboard
- ✅ Add valid Google Client ID and Secret

### Still getting native module error?
- ✅ Clear Metro cache: `npx expo start -c`
- ✅ Restart Expo Go app
- ✅ Make sure packages are uninstalled: check `package.json`

## 📱 Deep Linking

The app uses the custom scheme `prajolsapp://` for OAuth callbacks.

### How it works:
- When OAuth completes, Google redirects to: `https://your-project.supabase.co/auth/v1/callback`
- Supabase processes the auth and redirects to: `prajolsapp://auth/callback`
- Your app receives the deep link and Supabase automatically handles the session

### Testing deep links manually:
```bash
# Android
npx uri-scheme open prajolsapp://auth/callback --android

# iOS
npx uri-scheme open prajolsapp://auth/callback --ios
```

## 🎨 User Experience

The OAuth flow provides a native-like experience:
- Opens in system browser (more secure)
- Users see familiar Google sign-in
- Auto-fills saved credentials
- Single tap sign-in if already logged into Google

## 📊 Session Management

Supabase automatically:
- ✅ Creates session after successful OAuth
- ✅ Stores tokens securely
- ✅ Refreshes tokens when needed
- ✅ Triggers `onAuthStateChange` listeners
- ✅ Syncs user data to your database

The auth state observer in your app automatically updates the Redux store when the session is created.

## 🔐 Security Benefits

OAuth flow is more secure than native:
- ✅ No ID tokens stored in app
- ✅ Google credentials never touch your app
- ✅ Supabase handles token exchange
- ✅ Automatic session management
- ✅ Built-in PKCE protection

## 📚 Resources

- [Supabase OAuth Docs](https://supabase.com/docs/guides/auth/social-login)
- [Google OAuth Setup](https://support.google.com/cloud/answer/6158849)
- [Expo Deep Linking](https://docs.expo.dev/guides/linking/)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)

## 🎉 Summary

You can now use Google Sign-In with **Expo Go** without needing a custom development client! The OAuth flow provides a secure, seamless experience for your users.

**Next Steps:**
1. Configure redirect URLs in Supabase Dashboard
2. Enable Google provider in Supabase
3. Test the flow with `npm start`
4. Enjoy simplified development! 🚀
