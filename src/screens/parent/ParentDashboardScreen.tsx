import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAppSelector } from '../../store/hooks';
import { Card } from '../../components/Card';
import { Avatar } from '../../components/Avatar';
import { spacing, fontSize, fontWeight } from '../../utils/theme';

const ParentDashboardScreen: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome,</Text>
          <Text style={styles.userName}>{user?.firstName} {user?.lastName}</Text>
        </View>
        <Avatar source={user?.avatar} firstName={user?.firstName} lastName={user?.lastName} size="medium" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Children</Text>
        <Card>
          <Text style={styles.emptyText}>No children linked to your account</Text>
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
  emptyText: { textAlign: 'center', color: '#6B7280', paddingVertical: spacing.lg },
});

export default ParentDashboardScreen;
