import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ArrowLeft from "../../../assets/ArrowLeft";
import ButtonComponent from "../../../Components/Buttons/Index";
import { CategoryTemplateHelper } from "../../../Components/DataTableTemplates/Index";
import { PATIENT_DETAIL } from "../../../constants";
import BloodPressure from "../../../assets/BloodPressure";
import BloodSugarIcon from "../../../assets/BloodSugarIcon";
import TabComponent from "../../../Components/Tab/tab";
import { AppDispatch, RootState } from "../../../redux/store";
import { getPatientDetailById } from "../store/patientMiddleware";
import { calculateAgeFromDate } from "../../../utils/reusableFunctions";

function PatientsDetailsScreen() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const patientDetail = PATIENT_DETAIL;
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { patient }: any = useSelector<
    RootState,
    RootState["patientsReducers"]
  >((state) => state.patientsReducers);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPatientDetailById(id || ""));
  }, [id]);

  const goBack = () => {
    navigate(-1);
  };

  const tabOptions = [
    {
      label: "Appointments",
      index: 0,
      to: "appointments",
    },
    // {
    // 	label: "Admissions",
    // 	index: 1,
    // 	to: "admissions",
    // },
    {
      label: "Reports",
      index: 2,
      to: "reports",
    },
    // {
    // 	label: "Checklists",
    // 	index: 3,
    // 	to: "checklists",
    // },
    {
      label: "Vitals",
      index: 4,
      to: "vitals",
    },
    // {
    // 	label: "Medical History",
    // 	index: 5,
    // 	to: "medicalHistory",
    // },
  ];
  return (
    <div className="page__container patient__details__screen__container">
      <div className="patient__details__header__component">
        <div className="left half" onClick={goBack}>
          <ArrowLeft />
          <p>Patient Profile</p>
        </div>
        <div className="right half">
          <ButtonComponent label="More actions" />
        </div>
      </div>
      <div className="patients__details__body__container">
        <div className="left">
          <div className="top">
            <div className="patient__details">
              <div className="patient__image__container">
                <img
                  src={patientDetail?.profilePic}
                  alt="profilePic"
                  className="patient__image"
                />
              </div>
              <div className="name__and__other__details">
                <div className="name">{patient?.name}</div>
                <div className="age__and__sex">
                  {`${
                    calculateAgeFromDate(patient?.dateOfBirth) || "NA"
                  } Yrs, ${patient?.gender}`}
                </div>
                <div className="blood__and__type">
                  <div>
                    {CategoryTemplateHelper(patient?.status || "NOT FOUND")}
                  </div>
                  <div>
                    {CategoryTemplateHelper(patient.bloodGroup || "NOT FOUND")}
                  </div>
                </div>
              </div>
            </div>
            <div className="patient__vitals">
              <div className="blood__pressure each__vital">
                <BloodPressure />
                <div className="title__and__data">
                  <div className="label">Blood Pressure</div>
                  <div className="value">{patient.bloodPressure}</div>
                </div>
              </div>
              <div className="blood__pressure each__vital">
                <BloodSugarIcon />
                <div className="title__and__data">
                  <div className="label">Blood Sugar</div>
                  <div className="value">{patient.bloodSugar}</div>
                </div>
              </div>
              <div className="blood__pressure each__vital">
                <div className="title__and__data">
                  <div className="label">Latest department</div>
                  <div className="value with__icon">{patient.department}</div>
                </div>
              </div>
              <div className="blood__pressure each__vital">
                <div className="title__and__data">
                  <div className="label with__icon">Last visited</div>
                  <div className="value">{patient.bloodPressure}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="bottom">
            <div className="text__center header">Basic Details</div>
            <p className="label">Contact Email</p>
            <p className="value">bala+{patient?.name}@zealeye.com</p>
            <br />
            <p className="label">Contact Number</p>
            <p className="value">{patient.phone}</p>
            <br />
            <div className="two__details">
              <div className="half">
                <div className="label">Weight (kg)</div>
                <p className="value">{patient.weightInKg} kgs</p>
              </div>
              <div className="half">
                <div className="label">Height (cm)</div>
                <p className="value">{patient.heightInCm} cms</p>
              </div>
            </div>
            <br />
            <p className="label">Marital Status</p>
            <p className="value">{patient.maritalStatus}</p>
            <br />
            <p className="label">Address</p>
            <p className="value">{patient.address}</p>
            <br />
            <p className="label">Previous Medication</p>
            {patient.illnessHistory && (
              <p className="value">{patient.illnessHistory.join(", ")}</p>
            )}
            <br />
            <p className="sub__text">Emergency Contact</p>
            <div className="two__details">
              <div className="half">
                <div className="label">Contact Name</div>
                <p className="value">{patient.emergencyContactName}</p>
              </div>
              <div className="half">
                <div className="label">Contact Number</div>
                <p className="value">{patient.emergencyContactPhone}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="tab__container">
            <TabComponent
              taboptions={tabOptions}
              selectedTab={selectedIndex}
              setSelectedTab={setSelectedIndex}
            />
          </div>
          <div className="data__container">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientsDetailsScreen;
