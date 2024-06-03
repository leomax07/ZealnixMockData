/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllAppointments,
  getAppointmentsBySlotId,
  getAppointmentsCalendarData,
  getAppointmentSlotsByDoctorId,
  getUpcomingAppointments,
} from "./appointmentMiddleware";
import { AppointmentBySlotIdType } from "./appointmentsType";

interface InitialState {
  appointmentBySlotId: AppointmentBySlotIdType[];
  loading: boolean;
  error: string;
  appointments: AppointmentBySlotIdType[];
  upcommingAppointment: AppointmentBySlotIdType[];
  slotsForDoctor: any[];
  appointmentCalendarData: any[];
}

const initialState: InitialState = {
  loading: false,
  error: "",
  appointments: [],
  upcommingAppointment: [],
  slotsForDoctor: [],
  appointmentCalendarData: [],
  appointmentBySlotId: [],
};

const appointmentsReducer = createSlice({
  name: "appointments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllAppointments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllAppointments.fulfilled, (state, action) => {
      state.loading = false;
      state.appointments = action.payload;
    });
    builder.addCase(fetchAllAppointments.rejected, (state, action) => {
      state.loading = false;
      state.error = typeof action.payload === "string" ? action.payload : "";
    });
    builder.addCase(getUpcomingAppointments.pending, (state) => {
      state.loading = false;
    });
    builder.addCase(getUpcomingAppointments.fulfilled, (state, action) => {
      state.loading = false;
      state.upcommingAppointment = action.payload || [];
    });
    builder.addCase(getUpcomingAppointments.rejected, (state, action) => {
      state.loading = false;
      state.error = typeof action.payload === "string" ? action.payload : "";
    });
    builder.addCase(
      getAppointmentSlotsByDoctorId.fulfilled,
      (state, action) => {
        state.loading = false;
        state.slotsForDoctor = action.payload || [];
      },
    );
    builder.addCase(getAppointmentsCalendarData.pending, (state) => {
      state.loading = false;
    });
    builder.addCase(getAppointmentsCalendarData.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.appointmentCalendarData = action.payload;
    });
    builder.addCase(getAppointmentsBySlotId.fulfilled, (state, action) => {
      state.loading = false;
      state.appointmentBySlotId = action.payload;
    });
  },
});

export default appointmentsReducer.reducer;
