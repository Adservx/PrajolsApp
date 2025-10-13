# OAuth Blank Screen Troubleshooting Guide

## Issue: Blank/Black Screen When Opening Google OAuth

If you see a blank or black screen when clicking "Continue with Google", follow these steps:

---

## Step 1: Verify Supabase Configuration

### Check Redirect URLs
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: **sfhkchooqiqyzrwkvziz**
3. Navigate to **Authentication** → **URL Configuration**
4. Under **Redirect URLs**, ensure these are added:
   ```
   prajolsapp://auth/callback
   exp://localhost:19000/--/auth/callback
   http://localhost:19006/auth/callback
   ```
5. Click **Save**

### Enable Google Provider
1. In Supabase Dashboard, go to **Authentication** → **Providers**
2. Find **Google** in the list
3. Toggle it **ON** (should be green)
4. Ensure you have entered:
   - **Client ID**: Your Google OAuth Client ID
   - **Client Secret**: Your Google OAuth Client Secret
5. Click **Save**

---

## Step 2: Verify Google Cloud Console Setup

### Check OAuth 2.0 Client
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Credentials**
3. Find your **Web Client** (not Android or iOS client)
4. Click to edit it
5. Under **Authorized redirect URIs**, ensure you have:
   ```
   https://sfhkchooqiqyzrwkvziz.supabase.co/auth/v1/callback
   ```
6. Click **Save**

---

## Step 3: Check Console Logs

When you click "Continue with Google", check the Metro bundler console for these logs:

### Expected Success Flow:
```
🔐 Starting Google OAuth sign-in...
✅ Google OAuth URL generated
🌐 Opening browser...
🔍 WebBrowser result type: success
✅ OAuth completed successfully
🔗 Callback URL received
✅ Tokens extracted successfully
🔐 Setting session in Supabase...
✅ Session created successfully
👤 User: your-email@gmail.com
```

### If You See Error Logs:
Look for specific error messages that indicate:
- `❌ OAuth URL generation error` - Problem with Supabase configuration
- `❌ Tokens not found` - Problem with redirect or Google setup
- `❌ Session error` - Problem with Supabase authentication

---

## Step 4: Common Issues & Solutions

### Issue: Browser opens but shows blank screen

**Possible Causes:**
1. **Google Provider not enabled in Supabase**
   - Solution: Enable it in Authentication → Providers

2. **Client ID/Secret missing or incorrect**
   - Solution: Verify in Supabase Dashboard under Google provider
   - Get correct values from Google Cloud Console

3. **Redirect URI mismatch**
   - Solution: Ensure `https://[your-project].supabase.co/auth/v1/callback` is in Google Cloud Console

4. **Network/CORS issues**
   - Solution: Check your internet connection
   - Try restarting the app

### Issue: Browser opens then immediately closes

**Solution:** This is actually normal behavior if there's an error. Check console logs for specific error message.

### Issue: Browser opens, Google login works, but doesn't redirect back

**Possible Causes:**
1. **Deep linking not configured**
   - Solution: Verify `"scheme": "prajolsapp"` in `app.json`

2. **Redirect URL not whitelisted**
   - Solution: Add `prajolsapp://auth/callback` to Supabase

---

## Step 5: Test with These Debug Steps

1. **Restart Metro bundler**
   ```bash
   npx expo start -c
   ```

2. **Clear app data**
   - On Android: Settings → Apps → Expo Go → Storage → Clear Data
   - Then reload your app

3. **Test the deep link manually**
   ```bash
   # Android
   adb shell am start -W -a android.intent.action.VIEW -d "prajolsapp://auth/callback"
   
   # This should open your app
   ```

4. **Check if URL opens in browser manually**
   - Copy the OAuth URL from console logs (starts with `https://sfhkchooqiqyzrwkvziz.supabase.co/auth/v1/authorize...`)
   - Open it in your phone's browser manually
   - It should show Google login page, not blank screen

---

## Step 6: Verify Your Setup Checklist

- [ ] Google Provider is **enabled** in Supabase (green toggle)
- [ ] Client ID is filled in Supabase Google provider settings
- [ ] Client Secret is filled in Supabase Google provider settings
- [ ] `https://sfhkchooqiqyzrwkvziz.supabase.co/auth/v1/callback` is in Google Cloud Console redirect URIs
- [ ] `prajolsapp://auth/callback` is in Supabase redirect URLs
- [ ] App has `"scheme": "prajolsapp"` in app.json
- [ ] Metro bundler has been restarted
- [ ] No error logs in console

---

## Still Not Working?

If the blank screen persists:

1. **Share your console logs** - Copy the entire output when you click "Continue with Google"
2. **Check Supabase Auth Logs**:
   - Go to Supabase Dashboard
   - Navigate to **Authentication** → **Logs**
   - Look for any errors during OAuth attempts
3. **Verify Google Cloud Console Project**:
   - Ensure the OAuth consent screen is configured
   - Ensure your app is not in testing mode (or you're added as a test user)

---

## Quick Fix to Try Now

**Restart everything in this order:**

1. Stop Metro bundler (Ctrl+C)
2. Clear Metro cache: `npx expo start -c`
3. When prompted, press 'a' for Android or 'i' for iOS
4. Wait for app to fully load
5. Try "Continue with Google" again
6. Watch console for detailed logs

The updated code now has extensive logging - share the console output if it still doesn't work!
