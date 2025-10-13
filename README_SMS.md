# School Management System (SMS)

A comprehensive, enterprise-grade School Management System built with React Native and Expo for Android platforms.

## 🚀 Features

### Core Features
- **Multi-Role Authentication**: Admin, Teacher, Student, and Parent with role-based dashboards
- **Student Management**: Complete CRUD operations with enrollment tracking
- **Attendance System**: QR code scanning and real-time updates
- **Grade Management**: Grade entry, GPA calculation, and report cards
- **Assignment Management**: Create, submit, and grade assignments
- **Fee Management**: Invoice generation, online payments (Khalti/IME Pay)
- **Real-time Chat**: Class-based and direct messaging
- **Push Notifications**: Announcements, grades, attendance alerts
- **Analytics Dashboard**: KPIs, trends, and data visualization

### Technical Features
- **TypeScript**: Full type safety
- **Redux Toolkit**: State management with persistence
- **Firebase**: Backend services (Auth, Firestore, Storage)
- **React Navigation**: Role-based routing
- **Formik & Yup**: Form validation
- **Responsive UI**: Material Design with dark/light mode
- **Offline Support**: AsyncStorage integration
- **Payment Integration**: Khalti and IME Pay for Nepal
- **Testing**: Jest unit tests and Detox E2E tests

## 📁 Project Structure

```
PrajolsApp/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Avatar.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── EmptyState.tsx
│   │   └── StatCard.tsx
│   ├── screens/           # Screen components
│   │   ├── auth/          # Authentication screens
│   │   ├── admin/         # Admin screens
│   │   ├── teacher/       # Teacher screens
│   │   ├── student/       # Student screens
│   │   └── parent/        # Parent screens
│   ├── navigation/        # Navigation configuration
│   │   ├── AppNavigator.tsx
│   │   ├── AdminNavigator.tsx
│   │   ├── TeacherNavigator.tsx
│   │   ├── StudentNavigator.tsx
│   │   └── ParentNavigator.tsx
│   ├── store/             # Redux store
│   │   ├── index.ts
│   │   ├── hooks.ts
│   │   └── slices/
│   │       ├── authSlice.ts
│   │       ├── studentSlice.ts
│   │       ├── attendanceSlice.ts
│   │       └── notificationSlice.ts
│   ├── services/          # API and Firebase services
│   │   ├── api.ts
│   │   ├── firebase.ts
│   │   ├── authService.ts
│   │   ├── studentService.ts
│   │   ├── attendanceService.ts
│   │   ├── notificationService.ts
│   │   └── paymentService.ts
│   ├── utils/             # Utility functions
│   │   ├── dateUtils.ts
│   │   ├── validation.ts
│   │   ├── helpers.ts
│   │   └── theme.ts
│   └── types/             # TypeScript types
│       └── index.ts
├── assets/                # Images, icons, fonts
├── App.js                 # Main application entry
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript configuration
├── app.json               # Expo configuration
└── eas.json               # EAS Build configuration
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v18 or later)
- npm or yarn
- Expo CLI
- EAS CLI
- Android Studio (for Android development)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Firebase Configuration
1. Create a Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication, Firestore, and Storage
3. Download `google-services.json` and place it in the project root
4. Update Firebase config in `src/services/firebase.ts`:
```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

### Step 3: Payment Gateway Configuration
Update credentials in `src/services/paymentService.ts`:

**Khalti:**
```typescript
const KHALTI_PUBLIC_KEY = 'YOUR_KHALTI_PUBLIC_KEY';
const KHALTI_SECRET_KEY = 'YOUR_KHALTI_SECRET_KEY';
```

**IME Pay:**
```typescript
const IMEPAY_MERCHANT_CODE = 'YOUR_IMEPAY_MERCHANT_CODE';
const IMEPAY_MODULE = 'YOUR_IMEPAY_MODULE';
const IMEPAY_USERNAME = 'YOUR_IMEPAY_USERNAME';
const IMEPAY_PASSWORD = 'YOUR_IMEPAY_PASSWORD';
```

### Step 4: API Configuration
Update the API base URL in `src/services/api.ts`:
```typescript
const API_BASE_URL = 'https://your-backend-api.com/api/v1';
```

## 🏃 Running the App

### Development Mode
```bash
# Start Expo development server
npm start

# Run on Android
npm run android

# Run on iOS (macOS only)
npm run ios
```

### Testing
```bash
# Run unit tests
npm test

# Run tests with coverage
npm run test:coverage

# Type checking
npm run type-check

# Lint
npm run lint
```

## 📦 Building for Production

### Using EAS Build
```bash
# Login to Expo account
eas login

# Configure EAS Build (first time only)
eas build:configure

# Build APK for Android
npm run eas:build:preview

# Build for Production
npm run eas:build:production
```

## 👥 User Roles & Permissions

### Admin
- Full system access
- Manage students, teachers, and parents
- View analytics and generate reports
- Configure system settings
- Manage fees and payments

### Teacher
- Manage assigned classes
- Mark attendance (QR code scanning)
- Enter grades and assignments
- Communicate with students/parents
- View class analytics

### Student
- View class schedule and timetable
- Check grades and assignments
- Submit assignments
- Make fee payments
- Chat with teachers

### Parent
- Track child's progress
- View grades and attendance
- Manage fee payments
- Communicate with teachers
- Receive notifications

## 🔐 Security Features

- **JWT Authentication**: Secure token-based auth
- **Firebase Auth**: Google Sign-In support
- **Encrypted Storage**: Expo SecureStore for sensitive data
- **2FA Support**: SMS/Email verification
- **Role-based Access Control**: Granular permissions
- **Data Encryption**: Secure data transmission

## 📱 Key Screens

### Authentication
- Login (Email/Password, Google Sign-In)
- Registration
- Forgot Password
- 2FA Verification

### Admin Dashboard
- Overview statistics
- Quick actions
- Recent activity
- Student/Teacher management
- Analytics

### Teacher Dashboard
- Today's classes
- Attendance tracking
- Grade management
- Assignment creation

### Student Dashboard
- Class schedule
- Grades and GPA
- Assignments
- Fee payment

### Parent Dashboard
- Children overview
- Progress tracking
- Fee management
- Communications

## 🎨 UI/UX Features

- **Modern Design**: Material Design principles
- **Dark/Light Mode**: Theme switching
- **Animations**: Smooth transitions with Reanimated
- **Responsive Layout**: Adapts to different screen sizes
- **Accessibility**: Screen reader support
- **Offline Mode**: Works without internet connection

## 📊 Analytics & Reporting

- Student enrollment trends
- Attendance rates
- Grade distribution
- Revenue tracking
- Top performers
- Export to CSV/PDF

## 🔔 Notification Types

- New assignment posted
- Grade published
- Fee payment reminder
- Attendance alert
- Announcement broadcast
- Event reminder

## 💳 Payment Integration

### Supported Methods
- **Khalti**: Digital wallet for Nepal
- **IME Pay**: Mobile payment
- **Cash**: Offline payment tracking
- **Bank Transfer**: Manual verification

### Features
- Invoice generation
- Payment history
- Receipt download
- Automated reminders

## 🌐 API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/refresh` - Refresh token
- `POST /auth/logout` - Logout

### Students
- `GET /students` - Get all students
- `GET /students/:id` - Get student by ID
- `POST /students` - Create student
- `PUT /students/:id` - Update student
- `DELETE /students/:id` - Delete student

### Attendance
- `GET /attendance` - Get attendance records
- `POST /attendance` - Mark attendance
- `POST /attendance/bulk` - Bulk mark attendance

### Grades
- `GET /grades` - Get grades
- `POST /grades` - Submit grade
- `GET /grades/report/:studentId` - Get report card

### Payments
- `POST /payments/khalti/initiate` - Initiate Khalti payment
- `POST /payments/khalti/verify` - Verify Khalti payment
- `POST /payments/imepay/initiate` - Initiate IME Pay payment
- `GET /payments/history/:studentId` - Payment history

## 🧪 Testing

### Unit Tests
Located in `__tests__/` directories alongside source files.

```bash
npm test -- LoginScreen.test.tsx
```

### E2E Tests
Using Detox for end-to-end testing.

```bash
# Build the app for testing
detox build --configuration android.release

# Run E2E tests
detox test --configuration android.release
```

## 🚀 CI/CD

### GitHub Actions Workflow
```yaml
# .github/workflows/build.yml
name: Build and Test

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test
      - name: Type check
        run: npm run type-check
      - name: Lint
        run: npm run lint
      - name: Build
        run: eas build --platform android --non-interactive
```

## 📈 Performance Optimization

- **Code Splitting**: Lazy loading screens
- **Image Optimization**: Compressed assets
- **Caching**: Redux Persist for offline data
- **Memoization**: React.memo for components
- **Virtualized Lists**: FlatList for large datasets

## 🔧 Troubleshooting

### Common Issues

**Issue: Firebase not working**
- Ensure `google-services.json` is in the root directory
- Check Firebase config in `src/services/firebase.ts`
- Verify Firebase services are enabled

**Issue: Payment gateway errors**
- Verify API keys are correct
- Check network connectivity
- Ensure proper URL configuration

**Issue: Build fails**
- Clear cache: `expo start -c`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check EAS Build logs for specific errors

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support, email support@schoolms.com or create an issue in the repository.

## 🎓 Credits

Built with ❤️ using React Native, Expo, Firebase, and other amazing open-source libraries.
