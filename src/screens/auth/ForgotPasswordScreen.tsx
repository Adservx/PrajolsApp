import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { Ionicons } from '@expo/vector-icons';
import * as Yup from 'yup';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { authService } from '../../services/authService';
import { spacing, fontSize, fontWeight } from '../../utils/theme';

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
});

const ForgotPasswordScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleForgotPassword = async (values: { email: string }) => {
    setIsLoading(true);
    try {
      await authService.forgotPassword(values.email);
      setEmailSent(true);
      Alert.alert(
        'Success',
        'Password reset instructions have been sent to your email address.'
      );
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#111827" />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="mail-unread-outline" size={64} color="#4F46E5" />
        </View>

        <Text style={styles.title}>Forgot Password?</Text>
        <Text style={styles.subtitle}>
          Enter your email address and we'll send you instructions to reset your password.
        </Text>

        {!emailSent ? (
          <Formik
            initialValues={{ email: '' }}
            validationSchema={forgotPasswordSchema}
            onSubmit={handleForgotPassword}
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

                <Button
                  title="Send Reset Link"
                  onPress={handleSubmit}
                  loading={isLoading}
                  style={styles.submitButton}
                />

                <TouchableOpacity
                  style={styles.backToLogin}
                  onPress={() => navigation.navigate('Login')}
                >
                  <Ionicons name="arrow-back" size={20} color="#4F46E5" />
                  <Text style={styles.backToLoginText}>Back to Login</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        ) : (
          <View style={styles.successContainer}>
            <View style={styles.successIcon}>
              <Ionicons name="checkmark-circle" size={64} color="#10B981" />
            </View>
            <Text style={styles.successTitle}>Email Sent!</Text>
            <Text style={styles.successMessage}>
              Please check your email for password reset instructions.
            </Text>
            <Button
              title="Back to Login"
              onPress={() => navigation.navigate('Login')}
              style={styles.backButton2}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: spacing.xl,
  },
  backButton: {
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  iconContainer: {
    alignSelf: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    color: '#111827',
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: spacing.xl,
  },
  form: {
    marginTop: spacing.lg,
  },
  submitButton: {
    marginTop: spacing.md,
  },
  backToLogin: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.lg,
    gap: spacing.xs,
  },
  backToLoginText: {
    fontSize: fontSize.md,
    color: '#4F46E5',
    fontWeight: fontWeight.semibold,
  },
  successContainer: {
    alignItems: 'center',
  },
  successIcon: {
    marginBottom: spacing.lg,
  },
  successTitle: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: '#111827',
    marginBottom: spacing.md,
  },
  successMessage: {
    fontSize: fontSize.md,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  backButton2: {
    marginTop: spacing.lg,
    minWidth: 200,
  },
});

export default ForgotPasswordScreen;
