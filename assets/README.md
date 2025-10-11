# Assets Directory

This directory is for application assets like icons and splash screens.

## Current Status

The app is currently using **Expo's default assets** to avoid build errors. This allows the app to build successfully immediately.

## Adding Custom Assets (Optional)

When you're ready to add custom assets:

### Step 1: Create Your Assets

Create these files with proper dimensions:

- **icon.png**: App icon (1024x1024px)
- **adaptive-icon.png**: Android adaptive icon (1024x1024px)
- **splash.png**: Splash screen image (1284x2778px)
- **favicon.png**: Web favicon (48x48px or larger)

### Step 2: Update app.json

Add these properties to the `expo` section in `app.json`:

```json
"icon": "./assets/icon.png",
"splash": {
  "image": "./assets/splash.png",
  "resizeMode": "contain",
  "backgroundColor": "#ffffff"
},
"android": {
  "adaptiveIcon": {
    "foregroundImage": "./assets/adaptive-icon.png",
    "backgroundColor": "#ffffff"
  },
  "package": "com.prajols.app"
},
"web": {
  "favicon": "./assets/favicon.png"
}
```

### Tools for Generating Assets

- https://www.appicon.co/
- https://easyappicon.com/
- https://expo.dev/tools (Expo app icon generator)

**Note**: Empty or invalid image files will cause build failures, so only add assets when you have proper image files ready.
