import React from 'react';
import { View, StyleSheet } from 'react-native';
import { EmptyState } from '../../components/EmptyState';

const GradesScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <EmptyState icon="trophy-outline" title="Grades" message="Your grades will appear here" />
    </View>
  );
};

const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#F9FAFB' } });
export default GradesScreen;
