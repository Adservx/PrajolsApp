# School Management System 🎓

A comprehensive, enterprise-grade School Management System built with React Native and Expo for Android platforms. Features role-based access control, real-time updates, payment integration, and complete academic management.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React Native](https://img.shields.io/badge/React%20Native-0.74.5-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-~51.0.0-000020.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue.svg)](https://www.typescriptlang.org/)

---

## 🚀 Quick Start

Get up and running in 10 minutes! See **[QUICKSTART_GUIDE.md](./QUICKSTART_GUIDE.md)**

```bash
# Install dependencies
npm install

# Configure Firebase (see FIREBASE_SETUP.md)
# Add google-services.json to project root

# Start development server
npm start

# Run on Android
npm run android
```

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| **[README_SMS.md](./README_SMS.md)** | Complete feature documentation (500+ lines) |
| **[QUICKSTART_GUIDE.md](./QUICKSTART_GUIDE.md)** | 10-minute setup guide |
| **[FIREBASE_SETUP.md](./FIREBASE_SETUP.md)** | Firebase configuration guide |
| **[DEPLOYMENT.md](./DEPLOYMENT.md)** | Production deployment instructions |
| **[INSTALLATION_CHECKLIST.md](./INSTALLATION_CHECKLIST.md)** | Complete setup checklist |
| **[CONTRIBUTING.md](./CONTRIBUTING.md)** | Contribution guidelines |
| **[CHANGELOG.md](./CHANGELOG.md)** | Version history |
| **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** | Project overview and statistics |

---

## ✨ Features

### 🔐 Multi-Role System
- **Admin**: Full system control, analytics, user management
- **Teacher**: Class management, attendance, grading, assignments
- **Student**: Schedule, grades, assignments, fee payment
- **Parent**: Child progress tracking, fee management

### 📊 Core Modules
- ✅ Student Management (CRUD with search/filter)
- ✅ Attendance System (QR code scanning, bulk marking)
- ✅ Grade Management (GPA calculation, report cards)
- ✅ Assignment System (Creation, submission, grading)
- ✅ Fee Management (Invoicing, payment tracking)
- ✅ Payment Integration (Khalti, IME Pay for Nepal)
- ✅ Real-time Notifications (Push & in-app)
- ✅ Analytics Dashboard (Charts, trends, KPIs)
- ✅ Communication (Chat, announcements)

### 🎨 UI/UX
- Modern Material Design
- Dark/Light theme support
- Smooth animations
- Responsive layouts
- Offline support

### 🔒 Security
- JWT Authentication
- Role-based access control
- Secure token storage
- Firebase security rules
- Input validation

---

## 🏗️ Tech Stack

```
Frontend
├── React Native 0.74.5
├── Expo SDK ~51.0.0
├── TypeScript 5.3.3
├── Redux Toolkit 2.0.1
├── React Navigation 6.x
└── React Native Paper 5.11.6

Backend Services
├── Firebase Auth
├── Firestore Database
├── Firebase Storage
├── Cloud Messaging
└── Security Rules

Payment
├── Khalti (Nepal)
└── IME Pay (Nepal)

Testing
├── Jest
├── React Testing Library
└── Detox (E2E)
```

---

## 📁 Project Structure

```
PrajolsApp/
├── src/
│   ├── components/         # Reusable UI components
│   ├── screens/           # All app screens (30+)
│   │   ├── auth/          # Login, Register, etc.
│   │   ├── admin/         # Admin dashboard
│   │   ├── teacher/       # Teacher features
│   │   ├── student/       # Student features
│   │   └── parent/        # Parent features
│   ├── navigation/        # Navigation configuration
│   ├── store/             # Redux state management
│   ├── services/          # API & Firebase services
│   ├── utils/             # Utility functions
│   └── types/             # TypeScript definitions
├── __tests__/             # Test files
├── assets/                # Images, icons
├── App.js                 # Entry point
└── Documentation/         # All guides
```

---

## 🎯 Installation

### Prerequisites
- Node.js v18+
- npm or yarn
- Android Studio
- Expo account

### Step-by-Step Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Firebase Setup**
   - Create Firebase project
   - Download `google-services.json`
   - Update config in `src/services/firebase.ts`
   - See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for details

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

4. **Run the App**
   ```bash
   npm start
   npm run android
   ```

See **[INSTALLATION_CHECKLIST.md](./INSTALLATION_CHECKLIST.md)** for complete setup.

---

## 🧪 Testing

```bash
# Run unit tests
npm test

# Test with coverage
npm run test:coverage

# Type checking
npm run type-check

# Linting
npm run lint
```

---

## 📦 Building

### Development Build
```bash
eas build --platform android --profile development
```

### Production Build
```bash
eas build --platform android --profile production
```

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for complete deployment guide.

---

## 📱 Screenshots

Coming soon! Run the app to see the beautiful UI.

---

## 🤝 Contributing

We welcome contributions! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

Built with ❤️ using:
- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Firebase](https://firebase.google.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- And many other amazing open-source libraries

---

## 📞 Support

- 📖 Check [Documentation](./README_SMS.md)
- 🐛 Report bugs via GitHub Issues
- 💬 Join community discussions
- 📧 Email: support@schoolms.com

---

## 🎓 Learn More

This project demonstrates:
- Enterprise React Native architecture
- TypeScript best practices
- Redux Toolkit state management
- Firebase integration patterns
- Payment gateway integration
- Role-based access control
- Real-time features
- Testing strategies

---

**Ready to transform education management? Start building today! 🚀**
