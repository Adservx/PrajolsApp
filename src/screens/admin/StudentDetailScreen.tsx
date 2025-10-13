import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Avatar } from '../../components/Avatar';
import { Card } from '../../components/Card';
import { spacing, fontSize, fontWeight } from '../../utils/theme';

const StudentDetailScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Card style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <Avatar firstName="John" lastName="Doe" size="xlarge" />
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.studentId}>Student ID: STU001</Text>
        </View>
      </Card>
      
      <Card style={styles.infoCard}>
        <Text style={styles.cardTitle}>Personal Information</Text>
        <InfoRow label="Email" value="john.doe@example.com" />
        <InfoRow label="Phone" value="+977 9812345678" />
        <InfoRow label="Grade" value="10-A" />
        <InfoRow label="Date of Birth" value="Jan 15, 2010" />
      </Card>
    </ScrollView>
  );
};

const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  profileCard: { margin: spacing.lg, alignItems: 'center' },
  profileHeader: { alignItems: 'center', paddingVertical: spacing.lg },
  name: { fontSize: fontSize.xxl, fontWeight: fontWeight.bold, marginTop: spacing.md },
  studentId: { fontSize: fontSize.sm, color: '#6B7280', marginTop: spacing.xs },
  infoCard: { margin: spacing.lg, marginTop: 0 },
  cardTitle: { fontSize: fontSize.lg, fontWeight: fontWeight.bold, marginBottom: spacing.md },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.sm },
  label: { fontSize: fontSize.md, color: '#6B7280' },
  value: { fontSize: fontSize.md, fontWeight: fontWeight.semibold, color: '#111827' },
});

export default StudentDetailScreen;
