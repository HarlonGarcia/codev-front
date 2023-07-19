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
    closeCommanderModal: (state: CommanderState) => {
      state.isModalOpened = false;
    },
    openCommanderModal: (state: CommanderState) => {
      state.isModalOpened = true;
    },
    toggleCommanderModal: (state: CommanderState) => {
      state.isModalOpened = !state.isModalOpened;
    },
  },
});

export const { closeCommanderModal, openCommanderModal, toggleCommanderModal } =  commanderSlice.actions;

export const commanderReducer = commanderSlice.reducer;