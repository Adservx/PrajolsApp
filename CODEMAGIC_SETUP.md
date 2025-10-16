# Codemagic CI/CD Setup Guide

## Prerequisites

Before you begin, make sure you have:
- A Codemagic account (sign up at https://codemagic.io)
- Your repository connected to Codemagic
- Supabase credentials ready

## Step 1: Push the Configuration File

The `codemagic.yaml` file has been created in your project root. Now push it to your repository:

```bash
git add codemagic.yaml
git commit -m 'Add Codemagic CI/CD configuration'
git push
```

## Step 2: Configure Environment Variables in Codemagic

1. Go to your Codemagic dashboard
2. Select your project
3. Go to **Settings** → **Environment variables**
4. Add the following variables:

### Required Variables:
- `EXPO_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## Step 3: Set Up Code Signing (Optional - For Production Builds)

**Note:** Code signing is NOT required for initial testing. You can skip this step and come back later when you're ready to publish to app stores.

### For Android (when ready for production):
1. Generate a keystore file if you don't have one:
   ```bash
   keytool -genkey -v -keystore school-management.keystore -alias school-management -keyalg RSA -keysize 2048 -validity 10000
   ```
2. In Codemagic:
   - Go to **Code signing identities** → **Android**
   - Upload your keystore file
   - Enter keystore password, key alias, and key password
   - Name it `school_management_keystore`
3. Uncomment these lines in `codemagic.yaml`:
   ```yaml
   android_signing:
     - school_management_keystore
   ```

### For iOS (when ready for production):
1. In Codemagic:
   - Go to **Code signing identities** → **iOS**
   - Connect your Apple Developer account
   - Select your provisioning profile and certificate
2. Uncomment these lines in `codemagic.yaml`:
   ```yaml
   ios_signing:
     distribution_type: app_store
     bundle_identifier: com.schoolmanagement.app
   ```

## Step 4: Set Up EAS (Expo Application Services)

Since this is an Expo app, you'll need EAS for building:

1. Install EAS CLI locally:
   ```bash
   npm install -g eas-cli
   ```

2. Login to your Expo account:
   ```bash
   eas login
   ```

3. Configure EAS build:
   ```bash
   eas build:configure
   ```

4. Add your EAS credentials to Codemagic environment variables:
   - `EXPO_TOKEN`: Your Expo access token (get it from https://expo.dev/accounts/[username]/settings/access-tokens)

## Step 5: Check for Configuration File in Codemagic

1. Go to your Codemagic dashboard
2. Select your project
3. Click **"Check for configuration file"** button in the top right corner
4. Codemagic will detect the `codemagic.yaml` file

## Step 6: Trigger Your First Build

You can trigger a build by:
- Pushing code to `main` or `develop` branch
- Creating a pull request
- Manually triggering from Codemagic dashboard

## Workflows Explained

### 1. `android-workflow`
- Builds Android APK and AAB
- Runs on push to `main` or `develop` branches
- Includes type checking and linting
- Sends email notifications

### 2. `ios-workflow`
- Builds iOS IPA
- Runs on push to `main` branch
- Submits to TestFlight automatically
- Includes CocoaPods installation

### 3. `dev-workflow`
- Lightweight workflow for development
- Runs on all branches
- Only runs type checking and linting
- No build artifacts

## Customization

### To modify build triggers:
Edit the `triggering` section in `codemagic.yaml`:
```yaml
triggering:
  events:
    - push
    - pull_request
  branch_patterns:
    - pattern: 'your-branch-name'
      include: true
```

### To add more scripts:
Add to the `scripts` section:
```yaml
scripts:
  - name: Your script name
    script: |
      your command here
```

### To change notification recipients:
Update the `email.recipients` section:
```yaml
publishing:
  email:
    recipients:
      - your-email@example.com
```

## Troubleshooting

### Build fails with "Module not found"
- Make sure all dependencies are in `package.json`
- Clear cache in Codemagic settings

### Environment variables not working
- Check variable names match exactly
- Make sure variables are added to the correct group

### iOS build fails
- Verify code signing certificates are valid
- Check bundle identifier matches

### Android build fails
- Verify keystore credentials are correct
- Check package name matches

## Enabling App Store Connect Integration (Optional)

To automatically submit builds to TestFlight:

1. In Codemagic, go to **Teams** → **Integrations**
2. Click **Add integration** → **App Store Connect**
3. Follow the setup wizard to connect your Apple Developer account
4. Once configured, uncomment these lines in `codemagic.yaml`:
   ```yaml
   app_store_connect:
     auth: integration
     submit_to_testflight: true
   ```

## Next Steps

1. Set up automatic deployment to Google Play Store (Android)
2. Set up automatic deployment to App Store (iOS) - see above
3. Add automated testing
4. Configure Slack/Discord notifications

## Resources

- [Codemagic Documentation](https://docs.codemagic.io/)
- [Expo EAS Build](https://docs.expo.dev/build/introduction/)
- [React Native CI/CD Best Practices](https://reactnative.dev/docs/running-on-device)
