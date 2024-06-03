/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { fetchAllDepartments } from "./departmentMiddleware";

const departmentReducer = createSlice({
  name: "departments",
  initialState: {
    loading: false,
    error: "",
    departments: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllDepartments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllDepartments.fulfilled, (state, action) => {
      state.loading = false;
      state.departments = action.payload;
    });
    builder.addCase(fetchAllDepartments.rejected, (state, action) => {
      state.loading = false;
      if (typeof action.payload === "string") state.error = action.payload;
    });
  },
});

export default departmentReducer.reducer;
