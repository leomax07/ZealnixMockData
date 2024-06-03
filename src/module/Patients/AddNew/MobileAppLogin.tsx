import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RadioButtonComponent from "../../../Components/RadioButton/Index";
import TextInputComponent from "../../../Components/TextInput/Index";
import ButtonComponent from "../../../Components/Buttons/Index";
import {
	BRANCH_ID,
	HOSPITAL_ID,
	OUT_PATIENT_STATUS,
	SORT_BY_CREATEDAT_DESC,
	SUPER_ADMIN,
} from "../../../constants";
import {
	createNewPatient,
	getPatients,
	updatePatient,
} from "../store/patientMiddleware";
import { AppDispatch, RootState } from "../../../redux/store";
import {
	generateRandomPassword,
	removeEmptyObject,
} from "../../../utils/reusableFunctions";

interface MobileAppLoginType {
	isMobileAppLoginEnabled: boolean;
	password: string;
}
interface Props {
	edit?: boolean;
	editPatient: any;
}

export default function MobileAppLogin({ edit = false, editPatient }: Props) {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const { initialPatient } = useSelector<
		RootState,
		RootState["patientsReducers"]
	>((state) => state.patientsReducers);
	const [mobileLoginDetails, setMobileLoginDetails] =
		useState<MobileAppLoginType>({
			isMobileAppLoginEnabled: true,
			password: "",
		});
	useEffect(() => {
		if (edit) {
			const { isMobileAppLoginEnabled, password } = editPatient;
			setMobileLoginDetails({
				isMobileAppLoginEnabled,
				password,
			});
		}
	}, [editPatient]);

	const handleRadioButton = (e: string) => {
		setMobileLoginDetails((prev: MobileAppLoginType) => ({
			...prev,
			isMobileAppLoginEnabled: e === "yes",
		}));
	};

	const handlePassword = () => {
		setMobileLoginDetails((prev) => ({
			...prev,
			password: generateRandomPassword(),
		}));
	};

	const handleSubmit = () => {
		try {
			const payload: any = {
				...initialPatient,
				...mobileLoginDetails,
				status: OUT_PATIENT_STATUS,
				hospitalId: HOSPITAL_ID,
				branchId: BRANCH_ID,
				createdBy: SUPER_ADMIN,
				id: editPatient.id,
			};
			const updatedPayload = removeEmptyObject(payload);
			navigate("/patients/all");

		} catch (err: any) {
			console.log(err.message);
			navigate("/patients/all");

		}
	};

	return (
		<div className="mobile_app_login__form">
			<div className="enable__mobile">
				<p className="text">
					Enable Mobile App Login <span className="formik_error">*</span>
				</p>
				<div className="checkbox__container">
					<RadioButtonComponent
						label="Yes"
						value="yes"
						name="takingMedication"
						setValue={handleRadioButton}
						checked={mobileLoginDetails.isMobileAppLoginEnabled}
						required
					/>
				</div>
				<div className="checkbox__container">
					<RadioButtonComponent
						label="No"
						value="no"
						setValue={handleRadioButton}
						name="takingMedication"
						checked={!mobileLoginDetails.isMobileAppLoginEnabled}
						disabled
					/>
				</div>
			</div>
			<div className="enable__mobile">
				<div className="small__input">
					<p className="text">Generate Password</p>
					<p className="text min_text">Generate a password for mobile login</p>

					<TextInputComponent
						name="password"
						value={mobileLoginDetails.password}
						disabled
					/>
				</div>
				<div className="buttons__align">
					<ButtonComponent
						label="Generate"
						type="outlined"
						onClick={handlePassword}
					/>
				</div>
			</div>
			<div className="buttons__container">
				<ButtonComponent
					label="Cancel"
					type="outlined"
				/>
				<ButtonComponent
					label="Save"
					onClick={handleSubmit}
				/>
			</div>
		</div>
	);
}
