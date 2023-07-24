import { configureStore } from '@reduxjs/toolkit';
import { commanderReducer } from './features/commanderSlice';
import { usersReducer } from './features/usersSlice';

export const store = configureStore({
  reducer: {
    commander: commanderReducer,
    users: usersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;