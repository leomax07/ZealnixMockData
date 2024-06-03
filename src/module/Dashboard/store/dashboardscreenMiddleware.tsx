import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../../constants";
import { getRequest } from "../../../utils/commonService";
import {
	AppointmentCount,
	AppointmentCountByDateRangePayloadType,
} from "./dashboardscreen.types";

export const getAppointmentCountByDateRange = createAsyncThunk(
	"dashboard/appointmentCountByDateRange",
	async (
		payload: AppointmentCountByDateRangePayloadType,
		{ rejectWithValue }
	) => {
		try {
			const { data } = await getRequest(
				API.APPOINTMENT_COUNT_DASHBOARD,
				payload
			);
			return data as AppointmentCount;
		} catch (error: any) {
			return rejectWithValue(error?.resoonse?.data?.message);
		}
	}
);

export const getPatientsCountByDateRange = createAsyncThunk(
	"dashboard/patientCountByDateRange",
	async (
		payload: AppointmentCountByDateRangePayloadType,
		{ rejectWithValue }
	) => {
		try {
			const { data } = await getRequest(API.PATIENT_COUNT_DASHBOARD, payload);
			return data as AppointmentCount;
		} catch (error: any) {
			return rejectWithValue(error.response.data?.error?.message);
		}
	}
);

export const getAppointmentGrapsByTypeAndDateRange = createAsyncThunk(
	"dashboard/getAppointmentGrapsByTypeAndDateRange",
	async (
		payload: AppointmentCountByDateRangePayloadType,
		{ rejectWithValue }
	) => {
		try {
			const { data } = await getRequest(API.APPOINTMENT_TYPE_GRAPH, payload);
			return data;
		} catch (error: any) {
			return rejectWithValue(error?.response?.data?.error?.message);
		}
	}
);

export const getPatientBarChartData = createAsyncThunk(
	"dashboard/getPatientBarChartData",
	async (
		payload: AppointmentCountByDateRangePayloadType,
		{ rejectWithValue }
	) => {
		try {
			const { data } = await getRequest(
				API.DASHBOARD_PATIENT_BAR_CHART,
				payload
			);
			return data;
		} catch (error: any) {
			return rejectWithValue(error?.response?.data?.error.message);
		}
	}
);

export const getInAndOutPatientBarChartData = createAsyncThunk(
	"dashboard/getInAndOutPatientBarChartData",
	async (
		payload: AppointmentCountByDateRangePayloadType,
		{ rejectWithValue }
	) => {
		try {
			const { data } = await getRequest(
				API.DASHBOARD_IN_OUT_PATIENT_BAR_CHART,
				payload
			);
			return data;
		} catch (error: any) {
			return rejectWithValue(error?.response?.data?.error.message);
		}
	}
);

export const getLatestPatientList = createAsyncThunk(
	"dashboard/getLatestPatientList",
	async (payload: any, { rejectWithValue }) => {
		try {
			const { data } = await getRequest(API.PATIENTS, payload);
			return data;
		} catch (error: any) {
			return rejectWithValue(error?.response?.data?.error?.message);
		}
	}
);

export const getPatientGenderStat = createAsyncThunk(
	"dashboard/getPatientGenderStat",
	async (
		payload: AppointmentCountByDateRangePayloadType,
		{ rejectWithValue }
	) => {
		try {
			const { data } = await getRequest(API.PATIENT_GENDER, payload);
			return data;
		} catch (error: any) {
			return rejectWithValue(error?.response?.data?.error?.message);
		}
	}
);
