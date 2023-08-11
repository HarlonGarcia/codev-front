import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { api } from '../../api';
import { Technology } from '../../types/Technology';

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

export const getAllTechnologies = createAsyncThunk('technologies/getAllTechnologies', async () => {
  const response = await api.get('/technologies');

  return response.data ?? [];
});

export const technologySlice = createSlice({
  name: 'technologies',
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(getAllTechnologies.pending, (state) => {
      state.isLoading = true;
    });
    addCase(getAllTechnologies.fulfilled, (state, action) => {
      state.isLoading = false;
      state.technologies = action.payload;
    });
    addCase(getAllTechnologies.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  }
});

export const technologiesReducer = technologySlice.reducer;