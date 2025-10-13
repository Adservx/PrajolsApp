# How to Apply the Supabase Auth Migration

This guide shows you how to apply the database migration using the Supabase MCP server.

## Prerequisites

- Supabase MCP server configured and connected
- Access to your Supabase project (sfhkchooqiqyzrwkvziz)

## Step 1: Read the Migration Script

The migration script is located at:
```
supabase/migrations/001_migrate_to_supabase_auth.sql
```

## Step 2: Apply Migration Using Supabase MCP Server

### Option A: Using the MCP Apply Migration Tool

Use the Supabase MCP server to apply the migration:

```
# The migration adds auth_user_id column and updates RLS policies
Project ID: sfhkchooqiqyzrwkvziz
Migration Name: migrate_to_supabase_auth
```

### Option B: Using Supabase CLI

If you have Supabase CLI installed:

```bash
# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref sfhkchooqiqyzrwkvziz

# Apply all migrations
supabase db push
```

### Option C: Using SQL Editor in Dashboard

1. Go to: https://supabase.com/dashboard/project/sfhkchooqiqyzrwkvziz/sql
2. Click "New Query"
3. Copy contents from `supabase/migrations/001_migrate_to_supabase_auth.sql`
4. Paste and run the query

## Step 3: Verify Migration

After applying the migration, verify it worked:

```sql
-- Check if auth_user_id column exists
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'users' 
AND column_name = 'auth_user_id';

-- Check RLS policies
SELECT schemaname, tablename, policyname, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'users';

-- Test the new function
SELECT * FROM public.get_current_user();
```

## Step 4: Test Authentication

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the app:**
   ```bash
   npm start
   ```

3. **Test flows:**
   - Create a new account (sign up)
   - Sign in with the account
   - Check that user data is saved correctly
   - Update profile
   - Sign out

## What the Migration Does

### 1. Adds New Column
```sql
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS auth_user_id UUID;
```

### 2. Updates Constraints
- Makes `firebase_uid` nullable (for backward compatibility)
- Adds unique constraint on `auth_user_id`
- Creates indexes for performance

### 3. Updates RLS Policies
- Replaces service role policies with `auth.uid()` policies
- Enables proper row-level security
- Adds policies for INSERT, SELECT, UPDATE operations

### 4. Creates Helper Functions
- `get_user_by_auth_id()` - Get user by Supabase Auth ID
- `get_current_user()` - Get current authenticated user
- Automatic trigger to set `auth_user_id` on insert

### 5. Updates Other Table Policies
- Classes, Students, Attendance, etc.
- All now use `auth.role() = 'authenticated'` checks

## Rollback (If Needed)

If something goes wrong, you can rollback by:

```sql
-- Remove the new column (if needed)
ALTER TABLE public.users DROP COLUMN IF EXISTS auth_user_id;

-- Restore old RLS policies (refer to original schema.sql)
```

However, it's recommended to test on a development branch first.

## Common Issues

### Issue: Migration fails due to existing data
**Solution:** The migration is designed to work with existing data. The `firebase_uid` column is kept for compatibility.

### Issue: RLS policies deny access
**Solution:** Verify that:
1. Users are authenticated via Supabase Auth
2. The `auth_user_id` is correctly set in the users table
3. RLS is enabled but policies are correctly configured

### Issue: Functions don't exist
**Solution:** Make sure you ran ALL the SQL in the migration script, not just parts of it.

## Next Steps

After successful migration:

1. ✅ Test all authentication flows
2. ✅ Verify user data is syncing correctly
3. ✅ Check that RLS policies work as expected
4. ✅ Test role-based access control
5. ✅ Update any custom SQL queries in your app
6. ✅ Remove Firebase dependencies: `npm uninstall firebase`
7. ✅ Clean up old Firebase files (optional)

## Support

If you need help:
- Check `SUPABASE_AUTH_MIGRATION.md` for detailed migration guide
- Review Supabase docs: https://supabase.com/docs
- Check project logs in Supabase dashboard

---

**Project ID:** sfhkchooqiqyzrwkvziz  
**Region:** ap-south-1  
**Migration Script:** `supabase/migrations/001_migrate_to_supabase_auth.sql`
