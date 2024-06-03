import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pane, Tablist, Tab } from "evergreen-ui";
import "./tabtable.scss";
import SearchInputComponent from "../SearchInput/searchInput";
import ListImg from "../../Icon/list.svg";
import GridImg from "../../Icon/grid.svg";
import violetListImg from "../../Icon/violetList.svg";
import violetGridImg from "../../Icon/violetGrid.svg";
import DoctorProfileCard from "../DoctorCard/doctorcard";
import { TabOptions } from "../../module/Staffs/StaffsTable";
import AppointmentsCalendar from "../../module/Appointments/AppointmentsCalendar/AppointmentCalendar";
import AssetsTable from "../../module/AssetsModule/AllAssets/AssetsTable";
import AssetsMaintenance from "../../module/AssetsModule/AssetsMaintentance/AssetsMaintenance";
import ButtonComponent from "../Buttons/Index";
import AddNewAsset from "../../module/AssetsModule/AllAssets/AddNewAsset";

interface TabsOptionsprops {
  options: TabOptions[];
  enableList: boolean;
  assetMaintenance?: boolean;
}

export default function TabsTableComponent({
  options,
  enableList,
  assetMaintenance,
}: TabsOptionsprops) {
  const [selectedIndex, setSelectedIndex] = useState<string | number>(0);
  const [gridScreen, setgridScreen] = useState(false);
  const [listScreen, setlistScreen] = useState(true);
  const [OpenModel, setOpenModel] = useState(false);
  const navigation = useNavigate();
  const listfunction = () => {
    setlistScreen(true);
    setgridScreen(false);
  };
  const gridfunction = () => {
    setlistScreen(false);
    setgridScreen(true);
  };

  const tabOnclickFunction = (to: string, index: number | string) => {
    setSelectedIndex(index);
    navigation(to);
  };

  const handleTable = (number: any) => {
    switch (number) {
      case 0:
        return <AssetsTable />;
      case 1:
        return <AssetsMaintenance />;
      default:
        return <AssetsTable />;
    }
  };
  return (
    <div>
      <Tablist marginBottom={16} flexBasis={240}>
        {options.map((tab, index) => (
          <Tab
           className={`super ${index === selectedIndex ? "asset__active__tab" :""}`}
            aria-controls={`panel-${tab}`}
            isSelected={index === selectedIndex}
            key={tab.index}
            onSelect={() => tabOnclickFunction(tab.to, tab.index)}
          >
            {tab.label}
          </Tab>
        ))}
      </Tablist>
      <div className="flexSort">
        <div className="searchClass">
          <SearchInputComponent placeholder="Search" />
        </div>
        {enableList && (
          <div className="gridView" onClick={() => gridfunction()}>
            <img src={gridScreen ? violetGridImg : GridImg} alt="GridImg" />
          </div>
        )}
        {enableList && (
          <div className="listView" onClick={() => listfunction()}>
            <img src={listScreen ? violetListImg : ListImg} alt="ListImg" />
          </div>
        )}
        {enableList && (!assetMaintenance || !selectedIndex) && (
          <div className="btn__align">
            <ButtonComponent label="Add" onClick={() => setOpenModel(true)} />
          </div>
        )}
      </div>
        
      {options.map((tab, index) => (
        <Pane
          aria-labelledby={tab.label}
          aria-hidden={index !== selectedIndex}
          display={index === selectedIndex ? "block" : "none"}
          key={tab.index}
          role="tabpanel"
        >
        
          {listScreen &&
            index === selectedIndex &&
            tab.label !== "Appointments Calendar" &&
            handleTable(tab.index)}
          {listScreen &&
            index === selectedIndex &&
            index === 1 &&
            tab.label === "Appointments Calendar" && <AppointmentsCalendar />}
          {gridScreen && index === selectedIndex && <DoctorProfileCard />}
        </Pane>
      ))}
      <AddNewAsset visible={OpenModel} setVisible={setOpenModel} />
    </div>
  );
}
