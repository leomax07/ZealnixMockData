import React, { useEffect, ReactElement, useState } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import AddNewModal from "../../../../Components/AddNewModal/Index";
import {
  CategoryTemplateHelper,
  hotlinkTemplateHelper,
  OverLayTemplateHelper,
  StatusTemplate,
  tableDateTemplate,
} from "../../../../Components/DataTableTemplates/Index";
import FilterDropdown from "../../../../Components/FilterDropdown/Index";
import TextInputComponent from "../../../../Components/TextInput/Index";
import {
  DISABLED,
  ENABLED,
  HOSPITAL_ID,
  PHARMACY_STOCK_DATA,
} from "../../../../constants";
import { AppDispatch, RootState } from "../../../../redux/store";
import { fetchAllDepartments } from "../Departments/store/departmentMiddleware";
import {
  deleteLabById,
  fetchAllLabsByHospitalId,
  patchLabsById,
  updateLabById,
} from "./store/labsMiddleware";
import { labSchema } from "../../../../utils/validationSchema";

interface Props {
  search?: string;
}

const defaultFormValue = {
  id: "",
  labID: "",
  name: "",
  departmentId: "",
};

export default function LabsTable({ search }: Props): ReactElement {
  const { labs } = useSelector<RootState, RootState["labsReducers"]>(
    (state) => state.labsReducers
  );
  const { departments } = useSelector<
    RootState,
    RootState["departmentsReducers"]
  >((state) => state.departmentsReducers);
  const dispatch = useDispatch<AppDispatch>();
  const [showAddNew, setShowAddNew] = useState(false);
  const [state, setState] = useState(defaultFormValue);
  const [selectedId, setSelectedId] = useState("");
  const [showConfirmations, setShowConfirmations] = useState(false);

  // <=================[METHODS]=================> //
  const fetchData = async () => {
    await dispatch(fetchAllDepartments());
  };

  const handleUpdateLabMaster = async () => {
    await dispatch(updateLabById(state));
    setShowAddNew(false);
    const payload = {
      hospitalId: HOSPITAL_ID,
    };
    await dispatch(fetchAllLabsByHospitalId(payload));
  };

  const handleDelete = async () => {
    const response = await dispatch(deleteLabById(selectedId));
    if (response.meta.requestStatus === "fulfilled") {
      await dispatch(fetchAllLabsByHospitalId(HOSPITAL_ID));
      setSelectedId("");
      setShowConfirmations(false);
    }
  };

  const handleDisableLab = async (id: string, status: string) => {
    const payload = {
      id,
      status: status === ENABLED ? DISABLED : ENABLED,
    };
    const response = await dispatch(patchLabsById(payload));
    if (response.meta.requestStatus === "fulfilled") {
      await dispatch(fetchAllLabsByHospitalId(HOSPITAL_ID));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleAction = (action: object | any) => {
    const data = { ...action.payload };
    switch (action.type) {
      case "edit":
        delete data.department;
        setState(data);
        setShowAddNew(true);
        break;
      case "delete":
        setSelectedId(action.payload.id);
        setShowConfirmations(true);
        break;
      case "disable":
        handleDisableLab(action.payload.id, action.payload.status);
        break;
      default:
    }
  };

  // <=================[VALIDATIONS]=================> //
  const { errors, touched, handleSubmit, handleBlur, resetForm } = useFormik({
    initialValues: {
      name: state.name ?? "",
      labID: state.labID ?? "",
      departmentId: state.departmentId ?? "",
    },
    validationSchema: labSchema,
    enableReinitialize: true,
    onSubmit: () => {
      handleUpdateLabMaster();
    },
  });

  const formResetHandler = () => {
    console.log("form reset");
    setState(defaultFormValue);
    resetForm();
  };
  // <=================[LIFE CYCLE & WATCHERS]=================> //

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!showAddNew) formResetHandler();
  }, [showAddNew]);

  // <=================[TEMPALTE]=================> //

  return (
    <div className="designation__table__container">
      <DataTable value={labs || PHARMACY_STOCK_DATA} globalFilter={search}>
        <Column selectionMode="multiple" />
        <Column header="LAB NAME" field="name" />
        <Column
          header="LAB ID"
          field="labId"
          body={(row) => hotlinkTemplateHelper(row?.labID || "LZ-01")}
        />
        <Column
          header="DEAPARTMENT"
          body={(rowData) =>
            CategoryTemplateHelper(rowData.department?.name || "")
          }
        />
        <Column
          header="CREATED BY"
          body={() => tableDateTemplate(new Date().toString())}
        />
        <Column
          header="CREATED ON"
          body={() => tableDateTemplate(new Date().toString())}
        />
        <Column header="STATUS" body={StatusTemplate} />
        <Column
          body={(row: object) => OverLayTemplateHelper(row, handleAction)}
        />
      </DataTable>
      <AddNewModal
        visible={showAddNew}
        setVisible={setShowAddNew}
        header="Update Lab"
        className="add__new__label"
        primaryLabel="Update"
        handleSaveClick={() => handleSubmit()}
      >
        <div className="add__new__masters__container">
          <div className="two__input">
            <div className="half">
              <TextInputComponent
                label="Lab ID"
                value={state.labID}
                name="labID"
                required
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.labID && errors.labID}
              />
            </div>
            <div className="half">
              <TextInputComponent
                label="Lab Name"
                value={state.name}
                name="name"
                required
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.name && errors.name}
              />
            </div>
          </div>
          <div className="half">
            <FilterDropdown
              label="Department"
              classNames="full__width"
              items={departments}
              optionValue="id"
              optionLabel="name"
              name="departmentId"
              value={state.departmentId}
              required
              onBlur={handleBlur}
              handleChange={handleChange}
              error={touched.departmentId && errors.departmentId}
            />
          </div>
        </div>
      </AddNewModal>
      <AddNewModal
        visible={showConfirmations}
        setVisible={setShowConfirmations}
        primaryLabel="Delete"
        header="Delete Lab"
        handleSaveClick={handleDelete}
      >
        <p>Are you sure, you want to delete this lab?</p>
      </AddNewModal>
    </div>
  );
}
