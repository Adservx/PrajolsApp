import React from 'react';
import { View, StyleSheet } from 'react-native';
import { EmptyState } from '../../components/EmptyState';

const GradeEntryScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <EmptyState icon="create-outline" title="Grade Entry" message="Enter grades for students" />
    </View>
  );
};

const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#F9FAFB' } });
export default GradeEntryScreen;
