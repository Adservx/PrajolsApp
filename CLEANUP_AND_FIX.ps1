# Complete Firebase Fix and Cache Cleanup Script
# Run this in PowerShell from the project root

Write-Host "====================================" -ForegroundColor Cyan
Write-Host "Firebase Web SDK Fix - Cache Cleanup" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Kill all node processes
Write-Host "Step 1: Stopping all Node.js processes..." -ForegroundColor Yellow
try {
    Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue
    Write-Host "✓ Node processes stopped" -ForegroundColor Green
} catch {
    Write-Host "⚠ No node processes to stop" -ForegroundColor Yellow
}
Write-Host ""

# Step 2: Clean Expo cache
Write-Host "Step 2: Cleaning Expo cache..." -ForegroundColor Yellow
if (Test-Path ".expo") {
    Remove-Item -Recurse -Force .expo
    Write-Host "✓ .expo folder deleted" -ForegroundColor Green
} else {
    Write-Host "⚠ .expo folder not found" -ForegroundColor Yellow
}

if (Test-Path "node_modules\.cache") {
    Remove-Item -Recurse -Force node_modules\.cache
    Write-Host "✓ node_modules\.cache deleted" -ForegroundColor Green
} else {
    Write-Host "⚠ node_modules\.cache not found" -ForegroundColor Yellow
}

if (Test-Path "android\.gradle") {
    Remove-Item -Recurse -Force android\.gradle
    Write-Host "✓ android\.gradle deleted" -ForegroundColor Green
} else {
    Write-Host "⚠ android\.gradle not found" -ForegroundColor Yellow
}
Write-Host ""

# Step 3: Clean Metro bundler cache
Write-Host "Step 3: Cleaning Metro bundler cache..." -ForegroundColor Yellow
if (Test-Path "$env:LOCALAPPDATA\Temp\metro-*") {
    Remove-Item -Recurse -Force "$env:LOCALAPPDATA\Temp\metro-*"
    Write-Host "✓ Metro cache deleted" -ForegroundColor Green
} else {
    Write-Host "⚠ Metro cache not found" -ForegroundColor Yellow
}
Write-Host ""

# Step 4: Verify React Native Firebase is removed
Write-Host "Step 4: Verifying React Native Firebase is removed..." -ForegroundColor Yellow
$firebaseCheck = Get-Content package.json | Select-String "@react-native-firebase"
if ($firebaseCheck) {
    Write-Host "❌ React Native Firebase packages still found!" -ForegroundColor Red
    Write-Host "Running: npm uninstall @react-native-firebase/* --legacy-peer-deps" -ForegroundColor Yellow
    npm uninstall @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/firestore @react-native-firebase/storage @react-native-firebase/messaging --legacy-peer-deps
} else {
    Write-Host "✓ No React Native Firebase packages found" -ForegroundColor Green
}
Write-Host ""

# Step 5: Clear npm cache
Write-Host "Step 5: Clearing npm cache..." -ForegroundColor Yellow
npm cache clean --force
Write-Host "✓ npm cache cleared" -ForegroundColor Green
Write-Host ""

# Step 6: Reinstall node_modules (optional but recommended)
Write-Host "Step 6: Reinstall node_modules? (This will take time)" -ForegroundColor Yellow
$reinstall = Read-Host "Do you want to delete and reinstall node_modules? (y/n)"
if ($reinstall -eq "y") {
    Write-Host "Removing node_modules..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force node_modules
    Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
    
    Write-Host "Reinstalling dependencies..." -ForegroundColor Yellow
    npm install --legacy-peer-deps
    Write-Host "✓ Dependencies reinstalled" -ForegroundColor Green
} else {
    Write-Host "⚠ Skipped node_modules reinstall" -ForegroundColor Yellow
}
Write-Host ""

# Step 7: Start Expo with clear cache
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "Cleanup Complete!" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. Run: npx expo start --clear" -ForegroundColor White
Write-Host "2. Press 'r' to reload the app when it opens" -ForegroundColor White
Write-Host "3. Test login functionality" -ForegroundColor White
Write-Host ""
Write-Host "If you still see errors, make sure:" -ForegroundColor Yellow
Write-Host "  - Email/Password auth is enabled in Firebase Console" -ForegroundColor White
Write-Host "  - Your test user exists in Firebase Authentication" -ForegroundColor White
Write-Host "  - Check the Metro bundler terminal for specific errors" -ForegroundColor White
Write-Host ""

$startExpo = Read-Host "Start Expo now? (y/n)"
if ($startExpo -eq "y") {
    Write-Host "Starting Expo with clear cache..." -ForegroundColor Green
    npx expo start --clear
}
