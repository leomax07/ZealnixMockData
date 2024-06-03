import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  OverLayTemplateHelper,
  StatusTemplate,
  tableDateTemplate,
  ProfileImageTemplate,
  paginatorTemplate,
} from "../../../Components/DataTableTemplates/Index";
import { PatientPayload, PatientType } from "../store/patientTypes";
import { deletePatient, getPatients } from "../store/patientMiddleware";
import { AppDispatch } from "../../../redux/store";
import {
  BRANCH_ID,
  HOSPITAL_ID,
  ROWS_PER_PAGE,
  ROWS_PER_PAGE_OPTIONS,
  SORT_BY_CREATEDAT_DESC,
} from "../../../constants";
import { setEditPatient } from "../store/patientsReducer";
import AddNewModal from "../../../Components/AddNewModal/Index";

interface Props {
  data: any;
}

function PatientsTable({ data }: Props) {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  // Functionality used to handle patient list
  const listPatient = async () => {
    const payload = {
      order: SORT_BY_CREATEDAT_DESC,
      where: {
        hospitalId: HOSPITAL_ID,
        branchId: BRANCH_ID,
      },
    };
    await dispatch(getPatients(payload));
  };

  // Functionality used to handle overlay actions
  const handleAction = async (e: PatientPayload) => {
    if (e.type === "delete") {
      setSelectedId(e.payload.id);
      setShowConfirmation(true);
    } else if (e.type === "edit") {
      await dispatch(setEditPatient(e.payload));
      navigate("/patients/edit");
    }
  };

  // functionality used to handle delete patient
  const handleDelete = async () => {
    try {
      const deleteRes: any = await dispatch(deletePatient(selectedId));
      if (!deleteRes.error) {
        setShowConfirmation(false);
        await listPatient();
        navigate("/patients/all");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Functionality used to handle row click and patient profile view navigation
  const handleSelect = async (e: any) => {
    const target = e.originalEvent?.target?.className;
    const patientId = e.data?.id;
    const stringMatch = target.match(/overlay_action/g);
    if (stringMatch === null)
      navigate(`/patients/detail/${patientId}/appointments`);
  };

  return (
    <>
      <DataTable
        value={data || []}
        onRowClick={(e: any) => handleSelect(e)}
        paginator
        rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
        rows={ROWS_PER_PAGE}
        paginatorTemplate={paginatorTemplate}
      >
        <Column header="NAME" body={ProfileImageTemplate} />
        {/* <Column
					header="DEPARTMENT"
					body={CategoryTemplateHelper}
				/> */}
        {/* <Column header="DOCTOR" field="name" /> */}
        <Column header="CONTACT NUMBER" field="phone" />
        <Column
          header="LAST VISIT"
          body={() => tableDateTemplate(new Date().toString())}
        />
        <Column header="STATUS" body={StatusTemplate} />
        <Column
          header=""
          body={(row: object) => OverLayTemplateHelper(row, handleAction)}
        />
      </DataTable>
      <AddNewModal
        visible={showConfirmation}
        setVisible={setShowConfirmation}
        header="Delete Patient"
        primaryLabel="Delete"
        handleSaveClick={handleDelete}
      >
        <p>Are you sure, you want to delete this patient?</p>
      </AddNewModal>
    </>
  );
}

export default PatientsTable;
