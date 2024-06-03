import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import {
  AssetsCategory,
  EmployeeIDTemplate,
  OverLayTemplateHelper,
  ProfileImageTemplate,
  paginatorTemplate,
} from "../../../Components/DataTableTemplates/Index";
import { AllAssets } from "../mock";
import { deleteAsset, getAssets } from "../store/assetMiddleware";
import { AppDispatch, RootState } from "../../../redux/store";
import { dateAndTimeFormat } from "../../../utils/reusableFunctions";
import CommonAvatarGroup from "../../../Components/AvatarGroup";
import AddNewModal from "../../../Components/AddNewModal/Index";
import AddNewAsset from "./AddNewAsset";
import RightSideBar from "../../../Components/RightSidebar/Index";
import ViewAsset from "./ViewAsset";
import { ROWS_PER_PAGE, ROWS_PER_PAGE_OPTIONS } from "../../../constants";

const assignAvatar = (item: any) => (
  <CommonAvatarGroup item={item.assignedDetails} size="medium" />
);

export default function AssetsTable() {
  const dispatch = useDispatch<AppDispatch>();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>();

  // sidebar
  const [showSidebar, setShowSidebar] = useState(false);
  const [assetView, setAssetView] = useState<any>(null);

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  const { assets } = useSelector<RootState, RootState["assetReducer"]>(
    (state) => state.assetReducer
  );

  const fetchData = async () => {
    const defaultIncludeQuery: any = {
      filter: {
        include: [{ relation: "assetCategory" }],
      },
    };
    await dispatch(getAssets(defaultIncludeQuery.filter));
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

      default:
        break;
    }
  };

  const handleDeleteReport = async () => {
    await dispatch(deleteAsset(selectedId));
    setShowConfirmation(false);
    await fetchData();
  };

  const handleSelect = async (e: any) => {
    const target = e.originalEvent?.target?.className;
    const reportDetail = e.data;
    const stringMatch = target.match(/overlay_action/g);
    if (stringMatch === null) {
      setAssetView(reportDetail);
      toggleSidebar();
    }
  };

  return (
    <div className="table__height">
      <RightSideBar
        visible={showSidebar}
        setVisible={toggleSidebar}
        body={<ViewAsset setVisible={toggleSidebar} assetData={assetView} />}
      />
      <DataTable
        value={AllAssets}
        responsiveLayout="scroll"
        onRowClick={(e) => handleSelect(e)}
        paginator
        rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
        rows={ROWS_PER_PAGE}
        paginatorTemplate={paginatorTemplate}
      >
        <Column
          field="name"
          body={(rowData: any) => ProfileImageTemplate(rowData)}
          header="ASSET NAME"
        />
        <Column
          body={(rowData: any) => EmployeeIDTemplate(rowData)}
          header="ASSET ID"
          headerClassName="table__asset__id"
        />
        <Column
          body={(rowData: any) => AssetsCategory(rowData?.assetCategory)}
          header="CATEGORY"
        />
        <Column
          field="total"
          header="AVAILABLE STOCK"
          headerClassName="asset__table__maintenance__itemdetails"
        />
        <Column field="in_use" header="IN USE" />
        <Column field="maintenance" header="IN MAINTENANCE" />
        <Column
          body={assignAvatar}
          header="ASSIGNED TO"
          headerClassName="table__asset__assign"
        />
        <Column
          body={(rowData: any) => dateAndTimeFormat(rowData.createdAt)}
          header="CREATED ON"
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
      <AddNewAsset
        visible={showEdit}
        setVisible={setShowEdit}
        isEditing
        selectedItem={selectedItem}
      />
    </div>
  );
}
