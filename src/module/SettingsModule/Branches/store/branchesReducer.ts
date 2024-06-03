/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import {
  createBranchesByHospitalId,
  deleteBranchesByID,
  fetchAllBranchesByHospitalId,
  getBranchDetailsById,
} from "./branchesMiddleware";
import { branchInitialState } from "./branchesTypes";

const branchesReducer = createSlice({
  name: "branches",
  initialState: {
    loading: false,
    error: "",
    branches: [],
    branchDetail: { id: "", ...branchInitialState },
  },
  reducers: {},
  extraReducers: (builder) => {
    // GET
    builder.addCase(fetchAllBranchesByHospitalId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllBranchesByHospitalId.fulfilled, (state, action) => {
      state.loading = false;
      state.branches = action.payload;
    });
    builder.addCase(fetchAllBranchesByHospitalId.rejected, (state, action) => {
      state.loading = false;
      if (typeof action.payload === "string") state.error = action.payload;
    });
    // DELETE
    builder.addCase(deleteBranchesByID.pending, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteBranchesByID.fulfilled, (state, action) => {
      state.loading = false;
      state.branches = action.payload;
    });
    builder.addCase(deleteBranchesByID.rejected, (state, action) => {
      state.loading = false;
      if (typeof action.payload === "string") state.error = action.payload;
    });
    // POST
    builder.addCase(createBranchesByHospitalId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createBranchesByHospitalId.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createBranchesByHospitalId.rejected, (state, action) => {
      state.loading = false;
      if (typeof action.payload === "string") state.error = action.payload;
    });
    builder.addCase(getBranchDetailsById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBranchDetailsById.fulfilled, (state, action) => {
      state.loading = false;
      state.branchDetail = action.payload;
    });
    builder.addCase(getBranchDetailsById.rejected, (state, action) => {
      state.loading = false;
      state.error = typeof action.payload === "string" ? action.payload : "";
    });
  },
});

export default branchesReducer.reducer;
