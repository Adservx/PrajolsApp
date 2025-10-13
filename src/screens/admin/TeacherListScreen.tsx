import React from 'react';
import { View, StyleSheet } from 'react-native';
import { EmptyState } from '../../components/EmptyState';

const TeacherListScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <EmptyState
        icon="school-outline"
        title="No teachers found"
        message="Add teachers to get started"
        actionText="Add Teacher"
        onAction={() => {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
});

export default TeacherListScreen;
