import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './features/authSlice';
import { categoriesReducer } from './features/categorySlice';
import { challengesReducer } from './features/challengeSlice';
import { commanderReducer } from './features/commanderSlice';
import { technologiesReducer } from './features/technologySlice';
import { userModalReducer } from './features/userModalSlice';
import { usersReducer } from './features/userSlice';
import { sidebarReducer } from './features/sidebarSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoriesReducer,
    challenges: challengesReducer,
    commander: commanderReducer,
    technologies: technologiesReducer,
    userModal: userModalReducer,
    users: usersReducer,
    sidebar: sidebarReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;