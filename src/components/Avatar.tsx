import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { getInitials } from '../utils/helpers';

interface AvatarProps {
  source?: string;
  firstName?: string;
  lastName?: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  backgroundColor?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  source,
  firstName = '',
  lastName = '',
  size = 'medium',
  backgroundColor = '#4F46E5',
}) => {
  const sizeMap = {
    small: 32,
    medium: 48,
    large: 64,
    xlarge: 96,
  };

  const fontSizeMap = {
    small: 14,
    medium: 18,
    large: 24,
    xlarge: 36,
  };

  const dimension = sizeMap[size];
  const fontSize = fontSizeMap[size];

  return (
    <View
      style={[
        styles.container,
        {
          width: dimension,
          height: dimension,
          borderRadius: dimension / 2,
          backgroundColor: source ? 'transparent' : backgroundColor,
        },
      ]}
    >
      {source ? (
        <Image source={{ uri: source }} style={styles.image} />
      ) : (
        <Text style={[styles.initials, { fontSize }]}>
          {getInitials(firstName, lastName)}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  initials: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
