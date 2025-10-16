# Assets Directory

This directory contains image assets for the app.

## Required Files

You need to create the following image files:

### 1. `icon.png` (1024x1024px)
- App icon shown on device home screen
- Should be a square PNG with transparent or solid background
- Recommended: School-themed icon (book, graduation cap, etc.)

### 2. `splash.png` (1284x2778px for iOS, 1242x2436px recommended)
- Splash screen shown while app loads
- Can be same as icon centered on white background
- Or custom branded splash screen

### 3. `adaptive-icon.png` (1024x1024px)
- Android adaptive icon (for Android 8.0+)
- Safe zone: 66% of total area (centered circle)
- Can be same as `icon.png`

### 4. `favicon.png` (48x48px)
- Used for web version
- Small version of app icon

## Quick Generation

### Option 1: Use Placeholders

For testing, you can use solid color placeholders:

1. Create 1024x1024 PNG with your school colors
2. Add text "SM" (School Management) in center
3. Use online tools like:
   - https://www.canva.com (free)
   - https://www.figma.com (free)
   - Photoshop/GIMP

### Option 2: Use Icon Generator

1. Create one 1024x1024 icon
2. Use Expo's icon generator:
   ```bash
   npx expo-icon-tool
   ```

### Option 3: Use Free Icons

Download from:
- https://www.flaticon.com (search "school" or "education")
- https://icons8.com
- https://www.iconfinder.com

## Current Status

⚠️ **Placeholder icons needed** - The app will work without these, but Expo will show warnings. Add real icons before production deployment.

## Icon Design Tips

- **Keep it simple**: Icon should be recognizable at small sizes
- **Use 2-3 colors max**: Avoid gradients for better visibility
- **Avoid text**: Icons with text are hard to read when small
- **School theme**: Books, graduation caps, pencils, or abstract geometric shapes
- **Test on device**: Icons look different on actual devices vs. computer

## Example Color Schemes

**Professional Blue:**
- Primary: #1976D2
- Secondary: #424242
- Background: #FFFFFF

**Vibrant Education:**
- Primary: #FF6B6B (coral red)
- Secondary: #4ECDC4 (turquoise)
- Background: #F7FFF7

**Classic Academic:**
- Primary: #2C3E50 (navy)
- Secondary: #E74C3C (red)
- Background: #ECF0F1 (light gray)
