// Calculate GPA from grades
export const calculateGPA = (grades: { score: number; maxScore: number }[]): number => {
  if (grades.length === 0) return 0;
  
  const totalPercentage = grades.reduce((sum, grade) => {
    return sum + (grade.score / grade.maxScore) * 100;
  }, 0);
  
  const averagePercentage = totalPercentage / grades.length;
  
  // Convert percentage to GPA (4.0 scale)
  if (averagePercentage >= 90) return 4.0;
  if (averagePercentage >= 80) return 3.5;
  if (averagePercentage >= 70) return 3.0;
  if (averagePercentage >= 60) return 2.5;
  if (averagePercentage >= 50) return 2.0;
  return 1.0;
};

// Get grade letter from percentage
export const getGradeLetter = (percentage: number): string => {
  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B+';
  if (percentage >= 60) return 'B';
  if (percentage >= 50) return 'C+';
  if (percentage >= 40) return 'C';
  return 'F';
};

// Format currency (NPR)
export const formatCurrency = (amount: number): string => {
  return `NPR ${amount.toLocaleString('en-NP', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

// Truncate text
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Generate random color
export const getRandomColor = (): string => {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
    '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52B788',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Get initials from name
export const getInitials = (firstName: string, lastName: string): string => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

// Debounce function
export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<F>): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), waitFor);
  };
};

// Deep clone object
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

// Group array by key
export const groupBy = <T>(array: T[], key: keyof T): Record<string, T[]> => {
  return array.reduce((result, item) => {
    const groupKey = String(item[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
};

// Sort array by key
export const sortBy = <T>(array: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] => {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    
    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });
};

// Generate unique ID
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Check if object is empty
export const isEmpty = (obj: any): boolean => {
  return Object.keys(obj).length === 0;
};

// Capitalize first letter
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Get file extension
export const getFileExtension = (filename: string): string => {
  return filename.split('.').pop()?.toLowerCase() || '';
};

// Validate file size (in MB)
export const isValidFileSize = (fileSize: number, maxSizeMB: number = 5): boolean => {
  const fileSizeMB = fileSize / (1024 * 1024);
  return fileSizeMB <= maxSizeMB;
};

// Get attendance percentage
export const getAttendancePercentage = (present: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((present / total) * 100);
};
