import { ReactElement, useState } from "react";
import { Outlet } from "react-router-dom";
import masters from "../../../assets/masters.svg";
import TabComponent from "../../../Components/Tab/tab";
import { MASTERS_TAB_OPTIONS } from "../../../constants";

export default function MastersLayout(): ReactElement {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="page__container masters__layout__container">
      <div className="header__container">
        <div className="header">
          <img src={masters} alt="masters" />
          <p>Masters</p>
        </div>
        <p className="description">
          Description. Lorem ipsum dolor sit amet, ex lucilius hendrerit vim,
          tempor scaevola iudicabit ei ius.
        </p>
        <div className="tabs">
          <TabComponent
            taboptions={MASTERS_TAB_OPTIONS}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        </div>
      </div>
      <Outlet />
    </div>
  );
}
