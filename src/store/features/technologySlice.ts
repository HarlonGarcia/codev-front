import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { api } from '../../api';
import { Technology } from '../../types/Technology';
import { getUrl } from '../utils';

interface TechnologyState {
  technologies: Technology[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: TechnologyState = {
  technologies: [],
  isLoading: false,
  isError: false,
};

export const getTechnologies = createAsyncThunk(
  'technologies/getTechnologies',
  async () => {
    const response = await api.get(getUrl('technologies'));

    return response.data ?? [];
  },
);

export const technologySlice = createSlice({
  name: 'technologies',
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(getTechnologies.pending, (state) => {
      state.isLoading = true;
    });
    addCase(getTechnologies.fulfilled, (state, action) => {
      state.isLoading = false;
      state.technologies = action.payload;
    });
    addCase(getTechnologies.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const technologiesReducer = technologySlice.reducer;
