/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { getSlotsByHospitalId, getSlotsBySlotId } from "./slotsMiddleWare";
import { SlotResponseType } from "./slotsTypes";

interface InitialState {
  slotDetails: SlotResponseType | null;
  loading: boolean;
  error: string;
  slots: any[];
}
const initialState: InitialState = {
  loading: false,
  error: "",
  slots: [],
  slotDetails: null,
};

const slotsReducer = createSlice({
  name: "slots",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSlotsByHospitalId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSlotsByHospitalId.fulfilled, (state, action) => {
      state.loading = false;
      state.slots = action.payload;
    });
    builder.addCase(getSlotsByHospitalId.rejected, (state, action) => {
      state.loading = false;
      state.error = typeof action.payload === "string" ? action.payload : "";
    });
    builder.addCase(getSlotsBySlotId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSlotsBySlotId.fulfilled, (state, action) => {
      state.loading = false;
      state.slotDetails = action.payload;
    });
    builder.addCase(getSlotsBySlotId.rejected, (state, action) => {
      state.loading = false;
      state.error = typeof action.payload === "string" ? action.payload : "";
    });
  },
});

export default slotsReducer.reducer;
