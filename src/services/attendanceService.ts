import { supabase } from './supabase';
import { Attendance } from '../types';

class AttendanceService {
  private tableName = 'attendance';

  async getAttendance(filters: { classId?: string; studentId?: string; date?: Date }): Promise<Attendance[]> {
    try {
      let query = supabase.from(this.tableName).select('*');

      if (filters.classId) {
        query = query.eq('class_id', filters.classId);
      }
      if (filters.studentId) {
        query = query.eq('student_id', filters.studentId);
      }
      if (filters.date) {
        const dateStr = filters.date.toISOString().split('T')[0];
        query = query.eq('date', dateStr);
      }

      const { data, error } = await query;

      if (error) throw error;

      return (data || []).map((record: any) => ({
        id: record.id,
        studentId: record.student_id,
        classId: record.class_id,
        date: new Date(record.date),
        status: record.status,
        markedBy: record.marked_by,
        remarks: record.remarks,
        createdAt: record.created_at,
      }));
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch attendance');
    }
  }

  async markAttendance(data: Partial<Attendance>): Promise<Attendance> {
    try {
      const attendanceData = {
        student_id: data.studentId,
        class_id: data.classId,
        date: data.date ? data.date.toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        status: data.status,
        marked_by: data.markedBy,
        remarks: data.remarks,
      };

      const { data: result, error } = await supabase
        .from(this.tableName)
        .insert([attendanceData])
        .select()
        .single();

      if (error) throw error;

      return {
        id: result.id,
        studentId: result.student_id,
        classId: result.class_id,
        date: new Date(result.date),
        status: result.status,
        markedBy: result.marked_by,
        remarks: result.remarks,
        createdAt: result.created_at,
      };
    } catch (error: any) {
      throw new Error(error.message || 'Failed to mark attendance');
    }
  }

  async bulkMarkAttendance(records: Partial<Attendance>[]): Promise<Attendance[]> {
    try {
      const attendanceData = records.map(record => ({
        student_id: record.studentId,
        class_id: record.classId,
        date: record.date ? record.date.toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        status: record.status,
        marked_by: record.markedBy,
        remarks: record.remarks,
      }));

      const { data, error } = await supabase
        .from(this.tableName)
        .insert(attendanceData)
        .select();

      if (error) throw error;

      return (data || []).map((result: any) => ({
        id: result.id,
        studentId: result.student_id,
        classId: result.class_id,
        date: new Date(result.date),
        status: result.status,
        markedBy: result.marked_by,
        remarks: result.remarks,
        createdAt: result.created_at,
      }));
    } catch (error: any) {
      throw new Error(error.message || 'Failed to bulk mark attendance');
    }
  }

  async getAttendanceStats(studentId: string, startDate: Date, endDate: Date) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('status')
        .eq('student_id', studentId)
        .gte('date', startDate.toISOString().split('T')[0])
        .lte('date', endDate.toISOString().split('T')[0]);

      if (error) throw error;

      let present = 0;
      let absent = 0;
      let late = 0;
      let excused = 0;

      (data || []).forEach((record: any) => {
        switch (record.status) {
          case 'present':
            present++;
            break;
          case 'absent':
            absent++;
            break;
          case 'late':
            late++;
            break;
          case 'excused':
            excused++;
            break;
        }
      });

      const total = present + absent + late + excused;
      const attendanceRate = total > 0 ? (present / total) * 100 : 0;

      return {
        present,
        absent,
        late,
        excused,
        total,
        attendanceRate,
      };
    } catch (error: any) {
      throw new Error(error.message || 'Failed to get attendance stats');
    }
  }
}

export const attendanceService = new AttendanceService();
export default attendanceService;
