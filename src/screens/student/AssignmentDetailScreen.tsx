import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AssignmentDetailScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Assignment Details</Text>
    </View>
  );
};

const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#F9FAFB' } });
export default AssignmentDetailScreen;
