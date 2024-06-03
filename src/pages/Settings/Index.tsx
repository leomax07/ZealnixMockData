import { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import BranchesIndexComponent from "../../module/SettingsModule/Branches/Index";
import GeneralSettings from "../../module/SettingsModule/GeneralSettings/GeneralSettings";
import DepartmentsPage from "../../module/SettingsModule/Masters/Departments/Index";
import DesignationsPage from "../../module/SettingsModule/Masters/Designation/Index";
import MastersLayout from "../../module/SettingsModule/Masters/Index";
import LabMasters from "../../module/SettingsModule/Masters/Labs/Index";
import OtherMasters from "../../module/SettingsModule/Masters/Others/Index";
import ProtectedLayout from "../../uikit/MainComponent/ProtectedLayout";

export default function SettingsIndexPage(): ReactElement {
  return (
    <div>
      <Routes>
        <Route element={<ProtectedLayout />}>
          <Route path="/settings" element={<GeneralSettings />} />
          <Route
            path="/settings/branches"
            element={<BranchesIndexComponent />}
          />
          <Route path="/settings/masters/*" element={<MastersLayout />}>
            <Route element={<DesignationsPage />} path="designations" />
            <Route element={<DepartmentsPage />} path="departments" />
            <Route element={<LabMasters />} path="labs" />
            <Route element={<OtherMasters />} path="others" />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
