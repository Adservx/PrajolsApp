import { format, parse, isValid, differenceInYears, startOfDay, endOfDay } from 'date-fns';

export const formatDate = (date: Date | string, formatStr: string = 'MMM dd, yyyy'): string => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (!isValid(dateObj)) return 'Invalid date';
    return format(dateObj, formatStr);
  } catch (error) {
    return 'Invalid date';
  }
};

export const formatTime = (date: Date | string): string => {
  return formatDate(date, 'HH:mm');
};

export const formatDateTime = (date: Date | string): string => {
  return formatDate(date, 'MMM dd, yyyy HH:mm');
};

export const parseDate = (dateStr: string, formatStr: string = 'yyyy-MM-dd'): Date => {
  return parse(dateStr, formatStr, new Date());
};

export const getAge = (birthDate: Date | string): number => {
  const dateObj = typeof birthDate === 'string' ? new Date(birthDate) : birthDate;
  return differenceInYears(new Date(), dateObj);
};

export const isToday = (date: Date): boolean => {
  const today = new Date();
  return date.getDate() === today.getDate() &&
         date.getMonth() === today.getMonth() &&
         date.getFullYear() === today.getFullYear();
};

export const getStartOfDay = (date: Date = new Date()): Date => {
  return startOfDay(date);
};

export const getEndOfDay = (date: Date = new Date()): Date => {
  return endOfDay(date);
};

export const getDayName = (date: Date): string => {
  return format(date, 'EEEE');
};

export const getMonthName = (date: Date): string => {
  return format(date, 'MMMM');
};

export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const subtractDays = (date: Date, days: number): Date => {
  return addDays(date, -days);
};

export const isWeekend = (date: Date): boolean => {
  const day = date.getDay();
  return day === 0 || day === 6; // Sunday or Saturday
};

export const getAcademicYear = (date: Date = new Date()): string => {
  const year = date.getFullYear();
  const month = date.getMonth();
  
  // Academic year starts in April (month 3, 0-indexed)
  if (month >= 3) {
    return `${year}-${year + 1}`;
  } else {
    return `${year - 1}-${year}`;
  }
};
