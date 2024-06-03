/* eslint-disable no-nested-ternary */
import { unwrapResult } from "@reduxjs/toolkit";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LineChart from "../../../../Components/Chart/LineChart";
import TabComponent from "../../../../Components/Tab/tab";
import { AppDispatch, RootState } from "../../../../redux/store";
import { formatAppointmentStatsGraphData } from "../../../../utils/graphFunctions";
import {
  getAppointmentCountByDateRange,
  getAppointmentGrapsByTypeAndDateRange,
} from "../../store/dashboardscreenMiddleware";

function RowTwoLine() {
  const [selectedTab, setSelectedTab] = useState(1);
  const [appointmentCount, setAppointmentCount] = useState({
    currentWeekAppointmentCount: 0,
    lastWeekAppointmentCount: 0,
  });
  const dispatch = useDispatch<AppDispatch>();
  const { appointmentStatisticsGraph } = useSelector<
    RootState,
    RootState["dashboardReducers"]
  >((state) => state.dashboardReducers);
  const [appointmentSheduleData, setAppointmentScheduleData] = useState({
    data: {},
    options: {},
  });
  const startOf: moment.unitOfTime.StartOf[] = ["week", "month", "year"];

  const fetchData = async () => {
    const payload = {
      startDate: moment().startOf(startOf[selectedTab]).toISOString(),
      endDate: moment().endOf(startOf[selectedTab]).toISOString(),
    };

    await dispatch(getAppointmentGrapsByTypeAndDateRange(payload));
  };

  // fetch appointments count
  const fetchAppointmentCount = async () => {
    const currentWeek = {
      startDate: moment().startOf(startOf[selectedTab]).toISOString(),
      endDate: moment().endOf(startOf[selectedTab]).toISOString(),
    };
    const currentWeekAppointmentCount = await dispatch(
      getAppointmentCountByDateRange(currentWeek)
    );
    const reducedWeek = { days: -7 };
    const reducedMonth = { months: -1 };
    const reducedYear = { years: -1 };
    const lastWeek = {
      startDate: moment()
        .startOf(startOf[selectedTab])
        .add(
          selectedTab === 0
            ? reducedWeek
            : selectedTab === 1
            ? reducedMonth
            : reducedYear
        )
        .toISOString(),
      endDate: moment()
        .endOf(startOf[selectedTab])
        .add(
          selectedTab === 0
            ? reducedWeek
            : selectedTab === 1
            ? reducedMonth
            : reducedYear
        )
        .toISOString(),
    };
    const lastWeekAppointmentCount = await dispatch(
      getAppointmentCountByDateRange(lastWeek)
    );

    setAppointmentCount({
      currentWeekAppointmentCount: unwrapResult(currentWeekAppointmentCount)
        .count,
      lastWeekAppointmentCount: unwrapResult(lastWeekAppointmentCount).count,
    });
  };

  // to get the diff percentage
  const getDiffPercentage = () =>
    (appointmentCount.currentWeekAppointmentCount &&
      appointmentCount.lastWeekAppointmentCount) === 100
      ? 0
      : Math.round(
          100 *
            ((appointmentCount.currentWeekAppointmentCount -
              appointmentCount.lastWeekAppointmentCount) /
              (appointmentCount.currentWeekAppointmentCount +
                appointmentCount.lastWeekAppointmentCount / 2))
        );

  useEffect(() => {
    fetchData();
    fetchAppointmentCount();
  }, [selectedTab]);

  useEffect(() => {
    setAppointmentScheduleData({ data: {}, options: {} });
    if (!appointmentStatisticsGraph.description) return;
    setAppointmentScheduleData(
      formatAppointmentStatsGraphData(appointmentStatisticsGraph, selectedTab)
    );
  }, [appointmentStatisticsGraph]);

  const tabOptions = [
    { label: "Week", index: 0, to: "" },
    { label: "Month", index: 1, to: "" },
    { label: "Year", index: 2, to: "" },
  ];
  return (
    <div className="dashboard__row__2__line card">
      <div className="top__part">
        <div className="left">
          <div className="left__left">
            <p className="title">Wards</p>
            <div className="stats">
              <p className="numbers ">
                {appointmentCount.currentWeekAppointmentCount}
              </p>
              <div
                className={`status ${
                  getDiffPercentage() > 0 ? "greenBg" : "redBg"
                }`}
              >
                {getDiffPercentage() >= 0
                  ? `+ ${getDiffPercentage()}%`
                  : `${getDiffPercentage()}%`}
              </div>
            </div>
          </div>
          <div className="left__right">
            <div className="legend">
              <div className="slot__icon regular__icon" />
              General
            </div>
            <div className="legend">
              <div className="slot__icon emergency__icon" />
              Emergency
            </div>
            <div className="legend">
              <div className="slot__icon video__icon" />
              ICU
            </div>
          </div>
        </div>
        <div className="right">
          <TabComponent
            taboptions={tabOptions}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        </div>
      </div>
      <LineChart
        className="line__chart"
        data={appointmentSheduleData.data}
        options={appointmentSheduleData.options}
      />
    </div>
  );
}

export default RowTwoLine;
