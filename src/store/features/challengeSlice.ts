import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { api } from '../../api';
import { Challenge } from '../../types/Challenge';
import { ChallengeDt0 } from '../../types/dto/ChallengeDto';

interface ChallengeState {
  challenges: Challenge[];
  currentChallenge: Challenge | null;
  isLoading: boolean;
  isError: boolean;
}

const initialState: ChallengeState = {
  challenges: [],
  currentChallenge: null,
  isLoading: false,
  isError: false,
};

export const getAllChallenges = createAsyncThunk('challenges/getAllChallenges', async () => {
  const response = await api.get('/challenges');

  return response.data ?? [];
});

export const getChallengeById = createAsyncThunk('challenges/getChallengeById', async (id: string) => {
  const response = await api.get(`/challenges/${id}`);

  return response.data ?? {};
});

export const createChallenge = createAsyncThunk('challenges/createChallenge', async (challenge: ChallengeDt0) => {
  const response = await api.post('/challenges', challenge);

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