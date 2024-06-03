import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { BRANCH_ID, HOSPITAL_ID, STAFF_TYPE } from "../../../constants";
import TimePicker from "../../../Components/TimePicker";
import { StaffValidationSchema } from "../../../utils/validationSchema";
import TextInputComponent from "../../../Components/TextInput/Index";
import FilterDropdown from "../../../Components/FilterDropdown/Index";
import FileUploadComponent from "../../../Components/FileUplodComponent/Index";
import FooterTemplate, {
  NewStaffStateType,
  NewStaffDialogProps,
  initialValue,
} from "./newStaffHelper";
import {
  createNewStaff,
  getStaffsByType,
  updateStaff,
} from "../store/staffsMiddleware";
import {
  convertTimeStringToMinutes,
  removeEmptyObject,
} from "../../../utils/reusableFunctions";
import { StaffDetail } from "../store/sfattsTypes";

function AddNewStaff({
  isEdit,
  visible,
  setVisible,
  rowData,
  width,
  closeDialog,
}: NewStaffDialogProps) {
  const { type } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { departments } = useSelector<
    RootState,
    RootState["departmentsReducers"]
  >((state) => state.departmentsReducers);
  const { designations } = useSelector<
    RootState,
    RootState["designationReducers"]
  >((state) => state.designationReducers);
  const [formData, setFormData] = useState<NewStaffStateType>(initialValue);

  // <=================[METHODS]========================> //

  // Functionality used to reset the form with validations
  const formReset = () => {
    setFormData(initialValue);
  };

  // Functionality used to handle dialog close and form reset
  const handleClose = () => {
    setVisible(false);
    formReset();
  };

  // Functionality used to list staff details
  const listStaffs = async () => {
    const filter = {
      filter: {
        where: { type },
        include: [
          {
            relation: "department",
          },
        ],
      },
    };
    await dispatch(getStaffsByType(filter));
  };

  // Funtionality used to handle input change
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    if (name === "profileImageUrl") {
      setFormData((prev) => ({ ...prev, [name]: value[0] }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Functionality used to handle Dialog prefill while edit
  const handlePrefill = (staffData: StaffDetail | null) => {
    if (staffData !== null) setFormData(staffData);
  };

  // Functionality used to handle payload for create and edit
  const handlePayload = () => {
    let data: StaffDetail = {
      ...formData,
      dutyInTime: convertTimeStringToMinutes(formData.dutyInTime) || 10,
      dutyOutTime: convertTimeStringToMinutes(formData.dutyOutTime) || 500,
    };
    delete data.department;
    data = removeEmptyObject(data);
    return data;
  };

  // Functionality used to submit form details
  const handleSave = async () => {
    await handleClose();
    await closeDialog();

  };

  // <=================[VALIDATION]========================> //

  const { errors, touched, handleSubmit, handleBlur, resetForm } = useFormik({
    initialValues: {
      profileImageUrl: formData.profileImageUrl ?? "",
      name: formData.name ?? "",
      type: formData.type ?? "",
      departmentId: formData.departmentId ?? "",
      email: formData.email ?? "",
      phone: formData.phone ?? "",
      designationId: formData.designationId ?? "",
      dutyInTime: formData.dutyInTime ?? "",
      dutyOutTime: formData.dutyOutTime ?? "",
      hospitalId: HOSPITAL_ID,
      branchId: BRANCH_ID,
      status: "active",
      salt: "10",
    },
    validationSchema: StaffValidationSchema,
    enableReinitialize: true,
    onSubmit: () => handleSave(),
  });

  // <=================[LIFE CYCLE & WATCHERS]========================> //

  // watcher used to prefill form fields if rowdata occured
  useEffect(() => {
    if (isEdit) handlePrefill(rowData);
  }, [rowData]);

  // watcher used to reset the form while unmount
  useEffect(() => {
    if (visible && !isEdit) {
      setFormData(initialValue);
    }

    if (!visible) resetForm();
  }, [visible]);

  // <=================[TEMPLATE]========================> //
  return (
    <div>
      <Dialog
        visible={visible}
        header={isEdit ? "Edit Staff" : "New Staff"}
        onHide={() => closeDialog()}
        footer={
          <FooterTemplate
            isEdit={isEdit}
            submitHandler={handleSubmit}
            CancelHandler={closeDialog}
          />
        }
        style={{ width }}
      >
        <div className="add__new__staff__container">
          <FileUploadComponent
            label="Profile picture"
            name="profileImageUrl"
            onChange={handleChange}
            placeholder={formData.profileImageUrl}
          />
          <div className="staff__details__container">
            <TextInputComponent
              label="Name"
              name="name"
              onChange={handleChange}
              value={formData.name}
              onBlur={handleBlur}
              error={touched.name && errors.name}
            />
            <FilterDropdown
              label="Staff type"
              classNames="full__width"
              name="type"
              items={STAFF_TYPE}
              optionLabel="label"
              optionValue="value"
              onBlur={handleBlur}
              handleChange={handleChange}
              value={formData.type}
              error={touched.type && errors.type}
            />
            <FilterDropdown
              label="Department"
              classNames="full__width"
              items={departments}
              optionLabel="name"
              optionValue="id"
              onBlur={handleBlur}
              handleChange={handleChange}
              value={formData.departmentId}
              name="departmentId"
              error={touched.departmentId && errors.departmentId}
            />
            <TextInputComponent
              label="Email"
              value={formData.email}
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.email && errors.email}
            />
            <TextInputComponent
              label="Contact Number"
              name="phone"
              value={formData.phone}
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.phone && errors.phone}
            />
            <FilterDropdown
              label="Designation"
              classNames="full__width"
              items={designations}
              optionLabel="name"
              optionValue="id"
              onBlur={handleBlur}
              handleChange={handleChange}
              value={formData.designationId}
              name="designationId"
              error={touched.designationId && errors.designationId}
            />
            <TimePicker
              label="Duty in"
              name="dutyInTime"
              value={formData.dutyInTime}
              onChange={handleChange}
              error={touched.dutyInTime && errors.dutyInTime}
            />
            <TimePicker
              label="Duty out"
              name="dutyOutTime"
              value={formData.dutyOutTime}
              onChange={handleChange}
              error={touched.dutyOutTime && errors.dutyOutTime}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default AddNewStaff;
