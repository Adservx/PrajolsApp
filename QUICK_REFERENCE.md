# Quick Reference - Firebase Auth + Supabase DB

## 🔑 Authentication

```typescript
import { authService } from './services/authService';

// Login
await authService.login({ email, password });

// Register
await authService.register({ email, password, firstName, lastName, role });

// Logout
await authService.logout();

// Get current user
await authService.getCurrentUser();

// Google Sign-In
await authService.googleSignIn(idToken);

// Forgot password
await authService.forgotPassword(email);

// Update profile
await authService.updateUserProfile({ firstName, phone });

// Auth state listener
const unsubscribe = authService.onAuthStateChanged((user) => {
  console.log('User:', user);
});
```

## 💾 Database Operations

```typescript
import { supabase } from './services/supabase';

// SELECT
const { data, error } = await supabase
  .from('table_name')
  .select('*')
  .eq('column', 'value');

// INSERT
await supabase.from('table_name').insert({ ... });

// UPDATE
await supabase.from('table_name').update({ ... }).eq('id', id);

// DELETE
await supabase.from('table_name').delete().eq('id', id);

// JOIN
await supabase
  .from('students')
  .select('*, users(*), classes(*)');

// ORDER BY
await supabase.from('table').select('*').order('created_at', { ascending: false });

// LIMIT
await supabase.from('table').select('*').limit(10);

// FILTER
await supabase.from('table').select('*').gte('age', 18);
```

## 📡 Real-time Subscriptions

```typescript
const subscription = supabase
  .channel('my-channel')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'table_name' },
    (payload) => console.log('Change:', payload)
  )
  .subscribe();

// Unsubscribe
subscription.unsubscribe();
```

## 🗂️ Common Queries

### Get all students with class info
```typescript
const { data } = await supabase
  .from('students')
  .select(`
    *,
    users:user_id (first_name, last_name, email),
    classes:class_id (name, grade)
  `);
```

### Mark attendance
```typescript
await supabase.from('attendance').insert({
  student_id: studentId,
  class_id: classId,
  date: new Date().toISOString(),
  status: 'present',
  marked_by: teacherId
});
```

### Get student's grades
```typescript
const { data } = await supabase
  .from('grades')
  .select('*')
  .eq('student_id', studentId)
  .order('exam_date', { ascending: false });
```

### Create assignment
```typescript
await supabase.from('assignments').insert({
  class_id: classId,
  teacher_id: teacherId,
  title: 'Math Homework',
  description: 'Complete exercises 1-10',
  subject: 'Mathematics',
  due_date: '2025-10-20T23:59:59Z',
  max_points: 100,
  is_published: true
});
```

## 🎯 Table Names

- `users` - User accounts
- `classes` - School classes
- `students` - Student details
- `attendance` - Attendance records
- `assignments` - Homework/tasks
- `assignment_submissions` - Student submissions
- `grades` - Exam results
- `announcements` - School notices

## 🔍 Filter Operators

| Operator | Supabase Method | Example |
|----------|----------------|---------|
| = | `.eq()` | `.eq('id', 1)` |
| != | `.neq()` | `.neq('status', 'deleted')` |
| > | `.gt()` | `.gt('age', 18)` |
| >= | `.gte()` | `.gte('marks', 50)` |
| < | `.lt()` | `.lt('price', 100)` |
| <= | `.lte()` | `.lte('quantity', 10)` |
| LIKE | `.like()` | `.like('name', '%john%')` |
| IN | `.in()` | `.in('role', ['admin', 'teacher'])` |
| IS NULL | `.is()` | `.is('deleted_at', null)` |

## 🔐 Environment Variables

```env
# Firebase
FIREBASE_API_KEY=...
FIREBASE_AUTH_DOMAIN=...
FIREBASE_PROJECT_ID=...

# Supabase
SUPABASE_URL=https://sfhkchooqiqyzrwkvziz.supabase.co
SUPABASE_ANON_KEY=...
```

## 📊 Database Relationships

```
users
  └─ firebase_uid (links to Firebase Auth)
  
students
  ├─ user_id → users.id
  └─ class_id → classes.id
  
attendance
  ├─ student_id → students.id
  └─ class_id → classes.id
  
assignments
  ├─ class_id → classes.id
  └─ teacher_id → users.id
```

## 🛠️ Useful Scripts

```bash
# Test integration
npx ts-node scripts/test-firebase-supabase.ts

# Setup Supabase (adds creds to .env)
powershell scripts/setup-supabase.ps1
```

## 🆘 Common Errors

| Error | Solution |
|-------|----------|
| "relation does not exist" | Run `supabase/schema.sql` |
| "permission denied" | Check RLS policies |
| "duplicate key" | User already exists (ok) |
| "network error" | Check internet/credentials |

## 📚 Documentation

- **Full Guide**: `FIREBASE_SUPABASE_INTEGRATION.md`
- **Setup**: `SETUP_DATABASE.md`
- **Summary**: `INTEGRATION_SUMMARY.md`
- **Examples**: `examples/supabase-examples.ts`

## 🌐 Dashboards

- **Supabase**: https://supabase.com/dashboard/project/sfhkchooqiqyzrwkvziz
- **Firebase**: https://console.firebase.google.com/project/school-management-system-d0eb5

---

**Keep this file handy for quick reference! 📌**
