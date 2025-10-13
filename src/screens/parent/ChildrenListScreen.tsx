import React from 'react';
import { View, StyleSheet } from 'react-native';
import { EmptyState } from '../../components/EmptyState';

const ChildrenListScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <EmptyState icon="people-outline" title="No children" message="Link your children's accounts" />
    </View>
  );
};

const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#F9FAFB' } });
export default ChildrenListScreen;
