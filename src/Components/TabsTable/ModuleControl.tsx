import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputSwitch as Switch } from "primereact/inputswitch";
import AvatarWithNameAndRole from "../AvatarWithNameAndRole/Index";
import BlueEagle from "../../assets/sample.jpeg";
import ButtonComponent from "../Buttons/Index";
import TabComponent from "../Tab/tab";
import sideMenu from "../../uikit/MainComponent/SideBar/menu";

interface RowType {
  name?: string;
  label?: string;
  Icon?: any;
}
interface PropType {
  setVisible: Function;
}

function ModuleControl({ setVisible }: PropType) {
  const [selectedtab, setSelectedTab] = useState(0);
  const tabOptions = [{ label: "Module control", to: "", index: 0 }];

  const tableData = sideMenu || [
    {
      name: "Dashboard",
    },
  ];

  const moduleNameTemplate = (row: RowType) => (
    <div className="flex align__center gap__8">
      {row.Icon}
      {row.label}
    </div>
  );

  const switchTemplate = () => <Switch checked />;

  return (
    <div className="module__control__container">
      <div className="module__control__header">
        <div className="left">
          <AvatarWithNameAndRole profilePic={BlueEagle} />
          <div className="details__container">
            <p className="name">
              John Alex <span className="light__grey__text">#2113</span>
            </p>
            <p className="light__grey__text">Software engineer</p>
          </div>
        </div>
        <div className="right">
          <ButtonComponent label="Save" />
          <ButtonComponent
            label="Cancel"
            type="outlined"
            onClick={() => setVisible(false)}
          />
        </div>
      </div>
      <div className="email__and__phone light__grey__text">
        name@gmail.com | 7098765432
      </div>
      <div className="tabs">
        <TabComponent
          taboptions={tabOptions}
          selectedTab={selectedtab}
          setSelectedTab={setSelectedTab}
        />
      </div>
      <div className="body__container">
        <div className="body__header">
          <div className="header">Module control</div>
          <div className="description">
            Used for multiline pieces of content. Lorem ipsum dolor sit amet, ex
            lucilius hendrerit vim,
          </div>
        </div>
        <div className="tables__container">
          <DataTable value={tableData}>
            <Column header="MODULE" body={moduleNameTemplate} />
            <Column header="READ" body={switchTemplate} />
            <Column header="WRITE" body={switchTemplate} />
          </DataTable>
        </div>
      </div>
    </div>
  );
}

export default ModuleControl;
