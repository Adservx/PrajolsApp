import React from 'react';
import { View, StyleSheet } from 'react-native';
import { EmptyState } from '../../components/EmptyState';

const AttendanceScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <EmptyState icon="checkbox-outline" title="Attendance" message="Mark attendance for your classes" />
    </View>
  );
};

const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#F9FAFB' } });
export default AttendanceScreen;
