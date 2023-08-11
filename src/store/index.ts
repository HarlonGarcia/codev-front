import { configureStore } from '@reduxjs/toolkit';
import { commanderReducer } from './features/commanderSlice';
import { usersReducer } from './features/userSlice';
import { challengesReducer } from './features/challengeSlice';
import { categoriesReducer } from './features/categorySlice';
import { technologiesReducer } from './features/technologySlice';

export const store = configureStore({
  reducer: {
    commander: commanderReducer,
    users: usersReducer,
    challenges: challengesReducer,
    categories: categoriesReducer,
    technologies: technologiesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;