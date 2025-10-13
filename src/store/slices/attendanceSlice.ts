import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AttendanceState, Attendance } from '../../types';
import { attendanceService } from '../../services/attendanceService';

const initialState: AttendanceState = {
  records: [],
  isLoading: false,
  error: null,
};

export const fetchAttendance = createAsyncThunk(
  'attendance/fetchAll',
  async (filters: { classId?: string; studentId?: string; date?: Date }, { rejectWithValue }) => {
    try {
      return await attendanceService.getAttendance(filters);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch attendance');
    }
  }
);

export const markAttendance = createAsyncThunk(
  'attendance/mark',
  async (data: Partial<Attendance>, { rejectWithValue }) => {
    try {
      return await attendanceService.markAttendance(data);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to mark attendance');
    }
  }
);

export const bulkMarkAttendance = createAsyncThunk(
  'attendance/bulkMark',
  async (records: Partial<Attendance>[], { rejectWithValue }) => {
    try {
      return await attendanceService.bulkMarkAttendance(records);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to mark attendance');
    }
  }
);

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearRecords: (state) => {
      state.records = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttendance.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAttendance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.records = action.payload;
      })
      .addCase(fetchAttendance.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(markAttendance.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(markAttendance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.records.push(action.payload);
      })
      .addCase(markAttendance.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(bulkMarkAttendance.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(bulkMarkAttendance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.records.push(...action.payload);
      })
      .addCase(bulkMarkAttendance.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearRecords } = attendanceSlice.actions;
export default attendanceSlice.reducer;
