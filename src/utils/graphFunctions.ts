/* eslint-disable no-nested-ternary */
import moment from "moment";
import {
	APPOINTMENT_STAT_WEEK,
	APPOINTMENT_TYPES,
	DAYS_OF_WEEK,
	MONTHS_OF_YEAR,
} from "../constants";

export function formatAppointmentStatsGraphData(data: any, selected: number) {
	const documentStyle = getComputedStyle(document.documentElement);
	const textColorSecondary = documentStyle.getPropertyValue(
		"--text-color-secondary"
	);
	const surfaceBorder = "#ED4F9D";
	const dataSet = {
		labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
		datasets: [
			{
				label: "Numbers",
				data: [12, 51, 62, 33, 21, 62, 45],

				borderColor: "#357DEA",
				tension: 0.4,
			},
			{
				label: "Numbers",
				data: [15, 45, 12, 33, 31, 72, 35],

				borderColor: "#7B61FF",
				tension: 0.4,
			},
		],
	};
	const options = {
		maintainAspectRatio: false,
		aspectRatio: 0.6,
		plugins: {
			legend: false,
		},
		scales: {
			x: {
				ticks: {
					color: textColorSecondary,
				},
				grid: {
					display: false,
					color: surfaceBorder,
				},
			},
			y: {
				ticks: {
					color: textColorSecondary,
				},
				grid: {
					display: false,
					color: surfaceBorder,
				},
			},
		},
	};

	if (selected === 0 || selected === 1 || selected === 2) {
		if (selected === 0)
			dataSet.labels = DAYS_OF_WEEK.map((day) => day.substring(0, 3));
		if (selected === 1) {
			dataSet.labels = Array.from(Array(moment().daysInMonth()).keys()).map(
				(day) => `${day}`
			);
		}
		if (selected === 2) {
			dataSet.labels = MONTHS_OF_YEAR;
		}
		const regularAppointments: any =
			selected === 0
				? { ...APPOINTMENT_STAT_WEEK }
				: selected === 2
				? Array.from(Array(12).keys()).reduce(
						(acc, day) => ({ ...acc, [day]: 0 }),
						{}
				  )
				: Array.from(Array(moment().daysInMonth()).keys()).reduce(
						(acc, day) => ({ ...acc, [day]: 0 }),
						{}
				  );
		const emergencyAppointments: any =
			selected === 0
				? { ...APPOINTMENT_STAT_WEEK }
				: selected === 2
				? Array.from(Array(12).keys()).reduce(
						(acc, day) => ({ ...acc, [day]: 0 }),
						{}
				  )
				: Array.from(Array(moment().daysInMonth()).keys()).reduce(
						(acc, day) => ({ ...acc, [day]: 0 }),
						{}
				  );
		const videoAppointments: any =
			selected === 0
				? { ...APPOINTMENT_STAT_WEEK }
				: Array.from(
						Array(selected === 2 ? 12 : moment().daysInMonth()).keys()
				  ).reduce((acc, day) => ({ ...acc, [day]: 0 }), {});

		// manipulationg the data
		data.results.forEach((result: any) => {
			result.types.forEach((type: any) => {
				const day: number =
					// eslint-disable-next-line no-nested-ternary
					selected === 0
						? new Date(type.date).getDay()
						: selected === 2
						? new Date(type.date).getMonth()
						: new Date(type.date).getDate();

				if (result.type === APPOINTMENT_TYPES[0]) {
					regularAppointments[day] += type.count;
				}
				if (result.type === "emergency") {
					emergencyAppointments[day] += type.count;
				}
				if (result.type === APPOINTMENT_TYPES[2]) {
					videoAppointments[day] += type.count;
				}
			});
		});

		dataSet.datasets = [
			{
				label: "Regular",
				data: Object.values(regularAppointments),
				borderColor: "#ED4F9D",
				tension: 0.4,
			},
			{
				label: "Emergency",
				data: Object.values(emergencyAppointments),
				borderColor: "#7B61FF",
				tension: 0.4,
			},
			{
				label: "Video",
				data: Object.values(videoAppointments),
				borderColor: "#357DEA",
				tension: 0.4,
			},
		];
	}

	return { data: dataSet, options };
}

export function formatAppointmentGenderGraphData() {
	return [];
}

export function formatPatientBarChartData(data: any, selected: number) {
	const labels =
		selected === 0
			? ["S", "M", "T", "W", "T", "F", "S"]
			: selected === 1
			? Array.from(Array(moment().daysInMonth()).keys()).map((day) => `${day}`)
			: [
					"Jan",
					"Feb",
					"Mar",
					"Apr",
					"May",
					"Jun",
					"Jul",
					"Aug",
					"Sep",
					"Oct",
					"Nov",
					"Dec",
			  ];

	const patientsData: any =
		selected === 0
			? { ...APPOINTMENT_STAT_WEEK }
			: selected === 2
			? Array.from(Array(12).keys()).reduce(
					(acc, day) => ({ ...acc, [day]: 0 }),
					{}
			  )
			: Array.from(Array(moment().daysInMonth()).keys()).reduce(
					(acc, day) => ({ ...acc, [day]: 0 }),
					{}
			  );
	data.results.forEach((type: any) => {
		const day: number =
			// eslint-disable-next-line no-nested-ternary
			selected === 0
				? new Date(type.date).getDay()
				: selected === 2
				? new Date(type.date).getMonth()
				: new Date(type.date).getDate();
		patientsData[day] += type.count;
	});
	const dataObject = {
		labels,
		datasets: [
			{
				label: "Patients",
				data: Object.values(patientsData),
				backgroundColor: Object.keys(patientsData).map((pData) => {
					const day: number =
						// eslint-disable-next-line no-nested-ternary
						selected === 0
							? new Date().getDay()
							: selected === 2
							? new Date().getMonth()
							: new Date().getDate();
					return Number(pData) !== Number(day) ? "#ED4F9D2E" : "#ED4F9D";
				}),
				barPercentage: 0.4,
				borderRadius: 10,
			},
		],
	};

	return {
		data: dataObject,
		options: {},
	};
}
