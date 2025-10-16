import { z } from 'zod';

// Student validation schema
export const studentSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  grade: z.number().int().min(1, 'Grade must be between 1 and 12').max(12, 'Grade must be between 1 and 12'),
  enrollment_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
});

// Class validation schema
export const classSchema = z.object({
  name: z.string().min(2, 'Class name must be at least 2 characters').max(100),
  subject: z.string().min(2, 'Subject must be at least 2 characters').max(100),
});

// Assignment validation schema
export const assignmentSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(200),
  description: z.string().min(10, 'Description must be at least 10 characters').max(1000),
  due_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  class_id: z.string().uuid('Invalid class ID'),
});

// Auth validation schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  role: z.enum(['admin', 'teacher', 'student']),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

// Validation helper function
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; error: string } {
  try {
    const validated = schema.parse(data);
    return { success: true, data: validated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.errors[0];
      return { success: false, error: firstError.message };
    }
    return { success: false, error: 'Validation failed' };
  }
}

// Example usage:
// const result = validateData(studentSchema, formData);
// if (result.success) {
//   // Use result.data
// } else {
//   Alert.alert('Validation Error', result.error);
// }
