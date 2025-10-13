# 🔧 Firebase Authentication Fix - Final Steps

## The Issue
You're still seeing this error:
```
Error: You attempted to use a firebase module that's not installed on your Android project by calling firebase.app()
```

This means there's cached data from the old React Native Firebase installation.

## ✅ What's Already Fixed
1. ✅ Removed all `@react-native-firebase/*` packages
2. ✅ Updated all service files to use Firebase Web SDK
3. ✅ Removed `googleServicesFile` from app.json
4. ✅ Cleaned `.expo` and Metro caches

## 🚀 Quick Fix - Follow These Steps

### Option 1: Run the Cleanup Script (Recommended)
```powershell
# In PowerShell, from project root:
.\CLEANUP_AND_FIX.ps1
```

### Option 2: Manual Steps
If the script doesn't work, follow these manual steps:

#### Step 1: Stop Everything
```powershell
# Stop all node processes
taskkill /F /IM node.exe
```

#### Step 2: Delete ALL Caches
```powershell
# From project root
Remove-Item -Recurse -Force .expo -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force node_modules\.cache -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
```

#### Step 3: Reinstall Dependencies
```powershell
npm install --legacy-peer-deps
```

#### Step 4: Start Fresh
```powershell
npx expo start --clear
```

#### Step 5: When App Opens
- Press `r` in the terminal to reload
- Or shake your device/emulator and press "Reload"

## 🔍 Verification

After following the steps, verify in your terminal that you see:
```
✓ No React Native Firebase packages
✓ Using Firebase Web SDK
✓ Expo Metro bundler running
```

## 🎯 Test Login

1. Open the app on your device/emulator
2. Go to Login screen
3. Try logging in with test credentials
4. Check the Metro bundler terminal for any errors

## ⚠️ If You Still See Errors

### Error: "firebase.app() not found"
**Solution:** The cache wasn't fully cleared. Try:
```powershell
# Nuclear option - complete reset
npx expo start --clear --reset-cache
```

### Error: "Login failed"
**Possible causes:**
1. **Firebase Auth not enabled**
   - Go to: https://console.firebase.google.com/project/school-management-system-d0eb5/authentication/providers
   - Enable "Email/Password" provider

2. **User doesn't exist**
   - Create a test user in Firebase Console
   - Or use the Register screen to create one

3. **Network error**
   - Check your internet connection
   - Check Firebase project status

### Error: "Invalid API key"
**Solution:** The Firebase config might be wrong. Verify in `src/services/firebase.ts`:
```typescript
const firebaseConfig = {
  apiKey: 'AIzaSyBNKVsg73bfdHu6wr5iHSeJYU0UXdkE6L4',
  authDomain: 'school-management-system-d0eb5.firebaseapp.com',
  projectId: 'school-management-system-d0eb5',
  // ... rest of config
};
```

## 📝 What Changed

### Before (React Native Firebase - WRONG for Expo):
```typescript
import auth from '@react-native-firebase/auth';
await auth().signInWithEmailAndPassword(email, password);
```

### After (Firebase Web SDK - CORRECT for Expo):
```typescript
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
const auth = getAuth(app);
await signInWithEmailAndPassword(auth, email, password);
```

## 🎉 Success Indicators

You'll know it's working when:
- ✅ No "firebase.app()" errors in terminal
- ✅ Login screen loads without errors
- ✅ Can successfully register/login
- ✅ User data appears in Firebase Console

## 🆘 Still Not Working?

If none of the above fixes work, share:
1. The exact error from Metro bundler terminal
2. Screenshot of Firebase Console > Authentication > Sign-in method
3. The code from `src/services/firebase.ts` (first 30 lines)

---

**Last Updated:** Oct 11, 2025
**Status:** Conflicting packages removed, caches cleaned, ready to test
