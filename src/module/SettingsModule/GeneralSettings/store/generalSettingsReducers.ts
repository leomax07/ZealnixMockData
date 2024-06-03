/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { fetchHospitalDetailById } from "./generalSettingsMiddleware";

const initialState: any = {
  settingsData: {},
  loading: false,
  error: "",
};

const generalSettingsReducer = createSlice({
  name: "generalSettings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHospitalDetailById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchHospitalDetailById.fulfilled, (state, action) => {
      state.loading = false;
      state.settingsData = action.payload;
    });
    builder.addCase(fetchHospitalDetailById.rejected, (state, action) => {
      state.loading = false;
      if (typeof action.payload === "string") state.error = action.payload;
    });
  },
});

export default generalSettingsReducer.reducer;
