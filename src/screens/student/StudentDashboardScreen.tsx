import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAppSelector } from '../../store/hooks';
import { Card } from '../../components/Card';
import { StatCard } from '../../components/StatCard';
import { Avatar } from '../../components/Avatar';
import { spacing, fontSize, fontWeight } from '../../utils/theme';

const StudentDashboardScreen: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello,</Text>
          <Text style={styles.userName}>{user?.firstName} {user?.lastName}</Text>
        </View>
        <Avatar source={user?.avatar} firstName={user?.firstName} lastName={user?.lastName} size="medium" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Stats</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.statsContainer}>
            <StatCard title="Attendance" value="92%" icon="checkmark-circle" color="#10B981" />
            <StatCard title="GPA" value="3.8" icon="star" color="#F59E0B" />
            <StatCard title="Assignments" value="5" icon="document-text" color="#4F46E5" />
            <StatCard title="Pending Fees" value="NPR 0" icon="wallet" color="#EF4444" />
          </View>
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Classes</Text>
        <Card>
          <Text style={styles.emptyText}>No upcoming classes today</Text>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.lg, backgroundColor: '#FFFFFF' },
  greeting: { fontSize: fontSize.sm, color: '#6B7280' },
  userName: { fontSize: fontSize.xl, fontWeight: fontWeight.bold, color: '#111827', marginTop: spacing.xs },
  section: { padding: spacing.lg },
  sectionTitle: { fontSize: fontSize.lg, fontWeight: fontWeight.bold, color: '#111827', marginBottom: spacing.md },
  statsContainer: { flexDirection: 'row', gap: spacing.md },
  emptyText: { textAlign: 'center', color: '#6B7280', paddingVertical: spacing.lg },
});

export default StudentDashboardScreen;
