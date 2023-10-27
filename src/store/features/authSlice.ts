import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface AuthState {
  token: string;
  isLoading: boolean;
  isError: boolean;
}

interface AuthPayload {
  username: string;
  password: string;
}

const initialState: AuthState = {
  token: '',
  isLoading: false,
  isError: false,
};

export const signIn = createAsyncThunk('auth/signIn', async (authPayload: AuthPayload) => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, authPayload);

  return response.data ?? [];
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(signIn.pending, (state) => {
      state.isLoading = true;
    });
    addCase(signIn.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.token = action.payload;
    });
    addCase(signIn.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  }
});

export const authReducer = authSlice.reducer;