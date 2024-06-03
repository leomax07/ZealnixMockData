import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import {
  EmployeeIDTemplate,
  ItemName,
  OverLayTemplateHelper,
  ProfileImageTemplate,
  paginatorTemplate,
  statusTemplateHelper,
} from "../../../Components/DataTableTemplates/Index";
import { AppDispatch, RootState } from "../../../redux/store";
import { maintenace } from "../mock";
import {
  deleteMaintenance,
  getAssetMaintenances,
  updateMaintenance,
} from "../store/assetMiddleware";
import { dateAndTimeFormat } from "../../../utils/reusableFunctions";
import { AssetMaintenances } from "../store/assetTypes";
import AddNewModal from "../../../Components/AddNewModal/Index";
import AddNewAssetMaintenance from "../AllAssets/AddNewAssetMaintenance";
import { ROWS_PER_PAGE, ROWS_PER_PAGE_OPTIONS } from "../../../constants";

function AssetsMaintenance() {
  const dispatch = useDispatch<AppDispatch>();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [selectedItem, setSelectedItem] = useState<AssetMaintenances>();
  const [showEdit, setShowEdit] = useState(false);
  const [endMaintenance, setEndMaintenance] = useState(false);

  const { assetMaintenance } = useSelector<
    RootState,
    RootState["assetReducer"]
  >((state) => state.assetReducer);

  const fetchData = async () => {
    const defaultIncludeQuery: any = {
      filter: {
        include: [
          { relation: "lastAssignedTo" },
          { relation: "assetItem" },
          { relation: "asset" },
        ],
      },
    };
    await dispatch(getAssetMaintenances(defaultIncludeQuery.filter));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAction = (action: any) => {
    const { type, payload } = action;
    switch (type) {
      case "delete":
        setSelectedId(payload.id);
        setShowConfirmation(true);
        break;

      case "edit":
        setSelectedItem({
          ...payload,
        });
        setShowEdit(true);
        break;

      case "endMaintenance":
        setSelectedItem({
          ...payload,
        });
        setEndMaintenance(true);
        break;

      default:
        break;
    }
  };

  const handleDeleteReport = async () => {
    await dispatch(deleteMaintenance(selectedId));
    setShowConfirmation(false);
    await dispatch(getAssetMaintenances({}));
  };

  const handleEndMaintenance = async () => {
    try {
      const payload: any = {
        ...selectedItem,
        status: "completed",
      };
      delete payload.assetItem;
      delete payload.lastAssignedTo;
      delete payload.asset;
      await dispatch(updateMaintenance(payload)).then(() => {
        dispatch(getAssetMaintenances({}));
        setEndMaintenance(!endMaintenance);
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="table__height">
      <DataTable
        value={maintenace}
        responsiveLayout="scroll"
        paginator
        rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
        rows={ROWS_PER_PAGE}
        paginatorTemplate={paginatorTemplate}
      >
        <Column
          field="name"
          header="ASSET NAME"
          headerClassName="table__asset__id"
          body={(rowData: any) => ItemName(rowData.assetItem)}
        />
        <Column
          field="name"
          body={(rowData: any) => EmployeeIDTemplate(rowData.assetItem)}
          header="ASSET ID"
          headerClassName="table__asset__id"
        />
        <Column
          header="ITEM DETAILS"
          body={(rowData: any) => ItemName(rowData.asset)}
        />
        <Column
          body={(rowData: any) =>
            rowData?.lastAssignedTo &&
            ProfileImageTemplate(rowData?.lastAssignedTo)
          }
          header="ASSIGNED TO"
        />
        <Column
          body={(rowData: any) => dateAndTimeFormat(rowData.endDate)}
          header="MAINTENANCE DATE"
        />
        <Column header="REASON" field="reason" />
        <Column
          body={(rowData: any) => statusTemplateHelper(rowData)}
          header="STATUS"
        />
        <Column
          body={(row: object) => OverLayTemplateHelper(row, handleAction)}
        />
      </DataTable>
      <AddNewModal
        visible={showConfirmation}
        setVisible={setShowConfirmation}
        header="Delete Maintenance"
        primaryLabel="Delete"
        handleSaveClick={handleDeleteReport}
      >
        <p>Are you sure, you want to delete this Maintenance?</p>
      </AddNewModal>
      <AddNewAssetMaintenance
        visible={showEdit}
        setVisible={setShowEdit}
        isEditing
        selectedItem={selectedItem}
        getAllAssetMaintence={fetchData}
      />
      <AddNewModal
        visible={endMaintenance}
        setVisible={setEndMaintenance}
        header="End Maintenance"
        primaryLabel="Delete"
        handleSaveClick={handleEndMaintenance}
      >
        <p>Are you sure, you want to End this Maintenance?</p>
      </AddNewModal>
    </div>
  );
}

export default AssetsMaintenance;
