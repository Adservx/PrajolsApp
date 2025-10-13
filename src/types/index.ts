// User Types
export enum UserRole {
  ADMIN = 'admin',
  TEACHER = 'teacher',
  STUDENT = 'student',
  PARENT = 'parent',
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
  isActive: boolean;
  twoFactorEnabled?: boolean;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Student Types
export interface Student extends User {
  studentId: string;
  grade: string;
  section: string;
  dateOfBirth: string; // ISO 8601 date string
  parentId: string;
  enrollmentDate: string; // ISO 8601 date string
  address: string;
  guardianName: string;
  guardianPhone: string;
  emergencyContact: string;
  medicalInfo?: string;
  bloodGroup?: string;
}

export interface StudentState {
  students: Student[];
  selectedStudent: Student | null;
  isLoading: boolean;
  error: string | null;
}

// Teacher Types
export interface Teacher extends User {
  teacherId: string;
  department: string;
  subjects: string[];
  qualification: string;
  experience: number;
  dateOfJoining: string; // ISO 8601 date string
  salary?: number;
}

export interface TeacherState {
  teachers: Teacher[];
  selectedTeacher: Teacher | null;
  isLoading: boolean;
  error: string | null;
}

// Parent Types
export interface Parent extends User {
  parentId: string;
  children: string[]; // Array of student IDs
  occupation?: string;
  relationship: 'father' | 'mother' | 'guardian';
}

// Class/Course Types
export interface Class {
  id: string;
  name: string;
  grade: string;
  section: string;
  teacherId: string;
  subject: string;
  schedule: ClassSchedule[];
  studentIds: string[];
  academicYear: string;
  room?: string;
}

export interface ClassSchedule {
  day: string;
  startTime: string;
  endTime: string;
}

// Attendance Types
export interface Attendance {
  id: string;
  studentId: string;
  classId: string;
  date: string; // ISO 8601 date string
  status: 'present' | 'absent' | 'late' | 'excused';
  markedBy: string;
  notes?: string;
}

export interface AttendanceState {
  records: Attendance[];
  isLoading: boolean;
  error: string | null;
}

// Grade Types
export interface Grade {
  id: string;
  studentId: string;
  classId: string;
  subject: string;
  examType: 'midterm' | 'final' | 'quiz' | 'assignment' | 'project';
  score: number;
  maxScore: number;
  percentage: number;
  grade: string;
  remarks?: string;
  date: string; // ISO 8601 date string
  teacherId: string;
}

export interface GradeState {
  grades: Grade[];
  isLoading: boolean;
  error: string | null;
}

// Assignment Types
export interface Assignment {
  id: string;
  title: string;
  description: string;
  classId: string;
  subject: string;
  teacherId: string;
  dueDate: string; // ISO 8601 date string
  maxScore: number;
  attachments?: string[];
  createdAt: string; // ISO 8601 date string
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  submittedAt: string; // ISO 8601 date string
  files: string[];
  score?: number;
  feedback?: string;
  status: 'submitted' | 'graded' | 'late';
}

export interface AssignmentState {
  assignments: Assignment[];
  submissions: Submission[];
  isLoading: boolean;
  error: string | null;
}

// Schedule/Timetable Types
export interface Schedule {
  id: string;
  studentId?: string;
  teacherId?: string;
  classId: string;
  day: string;
  startTime: string;
  endTime: string;
  subject: string;
  room: string;
  academicYear: string;
}

// Finance/Fee Types
export interface Fee {
  id: string;
  studentId: string;
  academicYear: string;
  type: 'tuition' | 'transport' | 'library' | 'sports' | 'exam' | 'other';
  amount: number;
  dueDate: string; // ISO 8601 date string
  status: 'pending' | 'paid' | 'overdue' | 'partial';
  paidAmount?: number;
  paymentDate?: string; // ISO 8601 date string
  paymentMethod?: 'khalti' | 'imepay' | 'cash' | 'bank';
  transactionId?: string;
  invoiceNumber: string;
}

export interface FinanceState {
  fees: Fee[];
  totalRevenue: number;
  pendingAmount: number;
  isLoading: boolean;
  error: string | null;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'announcement' | 'grade' | 'assignment' | 'fee' | 'attendance' | 'event';
  isRead: boolean;
  createdAt: string; // ISO 8601 date string
  data?: any;
}

export interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
}

// Message/Chat Types
export interface Message {
  _id: string;
  text: string;
  createdAt: string; // ISO 8601 date string
  user: {
    _id: string;
    name: string;
    avatar?: string;
  };
  image?: string;
  video?: string;
  audio?: string;
  system?: boolean;
}

export interface ChatRoom {
  id: string;
  name: string;
  type: 'class' | 'direct' | 'group';
  participants: string[];
  lastMessage?: Message;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
}

export interface ChatState {
  rooms: ChatRoom[];
  messages: { [roomId: string]: Message[] };
  isLoading: boolean;
  error: string | null;
}

// Event Types
export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string; // ISO 8601 date string
  endDate: string; // ISO 8601 date string
  location?: string;
  type: 'exam' | 'holiday' | 'sports' | 'cultural' | 'meeting' | 'other';
  organizer: string;
  participants?: string[];
  isAllDay: boolean;
}

// Analytics Types
export interface AnalyticsData {
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
  attendanceRate: number;
  enrollmentTrend: { month: string; count: number }[];
  gradeDistribution: { grade: string; count: number }[];
  revenueData: { month: string; amount: number }[];
  topPerformers: Student[];
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Navigation Types
export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  AdminDashboard: undefined;
  TeacherDashboard: undefined;
  StudentDashboard: undefined;
  ParentDashboard: undefined;
  Profile: { userId: string };
  StudentList: undefined;
  StudentDetail: { studentId: string };
  TeacherList: undefined;
  TeacherDetail: { teacherId: string };
  AttendanceScanner: { classId: string };
  AttendanceList: { classId?: string };
  GradeEntry: { classId: string; studentId?: string };
  GradeReport: { studentId: string };
  AssignmentList: { classId?: string };
  AssignmentDetail: { assignmentId: string };
  CreateAssignment: { classId: string };
  Schedule: { userId: string };
  FeeManagement: { studentId?: string };
  PaymentGateway: { feeId: string };
  Chat: undefined;
  ChatRoom: { roomId: string };
  Notifications: undefined;
  Settings: undefined;
  Analytics: undefined;
  Calendar: undefined;
};

// Theme Types
export interface Theme {
  dark: boolean;
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
    success: string;
    warning: string;
    error: string;
    info: string;
  };
}

// Form Types
export interface LoginFormValues {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterFormValues {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: UserRole;
}

export interface ForgotPasswordFormValues {
  email: string;
}

export interface ResetPasswordFormValues {
  code: string;
  newPassword: string;
  confirmPassword: string;
}
