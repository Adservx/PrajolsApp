import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, ActivityIndicator } from 'react-native-paper';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { supabase, Student } from '@/lib/supabase';

export default function EditStudentScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [student, setStudent] = useState<Student | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [grade, setGrade] = useState('');
  const [enrollmentDate, setEnrollmentDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchStudent();
  }, [id]);

  const fetchStudent = async () => {
    try {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      setStudent(data);
      setName(data.name);
      setEmail(data.email);
      setGrade(data.grade.toString());
      setEnrollmentDate(data.enrollment_date);
    } catch (error: any) {
      Alert.alert('Error', error.message);
      router.back();
    } finally {
      setLoading(false);
    }
  };

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

    setSaving(true);
    try {
      const { error } = await supabase
        .from('students')
        .update({
          name,
          email,
          grade: gradeNum,
          enrollment_date: enrollmentDate,
        })
        .eq('id', id);

      if (error) throw error;

      Alert.alert('Success', 'Student updated successfully');
      router.back();
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

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
        />

        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={saving}
          disabled={saving}
          style={styles.button}
        >
          Update Student
        </Button>

        <Button
          mode="outlined"
          onPress={() => router.back()}
          disabled={saving}
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
