# Google Sign-In Quick Start

## ⚡ Quick Setup (5 minutes)

### 1. Get Google Web Client ID

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create project or select existing
3. **APIs & Services** > **Credentials** > **Create OAuth Client ID**
4. Choose **Web application**
5. Add authorized redirect URI:
   ```
   https://sfhkchooqiqyzrwkvziz.supabase.co/auth/v1/callback
   ```
6. Copy the **Client ID** (looks like: `xxx.apps.googleusercontent.com`)

### 2. Configure Supabase

1. Open [Supabase Dashboard](https://supabase.com/dashboard)
2. Your project > **Authentication** > **Providers**
3. Enable **Google**
4. Paste the **Client ID** and **Client Secret** from step 1
5. Click **Save**

### 3. Configure Android OAuth Client

1. In Google Cloud Console > **Create OAuth Client ID**
2. Choose **Android**
3. Package name: `com.prajols.sms`
4. Get SHA-1 fingerprint:
   ```bash
   cd android
   keytool -list -v -keystore ./app/debug.keystore -alias androiddebugkey -storepass android -keypass android
   ```
5. Copy SHA-1 and paste in Google Cloud Console
6. Click **Create**

### 4. Update .env File

Create `.env` in project root:
```env
SUPABASE_URL=https://sfhkchooqiqyzrwkvziz.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
GOOGLE_WEB_CLIENT_ID=YOUR-WEB-CLIENT-ID.apps.googleusercontent.com
```

### 5. Test It!

```bash
# Install dependencies (if needed)
npm install

# Start development server
npm start

# Run on Android
npm run android
```

**Tap "Continue with Google" on the Login screen** → Select account → Done! 🎉

## 🔧 Troubleshooting

### Error 10 / Developer Error
- **Cause**: SHA-1 mismatch or not configured
- **Fix**: Verify SHA-1 in Google Cloud Console matches your keystore

### "GOOGLE_WEB_CLIENT_ID not configured"
- **Cause**: `.env` file missing or incorrect
- **Fix**: 
  1. Ensure `.env` exists with correct `GOOGLE_WEB_CLIENT_ID`
  2. Restart development server
  3. Clear cache: `npm start -- --reset-cache`

### Sign-in fails after selecting account
- **Cause**: Supabase not configured correctly
- **Fix**: 
  1. Check Web Client ID in Supabase Dashboard
  2. Ensure Google provider is enabled
  3. Check Supabase logs: Authentication > Logs

### Google Play Services not available
- **Cause**: Emulator/device missing Google Play Services
- **Fix**: Use an emulator with Google Play or a real device

## 📱 What Was Implemented

1. ✅ **Google Sign-In Service** (`src/services/googleSignIn.ts`)
   - Native Google authentication
   - Error handling
   - Configuration management

2. ✅ **Supabase Integration** (`src/services/supabaseAuth.ts`)
   - ID token exchange
   - User sync to database
   - Session management

3. ✅ **Redux Integration** (`src/store/slices/authSlice.ts`)
   - Google Sign-In async thunk
   - State management
   - Token storage

4. ✅ **UI Implementation** (`src/screens/auth/LoginScreen.tsx`)
   - "Continue with Google" button
   - Loading states
   - Error handling

5. ✅ **App Initialization** (`App.js`)
   - Auto-configure Google Sign-In on startup

## 📚 Full Documentation

See `GOOGLE_SIGNIN_SETUP.md` for complete setup instructions, production deployment, and security best practices.

## 🎯 Next Steps

1. **Test on Real Device**: Some features work better on physical devices
2. **Configure iOS** (if needed): Follow full guide in `GOOGLE_SIGNIN_SETUP.md`
3. **Production Setup**: Add release SHA-1 before deploying to Play Store
4. **Monitor Usage**: Check Supabase Dashboard > Authentication > Logs

---

**Need Help?** Check the full guide in `GOOGLE_SIGNIN_SETUP.md` or Supabase documentation.
