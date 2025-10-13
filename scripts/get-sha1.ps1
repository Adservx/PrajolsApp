# Script to extract SHA-1 fingerprint from Android debug keystore
# This is needed for Google Sign-In configuration

Write-Host "🔍 Finding Java keytool..." -ForegroundColor Cyan

# Try to find keytool in common Java locations
$possiblePaths = @(
    "$env:JAVA_HOME\bin\keytool.exe",
    "C:\Program Files\Java\jdk*\bin\keytool.exe",
    "C:\Program Files\Android\Android Studio\jbr\bin\keytool.exe",
    "C:\Program Files\Eclipse Adoptium\jdk*\bin\keytool.exe"
)

$keytoolPath = $null
foreach ($path in $possiblePaths) {
    $resolved = Get-ChildItem $path -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($resolved) {
        $keytoolPath = $resolved.FullName
        break
    }
}

if (-not $keytoolPath) {
    Write-Host "❌ keytool not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please use one of these methods:" -ForegroundColor Yellow
    Write-Host "1. Use Android Studio: Gradle -> app -> Tasks -> android -> signingReport"
    Write-Host "2. Use Gradle command: cd android; .\gradlew signingReport"
    Write-Host ""
    exit 1
}

Write-Host "✅ Found keytool at: $keytoolPath" -ForegroundColor Green
Write-Host ""

# Path to debug keystore
$keystorePath = ".\android\app\debug.keystore"

if (-not (Test-Path $keystorePath)) {
    Write-Host "❌ Debug keystore not found at: $keystorePath" -ForegroundColor Red
    exit 1
}

Write-Host "📱 Extracting SHA-1 fingerprint from debug keystore..." -ForegroundColor Cyan
Write-Host ""

# Extract SHA-1
& $keytoolPath -list -v -keystore $keystorePath -alias androiddebugkey -storepass android -keypass android 2>&1 | Select-String -Pattern "SHA1:", "SHA256:"

Write-Host ""
Write-Host "Next steps:" -ForegroundColor Green
Write-Host "1. Copy the SHA1 value above"
Write-Host "2. Go to Google Cloud Console > Credentials"
Write-Host "3. Create OAuth 2.0 Client ID > Android"
Write-Host "4. Package name: com.prajols.sms"
Write-Host "5. Paste SHA1 fingerprint"
Write-Host ""
