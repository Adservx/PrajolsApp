# Testing Guide

Complete testing checklist for the School Management App.

## Prerequisites

- App running on emulator/device
- Supabase project configured
- Database schema deployed
- At least one admin account created

## Test Suite

### 🔐 Authentication Tests

#### Test 1: User Registration
- [ ] Open app
- [ ] Tap "Don't have an account? Sign Up"
- [ ] Enter valid email (e.g., test@school.com)
- [ ] Enter password (min 6 chars)
- [ ] Confirm password matches
- [ ] Select role: Student
- [ ] Tap "Sign Up"
- [ ] **Expected**: Success alert, redirected to login
- [ ] Login with new credentials
- [ ] **Expected**: Successful login, see dashboard

#### Test 2: Login Validation
- [ ] Enter invalid email format
- [ ] Tap "Sign In"
- [ ] **Expected**: Firebase error for invalid email
- [ ] Enter correct email, wrong password
- [ ] **Expected**: "Invalid login credentials" error
- [ ] Enter correct credentials
- [ ] **Expected**: Successful login

#### Test 3: Role-Based Access
- [ ] Create 3 accounts (admin, teacher, student)
- [ ] Login as **Student**
- [ ] **Expected**: Dashboard shows only "View Assignments"
- [ ] Logout and login as **Teacher**
- [ ] **Expected**: Dashboard shows "Manage Students", "Manage Classes", "View Assignments"
- [ ] Logout and login as **Admin**
- [ ] **Expected**: Dashboard shows all features + "Seed Sample Data"

#### Test 4: Session Persistence
- [ ] Login to app
- [ ] Close app completely
- [ ] Reopen app
- [ ] **Expected**: Still logged in, dashboard visible

#### Test 5: Logout
- [ ] From dashboard, tap "Logout"
- [ ] Confirm logout
- [ ] **Expected**: Redirected to login screen
- [ ] Try navigating back
- [ ] **Expected**: Cannot access protected routes

---

### 👨‍🎓 Student Management Tests (Admin/Teacher)

#### Test 6: Seed Sample Data
- [ ] Login as admin
- [ ] Dashboard → "Seed Sample Data"
- [ ] **Expected**: Alert showing "5 students, 3 classes, 6 assignments"
- [ ] Navigate to Students
- [ ] **Expected**: See 5 students listed

#### Test 7: View Students List
- [ ] Navigate to "Manage Students"
- [ ] **Expected**: See list of students with name, email, grade, enrollment date
- [ ] **Expected**: Search bar at top
- [ ] **Expected**: Floating + button at bottom

#### Test 8: Search Students
- [ ] In Students screen, type "John" in search
- [ ] **Expected**: Only students with "John" in name shown
- [ ] Type "grade 10"
- [ ] **Expected**: Only grade 10 students shown
- [ ] Clear search
- [ ] **Expected**: All students shown again

#### Test 9: Add New Student
- [ ] Tap floating + button
- [ ] Fill form:
  - Name: "Test Student"
  - Email: "test.student@school.com"
  - Grade: 11
  - Enrollment Date: "2024-10-01"
- [ ] Tap "Add Student"
- [ ] **Expected**: Success alert, return to list
- [ ] **Expected**: New student appears in list
- [ ] **Expected**: Student sorted alphabetically

#### Test 10: Add Student Validation
- [ ] Tap + button
- [ ] Leave name empty
- [ ] Tap "Add Student"
- [ ] **Expected**: "Please fill in all required fields" error
- [ ] Enter grade "15"
- [ ] **Expected**: "Grade must be between 1 and 12" error

#### Test 11: Edit Student
- [ ] Tap pencil icon on any student
- [ ] Change name to "Updated Name"
- [ ] Change grade to 12
- [ ] Tap "Update Student"
- [ ] **Expected**: Success alert
- [ ] **Expected**: List shows updated info

#### Test 12: Delete Student
- [ ] Tap trash icon on any student
- [ ] **Expected**: Confirmation alert with student name
- [ ] Tap "Cancel"
- [ ] **Expected**: Student still in list
- [ ] Tap trash icon again
- [ ] Tap "Delete"
- [ ] **Expected**: Success alert
- [ ] **Expected**: Student removed from list

---

### 📚 Class Management Tests (Admin/Teacher)

#### Test 13: View Classes List
- [ ] Navigate to "Manage Classes"
- [ ] **Expected**: See list of classes with name and subject
- [ ] **Expected**: Floating + button

#### Test 14: Add New Class
- [ ] Tap floating + button
- [ ] Fill form:
  - Class Name: "Physics 101"
  - Subject: "Physics"
- [ ] Tap "Add Class"
- [ ] **Expected**: Success alert, return to list
- [ ] **Expected**: New class appears in list

#### Test 15: Add Class Validation
- [ ] Tap + button
- [ ] Leave fields empty
- [ ] Tap "Add Class"
- [ ] **Expected**: "Please fill in all required fields" error

#### Test 16: Delete Class
- [ ] Tap trash icon on any class
- [ ] Confirm deletion
- [ ] **Expected**: Success alert, class removed

---

### 📝 Assignments Tests (All Roles)

#### Test 17: View Assignments
- [ ] Navigate to "View Assignments"
- [ ] **Expected**: See list of assignments
- [ ] **Expected**: Each shows title, description, class info, due date
- [ ] **Expected**: Overdue assignments have red "Overdue" chip

#### Test 18: Overdue Detection
- [ ] Check assignment with due date in past
- [ ] **Expected**: Red "Overdue" badge visible
- [ ] **Expected**: Due date text is red
- [ ] Check assignment with future due date
- [ ] **Expected**: No overdue badge
- [ ] **Expected**: Due date text is gray

---

### ⚡ Real-time Sync Tests

#### Test 19: Real-time Student Updates
**Setup**: Two devices/emulators with same or different accounts

- [ ] Device 1: Navigate to Students list
- [ ] Device 2: Navigate to Students list
- [ ] Device 2: Add a new student
- [ ] Device 1: **Expected**: New student appears instantly without refresh
- [ ] Device 1: Edit a student
- [ ] Device 2: **Expected**: Changes appear instantly

#### Test 20: Real-time Class Updates
- [ ] Device 1: Navigate to Classes
- [ ] Device 2: Navigate to Classes
- [ ] Device 2: Add new class
- [ ] Device 1: **Expected**: New class appears instantly

#### Test 21: Real-time Assignment Updates
- [ ] Device 1: Navigate to Assignments
- [ ] Device 2: Use Supabase dashboard to insert assignment directly:
  ```sql
  INSERT INTO assignments (title, description, due_date, class_id)
  VALUES ('Test Assignment', 'Test description', '2025-12-01', 
          (SELECT id FROM classes LIMIT 1));
  ```
- [ ] Device 1: **Expected**: New assignment appears instantly

---

### 🔒 Security & RLS Tests

#### Test 22: Student Role Restrictions
- [ ] Login as **Student**
- [ ] Try to access "Manage Students" via deep link or manual navigation
- [ ] **Expected**: Should not see option or get permission error
- [ ] Check if student can view assignments
- [ ] **Expected**: Can view assignments

#### Test 23: Data Isolation (via Supabase Dashboard)
- [ ] Create student account in app
- [ ] Login to Supabase dashboard → SQL Editor
- [ ] Run:
  ```sql
  SELECT * FROM students WHERE user_id = 'student-user-id';
  ```
- [ ] **Expected**: Student can only see their own record via RLS
- [ ] As admin, verify you can see all records

---

### 🌐 Network & Error Handling Tests

#### Test 24: Offline Handling
- [ ] Login to app
- [ ] Enable airplane mode
- [ ] Try to add a student
- [ ] **Expected**: Error alert about network failure
- [ ] Disable airplane mode
- [ ] Try again
- [ ] **Expected**: Successful operation

#### Test 25: Invalid Data Handling
- [ ] In Supabase dashboard, manually set a student's grade to 99
- [ ] Open app, view students
- [ ] **Expected**: App doesn't crash, shows grade 99
- [ ] Try to edit that student and save
- [ ] **Expected**: Validation catches invalid grade

#### Test 26: Session Expiry
- [ ] Login to app
- [ ] In Supabase dashboard: **Authentication** → **Users** → Find your user → Click "..." → "Sign out user"
- [ ] In app, try to perform an action (add student)
- [ ] **Expected**: Session error, user logged out

---

### 📱 UI/UX Tests

#### Test 27: Loading States
- [ ] Login with fresh account
- [ ] Navigate to Students
- [ ] **Expected**: Loading spinner while fetching
- [ ] After data loads, **Expected**: List appears

#### Test 28: Empty States
- [ ] Create new Supabase project or clear all data
- [ ] Login to app
- [ ] Navigate to Students
- [ ] **Expected**: "No students found" message with hint
- [ ] **Expected**: "Add your first student using the + button"

#### Test 29: Form Validation Feedback
- [ ] Go to Add Student
- [ ] Enter grade "abc" (non-numeric)
- [ ] **Expected**: Numeric keyboard prevents this OR validation error on submit

#### Test 30: Navigation Flow
- [ ] Dashboard → Students → Add Student → Cancel
- [ ] **Expected**: Back to Students list
- [ ] Students → Edit Student → Update
- [ ] **Expected**: Back to Students list
- [ ] Test back button on all screens
- [ ] **Expected**: Proper navigation hierarchy

---

## Performance Tests

#### Test 31: Large Dataset
- [ ] In Supabase, insert 100 students via SQL
- [ ] Open Students list
- [ ] **Expected**: Loads within 2 seconds
- [ ] Scroll through list
- [ ] **Expected**: Smooth scrolling, no lag

#### Test 32: Real-time with Multiple Changes
- [ ] Open app on 3 devices
- [ ] Simultaneously add students from all devices
- [ ] **Expected**: All changes sync correctly
- [ ] **Expected**: No duplicate entries
- [ ] **Expected**: No missing entries

---

## Regression Tests (Run after any code changes)

- [ ] All auth tests (1-5)
- [ ] Add and delete student (9, 12)
- [ ] Real-time sync (19)
- [ ] Role-based access (3)

---

## Bug Report Template

If you find a bug:

```
**Bug**: [Brief description]
**Steps to Reproduce**:
1. 
2. 
3. 
**Expected**: 
**Actual**: 
**Device**: [iOS/Android, Version]
**Account Role**: [admin/teacher/student]
**Logs**: [Copy any error messages from console]
```

---

## Test Results Summary

| Category | Tests | Passed | Failed |
|----------|-------|--------|--------|
| Authentication | 5 | | |
| Student Management | 7 | | |
| Class Management | 4 | | |
| Assignments | 2 | | |
| Real-time Sync | 3 | | |
| Security & RLS | 2 | | |
| Network & Errors | 3 | | |
| UI/UX | 4 | | |
| Performance | 2 | | |
| **TOTAL** | **32** | | |

---

**Last Tested**: [Date]  
**Tester**: [Name]  
**Version**: 1.0.0  
**Environment**: [Development/Staging/Production]
