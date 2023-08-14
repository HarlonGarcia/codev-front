import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { api } from '../../api';
import { Challenge, ChallengeDto } from '../../types/Challenge';

interface Filters {
  orderBy?: string;
  page?: number;
  size?: number;
}

interface ChallengeState {
  challenges: Challenge[];
  latestChallenges: Challenge[];
  currentChallenge: Challenge | null;
  isLoading: boolean;
  isError: boolean;
}

const initialState: ChallengeState = {
  challenges: [],
  latestChallenges: [],
  currentChallenge: null,
  isLoading: false,
  isError: false,
};

export const getAllChallenges = createAsyncThunk('challenges/getAllChallenges', async () => {
  const response = await api.get('/challenges', {
    params: {
      page: 0,
      size: 100,
    },
  });

  return response.data ?? [];
});

export const getChallenges = createAsyncThunk('challenges/getChallenges', async (filters?: Filters) => {
  const response = await api.get('/challenges', { params: filters });

  return response.data ?? [];
});

export const getChallengeById = createAsyncThunk('challenges/getChallengeById', async (id: string) => {
  const response = await api.get(`/challenges/${id}`);

  return response.data ?? {};
});

export const createChallenge = createAsyncThunk('challenges/createChallenge', async (challenge: ChallengeDto) => {
  const categoryId = challenge.category?.id;

  if (challenge['category'] !== undefined) {
    delete challenge['category'];
  }
  
  const response = await api.post('/challenges', {
    ...challenge,
    authorId: '1',
    categoryId,
  });

  return response.data ?? {};
});

export const challengeSlice = createSlice({
  name: 'challenges',
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(getAllChallenges.pending, (state) => {
      state.isLoading = true;
    });
    addCase(getAllChallenges.fulfilled, (state, action) => {
      state.isLoading = false;
      state.challenges = action.payload;
    });
    addCase(getAllChallenges.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    
    addCase(getChallenges.pending, (state) => {
      state.isLoading = true;
    });
    addCase(getChallenges.fulfilled, (state, action) => {
      state.isLoading = false;
      state.latestChallenges = action.payload;
    });
    addCase(getChallenges.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    addCase(getChallengeById.pending, (state) => {
      state.isLoading = true;
    });
    addCase(getChallengeById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentChallenge = action.payload;
    });
    addCase(getChallengeById.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    addCase(createChallenge.pending, (state) => {
      state.isLoading = true;
    });
    addCase(createChallenge.fulfilled, (state, action) => {
      state.isLoading = false;
      state.challenges = [ ...state.challenges, action.payload ];
    });
    addCase(createChallenge.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  }
});

export const challengesReducer = challengeSlice.reducer;