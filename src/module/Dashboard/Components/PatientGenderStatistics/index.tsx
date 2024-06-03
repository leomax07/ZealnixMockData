import moment, { unitOfTime } from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RadialChart from "../../../../Components/Chart/RadialChart";
import FilterDropdown from "../../../../Components/FilterDropdown/Index";
import { AppDispatch, RootState } from "../../../../redux/store";
import { getPatientGenderStat } from "../../store/dashboardscreenMiddleware";

function PatientGenderStatistics() {
  const [selected, setSelected] = useState<number>(0);
  const [genderData, setGenderData] = useState<any>({});
  const [count, setCount] = useState({
    maleCount: 0,
    femaleCount: 0,
  });
  const { patientGenderStat } = useSelector<
    RootState,
    RootState["dashboardReducers"]
  >((state) => state.dashboardReducers);
  const dispatch = useDispatch<AppDispatch>();
  const startOf: unitOfTime.StartOf[] = ["week", "month", "year"];
  const dates = [
    { name: "Week", value: 0 },
    { name: "Month", value: 1 },
    { name: "Year", value: 2 },
  ];

  const fetchDetails = async () => {
    const payload = {
      startDate: moment().startOf(startOf[selected]).toISOString(),
      endDate: moment().endOf(startOf[selected]).toISOString(),
    };
    await dispatch(getPatientGenderStat(payload));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(Number(e.target.value));
  };

  const setGraphData = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const maleCount = patientGenderStat.results.reduce(
      (acc, curr) => acc + (curr.gender === "male" ? curr.count : 0),
      0
    );
    const femaleCount = patientGenderStat.results.reduce(
      (acc, curr) =>
        acc +
        (curr.gender === "female" || curr.gender === null ? curr.count : 0),
      0
    );
    const otherCount = patientGenderStat.results.reduce(
      (acc, curr) => acc + (curr.gender === "other" ? curr.count : 0),
      0
    );

    setCount({
      maleCount,
      femaleCount,
    });

    const data = {
      labels: ["Male", "Female", "Other"],
      datasets: [
        {
          data: [maleCount, femaleCount, otherCount],
          backgroundColor: [
            "#2563EB",
            "#38BDF8",
            documentStyle.getPropertyValue("--green-500"),
          ],
          hoverBackgroundColor: [
            "#2563EB",
            "#38BDF8",
            documentStyle.getPropertyValue("--green-400"),
          ],
        },
      ],
    };

    setGenderData(data);
  };

  useEffect(() => {
    fetchDetails();
  }, [selected]);

  useEffect(() => {
    setGraphData();
  }, [patientGenderStat]);
  return (
    <div className="card consultation__admission__container">
      <div className="header">
        <p>Gender statistics</p>
        <div>
          <FilterDropdown
            items={dates}
            optionLabel="name"
            optionValue="value"
            handleChange={handleChange}
            value={selected}
          />
        </div>
      </div>
      <div className="patient__gender__chart__container">
        <RadialChart />
      </div>
      <div className="lengends__container">
        <div className="legend">
          <div className="icon male__icon" />
          <p>
            Male: <span className="count">{count.maleCount}</span>
          </p>
        </div>
        <div className="legend">
          <div className="icon female__icon" />
          <p>
            Female: <span className="count">{count.femaleCount}</span>
          </p>
        </div>
      </div>
      <div className="total__count">
        <p className="total__title">Total</p>
        <p className="total">{count.maleCount + count.femaleCount}</p>
      </div>
    </div>
  );
}

export default PatientGenderStatistics;
