import { Route, Routes } from "react-router-dom";
import ProtectedLayout from "../../uikit/MainComponent/ProtectedLayout";
import AppointmentScreen from "../../module/Appointments/AppointmentScreen";
import AllAppointmentsTable from "../../module/Appointments/AllAppointments/Index";
import AppointmentsCalendar from "../../module/Appointments/AppointmentsCalendar/AppointmentCalendar";

function Appointments() {
  return (
    <Routes>
      <Route element={<ProtectedLayout />}>
        <Route path="/appointments/" element={<AppointmentScreen />}>
          <Route path="all_appointments" element={<AllAppointmentsTable />} />
          <Route
            path="appointments_calendar"
            element={<AppointmentsCalendar />}
          />
        </Route>
        <Route path="/appointments/:type/*" element={<AppointmentScreen />} />
      </Route>
    </Routes>
  );
}

export default Appointments;
