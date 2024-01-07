import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface AuthState {
  token: string;
  isLoading: boolean;
  isError: boolean;
}

interface SignInPayload {
  username: string;
  password: string;
}

interface SignUpPayload {
  name: string;
  email: string;
  password: string;
  githubUrl: string;
  additionalUrl?: string;
}

const initialState: AuthState = {
  token: '',
  isLoading: false,
  isError: false,
};

export const signIn = createAsyncThunk('auth/signIn', async (signInPayload: SignInPayload) => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, signInPayload);

  return response.data.token ?? '';
});

export const signUp = createAsyncThunk('auth/signUp', async (signUpPayload: SignUpPayload) => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/users`, signUpPayload);

  return response.data.token ?? '';
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

    addCase(signUp.pending, (state) => {
      state.isLoading = true;
    });
    addCase(signUp.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.token = action.payload;
    });
    addCase(signUp.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  }
});

export const authReducer = authSlice.reducer;