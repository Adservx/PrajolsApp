# Installation Checklist ✅

Follow this checklist to ensure everything is set up correctly.

## Pre-Installation

- [ ] Node.js v18+ installed
- [ ] npm or yarn installed
- [ ] Git installed
- [ ] Android Studio installed (for Android development)
- [ ] Expo account created at https://expo.dev

## Step 1: Project Setup

- [ ] Navigate to project directory: `cd PrajolsApp`
- [ ] Install dependencies: `npm install`
- [ ] Verify installation: `npm list` (should show no errors)

## Step 2: Firebase Configuration

- [ ] Create Firebase project at console.firebase.google.com
- [ ] Enable Authentication (Email/Password, Google)
- [ ] Enable Firestore Database
- [ ] Enable Firebase Storage
- [ ] Enable Cloud Messaging
- [ ] Download `google-services.json`
- [ ] Place `google-services.json` in project root
- [ ] Update Firebase config in `src/services/firebase.ts`
- [ ] Configure Firestore security rules
- [ ] Configure Storage security rules

## Step 3: Environment Configuration

- [ ] Create `.env` file in project root
- [ ] Add Firebase credentials to `.env`
- [ ] Add API base URL to `.env`
- [ ] Add payment gateway credentials (if needed)
- [ ] Verify `.env` is in `.gitignore`

## Step 4: Test the Application

- [ ] Start development server: `npm start`
- [ ] Verify Metro bundler runs without errors
- [ ] Test on Android: `npm run android` OR scan QR code in Expo Go app
- [ ] Verify app launches successfully

## Step 5: Create Test Users

In Firebase Console → Authentication:

- [ ] Create admin user: admin@school.com
- [ ] Create teacher user: teacher@school.com
- [ ] Create student user: student@school.com
- [ ] Create parent user: parent@school.com

In Firestore Database → users collection:

- [ ] Add user documents with proper roles
- [ ] Verify user data structure matches schema

## Step 6: Verify Features

### Authentication
- [ ] Login with test user works
- [ ] Logout works
- [ ] Registration works
- [ ] Forgot password flow works

### Navigation
- [ ] Role-based dashboards load correctly
- [ ] Tab navigation works
- [ ] Screen transitions are smooth

### Data Management
- [ ] Can view student list (Admin/Teacher)
- [ ] Can view notifications
- [ ] Settings screen accessible

## Step 7: Optional Integrations

### Payment Gateway
- [ ] Khalti credentials configured
- [ ] IME Pay credentials configured
- [ ] Test payment flow (if applicable)

### Push Notifications
- [ ] Firebase Cloud Messaging configured
- [ ] Test notification delivery
- [ ] Notification permissions requested

## Step 8: Build Configuration

- [ ] EAS CLI installed: `npm install -g eas-cli`
- [ ] EAS login completed: `eas login`
- [ ] EAS configured: `eas build:configure`
- [ ] Verify `eas.json` created

## Step 9: Development Build (Optional)

- [ ] Build development APK: `eas build --platform android --profile development`
- [ ] Wait for build completion (~10-15 minutes)
- [ ] Download and install APK on device
- [ ] Verify app works on physical device

## Step 10: Testing

- [ ] Run unit tests: `npm test`
- [ ] All tests pass
- [ ] Type check passes: `npm run type-check`
- [ ] Linting passes: `npm run lint`

## Production Readiness

### Code Quality
- [ ] No console.log statements in production code
- [ ] All TypeScript errors resolved
- [ ] All ESLint warnings addressed
- [ ] Code follows project conventions

### Security
- [ ] All API keys stored in environment variables
- [ ] No sensitive data hardcoded
- [ ] Firebase security rules configured
- [ ] HTTPS enforced for all API calls

### Performance
- [ ] Images optimized
- [ ] Large lists use FlatList/virtualization
- [ ] Animations run at 60 FPS
- [ ] App size is reasonable

### Documentation
- [ ] README updated with project specifics
- [ ] API endpoints documented
- [ ] Component usage documented
- [ ] Deployment process documented

## Common Issues Resolution

### "Module not found" errors
- [ ] Run `npm install` again
- [ ] Clear Metro cache: `npm start -- --clear`
- [ ] Delete node_modules and reinstall

### Firebase connection errors
- [ ] Verify `google-services.json` location
- [ ] Check Firebase config values
- [ ] Ensure Firebase services are enabled

### Build failures
- [ ] Clear cache: `expo start -c`
- [ ] Update Expo SDK: `expo upgrade`
- [ ] Check EAS build logs for specific errors

### App crashes on startup
- [ ] Check error logs in Metro bundler
- [ ] Verify all required dependencies installed
- [ ] Check for syntax errors in code

## Next Steps

Once all items are checked:

1. ✅ **Development**: App is ready for active development
2. ✅ **Testing**: Begin comprehensive testing
3. ✅ **Deployment**: Follow DEPLOYMENT.md for production release

## Quick Command Reference

```bash
# Development
npm start                    # Start Metro bundler
npm run android              # Run on Android
npm run ios                  # Run on iOS

# Testing
npm test                     # Run unit tests
npm run test:coverage        # Test with coverage
npm run type-check           # TypeScript check
npm run lint                 # ESLint check

# Building
eas build --platform android # Build for Android
eas submit --platform android # Submit to Play Store

# Troubleshooting
npm start -- --clear         # Clear cache and restart
rm -rf node_modules && npm install  # Reinstall dependencies
```

## Support Resources

- 📚 [README_SMS.md](./README_SMS.md) - Complete documentation
- 🔥 [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) - Firebase setup guide
- 🚀 [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment instructions
- ⚡ [QUICKSTART_GUIDE.md](./QUICKSTART_GUIDE.md) - Quick start guide

---

**Congratulations! 🎉**

If all items are checked, your School Management System is fully configured and ready for development!
