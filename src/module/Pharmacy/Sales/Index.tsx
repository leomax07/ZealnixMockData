import { useState } from "react";
import GridAndListToggleHeader from "../../../Components/GridAndListToggleHeader/Index";
import { PHARMACY_STOCK_DATA } from "../../../constants";
import PharmacyGridList from "../Components/PharmacyGridList";
import AddNewPurchase from "../Inventory/Dialog/AddNewInventory";
import PharmacySalesTable from "./PharmacySales";

export default function PharmacySales() {
  const [view, setView] = useState("list");
  const [showAddNewModal, setShowAddNewModal] = useState(false);

  const toggleAddNewModal = () => {
    setShowAddNewModal((prev) => !prev);
  };
  return (
    <div>
      <div className="pharmacy__screen__body__container">
        <div className="header__container">
          <GridAndListToggleHeader
            changeTab={setView}
            handleAddNewClick={toggleAddNewModal}
          />
        </div>
        {view === "list" && <PharmacySalesTable />}
        {view === "grid" && <PharmacyGridList list={PHARMACY_STOCK_DATA} />}
      </div>
      <AddNewPurchase
        visible={showAddNewModal}
        setVisible={toggleAddNewModal}
        width="45vw"
      />
    </div>
  );
}
