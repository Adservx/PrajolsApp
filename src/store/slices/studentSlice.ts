import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { StudentState, Student } from '../../types';
import { studentService } from '../../services/studentService';

const initialState: StudentState = {
  students: [],
  selectedStudent: null,
  isLoading: false,
  error: null,
};

// Async Thunks
export const fetchStudents = createAsyncThunk(
  'students/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await studentService.getAllStudents();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch students');
    }
  }
);

export const fetchStudentById = createAsyncThunk(
  'students/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      return await studentService.getStudentById(id);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch student');
    }
  }
);

export const createStudent = createAsyncThunk(
  'students/create',
  async (studentData: Partial<Student>, { rejectWithValue }) => {
    try {
      return await studentService.createStudent(studentData);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create student');
    }
  }
);

export const updateStudent = createAsyncThunk(
  'students/update',
  async ({ id, data }: { id: string; data: Partial<Student> }, { rejectWithValue }) => {
    try {
      return await studentService.updateStudent(id, data);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update student');
    }
  }
);

export const deleteStudent = createAsyncThunk(
  'students/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await studentService.deleteStudent(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete student');
    }
  }
);

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSelectedStudent: (state, action: PayloadAction<Student | null>) => {
      state.selectedStudent = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch All
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch By ID
    builder
      .addCase(fetchStudentById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStudentById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedStudent = action.payload;
      })
      .addCase(fetchStudentById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Create
    builder
      .addCase(createStudent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.students.push(action.payload);
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Update
    builder
      .addCase(updateStudent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.students.findIndex(s => s.id === action.payload.id);
        if (index !== -1) {
          state.students[index] = action.payload;
        }
        if (state.selectedStudent?.id === action.payload.id) {
          state.selectedStudent = action.payload;
        }
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Delete
    builder
      .addCase(deleteStudent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.students = state.students.filter(s => s.id !== action.payload);
        if (state.selectedStudent?.id === action.payload) {
          state.selectedStudent = null;
        }
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setSelectedStudent } = studentSlice.actions;
export default studentSlice.reducer;
