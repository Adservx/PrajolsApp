# Quick Start Guide - School Management System

Get up and running in 10 minutes!

## ⚡ Quick Setup

### 1. Clone & Install (2 minutes)
```bash
cd PrajolsApp
npm install
```

### 2. Firebase Setup (3 minutes)
```bash
# Go to https://console.firebase.google.com
# Create new project: "School-Management-System"
# Enable: Authentication (Email/Password, Google)
# Enable: Firestore Database
# Download google-services.json to project root
```

Update `src/services/firebase.ts`:
```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

### 3. Run the App (2 minutes)
```bash
# Start development server
npm start

# Or run directly on Android
npm run android
```

### 4. Create Test User (3 minutes)

**Option A: Using Firebase Console**
1. Go to Firebase Console → Authentication
2. Add user manually:
   - Email: `admin@school.com`
   - Password: `Test@123`

3. Go to Firestore Database
4. Create collection `users`
5. Add document:
```json
{
  "id": "[copy user UID from Authentication]",
  "email": "admin@school.com",
  "firstName": "Admin",
  "lastName": "User",
  "role": "admin",
  "createdAt": [Timestamp now],
  "updatedAt": [Timestamp now],
  "isActive": true
}
```

**Option B: Using Registration Screen**
1. Launch app
2. Click "Sign Up"
3. Fill registration form
4. Default role: Student

## 🎯 Testing Different Roles

### Test as Admin
```
Email: admin@school.com
Password: Test@123
Features: Full access, analytics, user management
```

### Test as Teacher
```
Email: teacher@school.com
Password: Test@123
Features: Classes, attendance, grades, assignments
```

### Test as Student
```
Email: student@school.com
Password: Test@123
Features: Schedule, grades, assignments, fees
```

### Test as Parent
```
Email: parent@school.com
Password: Test@123
Features: Children progress, fees, communications
```

## 📱 Key Features to Try

### 1. Dashboard Navigation
- Login with test user
- Explore role-specific dashboard
- Check statistics and overview

### 2. Student Management (Admin/Teacher)
- Navigate to Students tab
- View student list
- Search for students
- Click on student to view details

### 3. Attendance (Teacher)
- Go to Classes tab
- Select a class
- Mark attendance
- View attendance history

### 4. Grades (Teacher/Student)
- Teachers: Enter grades for students
- Students: View grades and GPA

### 5. Assignments
- Teachers: Create new assignment
- Students: View and submit assignments

### 6. Fee Payment (Student/Parent)
- View fee summary
- Make payment (demo mode)
- View payment history

### 7. Notifications
- Click notification icon
- View recent notifications
- Mark as read

### 8. Settings
- Edit profile
- Toggle theme
- Change preferences
- Logout

## 🔧 Quick Configuration

### API Configuration
Edit `src/services/api.ts`:
```typescript
const API_BASE_URL = 'http://localhost:3000/api/v1'; // Your backend URL
```

### Payment Gateway (Optional)
Edit `src/services/paymentService.ts`:
```typescript
const KHALTI_PUBLIC_KEY = 'test_public_key_...';
const KHALTI_SECRET_KEY = 'test_secret_key_...';
```

### Theme Customization
Edit `src/utils/theme.ts`:
```typescript
export const lightTheme = {
  colors: {
    primary: '#4F46E5', // Change primary color
    // ... other colors
  }
};
```

## 📊 Sample Data (Optional)

### Create Sample Students
In Firestore, add to `students` collection:

**Student 1:**
```json
{
  "studentId": "STU001",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@school.com",
  "grade": "10",
  "section": "A",
  "guardianName": "Parent Doe",
  "guardianPhone": "+977 9812345678",
  "enrollmentDate": [Timestamp],
  "createdAt": [Timestamp],
  "updatedAt": [Timestamp]
}
```

**Student 2:**
```json
{
  "studentId": "STU002",
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.smith@school.com",
  "grade": "10",
  "section": "A",
  "guardianName": "Parent Smith",
  "guardianPhone": "+977 9823456789",
  "enrollmentDate": [Timestamp],
  "createdAt": [Timestamp],
  "updatedAt": [Timestamp]
}
```

## 🚀 Building for Device

### Development Build
```bash
# Build APK for testing
eas build --platform android --profile development

# Wait for build to complete (10-15 minutes)
# Download APK from provided link
# Install on Android device
```

### Preview Build
```bash
# Optimized build for beta testing
eas build --platform android --profile preview

# Share with testers
```

## 🐛 Troubleshooting

### App won't start
```bash
# Clear cache and restart
npm start -- --clear

# Reinstall dependencies
rm -rf node_modules
npm install
```

### Firebase connection error
- Verify `google-services.json` is in root directory
- Check Firebase config in `src/services/firebase.ts`
- Ensure Firebase services are enabled

### Build fails
```bash
# Clear Expo cache
expo start -c

# Clear EAS build cache
eas build --clear-cache
```

### Can't login
- Verify user exists in Firebase Authentication
- Check user role in Firestore `users` collection
- Verify email/password is correct

## 📚 Next Steps

1. **Explore Screens**: Navigate through all screens and features
2. **Customize UI**: Modify colors, fonts, and layouts
3. **Add Backend**: Connect to your API server
4. **Test Payments**: Integrate Khalti/IME Pay
5. **Add Features**: Extend functionality as needed
6. **Deploy**: Follow DEPLOYMENT.md guide

## 💡 Pro Tips

- Use **React Native Debugger** for better debugging
- Enable **Expo Dev Client** for faster development
- Use **Expo Go** app for quick testing
- Install **React DevTools** for component inspection
- Use **Redux DevTools** for state management debugging

## 📖 Documentation

- [Full README](./README_SMS.md) - Complete documentation
- [Firebase Setup](./FIREBASE_SETUP.md) - Detailed Firebase guide
- [Deployment Guide](./DEPLOYMENT.md) - Production deployment

## 🆘 Getting Help

- Check documentation files
- Review code comments
- Search GitHub issues
- Contact support team

## 🎉 You're Ready!

You now have a fully functional School Management System running locally. Start exploring and customizing to fit your needs!

---

**Happy Coding! 🚀**
