/* eslint-disable no-nested-ternary */
import { unwrapResult } from "@reduxjs/toolkit";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BarChart from "../../../../Components/Chart/BarChart";
import { Paintents } from "../../mock";
import FilterDropdown from "../../../../Components/FilterDropdown/Index";
import { AppDispatch, RootState } from "../../../../redux/store";
import { formatPatientBarChartData } from "../../../../utils/graphFunctions";
import {
  getPatientBarChartData,
  getPatientsCountByDateRange,
} from "../../store/dashboardscreenMiddleware";

function RowTwoBar() {
  const [selected, setSelected] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const [patientCount, setPatientCount] = useState({
    currentWeekPatient: 0,
    lastWeekPatient: 0,
  });
  const { patientsBarChartData } = useSelector<
    RootState,
    RootState["dashboardReducers"]
  >((state) => state.dashboardReducers);
  const [patientData, setpatientData] = useState({
    data: {},
    options: {},
  });

  const dropdownOptions = [
    { label: "Week", value: 0 },
    { label: "Month", value: 1 },
    { label: "Year", value: 2 },
  ];
  const startOf: moment.unitOfTime.StartOf[] = ["week", "month", "year"];

  // fetch appointments count
  const fetchPatientCount = async () => {
    const currentWeek = {
      startDate: moment().startOf(startOf[selected]).toISOString(),
      endDate: moment().endOf(startOf[selected]).toISOString(),
    };
    const currentWeekPatient = await dispatch(
      getPatientsCountByDateRange(currentWeek)
    );
    const reducedWeek = { days: -7 };
    const reducedMonth = { months: -1 };
    const reducedYear = { years: -1 };
    const lastWeek = {
      startDate: moment()
        .startOf(startOf[selected])
        .add(
          selected === 0
            ? reducedWeek
            : selected === 1
            ? reducedMonth
            : reducedYear
        )
        .toISOString(),
      endDate: moment()
        .endOf(startOf[selected])
        .add(
          selected === 0
            ? reducedWeek
            : selected === 1
            ? reducedMonth
            : reducedYear
        )
        .toISOString(),
    };
    const lastWeekPatient = await dispatch(
      getPatientsCountByDateRange(lastWeek)
    );

    setPatientCount({
      currentWeekPatient: unwrapResult(currentWeekPatient).count,
      lastWeekPatient: unwrapResult(lastWeekPatient).count,
    });
  };

  const fetchData = async () => {
    const payload = {
      startDate: moment().startOf(startOf[selected]).toISOString(),
      endDate: moment().endOf(startOf[selected]).toISOString(),
    };

    await dispatch(getPatientBarChartData(payload));
  };

  useEffect(() => {
    fetchData();
    fetchPatientCount();
  }, [selected]);

  useEffect(() => {
    setpatientData({ data: {}, options: {} });
    if (!patientsBarChartData.results) return;
    setpatientData(formatPatientBarChartData(patientsBarChartData, selected));
  }, [patientsBarChartData]);

  const handleDropdownSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(Number(e.target.value));
  };

  // to get the diff percentage
  const getDiffPercentage = () =>
    (patientCount.currentWeekPatient && patientCount.lastWeekPatient) === 100
      ? 0
      : Math.round(
          100 *
            ((patientCount.currentWeekPatient - patientCount.lastWeekPatient) /
              (patientCount.currentWeekPatient +
                patientCount.lastWeekPatient / 2))
        );

  return (
    <div className="dashboard__row__2__bar card">
      <div className="top__part">
        <div className="left">
          <p className="title">Patients</p>
          <div className="stats">
            <p className="numbers">{patientCount.currentWeekPatient}</p>
            <div
              className={`status ${
                getDiffPercentage() >= 0 ? "greenBg" : "redBg"
              }`}
            >
              {getDiffPercentage() >= 0
                ? `+ ${getDiffPercentage()}%`
                : `${getDiffPercentage()}%`}
            </div>
          </div>
        </div>
        <div className="right">
          <FilterDropdown
            items={dropdownOptions}
            optionLabel="label"
            optionValue="value"
            value={selected}
            handleChange={handleDropdownSelection}
          />
        </div>
      </div>
      <BarChart chartData={Paintents} />
    </div>
  );
}

export default RowTwoBar;
