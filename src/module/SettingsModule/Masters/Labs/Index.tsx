import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import AddNewModal from "../../../../Components/AddNewModal/Index";
import FilterDropdown from "../../../../Components/FilterDropdown/Index";
import GridAndListToggleHeader from "../../../../Components/GridAndListToggleHeader/Index";
import TextInputComponent from "../../../../Components/TextInput/Index";
import { BRANCH_ID, HOSPITAL_ID } from "../../../../constants";
import { AppDispatch, RootState } from "../../../../redux/store";
import LabsTable from "./LabsMastersTable";
import {
  createLabByHospitalId,
  fetchAllLabsByHospitalId,
} from "./store/labsMiddleware";
import { labSchema } from "../../../../utils/validationSchema";

const labDefaultFormValue = {
  labID: "",
  name: "",
  departmentId: "",
  status: "active",
  hospitalId: HOSPITAL_ID,
  branchId: BRANCH_ID,
};

function LabMasters() {
  const [view, setView] = useState("list");
  const [showAddNew, setShowAddNew] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { departments } = useSelector<
    RootState,
    RootState["departmentsReducers"]
  >((state) => state.departmentsReducers);
  const [state, setState] = useState(labDefaultFormValue);

  // remove once view is used
  console.log(view);

  // <=================[~METHODS~]=================> //
  const handleCreateNew = async () => {
    const response = await dispatch(createLabByHospitalId(state));
    if (response.meta.requestStatus === "fulfilled") {
      await dispatch(fetchAllLabsByHospitalId(HOSPITAL_ID));
      setShowAddNew(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const toggleAddNew = () => {
    setShowAddNew((prev) => !prev);
  };

  // <=================[~VALIDATIONS~]=================> //
  const { errors, touched, handleSubmit, handleBlur, resetForm } = useFormik({
    initialValues: {
      name: state.name ?? "",
      labID: state.labID ?? "",
      departmentId: state.departmentId ?? "",
    },
    validationSchema: labSchema,
    enableReinitialize: true,
    onSubmit: () => {
      handleCreateNew();
    },
  });

  const formResetHandler = () => {
    resetForm();
    setState(labDefaultFormValue);
  };

  // <=================[~LIFE CYCLE & WATCHERS~]=================> //
  useEffect(() => {
    const payload = {
      hospitalId: HOSPITAL_ID,
    };
    dispatch(fetchAllLabsByHospitalId(payload));
  }, []);

  useEffect(() => {
    if (!showAddNew) formResetHandler();
  }, [showAddNew]);

  // <=================[~TEMPLATE~]=================> //
  return (
    <div>
      <GridAndListToggleHeader
        changeTab={setView}
        handleAddNewClick={toggleAddNew}
        setSearch={setSearch}
      />
      <br />
      <LabsTable search={search} />
      <AddNewModal
        visible={showAddNew}
        setVisible={setShowAddNew}
        header="New Lab"
        className="add__new__label"
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
    </div>
  );
}

export default LabMasters;
