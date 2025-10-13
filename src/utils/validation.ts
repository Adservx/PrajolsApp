import * as Yup from 'yup';

// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone validation (Nepal format)
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^(\+977)?[9][6-9]\d{8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

// Password strength
export const getPasswordStrength = (password: string): 'weak' | 'medium' | 'strong' => {
  if (password.length < 6) return 'weak';
  
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  const strength = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar].filter(Boolean).length;
  
  if (strength <= 2) return 'weak';
  if (strength === 3) return 'medium';
  return 'strong';
};

// Form validation schemas
export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export const registerSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .required('First name is required'),
  lastName: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .required('Last name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^(\+977)?[9][6-9]\d{8}$/, 'Invalid phone number')
    .required('Phone number is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

export const studentSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  studentId: Yup.string().required('Student ID is required'),
  grade: Yup.string().required('Grade is required'),
  section: Yup.string().required('Section is required'),
  dateOfBirth: Yup.date().required('Date of birth is required'),
  guardianName: Yup.string().required('Guardian name is required'),
  guardianPhone: Yup.string()
    .matches(/^(\+977)?[9][6-9]\d{8}$/, 'Invalid phone number')
    .required('Guardian phone is required'),
});

export const assignmentSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .required('Title is required'),
  description: Yup.string()
    .min(10, 'Description must be at least 10 characters')
    .required('Description is required'),
  dueDate: Yup.date()
    .min(new Date(), 'Due date must be in the future')
    .required('Due date is required'),
  maxScore: Yup.number()
    .min(1, 'Max score must be at least 1')
    .required('Max score is required'),
});

export const gradeSchema = Yup.object().shape({
  score: Yup.number()
    .min(0, 'Score cannot be negative')
    .required('Score is required'),
  maxScore: Yup.number()
    .min(1, 'Max score must be at least 1')
    .required('Max score is required'),
});
