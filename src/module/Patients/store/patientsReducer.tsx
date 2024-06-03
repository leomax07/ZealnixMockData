/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import {
  getPatients,
  getPatientDetailById,
  createNewPatient,
  deletePatient,
  updatePatient,
  getVitals,
} from "./patientMiddleware";

const initialState = {
  loading: false,
  allPatients: [],
  inPatients: [],
  outPatients: [],
  patients: [],
  patient: {},
  initialPatient: {},
  error: "",
  editPatient: {},
  vitals: [],
};

const patientReducer = createSlice({
  name: "patients",
  initialState,
  reducers: {
    setPatient: (state, action) => {
      state.initialPatient = action.payload;
    },
    setEditPatient: (state, action) => {
      state.editPatient = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPatients.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPatients.fulfilled, (state, action) => {
      state.loading = false;
      state.patients = action.payload;
    });
    builder.addCase(getPatients.rejected, (state, action) => {
      state.loading = false;

      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
    // patient details
    builder.addCase(getPatientDetailById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPatientDetailById.fulfilled, (state, action) => {
      state.loading = false;
      state.patient = action.payload;
    });
    builder.addCase(getPatientDetailById.rejected, (state, action) => {
      state.loading = false;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
    // create new patient
    builder.addCase(createNewPatient.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      createNewPatient.fulfilled,
      (state, action: { type: string; payload: any }) => {
        state.loading = false;
        state.patients = action.payload;
      },
    );
    builder.addCase(createNewPatient.rejected, (state, action) => {
      state.loading = false;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
    // update patient
    builder.addCase(updatePatient.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      updatePatient.fulfilled,
      (state, action: { type: string; payload: any }) => {
        state.loading = false;
        state.patients = action.payload;
      },
    );
    builder.addCase(updatePatient.rejected, (state, action) => {
      state.loading = false;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
    // delete  patient
    builder.addCase(deletePatient.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      deletePatient.fulfilled,
      (state, action: { type: string; payload: any }) => {
        state.loading = false;
        state.patients = action.payload;
      },
    );
    builder.addCase(deletePatient.rejected, (state, action) => {
      state.loading = false;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
    // get Vitals
    builder.addCase(getVitals.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getVitals.fulfilled, (state, action) => {
      state.loading = false;
      state.vitals = action.payload;
    });
    builder.addCase(getVitals.rejected, (state, action) => {
      state.loading = false;

      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

export const { setPatient, setEditPatient } = patientReducer.actions;

export default patientReducer.reducer;
