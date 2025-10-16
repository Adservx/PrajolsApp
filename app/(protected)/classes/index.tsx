import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Card, Text, FAB, IconButton, ActivityIndicator } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { supabase, Class } from '@/lib/supabase';

export default function ClassesScreen() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchClasses();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('classes-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'classes' },
        (payload) => {
          console.log('Classes changed:', payload);
          fetchClasses();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchClasses = async () => {
    try {
      const { data, error } = await supabase
        .from('classes')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      setClasses(data || []);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    Alert.alert('Delete Class', `Are you sure you want to delete ${name}?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            const { error } = await supabase.from('classes').delete().eq('id', id);
            if (error) throw error;
            Alert.alert('Success', 'Class deleted successfully');
          } catch (error: any) {
            Alert.alert('Error', error.message);
          }
        },
      },
    ]);
  };

  const renderClass = ({ item }: { item: Class }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.cardHeader}>
          <View style={styles.cardInfo}>
            <Text variant="titleMedium" style={styles.className}>
              {item.name}
            </Text>
            <Text variant="bodyMedium" style={styles.classSubject}>
              Subject: {item.subject}
            </Text>
          </View>
          <IconButton
            icon="delete"
            size={20}
            iconColor="#d32f2f"
            onPress={() => handleDelete(item.id, item.name)}
          />
        </View>
      </Card.Content>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {classes.length === 0 ? (
        <View style={styles.centered}>
          <Text variant="bodyLarge">No classes found</Text>
          <Text variant="bodySmall" style={styles.hintText}>
            Add your first class using the + button
          </Text>
        </View>
      ) : (
        <FlatList
          data={classes}
          renderItem={renderClass}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      )}

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => router.push('/(protected)/classes/add')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 12,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardInfo: {
    flex: 1,
  },
  className: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  classSubject: {
    color: '#666',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  hintText: {
    marginTop: 8,
    color: '#999',
    textAlign: 'center',
  },
});
