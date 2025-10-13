import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChildProgressScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Child Progress</Text>
    </View>
  );
};

const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#F9FAFB' } });
export default ChildProgressScreen;
