import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text, Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAppSelector } from '../store/hooks';
import { RootStackParamList } from '../types';

// Auth Screens
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';

// Dashboard Navigators
import AdminNavigator from './AdminNavigator';
import TeacherNavigator from './TeacherNavigator';
import StudentNavigator from './StudentNavigator';
import ParentNavigator from './ParentNavigator';

// Splash Screen
import SplashScreen from '../screens/SplashScreen';

const Stack = createStackNavigator<RootStackParamList>();

// Deep linking configuration (optional)
const linking = {
  prefixes: ['prajolsapp://', 'exp://'],
  config: {
    screens: {
      Login: 'login',
      Register: 'register',
      ForgotPassword: 'forgot-password',
    },
  },
};

const AppNavigator: React.FC = () => {
  const { isAuthenticated, user, isLoading } = useAppSelector((state) => state.auth);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!isAuthenticated ? (
          // Auth Stack
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          </>
        ) : (
          // Main App Stack based on user role
          <>
            {user?.role === 'admin' ? (
              <Stack.Screen name="AdminDashboard" component={AdminNavigator} />
            ) : user?.role === 'teacher' ? (
              <Stack.Screen name="TeacherDashboard" component={TeacherNavigator} />
            ) : user?.role === 'student' ? (
              <Stack.Screen name="StudentDashboard" component={StudentNavigator} />
            ) : user?.role === 'parent' ? (
              <Stack.Screen name="ParentDashboard" component={ParentNavigator} />
            ) : (
              // Fallback to login if role is undefined or invalid
              <Stack.Screen name="Login" component={LoginScreen} />
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  loadingContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    minWidth: 150,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
});

export default AppNavigator;
