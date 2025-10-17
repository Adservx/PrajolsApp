import 'package:supabase_flutter/supabase_flutter.dart';
import '../models/attendance.dart';

class AttendanceService {
  final SupabaseClient _supabase = Supabase.instance.client;

  // Get all attendance records
  Future<List<Attendance>> getAllAttendance() async {
    final response = await _supabase
        .from('attendance')
        .select()
        .order('date', ascending: false);
    
    return (response as List)
        .map((json) => Attendance.fromJson(json))
        .toList();
  }

  // Get attendance by student ID
  Future<List<Attendance>> getAttendanceByStudent(String studentId) async {
    final response = await _supabase
        .from('attendance')
        .select()
        .eq('student_id', studentId)
        .order('date', ascending: false);
    
    return (response as List)
        .map((json) => Attendance.fromJson(json))
        .toList();
  }

  // Get attendance by date
  Future<List<Attendance>> getAttendanceByDate(DateTime date) async {
    final dateStr = date.toIso8601String().split('T')[0];
    final response = await _supabase
        .from('attendance')
        .select()
        .eq('date', dateStr);
    
    return (response as List)
        .map((json) => Attendance.fromJson(json))
        .toList();
  }

  // Create attendance record
  Future<Attendance> createAttendance(Attendance attendance) async {
    final response = await _supabase
        .from('attendance')
        .insert(attendance.toInsert())
        .select()
        .single();
    
    return Attendance.fromJson(response);
  }

  // Update attendance
  Future<Attendance> updateAttendance(String id, Map<String, dynamic> updates) async {
    final response = await _supabase
        .from('attendance')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
    
    return Attendance.fromJson(response);
  }

  // Delete attendance
  Future<void> deleteAttendance(String id) async {
    await _supabase
        .from('attendance')
        .delete()
        .eq('id', id);
  }
}
