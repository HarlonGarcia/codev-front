import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { api } from '../../api';
import { User } from '../../types/User';
import { getUrl } from '../utils';

interface Filters {
  startsWith?: string;
}

interface UserState {
  users: User[];
  filters: Filters;
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

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async (filters: Filters) => {
    const response = await api.get(getUrl('users'), { params: filters });

    return response.data ?? [];
  },
);

export const getMe = createAsyncThunk('auth/getMe', async () => {
  const { data } = await api.get(getUrl('me'));

  return data;
});

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(getUsers.pending, (state) => {
      state.isLoading = true;
    });
    addCase(getUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    });
    addCase(getUsers.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    addCase(getMe.pending, (state) => {
      state.isLoading = true;
    });
    addCase(getMe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
    });
    addCase(getMe.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const usersReducer = userSlice.reducer;
