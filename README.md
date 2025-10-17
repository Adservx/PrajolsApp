# School Management App

A modern Flutter school management application with Supabase backend for authentication and database management.

## Features

- **Authentication**: Secure sign-up and sign-in with Supabase Auth
- **Student Management**: Add, edit, delete, and search students
- **Teacher Management**: Manage teacher profiles with subjects
- **Class Management**: Create and organize classes by grade and section
- **Attendance Tracking**: Mark daily attendance (Present/Absent/Late) for students
- **Modern UI**: Clean, responsive design with Material 3

## Tech Stack

- **Frontend**: Flutter 3.9+
- **Backend**: Supabase (PostgreSQL database + Authentication)
- **State Management**: Provider
- **UI**: Material 3, Google Fonts

## Database Schema

The app uses the following Supabase tables:

- `students` - Student information (name, email, phone, grade)
- `teachers` - Teacher profiles (name, email, phone, subject)
- `classes` - Class information (name, grade, section)
- `attendance` - Daily attendance records (student_id, date, status, notes)

## Supabase Configuration

**Project Details:**
- Project ID: `kbnuxtxahkybfjzbwrdk`
- Project Name: `school-fdb`
- Region: `ap-south-1` (Mumbai)
- URL: `https://kbnuxtxahkybfjzbwrdk.supabase.co`

Configuration is stored in `lib/config/supabase_config.dart`

## Getting Started

### Prerequisites

- Flutter SDK 3.9 or higher
- Dart SDK
- Android Studio / VS Code with Flutter extensions
- Active Supabase project (already configured)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   flutter pub get
   ```

3. Run the app:
   ```bash
   flutter run
   ```

### First Time Setup

1. Launch the app
2. Click "Sign Up" to create a new account
3. Enter your email and password (minimum 6 characters)
4. After signing up, sign in with your credentials
5. Start managing students, teachers, classes, and attendance!

## Project Structure

```
lib/
├── config/
│   └── supabase_config.dart      # Supabase configuration
├── models/
│   ├── student.dart               # Student data model
│   ├── teacher.dart               # Teacher data model
│   ├── class_model.dart           # Class data model
│   └── attendance.dart            # Attendance data model
├── services/
│   ├── auth_service.dart          # Authentication service
│   ├── student_service.dart       # Student CRUD operations
│   ├── teacher_service.dart       # Teacher CRUD operations
│   ├── class_service.dart         # Class CRUD operations
│   └── attendance_service.dart    # Attendance CRUD operations
├── screens/
│   ├── splash_screen.dart         # Initial loading screen
│   ├── login_screen.dart          # Login/Sign-up screen
│   ├── home_screen.dart           # Dashboard with navigation
│   ├── students_screen.dart       # Student management
│   ├── teachers_screen.dart       # Teacher management
│   ├── classes_screen.dart        # Class management
│   └── attendance_screen.dart     # Attendance tracking
└── main.dart                      # App entry point
```

## Features Overview

### Student Management
- View all students in a searchable list
- Add new students with name, email, phone, and grade
- Edit existing student information
- Delete students
- Search by name or email

### Teacher Management
- Manage teacher profiles
- Assign subjects to teachers
- Search and filter teachers
- Full CRUD operations

### Class Management
- Create classes with grade and section
- Organize students by class
- Edit and delete classes

### Attendance Tracking
- Select any date to mark attendance
- Mark students as Present, Absent, or Late
- Visual status indicators
- Update attendance records easily

## Dependencies

```yaml
dependencies:
  supabase_flutter: ^2.5.6      # Supabase client
  provider: ^6.1.2               # State management
  google_fonts: ^6.2.1           # Custom fonts
  flutter_svg: ^2.0.10+1         # SVG support
  intl: ^0.19.0                  # Date formatting
  shared_preferences: ^2.2.3     # Local storage
```

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is for educational purposes.
