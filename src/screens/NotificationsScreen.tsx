import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card } from '../components/Card';
import { spacing, fontSize, fontWeight } from '../utils/theme';
import { Ionicons } from '@expo/vector-icons';

const NotificationsScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.notificationItem}>
          <Ionicons name="notifications" size={24} color="#4F46E5" />
          <View style={styles.notificationContent}>
            <Text style={styles.title}>New Assignment Posted</Text>
            <Text style={styles.message}>Math homework due tomorrow</Text>
            <Text style={styles.time}>2 hours ago</Text>
          </View>
        </View>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB', padding: spacing.lg },
  card: { marginBottom: spacing.md },
  notificationItem: { flexDirection: 'row', gap: spacing.md },
  notificationContent: { flex: 1 },
  title: { fontSize: fontSize.md, fontWeight: fontWeight.semibold, marginBottom: spacing.xs },
  message: { fontSize: fontSize.sm, color: '#6B7280', marginBottom: spacing.xs },
  time: { fontSize: fontSize.xs, color: '#9CA3AF' },
});

export default NotificationsScreen;
