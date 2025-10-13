-- Supabase Database Schema for PrajolsApp
-- Supabase Auth + Supabase Database Integration
-- 
-- This schema is designed to work with Supabase Authentication
-- The auth_user_id field links to Supabase Auth users (auth.uid())

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    auth_user_id UUID UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('admin', 'teacher', 'student', 'parent')),
    phone TEXT,
    avatar TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    firebase_uid TEXT UNIQUE -- Legacy field, kept for migration purposes
);

-- Create index on auth_user_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_auth_user_id ON public.users(auth_user_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for users table
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- ==============================================
-- ADDITIONAL TABLES FOR SCHOOL MANAGEMENT
-- ==============================================

-- Classes table
CREATE TABLE IF NOT EXISTS public.classes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    grade TEXT NOT NULL,
    section TEXT,
    teacher_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    academic_year TEXT NOT NULL,
    capacity INTEGER DEFAULT 40,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_classes_teacher ON public.classes(teacher_id);
CREATE INDEX IF NOT EXISTS idx_classes_academic_year ON public.classes(academic_year);

-- Students table (extends users)
CREATE TABLE IF NOT EXISTS public.students (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
    class_id UUID REFERENCES public.classes(id) ON DELETE SET NULL,
    roll_number TEXT,
    admission_date DATE,
    parent_name TEXT,
    parent_phone TEXT,
    parent_email TEXT,
    address TEXT,
    date_of_birth DATE,
    blood_group TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_students_user ON public.students(user_id);
CREATE INDEX IF NOT EXISTS idx_students_class ON public.students(class_id);

-- Attendance table
CREATE TABLE IF NOT EXISTS public.attendance (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
    class_id UUID REFERENCES public.classes(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('present', 'absent', 'late', 'excused')),
    marked_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
    remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(student_id, date)
);

CREATE INDEX IF NOT EXISTS idx_attendance_student ON public.attendance(student_id);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON public.attendance(date);
CREATE INDEX IF NOT EXISTS idx_attendance_class ON public.attendance(class_id);

-- Assignments table
CREATE TABLE IF NOT EXISTS public.assignments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    class_id UUID REFERENCES public.classes(id) ON DELETE CASCADE,
    teacher_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT,
    subject TEXT NOT NULL,
    due_date TIMESTAMP WITH TIME ZONE,
    max_points INTEGER DEFAULT 100,
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_assignments_class ON public.assignments(class_id);
CREATE INDEX IF NOT EXISTS idx_assignments_teacher ON public.assignments(teacher_id);
CREATE INDEX IF NOT EXISTS idx_assignments_due_date ON public.assignments(due_date);

-- Assignment submissions
CREATE TABLE IF NOT EXISTS public.assignment_submissions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    assignment_id UUID REFERENCES public.assignments(id) ON DELETE CASCADE,
    student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
    submission_text TEXT,
    attachment_url TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    grade INTEGER,
    feedback TEXT,
    graded_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
    graded_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(assignment_id, student_id)
);

CREATE INDEX IF NOT EXISTS idx_submissions_assignment ON public.assignment_submissions(assignment_id);
CREATE INDEX IF NOT EXISTS idx_submissions_student ON public.assignment_submissions(student_id);

-- Grades table
CREATE TABLE IF NOT EXISTS public.grades (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
    class_id UUID REFERENCES public.classes(id) ON DELETE CASCADE,
    subject TEXT NOT NULL,
    exam_type TEXT NOT NULL,
    marks_obtained DECIMAL(5,2) NOT NULL,
    total_marks DECIMAL(5,2) NOT NULL,
    exam_date DATE,
    remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_grades_student ON public.grades(student_id);
CREATE INDEX IF NOT EXISTS idx_grades_class ON public.grades(class_id);

-- Announcements table
CREATE TABLE IF NOT EXISTS public.announcements (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    target_role TEXT[], -- Array of roles to target
    priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_announcements_author ON public.announcements(author_id);
CREATE INDEX IF NOT EXISTS idx_announcements_published ON public.announcements(is_published);

-- ==============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

-- Users table policies
-- Using Supabase Auth with auth.uid()

-- Allow users to read their own data
CREATE POLICY "Users can read own data" ON public.users
    FOR SELECT
    USING (auth.uid() = auth_user_id);

-- Allow authenticated users to update their own data
CREATE POLICY "Users can update own data" ON public.users
    FOR UPDATE
    USING (auth.uid() = auth_user_id)
    WITH CHECK (auth.uid() = auth_user_id);

-- Allow users to insert their own data (during signup)
CREATE POLICY "Users can insert own data" ON public.users
    FOR INSERT
    WITH CHECK (auth.uid() = auth_user_id);

-- Service role has full access (bypass RLS)
CREATE POLICY "Service role full access to users" ON public.users
    USING (true)
    WITH CHECK (true);

-- Classes policies
CREATE POLICY "Classes are viewable by everyone" ON public.classes
    FOR SELECT
    USING (true);

-- Students policies
CREATE POLICY "Students are viewable by authenticated users" ON public.students
    FOR SELECT
    USING (true);

-- Attendance policies
CREATE POLICY "Attendance viewable by authenticated users" ON public.attendance
    FOR SELECT
    USING (true);

-- Assignments policies
CREATE POLICY "Assignments viewable by authenticated users" ON public.assignments
    FOR SELECT
    USING (true);

-- Assignment submissions policies
CREATE POLICY "Submissions viewable by authenticated users" ON public.assignment_submissions
    FOR SELECT
    USING (true);

-- Grades policies
CREATE POLICY "Grades viewable by authenticated users" ON public.grades
    FOR SELECT
    USING (true);

-- Announcements policies
CREATE POLICY "Published announcements viewable by everyone" ON public.announcements
    FOR SELECT
    USING (is_published = true);

-- ==============================================
-- HELPER FUNCTIONS
-- ==============================================

-- Function to get user by Supabase Auth UID
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

-- Function to get current user using Supabase Auth
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

-- Function to get student details with user info
CREATE OR REPLACE FUNCTION public.get_student_details(student_user_id UUID)
RETURNS TABLE (
    student_id UUID,
    user_id UUID,
    email TEXT,
    first_name TEXT,
    last_name TEXT,
    class_id UUID,
    class_name TEXT,
    roll_number TEXT,
    phone TEXT,
    parent_name TEXT,
    parent_phone TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT s.id, s.user_id, u.email, u.first_name, u.last_name,
           s.class_id, c.name, s.roll_number, u.phone, s.parent_name, s.parent_phone
    FROM public.students s
    JOIN public.users u ON s.user_id = u.id
    LEFT JOIN public.classes c ON s.class_id = c.id
    WHERE s.user_id = student_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==============================================
-- COMMENTS
-- ==============================================

COMMENT ON TABLE public.users IS 'User accounts linked to Supabase Authentication';
COMMENT ON COLUMN public.users.auth_user_id IS 'Supabase Auth user ID (auth.uid())';
COMMENT ON COLUMN public.users.firebase_uid IS 'Legacy Firebase Auth UID (deprecated)';
COMMENT ON TABLE public.classes IS 'School classes/sections';
COMMENT ON TABLE public.students IS 'Student information extending users table';
COMMENT ON TABLE public.attendance IS 'Daily attendance records';
COMMENT ON TABLE public.assignments IS 'Class assignments and homework';
COMMENT ON TABLE public.assignment_submissions IS 'Student assignment submissions';
COMMENT ON TABLE public.grades IS 'Student grades and exam results';
COMMENT ON TABLE public.announcements IS 'School-wide announcements';

-- ==============================================
-- SAMPLE DATA (Optional - comment out if not needed)
-- ==============================================

-- Insert sample admin user (update auth_user_id with actual Supabase Auth UID after first login)
-- INSERT INTO public.users (auth_user_id, email, first_name, last_name, role, is_active)
-- VALUES ('REPLACE_WITH_SUPABASE_AUTH_UID', 'admin@school.com', 'Admin', 'User', 'admin', true)
-- ON CONFLICT (auth_user_id) DO NOTHING;
