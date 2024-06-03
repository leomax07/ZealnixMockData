import { DataTable } from "primereact/datatable";
import { ProgressBar } from "primereact/progressbar";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { RowType } from "./PharmacyInventory";
import { ROWS_PER_PAGE, ROWS_PER_PAGE_OPTIONS } from "../../../constants";
import {
  pharmacyImageTemplate,
  paginatorTemplate,
  hotlinkTemplateHelper,
  OverLayTemplateHelper,
} from "../../../Components/DataTableTemplates/Index";
import RightSideBar from "../../../Components/RightSidebar/Index";
import SalesAndPurchaseDetails from "./Sidebar/SaleAndPurchase";
import { InventoryStockType } from "../Store/pharmacyType";
import AddNewInventory from "./Dialog/AddNewInventory";
import { inventory } from "../../AssetsModule/mock";
import { deleteDrug } from "../Store/pharmacyMiddleware";
import AddNewModal from "../../../Components/AddNewModal/Index";

export function StockTemplateHelper({ totalStock }: InventoryStockType) {
  const TOTAL_PERCENTAGE = 100;
  const inStock = totalStock;
  const stockPercentage = (inStock / totalStock) * TOTAL_PERCENTAGE;
  return (
    <div className="in__stock__container">
      <p className="stock">{totalStock}</p>
      <div className="progress__part">
        <ProgressBar
          className={stockPercentage > 50 ? "green" : "yellow"}
          value={totalStock}
        />
      </div>
    </div>
  );
}

interface PropType {
  dataList: InventoryStockType[];
}

function PharmacyInventoryTable({ dataList }: PropType) {
  const dispatch = useDispatch<AppDispatch>();
  const [visible, setVisible] = useState(false);
  const [isEditDialog, setIsEditDialog] = useState(false);
  const [showInventoryDialog, setShowInventoryDialog] = useState(false);
  const [selectedInventoryData, setSelectedInventoryData] = useState<any>({});
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  // <===============[METHODS]===================> //

  // Functionality used to view drug detail on sidebar
  const handleSelect = (e: any) => {
    const target = e.originalEvent?.target?.className;
    const match = target.match(/overlay_action/g);
    if (match === null) setVisible(true);
  };

  // Functionality used to reset state after inventory dialog close
  const handleInventoryDialogClose = () => {
    setIsEditDialog(false);
    setSelectedInventoryData({});
  };

  // Functionality used to handle delete drug from inventory
  const handleDelete = async () => {
    const stockId = selectedInventoryData?.id;
    const response = await dispatch(deleteDrug(stockId));
    if (response.meta.requestStatus === "fulfilled") {
      setShowConfirmationDialog(false);
    }
  };

  // Functionality used to handle table actions
  const handleAction = (action: object | any) => {
    const selectedData = { ...action.payload };
    switch (action.type) {
      case "edit":
        setSelectedInventoryData(selectedData);
        setIsEditDialog(true);
        setShowInventoryDialog(true);
        break;
      case "delete":
        setSelectedInventoryData(selectedData);
        setShowConfirmationDialog(true);
        break;
      default:
        break;
    }
  };

  // <===============[LIFECYCLE & WATCHERS]===================> //

  // watcher used to reset state after dialog close
  useEffect(() => {
    if (!showInventoryDialog && isEditDialog) handleInventoryDialogClose();
  }, [showInventoryDialog]);

  // <===============[TEMPLATES]===================> //

  const categoryStyleHelper = (row: RowType) =>
    row?.category ? (
      <p className="catrgory__table__style">{row.category}</p>
    ) : (
      ""
    );

  const statusTemplateHelper = (row: RowType) => (
    <div className="status__template__container">
      {row.status === "active" && <div className="active__status__badge" />}
      {row.status === "inactive" && <div className="inactive__status__badge" />}
      <p className="status">{row.status}</p>
    </div>
  );

  return (
    <div>
      <div className="table__container">
        <DataTable
          value={inventory}
          paginator
          rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
          rows={ROWS_PER_PAGE}
          paginatorTemplate={paginatorTemplate}
          onRowClick={(e) => handleSelect(e)}
        >
          <Column selectionMode="multiple" />
          <Column
            header="DRUG NAME"
            body={pharmacyImageTemplate}
            field="name"
            headerStyle={{ width: "200px" }}
          />
          <Column
            header="DRUG ID"
            body={(row) => hotlinkTemplateHelper(row.drugId)}
            field="drugId"
          />
          <Column
            header="CATEGORY"
            body={categoryStyleHelper}
            field="category"
            headerStyle={{ width: "150px" }}
          />
          <Column header="MANUFACTURER" field="manufacturer" />
          <Column
            header="IN STOCK"
            body={StockTemplateHelper}
            field="totalStock"
          />
          <Column header="UNIT PRICE" field="unitPrice" />
          <Column header="SOLD (Last 30 Days) " field="soldLast30Days" />
          <Column header="STATUS" body={statusTemplateHelper} field="status" />
          <Column
            body={(row: object) => OverLayTemplateHelper(row, handleAction)}
          />
        </DataTable>

        {/* confirmation dialog */}
        <AddNewModal
          visible={showConfirmationDialog}
          setVisible={setShowConfirmationDialog}
          header="Delete Inventory Stock"
          primaryLabel="Delete"
          handleSaveClick={handleDelete}
        >
          <p>Are you sure, you want to delete this item from inventory?</p>
        </AddNewModal>

        {/* sidebar */}
        <RightSideBar
          body={<SalesAndPurchaseDetails />}
          setVisible={setVisible}
          visible={visible}
        />

        {/* inventory dialog for edit */}
        <AddNewInventory
          visible={showInventoryDialog}
          setVisible={setShowInventoryDialog}
          width="45vw"
          isEdit={isEditDialog}
          rowData={selectedInventoryData}
        />
      </div>
    </div>
  );
}

export default PharmacyInventoryTable;
