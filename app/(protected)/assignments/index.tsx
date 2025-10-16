import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Card, Text, ActivityIndicator, Chip } from 'react-native-paper';
import { supabase, Assignment } from '@/lib/supabase';
import { format } from 'date-fns';

interface AssignmentWithClass extends Assignment {
  class?: {
    name: string;
    subject: string;
  };
}

export default function AssignmentsScreen() {
  const [assignments, setAssignments] = useState<AssignmentWithClass[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssignments();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('assignments-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'assignments' },
        (payload) => {
          console.log('Assignments changed:', payload);
          fetchAssignments();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchAssignments = async () => {
    try {
      const { data, error } = await supabase
        .from('assignments')
        .select(`
          *,
          class:classes(name, subject)
        `)
        .order('due_date', { ascending: true });

      if (error) throw error;
      setAssignments(data || []);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  const renderAssignment = ({ item }: { item: AssignmentWithClass }) => {
    const overdue = isOverdue(item.due_date);

    return (
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <Text variant="titleMedium" style={styles.assignmentTitle}>
              {item.title}
            </Text>
            {overdue && (
              <Chip mode="flat" textStyle={styles.overdueText} style={styles.overdueChip}>
                Overdue
              </Chip>
            )}
          </View>
          
          <Text variant="bodyMedium" style={styles.description}>
            {item.description}
          </Text>

          {item.class && (
            <Text variant="bodySmall" style={styles.classInfo}>
              📚 {item.class.name} ({item.class.subject})
            </Text>
          )}

          <Text variant="bodySmall" style={[styles.dueDate, overdue && styles.dueDateOverdue]}>
            Due: {format(new Date(item.due_date), 'MMM dd, yyyy')}
          </Text>
        </Card.Content>
      </Card>
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {assignments.length === 0 ? (
        <View style={styles.centered}>
          <Text variant="bodyLarge">No assignments found</Text>
          <Text variant="bodySmall" style={styles.hintText}>
            Assignments will appear here when teachers add them
          </Text>
        </View>
      ) : (
        <FlatList
          data={assignments}
          renderItem={renderAssignment}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      )}
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
    marginBottom: 8,
  },
  assignmentTitle: {
    fontWeight: 'bold',
    flex: 1,
  },
  description: {
    color: '#666',
    marginBottom: 8,
  },
  classInfo: {
    color: '#444',
    marginBottom: 4,
  },
  dueDate: {
    color: '#999',
    fontWeight: '500',
  },
  dueDateOverdue: {
    color: '#d32f2f',
  },
  overdueChip: {
    backgroundColor: '#ffebee',
  },
  overdueText: {
    color: '#d32f2f',
    fontSize: 12,
  },
  hintText: {
    marginTop: 8,
    color: '#999',
    textAlign: 'center',
  },
});
