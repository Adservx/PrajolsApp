import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AttendanceScannerScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>QR Code Scanner for Attendance</Text>
    </View>
  );
};

const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' } });
export default AttendanceScannerScreen;
