-- Migration: Replace Firebase Auth with Supabase Auth
-- This migration updates the schema to use Supabase Auth instead of Firebase Auth

-- Step 1: Create a new column for Supabase Auth user ID
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS auth_user_id UUID;

-- Step 2: Create unique index on auth_user_id
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_auth_user_id ON public.users(auth_user_id);

-- Step 3: Update the users table to make auth_user_id the primary auth reference
-- Keep firebase_uid temporarily for backward compatibility during migration
ALTER TABLE public.users 
ALTER COLUMN firebase_uid DROP NOT NULL;

-- Step 4: Update RLS policies to use Supabase Auth

-- Drop old policies
DROP POLICY IF EXISTS "Users can read own data" ON public.users;
DROP POLICY IF EXISTS "Users can update own data" ON public.users;
DROP POLICY IF EXISTS "Service role full access to users" ON public.users;

-- Create new policies using Supabase Auth
CREATE POLICY "Users can read own data" ON public.users
    FOR SELECT
    USING (auth.uid() = auth_user_id);

CREATE POLICY "Users can update own data" ON public.users
    FOR UPDATE
    USING (auth.uid() = auth_user_id)
    WITH CHECK (auth.uid() = auth_user_id);

CREATE POLICY "Users can insert own data" ON public.users
    FOR INSERT
    WITH CHECK (auth.uid() = auth_user_id);

-- Service role has full access (bypass RLS)
CREATE POLICY "Service role full access" ON public.users
    USING (true)
    WITH CHECK (true);

-- Step 5: Update helper function to use auth_user_id
DROP FUNCTION IF EXISTS public.get_user_by_firebase_uid(TEXT);

CREATE OR REPLACE FUNCTION public.get_user_by_auth_id(auth_id_param UUID)
RETURNS TABLE (
    id UUID,
    auth_user_id UUID,
    email TEXT,
    first_name TEXT,
    last_name TEXT,
    role TEXT,
    phone TEXT,
    avatar TEXT,
    is_active BOOLEAN,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT u.id, u.auth_user_id, u.email, u.first_name, u.last_name, 
           u.role, u.phone, u.avatar, u.is_active, u.created_at, u.updated_at
    FROM public.users u
    WHERE u.auth_user_id = auth_id_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 6: Add function to get current user using Supabase Auth
CREATE OR REPLACE FUNCTION public.get_current_user()
RETURNS TABLE (
    id UUID,
    auth_user_id UUID,
    email TEXT,
    first_name TEXT,
    last_name TEXT,
    role TEXT,
    phone TEXT,
    avatar TEXT,
    is_active BOOLEAN,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT u.id, u.auth_user_id, u.email, u.first_name, u.last_name, 
           u.role, u.phone, u.avatar, u.is_active, u.created_at, u.updated_at
    FROM public.users u
    WHERE u.auth_user_id = auth.uid();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 7: Update RLS policies for other tables to use Supabase Auth

-- Classes policies
DROP POLICY IF EXISTS "Classes are viewable by everyone" ON public.classes;
CREATE POLICY "Classes viewable by authenticated users" ON public.classes
    FOR SELECT
    USING (auth.role() = 'authenticated');

CREATE POLICY "Teachers can manage classes" ON public.classes
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE users.auth_user_id = auth.uid() 
            AND users.role IN ('teacher', 'admin')
        )
    );

-- Students policies  
DROP POLICY IF EXISTS "Students are viewable by authenticated users" ON public.students;
CREATE POLICY "Students viewable by authenticated" ON public.students
    FOR SELECT
    USING (auth.role() = 'authenticated');

-- Attendance policies
DROP POLICY IF EXISTS "Attendance viewable by authenticated users" ON public.attendance;
CREATE POLICY "Attendance viewable by authenticated" ON public.attendance
    FOR SELECT
    USING (auth.role() = 'authenticated');

-- Assignments policies
DROP POLICY IF EXISTS "Assignments viewable by authenticated users" ON public.assignments;
CREATE POLICY "Assignments viewable by authenticated" ON public.assignments
    FOR SELECT
    USING (auth.role() = 'authenticated');

-- Assignment submissions policies
DROP POLICY IF EXISTS "Submissions viewable by authenticated users" ON public.assignment_submissions;
CREATE POLICY "Submissions viewable by authenticated" ON public.assignment_submissions
    FOR SELECT
    USING (auth.role() = 'authenticated');

-- Grades policies
DROP POLICY IF EXISTS "Grades viewable by authenticated users" ON public.grades;
CREATE POLICY "Grades viewable by authenticated" ON public.grades
    FOR SELECT
    USING (auth.role() = 'authenticated');

-- Announcements policies
DROP POLICY IF EXISTS "Published announcements viewable by everyone" ON public.announcements;
CREATE POLICY "Published announcements viewable" ON public.announcements
    FOR SELECT
    USING (is_published = true AND auth.role() = 'authenticated');

-- Step 8: Add comments
COMMENT ON COLUMN public.users.auth_user_id IS 'Supabase Auth user ID (auth.uid())';
COMMENT ON COLUMN public.users.firebase_uid IS 'Legacy Firebase Auth UID (deprecated, kept for migration)';

-- Step 9: Create trigger to automatically set auth_user_id on insert
CREATE OR REPLACE FUNCTION public.set_auth_user_id()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.auth_user_id IS NULL THEN
        NEW.auth_user_id := auth.uid();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS set_auth_user_id_trigger ON public.users;
CREATE TRIGGER set_auth_user_id_trigger
    BEFORE INSERT ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION public.set_auth_user_id();
