# 🚀 Supabase Auth Quick Start

Quick reference for using Supabase Authentication in PrajolsApp.

## 📦 Installation

```bash
# Install dependencies
npm install

# Set up environment
npm run setup

# Start development server
npm start
```

## 🔑 Environment Variables

Create `.env` file:

```env
SUPABASE_URL=https://sfhkchooqiqyzrwkvziz.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
```

## 💻 Basic Usage

### Sign Up

```typescript
import { authService } from './services/authService';

const result = await authService.register({
  email: 'user@example.com',
  password: 'SecurePassword123',
  firstName: 'John',
  lastName: 'Doe',
  role: 'student',
  phone: '+9779841234567'
});

console.log('User:', result.user);
console.log('Token:', result.token);
```

### Sign In

```typescript
const result = await authService.login({
  email: 'user@example.com',
  password: 'SecurePassword123'
});

console.log('Logged in:', result.user);
```

### Sign Out

```typescript
await authService.logout();
```

### Get Current User

```typescript
const user = await authService.getCurrentUser();

if (user) {
  console.log('User ID:', user.id);
  console.log('Email:', user.email);
  console.log('Role:', user.role);
}
```

### Update Profile

```typescript
const updatedUser = await authService.updateUserProfile({
  firstName: 'Jane',
  lastName: 'Smith',
  phone: '+9779841234567',
  avatar: 'https://example.com/avatar.jpg'
});
```

### Password Reset

```typescript
await authService.forgotPassword('user@example.com');
// User will receive password reset email
```

### Listen to Auth State Changes

```typescript
const unsubscribe = authService.onAuthStateChanged((user) => {
  if (user) {
    console.log('User signed in:', user.email);
  } else {
    console.log('User signed out');
  }
});

// Clean up listener when done
unsubscribe();
```

## 🎯 Using with Redux

### Login with Redux

```typescript
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './store/slices/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleLogin = async () => {
    try {
      await dispatch(loginUser({
        email: 'user@example.com',
        password: 'password'
      })).unwrap();
      
      // Success! Navigate to home
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    // Your UI here
  );
};
```

### Register with Redux

```typescript
import { registerUser } from './store/slices/authSlice';

const handleRegister = async () => {
  try {
    await dispatch(registerUser({
      email: 'user@example.com',
      password: 'password',
      firstName: 'John',
      lastName: 'Doe',
      role: 'student'
    })).unwrap();
    
    // Success!
  } catch (err) {
    console.error('Registration failed:', err);
  }
};
```

## 🔒 Protected Routes

```typescript
import { useSelector } from 'react-redux';
import { Navigate } from 'react-navigation';

const ProtectedScreen = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <View>
      <Text>Welcome, {user.firstName}!</Text>
    </View>
  );
};
```

## 🔐 Role-Based Access

```typescript
const AdminOnlyScreen = () => {
  const { user } = useSelector((state) => state.auth);

  if (user?.role !== 'admin') {
    return <Text>Access Denied</Text>;
  }

  return (
    <View>
      <Text>Admin Dashboard</Text>
    </View>
  );
};
```

## 🌐 Google Sign In

```typescript
import { googleSignIn } from './store/slices/authSlice';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const handleGoogleSignIn = async () => {
  try {
    // Configure Google Sign In first
    GoogleSignin.configure({
      webClientId: 'YOUR_WEB_CLIENT_ID',
    });

    // Get Google ID token
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    const idToken = userInfo.idToken;

    // Sign in with Supabase
    await dispatch(googleSignIn(idToken)).unwrap();
    
  } catch (error) {
    console.error('Google sign in failed:', error);
  }
};
```

## 📊 User Data Structure

```typescript
interface User {
  id: string;              // Supabase Auth UUID
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'teacher' | 'student' | 'parent';
  phone?: string;
  avatar?: string;
  isActive: boolean;
  createdAt: string;       // ISO timestamp
  updatedAt: string;       // ISO timestamp
}
```

## 🎨 Common Patterns

### Loading State

```typescript
const { isLoading } = useSelector((state) => state.auth);

if (isLoading) {
  return <LoadingSpinner />;
}
```

### Error Handling

```typescript
const { error } = useSelector((state) => state.auth);

if (error) {
  return <ErrorMessage message={error} />;
}
```

### Auto-Login on App Start

```typescript
import { useEffect } from 'react';
import { loadUser } from './store/slices/authSlice';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Try to load user from stored session
    dispatch(loadUser());
  }, []);

  return <AppNavigator />;
};
```

## 🔧 Advanced Usage

### Get Access Token

```typescript
const token = await authService.getIdToken();

// Use token for API calls
fetch('https://api.example.com/data', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

### Get Session

```typescript
const session = await authService.getSession();

if (session) {
  console.log('Access Token:', session.access_token);
  console.log('Refresh Token:', session.refresh_token);
  console.log('Expires At:', session.expires_at);
}
```

### Manual Token Refresh

```typescript
import { refreshToken } from './store/slices/authSlice';

// Refresh token when it expires
await dispatch(refreshToken()).unwrap();
```

## 🐛 Error Codes

Common errors and solutions:

| Error | Solution |
|-------|----------|
| "Invalid login credentials" | Check email/password |
| "Email not confirmed" | Verify email or disable confirmation in settings |
| "User already registered" | Use sign in instead |
| "Password is too weak" | Use stronger password (min 6 chars) |
| "Network connection failed" | Check internet connection |
| "Too many requests" | Wait before retrying |

## 🎯 Best Practices

1. **Always handle errors:**
   ```typescript
   try {
     await authService.login(credentials);
   } catch (error) {
     console.error('Login failed:', error.message);
     // Show error to user
   }
   ```

2. **Clear sensitive data on logout:**
   ```typescript
   await authService.logout();
   // Clear any cached user data
   ```

3. **Use auth state listener:**
   ```typescript
   useEffect(() => {
     const unsubscribe = authService.onAuthStateChanged(handleAuthChange);
     return () => unsubscribe();
   }, []);
   ```

4. **Store tokens securely:**
   - Tokens are automatically stored in `expo-secure-store`
   - Never log tokens to console in production

5. **Validate user roles:**
   ```typescript
   const canAccess = user?.role === 'admin' || user?.role === 'teacher';
   ```

## 📚 Related Files

- **Auth Service:** `src/services/supabaseAuth.ts`
- **Redux Slice:** `src/store/slices/authSlice.ts`
- **Types:** `src/types/index.ts`
- **Supabase Client:** `src/services/supabase.ts`

## 🔗 Resources

- **Supabase Auth Docs:** https://supabase.com/docs/guides/auth
- **Project Dashboard:** https://supabase.com/dashboard/project/sfhkchooqiqyzrwkvziz
- **Auth Settings:** https://supabase.com/dashboard/project/sfhkchooqiqyzrwkvziz/auth/users

## 💡 Tips

- Enable email templates in Supabase dashboard for better UX
- Set up password reset redirect URL in Auth settings
- Use RLS policies to secure your data
- Test with different user roles
- Monitor auth logs in Supabase dashboard

---

**Happy Coding! 🚀**
