# Create Google Web OAuth Client (with Secret)

## Why You Can't See Client Secret

**Client Secrets are ONLY available for "Web application" OAuth clients.**

- ❌ Android OAuth clients → No secret
- ❌ iOS OAuth clients → No secret  
- ✅ Web application → Has secret (this is what Supabase needs!)

## 🔧 Create a New Web OAuth Client

### Step 1: Go to Google Cloud Console

1. Open [Google Cloud Console](https://console.cloud.google.com/)
2. Make sure you're in the correct project
3. Navigate to **APIs & Services** → **Credentials**

### Step 2: Create Web Application Credentials

1. Click **+ CREATE CREDENTIALS** button (top of page)
2. Select **OAuth 2.0 Client ID**
3. If prompted about OAuth consent screen:
   - Click **CONFIGURE CONSENT SCREEN**
   - Select **External** → **CREATE**
   - Fill in required fields (App name, User support email, Developer email)
   - Click **SAVE AND CONTINUE** through all steps
   - Return to **Credentials** page

### Step 3: Configure Web Client

1. **Application type**: Select **Web application**
2. **Name**: Enter something like "Supabase Auth Web Client"
3. **Authorized JavaScript origins** (optional): Leave empty or add:
   ```
   https://sfhkchooqiqyzrwkvziz.supabase.co
   ```
4. **Authorized redirect URIs**: Click **+ ADD URI** and add:
   ```
   https://sfhkchooqiqyzrwkvziz.supabase.co/auth/v1/callback
   ```
5. Click **CREATE**

### Step 4: Copy Your Credentials

A popup will appear with:
```
Client ID
516581419359-xxxxxxxxxxxxxxxxx.apps.googleusercontent.com

Client Secret
GOCSPX-xxxxxxxxxxxxxxxxxxxxx
```

**IMPORTANT**: 
- Copy BOTH the Client ID and Client Secret
- Save them somewhere safe (you'll need them now)
- You can always view them later by clicking on the credential

### Step 5: Add to Supabase

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. **Authentication** → **Providers** → **Google**
4. Toggle **Enable Sign in with Google** to ON
5. Enter:
   - **Client ID (for OAuth)**: (paste the Web Client ID you just created)
   - **Client Secret (for OAuth)**: (paste the Web Client Secret)
6. Click **Save**

### Step 6: Add Redirect URL in Supabase

1. Still in Supabase Dashboard
2. **Authentication** → **URL Configuration**
3. Find **Redirect URLs** section
4. Add (one per line):
   ```
   prajolsapp://auth/callback
   exp://localhost:19000/--/auth/callback
   http://localhost:19006/auth/callback
   ```
5. Click **Save**

## 🔄 If You Already Have a Web Client

If you already created a Web OAuth client but can't see the secret:

### Option 1: View Existing Secret

1. Google Cloud Console → **Credentials**
2. Under **OAuth 2.0 Client IDs**, click on your Web client name
3. You'll see:
   - **Client ID**: (visible)
   - **Client Secret**: (visible)
4. Click the copy icon next to Client Secret

### Option 2: Reset Secret (if lost)

1. Click on your Web OAuth client
2. Find **Client Secret** section
3. Click **RESET SECRET** button
4. Confirm reset
5. Copy the new secret (you must save it - it won't be shown again in full)

## ✅ Verify Setup

### In Google Cloud Console:

Check you have:
- ✅ OAuth 2.0 Client ID of type **Web application**
- ✅ Authorized redirect URI: `https://sfhkchooqiqyzrwkvziz.supabase.co/auth/v1/callback`

### In Supabase Dashboard:

Check:
- ✅ Google provider is **Enabled** (green toggle)
- ✅ Client ID is filled in
- ✅ Client Secret is filled in
- ✅ Redirect URL includes: `prajolsapp://auth/callback`

## 🧪 Test

After setup:

```bash
npx expo start -c
```

Tap "Continue with Google" → Sign in → Should redirect back and log you in! ✅

## 📝 What About Your Existing Android/iOS Clients?

You still need them! Here's how they all work together:

- **Web OAuth Client** → For Supabase OAuth flow (server-side)
- **Android OAuth Client** → For native Android apps (if you build one later)
- **iOS OAuth Client** → For native iOS apps (if you build one later)

For now, you only need the **Web client** for Supabase OAuth to work.

## 🆘 Still Can't Find It?

### Check if you have a Web client:

1. Google Cloud Console → **Credentials**
2. Look at the **OAuth 2.0 Client IDs** list
3. Check the **Type** column:
   - "Web application" ✅ (has secret)
   - "Android" ❌ (no secret)
   - "iOS" ❌ (no secret)

### If you only see Android/iOS:

You need to create a new Web client (follow Step 2 above).

## 🎯 Quick Checklist

Before testing, make sure you have:

- [ ] Created Web OAuth client in Google Cloud Console
- [ ] Copied Client ID and Client Secret
- [ ] Added redirect URI in Google: `https://sfhkchooqiqyzrwkvziz.supabase.co/auth/v1/callback`
- [ ] Enabled Google provider in Supabase
- [ ] Pasted Client ID and Secret in Supabase
- [ ] Added redirect URL in Supabase: `prajolsapp://auth/callback`
- [ ] Restarted your app

Then test! 🚀
