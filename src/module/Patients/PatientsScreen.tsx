import "./PatientsScreen.scss";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import TabComponent from "../../Components/Tab/tab";

function PatientsScreen() {
  const [selectedTab, setSelectedTab] = useState(0);

  const tabOptions = [
    {
      index: 0,
      label: "All patients",
      to: "/patients/all",
    },
  ];

  return (
    <div className="page__container patient__screen__container">
      <div className="top__part">
        <div className="tabs__container">
          <TabComponent
            taboptions={tabOptions}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        </div>
      </div>

      <Outlet />
    </div>
  );
}

export default PatientsScreen;
