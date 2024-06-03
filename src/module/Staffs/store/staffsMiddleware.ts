import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../../constants";
import MESSAGE from "../../../utils/toastMessages";
import {
	deleteRequest,
	getRequest,
	patchRequest,
	postRequest,
} from "../../../utils/commonService";
import { UpdateStaffDetail } from "./sfattsTypes";
import {
	toastError,
	toastSuccess,
} from "../../../redux/ToastStore/toastReducer";

export const getStaffsByType = createAsyncThunk(
	"staffs/getStaffsByType",
	async (filter: object, { rejectWithValue }) => {
		try {
			const { data } = await getRequest(API.STAFFS, filter);
			return data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const createNewStaff = createAsyncThunk(
	"staffs/createNewStaff",
	async (payload: object, { rejectWithValue, dispatch }) => {
		try {
			const response = await postRequest(API.STAFFS, payload);
			dispatch(toastSuccess({ message: MESSAGE.SUCCESS.STAFF.CREATE }));
			return response.data;
		} catch (error: any) {
			dispatch(
				toastError({
					message: error?.response?.data?.error ?? MESSAGE.ERROR.STAFF.CREATE,
				})
			);
			return rejectWithValue(error?.response?.data?.error);
		}
	}
);

export const getStaffDetailsById = createAsyncThunk(
	"staffs/getStaffDetailsById",
	async (payload: any | undefined, { rejectWithValue }) => {
		try {
			const { data } = await getRequest(`${API.STAFFS}/${payload.id}`, {
				filter: payload.filter,
			});
			return data;
		} catch (error: any) {
			return rejectWithValue(error?.response?.data?.message);
		}
	}
);

export const updateStaff = createAsyncThunk(
	"staffs/updateStaff",
	async (payload: any, { rejectWithValue, dispatch }) => {
		try {
			const { data } = await patchRequest(
				`${API.STAFFS}/${payload.id}`,
				payload
			);
			dispatch(toastSuccess({ message: MESSAGE.SUCCESS.STAFF.UPDATE }));
			return data;
		} catch (error: any) {
			const message =
				error?.response?.data?.error?.message ?? MESSAGE.ERROR.STAFF.UPDATE;
			dispatch(toastError({ message }));
			return rejectWithValue(error?.response?.data?.error);
		}
	}
);

export const patchStaff = createAsyncThunk(
	"staffs/patchStaff",
	async (payload: UpdateStaffDetail, { rejectWithValue, dispatch }) => {
		try {
			const { data } = await patchRequest(
				`${API.STAFFS}/${payload.id}`,
				payload
			);
			dispatch(toastSuccess({ message: MESSAGE.SUCCESS.STAFF.STATUS_UPDATE }));
			return data;
		} catch (error: any) {
			const message =
				error?.response?.data?.error?.message ??
				MESSAGE.ERROR.STAFF.STATUS_UPDATE;
			dispatch(toastError({ message }));
			return rejectWithValue(error?.response?.data?.message);
		}
	}
);

export const deleteStaffById = createAsyncThunk(
	"staffs/deleteStaffById",
	async (id: string, { rejectWithValue, dispatch }) => {
		try {
			const { data } = await deleteRequest(`${API.STAFFS}/${id}`);
			dispatch(toastSuccess({ message: MESSAGE.SUCCESS.STAFF.DELETE }));
			return data;
		} catch (error: any) {
			const message =
				error?.response?.data?.error?.message ?? MESSAGE.ERROR.STAFF.DELETE;
			dispatch(toastError({ message }));
			return rejectWithValue(error?.response?.data?.message);
		}
	}
);

export const getStaffsReportsById = createAsyncThunk(
	"staffs/getStaffReportsById",
	async (payload: Object, { rejectWithValue }) => {
		try {
			const { data } = await getRequest(API.LAB_REPORT, { filter: payload });
			return data;
		} catch (error: any) {
			return rejectWithValue(error?.response?.error?.message);
		}
	}
);
