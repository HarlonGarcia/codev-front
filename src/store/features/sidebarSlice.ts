import { createSlice } from '@reduxjs/toolkit';

interface SidebarState {
  isOpened: boolean;
}

const initialState: SidebarState = {
  isOpened: false,
};

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    closeSidebar: (state: SidebarState) => {
      state.isOpened = false;
    },
    openSidebar: (state: SidebarState) => {
      state.isOpened = true;
    },
    toggleSidebar: (state: SidebarState) => {
      state.isOpened = !state.isOpened;
    },
  },
});

export const { closeSidebar, openSidebar, toggleSidebar } =  sidebarSlice.actions;

export const sidebarReducer = sidebarSlice.reducer;