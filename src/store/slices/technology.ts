import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { api } from '../../api';
import { ITechnology } from '../../types/Technology';
import { getUrl } from '../utils';

interface TechnologyState {
  items: ITechnology[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: TechnologyState = {
  items: [],
  isLoading: false,
  isError: false,
};

export const getTechnologies = createAsyncThunk(
  'technology/getTechnologies',
  async () => {
    const response = await api.get(getUrl('technologies'));

    return response.data ?? [];
  },
);

export const technologySlice = createSlice({
  name: 'technology',
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(getTechnologies.pending, (state) => {
      state.isLoading = true;
    });
    addCase(getTechnologies.fulfilled, (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
    });
    addCase(getTechnologies.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const technologyReducer = technologySlice.reducer;
