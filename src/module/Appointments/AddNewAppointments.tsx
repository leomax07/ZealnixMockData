/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment";
import { Dialog } from "primereact/dialog";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import ButtonComponent from "../../Components/Buttons/Index";
import FilterDropdown from "../../Components/FilterDropdown/Index";
import TextAreaComponent from "../../Components/TextAreaComponent/Index";
import TextInputComponent from "../../Components/TextInput/Index";
import {
	APPOINTMENT_TYPES,
	BOOKED_VIA,
	BRANCH_ID,
	HOSPITAL_ID,
	SORT_BY_CREATEDAT_DESC,
} from "../../constants";
import { AppDispatch, RootState } from "../../redux/store";
import { getPatients } from "../Patients/store/patientMiddleware";
import { getStaffsByType } from "../Staffs/store/staffsMiddleware";
import AppointmentDateAndSlots from "./Components/AppointmentDateAndSlots";
import {
	createAppointment,
	fetchAllAppointments,
	updateAppointments,
} from "./store/appointmentMiddleware";
import { AddAppointmentStateType } from "./store/appointmentsType";
import { appointmentSchema } from "../../utils/validationSchema";

interface Props {
	visible: boolean;
	setVisible: (args: boolean) => void;
	width?: number;
	isEditing?: boolean;
	selectedItem?: any;
	isAppointment?: boolean;
	date?: string | Date;
	from?: "slotDetails" | undefined;
	slotDetails?: {
		doctorId: string;
		appointmentScheduleId: string;
		appointmentDate: string | Date;
	};
	handleAfterSaveFromParent?: Function;
}

function AddNewAppointments({
	visible,
	setVisible,
	width = 540,
	isEditing = false,
	selectedItem,
	isAppointment,
	date = moment().startOf("day").toDate(),
	from,
	slotDetails,
	handleAfterSaveFromParent,
}: Props) {
	const initialSate = {
		type: "regular",
		doctorId: "",
		patientId: "",
		patientContact: "",
		patientEmail: "",
		appointmentDate: moment().toDate(),
		title: "",
		notes: "",
		status: "upcoming",
		hospitalId: HOSPITAL_ID,
		appointmentScheduleId: "",
		bookedVia: BOOKED_VIA,
	};
	const [state, setState] = useState<AddAppointmentStateType>(initialSate);
	const dispatch = useDispatch<AppDispatch>();
	const { staffs } = useSelector<RootState, RootState["staffsReducers"]>(
		(rootState) => rootState.staffsReducers
	);
	const { patients } = useSelector<RootState, RootState["patientsReducers"]>(
		(rootState) => rootState.patientsReducers
	);

	useEffect(() => {
		if (selectedItem && isEditing) {
			setState(selectedItem);
		} else if (isAppointment && selectedItem) {
			setState((prev: any) => ({
				...prev,
				patientId: selectedItem.id,
				patientEmail: selectedItem.email,
				patientContact: selectedItem.phone,
			}));
		} else {
			setState(initialSate);
		}
	}, [selectedItem]);

	// to set particular data
	useEffect(() => {
		if (from === "slotDetails") {
			setState((prev) => ({ ...prev, ...slotDetails }));
		}
	}, [from, isEditing]);

	const fetchData = async () => {
		const payload = {
			filter: {
				where: {
					type: "doctor",
				},
			},
		};
		await dispatch(getStaffsByType(payload));
		const PatientPayload = {
			order: SORT_BY_CREATEDAT_DESC,
			where: {
				hospitalId: HOSPITAL_ID,
				branchId: BRANCH_ID,
			},
		};
		await dispatch(getPatients(PatientPayload));
		await dispatch(fetchAllAppointments);
	};

	const fetchAppointments = async () => {
		const defaultIncludeQuery = {
			filter: {
				where: {
					hospitalId: HOSPITAL_ID,
					appointmentDate: moment(date).startOf("day").toISOString(),
				},
				include: ["hospital", "doctor", "department", "patient"],
			},
		};
		await dispatch(
			fetchAllAppointments(
				encodeURI(JSON.stringify(defaultIncludeQuery.filter))
			)
		);
	};

	const payloadHandler = () => {
		const payload = {
			...state,
			appointmentDate: moment(new Date(state.appointmentDate))
				.startOf("day")
				.toISOString(),
			bookedVia: BOOKED_VIA,
		};
		if (isEditing) {
			delete payload.doctor;
			delete payload.patient;
			delete payload.hospital;
			delete payload.department;
			delete payload.appointmentSchedule;
			delete payload.appointmentEnd;
			delete payload.appointmentStart;
			delete payload._id;
		}
		return payload;
	};

	const handleSave = async () => {
		const payload = payloadHandler();
		const response = await dispatch(
			isEditing ? updateAppointments(payload) : createAppointment(payload)
		);
		if (response.meta.requestStatus === "fulfilled") {
			if (handleAfterSaveFromParent) {
				handleAfterSaveFromParent();
				setVisible(false);
				return;
			}
			await fetchData();
			await fetchAppointments();
			setVisible(false);
		}
	};

	const { errors, touched, handleSubmit, handleBlur, resetForm } = useFormik({
		initialValues: {
			patientId: state.patientId,
			type: state.type,
			doctorId: state.doctorId,
			title: state.title,
		},
		validationSchema: appointmentSchema,
		enableReinitialize: true,
		onSubmit: () => {
			// handleSave();
			setState(initialSate)
			setVisible(false)
		},
	});

	useEffect(() => {
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// resets form validation while unmount
	useEffect(() => {
		if (!visible) resetForm();
	}, [visible]);

	// handle change common for all fields except appointmentDate
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		if (name === "patientId") {
			const selectedPatient: any = patients.find(
				(patient: any) => patient.id === value
			);
			setState((prev) => ({
				...prev,
				patientId: value,
				patientContact: selectedPatient.phone,
				patientEmail: selectedPatient.email,
			}));
		}
		setState((prev) => ({ ...prev, [name]: value }));
	};

	// handleChange for appointmentDate field
	const handleAppointmentDateChange = (dateString: string) => {
		setState((prev) => ({ ...prev, appointmentDate: dateString }));
	};

	// handleChange for appointmentScheduleId
	const handleSlotSelection = (shecduleId: string) => {
		setState((prev) => ({ ...prev, appointmentScheduleId: shecduleId }));
	};

	const footerHelper = () => (
		<div className="buttons__container">
			<ButtonComponent
				label="Cancel"
				type="outlined"
				onClick={() => setVisible(false)}
			/>
			<ButtonComponent
				label="Save"
				onClick={() => handleSubmit()}
			/>
		</div>
	);

	return (
		<Dialog
			header="Add new"
			visible={visible}
			onHide={() => setVisible(false)}
			style={{ width }}
			className="add__appointment__modal__container"
			footer={footerHelper}
		>
			<div className="two__input__container">
				<div className="half">
					<FilterDropdown
						label="Appointment Type"
						items={APPOINTMENT_TYPES}
						classNames="full__width"
						name="type"
						value={state.type}
						required
						onBlur={handleBlur}
						handleChange={handleChange}
						error={touched.type && errors.type}
					/>
				</div>
				<div className="half">
					<FilterDropdown
						label="Doctor"
						classNames="full__width"
						items={staffs}
						name="doctorId"
						optionLabel="name"
						optionValue="id"
						value={state.doctorId}
						disabled={from === "slotDetails"}
						required
						onBlur={handleBlur}
						handleChange={handleChange}
						error={touched.doctorId && errors.doctorId}
					/>
				</div>
			</div>
			<div className="two__input__container">
				<div className="half">
					<FilterDropdown
						label="Patient Name"
						classNames="full__width"
						items={patients}
						name="patientId"
						optionLabel="name"
						optionValue="id"
						value={state.patientId}
						disabled={isAppointment || isEditing}
						required
						onBlur={handleBlur}
						handleChange={handleChange}
						error={touched.patientId && errors.patientId}
					/>
				</div>
				<div className="half">
					<TextInputComponent
						label="Patient Contact Number"
						name="patientContact"
						value={state.patientContact}
						onChange={handleChange}
					/>
				</div>
			</div>

			<div className="two__input__container">
				<div className="half">
					<TextInputComponent
						label="Patient Email"
						name="patientEmail"
						value={state.patientEmail}
						onChange={handleChange}
						disabled={isAppointment || isEditing}
					/>
				</div>
				<div className="half">
					<AppointmentDateAndSlots
						doctorId={state.doctorId}
						type={state.type}
						date={state.appointmentDate}
						setDate={handleAppointmentDateChange}
						selectedSlotId={state.appointmentScheduleId}
						setSelectedSlotId={handleSlotSelection}
						disabled={from === "slotDetails"}
					/>
				</div>
			</div>

			<div className="one__input__container">
				<TextInputComponent
					label="Appointment Title"
					value={state.title}
					name="title"
					required
					onBlur={handleBlur}
					onChange={handleChange}
					error={touched.title && errors.title}
				/>
			</div>
			<div className="one__input__container">
				<TextAreaComponent
					label="Notes"
					subText="Add Additional Notes"
					cols={53}
					name="notes"
					value={state.notes}
					onChange={handleChange}
				/>
			</div>
		</Dialog>
	);
}

export default AddNewAppointments;
