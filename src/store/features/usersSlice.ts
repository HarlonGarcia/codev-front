import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { User } from '../../types/User';
import { api } from '../../api';

interface Filters {
  startsWith?: string;
}

interface UsersState {
  users: User[];
  filters: Filters,
  currentUser: User | null;
  isLoading: boolean;
  isError: boolean;
}

const initialState: UsersState = {
  users: [],
  filters: {},
  currentUser: null,
  isLoading: false,
  isError: false,
};

export const getAllUsers = createAsyncThunk('users/getAllUsers', async (filters: Filters) => {
  const response = await api.get('/users', { params: filters });

  return response.data ?? [];
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    });
    builder.addCase(getAllUsers.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  }
});

export const usersReducer = usersSlice.reducer;