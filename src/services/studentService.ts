import { apiClient } from './api';
import { supabase } from './supabase';
import { Student } from '../types';

class StudentService {
  private tableName = 'students';

  async getAllStudents(): Promise<Student[]> {
    try {
      const { data, error } = await supabase.from(this.tableName).select('*');
      if (error) throw error;
      return data as Student[];
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch students');
    }
  }

  async getStudentById(id: string): Promise<Student> {
    try {
      const { data, error } = await supabase.from(this.tableName).select('*').eq('id', id).single();
      if (error) throw error;
      if (!data) throw new Error('Student not found');
      return data as Student;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch student');
    }
  }

  async getStudentsByGrade(grade: string): Promise<Student[]> {
    try {
      const { data, error } = await supabase.from(this.tableName).select('*').eq('grade', grade);
      if (error) throw error;
      return data as Student[];
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch students by grade');
    }
  }

  async createStudent(studentData: Partial<Student>): Promise<Student> {
    try {
      const { data, error } = await supabase.from(this.tableName).insert([studentData]).select().single();
      if (error) throw error;
      return data as Student;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to create student');
    }
  }

  async updateStudent(id: string, updateData: Partial<Student>): Promise<Student> {
    try {
      const { data, error } = await supabase.from(this.tableName).update(updateData).eq('id', id).select().single();
      if (error) throw error;
      return data as Student;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update student');
    }
  }

  async deleteStudent(id: string): Promise<void> {
    try {
      const { error } = await supabase.from(this.tableName).delete().eq('id', id);
      if (error) throw error;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to delete student');
    }
  }

  async searchStudents(searchTerm: string): Promise<Student[]> {
    try {
      // In a real app, you would use a search service like Algolia
      // This is a simple implementation using Firestore
      const allStudents = await this.getAllStudents();
      const lowerSearchTerm = searchTerm.toLowerCase();
      
      return allStudents.filter(student => 
        student.firstName.toLowerCase().includes(lowerSearchTerm) ||
        student.lastName.toLowerCase().includes(lowerSearchTerm) ||
        student.email.toLowerCase().includes(lowerSearchTerm) ||
        student.studentId.toLowerCase().includes(lowerSearchTerm)
      );
    } catch (error: any) {
      throw new Error(error.message || 'Failed to search students');
    }
  }
}

export const studentService = new StudentService();
export default studentService;
