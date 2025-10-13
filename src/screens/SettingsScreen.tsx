import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logoutUser } from '../store/slices/authSlice';
import { Card } from '../components/Card';
import { Avatar } from '../components/Avatar';
import { spacing, fontSize, fontWeight } from '../utils/theme';

const SettingsScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: () => dispatch(logoutUser()), style: 'destructive' },
      ]
    );
  };

  return (
    <>
      <ScrollView style={styles.container}>
        {/* Profile Section */}
        <Card style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <Avatar
              source={user?.avatar}
              firstName={user?.firstName}
              lastName={user?.lastName}
              size="large"
            />
            <View style={styles.profileInfo}>
              <Text style={styles.name}>{user?.firstName} {user?.lastName}</Text>
              <Text style={styles.email}>{user?.email}</Text>
              <View style={styles.roleBadge}>
                <Text style={styles.roleText}>{user?.role?.toUpperCase()}</Text>
              </View>
            </View>
          </View>
        </Card>

        {/* Settings Options */}
        <Card style={styles.settingsCard}>
          <SettingsItem icon="person-outline" title="Edit Profile" onPress={() => {}} />
          <SettingsItem icon="notifications-outline" title="Notifications" onPress={() => {}} />
          <SettingsItem icon="lock-closed-outline" title="Privacy & Security" onPress={() => {}} />
          <SettingsItem icon="moon-outline" title="Dark Mode" onPress={() => {}} />
          <SettingsItem icon="language-outline" title="Language" onPress={() => {}} />
        </Card>

        <Card style={styles.settingsCard}>
          <SettingsItem icon="help-circle-outline" title="Help & Support" onPress={() => {}} />
          <SettingsItem icon="document-text-outline" title="Terms & Conditions" onPress={() => {}} />
          <SettingsItem icon="shield-checkmark-outline" title="Privacy Policy" onPress={() => {}} />
        </Card>

        <TouchableOpacity 
          style={[styles.logoutButton, isLoading && styles.logoutButtonDisabled]} 
          onPress={handleLogout}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#EF4444" />
          ) : (
            <Ionicons name="log-out-outline" size={24} color="#EF4444" />
          )}
          <Text style={styles.logoutText}>{isLoading ? 'Logging out...' : 'Logout'}</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Version 1.0.0</Text>
      </ScrollView>

      {/* Loading Overlay */}
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4F46E5" />
            <Text style={styles.loadingText}>Logging out...</Text>
          </View>
        </View>
      )}
    </>
  );
};

const SettingsItem: React.FC<{
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  onPress: () => void;
}> = ({ icon, title, onPress }) => (
  <TouchableOpacity style={styles.settingsItem} onPress={onPress}>
    <View style={styles.settingsItemLeft}>
      <Ionicons name={icon} size={24} color="#6B7280" />
      <Text style={styles.settingsItemTitle}>{title}</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  profileCard: { margin: spacing.lg },
  profileHeader: { flexDirection: 'row', alignItems: 'center' },
  profileInfo: { marginLeft: spacing.md, flex: 1 },
  name: { fontSize: fontSize.xl, fontWeight: fontWeight.bold, color: '#111827' },
  email: { fontSize: fontSize.sm, color: '#6B7280', marginTop: spacing.xs },
  roleBadge: { 
    backgroundColor: '#EEF2FF', 
    paddingHorizontal: spacing.sm, 
    paddingVertical: 4, 
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: spacing.sm,
  },
  roleText: { fontSize: fontSize.xs, color: '#4F46E5', fontWeight: fontWeight.semibold },
  settingsCard: { margin: spacing.lg, marginTop: 0 },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingsItemLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  settingsItemTitle: { fontSize: fontSize.md, color: '#111827' },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    margin: spacing.lg,
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FEE2E2',
    gap: spacing.sm,
  },
  logoutButtonDisabled: {
    opacity: 0.6,
  },
  logoutText: { fontSize: fontSize.md, color: '#EF4444', fontWeight: fontWeight.semibold },
  version: { textAlign: 'center', fontSize: fontSize.sm, color: '#9CA3AF', marginBottom: spacing.xl },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  loadingContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    minWidth: 150,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
});

export default SettingsScreen;
