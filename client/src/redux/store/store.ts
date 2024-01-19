import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { api } from '../api';
import searchReducer from '../slice/search_slice';
import userReducer from '../slice/user_slice';

// Combine reducers
const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  user: userReducer,
  search: searchReducer,
});

// Configuration for Redux Persist
const persistConfig = {
  key: 'root', // Key for the persisted state
  storage, // Storage type (e.g., localStorage)
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      // {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
    }).concat(api.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
