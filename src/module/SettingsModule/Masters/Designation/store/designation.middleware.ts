import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../../../../constants";
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
  putRequest,
} from "../../../../../utils/commonService";
import {
  CreateDesignation,
  DesignationType,
  PatchDesignationType,
} from "./designation.types";

/**
 * GET all designations
 */
export const fetchAllDestinations = createAsyncThunk(
  "settings/getAllDesignations",
  async (_a, { rejectWithValue }) => {
    try {
      const { data }: DesignationType[] | any = await getRequest(
        API.DESIGNATIONS,
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response.data.message);
    }
  },
);
/**
 * POST Create designation
 */
export const createNewDesignation = createAsyncThunk(
  "settings/createNewDesignation",
  async (payload: CreateDesignation, { rejectWithValue }) => {
    try {
      const { data }: DesignationType | any = await postRequest(
        API.DESIGNATIONS,
        payload,
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response.data.message);
    }
  },
);

export const updateDesignation = createAsyncThunk(
  "settings/updateDesignation",
  async (payload: DesignationType, { rejectWithValue }) => {
    try {
      const { data }: DesignationType | any = await putRequest(
        `${API.DESIGNATIONS}/${payload.id}`,
        payload,
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

export const deleteDesignationById = createAsyncThunk(
  "settings/deleteDesignationById",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await deleteRequest(`${API.DESIGNATIONS}/${id}`);
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response.data.message);
    }
  },
);

export const patchDesignationById = createAsyncThunk(
  "settings/patchDesignationById",
  async (payload: PatchDesignationType, { rejectWithValue }) => {
    try {
      const { data } = await patchRequest(
        `${API.DESIGNATIONS}/${payload.id}`,
        payload,
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response.data.message);
    }
  },
);
