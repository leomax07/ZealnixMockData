import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { maintenace } from "../mock";
import {
  EmployeeIDTemplate,
  OverLayTemplateHelper,
  ProfileImageTemplate,
  paginatorTemplate,
  statusTemplateHelper,
} from "../../../Components/DataTableTemplates/Index";
import { AppDispatch, RootState } from "../../../redux/store";
import {
  deleteMaintenance,
  getAssetMaintenances,
  updateMaintenance,
} from "../store/assetMiddleware";
import { dateAndTimeFormat } from "../../../utils/reusableFunctions";
import AddNewModal from "../../../Components/AddNewModal/Index";
import { AssetMaintenances } from "../store/assetTypes";
import AddNewAssetMaintenance from "./AddNewAssetMaintenance";
import { ROWS_PER_PAGE, ROWS_PER_PAGE_OPTIONS } from "../../../constants";

interface Props {
  assetData: any;
}

export default function MaintenanceAssetTable({ assetData }: Props) {
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
        where: {
          assetId: assetData?.id,
        },
        include: [{ relation: "lastAssignedTo" }, { relation: "assetItem" }],
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
    await fetchData();
  };

  const handlePeriod = (rowData: any) => {
    const duration = moment.duration(
      moment(rowData.endDate).diff(moment(rowData.startDate))
    );
    const differenceInDays = duration.asDays();
    return <div>{differenceInDays}</div>;
  };

  const handleEndMaintenance = async () => {
    try {
      const payload: any = {
        ...selectedItem,
        status: "completed",
      };
      delete payload.assetItem;
      delete payload.lastAssignedTo;
      await dispatch(updateMaintenance(payload)).then(() => {
        fetchData();
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
          body={(rowData: any) => EmployeeIDTemplate(rowData.assetItem)}
          header="ITEM ID"
          headerClassName="table__asset__id"
        />
        <Column
          body={(rowData: any) =>
            rowData?.lastAssignedTo &&
            ProfileImageTemplate(rowData?.lastAssignedTo)
          }
          header="LAST ASSIGNED TO"
        />
        <Column
          body={(rowData: any) => dateAndTimeFormat(rowData.endDate)}
          header="MAINTENANCE DATE"
        />
        <Column
          body={(rowData: any) => handlePeriod(rowData)}
          header="PERIOD"
        />
        <Column field="reason" header="REASON" />
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
