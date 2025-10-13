# Fix OAuth Redirect Issue - Loading Forever After Google Login

## The Problem
You can sign in with Google, but after clicking "Continue" it just keeps loading and never redirects back to your app.

## The Solution - Follow These Steps EXACTLY

### Step 1: Check Supabase Redirect URLs (MOST IMPORTANT)

1. Go to https://supabase.com/dashboard
2. Select your project: **sfhkchooqiqyzrwkvziz**
3. Navigate to **Authentication** → **URL Configuration**
4. Look at the **Redirect URLs** section
5. **You MUST have these EXACT URLs** (click "Add redirect URL" for each):

   ```
   prajolsapp://auth/callback
   exp://127.0.0.1:8081/--/auth/callback
   exp://localhost:19000/--/auth/callback
   http://localhost:19006/auth/callback
   ```

6. **Click SAVE** (this is critical!)

### Step 2: Verify Google Provider Setup

While in Supabase Dashboard:

1. Go to **Authentication** → **Providers**
2. Find **Google** in the list
3. Make sure it's **ON** (green toggle)
4. Verify:
   - ✅ **Client ID** is filled
   - ✅ **Client Secret** is filled
5. Click **Save**

### Step 3: Check Google Cloud Console

1. Go to https://console.cloud.google.com/
2. Select your project
3. Navigate to **APIs & Services** → **Credentials**
4. Click on your **Web Client** (the one you're using for Supabase)
5. Under **Authorized redirect URIs**, you MUST have:
   ```
   https://sfhkchooqiqyzrwkvziz.supabase.co/auth/v1/callback
   ```
6. Click **Save**

### Step 4: If Using Expo Go (Development)

If you're testing with Expo Go app, you need to use the `exp://` scheme:

1. Check your Metro bundler output
2. Look for a line like: `exp://192.168.x.x:19000` or `exp://localhost:19000`
3. Make sure that URL + `/--/auth/callback` is in Supabase redirect URLs

Example:
```
exp://192.168.1.100:19000/--/auth/callback
```

### Step 5: Restart Everything

After making these changes:

1. **Stop Metro bundler** (Ctrl+C)
2. **Restart with**:
   ```bash
   npx expo start -c
   ```
3. **Reload your app** (shake device → Reload)
4. **Try Google sign-in again**

---

## Why This Happens

The OAuth flow works like this:

1. Your app → Opens browser with Google OAuth URL ✅
2. User signs in with Google ✅
3. Google → Redirects to Supabase with auth code ✅
4. Supabase → Processes auth code and tries to redirect to your app ❌ **THIS IS WHERE IT FAILS**
5. Your app should receive the deep link with tokens

**Step 4 fails because** Supabase sees the redirect URL (`prajolsapp://auth/callback`) and checks if it's in the whitelist. If it's NOT whitelisted, Supabase doesn't redirect - it just shows a blank page or keeps loading.

---

## Quick Test

After adding the redirect URLs in Supabase, test if deep linking works:

### On Android with Expo Go:
```bash
adb shell am start -W -a android.intent.action.VIEW -d "prajolsapp://auth/callback?test=1"
```

This should open your app. If it doesn't, the deep link scheme isn't working.

---

## Still Not Working?

If you've done all the above and it still doesn't work:

1. **Share your console logs** when you click "Continue with Google"
2. **Check Supabase Logs**:
   - Dashboard → Project → Logs → Select "Auth"
   - Look for errors during the OAuth attempt
3. **Make sure you're using the same Google account** that's added as a test user (if your app is in testing mode)

---

## Alternative: Use Different Redirect for Expo Go

If you're using Expo Go for testing, try this approach:

In your code, detect if you're in Expo Go and use a different redirect URL:

```typescript
import Constants from 'expo-constants';

// In your OAuth call
const redirectUrl = Constants.appOwnership === 'expo' 
  ? Linking.createURL('/auth/callback')  // For Expo Go
  : 'prajolsapp://auth/callback';        // For standalone app
```

But the easiest fix is to **just add all the redirect URLs to Supabase** as shown in Step 1.
