import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../../constants";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../../../utils/commonService";
import { LaboratoryType } from "./laboratoryType";

export const createLaboratoryReport = createAsyncThunk(
  "laboratory/createReport",
  async (payload: LaboratoryType, { rejectWithValue }) => {
    try {
      const { data } = await postRequest(API.LABORATORY, payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response.data.message);
    }
  },
);

export const getLaboratoryReport = createAsyncThunk(
  "laboratory/getReports",
  async (params: any, { rejectWithValue }) => {
    try {
      const { data }: any = await getRequest(API.LABORATORY, {
        filter: params,
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

export const updateLaboratoryReport = createAsyncThunk(
  "laboratory/updateReport",
  async (payload: LaboratoryType, { rejectWithValue }) => {
    try {
      const { data } = await putRequest(
        `${API.LABORATORY}/${payload.id}`,
        payload,
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

export const deleteLaboratoryReport = createAsyncThunk(
  "laboratory/deleteReport",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await deleteRequest(`${API.LABORATORY}/${id}`);
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);
