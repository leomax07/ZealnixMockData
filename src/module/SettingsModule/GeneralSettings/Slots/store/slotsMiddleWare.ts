import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../../../../constants";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../../../../../utils/commonService";
import { CreateSlotsPayload, EditSlotProps } from "./slotsTypes";

export const createNewSlots = createAsyncThunk(
  "slots/createNewSlots",
  async (payload: CreateSlotsPayload, { rejectWithValue }) => {
    try {
      const { data } = await postRequest(API.APPOINTMENT_SHEDULE, payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data.error.message);
    }
  },
);

export const getSlotsByHospitalId = createAsyncThunk(
  "slots/getSlotsByHospitalId",
  async (payload: any, { rejectWithValue }) => {
    try {
      const { data } = await getRequest(API.APPOINTMENT_SHEDULE, payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data.error?.message);
    }
  },
);

export const putSlotsById = createAsyncThunk(
  "slots/putSlotsById",
  async (payload: EditSlotProps, { rejectWithValue }) => {
    try {
      const { data } = await putRequest(
        `${API.APPOINTMENT_SHEDULE}/${payload.id}`,
        payload,
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data.error.message);
    }
  },
);

export const deleteSlotsById = createAsyncThunk(
  "slots/deleteSlotsById",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await deleteRequest(`${API.APPOINTMENT_SHEDULE}/${id}`);
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data.error.message);
    }
  },
);

export const getSlotsBySlotId = createAsyncThunk(
  "slots/getSlotsBySlotId",
  async (payload: { id: string; filter: string }, { rejectWithValue }) => {
    try {
      const { data } = await getRequest(
        `${API.APPOINTMENT_SHEDULE}/${payload.id}?filter=${payload.filter}`,
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data.error.message);
    }
  },
);
