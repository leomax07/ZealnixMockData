import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../../../../constants";
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
  putRequest,
} from "../../../../../utils/commonService";
import { CreateLabPayloadType, PatchLabPayloadType } from "./labsType";
import {
  toastError,
  toastSuccess,
} from "../../../../../redux/ToastStore/toastReducer";
import MESSAGE from "../../../../../utils/toastMessages";

export const fetchAllLabsByHospitalId = createAsyncThunk(
  "masters/labs",
  async (payload: any, { rejectWithValue }) => {
    const filter: any = {
      include: [{ relation: "department" }],
    };
    try {
      const { data }: any = await getRequest(API.LABS, {
        id: payload.hospitalId,
        filter,
      });

      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data.message);
    }
  }
);

export const createLabByHospitalId = createAsyncThunk(
  "masters/createLab",
  async (payload: CreateLabPayloadType, { rejectWithValue, dispatch }) => {
    try {
      const { data }: any = await postRequest(API.LABS, payload);
      dispatch(toastSuccess({ message: MESSAGE.SUCCESS.LAB.CREATE }));
      return data;
    } catch (error: any) {
      const message =
        error?.response?.data?.error?.message ?? MESSAGE.ERROR.LAB.CREATE;
      dispatch(toastError({ message }));
      return rejectWithValue(error?.response?.data?.error);
    }
  }
);

export const deleteLabById = createAsyncThunk(
  "masters/deleteLab",
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      const { data }: any = await deleteRequest(`${API.LABS}/${id}`);
      dispatch(toastSuccess({ message: MESSAGE.SUCCESS.LAB.DELETE }));
      return data;
    } catch (error: any) {
      const message =
        error?.response?.data?.error?.message ?? MESSAGE.ERROR.LAB.DELETE;
      dispatch(toastError({ message }));
      return rejectWithValue(error?.response?.data?.error);
    }
  }
);

export const updateLabById = createAsyncThunk(
  "masters/updateLab",
  async (payload: object | any, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await putRequest(`${API.LABS}/${payload.id}`, payload);
      dispatch(toastSuccess({ message: MESSAGE.SUCCESS.LAB.UPDATE }));
      return data;
    } catch (error: any) {
      const message =
        error?.response?.data?.error?.message ?? MESSAGE.ERROR.LAB.UPDATE;
      dispatch(toastError({ message }));
      return rejectWithValue(error?.response?.data?.error);
    }
  }
);

export const patchLabsById = createAsyncThunk(
  "masters/patchLab",
  async (payload: PatchLabPayloadType, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await patchRequest(`${API.LABS}/${payload.id}`, payload);
      dispatch(toastSuccess({ message: MESSAGE.SUCCESS.LAB.STATUS_UPDATE }));
      return data;
    } catch (error: any) {
      const message =
        error?.response?.data?.error?.message ??
        MESSAGE.ERROR.LAB.STATUS_UPDATE;
      dispatch(toastError({ message }));
      return rejectWithValue(error?.response?.data?.error);
    }
  }
);
