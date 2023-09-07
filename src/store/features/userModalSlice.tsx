import { createSlice } from '@reduxjs/toolkit';

interface UserModalState {
  isUserModalOpened: boolean;
}

const initialState: UserModalState = {
  isUserModalOpened: false,
};

export const userModalSlice = createSlice({
  name: 'user_modal',
  initialState,
  reducers: {
    closeUserModal: (state: UserModalState) => {
      state.isUserModalOpened = false;
    },
    openUserModal: (state: UserModalState) => {
      state.isUserModalOpened = true;
    },
  },
});

export const { closeUserModal, openUserModal } =  userModalSlice.actions;

export const userModalReducer = userModalSlice.reducer;