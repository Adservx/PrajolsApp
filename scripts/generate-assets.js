const fs = require('fs');
const path = require('path');

/**
 * Generate placeholder PNG images using Node.js Canvas API
 * This script creates simple colored placeholder images for the app
 */

const assetsDir = path.join(__dirname, '..', 'assets');

// Ensure assets directory exists
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Function to create a simple SVG and convert to data URL
function createPlaceholderSVG(width, height, text, bgColor = '#4F46E5') {
  const fontSize = Math.min(width, height) / 4;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="${bgColor}"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${fontSize}" 
        fill="white" text-anchor="middle" dominant-baseline="middle">${text}</text>
</svg>`;
}

console.log('⚠️  Manual Asset Setup Required\n');
console.log('This app requires actual PNG image files for assets.');
console.log('Please create the following files in the assets/ directory:\n');

const requiredAssets = [
  { name: 'icon.png', size: '1024x1024px', description: 'App icon' },
  { name: 'adaptive-icon.png', size: '1024x1024px', description: 'Android adaptive icon' },
  { name: 'splash.png', size: '1284x2778px', description: 'Splash screen' },
  { name: 'favicon.png', size: '48x48px', description: 'Web favicon' },
  { name: 'notification-icon.png', size: '96x96px', description: 'Notification icon' }
];

console.log('Required Assets:');
requiredAssets.forEach(asset => {
  console.log(`  • ${asset.name} - ${asset.size} (${asset.description})`);
});

console.log('\nTools to Generate Assets:');
console.log('  • https://www.appicon.co/');
console.log('  • https://easyappicon.com/');
console.log('  • https://expo.dev/tools');
console.log('  • Canva or Figma for custom designs\n');

console.log('Creating SVG placeholders for development...\n');

// Create SVG placeholders
const svgAssets = [
  { name: 'icon.svg', width: 1024, height: 1024, text: 'SMS' },
  { name: 'splash.svg', width: 1284, height: 2778, text: 'SMS' },
  { name: 'favicon.svg', width: 48, height: 48, text: 'S' }
];

svgAssets.forEach(asset => {
  const svg = createPlaceholderSVG(asset.width, asset.height, asset.text);
  const filePath = path.join(assetsDir, asset.name);
  fs.writeFileSync(filePath, svg);
  console.log(`✓ Created ${asset.name}`);
});

console.log('\n⚠️  Note: SVG files are temporary placeholders.');
console.log('Replace them with PNG files for production builds.\n');

console.log('To use these assets temporarily, update app.json:');
console.log('  "icon": "./assets/icon.svg"');
console.log('  "splash": { "image": "./assets/splash.svg", ... }');
