import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { Ionicons } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loginUser, googleSignIn } from '../../store/slices/authSlice';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { loginSchema } from '../../utils/validation';
import { spacing, fontSize, fontWeight } from '../../utils/theme';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      await dispatch(loginUser({ ...values, rememberMe })).unwrap();
      // Navigation is handled by AppNavigator based on auth state
    } catch (err: any) {
      Alert.alert('Login Failed', err || 'Please check your credentials and try again');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await dispatch(googleSignIn()).unwrap();
      // Navigation is handled by AppNavigator based on auth state
    } catch (err: any) {
      Alert.alert('Google Sign-In Failed', err || 'Please try again');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Ionicons name="school" size={60} color="#4F46E5" />
        </View>
        <Text style={styles.title}>School Management System</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>
      </View>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.form}>
            <Input
              label="Email"
              placeholder="Enter your email"
              icon="mail-outline"
              keyboardType="email-address"
              autoCapitalize="none"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              error={touched.email && errors.email ? errors.email : undefined}
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              icon="lock-closed-outline"
              secureTextEntry
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              error={touched.password && errors.password ? errors.password : undefined}
            />

            <View style={styles.options}>
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => setRememberMe(!rememberMe)}
              >
                <Ionicons
                  name={rememberMe ? 'checkbox' : 'square-outline'}
                  size={24}
                  color="#4F46E5"
                />
                <Text style={styles.checkboxLabel}>Remember me</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            {error && <Text style={styles.errorText}>{error}</Text>}

            <Button
              title="Sign In"
              onPress={handleSubmit}
              loading={isLoading}
              style={styles.loginButton}
            />

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            <Button
              title="Continue with Google"
              onPress={handleGoogleSignIn}
              variant="outline"
              loading={isLoading}
              disabled={isLoading}
              icon={<Ionicons name="logo-google" size={20} color="#4F46E5" />}
            />

            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.signUpText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginTop: spacing.xxl,
    marginBottom: spacing.xl,
  },
  logoContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#EEF2FF',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: '#111827',
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: '#6B7280',
    textAlign: 'center',
  },
  form: {
    marginTop: spacing.lg,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  checkboxLabel: {
    fontSize: fontSize.sm,
    color: '#374151',
  },
  forgotPassword: {
    fontSize: fontSize.sm,
    color: '#4F46E5',
    fontWeight: fontWeight.semibold,
  },
  errorText: {
    color: '#EF4444',
    fontSize: fontSize.sm,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  loginButton: {
    marginBottom: spacing.lg,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    marginHorizontal: spacing.md,
    fontSize: fontSize.sm,
    color: '#9CA3AF',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.xl,
  },
  footerText: {
    fontSize: fontSize.md,
    color: '#6B7280',
  },
  signUpText: {
    fontSize: fontSize.md,
    color: '#4F46E5',
    fontWeight: fontWeight.semibold,
  },
});

export default LoginScreen;
