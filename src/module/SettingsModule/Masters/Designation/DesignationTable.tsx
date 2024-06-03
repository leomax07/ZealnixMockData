import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { ReactElement, useState } from "react";
import { useDispatch } from "react-redux";
import AddNewModal from "../../../../Components/AddNewModal/Index";
import {
  OverLayTemplateHelper,
  StatusTemplate,
  paginatorTemplate,
  tableDateTemplate,
} from "../../../../Components/DataTableTemplates/Index";
import TextInputComponent from "../../../../Components/TextInput/Index";
import {
  DISABLED,
  ENABLED,
  ROWS_PER_PAGE,
  ROWS_PER_PAGE_OPTIONS,
} from "../../../../constants";
import { AppDispatch } from "../../../../redux/store";
import {
  deleteDesignationById,
  fetchAllDestinations,
  patchDesignationById,
  updateDesignation,
} from "./store/designation.middleware";
import { DesignationType } from "./store/designation.types";

interface Props {
  data: any[];
  search?: string;
}
interface ActionType {
  type: string;
  payload: object | any;
}

export default function DesignationTable({
  data = [],
  search,
}: Props): ReactElement {
  const [showEdit, setShowEdit] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [selectedItem, setSelectedItem] = useState<DesignationType>({
    id: "",
    name: "",
    status: "",
    branch: "",
    hospital: "",
    createdBy: "",
  });
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedItem((prev) => ({ ...prev, name: e.target.value }));
  };

  const toggleEditModal = () => {
    setShowEdit((prev) => !prev);
  };

  const handleEditAction = (row: DesignationType) => {
    setSelectedItem(row);
    toggleEditModal();
  };

  const handleDelete = async () => {
    await dispatch(deleteDesignationById(selectedId));
    setSelectedId("");
    setShowConfirmation(false);
    await dispatch(fetchAllDestinations());
  };

  const handleStatusChange = async (id: string, status: string) => {
    const payload = {
      id,
      status: status === ENABLED ? DISABLED : ENABLED,
    };
    await dispatch(patchDesignationById(payload));
    await dispatch(fetchAllDestinations());
  };

  const handleAction = (action: ActionType) => {
    switch (action.type) {
      case "edit":
        handleEditAction(action.payload);
        return;
      case "delete":
        setShowConfirmation(true);
        setSelectedId(action.payload.id);
        return;
      case "disable":
        handleStatusChange(action.payload.id, action.payload.status);
        break;
      default:
        break;
    }
  };

  const handleSave = async () => {
    await dispatch(updateDesignation(selectedItem));
    await dispatch(fetchAllDestinations());
    toggleEditModal();
  };

  return (
    <div className="designation__table__container">
      <AddNewModal
        visible={showEdit}
        setVisible={toggleEditModal}
        header="Designation"
        primaryLabel="Update"
        handleSaveClick={handleSave}
      >
        <TextInputComponent
          value={selectedItem.name}
          label="Role name"
          onChange={handleChange}
        />
      </AddNewModal>
      <AddNewModal
        header="Delete confirmation"
        visible={showConfirmation}
        setVisible={setShowConfirmation}
        handleSaveClick={handleDelete}
        primaryLabel="Delete"
      >
        <p>Are you sure thast you wnat to delete this designation?</p>
      </AddNewModal>
      <DataTable
        value={data}
        globalFilter={search}
        paginator
        rows={ROWS_PER_PAGE}
        rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
        paginatorTemplate={paginatorTemplate}
      >
        <Column selectionMode="multiple" />
        <Column header="DESIGNATION" field="name" />
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
    </div>
  );
}
