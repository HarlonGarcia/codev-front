import {
  AnyAction,
  ThunkDispatch,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { thunk } from 'redux-thunk';

import { authReducer } from './slices/auth';
import { categoryReducer } from './slices/category';
import { challengeReducer } from './slices/challenge';
import { commanderReducer } from './slices/commander';
import { technologyReducer } from './slices/technology';
import { userReducer } from './slices/user';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  categories: categoryReducer,
  challenges: challengeReducer,
  commander: commanderReducer,
  technologies: technologyReducer,
  users: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: [thunk],
});

export const persistor = persistStore(store);
// eslint-disable-next-line
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;
export type RootState = ReturnType<typeof store.getState>;