/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import {
  createNewDesignation,
  fetchAllDestinations,
} from "./designation.middleware";

const initialState: any = {
  designations: [],
  loading: false,
  error: "",
};

const designationReducer = createSlice({
  name: "designation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllDestinations.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchAllDestinations.fulfilled,
      (state, action: { type: string; payload: any }) => {
        state.loading = false;
        state.designations = action.payload;
      },
    );
    builder.addCase(fetchAllDestinations.rejected, (state, action) => {
      state.loading = false;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
    builder.addCase(createNewDesignation.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createNewDesignation.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createNewDesignation.rejected, (state, action) => {
      state.loading = false;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

const CreateDesignationReducer = createSlice({
  name: "masters",
  initialState: {
    designations: null,
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: () => {},
});

export const designationReducers = designationReducer.reducer;
export const CreateDesignationReducers = CreateDesignationReducer.reducer;
