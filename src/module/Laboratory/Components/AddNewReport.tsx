import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import ButtonComponent from "../../../Components/Buttons/Index";
import FileUploadComponent from "../../../Components/FileUplodComponent/Index";
import FilterDropdown from "../../../Components/FilterDropdown/Index";
import TextAreaComponent from "../../../Components/TextAreaComponent/Index";
import TextInputComponent from "../../../Components/TextInput/Index";
import { AppDispatch, RootState } from "../../../redux/store";
import { LaboratoryType } from "../store/laboratoryType";
import { getPatients } from "../../Patients/store/patientMiddleware";
import { BRANCH_ID, HOSPITAL_ID, STATUS } from "../../../constants";
import { fetchAllLabsByHospitalId } from "../../SettingsModule/Masters/Labs/store/labsMiddleware";
import { getStaffsByType } from "../../Staffs/store/staffsMiddleware";
import DatePickerComponent from "../../../Components/DatePicker/Index";
import { fetchAllDepartments } from "../../SettingsModule/Masters/Departments/store/departmentMiddleware";
import {
	createLaboratoryReport,
	getLaboratoryReport,
	updateLaboratoryReport,
} from "../store/laboratoryMiddleware";
import { labReportSchema } from "../../../utils/validationSchema";

interface Props {
	visible?: boolean;
	width?: string;
	setVisible: Function;
	isEditing?: boolean;
	selectedItem?: any;
	isReport?: boolean;
	labId?: string;
}

function AddNewReport({
	visible,
	setVisible,
	width = "768px",
	isEditing,
	selectedItem,
	isReport,
	labId,
}: Props) {
	const initialState = {
		type: "",
		testDateAndTime: "",
		illness: "",
		reportFileUrl: [],
		status: "",
		notes: "",
		patientId: "",
		labTechnicianId: "",
		headDoctorId: "",
		departmentId: "",
		labId: "",
		hospitalId: "",
		branchId: "",
	};
	const dispatch = useDispatch<AppDispatch>();
	const { patients } = useSelector<RootState, RootState["patientsReducers"]>(
		(state) => state.patientsReducers
	);
	const { labs } = useSelector<RootState, RootState["labsReducers"]>(
		(state) => state.labsReducers
	);
	const { doctors, labTechnician } = useSelector<
		RootState,
		RootState["staffsReducers"]
	>((state) => state.staffsReducers);
	const { departments } = useSelector<
		RootState,
		RootState["departmentsReducers"]
	>((state) => state.departmentsReducers);
	const [state, setState] = useState<LaboratoryType>(initialState);

	const handleLabTechnician = async () => {
		const filter = {
			filter: {
				where: {
					type: "lab_technician",
				},
				include: [
					{
						relation: "department",
					},
				],
			},
		};
		await dispatch(getStaffsByType(filter));
	};
	const handleDoctorList = async () => {
		const filter = {
			filter: {
				where: {
					type: "doctor",
				},
				include: [
					{
						relation: "department",
					},
				],
			},
		};
		await dispatch(getStaffsByType(filter));
	};

	const fetchData = async () => {
		await dispatch(getPatients({ order: "createdBy DESC" }));
		await dispatch(fetchAllDepartments());
		await dispatch(fetchAllLabsByHospitalId(HOSPITAL_ID));
		handleLabTechnician();
		handleDoctorList();
	};

	useEffect(() => {
		fetchData();
	}, []);

	const listLaboratoryReport = async () => {
		const defaultIncludeQuery: any = {
			filter: {
				include: [
					{ relation: "patient" },
					{ relation: "department" },
					{ relation: "labTechnician" },
					{ relation: "headDoctor" },
				],
				where: {
					labId,
				},
			},
		};
		if (!labId) delete defaultIncludeQuery.filter.where.labId;
		await dispatch(getLaboratoryReport(defaultIncludeQuery.filter));
	};

	const handleSave = async () => {
		setVisible(!visible);
	};

	const { errors, touched, handleSubmit, handleBlur } = useFormik({
		initialValues: {
			patientId: state.patientId,
			labTechnicianId: state.labTechnicianId,
			testDateAndTime: state.testDateAndTime,
			illness: state.illness,
			headDoctorId: state.headDoctorId,
			departmentId: state.departmentId,
		},
		enableReinitialize: true,
		validationSchema: labReportSchema,
		onSubmit: () => {
			handleSave();
		},
	});

	useEffect(() => {
		if (selectedItem && isEditing) {
			setState({
				...selectedItem,
				testDateAndTime: new Date(selectedItem.testDateAndTime),
			});
		} else if (isReport && selectedItem) {
			setState((prev: any) => ({
				...prev,
				patientId: selectedItem.id,
			}));
		} else {
			setState(initialState);
		}
	}, [selectedItem]);

	const footerHelper = () => (
		<div className="buttons__container">
			<ButtonComponent
				type="outlined"
				label="Cancel"
				onClick={() => setVisible()}
			/>
			<ButtonComponent
				label="Save"
				onClick={() => handleSubmit()}
			/>
		</div>
	);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setState((prev) => ({ ...prev, [name]: value }));
	};
	const handleFileUpload = (files: any) => {
		setState((prev) => ({ ...prev, reportFileUrl: [...files.target.value] }));
	};
	const toggleModal = () => {
		setVisible((prev: any) => !prev);
	};
	return (
		<Dialog
			className="add__new__report__modal"
			visible={visible}
			onHide={toggleModal}
			header={isEditing ? "Edit Report" : "New Report"}
			footer={footerHelper}
			style={{ width }}
		>
			<div className="input__container">
				<div className="one__third">
					<FilterDropdown
						classNames="full__width"
						label="Patient"
						items={patients}
						name="patientId"
						optionLabel="name"
						optionValue="id"
						value={state.patientId}
						disabled={isReport || isEditing}
						required
						onBlur={handleBlur}
						handleChange={handleChange}
					/>
					{errors.patientId && touched.patientId && (
						<div className="formik_error">{errors.patientId}</div>
					)}
				</div>
				<div className="one__third">
					<FilterDropdown
						classNames="full__width"
						label="Report Type"
						items={labs}
						name="type"
						optionLabel="name"
						optionValue="id"
						handleChange={handleChange}
						value={state.type}
					/>
				</div>
				<div className="one__third">
					<FilterDropdown
						classNames="full__width"
						label="Lab Technician"
						items={labTechnician}
						name="labTechnicianId"
						optionLabel="name"
						optionValue="id"
						value={state.labTechnicianId}
						required
						onBlur={handleBlur}
						handleChange={handleChange}
					/>
					{errors.labTechnicianId && touched.labTechnicianId && (
						<div className="formik_error">{errors.labTechnicianId}</div>
					)}
				</div>
			</div>
			<div className="input__container">
				<div className="one__third">
					<FilterDropdown
						classNames="full__width"
						label="Medical Category"
						items={departments}
						name="departmentId"
						optionLabel="name"
						optionValue="id"
						value={state.departmentId}
						required
						onBlur={handleBlur}
						handleChange={handleChange}
					/>
					{touched.departmentId && errors.departmentId && (
						<div className="formik_error">{errors.departmentId}</div>
					)}
				</div>
				<div className="one__third">
					<DatePickerComponent
						label="Test Date & Time"
						showTime
						hourFormat="12"
						value={state.testDateAndTime}
						name="testDateAndTime"
						required
						onBlur={handleBlur}
						onChange={handleChange}
					/>
					{touched.testDateAndTime && errors.testDateAndTime && (
						<div className="formik_error">{errors.testDateAndTime}</div>
					)}
				</div>
				<div className="one__third">
					<FilterDropdown
						classNames="full__width"
						label="Head Doctor"
						items={doctors}
						name="headDoctorId"
						optionLabel="name"
						optionValue="id"
						value={state.headDoctorId}
						required
						onBlur={handleBlur}
						handleChange={handleChange}
					/>
					{touched.headDoctorId && errors.headDoctorId && (
						<div className="formik_error">{errors.headDoctorId}</div>
					)}
				</div>
			</div>
			<div className="input__container">
				<div className="one__third">
					<TextInputComponent
						classNames="full__width"
						label="Illness"
						value={state.illness}
						name="illness"
						required
						onBlur={handleBlur}
						onChange={handleChange}
					/>
					{touched.illness && errors.illness && (
						<div className="formik_error">{errors.illness}</div>
					)}
				</div>
				{/* <div className="flex__1">
          <TagInputComponent
            label="Other Doctors/Nurses "
            className="full__width"
          />
        </div> */}
			</div>
			<div className="input__container">
				<div className="flex__1">
					<FileUploadComponent
						multiple
						name="profilePicUrl"
						placeholder={state.reportFileUrl[0]}
						label="Upload file"
						subText="Report should be in PDF, Max 5 MB"
						onChange={(files) => handleFileUpload(files)}
					/>
				</div>
				<div className="one__third adjust__top">
					<FilterDropdown
						classNames="full__width"
						label="Status"
						name="status"
						value={state.status}
						items={STATUS}
						handleChange={handleChange}
					/>
				</div>
			</div>
			<div className="input__container">
				<TextAreaComponent
					cols={80}
					label="Notes"
					subText="Add Additional Notes"
					value={state.notes}
					name="notes"
					onChange={handleChange}
				/>
			</div>
		</Dialog>
	);
}

export default AddNewReport;
