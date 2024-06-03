import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useDispatch, useSelector } from "react-redux";
import GridAndListToggleHeader from "../../Components/GridAndListToggleHeader/Index";
import TabComponent from "../../Components/Tab/tab";
import { AppDispatch, RootState } from "../../redux/store";
import { StaffsData } from "./mock";
import {
  deleteStaffById,
  getStaffsByType,
  patchStaff,
} from "./store/staffsMiddleware";
import AddNewModal from "../../Components/AddNewModal/Index";
import {
  DISABLED,
  ENABLED,
  ROWS_PER_PAGE,
  ROWS_PER_PAGE_OPTIONS,
} from "../../constants";
import { fetchAllDepartments } from "../SettingsModule/Masters/Departments/store/departmentMiddleware";
import { fetchAllDestinations } from "../SettingsModule/Masters/Designation/store/designation.middleware";
import {
  dutyTimeTemplateHelper,
  OverLayTemplateHelper,
  statusTemplateHelper,
  paginatorTemplate,
  ProfileImageTemplate,
} from "../../Components/DataTableTemplates/Index";
import { StaffDetail } from "./store/sfattsTypes";
// eslint-disable-next-line import/no-cycle
import StaffGridView from "./StaffGridView/Index";
import AddNewStaff from "./AddNewStaff";

export type TabOptions = {
  label: string;
  to: string;
  index: number | string;
};
interface StaffsScreenprops {
  TabOptions: TabOptions[];
}

function StaffsTable({ TabOptions }: StaffsScreenprops) {
  const [selectedTab, setSelectedTab] = useState<string | undefined>("doctor");
  const [showAddNew, setShowAddNew] = useState(false);
  const [view, setView] = useState("list");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedStaffData, setSelectedStaffData] =
    useState<StaffDetail | null>(null);
  const { type } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { staffs } = useSelector<RootState, RootState["staffsReducers"]>(
    (store) => store.staffsReducers
  );
  const navigate = useNavigate();

  // open and close add new staff modal
  const handleAddNewClick = () => {
    setIsEditing(false);
    setShowAddNew((prev) => !prev);
  };

  // Fetch initial data
  const handleFetchData = async () => {
    const filter = {
      filter: {
        where: {
          type,
        },
        include: [
          {
            relation: "department",
          },
        ],
      },
    };
    await dispatch(getStaffsByType(filter));
  };

  useEffect(() => {
    handleFetchData();
    dispatch(fetchAllDepartments());
    dispatch(fetchAllDestinations());
    setSelectedTab(type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  const handleSelect = (e: any, usertype: string | undefined) => {
    const target = e.originalEvent?.target?.className;
    const staffId = e.data?.id;
    const match = target.match(/overlay_action/g);
    if (usertype === "pharmacist" && match === null) {
      navigate(`/staffs/${usertype}/${staffId}/generalinfo`);
      return;
    }
    if (match === null) navigate(`/staffs/${usertype}/${staffId}`);
  };

  const handleStatusChange = async (id: string, status: string) => {
    const payload = {
      id,
      status: status === ENABLED ? DISABLED : ENABLED,
    };
    await dispatch(patchStaff(payload));
    await handleFetchData();
  };

  const handleEdit = (action: object | any) => {
    const data = { ...action.payload };
    switch (action.type) {
      case "edit":
        delete data.createdAt;
        setIsEditing(true);
        setSelectedStaffData(data);
        setShowAddNew(true);
        break;
      case "disable":
        handleStatusChange(action.payload.id, action.payload.status);
        break;
      case "delete":
        setSelectedId(action.payload.id);
        setShowConfirmation(true);
        break;
      default:
        break;
    }
  };

  const handleClose = () => {
    setShowAddNew(false);
    if (isEditing) setIsEditing(false);
    setSelectedStaffData(null);
  };

  const handleDelete = async () => {
    await dispatch(deleteStaffById(selectedId));
    await handleFetchData();
    setShowConfirmation(false);
  };

  const isGridView = view === "grid";
  return (
    <div className="staffs__page__container page__container">
      <div className="staffs__tabs__container">
        <TabComponent
          taboptions={TabOptions}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      </div>
      <div className="staff__table__container">
        <div className="staff__table__header">
          <GridAndListToggleHeader
            handleAddNewClick={handleAddNewClick}
            changeTab={setView}
            setSearch={setSearch}
          />
        </div>
        <div>
          {isGridView ? (
            <StaffGridView
              value={StaffsData || []}
              handleEdit={handleEdit}
              type={type}
            />
          ) : (
            <DataTable
              value={StaffsData || []}
              globalFilter={search}
              onRowClick={(e) => handleSelect(e, type)}
              paginator
              rows={ROWS_PER_PAGE}
              rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
              paginatorTemplate={paginatorTemplate}
            >
              <Column header="NAME" field="name" body={ProfileImageTemplate} />
              <Column header="EMPLOYEE ID" field="employeeId" />
              <Column header="DEPARTMENT" field="department.name" />
              <Column header="CONTACT NUMBER" field="phone" />
              <Column header="EMAIL ID" field="email" />
              <Column
                header="DUTY TIME"
                body={(row: any) => dutyTimeTemplateHelper(row.dutyInTime)}
              />
              <Column
                header="STATUS"
                field="status"
                body={statusTemplateHelper}
              />
              <Column
                body={(row: object) => OverLayTemplateHelper(row, handleEdit)}
              />
            </DataTable>
          )}
        </div>
      </div>
      <AddNewModal
        visible={showConfirmation}
        setVisible={setShowConfirmation}
        header="Delete Staff"
        primaryLabel="Delete"
        handleSaveClick={handleDelete}
      >
        <p>Are you sure, you want to delete this staff?</p>
      </AddNewModal>

      <AddNewStaff
        visible={showAddNew}
        setVisible={setShowAddNew}
        closeDialog={handleClose}
        width="50vw"
        isEdit={isEditing}
        rowData={selectedStaffData}
      />

      <Outlet />
    </div>
  );
}
export default StaffsTable;
