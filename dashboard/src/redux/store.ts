// store.ts
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './feature/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

const rootReducer = combineReducers({
  auth: authReducer,
});

// Định nghĩa kiểu RootState từ rootReducer
export type RootState = ReturnType<typeof rootReducer>;
export default store;
