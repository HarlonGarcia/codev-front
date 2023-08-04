import { configureStore } from '@reduxjs/toolkit';
import { commanderReducer } from './features/commanderSlice';
import { usersReducer } from './features/usersSlice';
import { challengesReducer } from './features/challengesSlice';

export const store = configureStore({
  reducer: {
    commander: commanderReducer,
    users: usersReducer,
    challenges: challengesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;