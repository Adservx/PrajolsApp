# Deployment Guide

## Prerequisites

- EAS CLI installed: `npm install -g eas-cli`
- Expo account (create at https://expo.dev)
- Android Studio (for local builds)
- Google Play Console account (for Play Store)

## Step 1: Configure EAS Build

### Login to EAS
```bash
eas login
```

### Initialize EAS Build
```bash
eas build:configure
```

This creates `eas.json` with build configurations.

## Step 2: Environment Variables

Create `.env` file (DO NOT commit to git):
```bash
# Firebase
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id

# Khalti
KHALTI_PUBLIC_KEY=your_khalti_public_key
KHALTI_SECRET_KEY=your_khalti_secret_key

# IME Pay
IMEPAY_MERCHANT_CODE=your_merchant_code
IMEPAY_USERNAME=your_username
IMEPAY_PASSWORD=your_password

# API
API_BASE_URL=https://your-api.com/api/v1
```

Update `eas.json` to include env variables:
```json
{
  "build": {
    "development": {
      "env": {
        "ENVIRONMENT": "development"
      }
    },
    "preview": {
      "env": {
        "ENVIRONMENT": "staging"
      }
    },
    "production": {
      "env": {
        "ENVIRONMENT": "production"
      }
    }
  }
}
```

## Step 3: Build for Development

### APK Build (for testing)
```bash
eas build --platform android --profile development
```

This creates a development APK you can install on devices for testing.

## Step 4: Build for Preview

### Internal Testing APK
```bash
eas build --platform android --profile preview
```

Features:
- Optimized build
- Can be distributed to testers
- Not suitable for Play Store

## Step 5: Build for Production

### Play Store AAB
```bash
eas build --platform android --profile production
```

This creates an Android App Bundle (AAB) optimized for Play Store.

## Step 6: Google Play Store Submission

### 1. Create Play Console Account
- Go to https://play.google.com/console
- Pay one-time $25 registration fee
- Complete account setup

### 2. Create New App
- Click "Create app"
- Enter app details:
  - Name: School Management System
  - Language: English
  - App or game: App
  - Free or paid: Free

### 3. Complete App Content
Fill out required sections:
- **App access**: Describe how to access the app
- **Ads**: Indicate if app contains ads (No)
- **Content rating**: Complete questionnaire
- **Target audience**: Select age groups
- **News app**: No
- **COVID-19 contact tracing**: No
- **Data safety**: Complete data collection form

### 4. Store Listing
- **App details**:
  - Short description (80 chars)
  - Full description (4000 chars)
  - App icon (512x512 PNG)
  - Feature graphic (1024x500)
  - Screenshots (minimum 2, up to 8)
  - Video (optional YouTube link)

- **Categorization**:
  - Category: Education
  - Tags: school, education, management

- **Contact details**:
  - Email
  - Phone (optional)
  - Website (optional)

### 5. Release Setup

**Internal Testing** (recommended first):
```bash
# Create internal testing release
1. Go to "Internal testing"
2. Click "Create new release"
3. Upload AAB from EAS build
4. Add release notes
5. Review and rollout
```

**Closed Testing** (beta):
```bash
# After internal testing passes
1. Go to "Closed testing"
2. Create release
3. Add testers via email
4. Rollout to testers
```

**Production** (public release):
```bash
# After testing is complete
1. Go to "Production"
2. Create release
3. Add release notes
4. Set rollout percentage (start with 20%)
5. Submit for review
```

## Step 7: App Signing

### Generate Upload Key
```bash
# Generate keystore
keytool -genkeypair -v -storetype PKCS12 -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000

# Save keystore info securely
```

### Configure EAS with Keystore
```bash
eas credentials
```

Or let EAS manage credentials automatically (recommended).

## Step 8: Version Management

### Update Version Numbers

In `app.json`:
```json
{
  "expo": {
    "version": "1.0.0",
    "android": {
      "versionCode": 1
    }
  }
}
```

For each release:
- Increment `version` (semantic versioning: MAJOR.MINOR.PATCH)
- Increment `versionCode` (integer, must always increase)

## Step 9: Continuous Deployment

### GitHub Actions CI/CD

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Google Play

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Setup Expo
        uses: expo/expo-github-action@v8
        with:
          expo-version: latest
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm test
        
      - name: Build for Android
        run: eas build --platform android --profile production --non-interactive
        
      - name: Submit to Play Store
        run: eas submit --platform android --latest
        env:
          GOOGLE_SERVICE_ACCOUNT_KEY: ${{ secrets.GOOGLE_SERVICE_ACCOUNT_KEY }}
```

## Step 10: Post-Deployment

### Monitor Crashes
- Enable Firebase Crashlytics
- Monitor Play Console vitals
- Review user feedback

### Update Process
```bash
# 1. Make changes
# 2. Test locally
npm test

# 3. Update version
# In app.json, increment version and versionCode

# 4. Build new version
eas build --platform android --profile production

# 5. Submit update
eas submit --platform android --latest

# 6. Create release in Play Console
# - Add release notes
# - Staged rollout (20% → 50% → 100%)
```

## Common Deployment Issues

### Build Fails
```bash
# Clear cache
expo start -c

# Clear EAS build cache
eas build --clear-cache

# Check build logs
eas build:list
```

### App Rejected
- Check Play Console for specific reasons
- Common issues:
  - Privacy policy missing
  - Content rating incomplete
  - Dangerous permissions not justified
  - Broken functionality

### Upload Failed
```bash
# Ensure version code is higher than previous
# Check AAB file size (< 150MB)
# Verify signing configuration
```

## Best Practices

1. **Test Thoroughly**: Use internal testing before production
2. **Staged Rollout**: Start with 20%, monitor, then increase
3. **Backup Builds**: Keep copy of all production builds
4. **Release Notes**: Always provide clear, detailed release notes
5. **Monitor Metrics**: Track installs, crashes, and ratings
6. **Quick Updates**: Be ready to rollback or hotfix critical issues
7. **Version Naming**: Use semantic versioning consistently

## Rollback Procedure

If critical issue found in production:

1. **Pause Rollout** in Play Console
2. **Create Hotfix Branch**
```bash
git checkout -b hotfix/v1.0.1 v1.0.0
# Fix the issue
git commit -am "Hotfix: critical bug"
git tag v1.0.1
```
3. **Build and Deploy Hotfix**
```bash
eas build --platform android --profile production
eas submit --platform android --latest
```
4. **Resume Rollout** after verification

## Security Checklist

- [ ] Remove all console.log statements
- [ ] Secure API keys (use environment variables)
- [ ] Enable ProGuard/R8 code shrinking
- [ ] Implement certificate pinning
- [ ] Enable Google Play App Signing
- [ ] Set up Firebase App Check
- [ ] Review all permissions
- [ ] Implement analytics and crash reporting

## Resources

- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [Google Play Console Help](https://support.google.com/googleplay/android-developer/)
- [Android App Bundle Documentation](https://developer.android.com/guide/app-bundle)
- [Expo Submit Guide](https://docs.expo.dev/submit/introduction/)
