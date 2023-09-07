import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { User } from '../../types/User';
import { api } from '../../api';

interface Filters {
  startsWith?: string;
}

interface UserState {
  users: User[];
  filters: Filters,
  currentUser: User | null;
  isLoading: boolean;
  isError: boolean;
}

const initialState: UserState = {
  users: [],
  filters: {},
  currentUser: null,
  isLoading: false,
  isError: false,
};

export const getAllUsers = createAsyncThunk('users/getAllUsers', async (filters: Filters | undefined) => {
  const response = await api.get('/users', { params: filters });

  return response.data ?? [];
});

export const getUserById = createAsyncThunk('users/getUserById', async (id: string) => {
  const response = await api.get(`/users/${id}`);

  return response.data ?? [];
});

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getAllUsers.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });

    builder.addCase(getUserById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserById.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getUserById.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });
  }
});

export const usersReducer = userSlice.reducer;