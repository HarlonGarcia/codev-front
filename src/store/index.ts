import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './features/authSlice';
import { categoriesReducer } from './features/categorySlice';
import { challengesReducer } from './features/challengeSlice';
import { commanderReducer } from './features/commanderSlice';
import { technologiesReducer } from './features/technologySlice';
import { usersReducer } from './features/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoriesReducer,
    challenges: challengesReducer,
    commander: commanderReducer,
    technologies: technologiesReducer,
    users: usersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;