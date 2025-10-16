import { supabase } from '@/lib/supabase';
import { Alert } from 'react-native';

export async function seedDatabaseWithSampleData() {
  try {
    // Check if data already exists
    const { data: existingStudents } = await supabase
      .from('students')
      .select('id')
      .limit(1);

    if (existingStudents && existingStudents.length > 0) {
      Alert.alert('Info', 'Sample data already exists in the database.');
      return;
    }

    // Get current user to use as admin/teacher
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      Alert.alert('Error', 'You must be logged in to seed data.');
      return;
    }

    // Insert sample students
    const { data: students, error: studentsError } = await supabase
      .from('students')
      .insert([
        {
          name: 'John Doe',
          email: 'john.doe@school.com',
          grade: 10,
          enrollment_date: '2024-09-01',
          user_id: null,
        },
        {
          name: 'Jane Smith',
          email: 'jane.smith@school.com',
          grade: 11,
          enrollment_date: '2024-09-01',
          user_id: null,
        },
        {
          name: 'Bob Johnson',
          email: 'bob.johnson@school.com',
          grade: 10,
          enrollment_date: '2024-09-01',
          user_id: null,
        },
        {
          name: 'Alice Williams',
          email: 'alice.williams@school.com',
          grade: 12,
          enrollment_date: '2024-09-01',
          user_id: null,
        },
        {
          name: 'Charlie Brown',
          email: 'charlie.brown@school.com',
          grade: 9,
          enrollment_date: '2024-09-01',
          user_id: null,
        },
      ])
      .select();

    if (studentsError) throw studentsError;

    // Insert sample classes
    const { data: classes, error: classesError } = await supabase
      .from('classes')
      .insert([
        {
          name: 'Math 101',
          subject: 'Mathematics',
          teacher_id: user.id,
        },
        {
          name: 'Science 201',
          subject: 'Science',
          teacher_id: user.id,
        },
        {
          name: 'English 301',
          subject: 'English Literature',
          teacher_id: user.id,
        },
      ])
      .select();

    if (classesError) throw classesError;

    // Insert sample assignments for each class
    if (classes && classes.length > 0) {
      const assignments = classes.flatMap((cls) => [
        {
          title: `${cls.subject} Assignment 1`,
          description: `Complete chapters 1-3 for ${cls.name}`,
          due_date: '2025-11-01',
          class_id: cls.id,
        },
        {
          title: `${cls.subject} Assignment 2`,
          description: `Project work for ${cls.name}`,
          due_date: '2025-11-15',
          class_id: cls.id,
        },
      ]);

      const { error: assignmentsError } = await supabase
        .from('assignments')
        .insert(assignments);

      if (assignmentsError) throw assignmentsError;
    }

    Alert.alert(
      'Success',
      `Sample data seeded successfully!\n\n` +
      `- ${students?.length || 0} students\n` +
      `- ${classes?.length || 0} classes\n` +
      `- ${(classes?.length || 0) * 2} assignments`
    );
  } catch (error: any) {
    console.error('Error seeding data:', error);
    Alert.alert('Error', `Failed to seed data: ${error.message}`);
  }
}
