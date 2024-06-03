import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import ButtonComponent from "../../../Components/Buttons/Index";
import DatePickerComponent from "../../../Components/DatePicker/Index";
import FileUploadComponent from "../../../Components/FileUplodComponent/Index";
import FilterDropdown from "../../../Components/FilterDropdown/Index";
import RadioButtonComponent from "../../../Components/RadioButton/Index";
import TextAreaComponent from "../../../Components/TextAreaComponent/Index";
import TextInputComponent from "../../../Components/TextInput/Index";
import { setPatient } from "../store/patientsReducer";
import { AppDispatch } from "../../../redux/store";
import {
  genderOptions,
  marraigeStatusOptions,
  indianStates,
  countries,
  relationShip,
  bloodOptions,
} from "../../../constants";
import { patientSchema } from "../../../utils/validationSchema";

type PatientInformationType = {
  setIndex: (args: any) => void;
  edit?: boolean;
  editPatient: any;
};
function PatientInformation({
  setIndex,
  edit,
  editPatient,
}: PatientInformationType) {
  const dispatch = useDispatch<AppDispatch>();
  const initialState = {
    name: "",
    gender: "",
    dateOfBirth: "",
    email: "",
    weightInKg: "",
    heightInCm: "",
    bloodGroup: "",
    phone: "",
    maritalStatus: "",
    address: "",
    pinCode: "",
    city: "",
    state: "",
    country: "",
    profilePicUrl: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelationship: "",
    takingMedicationsCurrently: false,
    currentMedicationsDescription: "",
  };
  const [patientDetails, setPatientDetails] = useState(initialState);

  const { errors, touched, handleSubmit, handleBlur } = useFormik({
    initialValues: {
      name: patientDetails.name,
      email: patientDetails.email,
      gender: patientDetails.gender,
      phone: patientDetails.phone,
      address: patientDetails.address,
      emergencyContactPhone: patientDetails.emergencyContactPhone,
      dateOfBirth: patientDetails.dateOfBirth,
      bloodGroup: patientDetails.bloodGroup,
    },
    enableReinitialize: true,
    validationSchema: patientSchema,
    onSubmit: () => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      handlePatientDetails();
    },
  });

  useEffect(() => {
    if (editPatient && edit) {
      setPatientDetails({
        ...editPatient,
        dateOfBirth: new Date(editPatient.dateOfBirth),
      }); // for prefilling the edit patient
    } else {
      setPatientDetails(initialState);
    }
  }, [editPatient]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const fieldValue: string | number =
      // eslint-disable-next-line radix
      name === "weightInKg" || name === "heightInCm" ? parseInt(value) : value;
    setPatientDetails((prev) => ({ ...prev, [name]: fieldValue }));
  };

  const savePatientDetails = () => {
    dispatch(setPatient(patientDetails));
  };
  const handleRadioButton = (e: string) => {
    setPatientDetails((prev: any) => ({
      ...prev,
      takingMedicationsCurrently: e === "yes",
    }));
  };
  const handlePatientDetails = () => {
    if (!Object.keys(errors).length) {
      // savePatientDetails();
      setIndex(2); // move to next page
    }
  };
  const handleFileUpload = async (files: any) => {
    setPatientDetails((prev) => ({
      ...prev,
      profilePicUrl: files.target.value[0],
    }));
  };
  return (
    <div className="patient__info__form">
      <div className="profile__picture">
        <FileUploadComponent
          name="profilePicUrl"
          placeholder={patientDetails.profilePicUrl}
          label="Profile Picture"
          subText="Upload a Profile Pic * Max 5 MB"
          onChange={(files) => handleFileUpload(files)}
        />
      </div>
      <div className="flex__input__container">
        <div className="small__input">
          <TextInputComponent
            label="Patient Name"
            name="name"
            required
            value={patientDetails.name}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {touched.name && errors.name && (
            <div className="formik_error">{errors.name}</div>
          )}
        </div>
        <div className="small__input">
          <FilterDropdown
            label="Gender"
            name="gender"
            required
            onBlur={handleBlur}
            value={patientDetails.gender}
            classNames="full__width"
            items={genderOptions}
            handleChange={handleChange}
          />
          {touched.gender && errors.gender && (
            <div className="formik_error">{errors.gender}</div>
          )}
        </div>
        <div className="small__input">
          <DatePickerComponent
            label="Date Of Birth"
            name="dateOfBirth"
            required
            value={patientDetails.dateOfBirth}
            onChange={handleChange}
          />
          {touched.dateOfBirth && errors.dateOfBirth && (
            <div className="formik_error">{errors.dateOfBirth}</div>
          )}
        </div>
        <div className="small__input">
          <FilterDropdown
            label="Blood Group"
            name="bloodGroup"
            required
            onBlur={handleBlur}
            value={patientDetails.bloodGroup}
            classNames="full__width"
            items={bloodOptions}
            handleChange={handleChange}
          />
          {touched.bloodGroup && errors.bloodGroup && (
            <div className="formik_error">
              {touched.bloodGroup && errors.bloodGroup}
            </div>
          )}
        </div>
        <div className="small__input">
          <TextInputComponent
            label="Patient E-mail"
            type="email"
            name="email"
            required
            onBlur={handleBlur}
            value={patientDetails.email}
            onChange={handleChange}
          />
          {touched.email && errors.email && (
            <div className="formik_error">{errors.email}</div>
          )}
        </div>
        <div className="small__input">
          <TextInputComponent
            type="number"
            label="Patient Weight (Kg)"
            name="weightInKg"
            value={patientDetails.weightInKg}
            onChange={handleChange}
          />
        </div>
        <div className="extra__small__input">
          <TextInputComponent
            type="number"
            label="Patient Height (cm)"
            name="heightInCm"
            value={patientDetails.heightInCm}
            onChange={handleChange}
          />
        </div>
        <div className="small__input">
          <TextInputComponent
            label="Phone"
            type="phone"
            name="phone"
            required
            onBlur={handleBlur}
            value={patientDetails.phone}
            onChange={handleChange}
          />
          {touched.phone && errors.phone && (
            <div className="formik_error">{errors.phone}</div>
          )}
        </div>
        <div className="small__input">
          <TextInputComponent label="Alternate Number" type="phone" />
        </div>
      </div>
      <div className="address__and__status">
        <div className="small__input">
          <FilterDropdown
            label="Marital Status"
            classNames="full__width"
            name="maritalStatus"
            value={patientDetails.maritalStatus}
            items={marraigeStatusOptions}
            handleChange={handleChange}
          />
        </div>
        <div className="flex__grow__input__container">
          <TextInputComponent
            label="Address"
            name="address"
            required
            onBlur={handleBlur}
            value={patientDetails.address}
            onChange={handleChange}
          />
          {touched.address && errors.address && (
            <div className="formik_error">{errors.address}</div>
          )}
        </div>
      </div>
      <div className="flex__input__container city__state">
        <div className="small__input">
          <TextInputComponent
            label="PinCode"
            name="pinCode"
            value={patientDetails.pinCode}
            onChange={handleChange}
          />
        </div>
        <div className="small__input">
          <TextInputComponent
            label="City"
            name="city"
            value={patientDetails.city}
            onChange={handleChange}
          />
        </div>
        <div className="small__input">
          <FilterDropdown
            label="State"
            classNames="full__width"
            name="state"
            value={patientDetails.state}
            items={indianStates}
            handleChange={handleChange}
          />
        </div>
        <div className="small__input">
          <FilterDropdown
            label="Country"
            classNames="full__width"
            name="country"
            value={patientDetails.country}
            items={countries}
            handleChange={handleChange}
          />
        </div>
      </div>
      <hr className="seperator" />
      <div className="flex__input__container emergency__contact">
        <div className="small__input">
          <TextInputComponent
            label="Emergency Contact Person"
            name="emergencyContactName"
            value={patientDetails.emergencyContactName}
            onChange={handleChange}
          />
        </div>
        <div className="extra__small__input">
          <TextInputComponent label="Age" type="number" />
        </div>
        <div className="small__input">
          <TextInputComponent
            type="number"
            label="Contact Number"
            classNames="full__width"
            name="emergencyContactPhone"
            required
            onBlur={handleBlur}
            value={patientDetails.emergencyContactPhone}
            onChange={handleChange}
          />
          {touched.emergencyContactPhone && errors.emergencyContactPhone && (
            <div className="formik_error">{errors.emergencyContactPhone}</div>
          )}
        </div>
        <div className="small__input">
          <FilterDropdown
            label="Relationship"
            classNames="full__width"
            name="emergencyContactRelationship"
            value={patientDetails.emergencyContactRelationship}
            items={relationShip}
            handleChange={handleChange}
          />
        </div>
      </div>
      <hr className="seperator" />
      <div className="taking__medication">
        <p className="text">Taking any Medications, currently?</p>
        <div className="checkbox__container">
          <RadioButtonComponent
            label="Yes"
            value="yes"
            setValue={handleRadioButton}
            name="takingMedication"
            checked={patientDetails.takingMedicationsCurrently}
          />
        </div>

        <div className="checkbox__container">
          <RadioButtonComponent
            label="No"
            value="no"
            setValue={handleRadioButton}
            name="takingMedication"
            checked={!patientDetails.takingMedicationsCurrently}
          />
        </div>
      </div>
      <div className="current__medication">
        <p className="title">If yes, Please mention the medications</p>
        <div className="flex__1">
          <TextAreaComponent
            inputClassName="full__width"
            name="currentMedicationsDescription"
            value={patientDetails.currentMedicationsDescription}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="buttons__container">
        <ButtonComponent label="Cancel" type="outlined" />
        <ButtonComponent label="Next" onClick={() => handleSubmit()} />
      </div>
    </div>
  );
}

export default PatientInformation;
