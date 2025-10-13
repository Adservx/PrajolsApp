# Google Sign-In Setup Guide

This guide will help you configure Google Sign-In for your React Native app with Supabase authentication.

## Prerequisites

- Google Cloud Console account
- Supabase project with Google Auth provider enabled
- Android/iOS development environment set up

## Step 1: Configure Google Cloud Console

### 1.1 Create/Select a Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Note your project ID

### 1.2 Enable Google+ API (if not already enabled)

1. Navigate to **APIs & Services** > **Library**
2. Search for "Google+ API"
3. Click **Enable**

### 1.3 Create OAuth 2.0 Credentials

#### For Web Client (Required for Supabase)

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth 2.0 Client ID**
3. Select **Web application** as Application type
4. Name it (e.g., "Supabase Auth")
5. Add Authorized redirect URIs:
   - `https://<your-supabase-project-ref>.supabase.co/auth/v1/callback`
   - Example: `https://sfhkchooqiqyzrwkvziz.supabase.co/auth/v1/callback`
6. Click **Create**
7. **IMPORTANT**: Copy the **Client ID** - this is your `GOOGLE_WEB_CLIENT_ID`

#### For Android (Required for native Google Sign-In)

1. Click **Create Credentials** > **OAuth 2.0 Client ID**
2. Select **Android** as Application type
3. Name it (e.g., "Android App")
4. Get your SHA-1 certificate fingerprint:
   
   **For Debug:**
   ```bash
   cd android
   keytool -list -v -keystore ./app/debug.keystore -alias androiddebugkey -storepass android -keypass android
   ```
   
   **For Release:**
   ```bash
   keytool -list -v -keystore /path/to/your-keystore.jks
   ```

5. Enter your package name: `com.prajols.sms`
6. Paste the SHA-1 fingerprint
7. Click **Create**

#### For iOS (Optional, if targeting iOS)

1. Click **Create Credentials** > **OAuth 2.0 Client ID**
2. Select **iOS** as Application type
3. Name it (e.g., "iOS App")
4. Enter your bundle ID: `com.prajols.sms`
5. Click **Create**

### 1.4 Configure OAuth Consent Screen

1. Go to **APIs & Services** > **OAuth consent screen**
2. Select **External** (or Internal if using Google Workspace)
3. Fill in the required information:
   - App name: Your app name
   - User support email: Your email
   - Developer contact information: Your email
4. Add scopes:
   - `userinfo.email`
   - `userinfo.profile`
   - `openid`
5. Add test users (if in development)
6. Click **Save and Continue**

## Step 2: Configure Supabase

### 2.1 Enable Google Provider

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **Authentication** > **Providers**
4. Find **Google** and click to expand
5. Enable Google provider
6. Enter your credentials:
   - **Client ID**: The Web Client ID from Step 1.3
   - **Client Secret**: The Web Client Secret from Step 1.3
7. Configure **Authorized Client IDs** (optional):
   - Add your Android OAuth Client ID
   - Add your iOS OAuth Client ID (if applicable)
8. Click **Save**

### 2.2 Configure Redirect URLs

1. In Supabase Dashboard, go to **Authentication** > **URL Configuration**
2. Add your app's deep link URLs (if using custom scheme):
   - Example: `yourapp://auth/callback`

## Step 3: Configure Your React Native App

### 3.1 Update Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Google Web Client ID:
   ```env
   GOOGLE_WEB_CLIENT_ID=your-actual-web-client-id.apps.googleusercontent.com
   ```

3. Ensure Supabase credentials are correct:
   ```env
   SUPABASE_URL=https://sfhkchooqiqyzrwkvziz.supabase.co
   SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

### 3.2 Install Dependencies (if not already installed)

```bash
npm install
```

### 3.3 Android-specific Configuration

The Google Sign-In library should work out of the box, but ensure:

1. Your `android/app/build.gradle` has the correct package name:
   ```gradle
   applicationId "com.prajols.sms"
   ```

2. Rebuild the app:
   ```bash
   npm run android
   ```

### 3.4 iOS-specific Configuration (if targeting iOS)

1. Add URL scheme to `app.json`:
   ```json
   "ios": {
     "bundleIdentifier": "com.prajols.sms",
     "infoPlist": {
       "CFBundleURLTypes": [
         {
           "CFBundleURLSchemes": ["com.googleusercontent.apps.YOUR-REVERSED-CLIENT-ID"]
         }
       ]
     }
   }
   ```

2. Run:
   ```bash
   npm run ios
   ```

## Step 4: Testing

### 4.1 Test in Development

1. Start the development server:
   ```bash
   npm start
   ```

2. Run on Android:
   ```bash
   npm run android
   ```

3. Navigate to the Login screen
4. Tap "Continue with Google"
5. Select a Google account
6. Grant permissions
7. You should be logged in!

### 4.2 Common Issues and Solutions

#### Issue: "Developer Error" or "Error 10"
**Solution**: Your SHA-1 certificate doesn't match or isn't configured in Google Cloud Console.
- Verify your SHA-1 fingerprint
- Make sure it's added to the Android OAuth client in Google Cloud Console
- Clean and rebuild the app

#### Issue: "GOOGLE_WEB_CLIENT_ID is not configured"
**Solution**: 
- Ensure `.env` file exists and has the correct `GOOGLE_WEB_CLIENT_ID`
- Restart your development server after adding environment variables
- Verify the Web Client ID is from the Web application type, not Android/iOS

#### Issue: "Sign in failed" after selecting Google account
**Solution**:
- Check that the Web Client ID is correctly configured in both `.env` and Supabase
- Verify the Google provider is enabled in Supabase Dashboard
- Check Supabase logs for detailed error messages

#### Issue: "Google Play Services not available"
**Solution**:
- Ensure the device/emulator has Google Play Services installed
- Update Google Play Services on the device

## Step 5: Production Deployment

### 5.1 Generate Release Keystore

If you don't have a release keystore:

```bash
keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias
```

### 5.2 Get Release SHA-1

```bash
keytool -list -v -keystore /path/to/my-release-key.jks
```

### 5.3 Add Release SHA-1 to Google Cloud Console

1. Go to Google Cloud Console > Credentials
2. Edit your Android OAuth client
3. Add the release SHA-1 fingerprint
4. Click **Save**

### 5.4 Build Release APK/AAB

Using EAS Build:
```bash
eas build --platform android --profile production
```

Or locally:
```bash
cd android
./gradlew bundleRelease
```

## Security Best Practices

1. **Never commit `.env` file** - It's already in `.gitignore`
2. **Use different OAuth clients** for development and production
3. **Regularly rotate client secrets** in production
4. **Monitor authentication logs** in Supabase Dashboard
5. **Keep dependencies updated** for security patches

## Additional Resources

- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Google Sign-In for Android](https://developers.google.com/identity/sign-in/android/start)
- [React Native Google Sign-In](https://github.com/react-native-google-signin/google-signin)

## Support

If you encounter issues:

1. Check the console logs for error messages
2. Verify all configuration steps were completed
3. Check Supabase Dashboard logs: Authentication > Logs
4. Review Google Cloud Console audit logs

---

**Note**: The Google Sign-In configuration in this app uses native Google Sign-In with Supabase integration. This provides a better user experience on mobile devices compared to web-based OAuth flows.
