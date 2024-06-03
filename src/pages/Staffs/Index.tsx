import { Route, Routes } from "react-router-dom";
import OverviewPage from "../../Components/OverviewPage/Overviewpage";
import StaffAppointments from "../../module/Staffs/StaffProfilePage/StaffAppointments/staffAppointments";
import Reviews from "../../module/Staffs/StaffProfilePage/Reviews/Index";
import StaffProfilePage from "../../module/Staffs/StaffProfilePage/staffprofilepage";
import ProtectedLayout from "../../uikit/MainComponent/ProtectedLayout";
import StaffsTable from "../../module/Staffs/StaffsTable";
import { STAFFS_TABS } from "../../constants";
import StaffReportsTable from "../../module/Staffs/StaffProfilePage/StaffReports";
import StaffsGeneralInfo from "../../module/Staffs/StaffGeneralInfo";

function Staffs() {
  return (
    <Routes>
      <Route element={<ProtectedLayout />}>
        <Route
          path="/staffs/:type"
          element={<StaffsTable TabOptions={STAFFS_TABS} />}
        />
        <Route path="/staffs/:type/:id" element={<StaffProfilePage />}>
          <Route index element={<OverviewPage />} />
          <Route path="appointments" element={<StaffAppointments />} />
          <Route
            path="diagnosis"
          />
          <Route path="reports" element={<StaffReportsTable />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="generalinfo" element={<StaffsGeneralInfo />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default Staffs;
