/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { fetchAllLabsByHospitalId } from "./labsMiddleware";
import { LabsInitialState } from "./labsType";

const initialState: LabsInitialState = {
  labs: [],
  loading: false,
  error: "",
};

const labsReducer = createSlice({
  name: "labs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllLabsByHospitalId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchAllLabsByHospitalId.fulfilled,
      (state, action: any) => {
        state.loading = false;
        state.labs = action.payload;
      },
    );
    builder.addCase(
      fetchAllLabsByHospitalId.rejected,
      (state, action: any) => {
        state.loading = false;
        if (typeof action.payload === "string") state.error = action.payload;
      },
    );
  },
});

export default labsReducer.reducer;
