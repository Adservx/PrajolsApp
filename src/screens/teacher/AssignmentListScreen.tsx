import React from 'react';
import { View, StyleSheet } from 'react-native';
import { EmptyState } from '../../components/EmptyState';

const AssignmentListScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <EmptyState icon="document-text-outline" title="No assignments" message="Create assignments for your students" actionText="Create Assignment" onAction={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#F9FAFB' } });
export default AssignmentListScreen;
