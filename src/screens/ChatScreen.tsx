import React from 'react';
import { View, StyleSheet } from 'react-native';
import { EmptyState } from '../components/EmptyState';

const ChatScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <EmptyState
        icon="chatbubbles-outline"
        title="No messages"
        message="Start a conversation"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
});

export default ChatScreen;
