/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUser, login } from "./loginMiddleware";
import { AuthInitialStateTypes } from "./loginTypes";

const initialState: AuthInitialStateTypes = {
  loading: false,
  error: "",
  isLoggedIn: false,
  currentUser: {},
  token: "",
};
const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.token = "";
      state.currentUser = {};
      state.error = typeof action.payload === "string" ? action.payload : "";
    });
    builder.addCase(getCurrentUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.currentUser = action.payload;
    });
    builder.addCase(getCurrentUser.rejected, (state, action) => {
      state.loading = false;
      state.error = typeof action.payload === "string" ? action.payload : "";
    });
  },
});

export default authReducer.reducer;
