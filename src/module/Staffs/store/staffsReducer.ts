/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import {
  createNewStaff,
  getStaffDetailsById,
  getStaffsByType,
  getStaffsReportsById,
  updateStaff,
} from "./staffsMiddleware";

const initialState = {
  loading: false,
  error: "",
  staffs: [],
  doctors: [],
  labTechnician: [],
  staffDetail: {
    id: "",
    employeeId: "",
    name: "",
    type: "",
    dateOfBirth: "",
    email: "",
    dutyInTime: 0,
    dutyOutTime: 0,
    status: "",
    hash: "",
    phone: "",
    hospitalId: "",
    branchId: "",
    branch: {
      name: "",
      id: "",
    },
    departmentId: "",
    department: {
      name: "",
      id: "",
    },
    designationId: "",
    designation: {
      name: "",
      id: "",
    },
    createdBy: "",
    createdAt: "",
    updatedAt: "",
    additionalProp1: {},
    profileImageUrl: "",
  },
  staffReports: [],
};

const staffReducer = createSlice({
  name: "staffs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStaffsByType.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getStaffsByType.fulfilled, (state, action) => {
      state.loading = false;
      if (
        action.payload.length &&
        action.payload[0].type === "lab_technician"
      ) {
        state.labTechnician = action.payload;
      } else if (action.payload.length && action.payload[0].type === "doctor") {
        state.doctors = action.payload;
      }
      state.staffs = action.payload;
    });
    builder.addCase(getStaffsByType.rejected, (state, action) => {
      state.loading = false;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
    builder.addCase(createNewStaff.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createNewStaff.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createNewStaff.rejected, (state, action) => {
      state.loading = false;
      if (typeof action.payload === "string") state.error = action.payload;
    });
    builder.addCase(getStaffDetailsById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getStaffDetailsById.fulfilled, (state, action) => {
      state.staffDetail = action.payload;
      state.loading = false;
    });
    builder.addCase(getStaffDetailsById.rejected, (state, action) => {
      state.loading = false;
      if (typeof action.payload === "string") state.error = action.payload;
    });
    builder.addCase(updateStaff.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateStaff.fulfilled, (state) => {
      state.loading = true;
    });
    builder.addCase(updateStaff.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getStaffsReportsById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getStaffsReportsById.fulfilled, (state, action) => {
      state.loading = false;
      state.staffReports = action.payload;
    });
    builder.addCase(getStaffsReportsById.rejected, (state, action) => {
      state.loading = false;
      state.error = typeof action.payload === "string" ? action.payload : "";
    });
  },
});

export default staffReducer.reducer;
