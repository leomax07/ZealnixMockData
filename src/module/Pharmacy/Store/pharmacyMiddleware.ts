import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../../../utils/commonService";
import { API } from "../../../constants";
import {
  toastError,
  toastSuccess,
} from "../../../redux/ToastStore/toastReducer";
import MESSAGE from "../../../utils/toastMessages";

// middleware used to list inventory
export const fetchInventoryStocks = createAsyncThunk(
  "pharmacy/fetchInventoryStocks",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const { data }: any = await getRequest(API.PHARMACY_DRUG_STOCK);
      return data;
    } catch (error: any) {
      const message =
        error?.response?.data?.error?.message ??
        MESSAGE.ERROR.PHARMACY_DRUG.STOCK_LIST;
      dispatch(toastError({ message }));
      return rejectWithValue(error?.response?.data?.error);
    }
  }
);

// middleware used to create new drug on inventory
export const createNewDrug = createAsyncThunk(
  "pharmacy/createNewDrug",
  async (payload: object, { rejectWithValue, dispatch }) => {
    try {
      const data = await postRequest(API.PHARMACY_DRUG, payload);
      dispatch(toastSuccess({ message: MESSAGE.SUCCESS.PHARMACY_DRUG.CREATE }));
      return data;
    } catch (error: any) {
      const message =
        error?.response?.data?.error?.message ??
        MESSAGE.ERROR.PHARMACY_DRUG.CREATE;
      dispatch(toastError({ message }));
      return rejectWithValue(error?.response?.data?.error);
    }
  }
);

// middleware used to edit drug on inventory
export const editDrug = createAsyncThunk(
  "pharmacy/editDrug",
  async (payload: any, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await putRequest(`${API.PHARMACY_DRUG}/${payload.id}`, payload);
      dispatch(toastSuccess({ message: MESSAGE.SUCCESS.PHARMACY_DRUG.UPDATE }));
      return data;
    } catch (error: any) {
      const message =
        error?.response?.data?.error?.message ??
        MESSAGE.ERROR.PHARMACY_DRUG.UPDATE;
      dispatch(toastError({ message }));
      return rejectWithValue(error?.response?.data?.error);
    }
  }
);

// middleware used to delete a drug on inventory
export const deleteDrug = createAsyncThunk(
  "pharmacy/deleteDrug",
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      const { data }: any = await deleteRequest(`${API.PHARMACY_DRUG}/${id}`);
      dispatch(toastSuccess({ message: MESSAGE.SUCCESS.PHARMACY_DRUG.DELETE }));
      return data;
    } catch (error: any) {
      const message =
        error?.response?.data?.error?.message ??
        MESSAGE.ERROR.PHARMACY_DRUG.DELETE;
      dispatch(toastError({ message }));
      return rejectWithValue(error?.response?.data?.error);
    }
  }
);
