import { Route, Routes } from "react-router-dom";
import AddNewPatientsIndex from "../../module/Patients/AddNew/Index";
import AllPatients from "../../module/Patients/AllPatients/Index";
import AddmissionsTable from "../../module/Patients/PatientsDetails/Components/AddmissionsTable";
import AppointmentsTable from "../../module/Patients/PatientsDetails/Components/AppointmentsTable";
import ChecklistsTable from "../../module/Patients/PatientsDetails/Components/ChecklistsTable";
import MedicalHistoryTable from "../../module/Patients/PatientsDetails/Components/MedicalHistoryTable";
import ReportsTable from "../../module/Patients/PatientsDetails/Components/ReportsTable";
import PatientsDetailsScreen from "../../module/Patients/PatientsDetails/Index";
import PatientsScreen from "../../module/Patients/PatientsScreen";
import ProtectedLayout from "../../uikit/MainComponent/ProtectedLayout";
import VitalsListTable from "../../module/Patients/PatientsDetails/Components/VitalsListTable";

function PatientsIndex() {
  return (
    <div>
      <Routes>
        <Route element={<ProtectedLayout />}>
          <Route path="/patients" element={<PatientsScreen />}>
            <Route path="all" element={<AllPatients />} />
          </Route>
          <Route path="/patients/add" element={<AddNewPatientsIndex />} />
          <Route path="/patients/edit" element={<AddNewPatientsIndex edit />} />
          <Route
            path="/patients/detail/:id"
            element={<PatientsDetailsScreen />}
          >
            <Route path="appointments" element={<AppointmentsTable />} />
            <Route path="admissions" element={<AddmissionsTable />} />
            <Route path="reports" element={<ReportsTable />} />
            <Route path="checklists" element={<ChecklistsTable />} />
            <Route path="vitals" element={<VitalsListTable />} />
            <Route path="medicalhistory" element={<MedicalHistoryTable />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default PatientsIndex;
