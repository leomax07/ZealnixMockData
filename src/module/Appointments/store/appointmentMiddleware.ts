import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../../constants";
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
  putRequest,
} from "../../../utils/commonService";
import {
  CreateAppointmentPayload,
  PatchAppointmentStatusPayload,
} from "./appointmentsType";
import {
  toastError,
  toastSuccess,
} from "../../../redux/ToastStore/toastReducer";
import MESSAGE from "../../../utils/toastMessages";

export const createAppointment = createAsyncThunk(
  "appointments/createAppointment",
  async (payload: CreateAppointmentPayload, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await postRequest(API.APPOINTMENTS, payload);
      dispatch(toastSuccess({ message: MESSAGE.SUCCESS.APPOINTMENT.CREATE }));
      return data;
    } catch (error: any) {
      const message =
        error?.response?.data?.error?.message ??
        MESSAGE.ERROR.APPOINTMENT.CREATE;
      dispatch(toastError({ message }));
      return rejectWithValue(error?.response?.data?.error);
    }
  }
);

export const fetchAllAppointments = createAsyncThunk(
  "appointments/fetchAllAppointments",
  async (payload: any | undefined, { rejectWithValue }) => {
    try {
      const { data } = await getRequest(
        `${API.APPOINTMENTS}?filter=${payload}`
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.error);
    }
  }
);

export const updateAppointments = createAsyncThunk(
  "appointments/updateAppointments",
  async (payload: CreateAppointmentPayload, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await putRequest(
        `${API.APPOINTMENTS}/${payload.id}`,
        payload
      );
      dispatch(toastSuccess({ message: MESSAGE.SUCCESS.APPOINTMENT.UPDATE }));
      return data;
    } catch (error: any) {
      const message =
        error?.response?.data?.error?.message ??
        MESSAGE.ERROR.APPOINTMENT.UPDATE;
      dispatch(toastError({ message }));
      return rejectWithValue(error?.response?.data?.error);
    }
  }
);

export const patchAppointmentStatus = createAsyncThunk(
  "appointments/patchAppointmentStatus",
  async (payload: PatchAppointmentStatusPayload, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await patchRequest(
        `${API.APPOINTMENTS}/${payload.id}`,
        payload
      );
      dispatch(toastSuccess({ message: MESSAGE.SUCCESS.APPOINTMENT.STATUS_UPDATE}));
      return data;
    } catch (error: any) {
      const message =
        error?.response?.data?.error?.message ??
        MESSAGE.ERROR.APPOINTMENT.STATUS_UPDATE;
      dispatch(toastError({ message }));
      return rejectWithValue(error?.response?.data?.error);
    }
  }
);

export const patchAppointments = createAsyncThunk(
  "appointments/patchAppointments",
  async (payload: CreateAppointmentPayload, { rejectWithValue }) => {
    try {
      const { data } = await patchRequest(
        `${API.APPOINTMENTS}/${payload.id}`,
        payload
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response.data.message);
    }
  }
);

export const deleteAppointmentById = createAsyncThunk(
  "appointments/patchAppointments",
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await deleteRequest(`${API.APPOINTMENTS}/${id}`);
      dispatch(toastSuccess({ message: MESSAGE.SUCCESS.APPOINTMENT.DELETE }));
      return data;
    } catch (error: any) {
      const message =
        error?.response?.data?.error?.message ??
        MESSAGE.ERROR.APPOINTMENT.DELETE;
      dispatch(toastError({ message }));
      return rejectWithValue(error?.response?.data?.error);
    }
  }
);

export const getUpcomingAppointments = createAsyncThunk(
  "appointments/getUpcomingAppointments",
  async (payload: any, { rejectWithValue }) => {
    try {
      const { data } = await getRequest(
        `${API.APPOINTMENTS}?filter=${payload}`
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const getAppointmentSlotsByDoctorId = createAsyncThunk(
  "appointments/getAppointmentSlotsByDoctorId",
  async (payload: any, { rejectWithValue }) => {
    try {
      const { data } = await postRequest(
        `${API.APPOINTMENT_SLOTS}/${payload.doctorId}`,
        payload.body
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.error?.message);
    }
  }
);

export const getAppointmentsCalendarData = createAsyncThunk(
  "appointments/getAppointmentsCalendarData",
  async (payload: any, { rejectWithValue }) => {
    try {
      const { data } = await postRequest(API.APPOINTMENTS_CALENDAR, payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.error?.message);
    }
  }
);

export const getAppointmentsBySlotId = createAsyncThunk(
  "appointments/getAppointmetsBySlotId",
  async (payload: any, { rejectWithValue }) => {
    try {
      const { data } = await getRequest(API.APPOINTMENTS, payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.error?.message);
    }
  }
);
