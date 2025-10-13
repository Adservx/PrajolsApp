import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { spacing, fontSize, fontWeight } from '../../utils/theme';

const FeePaymentScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.title}>Fee Summary</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Total Fee</Text>
          <Text style={styles.value}>NPR 50,000</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Paid</Text>
          <Text style={[styles.value, { color: '#10B981' }]}>NPR 50,000</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Pending</Text>
          <Text style={[styles.value, { color: '#EF4444' }]}>NPR 0</Text>
        </View>
        <Button title="Pay Now" onPress={() => {}} style={{ marginTop: spacing.lg }} />
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB', padding: spacing.lg },
  card: {},
  title: { fontSize: fontSize.xl, fontWeight: fontWeight.bold, marginBottom: spacing.lg },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.sm },
  label: { fontSize: fontSize.md, color: '#6B7280' },
  value: { fontSize: fontSize.md, fontWeight: fontWeight.semibold, color: '#111827' },
});

export default FeePaymentScreen;
