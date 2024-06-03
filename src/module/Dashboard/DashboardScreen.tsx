import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import moment from "moment";
import RowTwoBar from "./Components/RowTwoBar/RowTwoBar";
import RowTwoLine from "./Components/RowTwoLine/RowTwoLine";
import Stats from "./Components/Stats/Stats";
import LatestPatientsTable from "./Components/LatestPatientTable/LatestPatientsTable";
import PatientInVsOut from "./Components/PatientInVsOut/PatientInVsOut";
import PatientGenderStatistics from "./Components/PatientGenderStatistics/index";
import { AppDispatch } from "../../redux/store";
import {
  getAppointmentCountByDateRange,
  getPatientsCountByDateRange,
} from "./store/dashboardscreenMiddleware";

function DashboardScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const [state, setState] = useState({
    currentWeekAppointmentCount: 0,
    lastWeekAppointmentCount: 0,
    currentWeekPatientCount: 0,
    lastWeekPatientCount: 0,
  });
  console.log(state);

  const fetchAppointmentCount = async () => {
    const currentWeek = {
      startDate: moment().startOf("week").toISOString(),
      endDate: moment().endOf("week").toISOString(),
    };
    const currentWeekAppointmentCount = await dispatch(
      getAppointmentCountByDateRange(currentWeek)
    );

    const currentWeekPatientCount = await dispatch(
      getPatientsCountByDateRange(currentWeek)
    );

    const lastWeek = {
      startDate: moment().startOf("week").add({ days: -7 }).toISOString(),
      endDate: moment().endOf("week").add({ days: -7 }).toISOString(),
    };
    const lastWeekAppointmentCount = await dispatch(
      getAppointmentCountByDateRange(lastWeek)
    );

    const lastWeekPatientCount = await dispatch(
      getPatientsCountByDateRange(lastWeek)
    );

    setState({
      currentWeekAppointmentCount: unwrapResult(currentWeekAppointmentCount)
        .count,
      lastWeekAppointmentCount: unwrapResult(lastWeekAppointmentCount).count,
      currentWeekPatientCount: unwrapResult(currentWeekPatientCount).count,
      lastWeekPatientCount: unwrapResult(lastWeekPatientCount).count,
    });
  };

  useEffect(() => {
    fetchAppointmentCount();
  }, []);

  return (
    <div className="dashbord__container">
      <div className="top__container card">
        <Stats
          currentWeekCount={300}
          lastWeekCount={200}
          title="Patients"
        />
        <div className="v_s" />
        <Stats currentWeekCount={150} lastWeekCount={100} title="Nurse" />
        <div className="v_s" />

        <Stats currentWeekCount={30} lastWeekCount={30} title="Wards" />
        <div className="v_s" />
        <Stats
          currentWeekCount={300}
          lastWeekCount={250}
          title="Bed Occupancy"
        />
      </div>
      <br />
      <div className="dashboard__row__2__container">
        <RowTwoLine />
        {/* <RowTwoBar /> */}
        <PatientInVsOut />
      </div>
      <br />
      <div className="dashboard__row__3__container">
        <div className="left">
          <LatestPatientsTable />
        </div>
        <div className="right" />
      </div>
      <br />
      <div className="dashboard__row__4__container">
        <div className="left">
          <PatientInVsOut />
        </div>
        <div className="right">
          <PatientGenderStatistics />
        </div>
      </div>
    </div>
  );
}

export default DashboardScreen;
