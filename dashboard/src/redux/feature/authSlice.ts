// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { saveToken } from '../../utils/tokenUtils';
import { jwtDecode } from 'jwt-decode';

type UserInfo = {
  id: string;
  username: string;
  role: string;
  email: string;
  phoneNumber: string;
};

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  userInfo: UserInfo | null;
}
const initialState: AuthState = {
  isLoggedIn: false,
  token: null,
  userInfo: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<{ token: string }>) {
      state.isLoggedIn = true;
      const decodedToken: UserInfo = jwtDecode(action.payload.token);
      state.userInfo = decodedToken;
      state.token = action.payload.token;
    },
    loginSuccess(state, action: PayloadAction<{ token: string }>) {
      state.isLoggedIn = true;

      const decodedToken: UserInfo = jwtDecode(action.payload.token);
      state.userInfo = decodedToken;
      state.token = action.payload.token;
      saveToken(action.payload.token);
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
});

export const { loginSuccess, logout, setToken } = authSlice.actions;

export default authSlice.reducer;
