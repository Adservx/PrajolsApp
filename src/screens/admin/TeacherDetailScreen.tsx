import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { spacing, fontSize } from '../../utils/theme';

const TeacherDetailScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Teacher Details</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB', justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: fontSize.lg, color: '#6B7280' },
});

export default TeacherDetailScreen;
