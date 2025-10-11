# Assets Directory

This directory contains application assets like icons and splash screens.

## Required Assets

The following assets are required for the app:

- **icon.png**: App icon (1024x1024px recommended)
- **adaptive-icon.png**: Android adaptive icon (1024x1024px)
- **splash.png**: Splash screen image (1284x2778px recommended)
- **favicon.png**: Web favicon (48x48px or larger)

## Generating Assets

You can generate these assets automatically using Expo:

1. Create a single high-resolution icon (1024x1024px)
2. Save it as `icon.png` in this directory
3. Run: `npx expo prebuild` to generate all required variants

Or use an online tool like:
- https://www.appicon.co/
- https://easyappicon.com/

For now, placeholder files have been created. The app will use default Expo assets until you replace these with your own images.
