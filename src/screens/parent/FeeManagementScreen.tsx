import React from 'react';
import { View, StyleSheet } from 'react-native';
import { EmptyState } from '../../components/EmptyState';

const FeeManagementScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <EmptyState icon="wallet-outline" title="Fee Management" message="Manage your children's fees" />
    </View>
  );
};

const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#F9FAFB' } });
export default FeeManagementScreen;
