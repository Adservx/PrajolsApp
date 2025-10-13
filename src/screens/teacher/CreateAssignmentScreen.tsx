import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CreateAssignmentScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Create Assignment Form</Text>
    </View>
  );
};

const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#F9FAFB', padding: 20 } });
export default CreateAssignmentScreen;
