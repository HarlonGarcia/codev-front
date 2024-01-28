import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { api } from '../../api';
import { ICategory } from '../../types/Category';
import { getUrl } from '../utils';

interface CategoryState {
  items: ICategory[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: CategoryState = {
  items: [],
  isLoading: false,
  isError: false,
};

export const getCategories = createAsyncThunk(
  'category/getCategories',
  async () => {
    const { data } = await api.get(getUrl('categories'));

    return data ?? [];
  },
);

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(getCategories.pending, (state) => {
      state.isLoading = true;
    });
    addCase(getCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
    });
    addCase(getCategories.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const categoryReducer = categorySlice.reducer;
