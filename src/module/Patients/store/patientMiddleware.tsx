import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../../constants";
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from "../../../utils/commonService";
import { PatientType } from "./patientTypes";

export const getPatients = createAsyncThunk(
  "patients/getPatients",
  async (params: any, { rejectWithValue }) => {
    try {
      const { data }: any = await getRequest(API.PATIENTS, { filter: params });
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

export const getPatientDetailById = createAsyncThunk(
  "patients/getPatientDetailById",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await getRequest(`${API.PATIENTS}/${id}`);
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

export const createNewPatient = createAsyncThunk(
  "patients/createNewPatient",
  async (payload: PatientType, { rejectWithValue }) => {
    try {
      const { data } = await postRequest(API.PATIENTS, payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

export const updatePatient = createAsyncThunk(
  "patients/updatePatient",
  async (payload: PatientType, { rejectWithValue }) => {
    try {
      const { data } = await patchRequest(
        `${API.PATIENTS}/${payload.id}`,
        payload,
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

export const deletePatient = createAsyncThunk(
  "patients/deletePatient",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await deleteRequest(`${API.PATIENTS}/${id}`);
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

export const getVitals = createAsyncThunk(
  "vitals/getVitals",
  async (params: any, { rejectWithValue }) => {
    try {
      const { data }: any = await getRequest(API.VITALS, { filter: params });
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);
