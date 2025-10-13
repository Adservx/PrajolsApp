import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card } from '../../components/Card';
import { spacing, fontSize, fontWeight } from '../../utils/theme';

const AnalyticsScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.title}>Analytics Dashboard</Text>
        <Text style={styles.subtitle}>View detailed analytics and reports</Text>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  card: { margin: spacing.lg },
  title: { fontSize: fontSize.xl, fontWeight: fontWeight.bold, marginBottom: spacing.sm },
  subtitle: { fontSize: fontSize.md, color: '#6B7280' },
});

export default AnalyticsScreen;
