import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { IAuthPayload } from '../../types';
import { getUrl } from '../utils';

interface AuthState {
  token: string;
  isLoading: boolean;
  isError: boolean;
}

interface SignInParams {
  payload: {
    email: string;
    password: string;
  },
  // eslint-disable-next-line no-unused-vars
  saveAuthData: (data: IAuthPayload) => void;
}

interface SignUpParams {
  payload: {
    name: string;
    email: string;
    password: string;
    githubUrl: string;
    additionalUrl?: string;
  },
  // eslint-disable-next-line no-unused-vars
  saveAuthData: (data: IAuthPayload) => void;
}

const initialState: AuthState = {
  token: '',
  isLoading: false,
  isError: false,
};

export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({ payload, saveAuthData }: SignInParams) => {
    const { data, status } = await axios.post(getUrl('login'), payload);

    if (status === 200) {
      saveAuthData({
        auth: {
          token: data.token,
          type: 'Bearer',
        },
      });

      return data.token;
    }

    return undefined;
  },
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async ({ payload, saveAuthData }: SignUpParams) => {
    const { data, status } = await axios.post(getUrl('signup'), payload);

    if (status === 201) {
      saveAuthData({
        auth: {
          token: data.token,
          type: 'Bearer',
        },
      });

      return data.token;
    }

    return undefined;
  },
);

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
      state.token = action.payload;
    });
    addCase(signUp.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const authReducer = authSlice.reducer;
