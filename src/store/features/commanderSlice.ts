import { createSlice } from '@reduxjs/toolkit';

interface CommanderState {
  isModalOpened: boolean;
}

const initialState: CommanderState = {
  isModalOpened: false,
};

export const commanderSlice = createSlice({
  name: 'commander',
  initialState,
  reducers: {
    closeModal: (state: CommanderState) => {
      state.isModalOpened = false;
    },
    openModal: (state: CommanderState) => {
      state.isModalOpened = true;
    },
    toggleModal: (state: CommanderState) => {
      state.isModalOpened = !state.isModalOpened;
    },
  },
});

export const { closeModal, openModal, toggleModal } = commanderSlice.actions;

export const commanderReducer = commanderSlice.reducer;
