import { useState } from "react";
import { Outlet } from "react-router-dom";
import TabComponent from "../../Components/Tab/tab";
import { PHARMACY_TAB_OPTIONS } from "../../constants";

export interface RowType {
  drugId?: string;
  category?: string;
  inStock: number;
  stock?: number;
  status: string;
}

function PharmacyIndex() {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="page__container pharmacy__screen__container">
      <div className="pharmacy__screen__header__container">
        <div className="pharmacy__tabs__container">
          <TabComponent
            taboptions={PHARMACY_TAB_OPTIONS}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default PharmacyIndex;
