import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { spacing, borderRadius, shadows } from '../utils/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'elevated' | 'outlined' | 'filled';
  padding?: 'none' | 'small' | 'medium' | 'large';
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  variant = 'elevated',
  padding = 'medium',
}) => {
  const getCardStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      ...styles.card,
      ...styles[`card_${variant}`],
      ...styles[`padding_${padding}`],
    };

    if (variant === 'elevated') {
      return { ...baseStyle, ...shadows.md };
    }

    return baseStyle;
  };

  return <View style={[getCardStyle(), style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.lg,
  },
  card_elevated: {
    backgroundColor: '#FFFFFF',
  },
  card_outlined: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  card_filled: {
    backgroundColor: '#F9FAFB',
  },
  padding_none: {
    padding: 0,
  },
  padding_small: {
    padding: spacing.sm,
  },
  padding_medium: {
    padding: spacing.md,
  },
  padding_large: {
    padding: spacing.lg,
  },
});
