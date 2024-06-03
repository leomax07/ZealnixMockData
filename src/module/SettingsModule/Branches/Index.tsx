import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonComponent from "../../../Components/Buttons/Index";
import { branch } from "../mock";
import {
  hotlinkTemplateHelper,
  OverLayTemplateHelper,
  StatusTemplate,
  tableDateTemplate,
} from "../../../Components/DataTableTemplates/Index";
import SearchInputComponent from "../../../Components/SearchInput/searchInput";
import { DISABLED, ENABLED, HOSPITAL_ID } from "../../../constants";
import AddNewBranch from "./AddNewBranch";
import { AppDispatch, RootState } from "../../../redux/store";
import {
  deleteBranchesByID,
  fetchAllBranchesByHospitalId,
  patchBranchesById,
} from "./store/branchesMiddleware";
import AddNewModal from "../../../Components/AddNewModal/Index";
import { branchInitialState, PatchBranchesTypes } from "./store/branchesTypes";

interface ActionType {
  type: string;
  payload: any;
}

export default function BranchesIndexComponent(): ReactElement {
  const [showAddNew, setShowAddNew] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [selected, setSelected] = useState(branchInitialState);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { branches } = useSelector<RootState, RootState["branchesReducers"]>(
    (state) => state.branchesReducers
  );

  const fetchData = async () => {
    await dispatch(
      fetchAllBranchesByHospitalId({ hospitalId: HOSPITAL_ID, search })
    );
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
  };

  const toggleBranchDialog = (type: "add" | "edit") => {
    const isEdit = type === "edit";
    setShowAddNew((prev) => !prev);
    setIsEditing(isEdit);
  };

  const handleStatusChange = async (id: string, status: string) => {
    const payload: PatchBranchesTypes = {
      id,
      status: status === ENABLED ? DISABLED : ENABLED,
    };
    await dispatch(patchBranchesById(payload));
    await fetchData();
  };

  const handleEdit = (action: ActionType) => {
    const { type, payload } = action;
    switch (type) {
      case "delete":
        setShowDeleteConfirmation(true);
        setSelectedId(payload.id);
        break;
      case "disable":
        handleStatusChange(payload.id, payload.status);
        break;
      case "edit":
        setSelected(action.payload);
        setIsEditing(true);
        setShowAddNew(true);
        break;
      default:
        break;
    }
  };

  const handleDeleteConfirmation = async () => {
    if (selectedId) await dispatch(deleteBranchesByID(selectedId));
    setSelectedId("");
    setShowDeleteConfirmation(false);
    await fetchData();
  };

  const toggleDeleteConfirmation = () => {
    setShowDeleteConfirmation((prev) => !prev);
  };

  return (
    <div className="branches__index__component page__container">
      <div className="header__container">
        <div className="left header">Branches</div>
        <div className="right">
          <SearchInputComponent value={search} onChange={handleFilterChange} />
          <ButtonComponent
            label="Add new"
            onClick={() => toggleBranchDialog("add")}
          />
        </div>
      </div>

      <div className="branches__table__container">
        <DataTable
          value={branch}
          rowsPerPageOptions={[5, 10, 25, 50]}
          paginator
          rows={10}
        >
          <Column selectionMode="multiple" />
          <Column header="Name" field="name" />
          <Column
            header="Branch ID"
            field="branchID"
            body={(row) => hotlinkTemplateHelper(row.branchID)}
          />
          <Column header="Address" field="address" />
          <Column header="Email" field="email" />
          <Column header="Phone number" field="phone" />
          <Column
            header="Created on"
            field="date"
            body={tableDateTemplate(new Date().toString())}
          />
          <Column header="STATUS" body={StatusTemplate} />
          <Column
            body={(row: object) => OverLayTemplateHelper(row, handleEdit)}
          />
        </DataTable>
      </div>
      <AddNewBranch
        visible={showAddNew}
        setVisible={() => toggleBranchDialog("edit")}
        isEditing={isEditing}
        selected={selected}
      />
      <AddNewModal
        visible={showDeleteConfirmation}
        setVisible={toggleDeleteConfirmation}
        header="Confirmation"
        handleSaveClick={handleDeleteConfirmation}
        primaryLabel="Delete Branch"
      >
        <p>Are you sure you want to delete this branch ?</p>
      </AddNewModal>
    </div>
  );
}
