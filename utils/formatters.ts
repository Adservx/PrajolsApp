import { format, formatDistanceToNow, isPast, isFuture } from 'date-fns';

/**
 * Format a date string to a human-readable format
 */
export function formatDate(dateString: string, formatStr: string = 'MMM dd, yyyy'): string {
  try {
    const date = new Date(dateString);
    return format(date, formatStr);
  } catch (error) {
    return dateString;
  }
}

/**
 * Format a date to show relative time (e.g., "2 days ago")
 */
export function formatRelativeTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  } catch (error) {
    return dateString;
  }
}

/**
 * Check if a date is in the past
 */
export function isDatePast(dateString: string): boolean {
  try {
    const date = new Date(dateString);
    return isPast(date);
  } catch (error) {
    return false;
  }
}

/**
 * Check if a date is in the future
 */
export function isDateFuture(dateString: string): boolean {
  try {
    const date = new Date(dateString);
    return isFuture(date);
  } catch (error) {
    return false;
  }
}

/**
 * Format grade as ordinal (e.g., 10 -> "10th")
 */
export function formatGrade(grade: number): string {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const v = grade % 100;
  return grade + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
}

/**
 * Capitalize first letter of each word
 */
export function capitalizeWords(str: string): string {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

/**
 * Format role for display
 */
export function formatRole(role: string): string {
  return capitalizeWords(role);
}
