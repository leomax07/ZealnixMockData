export interface Sample {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
}

export interface AppointmentCount {
	count: number;
	description: "Appointment Count";
}

export interface PatientBarChartData {
	description: string;
	results: any[];
}

export interface SampleReducerState {
	isLoading: boolean;
	error: string;
	appointmentCount: AppointmentCount;
	appointmentStatisticsGraph: any;
	patientsBarChartData: PatientBarChartData;
	inAndOutPatientBarChartData: PatientBarChartData;
	latestPatientList: any[];
	patientGenderStat: PatientBarChartData;
}

export interface AppointmentCountByDateRangePayloadType {
	startDate: string;
	endDate: string;
}
