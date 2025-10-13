# How to Get Google Client Secret

## The Error You're Seeing

```json
{"code":400,"error_code":"validation_failed","msg":"Unsupported provider: missing OAuth secret"}
```

This means Google provider is NOT properly configured in Supabase Dashboard.

## 🔧 Fix: Add Client Secret to Supabase

### Step 1: Get Client Secret from Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Credentials**
3. Find your OAuth 2.0 Client ID (the one with Client ID: `516581419359-vtgkrea0fh5beg2m5b108efk4s9b6bhs.apps.googleusercontent.com`)
4. Click on it to view details
5. You'll see:
   - **Client ID**: `516581419359-vtgkrea0fh5beg2m5b108efk4s9b6bhs.apps.googleusercontent.com`
   - **Client Secret**: `GOCSPX-xxxxxxxxxxxxxxxxxx` (something like this)
6. **Copy the Client Secret** (click the copy icon)

### Step 2: Add to Supabase Dashboard

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: **sfhkchooqiqyzrwkvziz**
3. Navigate to **Authentication** → **Providers**
4. Scroll down to find **Google**
5. Click to expand Google settings
6. Toggle **Enable Sign in with Google** to ON
7. Fill in:
   - **Client ID (for OAuth)**: `516581419359-vtgkrea0fh5beg2m5b108efk4s9b6bhs.apps.googleusercontent.com`
   - **Client Secret (for OAuth)**: Paste the secret you copied
8. Click **Save**

### Step 3: Add Redirect URLs

While you're in Supabase Dashboard:

1. Go to **Authentication** → **URL Configuration**
2. Find **Redirect URLs** section
3. Add these URLs (one per line):
   ```
   prajolsapp://auth/callback
   exp://localhost:19000/--/auth/callback
   http://localhost:19006/auth/callback
   ```
4. Click **Save**

### Step 4: Verify Google Cloud Console Redirect URIs

1. Back in Google Cloud Console → **Credentials**
2. Edit your OAuth 2.0 Client ID
3. In **Authorized redirect URIs**, make sure you have:
   ```
   https://sfhkchooqiqyzrwkvziz.supabase.co/auth/v1/callback
   ```
4. Click **Save**

## ✅ Test Again

After completing the setup:

1. Restart your app:
   ```bash
   npm start
   # or
   npx expo start -c  # Clear cache if needed
   ```

2. Tap "Continue with Google"
3. You should now successfully sign in!

## 🔍 How to Verify Setup

### In Supabase Dashboard:
- Go to **Authentication** → **Providers**
- Google should show as **Enabled** with a green checkmark
- You should see your Client ID displayed

### Expected Console Logs:
```
🔐 Starting Google OAuth sign-in...
✅ Google OAuth URL generated: https://...
✅ Browser opened for OAuth
🔗 Deep link received: prajolsapp://auth/callback#access_token=...
✅ Tokens extracted from URL
✅ OAuth session created successfully
🔔 User authenticated: user@gmail.com
```

## ❌ If You Don't Have Client Secret

If you can't find the Client Secret or it was never created:

### Create a NEW OAuth 2.0 Client ID

1. Google Cloud Console → **APIs & Services** → **Credentials**
2. Click **+ CREATE CREDENTIALS** → **OAuth 2.0 Client ID**
3. Select **Web application**
4. Name: "Supabase Auth"
5. **Authorized redirect URIs**:
   ```
   https://sfhkchooqiqyzrwkvziz.supabase.co/auth/v1/callback
   ```
6. Click **Create**
7. A popup will show your:
   - **Client ID**: (copy this)
   - **Client Secret**: (copy this)
8. Use BOTH in Supabase Dashboard

## 📝 Summary

The error means:
- ❌ Google provider is NOT configured in Supabase
- ❌ Client Secret is missing

After adding Client Secret:
- ✅ Google OAuth will work
- ✅ Users can sign in with Google
- ✅ Session will be created successfully
