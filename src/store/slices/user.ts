import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { api } from '../../api';
import { IUser } from '../../types/User';
import { getUrl } from '../utils';

interface UserState {
  items: IUser[];
  currentUser: IUser | null;
  isLoading: boolean;
  isError: boolean;
}

const initialState: UserState = {
  items: [],
  currentUser: null,
  isLoading: false,
  isError: false,
};

export const getUsers = createAsyncThunk('user/getUsers', async () => {
  const { data } = await api.get(getUrl('users'));

  return data ?? [];
});

export const getMe = createAsyncThunk('user/getMe', async () => {
  const { data } = await api.get(getUrl('me'));

  return data;
});

export const clearCurrentUser = createAction('user/clearCurrentUser');

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(getUsers.pending, (state) => {
      state.isLoading = true;
    });
    addCase(getUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
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

    addCase(clearCurrentUser, function clear(state) {
      state.currentUser = null;
    });
  },
});

export const userReducer = userSlice.reducer;