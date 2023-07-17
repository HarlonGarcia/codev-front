import { createSlice } from '@reduxjs/toolkit';

interface CommanderState {
  isOpen: boolean;
}

const initialState: CommanderState = {
  isOpen: false,
};

export const commanderSlice = createSlice({
  name: 'commander',
  initialState,
  reducers: {
    closeCommanderModal: (state: CommanderState) => {
      state.isOpen = false;
    },
    openCommanderModal: (state: CommanderState) => {
      state.isOpen = true;
    },
    toggleCommanderModal: (state: CommanderState) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { closeCommanderModal, openCommanderModal, toggleCommanderModal } = commanderSlice.actions;
export const commanderReducer = commanderSlice.reducer;