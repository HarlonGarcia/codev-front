import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { IChallenge, ICreateChallengeDto } from '../../types/Challenge';
import { getUrl } from '../utils';
import { api } from '../../api';

import { store } from '..';

interface ChallengeState {
  items: IChallenge[];
  currentChallenge: IChallenge | null;
  isLoading: boolean;
  isError: boolean;
}

const initialState: ChallengeState = {
  items: [],
  currentChallenge: null,
  isLoading: false,
  isError: false,
};

interface Filters {
  orderBy?: string;
  page?: number;
  size?: number;
}

export const getChallenges = createAsyncThunk(
  'challenge/getChallenges',
  async (filters?: Filters) => {
    const { page = 0, size = 100, orderBy } = filters ?? {};

    const { data } = await api.get(getUrl('challenges'), {
      params: {
        page,
        size,
        orderBy: orderBy ?? undefined,
      },
    });

    return data ?? [];
  },
);

export const getChallengeById = createAsyncThunk(
  'challenge/getChallengeById',
  async (challengeId: string) => {
    const { data } = await api.get(getUrl('challenge_by_id', { challengeId }));

    return data ?? {};
  },
);

export const joinChallenge = createAsyncThunk(
  'challenge/joinChallenge',
  async (challengeId?: string) => {
    const userId = store.getState().users.currentUser?.id;

    if (!challengeId || !userId) {
      throw new Error('The user or challenge is not valid.');
    }

    const config = {
      headers: {
        'x-user-id': userId,
      },
    };

    const response = await api.post(
      getUrl('join_challenge', { challengeId }),
      undefined,
      config,
    );

    return response;
  },
);

export const createChallenge = createAsyncThunk(
  'challenge/createChallenge',
  async (challenge: ICreateChallengeDto) => {
    const { data } = await api.post(getUrl('challenges'), challenge);

    return data ?? {};
  },
);

export const challengeSlice = createSlice({
  name: 'challenge',
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(getChallenges.pending, (state) => {
      state.isLoading = true;
    });
    addCase(getChallenges.fulfilled, (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
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

    addCase(joinChallenge.pending, (state) => {
      state.isLoading = true;
    });
    addCase(joinChallenge.fulfilled, (state) => {
      state.isLoading = false;
    });
    addCase(joinChallenge.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    addCase(createChallenge.pending, (state) => {
      state.isLoading = true;
    });
    addCase(createChallenge.fulfilled, (state, action) => {
      state.isLoading = false;
      state.items = [ ...state.items, action.payload ];
    });
    addCase(createChallenge.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const challengeReducer = challengeSlice.reducer;
