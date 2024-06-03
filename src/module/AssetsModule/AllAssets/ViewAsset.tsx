import React, { useState } from "react";
import AvatarWithNameAndRole from "../../../Components/AvatarWithNameAndRole/Index";
import ButtonComponent from "../../../Components/Buttons/Index";
import TabComponent from "../../../Components/Tab/tab";
import InUseAssetTable from "./InUseAssetTable";
import HistoryAssetTable from "./HistoryAssetTable";
import MaintenanceAssetTable from "./MaintenanceAssetTable";
import AssetIndex from "./AssetIndex";
import AddNewAssetItem from "./AddNewAssetItem";
// import AddNewAssetMaintenance from "./AddNewAssetMaintenance";

interface Props {
  assetData?: any;
  setVisible?: () => void;
}
export default function ViewAsset({ assetData, setVisible }: Props) {
  const [selectedTab, setSelectedTab] = useState(0);
  const tabOptions = [
    { label: "In Use", index: 0, to: "" },
    { label: "History", index: 1, to: "" },
    { label: "Maintenance", index: 2, to: "" },
  ];
  const [showAddNewAsset, setShowAddNewAsset] = useState(false);
  // const [showAddMaintenance,setShowAddMaintenance] = useState(false)

  const handleAddNewClick = () => {
    if (selectedTab === 0) {
      setShowAddNewAsset(true);
      return;
    }
    // if(selectedTab === 2) {
    // setShowAddMaintenance(true)
    // return
    // };
  };

  return (
    <div className="view__report__container">
      <div className="view__report__header">
        <div className="left">
          <AvatarWithNameAndRole profilePic={assetData?.imageUrl} />
          <div className="details__container">
            <p className="name">
              {assetData?.name}&nbsp;&nbsp;
              <span className="light__grey__text blue__text">
                #{assetData?.assetId}
              </span>
            </p>
            <span className="table__assets__category">
              {assetData?.assetCategory?.name}
            </span>
          </div>
        </div>
        <div className="right">
          <ButtonComponent
            label="Cancel"
            type="outlined"
            onClick={setVisible}
          />
        </div>
      </div>

      <div className="view__report__sub__header">
        <div className="title flex">
          In Use :&nbsp;
          <div>{assetData?.in_use}</div>
        </div>
        &nbsp; | &nbsp;
        <div className="title flex">
          In Maintenance :&nbsp;
          <div>{assetData?.maintenance}</div>
        </div>
      </div>
      <br />

      <div className="tabs__container">
        <TabComponent
          taboptions={tabOptions}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
        {(selectedTab === 0 || selectedTab === 2) && (
          <AssetIndex
            selectedtab={selectedTab}
            handleClick={handleAddNewClick}
          />
        )}
        {selectedTab === 0 && <InUseAssetTable assetData={assetData} />}
        {selectedTab === 1 && <HistoryAssetTable assetData={assetData} />}
        {selectedTab === 2 && <MaintenanceAssetTable assetData={assetData} />}

        <AddNewAssetItem
          visible={showAddNewAsset}
          assetData={assetData}
          setVisible={setShowAddNewAsset}
        />
        {/* <AddNewAssetMaintenance selectedTab ={selectedTab}  /> */}
      </div>
    </div>
  );
}
