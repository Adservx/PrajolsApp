# Quick Start Guide

## Running the App

### Option 1: Windows Desktop
```bash
flutter run -d windows
```

### Option 2: Android Emulator
```bash
flutter run -d emulator
```

### Option 3: Chrome (Web)
```bash
flutter run -d chrome
```

## First Steps

1. **Launch the app** - You'll see a splash screen with the school icon
2. **Sign Up** - Create a new account with your email and password
3. **Sign In** - Log in with your credentials
4. **Explore the Dashboard** - You'll see 4 main sections:
   - Students
   - Teachers
   - Classes
   - Attendance

## Adding Your First Student

1. Tap on **Students** card from the dashboard
2. Click the **Add Student** floating button
3. Fill in the details:
   - Name (required)
   - Email (required)
   - Phone (optional)
   - Grade (optional)
4. Click **Add**

## Adding Your First Teacher

1. Tap on **Teachers** card from the dashboard
2. Click the **Add Teacher** floating button
3. Fill in the details:
   - Name (required)
   - Email (required)
   - Phone (optional)
   - Subject (optional)
4. Click **Add**

## Creating a Class

1. Tap on **Classes** card from the dashboard
2. Click the **Add Class** floating button
3. Fill in the details:
   - Class Name (required)
   - Grade (required)
   - Section (optional)
4. Click **Add**

## Marking Attendance

1. Tap on **Attendance** card from the dashboard
2. Select a date by tapping the date card at the top
3. For each student, tap one of the status buttons:
   - **Present** (Green)
   - **Absent** (Red)
   - **Late** (Orange)
4. The attendance is saved automatically

## Features

### Search Functionality
- Students and Teachers screens have search bars
- Search by name, email, or subject (for teachers)

### Edit/Delete
- Tap the three-dot menu on any item
- Select **Edit** to modify or **Delete** to remove

### Pull to Refresh
- Pull down on any list to refresh the data

## Troubleshooting

### App won't start?
```bash
flutter clean
flutter pub get
flutter run
```

### Database connection issues?
- Check your internet connection
- Verify Supabase project is active at https://supabase.com

### Authentication errors?
- Make sure you're using a valid email format
- Password must be at least 6 characters

## Support

For issues or questions, check the main README.md file for more details.
