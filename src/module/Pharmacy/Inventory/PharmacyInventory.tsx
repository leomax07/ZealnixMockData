import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import GridAndListToggleHeader from "../../../Components/GridAndListToggleHeader/Index";
import { PHARMACY_STOCK_DATA } from "../../../constants";
import PharmacyGridList from "../Components/PharmacyGridList";
import AddNewInventory from "./Dialog/AddNewInventory";
import PharmacyInventoryTable from "./PharmacyInventoryTable";
import { fetchInventoryStocks } from "../Store/pharmacyMiddleware";

export interface RowType {
  drugId?: string;
  category?: string;
  inStock: number;
  stock?: number;
  status: string;
}

function PharmacyScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { inventoryStockList } = useSelector<
    RootState,
    RootState["pharmacyReducer"]
  >((state) => state.pharmacyReducer);
  const [view, setView] = useState("list");
  const [showAddNewModal, setShowAddNewModel] = useState(false);

  // <=============[METHODS]=============> //

  const toggleAddNewModal = () => {
    setShowAddNewModel(true);
  };

  // Functionality used to handle inventory list
  const listInventoryStocks = async () => {
    await dispatch(fetchInventoryStocks());
  };

  // <=============[LIFE CYCLE & WATCHERS]=============> //

  useEffect(() => {
    listInventoryStocks();
  }, []);

  // <=============[TEMPLATE]=============> //

  return (
    <div>
      <div className="pharmacy__screen__body__container">
        <div className="header__container">
          <GridAndListToggleHeader
            changeTab={setView}
            handleAddNewClick={toggleAddNewModal}
          />
        </div>
        {view === "list" && (
          <PharmacyInventoryTable dataList={inventoryStockList} />
        )}
        {view === "grid" && <PharmacyGridList list={PHARMACY_STOCK_DATA} />}
      </div>
      <AddNewInventory
        visible={showAddNewModal}
        setVisible={setShowAddNewModel}
        width="40vw"
      />
    </div>
  );
}

export default PharmacyScreen;
