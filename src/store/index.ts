import { configureStore } from '@reduxjs/toolkit';
import { commanderReducer } from './features/commander-slice';

export const store = configureStore({
  reducer: {
    commander: commanderReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;