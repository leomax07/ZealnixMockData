import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../../../constants";
import { getRequest, patchRequest } from "../../../../utils/commonService";
import {
  toastError,
  toastSuccess,
} from "../../../../redux/ToastStore/toastReducer";
import MESSAGE from "../../../../utils/toastMessages";

export const fetchHospitalDetailById = createAsyncThunk(
  "generalSttings/fetchHospitalDetailById",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data }: any = await getRequest(`${API.HOSPITALS}/${id}`);
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);
export const patchHospitalDetailById = createAsyncThunk(
  "generalSttings/patchHospitalDetailById",
  async (payload: any, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await patchRequest(
        `${API.HOSPITALS}/${payload.id}`,
        payload
      );
      dispatch(toastSuccess({ message: MESSAGE.SUCCESS.HOSPITAL.UPDATE }));
      return data;
    } catch (error: any) {
      const message =
        error?.response?.data?.error?.message ?? MESSAGE.ERROR.HOSPITAL.UPDATE;
      dispatch(toastError({ message }));
      return rejectWithValue(error?.response?.data?.error);
    }
  }
);
