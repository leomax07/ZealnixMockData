/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import {
  createScratchpad,
  getScratchpads,
  updateScratchpad,
  deleteScratchpad,
} from "./scratchpadMiddleware";
import { ScratchpadTypeInitialState } from "./scratchpadType";

const initialState: ScratchpadTypeInitialState = {
  loading: false,
  scratchpads: [],
  error: "",
};

const scratchpadReducer = createSlice({
  name: "scratchpads",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // create scratchpad
    builder.addCase(createScratchpad.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createScratchpad.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createScratchpad.rejected, (state, action) => {
      state.loading = false;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
    // get scratchpad
    builder.addCase(getScratchpads.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getScratchpads.fulfilled, (state, action) => {
      state.loading = false;
      state.scratchpads = action.payload;
    });
    builder.addCase(getScratchpads.rejected, (state, action) => {
      state.loading = false;

      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
    // update scratchpad
    builder.addCase(updateScratchpad.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateScratchpad.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateScratchpad.rejected, (state, action) => {
      state.loading = false;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
    // delete scratchpad
    builder.addCase(deleteScratchpad.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteScratchpad.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteScratchpad.rejected, (state, action) => {
      state.loading = false;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

export default scratchpadReducer.reducer;
