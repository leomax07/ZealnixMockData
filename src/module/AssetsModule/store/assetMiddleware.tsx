import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../../constants";
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from "../../../utils/commonService";
import { AssetItem, AssetMaintenances, AssetType } from "./assetTypes";
import {
  toastSuccess,
  toastError,
} from "../../../redux/ToastStore/toastReducer";
import MESSAGE from "../../../utils/toastMessages";

export const getAssets = createAsyncThunk(
  "assets/getAssets",
  async (params: any, { rejectWithValue }) => {
    try {
      const { data }: any = await getRequest(API.ASSETS, { filter: params });
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const createAsset = createAsyncThunk(
  "assets/createAsset",
  async (payload: AssetType, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await postRequest(API.ASSETS, payload);
      dispatch(toastSuccess({ message: MESSAGE.SUCCESS.ASSET.CREATE }));
      return data;
    } catch (error: any) {
      dispatch(
        toastError({
          message: error?.response?.data?.error ?? MESSAGE.ERROR.ASSET.CREATE,
        })
      );
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const updateAsset = createAsyncThunk(
  "assets/updateAsset",
  async (payload: AssetType, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await patchRequest(
        `${API.ASSETS}/${payload.id}`,
        payload
      );
      dispatch(toastSuccess({ message: MESSAGE.SUCCESS.ASSET.UPDATE }));
      return data;
    } catch (error: any) {
      const message =
        error?.response?.data?.error?.message ?? MESSAGE.ERROR.ASSET.UPDATE;
      dispatch(toastError({ message }));
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const deleteAsset = createAsyncThunk(
  "assets/deleteAsset",
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await deleteRequest(`${API.ASSETS}/${id}`);
      dispatch(toastSuccess({ message: MESSAGE.SUCCESS.ASSET.DELETE }));
      return data;
    } catch (error: any) {
      const message =
        error?.response?.data?.error?.message ?? MESSAGE.ERROR.ASSET.DELETE;
      dispatch(toastError({ message }));
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

// Asset Categories

export const getAllAssetCategories = createAsyncThunk(
  "assets/getAllAssetCategories",
  async (params: any, { rejectWithValue }) => {
    try {
      const { data }: any = await getRequest(API.ASSETS_CATEGORIES, {
        filter: params,
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

// Asset Items

export const getAllAssetItems = createAsyncThunk(
  "assets/getAllAssetItems",
  async (params: any, { rejectWithValue }) => {
    try {
      const { data }: any = await getRequest(API.ASSETS_ITEMS, {
        filter: params,
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const createAssetItem = createAsyncThunk(
  "assets/createAssetItem",
  async (payload: AssetItem, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await postRequest(API.ASSETS_ITEMS, payload);
      dispatch(toastSuccess({ message: MESSAGE.SUCCESS.ASSET.CREATE }));
      return data;
    } catch (error: any) {
      dispatch(
        toastError({
          message: error?.response?.data?.error ?? MESSAGE.ERROR.ASSET.CREATE,
        })
      );
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const updateAssetItem = createAsyncThunk(
  "assets/updateAssetItem",
  async (payload: AssetItem, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await patchRequest(
        `${API.ASSETS_ITEMS}/${payload.id}`,
        payload
      );
      dispatch(toastSuccess({ message: MESSAGE.SUCCESS.ASSET.UPDATE }));
      return data;
    } catch (error: any) {
      const message =
        error?.response?.data?.error?.message ?? MESSAGE.ERROR.ASSET.UPDATE;
      dispatch(toastError({ message }));
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const deleteAssetItem = createAsyncThunk(
  "assets/deleteAssetItem",
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await deleteRequest(`${API.ASSETS_ITEMS}/${id}`);
      dispatch(toastSuccess({ message: MESSAGE.SUCCESS.ASSET.DELETE }));
      return data;
    } catch (error: any) {
      const message =
        error?.response?.data?.error?.message ?? MESSAGE.ERROR.ASSET.DELETE;
      dispatch(toastError({ message }));
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

// Asset History

export const getAssetHistory = createAsyncThunk(
  "assets/getAssetHistory",
  async (params: any, { rejectWithValue }) => {
    try {
      const { data }: any = await getRequest(API.ASSETS_HISTORIES, {
        filter: params,
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

// Asset Maintenances

export const getAssetMaintenances = createAsyncThunk(
  "assets/getAssetMaintenances",
  async (params: any, { rejectWithValue }) => {
    try {
      const { data }: any = await getRequest(API.ASSETS_MAINTENANCES, {
        filter: params,
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const createMaintenance = createAsyncThunk(
  "assets/createMaintenance",
  async (payload: AssetMaintenances, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await postRequest(API.ASSETS_MAINTENANCES, payload);
      dispatch(toastSuccess({ message: MESSAGE.SUCCESS.MAINTENANCE.CREATE }));
      return data;
    } catch (error: any) {
      dispatch(
        toastError({
          message:
            error?.response?.data?.error ?? MESSAGE.ERROR.MAINTENANCE.CREATE,
        })
      );
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const updateMaintenance = createAsyncThunk(
  "assets/updateMaintenance",
  async (payload: AssetMaintenances, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await patchRequest(
        `${API.ASSETS_MAINTENANCES}/${payload.id}`,
        payload
      );
      dispatch(toastSuccess({ message: MESSAGE.SUCCESS.MAINTENANCE.UPDATE }));
      return data;
    } catch (error: any) {
      const message =
        error?.response?.data?.error?.message ??
        MESSAGE.ERROR.MAINTENANCE.UPDATE;
      dispatch(toastError({ message }));
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const deleteMaintenance = createAsyncThunk(
  "assets/deleteMaintenance",
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await deleteRequest(`${API.ASSETS_MAINTENANCES}/${id}`);
      dispatch(toastSuccess({ message: MESSAGE.SUCCESS.MAINTENANCE.DELETE }));
      return data;
    } catch (error: any) {
      const message =
        error?.response?.data?.error?.message ??
        MESSAGE.ERROR.MAINTENANCE.DELETE;
      dispatch(toastError({ message }));
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);
