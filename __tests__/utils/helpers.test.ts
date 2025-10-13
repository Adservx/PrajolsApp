/// <reference path="../../jest.d.ts" />

import {
  calculateGPA,
  getGradeLetter,
  formatCurrency,
  truncateText,
  getInitials,
  capitalize,
  getAttendancePercentage,
} from '../../src/utils/helpers';

describe('Helper Functions', () => {
  describe('calculateGPA', () => {
    it('calculates correct GPA for grades', () => {
      const grades = [
        { score: 90, maxScore: 100 },
        { score: 85, maxScore: 100 },
        { score: 95, maxScore: 100 },
      ];
      expect(calculateGPA(grades)).toBe(4.0);
    });

    it('returns 0 for empty grades array', () => {
      expect(calculateGPA([])).toBe(0);
    });

    it('handles different max scores', () => {
      const grades = [
        { score: 45, maxScore: 50 },
        { score: 40, maxScore: 50 },
      ];
      expect(calculateGPA(grades)).toBeGreaterThan(3.0);
    });
  });

  describe('getGradeLetter', () => {
    it('returns A+ for 90% and above', () => {
      expect(getGradeLetter(95)).toBe('A+');
      expect(getGradeLetter(90)).toBe('A+');
    });

    it('returns A for 80-89%', () => {
      expect(getGradeLetter(85)).toBe('A');
      expect(getGradeLetter(80)).toBe('A');
    });

    it('returns F for below 40%', () => {
      expect(getGradeLetter(35)).toBe('F');
      expect(getGradeLetter(20)).toBe('F');
    });
  });

  describe('formatCurrency', () => {
    it('formats NPR currency correctly', () => {
      expect(formatCurrency(1000)).toContain('NPR');
      expect(formatCurrency(1000)).toContain('1,000');
    });

    it('includes decimal places', () => {
      expect(formatCurrency(1234.56)).toContain('.56');
    });
  });

  describe('truncateText', () => {
    it('truncates long text', () => {
      const longText = 'This is a very long text that should be truncated';
      expect(truncateText(longText, 20)).toContain('...');
      expect(truncateText(longText, 20).length).toBeLessThanOrEqual(23);
    });

    it('does not truncate short text', () => {
      const shortText = 'Short';
      expect(truncateText(shortText, 20)).toBe(shortText);
    });
  });

  describe('getInitials', () => {
    it('returns correct initials', () => {
      expect(getInitials('John', 'Doe')).toBe('JD');
      expect(getInitials('jane', 'smith')).toBe('JS');
    });

    it('handles empty strings', () => {
      expect(getInitials('', '')).toBe('');
    });
  });

  describe('capitalize', () => {
    it('capitalizes first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('WORLD')).toBe('World');
    });

    it('handles empty string', () => {
      expect(capitalize('')).toBe('');
    });
  });

  describe('getAttendancePercentage', () => {
    it('calculates correct percentage', () => {
      expect(getAttendancePercentage(18, 20)).toBe(90);
      expect(getAttendancePercentage(20, 20)).toBe(100);
    });

    it('returns 0 for zero total', () => {
      expect(getAttendancePercentage(0, 0)).toBe(0);
    });

    it('rounds to nearest integer', () => {
      expect(getAttendancePercentage(7, 9)).toBe(78);
    });
  });
});
