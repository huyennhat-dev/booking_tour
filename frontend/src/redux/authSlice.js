// authSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { clearToken, saveToken } from "../utils/tokenUtils";

const initialState = {
  isLoggedIn: false,
  token: null,
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action) {
      state.isLoggedIn = true;
      const decodedToken = jwtDecode(action.payload.token);
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
