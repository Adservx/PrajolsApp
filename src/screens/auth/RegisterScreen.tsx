import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { Ionicons } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { registerUser } from '../../store/slices/authSlice';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { registerSchema } from '../../utils/validation';
import { spacing, fontSize, fontWeight } from '../../utils/theme';
import { UserRole } from '../../types';

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);

  const handleRegister = async (values: any) => {
    try {
      await dispatch(registerUser(values)).unwrap();
      Alert.alert('Success', 'Account created successfully!');
    } catch (err: any) {
      Alert.alert('Registration Failed', err || 'Please try again');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#111827" />
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>
      </View>

      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: '',
          role: UserRole.STUDENT,
        }}
        validationSchema={registerSchema}
        onSubmit={handleRegister}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.form}>
            <View style={styles.row}>
              <View style={styles.halfInput}>
                <Input
                  label="First Name"
                  placeholder="John"
                  icon="person-outline"
                  value={values.firstName}
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  error={touched.firstName && errors.firstName ? errors.firstName : undefined}
                />
              </View>
              <View style={styles.halfInput}>
                <Input
                  label="Last Name"
                  placeholder="Doe"
                  value={values.lastName}
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  error={touched.lastName && errors.lastName ? errors.lastName : undefined}
                />
              </View>
            </View>

            <Input
              label="Email"
              placeholder="john.doe@example.com"
              icon="mail-outline"
              keyboardType="email-address"
              autoCapitalize="none"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              error={touched.email && errors.email ? errors.email : undefined}
            />

            <Input
              label="Phone Number"
              placeholder="+977 98XXXXXXXX"
              icon="call-outline"
              keyboardType="phone-pad"
              value={values.phone}
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              error={touched.phone && errors.phone ? errors.phone : undefined}
            />

            <Input
              label="Password"
              placeholder="Minimum 8 characters"
              icon="lock-closed-outline"
              secureTextEntry
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              error={touched.password && errors.password ? errors.password : undefined}
            />

            <Input
              label="Confirm Password"
              placeholder="Re-enter password"
              icon="lock-closed-outline"
              secureTextEntry
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              error={
                touched.confirmPassword && errors.confirmPassword
                  ? errors.confirmPassword
                  : undefined
              }
            />

            <Button
              title="Create Account"
              onPress={handleSubmit}
              loading={isLoading}
              style={styles.registerButton}
            />

            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.signInText}>Sign In</Text>
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
  backButton: {
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    color: '#111827',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: '#6B7280',
  },
  form: {
    marginTop: spacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  halfInput: {
    flex: 1,
  },
  registerButton: {
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.md,
  },
  footerText: {
    fontSize: fontSize.md,
    color: '#6B7280',
  },
  signInText: {
    fontSize: fontSize.md,
    color: '#4F46E5',
    fontWeight: fontWeight.semibold,
  },
});

export default RegisterScreen;
