import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { User } from '../../types/User';
import { api } from '../../api';
import { getUrl } from '../utils';

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

export const getUsers = createAsyncThunk('users/getUsers', async (filters: Filters) => {
  const response = await api.get(getUrl('users'), { params: filters });

  return response.data ?? [];
});

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    });
    builder.addCase(getUsers.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  }
});

export const usersReducer = userSlice.reducer;