# PrajolsApp - React Native Hello World

A simple React Native hello world application built with Expo and EAS CLI for Android.

## Prerequisites

Before running this project, make sure you have:
- Node.js (v18 or later)
- npm or yarn
- Expo CLI
- EAS CLI (for building)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Install EAS CLI globally (if not already installed):
```bash
npm install -g eas-cli
```

3. Login to Expo account:
```bash
eas login
```

## Running the App

### Development Mode

Start the development server:
```bash
npm start
```

Or run directly on Android:
```bash
npm run android
```

## Building with EAS

### Initial Setup

1. Configure EAS for your project:
```bash
eas build:configure
```

2. Create an Expo account if you haven't already at https://expo.dev

### Build for Android

#### Development Build (APK)
```bash
eas build --platform android --profile development
```

#### Preview Build (APK)
```bash
eas build --platform android --profile preview
```

#### Production Build
```bash
eas build --platform android --profile production
```

After the build completes, you'll get a download link for the APK file that you can install on your Android device.

## Project Structure

```
PrajolsApp/
├── App.js              # Main application component
├── app.json            # Expo configuration
├── eas.json            # EAS Build configuration
├── package.json        # Dependencies
├── babel.config.js     # Babel configuration
└── assets/             # Application assets (icons, images)
```

## Features

- Simple "Hello World" greeting
- Expo managed workflow
- EAS Build configured for Android
- Ready for development, preview, and production builds

## Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [React Native Documentation](https://reactnative.dev/)

## License

MIT
