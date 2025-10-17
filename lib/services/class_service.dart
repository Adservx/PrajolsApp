import 'package:supabase_flutter/supabase_flutter.dart';
import '../models/class_model.dart';

class ClassService {
  final SupabaseClient _supabase = Supabase.instance.client;

  // Get all classes
  Future<List<ClassModel>> getAllClasses() async {
    final response = await _supabase
        .from('classes')
        .select()
        .order('grade', ascending: true);
    
    return (response as List)
        .map((json) => ClassModel.fromJson(json))
        .toList();
  }

  // Get class by ID
  Future<ClassModel?> getClassById(String id) async {
    final response = await _supabase
        .from('classes')
        .select()
        .eq('id', id)
        .maybeSingle();
    
    return response != null ? ClassModel.fromJson(response) : null;
  }

  // Create class
  Future<ClassModel> createClass(ClassModel classModel) async {
    final response = await _supabase
        .from('classes')
        .insert(classModel.toInsert())
        .select()
        .single();
    
    return ClassModel.fromJson(response);
  }

  // Update class
  Future<ClassModel> updateClass(String id, Map<String, dynamic> updates) async {
    final response = await _supabase
        .from('classes')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
    
    return ClassModel.fromJson(response);
  }

  // Delete class
  Future<void> deleteClass(String id) async {
    await _supabase
        .from('classes')
        .delete()
        .eq('id', id);
  }
}
