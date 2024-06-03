import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddNewModal from "../../../../Components/AddNewModal/Index";
import { Master } from "../../mock";
import {
  OverLayTemplateHelper,
  StatusTemplate,
  tableDateTemplate,
} from "../../../../Components/DataTableTemplates/Index";
import GridAndListToggleHeader from "../../../../Components/GridAndListToggleHeader/Index";
import TextInputComponent from "../../../../Components/TextInput/Index";
import {
  BRANCH_ID,
  DISABLED,
  ENABLED,
  HOSPITAL_ID,
} from "../../../../constants";
import { AppDispatch, RootState } from "../../../../redux/store";
import {
  createDepartment,
  deleteDepartment,
  fetchAllDepartments,
  patchDepartment,
  updateDepartment,
} from "./store/departmentMiddleware";

function DepartmentsPage() {
  const [view, setView] = useState("list");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [showAddNew, setShowAddNew] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selected, setSelected] = useState({ name: "", id: "" });
  const [name, setName] = useState("");
  const { departments } = useSelector<
    RootState,
    RootState["departmentsReducers"]
  >((state) => state.departmentsReducers);
  const dispatch = useDispatch<AppDispatch>();

  // remove one the view is used
  console.log(view);

  useEffect(() => {
    dispatch(fetchAllDepartments());
  }, [dispatch]);

  const toggleAddNew = () => {
    setShowAddNew((prev) => !prev);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSelectedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleCreateNewDepartment = async () => {
    const payload = {
      name,
      status: "active",
      hospitalId: HOSPITAL_ID,
      branchId: BRANCH_ID,
    };
    await dispatch(createDepartment(payload));
    await dispatch(fetchAllDepartments());
    setShowAddNew(false);
  };

  const handleStatusChange = async (id: string, status: string) => {
    const payload = {
      id,
      status: status === ENABLED ? DISABLED : ENABLED,
    };
    await dispatch(patchDepartment(payload));
    await dispatch(fetchAllDepartments());
  };

  const handleAction = (action: any) => {
    switch (action.type) {
      case "edit":
        setSelected(action.payload);
        setShowAddNew(true);
        setIsEditing(true);
        break;
      case "delete":
        setSelectedId(action.payload.id);
        setShowConfirmation(true);
        break;
      case "disable":
        handleStatusChange(action.payload.id, action.payload.status);
        break;
      default:
        break;
    }
  };

  const handleUpdateDepartment = async () => {
    await dispatch(updateDepartment(selected));
    setShowAddNew(false);
    setIsEditing(false);
    setName("");
    await dispatch(fetchAllDepartments());
  };

  const handleDelete = async () => {
    await dispatch(deleteDepartment(selectedId));
    await dispatch(fetchAllDepartments());
    setShowConfirmation(false);
    setSelectedId("");
  };

  return (
    <div className="designation__conatainer">
      <GridAndListToggleHeader
        changeTab={setView}
        handleAddNewClick={toggleAddNew}
        setSearch={setSearch}
      />
      <br />
      <DataTable value={Master} globalFilter={search}>
        <Column selectionMode="multiple" />
        <Column header="DEPARTMENT NAME" field="name" />
        <Column
          header="CREATED BY"
          body={() => tableDateTemplate(new Date().toString())}
        />
        <Column
          header="CREATED ON"
          body={(rowData) => tableDateTemplate(rowData.createdAt)}
        />
        <Column header="STATUS" body={StatusTemplate} />
        <Column
          body={(row: object) => OverLayTemplateHelper(row, handleAction)}
        />
      </DataTable>
      {/* delete modal */}
      <AddNewModal
        visible={showConfirmation}
        setVisible={setShowConfirmation}
        header="Delete Department"
        primaryLabel="Delete"
        handleSaveClick={handleDelete}
      >
        <p>Are you sure that you want to delete this department?</p>
      </AddNewModal>
      {/* edit and add */}
      <AddNewModal
        visible={showAddNew}
        setVisible={toggleAddNew}
        header={isEditing ? "Department" : "New Department"}
        handleSaveClick={
          isEditing ? handleUpdateDepartment : handleCreateNewDepartment
        }
        primaryLabel={isEditing ? "Update" : "Create"}
        disabled={isEditing ? selected.name.length <= 4 : name.length <= 4}
      >
        <div className="add__new__designation__input">
          <TextInputComponent
            label="Department name"
            value={isEditing ? selected.name : name}
            onChange={isEditing ? handleSelectedChange : handleNameChange}
          />
        </div>
      </AddNewModal>
    </div>
  );
}

export default DepartmentsPage;
