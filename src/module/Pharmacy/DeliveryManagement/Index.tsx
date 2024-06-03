import { Tab, TabNavigation } from "evergreen-ui";
import { useState } from "react";
import ButtonComponent from "../../../Components/Buttons/Index";
import RightSideBar from "../../../Components/RightSidebar/Index";
import SearchInputComponent from "../../../Components/SearchInput/searchInput";
import AddNewRider from "./AddNewRider";
import OrderAllocationTable from "./OrderAllocationTable";
import OrderDetails from "./OrderDetails";
import RiderTable from "./RiderTable";

function PharmacyDeliveryManagement() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showSidebar, setShowSideBar] = useState(false);
  const [showAddNew, setShowAddNew] = useState(false);
  const delieryManagement = [
    { label: "Rider management", index: 0 },
    { label: "Order allocation", index: 1 },
  ];

  const toggleAddNew = () => {
    setShowAddNew((prev) => !prev);
  };

  const handleTabClick = (index: number) => {
    setSelectedIndex(index);
  };
  return (
    <div className="pharmacy__deleivery__management__container">
      <div className="header">
        <div className="left">
          <TabNavigation>
            {delieryManagement.map((tab, index) => (
              <Tab
                isSelected={selectedIndex === index}
                key={tab.index}
                onClick={() => handleTabClick(tab.index)}
                className="each__tab"
              >
                {tab.label}
              </Tab>
            ))}
          </TabNavigation>
        </div>
        <div className="left">
          <SearchInputComponent />
          <ButtonComponent label="Add new" onClick={toggleAddNew} />
        </div>
      </div>
      <div className="body">
        {selectedIndex === 0 && (
          <RiderTable
            actionValue={showSidebar}
            actionhandler={setShowSideBar}
          />
        )}
        {selectedIndex === 1 && (
          <OrderAllocationTable
            actionValue={showSidebar}
            actionhandler={setShowSideBar}
          />
        )}
      </div>
      <RightSideBar
        visible={showSidebar}
        setVisible={setShowSideBar}
        body={<OrderDetails />}
        width={894}
      />
      <AddNewRider visible={showAddNew} setVisible={setShowAddNew} />
    </div>
  );
}

export default PharmacyDeliveryManagement;
