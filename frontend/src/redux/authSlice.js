// authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

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
    },
    loginSuccess(state, action) {
      state.isLoggedIn = true;
      const decodedToken = jwtDecode(action.payload.token);
      state.userInfo = decodedToken;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
      state.userInfo = null;
      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, logout, setToken } = authSlice.actions;

export default authSlice.reducer;
