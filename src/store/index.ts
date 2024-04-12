import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './slices/auth';
import { categoryReducer } from './slices/category';
import { challengeReducer } from './slices/challenge';
import { commanderReducer } from './slices/commander';
import { technologyReducer } from './slices/technology';
import { userReducer } from './slices/user';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
    challenges: challengeReducer,
    commander: commanderReducer,
    technologies: technologyReducer,
    users: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;