import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useAppSelector } from '../../store/hooks';
import { Card } from '../../components/Card';
import { StatCard } from '../../components/StatCard';
import { Avatar } from '../../components/Avatar';
import { spacing, fontSize, fontWeight } from '../../utils/theme';

const TeacherDashboardScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { user } = useAppSelector((state) => state.auth);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.userName}>{user?.firstName} {user?.lastName}</Text>
        </View>
        <Avatar
          source={user?.avatar}
          firstName={user?.firstName}
          lastName={user?.lastName}
          size="medium"
        />
      </View>

      {/* Stats */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Overview</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.statsContainer}>
            <StatCard title="My Classes" value="6" icon="book" color="#4F46E5" />
            <StatCard title="Total Students" value="180" icon="people" color="#10B981" />
            <StatCard title="Pending Grades" value="12" icon="document-text" color="#F59E0B" />
            <StatCard title="Attendance" value="95%" icon="checkmark-circle" color="#3B82F6" />
          </View>
        </ScrollView>
      </View>

      {/* Today's Classes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Schedule</Text>
        <Card>
          <ClassItem time="8:00 - 9:00" subject="Mathematics" grade="10-A" room="Room 201" />
          <ClassItem time="9:15 - 10:15" subject="Physics" grade="11-B" room="Room 105" />
          <ClassItem time="10:30 - 11:30" subject="Mathematics" grade="10-B" room="Room 201" />
        </Card>
      </View>
    </ScrollView>
  );
};

const ClassItem: React.FC<{ time: string; subject: string; grade: string; room: string }> = ({
  time, subject, grade, room
}) => (
  <View style={styles.classItem}>
    <View style={styles.classTime}>
      <Text style={styles.timeText}>{time}</Text>
    </View>
    <View style={styles.classInfo}>
      <Text style={styles.subjectText}>{subject}</Text>
      <Text style={styles.gradeText}>Grade {grade} • {room}</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: '#FFFFFF',
  },
  greeting: { fontSize: fontSize.sm, color: '#6B7280' },
  userName: { fontSize: fontSize.xl, fontWeight: fontWeight.bold, color: '#111827', marginTop: spacing.xs },
  section: { padding: spacing.lg },
  sectionTitle: { fontSize: fontSize.lg, fontWeight: fontWeight.bold, color: '#111827', marginBottom: spacing.md },
  statsContainer: { flexDirection: 'row', gap: spacing.md },
  classItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  classTime: { width: 80 },
  timeText: { fontSize: fontSize.sm, color: '#6B7280' },
  classInfo: { flex: 1 },
  subjectText: { fontSize: fontSize.md, fontWeight: fontWeight.semibold, color: '#111827' },
  gradeText: { fontSize: fontSize.sm, color: '#6B7280', marginTop: spacing.xs },
});

export default TeacherDashboardScreen;
