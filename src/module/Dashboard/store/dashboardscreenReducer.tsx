import { createSlice } from "@reduxjs/toolkit";
import { SampleReducerState } from "./dashboardscreen.types";
import {
	getAppointmentCountByDateRange,
	getAppointmentGrapsByTypeAndDateRange,
	getInAndOutPatientBarChartData,
	getLatestPatientList,
	getPatientBarChartData,
	getPatientGenderStat,
} from "./dashboardscreenMiddleware";

const dashboardInitialState: SampleReducerState = {
	isLoading: false,
	error: "",
	appointmentCount: {
		count: 0,
		description: "Appointment Count",
	},
	appointmentStatisticsGraph: {
		description: "Patients Data",
		results: [],
	},
	patientsBarChartData: {
		description: "Patients Data",
		results: [],
	},
	inAndOutPatientBarChartData: {
		description: "Patients Data",
		results: [],
	},
	patientGenderStat: {
		description: "Patients Data",
		results: [],
	},
	latestPatientList: [],
};

const dashboardReducer = createSlice({
	name: "login",
	initialState: dashboardInitialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getAppointmentCountByDateRange.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(
			getAppointmentCountByDateRange.fulfilled,
			(state, action) => {
				state.isLoading = false;
				state.error = "";
				state.appointmentCount = action.payload;
			}
		);
		builder.addCase(
			getAppointmentGrapsByTypeAndDateRange.fulfilled,
			(state, action) => {
				state.appointmentStatisticsGraph = action.payload;
			}
		);
		builder.addCase(getPatientBarChartData.fulfilled, (state, action) => {
			state.patientsBarChartData = action.payload;
		});
		builder.addCase(
			getInAndOutPatientBarChartData.fulfilled,
			(state, action) => {
				state.inAndOutPatientBarChartData = action.payload;
			}
		);
		builder.addCase(getLatestPatientList.fulfilled, (state, action) => {
			state.latestPatientList = action.payload;
		});
		builder.addCase(getPatientGenderStat.fulfilled, (state, action) => {
			state.patientGenderStat = action.payload;
		});
	},
});

export default dashboardReducer.reducer;
