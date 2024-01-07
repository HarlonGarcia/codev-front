import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { api } from '../../api';
import { Category } from '../../types/Category';

interface CategoryState {
  categories: Category[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: CategoryState = {
  categories: [],
  isLoading: false,
  isError: false,
};

export const getCategories = createAsyncThunk('categories/getCategories', async () => {
  const response = await api.get('/categories');

  return response.data ?? [];
});

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(getCategories.pending, (state) => {
      state.isLoading = true;
    });
    addCase(getCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
    });
    addCase(getCategories.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  }
});

export const categoriesReducer = categorySlice.reducer;