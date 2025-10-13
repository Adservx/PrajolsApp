# Supabase Setup Guide

## 🚀 Overview

This guide will help you set up and use Supabase in the PrajolsApp React Native application.

## 📋 Prerequisites

- Node.js and npm installed
- Expo CLI installed
- Access to your Supabase project

## ✅ Setup Completed

The following setup steps have been completed:

1. ✅ Installed `@supabase/supabase-js` package
2. ✅ Created Supabase client configuration (`src/services/supabase.ts`)
3. ✅ Added Supabase credentials to `.env.example`

## 🔧 Configuration

### Your Supabase Project Details

- **Project URL**: `https://sfhkchooqiqyzrwkvziz.supabase.co`
- **Anon/Public Key**: Configured in environment variables

### Environment Variables

Your Supabase credentials have been added to `.env.example`. Make sure to copy them to your `.env` file:

```bash
# Supabase Configuration
SUPABASE_URL=https://sfhkchooqiqyzrwkvziz.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNmaGtjaG9vcWlxeXpyd2t2eml6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAxMDA4MDYsImV4cCI6MjA3NTY3NjgwNn0.ZIc8weSMSeN51M2vUpnHsKs_q-XdPkkfHgWUE6ipBeg
```

## 📦 Package Installed

```json
"@supabase/supabase-js": "^2.x.x"
```

## 🔨 Usage Examples

### 1. Import Supabase Client

```typescript
import { supabase } from '../services/supabase';
```

### 2. Authentication

#### Sign Up
```typescript
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123',
});
```

#### Sign In
```typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123',
});
```

#### Sign Out
```typescript
const { error } = await supabase.auth.signOut();
```

#### Get Current User
```typescript
const { data: { user } } = await supabase.auth.getUser();
```

### 3. Database Operations

#### Insert Data
```typescript
const { data, error } = await supabase
  .from('your_table')
  .insert([
    { column1: 'value1', column2: 'value2' }
  ]);
```

#### Query Data
```typescript
const { data, error } = await supabase
  .from('your_table')
  .select('*')
  .eq('column', 'value');
```

#### Update Data
```typescript
const { data, error } = await supabase
  .from('your_table')
  .update({ column1: 'new_value' })
  .eq('id', 1);
```

#### Delete Data
```typescript
const { data, error } = await supabase
  .from('your_table')
  .delete()
  .eq('id', 1);
```

### 4. Real-time Subscriptions

```typescript
const subscription = supabase
  .channel('your-channel')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'your_table' },
    (payload) => {
      console.log('Change received!', payload);
    }
  )
  .subscribe();

// Unsubscribe when done
subscription.unsubscribe();
```

### 5. Storage (File Upload)

#### Upload File
```typescript
const { data, error } = await supabase.storage
  .from('your-bucket')
  .upload('file-path.png', file);
```

#### Download File
```typescript
const { data, error } = await supabase.storage
  .from('your-bucket')
  .download('file-path.png');
```

#### Get Public URL
```typescript
const { data } = supabase.storage
  .from('your-bucket')
  .getPublicUrl('file-path.png');
```

## 🎯 Next Steps

1. **Update your .env file**: Copy the credentials from `.env.example` to `.env`
2. **Set up your database schema** in Supabase Dashboard
3. **Configure Row Level Security (RLS)** policies for your tables
4. **Create storage buckets** if you need file storage
5. **Test the connection** by importing and using the supabase client

## 📚 Supabase Dashboard

Access your Supabase project dashboard:
- URL: https://supabase.com/dashboard/project/sfhkchooqiqyzrwkvziz

## 🔐 Security Best Practices

1. **Never commit your `.env` file** to version control
2. Use **Row Level Security (RLS)** policies on all tables
3. The **anon key** is safe to use in client-side code
4. Keep your **service role key** (if you have one) secure and never expose it to clients
5. Set up proper **authentication** before going to production

## 🆘 Troubleshooting

### Connection Issues
- Verify your Supabase project URL and API key
- Check your internet connection
- Ensure your Supabase project is active

### Authentication Issues
- Check if email confirmation is required in your Supabase auth settings
- Verify password requirements
- Check auth error messages for specific issues

### Database Issues
- Verify table names and column names match your queries
- Check RLS policies aren't blocking your queries
- Use the Supabase dashboard to test queries directly

## 📖 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Supabase Database](https://supabase.com/docs/guides/database)
- [Supabase Storage](https://supabase.com/docs/guides/storage)

## 🤝 Integration with Existing Firebase

Your app currently uses Firebase. You can:
1. Migrate gradually from Firebase to Supabase
2. Use both services side-by-side
3. Keep Firebase for specific features (e.g., FCM notifications)

The Firebase configuration is still available in `src/services/firebase.ts`.

---

**Setup completed on**: October 12, 2025  
**Supabase Client Version**: Latest compatible with React Native/Expo
