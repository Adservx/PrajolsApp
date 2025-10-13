import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from './Card';
import { spacing, fontSize, fontWeight } from '../utils/theme';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: keyof typeof Ionicons.glyphMap;
  color?: string;
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  onPress?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  color = '#4F46E5',
  subtitle,
  trend,
  onPress,
}) => {
  const content = (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: `${color}15` }]}>
          <Ionicons name={icon} size={24} color={color} />
        </View>
        {trend && (
          <View style={styles.trend}>
            <Ionicons
              name={trend.isPositive ? 'trending-up' : 'trending-down'}
              size={16}
              color={trend.isPositive ? '#10B981' : '#EF4444'}
            />
            <Text
              style={[
                styles.trendText,
                { color: trend.isPositive ? '#10B981' : '#EF4444' },
              ]}
            >
              {trend.value}%
            </Text>
          </View>
        )}
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </Card>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  card: {
    minWidth: 150,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
  value: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    color: '#111827',
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: fontSize.sm,
    color: '#6B7280',
    fontWeight: fontWeight.medium,
  },
  subtitle: {
    fontSize: fontSize.xs,
    color: '#9CA3AF',
    marginTop: spacing.xs,
  },
});
