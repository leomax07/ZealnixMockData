import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import {
  EmployeeIDTemplate,
  OverLayTemplateHelper,
  ProfileImageTemplate,
  paginatorTemplate,
} from "../../../Components/DataTableTemplates/Index";
import { AppDispatch, RootState } from "../../../redux/store";
import { deleteAssetItem, getAllAssetItems } from "../store/assetMiddleware";
import { dateAndTimeFormat } from "../../../utils/reusableFunctions";
import AddNewModal from "../../../Components/AddNewModal/Index";
import AddNewAssetItem from "./AddNewAssetItem";
import { AssetItem } from "../store/assetTypes";
import AssignAsset from "./AssignAsset";
import AddNewAssetMaintenance from "./AddNewAssetMaintenance";
import { ROWS_PER_PAGE, ROWS_PER_PAGE_OPTIONS } from "../../../constants";

interface Props {
  assetData: any;
}

export default function InUseAssetTable({ assetData }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { assetItem } = useSelector<RootState, RootState["assetReducer"]>(
    (state) => state.assetReducer
  );
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [showAssign, setShowAssign] = useState(false);
  const [showMaintenance, setShowMaintenace] = useState(false);
  const [selectedItem, setSelectedItem] = useState<AssetItem>();

  const fetchData = async () => {
    const defaultIncludeQuery: any = {
      filter: {
        where: {
          assetId: assetData?.id,
          status: { inq: ["in_use", "unassigned"] },
        },
        include: [{ relation: "assignedTo" }],
      },
    };
    await dispatch(getAllAssetItems(defaultIncludeQuery.filter));
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

      case "assign":
        setSelectedItem({
          ...payload,
        });
        setShowAssign(true);
        break;

      case "maintenance":
        setSelectedItem({
          ...payload,
        });
        setShowMaintenace(true);
        break;

      default:
        break;
    }
  };

  const handleDeleteReport = async () => {
    await dispatch(deleteAssetItem(selectedId));
    setShowConfirmation(false);
    await fetchData();
  };

  return (
    <div className="table__height">
      <DataTable
        value={assetItem}
        responsiveLayout="scroll"
        paginator
        rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
        rows={ROWS_PER_PAGE}
        paginatorTemplate={paginatorTemplate}
      >
        <Column
          body={(rowData: any) => EmployeeIDTemplate(rowData)}
          header="ITEM ID"
          headerClassName="table__asset__id"
        />

        <Column header="ITEM NAME" field="itemName" />
        <Column
          body={(rowData: any) =>
            rowData?.assignedTo && ProfileImageTemplate(rowData?.assignedTo)
          }
          header="ASSIGNED TO"
        />
        <Column
          body={(rowData: any) => dateAndTimeFormat(rowData.inUseFrom)}
          header="IN USE FROM"
        />

        <Column
          body={(row: object) => OverLayTemplateHelper(row, handleAction)}
        />
      </DataTable>
      <AddNewModal
        visible={showConfirmation}
        setVisible={setShowConfirmation}
        header="Delete Asset"
        primaryLabel="Delete"
        handleSaveClick={handleDeleteReport}
      >
        <p>Are you sure, you want to delete this Asset?</p>
      </AddNewModal>
      <AddNewAssetItem
        visible={showEdit}
        setVisible={setShowEdit}
        isEditing
        selectedItem={selectedItem}
      />
      <AssignAsset
        visible={showAssign}
        setVisible={setShowAssign}
        AssetItemData={selectedItem}
        getAssetItems={fetchData}
      />
      <AddNewAssetMaintenance
        visible={showMaintenance}
        setVisible={setShowMaintenace}
        AssetItemData={selectedItem}
        getAllAssetMaintence={fetchData}
      />
    </div>
  );
}
