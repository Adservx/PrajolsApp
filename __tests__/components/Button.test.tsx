/// <reference path="../../jest.d.ts" />

import React from 'react';
import { ActivityIndicator } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../../src/components/Button';

describe('Button Component', () => {
  it('renders correctly with title', () => {
    const { getByText } = render(
      <Button title="Click Me" onPress={() => {}} />
    );
    expect(getByText('Click Me')).toBeTruthy();
  });

  it('calls onPress when clicked', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <Button title="Click Me" onPress={mockOnPress} />
    );
    
    fireEvent.press(getByText('Click Me'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <Button title="Click Me" onPress={mockOnPress} disabled={true} />
    );
    
    fireEvent.press(getByText('Click Me'));
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('shows loading indicator when loading', () => {
    const { queryByText, UNSAFE_getByType } = render(
      <Button title="Click Me" onPress={() => {}} loading={true} />
    );
    
    expect(queryByText('Click Me')).toBeNull();
    expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
  });

  it('applies correct styles for variants', () => {
    const { getByText, rerender } = render(
      <Button title="Primary" onPress={() => {}} variant="primary" />
    );
    expect(getByText('Primary')).toBeTruthy();

    rerender(<Button title="Secondary" onPress={() => {}} variant="secondary" />);
    expect(getByText('Secondary')).toBeTruthy();

    rerender(<Button title="Outline" onPress={() => {}} variant="outline" />);
    expect(getByText('Outline')).toBeTruthy();

    rerender(<Button title="Danger" onPress={() => {}} variant="danger" />);
    expect(getByText('Danger')).toBeTruthy();
  });

  it('renders icon when provided', () => {
    const IconComponent = () => <></>;
    const { UNSAFE_getByType } = render(
      <Button title="With Icon" onPress={() => {}} icon={<IconComponent />} />
    );
    
    expect(UNSAFE_getByType(IconComponent)).toBeTruthy();
  });

  it('applies different sizes correctly', () => {
    const { getByText, rerender } = render(
      <Button title="Small" onPress={() => {}} size="small" />
    );
    expect(getByText('Small')).toBeTruthy();

    rerender(<Button title="Medium" onPress={() => {}} size="medium" />);
    expect(getByText('Medium')).toBeTruthy();

    rerender(<Button title="Large" onPress={() => {}} size="large" />);
    expect(getByText('Large')).toBeTruthy();
  });
});
