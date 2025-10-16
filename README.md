# School Management Mobile App

A production-ready React Native mobile application for school management built with Expo, Supabase, and TypeScript.

## 🚀 Features

- **Authentication**: Email/password auth with role-based access (Admin, Teacher, Student)
- **Student Management**: Full CRUD operations for student records
- **Class Management**: Create and manage classes with teacher assignments
- **Assignments**: View and manage assignments with due date tracking
- **Real-time Updates**: Live synchronization across all connected devices
- **Role-Based Access Control**: Different views and permissions based on user role
- **Sample Data Seeding**: Quick setup with demo data

## 📱 Tech Stack

- **Framework**: React Native with Expo SDK 54
- **Navigation**: Expo Router (file-based routing)
- **Backend**: Supabase (Auth, Database, Real-time)
- **UI Components**: React Native Paper
- **Language**: TypeScript
- **State Management**: React Hooks
- **Date Handling**: date-fns
- **Validation**: Zod (schemas included)

## 🛠️ Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- npm or yarn package manager
- Expo CLI (`npm install -g expo-cli`)
- A Supabase account (free tier works)
- iOS Simulator (Mac) or Android Emulator (or use Expo Go on physical device)

## 📦 Installation & Setup

### 1. Clone and Install Dependencies

```bash
# Navigate to project directory
cd PrajolsApp

# Install dependencies
npm install
```

### 2. Configure Supabase

#### A. Create Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Create a new project (choose a region close to you)
3. Wait for the database to initialize (~2 minutes)

#### B. Setup Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Create a new query
3. Copy and paste the entire contents of `supabase/schema.sql`
4. Click **Run** to execute the SQL

This will create:
- All required tables (users, students, classes, assignments)
- Row Level Security (RLS) policies
- Indexes for performance
- Real-time subscriptions

#### C. Get API Credentials

1. Go to **Settings** → **API** in your Supabase dashboard
2. Copy the **Project URL** and **anon/public** key
3. Create a `.env` file in the project root:

```bash
cp .env.example .env
```

4. Edit `.env` and add your credentials:

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Start Development Server

```bash
# Start Expo development server
npm start

# Or for specific platforms
npm run android  # Android
npm run ios      # iOS
npm run web      # Web browser
```

### 4. Run on Device/Emulator

- **Physical Device**: Install Expo Go app, scan QR code
- **iOS Simulator**: Press `i` in terminal
- **Android Emulator**: Press `a` in terminal

## 🎯 Usage Guide

### First Time Setup

1. **Register an Account**
   - Launch the app
   - Tap "Don't have an account? Sign Up"
   - Enter email, password, and select role (recommend starting with **Admin**)
   - Tap "Sign Up"

2. **Sign In**
   - Use the credentials you just created
   - You'll be redirected to the Dashboard

3. **Seed Sample Data** (Admin only)
   - On the Dashboard, scroll to "Developer Tools"
   - Tap "Seed Sample Data"
   - This creates:
     - 5 sample students
     - 3 classes
     - 6 assignments (2 per class)

### Testing Features

#### As Admin/Teacher:

1. **Manage Students**
   - Dashboard → "Manage Students"
   - Add new student with the + button
   - Edit by tapping pencil icon
   - Delete with trash icon
   - Search students by name/email/grade

2. **Manage Classes**
   - Dashboard → "Manage Classes"
   - Add new class with subject
   - Delete classes

3. **View Assignments**
   - Dashboard → "View Assignments"
   - See all assignments with due dates
   - Overdue assignments are highlighted

#### As Student:

- View assignments for enrolled classes
- See class information

### Testing Real-time Sync

1. Open the app on two devices/simulators
2. Sign in to both with the same or different accounts
3. On device 1: Add a new student or assignment
4. Watch it appear instantly on device 2 ✨

## 🏗️ Project Structure

```
PrajolsApp/
├── app/                          # Expo Router file-based routing
│   ├── (auth)/                   # Auth group (login, register)
│   │   ├── _layout.tsx
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── (protected)/              # Protected routes (require auth)
│   │   ├── dashboard.tsx
│   │   ├── students/
│   │   │   ├── index.tsx        # List students
│   │   │   ├── add.tsx          # Add student form
│   │   │   └── [id]/
│   │   │       └── edit.tsx     # Edit student form
│   │   ├── classes/
│   │   │   ├── index.tsx        # List classes
│   │   │   └── add.tsx          # Add class form
│   │   └── assignments/
│   │       └── index.tsx        # List assignments
│   ├── _layout.tsx              # Root layout with auth provider
│   └── index.tsx                # Entry point
├── lib/
│   └── supabase.ts              # Supabase client config & types
├── hooks/
│   └── useAuth.ts               # Authentication hook
├── utils/
│   └── seedData.ts              # Sample data seeding function
├── supabase/
│   └── schema.sql               # Database schema & RLS policies
├── .env.example                 # Environment variables template
├── app.json                     # Expo configuration
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript config
└── README.md                    # This file
```

## 🔐 Security Features

- **Row Level Security (RLS)**: Database-level access control
- **Secure Storage**: Credentials stored in SecureStore (native) or AsyncStorage (web)
- **Role-Based Access**: Different permissions for admin/teacher/student
- **Auth State Management**: Automatic session handling and refresh

## 🧪 Testing Checklist

- [ ] Register new account (each role)
- [ ] Login with email/password
- [ ] Seed sample data (admin only)
- [ ] Add new student
- [ ] Edit student details
- [ ] Delete student
- [ ] Search students
- [ ] Add new class
- [ ] Delete class
- [ ] View assignments
- [ ] Check overdue assignment highlighting
- [ ] Test real-time sync (2 devices)
- [ ] Logout
- [ ] Test role-based visibility

## 🐛 Troubleshooting

### Common Issues

**Problem**: "Unable to resolve module @supabase/supabase-js"
```bash
# Solution: Clear cache and reinstall
rm -rf node_modules
npm install
npx expo start -c
```

**Problem**: "Network request failed" when signing in
- Check `.env` file has correct Supabase URL and key
- Ensure no trailing spaces in `.env` values
- Restart Expo server after changing `.env`

**Problem**: RLS policies blocking requests
- Verify you ran the entire `schema.sql` in Supabase
- Check user role is set correctly in the `users` table
- In Supabase dashboard: **Authentication** → **Users** → check user details

**Problem**: Real-time not working
- Verify `ALTER PUBLICATION` commands ran successfully in schema.sql
- Check Supabase dashboard: **Database** → **Replication** → ensure tables are enabled

### Database Issues

If you need to reset the database:

1. Go to Supabase SQL Editor
2. Drop all tables:
```sql
DROP TABLE IF EXISTS public.assignments CASCADE;
DROP TABLE IF EXISTS public.classes CASCADE;
DROP TABLE IF EXISTS public.students CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;
DROP TYPE IF EXISTS user_role;
```
3. Re-run `supabase/schema.sql`

## 📝 Environment Variables

Required environment variables (in `.env`):

| Variable | Description | Example |
|----------|-------------|---------|
| `EXPO_PUBLIC_SUPABASE_URL` | Your Supabase project URL | `https://abc123.supabase.co` |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous/public key | `eyJhbGc...` |

⚠️ **Important**: All Expo environment variables must be prefixed with `EXPO_PUBLIC_`

## 🚢 Deployment

### Build for Production

```bash
# Configure EAS Build
npx eas-cli@latest build:configure

# Build for Android
npx eas-cli@latest build --platform android

# Build for iOS
npx eas-cli@latest build --platform ios
```

### Environment Variables in Production

Set production environment variables in `eas.json` or Expo dashboard.

## 📚 Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [Supabase Documentation](https://supabase.com/docs)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [Expo Router](https://docs.expo.dev/router/introduction/)

## 🤝 Support

For issues or questions:
1. Check Troubleshooting section above
2. Review Supabase logs in dashboard
3. Check Expo development server terminal output

## 📄 License

MIT License - feel free to use this project for learning or production.

---

**Built with ❤️ using Expo, Supabase, and TypeScript**
