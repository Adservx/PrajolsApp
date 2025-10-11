# Setup Instructions - Fixed for Windows

## The Problem
The `eas` command wasn't found because EAS CLI wasn't installed globally, and there may be npm path issues on Windows.

## The Solution

I've added `eas-cli` as a project dependency and created npm scripts. Now you have **3 ways** to use EAS:

### ✅ Method 1: NPM Scripts (Easiest)

After running `npm install`, use these commands:

```bash
npm run eas:login
npm run eas:build:preview
npm run eas:build:production
```

### ✅ Method 2: npx (No Installation Needed)

Use `npx` to run EAS CLI directly:

```bash
npx eas-cli login
npx eas-cli build --platform android --profile preview
```

### ✅ Method 3: Global Install (If you fix npm paths)

If you want to install globally and fix your npm configuration:

```bash
# Fix npm global path
npm config set prefix "%APPDATA%\npm"

# Add to PATH (PowerShell as Admin)
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";$env:APPDATA\npm", "User")

# Then install globally
npm install -g eas-cli

# Now you can use
eas login
eas build --platform android --profile preview
```

## Quick Start Commands

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Login to Expo**:
   ```bash
   npm run eas:login
   ```

3. **Build for Android**:
   ```bash
   npm run eas:build:preview
   ```

## All Available Scripts

- `npm start` - Start Expo dev server
- `npm run android` - Run on Android device/emulator
- `npm run eas:login` - Login to Expo account
- `npm run eas:build:preview` - Build preview APK
- `npm run eas:build:production` - Build production APK

That's it! No need to install EAS CLI globally anymore.
