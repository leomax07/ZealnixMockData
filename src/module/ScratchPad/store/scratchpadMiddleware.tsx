import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../../constants";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../../../utils/commonService";
import { ScratchpadType } from "./scratchpadType";

export const createScratchpad = createAsyncThunk(
  "scratchpad/createScratchpad",
  async (payload: ScratchpadType, { rejectWithValue }) => {
    try {
      const { data } = await postRequest(API.SCRATCHPAD, payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response.data.message);
    }
  },
);

export const getScratchpads = createAsyncThunk(
  "scratchpad/getScratchpad",
  async (params: any, { rejectWithValue }) => {
    try {
      const { data }: any = await getRequest(API.SCRATCHPAD, {
        filter: params,
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

export const updateScratchpad = createAsyncThunk(
  "scratchpad/updateScratchpad",
  async (payload: ScratchpadType, { rejectWithValue }) => {
    try {
      const { data } = await putRequest(
        `${API.SCRATCHPAD}/${payload.id}`,
        payload,
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

export const deleteScratchpad = createAsyncThunk(
  "scratchpad/deleteScratchpad",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await deleteRequest(`${API.SCRATCHPAD}/${id}`);
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);
