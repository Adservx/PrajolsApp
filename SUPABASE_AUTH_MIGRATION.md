# Migration Guide: Firebase Auth → Supabase Auth

This guide explains the migration from Firebase Authentication to Supabase Authentication completed on your PrajolsApp project.

## 🎯 Overview

**Before:** Firebase Auth + Supabase Database  
**After:** Supabase Auth + Supabase Database (Full Supabase Stack)

## ✅ What Changed

### 1. **Authentication Service**
- **Removed:** `src/services/firebaseSupabaseAuth.ts` (Firebase Auth)
- **Removed:** `src/services/firebase.ts` (Firebase SDK initialization)
- **Created:** `src/services/supabaseAuth.ts` (New Supabase Auth service)
- **Updated:** `src/services/authService.ts` (Now uses Supabase Auth)

### 2. **Database Schema**
- **Changed:** `users` table now uses `auth_user_id` (UUID) instead of `firebase_uid` (TEXT)
- **Updated:** All RLS policies to use `auth.uid()` instead of service role workarounds
- **Added:** Migration script: `supabase/migrations/001_migrate_to_supabase_auth.sql`
- **Kept:** `firebase_uid` column temporarily for backward compatibility

### 3. **Dependencies**
- **Removed:** `firebase` package from `package.json`
- **Kept:** `@supabase/supabase-js` (already present)

### 4. **Configuration**
- **Removed:** Firebase configuration from `.env.example`
- **Kept:** Supabase configuration (URL and Anon Key)
- **Removed:** Firebase-specific scripts from `package.json`

### 5. **Files to Clean Up (Optional)**
These files are now obsolete but kept for reference:
- `.firebaserc`
- `firebase.json`
- `firestore.rules`
- `firestore.indexes.json`
- `database.rules.json`
- `google-services.json`
- `FIREBASE_*.md` documentation files

## 🚀 Migration Steps

### Step 1: Apply Database Migration

Run the migration script to update your Supabase database schema:

```bash
# Using Supabase CLI
supabase db push

# Or apply the migration file directly
psql -h db.sfhkchooqiqyzrwkvziz.supabase.co -U postgres -d postgres -f supabase/migrations/001_migrate_to_supabase_auth.sql
```

### Step 2: Install Dependencies

Remove Firebase and install fresh dependencies:

```bash
# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Or just remove firebase
npm uninstall firebase
```

### Step 3: Update Environment Variables

Create your `.env` file from the example:

```bash
npm run setup
# or
cp .env.example .env
```

Verify your Supabase credentials in `.env`:
```env
SUPABASE_URL=https://sfhkchooqiqyzrwkvziz.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
```

### Step 4: Configure Supabase Auth

Enable authentication methods in your Supabase dashboard:

1. Go to: https://supabase.com/dashboard/project/sfhkchooqiqyzrwkvziz/auth/providers
2. Enable **Email** provider
3. (Optional) Enable **Google OAuth** if needed
4. Configure email templates if desired

### Step 5: Test Authentication

Test the new authentication flow:

```bash
npm start
```

Try:
- ✅ Sign up with new account
- ✅ Sign in with existing account  
- ✅ Password reset
- ✅ Profile updates
- ✅ Sign out

## 🔄 Migrating Existing Users

If you have existing users in Firebase Auth, you'll need to migrate them:

### Option 1: User Re-registration (Recommended for Small User Base)
1. Users sign up again with Supabase Auth
2. Old Firebase data remains untouched
3. New `auth_user_id` links to Supabase Auth

### Option 2: Manual Migration (For Larger User Base)
1. Export users from Firebase Auth
2. Create Supabase Auth users programmatically
3. Update `users` table with new `auth_user_id` values
4. Map old `firebase_uid` to new `auth_user_id`

### Option 3: Dual Auth Temporarily
1. Keep both auth systems running
2. Gradually migrate users as they log in
3. Eventually deprecate Firebase Auth

## 📚 Key Differences

### Authentication Methods

**Firebase Auth:**
```typescript
import { signInWithEmailAndPassword } from 'firebase/auth';
await signInWithEmailAndPassword(auth, email, password);
```

**Supabase Auth:**
```typescript
import { supabase } from './supabase';
await supabase.auth.signInWithPassword({ email, password });
```

### User ID Reference

**Firebase Auth:**
- User ID: String (e.g., "abc123xyz")
- Database field: `firebase_uid TEXT`

**Supabase Auth:**
- User ID: UUID (e.g., "550e8400-e29b-41d4-a716-446655440000")
- Database field: `auth_user_id UUID`

### Auth State Listener

**Firebase Auth:**
```typescript
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User signed in
  }
});
```

**Supabase Auth:**
```typescript
supabase.auth.onAuthStateChange((event, session) => {
  if (session?.user) {
    // User signed in
  }
});
```

### Row Level Security (RLS)

**Firebase Auth:**
- Used service role for most operations
- Limited RLS with custom claims

**Supabase Auth:**
- Native RLS with `auth.uid()`
- Built-in role-based access control
- More secure by default

```sql
-- Supabase RLS Policy Example
CREATE POLICY "Users can read own data" ON users
    FOR SELECT
    USING (auth.uid() = auth_user_id);
```

## 🎨 API Changes

The `authService` API remains the same, so your UI code doesn't need changes:

```typescript
// These still work exactly the same!
await authService.login({ email, password });
await authService.register({ email, password, ... });
await authService.logout();
await authService.getCurrentUser();
await authService.forgotPassword(email);
```

## 🔐 Security Improvements

### Benefits of Supabase Auth:

1. **Native RLS Integration**
   - Automatic user context in database queries
   - No need for service role workarounds
   - More granular access control

2. **Built-in Features**
   - Email verification
   - Password reset flows
   - Session management
   - Multi-factor authentication (MFA)
   - OAuth providers (Google, GitHub, etc.)

3. **Better Developer Experience**
   - Single SDK for auth + database
   - Automatic token refresh
   - Type-safe client
   - Built-in session storage

4. **Cost Efficiency**
   - No separate Firebase costs
   - All features in one platform
   - Better free tier limits

## 🐛 Troubleshooting

### Issue: "No user logged in"
**Solution:** Clear app storage and cache, then restart the app
```bash
# For Expo
expo start -c
```

### Issue: "Email not confirmed"
**Solution:** Check Supabase dashboard → Auth → Users to manually confirm emails, or disable email confirmation:
- Go to Auth Settings
- Uncheck "Enable email confirmations"

### Issue: "Invalid JWT"
**Solution:** 
1. Verify your `SUPABASE_ANON_KEY` in `.env`
2. Check token expiration settings in Supabase dashboard
3. Clear cached tokens

### Issue: "RLS policy violation"
**Solution:** Verify RLS policies are correctly applied:
```sql
-- Check if user can read their data
SELECT * FROM users WHERE auth_user_id = auth.uid();
```

## 📊 Migration Checklist

- [x] Created new Supabase Auth service (`supabaseAuth.ts`)
- [x] Updated `authService.ts` to use Supabase Auth
- [x] Created database migration script
- [x] Updated `schema.sql` with new auth_user_id column
- [x] Updated RLS policies to use `auth.uid()`
- [x] Removed Firebase dependencies from `package.json`
- [x] Updated `.env.example` to remove Firebase config
- [ ] Apply database migration to production
- [ ] Test all authentication flows
- [ ] Migrate existing users (if any)
- [ ] Update CI/CD pipelines (remove Firebase references)
- [ ] Clean up Firebase-related files (optional)
- [ ] Update team documentation

## 🔗 Resources

- **Supabase Auth Docs:** https://supabase.com/docs/guides/auth
- **Supabase Dashboard:** https://supabase.com/dashboard/project/sfhkchooqiqyzrwkvziz
- **RLS Guide:** https://supabase.com/docs/guides/auth/row-level-security
- **Auth Helpers:** https://supabase.com/docs/guides/auth/auth-helpers

## 📞 Support

If you encounter issues during migration:

1. Check Supabase logs in the dashboard
2. Review the migration SQL script for errors
3. Verify all environment variables are set correctly
4. Test with a fresh user account first
5. Consult Supabase documentation or community

## 🎉 Benefits After Migration

✅ **Unified Stack:** Single platform for auth + database  
✅ **Better Security:** Native RLS with auth.uid()  
✅ **Lower Costs:** No Firebase Auth billing  
✅ **More Features:** MFA, OAuth, email templates, etc.  
✅ **Better DX:** Single SDK, better TypeScript support  
✅ **Scalability:** Supabase handles millions of users  

---

**Migration Status:** ✅ Complete  
**Version:** 2.0.0  
**Date:** October 2025
