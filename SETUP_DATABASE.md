# Database Setup Guide - Quick Start

## 🎯 Goal
Set up Supabase database to work with Firebase Authentication in your PrajolsApp.

## ⏱️ Time Required
5-10 minutes

## 📋 Prerequisites
- Supabase account and project created ✅
- Project credentials configured in `.env` ✅

## 🚀 Setup Steps

### Step 1: Access Supabase SQL Editor

1. Open your browser and go to: https://supabase.com/dashboard/project/sfhkchooqiqyzrwkvziz
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**

### Step 2: Execute Database Schema

1. Open the file `supabase/schema.sql` in your project
2. Copy the entire contents (Ctrl+A, Ctrl+C)
3. Paste into the Supabase SQL Editor
4. Click **Run** (or press Ctrl+Enter)
5. Wait for execution to complete

You should see: `Success. No rows returned`

### Step 3: Verify Tables Created

1. Click on **Table Editor** in the left sidebar
2. You should see these tables:
   - ✅ users
   - ✅ classes
   - ✅ students
   - ✅ attendance
   - ✅ assignments
   - ✅ assignment_submissions
   - ✅ grades
   - ✅ announcements

### Step 4: Test the Integration

Run your app and try to login or register. The user should automatically be created in both Firebase and Supabase.

#### Quick Test Code

```typescript
import { firebaseSupabaseAuth } from './services/firebaseSupabaseAuth';

// Test registration
const result = await firebaseSupabaseAuth.register({
  email: 'test@example.com',
  password: 'testpassword123',
  firstName: 'Test',
  lastName: 'User',
  role: 'student'
});

console.log('Registration successful:', result.user);
```

### Step 5: Verify Data in Supabase

1. Go back to **Table Editor** in Supabase
2. Click on the **users** table
3. You should see your test user with the `firebase_uid` populated

## ✅ Success Indicators

You'll know everything is working when:

1. ✅ All tables are visible in Supabase Table Editor
2. ✅ Users can register/login through your app
3. ✅ User data appears in Supabase `users` table
4. ✅ `firebase_uid` matches the Firebase Auth UID
5. ✅ No errors in console logs

## 🐛 Troubleshooting

### Tables not created
- **Check**: Did the SQL execute without errors?
- **Solution**: Look for error messages in SQL Editor. Fix syntax errors if any.

### User not appearing in Supabase after login
- **Check**: Console logs for errors
- **Solution**: 
  - Verify `.env` has correct Supabase credentials
  - Check RLS policies (should be set to allow operations)
  - Try restarting the app

### "Permission denied" errors
- **Check**: Row Level Security policies
- **Solution**: For development, you can temporarily disable RLS:
  ```sql
  ALTER TABLE users DISABLE ROW LEVEL SECURITY;
  ```
  (Re-enable for production!)

### Cannot connect to Supabase
- **Check**: Internet connection
- **Check**: Supabase project is active
- **Solution**: Verify SUPABASE_URL and SUPABASE_ANON_KEY in `.env`

## 🔄 Re-running Setup

If you need to start fresh:

```sql
-- Drop all tables (CAUTION: This deletes all data!)
DROP TABLE IF EXISTS announcements CASCADE;
DROP TABLE IF EXISTS grades CASCADE;
DROP TABLE IF EXISTS assignment_submissions CASCADE;
DROP TABLE IF EXISTS assignments CASCADE;
DROP TABLE IF EXISTS attendance CASCADE;
DROP TABLE IF EXISTS students CASCADE;
DROP TABLE IF EXISTS classes CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Then re-run the schema.sql file
```

## 📊 Database Structure Overview

```
users (Core user table)
  └─ firebase_uid: Links to Firebase Auth
  
students (Student details)
  └─ user_id: Links to users table
  └─ class_id: Links to classes table
  
attendance (Daily attendance)
  └─ student_id: Links to students
  └─ class_id: Links to classes
  
assignments (Homework/tasks)
  └─ class_id: Links to classes
  
assignment_submissions
  └─ assignment_id: Links to assignments
  └─ student_id: Links to students
  
grades (Exam results)
  └─ student_id: Links to students
  └─ class_id: Links to classes
```

## 🎓 Next Steps

After database setup is complete:

1. **Configure RLS Policies**: Set up proper Row Level Security for production
2. **Create Admin User**: Manually create an admin user in Supabase
3. **Test All Features**: Login, registration, data queries
4. **Set Up Real-time**: Test real-time subscriptions
5. **Deploy**: When ready, use production credentials

## 📚 Additional Resources

- Full documentation: `FIREBASE_SUPABASE_INTEGRATION.md`
- Code examples: `examples/supabase-examples.ts`
- SQL schema: `supabase/schema.sql`

---

**Need Help?**
- Check `FIREBASE_SUPABASE_INTEGRATION.md` for detailed documentation
- Review console logs for specific error messages
- Verify all credentials in `.env` file
