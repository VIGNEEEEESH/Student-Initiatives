import { configureStore } from '@reduxjs/toolkit'
import authReducer from './Slices/authSlice'
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import persistStore from 'redux-persist/es/persistStore';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, authReducer)
export const store = configureStore({
  reducer: {
    auth:persistedReducer
  },
  middleware:[thunk]
  
})

export const persistor = persistStore(store)
