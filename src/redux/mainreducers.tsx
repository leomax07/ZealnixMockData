import dashboardReducers from "../module/Dashboard/store/dashboardscreenReducer";
import { designationReducers } from "../module/SettingsModule/Masters/Designation/store/designationReducer";
import departmentsReducers from "../module/SettingsModule/Masters/Departments/store/departmentReducer";
import branchesReducers from "../module/SettingsModule/Branches/store/branchesReducer";
import labsReducers from "../module/SettingsModule/Masters/Labs/store/labsReducer";
import generalSettingsReducers from "../module/SettingsModule/GeneralSettings/store/generalSettingsReducers";
import patientsReducers from "../module/Patients/store/patientsReducer";
import staffsReducers from "../module/Staffs/store/staffsReducer";
import appointmentReducers from "../module/Appointments/store/appointmentReducer";
import authReducers from "../module/Login/store/loginReducers";
import laboratoryReducer from "../module/Laboratory/store/laboratoryReducer";
import scratchpadReducer from "../module/ScratchPad/store/scratchpadReducer";
import slotsReducers from "../module/SettingsModule/GeneralSettings/Slots/store/slotsReducers";
import assetReducer from "../module/AssetsModule/store/assetReducer";
import toastReducer from "./ToastStore/toastReducer";
import pharmacyReducer from "../module/Pharmacy/Store/pharmacyReducer";

const reducers = {
  dashboardReducers,
  designationReducers,
  departmentsReducers,
  branchesReducers,
  labsReducers,
  generalSettingsReducers,
  patientsReducers,
  staffsReducers,
  appointmentReducers,
  authReducers,
  laboratoryReducer,
  scratchpadReducer,
  slotsReducers,
  assetReducer,
  toastReducer,
  pharmacyReducer,
};
export default reducers;
