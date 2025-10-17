import 'package:supabase_flutter/supabase_flutter.dart';
import '../models/teacher.dart';

class TeacherService {
  final SupabaseClient _supabase = Supabase.instance.client;

  // Get all teachers
  Future<List<Teacher>> getAllTeachers() async {
    final response = await _supabase
        .from('teachers')
        .select()
        .order('name', ascending: true);
    
    return (response as List)
        .map((json) => Teacher.fromJson(json))
        .toList();
  }

  // Get teacher by ID
  Future<Teacher?> getTeacherById(String id) async {
    final response = await _supabase
        .from('teachers')
        .select()
        .eq('id', id)
        .maybeSingle();
    
    return response != null ? Teacher.fromJson(response) : null;
  }

  // Create teacher
  Future<Teacher> createTeacher(Teacher teacher) async {
    final response = await _supabase
        .from('teachers')
        .insert(teacher.toInsert())
        .select()
        .single();
    
    return Teacher.fromJson(response);
  }

  // Update teacher
  Future<Teacher> updateTeacher(String id, Map<String, dynamic> updates) async {
    final response = await _supabase
        .from('teachers')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
    
    return Teacher.fromJson(response);
  }

  // Delete teacher
  Future<void> deleteTeacher(String id) async {
    await _supabase
        .from('teachers')
        .delete()
        .eq('id', id);
  }

  // Search teachers
  Future<List<Teacher>> searchTeachers(String query) async {
    final response = await _supabase
        .from('teachers')
        .select()
        .or('name.ilike.%$query%,email.ilike.%$query%,subject.ilike.%$query%')
        .order('name', ascending: true);
    
    return (response as List)
        .map((json) => Teacher.fromJson(json))
        .toList();
  }
}
