# Supabase Setup Script for PrajolsApp
# This script adds Supabase configuration to your .env file

Write-Host "Supabase Setup Script" -ForegroundColor Cyan
Write-Host ""

# Check if .env exists
if (-Not (Test-Path ".env")) {
    Write-Host ".env file not found. Creating from .env.example..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host ".env file created!" -ForegroundColor Green
} else {
    Write-Host ".env file found!" -ForegroundColor Green
}

# Check if Supabase config already exists
$envContent = Get-Content ".env" -Raw
if ($envContent -match "SUPABASE_URL") {
    Write-Host "Supabase configuration already exists in .env" -ForegroundColor Yellow
    Write-Host "Configuration updated in .env.example - please manually update .env if needed" -ForegroundColor Yellow
    exit
}

# Supabase configuration
$supabaseUrl = "SUPABASE_URL=https://sfhkchooqiqyzrwkvziz.supabase.co"
$supabaseKey = "SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNmaGtjaG9vcWlxeXpyd2t2eml6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAxMDA4MDYsImV4cCI6MjA3NTY3NjgwNn0.ZIc8weSMSeN51M2vUpnHsKs_q-XdPkkfHgWUE6ipBeg"

# Add Supabase configuration
Add-Content -Path ".env" -Value "`n# Supabase Configuration"
Add-Content -Path ".env" -Value $supabaseUrl
Add-Content -Path ".env" -Value $supabaseKey
Write-Host "Supabase configuration added to .env!" -ForegroundColor Green

Write-Host ""
Write-Host "Supabase setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. Import supabase client in your code" -ForegroundColor White
Write-Host "  2. Read SUPABASE_SETUP.md for usage examples" -ForegroundColor White
Write-Host "  3. Set up your database schema in Supabase Dashboard" -ForegroundColor White
Write-Host ""
Write-Host "Documentation: See SUPABASE_SETUP.md" -ForegroundColor Cyan
Write-Host ""
