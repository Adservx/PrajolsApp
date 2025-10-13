import React from 'react';
import { View, StyleSheet } from 'react-native';
import { EmptyState } from '../../components/EmptyState';

const ClassListScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <EmptyState icon="book-outline" title="No classes" message="Your classes will appear here" />
    </View>
  );
};

const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#F9FAFB' } });
export default ClassListScreen;
