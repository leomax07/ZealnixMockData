import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../../../../constants";
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
  putRequest,
} from "../../../../../utils/commonService";

export const fetchAllDepartments = createAsyncThunk(
  "masters/departments",
  async (_a, { rejectWithValue }) => {
    try {
      const { data }: any = await getRequest(API.DEPARTMENTS);

      return data;
    } catch (error: any) {
      return rejectWithValue(error?.request.data.message);
    }
  },
);

export const createDepartment = createAsyncThunk(
  "masters/createDepartments",
  async (payload: any, { rejectWithValue }) => {
    try {
      const { data }: any = await postRequest(API.DEPARTMENTS, payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.request.data.message);
    }
  },
);

export const deleteDepartment = createAsyncThunk(
  "masters/deleteDepartments",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data }: any = await deleteRequest(`${API.DEPARTMENTS}/${id}`);
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.request.data.message);
    }
  },
);

export const updateDepartment = createAsyncThunk(
  "masters/updateDepartment",
  async (payload: object | any, { rejectWithValue }) => {
    try {
      const { data } = await putRequest(
        `${API.DEPARTMENTS}/${payload.id}`,
        payload,
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response.data.message);
    }
  },
);

export const patchDepartment = createAsyncThunk(
  "masters/patchDepartment",
  async (payload: any, { rejectWithValue }) => {
    try {
      const { data } = await patchRequest(
        `${API.DEPARTMENTS}/${payload.id}`,
        payload,
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response.data.message);
    }
  },
);
