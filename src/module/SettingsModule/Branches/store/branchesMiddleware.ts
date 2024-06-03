import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../../../constants";
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
  putRequest,
} from "../../../../utils/commonService";
import { DesignationType } from "../../Masters/Designation/store/designation.types";
import {
  GetAllBranchByHospitalIdType,
  CreateBranchesByHospitalIDTypes,
  PatchBranchesTypes,
} from "./branchesTypes";
import {
  toastError,
  toastSuccess,
} from "../../../../redux/ToastStore/toastReducer";
import MESSAGE from "../../../../utils/toastMessages";

export const deleteBranchesByID = createAsyncThunk(
  "settings/deleteBranches",
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      const { data }: any = await deleteRequest(`${API.BRANCHES}/${id}`);
      dispatch(toastSuccess({ message: MESSAGE.SUCCESS.BRANCH.DELETE }));
      return data;
    } catch (error: any) {
      const message =
        error?.response?.data?.error?.message ?? MESSAGE.ERROR.BRANCH.DELETE;
      dispatch(toastError({ message }));
      return rejectWithValue(error?.response?.data?.error);
    }
  }
);

/**
 * GET all branches by hospital ID
 */
export const fetchAllBranchesByHospitalId = createAsyncThunk(
  "settings/getAllBranchByHospitalsID",
  async (payload: GetAllBranchByHospitalIdType, { rejectWithValue }) => {
    const filter = {
      where: {
        name: {
          like: `.*${payload.search || ""}.*`,
          options: "i",
        },
        hospitalId: payload.hospitalId,
      },
    };
    try {
      const { data }: DesignationType | any = await getRequest(API.BRANCHES, {
        filter,
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response.data.message);
    }
  }
);
/**
 * POST create branch by hospital ID
 */
export const createBranchesByHospitalId = createAsyncThunk(
  "settings/createBranchesByHospitalID",
  async (
    payload: CreateBranchesByHospitalIDTypes,
    { rejectWithValue, dispatch }
  ) => {
    try {
      const { data }: CreateBranchesByHospitalIDTypes | any = await postRequest(
        API.BRANCHES,
        payload
      );
      dispatch(toastSuccess({ message: MESSAGE.SUCCESS.BRANCH.CREATE }));
      return data;
    } catch (error: any) {
      const message =
        error?.response?.data?.error?.message ?? MESSAGE.ERROR.BRANCH.CREATE;
      dispatch(toastError({ message }));
      return rejectWithValue(error?.response?.data?.error);
    }
  }
);

/**
 * GET branch details by branch ID
 */
export const getBranchDetailsById = createAsyncThunk(
  "settings/getBranchDetailsByBranchId",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await getRequest(`${API.BRANCHES}/${id}`);
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response.data.message);
    }
  }
);

/**
 * PATCH request for Brnaches
 */
export const patchBranchesById = createAsyncThunk(
  "settings/patchBranchesById",
  async (payload: PatchBranchesTypes, { rejectWithValue, dispatch }) => {
    try {
      const { data }: any = await patchRequest(
        `${API.BRANCHES}/${payload.id}`,
        payload
      );
      dispatch(toastSuccess({ message: MESSAGE.SUCCESS.BRANCH.UPDATE }));
      return data;
    } catch (error: any) {
      const message =
        error?.response?.data?.error?.message ?? MESSAGE.ERROR.BRANCH.UPDATE;
      dispatch(toastError({ message }));
      return rejectWithValue(error?.response?.data?.error);
    }
  }
);

export const updateBranchesById = createAsyncThunk(
  "settings/updateBranchesById",
  async (
    payload: CreateBranchesByHospitalIDTypes,
    { rejectWithValue, dispatch }
  ) => {
    try {
      const { data }: any = await putRequest(
        `${API.BRANCHES}/${payload.id}`,
        payload
      );
      dispatch(toastSuccess({ message: MESSAGE.SUCCESS.BRANCH.UPDATE }));
      return data;
    } catch (error: any) {
      const message =
        error?.response?.data?.error?.message ?? MESSAGE.ERROR.BRANCH.UPDATE;
      dispatch(toastError({ message }));
      return rejectWithValue(error?.response?.data?.error);
    }
  }
);
