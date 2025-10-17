import 'package:supabase_flutter/supabase_flutter.dart';
import '../models/student.dart';

class StudentService {
  final SupabaseClient _supabase = Supabase.instance.client;

  // Get all students
  Future<List<Student>> getAllStudents() async {
    final response = await _supabase
        .from('students')
        .select()
        .order('name', ascending: true);
    
    return (response as List)
        .map((json) => Student.fromJson(json))
        .toList();
  }

  // Get student by ID
  Future<Student?> getStudentById(String id) async {
    final response = await _supabase
        .from('students')
        .select()
        .eq('id', id)
        .maybeSingle();
    
    return response != null ? Student.fromJson(response) : null;
  }

  // Create student
  Future<Student> createStudent(Student student) async {
    final response = await _supabase
        .from('students')
        .insert(student.toInsert())
        .select()
        .single();
    
    return Student.fromJson(response);
  }

  // Update student
  Future<Student> updateStudent(String id, Map<String, dynamic> updates) async {
    final response = await _supabase
        .from('students')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
    
    return Student.fromJson(response);
  }

  // Delete student
  Future<void> deleteStudent(String id) async {
    await _supabase
        .from('students')
        .delete()
        .eq('id', id);
  }

  // Search students by name or email
  Future<List<Student>> searchStudents(String query) async {
    final response = await _supabase
        .from('students')
        .select()
        .or('name.ilike.%$query%,email.ilike.%$query%')
        .order('name', ascending: true);
    
    return (response as List)
        .map((json) => Student.fromJson(json))
        .toList();
  }

  // Get students by grade
  Future<List<Student>> getStudentsByGrade(String grade) async {
    final response = await _supabase
        .from('students')
        .select()
        .eq('grade', grade)
        .order('name', ascending: true);
    
    return (response as List)
        .map((json) => Student.fromJson(json))
        .toList();
  }
}
