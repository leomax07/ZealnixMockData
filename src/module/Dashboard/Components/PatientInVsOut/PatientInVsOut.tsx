import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BarChart from "../../../../Components/Chart/BarChart";
import { PaitentDetails } from "../../mock";
import {
  APPOINTMENT_STAT_WEEK,
  IN_PATIENT_STATUS,
} from "../../../../constants";
import { AppDispatch, RootState } from "../../../../redux/store";
import patientsData from "../../../../utils/data";
import { getInAndOutPatientBarChartData } from "../../store/dashboardscreenMiddleware";

function PatientInVsOut() {
  const [chartData, setChargeData] = useState({});
  const dispatch = useDispatch<AppDispatch>();
  const { inAndOutPatientBarChartData } = useSelector<
    RootState,
    RootState["dashboardReducers"]
  >((state) => state.dashboardReducers);

  const fetchData = async () => {
    const payload = {
      startDate: moment().startOf("week").toISOString(),
      endDate: moment().endOf("week").toISOString(),
    };
    await dispatch(getInAndOutPatientBarChartData(payload));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getChartData = () => {
    const inPatients: any = { ...APPOINTMENT_STAT_WEEK };
    const outPatients: any = { ...APPOINTMENT_STAT_WEEK };

    inAndOutPatientBarChartData.results.forEach((result) => {
      result.types.forEach((type: any) => {
        const day = new Date(type.date).getDay();
        if (result.status === IN_PATIENT_STATUS) inPatients[day] += type.count;
        else outPatients[day] += type.count;
      });
    });
    return {
      labels: ["S", "M", "T", "W", "T", "F", "S"],
      datasets: [
        {
          label: "General",
          data: Object.values(inPatients),
          backgroundColor: patientsData.map(() => "#0000ff"),
          barPercentage: 0.4,
          borderRadius: 10,
        },
        {
          label: "Emergency",
          data: Object.values(outPatients),
          backgroundColor: patientsData.map(() => "#FFA500"),
          barPercentage: 0.4,
          borderRadius: 10,
        },
        {
          label: "ICU",
          data: Object.values(outPatients),
          backgroundColor: patientsData.map(() => "#FF0000"),
          barPercentage: 0.4,
          borderRadius: 10,
        },
      ],
    };
  };

  useEffect(() => {
    if (inAndOutPatientBarChartData.results.length)
      setChargeData(getChartData());
  }, [inAndOutPatientBarChartData]);
  return (
    <div className="card patient__in__v__out">
      <div className="header">
        <p className="title">Patient Breakdown</p>
      </div>
      <div className="patient__gender__line__chart">
        <BarChart chartData={PaitentDetails} />
        <div className="lengend__flex__evenly">
          <div className="General each__legend">
            <div className="status" />
            <p>General</p>
          </div>
          <div className="Emergency each__legend">
            <div className="status" />
            <p>Emergency</p>
          </div>
          <div className="ICU each__legend">
            <div className="status" />
            <p>ICU</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientInVsOut;
