// store.js
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

const rootReducer = combineReducers({
  auth: authReducer,
});

// Định nghĩa kiểu RootState từ rootReducer
export default store;
