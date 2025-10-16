# Quick Setup Guide

## Step 1: Install Dependencies

```bash
cd PrajolsApp
npm install
```

## Step 2: Create Supabase Project

1. Visit https://app.supabase.com
2. Click "New Project"
3. Fill in:
   - **Name**: SchoolManagement
   - **Database Password**: (save this!)
   - **Region**: (choose closest to you)
4. Wait ~2 minutes for provisioning

## Step 3: Run Database Schema

1. In Supabase dashboard → **SQL Editor**
2. Click "New Query"
3. Copy entire contents of `supabase/schema.sql`
4. Paste and click **Run**
5. You should see: "Success. No rows returned"

## Step 4: Get API Keys

1. Supabase dashboard → **Settings** → **API**
2. Copy:
   - **Project URL** (e.g., https://abc123.supabase.co)
   - **anon public** key (long string starting with eyJhbG...)

## Step 5: Configure Environment

```bash
# Copy template
cp .env.example .env

# Edit .env file and paste your values:
EXPO_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## Step 6: Start App

```bash
npm start
```

Choose platform:
- Press **`a`** for Android emulator
- Press **`i`** for iOS simulator
- Scan QR code with **Expo Go** app for physical device

## Step 7: First Login

1. App opens → Tap "Don't have an account? Sign Up"
2. Enter:
   - Email: admin@school.com
   - Password: password123
   - Role: **Admin**
3. Tap "Sign Up" → then "OK"
4. Login with same credentials

## Step 8: Seed Sample Data

1. After login → Dashboard
2. Scroll to "Developer Tools"
3. Tap "Seed Sample Data"
4. Tap "OK" on success alert

## ✅ You're Done!

Navigate through:
- **Manage Students** → See 5 sample students
- **Manage Classes** → See 3 sample classes
- **View Assignments** → See 6 sample assignments

## Test Real-time Sync

1. Open app on second device/emulator
2. Login with same account
3. On device 1: Add a new student
4. Watch it appear on device 2 instantly!

## Troubleshooting

**App won't start?**
```bash
npx expo start -c  # Clear cache
```

**"Unable to fetch data"?**
- Check `.env` file has correct values (no spaces)
- Restart Expo server after editing `.env`
- Verify schema.sql ran successfully in Supabase

**Can't sign up?**
- Check Supabase email settings: **Authentication** → **Providers** → Email enabled
- For testing, disable email confirmation: **Authentication** → **Providers** → Email → Turn off "Confirm email"

**RLS errors?**
- Re-run entire `schema.sql` in Supabase SQL Editor
- Check users table has your account with correct role

Need help? Check full documentation in `README.md`
