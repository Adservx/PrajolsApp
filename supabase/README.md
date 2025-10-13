# Supabase Database Schema

This directory contains the PostgreSQL database schema for PrajolsApp using Supabase.

## 📁 Files

- **`schema.sql`**: Complete database schema with tables, indexes, triggers, RLS policies, and helper functions

## 🚀 Quick Setup

### Option 1: Supabase Dashboard (Recommended)

1. Go to https://supabase.com/dashboard/project/sfhkchooqiqyzrwkvziz
2. Click **SQL Editor** → **New Query**
3. Copy contents of `schema.sql`
4. Paste and click **Run**
5. Verify tables in **Table Editor**

### Option 2: Supabase CLI

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref sfhkchooqiqyzrwkvziz

# Push the schema
supabase db push
```

## 📊 Database Tables

### Core Tables

1. **users** - User accounts linked to Firebase Authentication
   - Primary key: `id` (UUID)
   - Foreign key: `firebase_uid` → Firebase Auth UID
   - Stores: email, name, role, avatar, etc.

2. **classes** - School classes/sections
   - Links to teachers via `teacher_id`
   - Includes academic year and capacity

3. **students** - Student information
   - Extends `users` table
   - Links to `classes` via `class_id`
   - Stores admission details, parent info, etc.

4. **attendance** - Daily attendance records
   - Links to `students` and `classes`
   - Status: present, absent, late, excused

5. **assignments** - Class assignments and homework
   - Created by teachers for classes
   - Includes due dates and points

6. **assignment_submissions** - Student assignment submissions
   - Links students to assignments
   - Stores grades and feedback

7. **grades** - Exam grades and results
   - Links to students and classes
   - Stores subject-wise marks

8. **announcements** - School-wide announcements
   - Target specific roles
   - Priority levels and expiration

## 🔐 Security

### Row Level Security (RLS)

All tables have RLS enabled. Current policies allow:
- ✅ Read access for authenticated users
- ✅ Full access via service role (for Firebase sync)

**For Production**: Update RLS policies to restrict based on user roles:

```sql
-- Example: Students can only see their own data
CREATE POLICY "Students see own data" ON students
  FOR SELECT
  USING (user_id = auth.uid());
```

### API Keys

- **Anon Key**: Safe for client-side use (configured in `.env`)
- **Service Role Key**: NEVER expose in client code

## 🔄 Schema Updates

When you need to modify the schema:

1. Update `schema.sql`
2. Create a migration file in `supabase/migrations/`
3. Apply migration via Supabase dashboard or CLI

### Migration Example

```sql
-- supabase/migrations/20250112_add_phone_verification.sql
ALTER TABLE users 
ADD COLUMN phone_verified BOOLEAN DEFAULT false;
```

## 📈 Indexes

The schema includes indexes for:
- `users.firebase_uid` (unique, for fast auth lookups)
- `users.email` (unique)
- Foreign key relationships
- Date columns for attendance and assignments

## 🔧 Helper Functions

### `get_user_by_firebase_uid(firebase_uid TEXT)`
Fetches user by Firebase UID.

```sql
SELECT * FROM get_user_by_firebase_uid('firebase-uid-here');
```

### `get_student_details(student_user_id UUID)`
Fetches complete student information with class and user data.

```sql
SELECT * FROM get_student_details('user-uuid-here');
```

## 🧪 Testing

Run the test script to verify setup:

```bash
npx ts-node scripts/test-firebase-supabase.ts
```

## 📚 Documentation

- **Setup Guide**: `../SETUP_DATABASE.md`
- **Integration Guide**: `../FIREBASE_SUPABASE_INTEGRATION.md`
- **Code Examples**: `../examples/supabase-examples.ts`

## 🆘 Common Issues

### "relation does not exist"
**Solution**: Run the `schema.sql` file in Supabase SQL Editor

### "permission denied"
**Solution**: Check RLS policies or temporarily disable for testing:
```sql
ALTER TABLE table_name DISABLE ROW LEVEL SECURITY;
```

### "duplicate key value violates unique constraint"
**Solution**: User already exists. This is normal for the sync system.

## 🔄 Backup & Restore

### Backup
```bash
# Via Supabase dashboard: Settings → Database → Backup
# Or use pg_dump via connection string
```

### Restore
```bash
# Use Supabase dashboard to restore from backup
# Or use psql with connection string
```

## 📊 Database Diagram

```
┌─────────────┐
│    users    │
└──────┬──────┘
       │
       ├──────────────┐
       │              │
   ┌───▼────┐    ┌───▼────┐
   │students│    │teachers│
   └───┬────┘    └───┬────┘
       │             │
       ├─────────────┼───────────┐
       │             │           │
   ┌───▼────┐   ┌───▼────┐  ┌───▼───────┐
   │attendance  │classes │  │assignments│
   └────────┘   └────────┘  └───────────┘
```

---

**Schema Version**: 1.0  
**Last Updated**: October 12, 2025  
**Project**: PrajolsApp School Management System
