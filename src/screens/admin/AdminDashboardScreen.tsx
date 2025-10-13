import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { fetchStudents } from '../../store/slices/studentSlice';
import { Card } from '../../components/Card';
import { StatCard } from '../../components/StatCard';
import { Avatar } from '../../components/Avatar';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { spacing, fontSize, fontWeight } from '../../utils/theme';

const AdminDashboardScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { students, isLoading } = useAppSelector((state) => state.students);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await dispatch(fetchStudents());
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  if (isLoading && !refreshing) {
    return <LoadingSpinner fullScreen message="Loading dashboard..." />;
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.userName}>{user?.firstName} {user?.lastName}</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('Notifications')}
          >
            <Ionicons name="notifications-outline" size={24} color="#111827" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>5</Text>
            </View>
          </TouchableOpacity>
          <Avatar
            source={user?.avatar}
            firstName={user?.firstName}
            lastName={user?.lastName}
            size="medium"
          />
        </View>
      </View>

      {/* Quick Stats */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.statsContainer}>
            <StatCard
              title="Total Students"
              value={students.length.toString()}
              icon="people"
              color="#4F46E5"
              trend={{ value: 12, isPositive: true }}
              onPress={() => navigation.navigate('Students', { screen: 'StudentList' })}
            />
            <StatCard
              title="Total Teachers"
              value="45"
              icon="school"
              color="#10B981"
              trend={{ value: 5, isPositive: true }}
              onPress={() => navigation.navigate('Teachers', { screen: 'TeacherList' })}
            />
            <StatCard
              title="Total Classes"
              value="32"
              icon="book"
              color="#F59E0B"
            />
            <StatCard
              title="Attendance Rate"
              value="94.5%"
              icon="checkmark-circle"
              color="#3B82F6"
              trend={{ value: 2, isPositive: true }}
            />
          </View>
        </ScrollView>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <QuickActionCard
            icon="person-add"
            title="Add Student"
            color="#4F46E5"
            onPress={() => navigation.navigate('Students', { screen: 'StudentList' })}
          />
          <QuickActionCard
            icon="person-add"
            title="Add Teacher"
            color="#10B981"
            onPress={() => navigation.navigate('Teachers', { screen: 'TeacherList' })}
          />
          <QuickActionCard
            icon="bar-chart"
            title="Analytics"
            color="#F59E0B"
            onPress={() => navigation.navigate('Analytics')}
          />
          <QuickActionCard
            icon="calendar"
            title="Schedule"
            color="#3B82F6"
            onPress={() => {}}
          />
        </View>
      </View>

      {/* Recent Activity */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        <Card>
          <ActivityItem
            icon="person-add"
            title="New student enrolled"
            description="John Smith joined Grade 10-A"
            time="2 hours ago"
            color="#4F46E5"
          />
          <ActivityItem
            icon="document-text"
            title="Assignment submitted"
            description="Math Assignment by Grade 9-B"
            time="4 hours ago"
            color="#10B981"
          />
          <ActivityItem
            icon="wallet"
            title="Fee payment received"
            description="NPR 25,000 from Sarah Johnson"
            time="5 hours ago"
            color="#F59E0B"
          />
        </Card>
      </View>

      <View style={{ height: spacing.xxl }} />
    </ScrollView>
  );
};

const QuickActionCard: React.FC<{
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  color: string;
  onPress: () => void;
}> = ({ icon, title, color, onPress }) => (
  <TouchableOpacity style={styles.quickActionCard} onPress={onPress}>
    <View style={[styles.quickActionIcon, { backgroundColor: `${color}15` }]}>
      <Ionicons name={icon} size={28} color={color} />
    </View>
    <Text style={styles.quickActionTitle}>{title}</Text>
  </TouchableOpacity>
);

const ActivityItem: React.FC<{
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  time: string;
  color: string;
}> = ({ icon, title, description, time, color }) => (
  <View style={styles.activityItem}>
    <View style={[styles.activityIcon, { backgroundColor: `${color}15` }]}>
      <Ionicons name={icon} size={20} color={color} />
    </View>
    <View style={styles.activityContent}>
      <Text style={styles.activityTitle}>{title}</Text>
      <Text style={styles.activityDescription}>{description}</Text>
      <Text style={styles.activityTime}>{time}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: '#FFFFFF',
  },
  greeting: {
    fontSize: fontSize.sm,
    color: '#6B7280',
  },
  userName: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: '#111827',
    marginTop: spacing.xs,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconButton: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: fontWeight.bold,
  },
  section: {
    padding: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: '#111827',
    marginBottom: spacing.md,
  },
  viewAll: {
    fontSize: fontSize.sm,
    color: '#4F46E5',
    fontWeight: fontWeight.semibold,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  quickActionCard: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: spacing.lg,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  quickActionTitle: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: '#111827',
    textAlign: 'center',
  },
  activityItem: {
    flexDirection: 'row',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: '#111827',
    marginBottom: spacing.xs,
  },
  activityDescription: {
    fontSize: fontSize.sm,
    color: '#6B7280',
    marginBottom: spacing.xs,
  },
  activityTime: {
    fontSize: fontSize.xs,
    color: '#9CA3AF',
  },
});

export default AdminDashboardScreen;
