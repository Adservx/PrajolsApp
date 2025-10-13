import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChatRoomScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Chat Room</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
});

export default ChatRoomScreen;
