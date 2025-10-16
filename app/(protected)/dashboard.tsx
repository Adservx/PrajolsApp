import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Card, Text, Button, Divider } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { seedDatabaseWithSampleData } from '@/utils/seedData';
import { StatusBar } from 'expo-status-bar';

export default function DashboardScreen() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await signOut();
        },
      },
    ]);
  };

  const canManageStudents = user?.role === 'admin' || user?.role === 'teacher';
  const canManageClasses = user?.role === 'admin' || user?.role === 'teacher';

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />
      
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineSmall" style={styles.welcomeText}>
            Welcome, {user?.email}
          </Text>
          <Text variant="bodyMedium" style={styles.roleText}>
            Role: {user?.role?.toUpperCase()}
          </Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Quick Actions
          </Text>
          <Divider style={styles.divider} />

          {canManageStudents && (
            <Button
              mode="contained"
              icon="account-group"
              onPress={() => router.push('/(protected)/students')}
              style={styles.actionButton}
            >
              Manage Students
            </Button>
          )}

          {canManageClasses && (
            <Button
              mode="contained"
              icon="book-open-variant"
              onPress={() => router.push('/(protected)/classes')}
              style={styles.actionButton}
            >
              Manage Classes
            </Button>
          )}

          <Button
            mode="contained"
            icon="file-document"
            onPress={() => router.push('/(protected)/assignments')}
            style={styles.actionButton}
          >
            View Assignments
          </Button>
        </Card.Content>
      </Card>

      {user?.role === 'admin' && (
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Developer Tools
            </Text>
            <Divider style={styles.divider} />
            <Button
              mode="outlined"
              icon="database"
              onPress={seedDatabaseWithSampleData}
              style={styles.actionButton}
            >
              Seed Sample Data
            </Button>
          </Card.Content>
        </Card>
      )}

      <Card style={styles.card}>
        <Card.Content>
          <Button
            mode="contained"
            icon="logout"
            onPress={handleLogout}
            buttonColor="#d32f2f"
            style={styles.actionButton}
          >
            Logout
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  welcomeText: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  roleText: {
    color: '#666',
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  divider: {
    marginBottom: 16,
  },
  actionButton: {
    marginBottom: 12,
  },
});
