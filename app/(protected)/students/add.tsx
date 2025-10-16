import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';

export default function AddStudentScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [grade, setGrade] = useState('');
  const [enrollmentDate, setEnrollmentDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!name || !email || !grade) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const gradeNum = parseInt(grade);
    if (isNaN(gradeNum) || gradeNum < 1 || gradeNum > 12) {
      Alert.alert('Error', 'Grade must be between 1 and 12');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from('students').insert([
        {
          name,
          email,
          grade: gradeNum,
          enrollment_date: enrollmentDate,
          user_id: null,
        },
      ]);

      if (error) throw error;

      Alert.alert('Success', 'Student added successfully');
      router.back();
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TextInput
          label="Name *"
          value={name}
          onChangeText={setName}
          style={styles.input}
          mode="outlined"
        />

        <TextInput
          label="Email *"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
          mode="outlined"
        />

        <TextInput
          label="Grade (1-12) *"
          value={grade}
          onChangeText={setGrade}
          keyboardType="number-pad"
          style={styles.input}
          mode="outlined"
        />

        <TextInput
          label="Enrollment Date (YYYY-MM-DD)"
          value={enrollmentDate}
          onChangeText={setEnrollmentDate}
          style={styles.input}
          mode="outlined"
          placeholder="2024-09-01"
        />

        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={loading}
          disabled={loading}
          style={styles.button}
        >
          Add Student
        </Button>

        <Button
          mode="outlined"
          onPress={() => router.back()}
          disabled={loading}
          style={styles.button}
        >
          Cancel
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginBottom: 12,
  },
});
