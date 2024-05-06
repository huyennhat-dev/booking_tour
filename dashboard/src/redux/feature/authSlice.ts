// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { clearToken, saveToken } from '../../utils/tokenUtils';
import { jwtDecode } from 'jwt-decode';

export type UserInfo = {
  id: string;
  avatar?: string;
  username: string;
  role: string;
  email: string;
  id_manager: number;
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
      saveToken(action.payload.token);
    },

    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
      state.userInfo = null;
      clearToken();
    },
  },
});

export const { logout, setToken } = authSlice.actions;

export default authSlice.reducer;
