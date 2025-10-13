import React from 'react';
import { View, StyleSheet } from 'react-native';
import { EmptyState } from '../../components/EmptyState';

const ScheduleScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <EmptyState icon="calendar-outline" title="Schedule" message="Your class schedule will appear here" />
    </View>
  );
};

const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#F9FAFB' } });
export default ScheduleScreen;
