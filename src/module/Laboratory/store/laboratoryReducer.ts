/* eslint-disable  */
import { createSlice } from "@reduxjs/toolkit";
import {
  createLaboratoryReport,
  deleteLaboratoryReport,
  getLaboratoryReport,
  updateLaboratoryReport,
} from "./laboratoryMiddleware";

const initialState = {
  loading: false,
  reports: [],
  error: "",
};

const laboratoryReducer = createSlice({
  name: "laboratories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // create new laboratory report
    builder.addCase(createLaboratoryReport.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createLaboratoryReport.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createLaboratoryReport.rejected, (state, action) => {
      state.loading = false;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
    // get laboratory report
    builder.addCase(getLaboratoryReport.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getLaboratoryReport.fulfilled, (state, action) => {
      state.loading = false;
      state.reports = action.payload;
    });
    builder.addCase(getLaboratoryReport.rejected, (state, action) => {
      state.loading = false;

      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
    // update laboratory report
    builder.addCase(updateLaboratoryReport.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      updateLaboratoryReport.fulfilled,
      (state, action: { type: string; payload: any }) => {
        state.loading = false;
        state.reports = action.payload;
      },
    );
    builder.addCase(updateLaboratoryReport.rejected, (state, action) => {
      state.loading = false;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
    // delete laboratory report
    builder.addCase(deleteLaboratoryReport.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      deleteLaboratoryReport.fulfilled,
      (state, action: { type: string; payload: any }) => {
        state.loading = false;
        state.reports = action.payload;
      },
    );
    builder.addCase(deleteLaboratoryReport.rejected, (state, action) => {
      state.loading = false;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

export default laboratoryReducer.reducer;
