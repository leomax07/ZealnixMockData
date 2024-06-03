
import { Dialog } from "primereact/dialog";
import { ReactElement, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import ButtonComponent from "../../../Components/Buttons/Index";
import TextInputComponent from "../../../Components/TextInput/Index";
import { HOSPITAL_ID } from "../../../constants";
import { AppDispatch } from "../../../redux/store";
import { fetchAllDepartments } from "../Masters/Departments/store/departmentMiddleware";
import { BranchValidationSchema } from "../../../utils/validationSchema";
import {
  createBranchesByHospitalId,
  fetchAllBranchesByHospitalId,
  updateBranchesById,
} from "./store/branchesMiddleware";
import {
  branchInitialState,
  CreateBranchesByHospitalIDTypes,
} from "./store/branchesTypes";
import CheckboxComponent from "../../../Components/Checkbox/Index";

interface Props {
  visible: boolean;
  setVisible: Function;
  width?: string;
  selected?: CreateBranchesByHospitalIDTypes;
  isEditing?: boolean;
}

interface FooterHelperProp {
isEdit?: boolean,
updateVisible: Function,
submitHandler: Function,
}

function FooterHelper({isEdit, updateVisible, submitHandler}: FooterHelperProp) {
  const submitLabel = isEdit ? "Update" : "Create";
  return (
    <div className="buttons__container">
      <ButtonComponent
        label="Cancel"
        type="outlined"
        onClick={() => updateVisible()}
      />
      <ButtonComponent onClick={() => submitHandler()} label={submitLabel} />
    </div>
  );
};


// <================[COMPONENT]======================> //
export default function AddNewBranch({
  visible,
  setVisible,
  width = "629px",
  selected,
  isEditing,
}: Props): ReactElement {
  const dispatch = useDispatch<AppDispatch>();
  const [data, setData] =
    useState<CreateBranchesByHospitalIDTypes>(branchInitialState);

  // <=================[METHODS]=======================> //

  // Functionality used to handle form create and edit methods
  const handleCreateNewBranch = async () => {
    const payload = {
      ...data,
      hospitalId: HOSPITAL_ID,
      status: "active",
    };
    if (isEditing) {
      await dispatch(updateBranchesById(data));
    } else {
      await dispatch(createBranchesByHospitalId(payload));
    }

    const getPayload = {
      hospitalId: HOSPITAL_ID,
    };
    await dispatch(fetchAllBranchesByHospitalId(getPayload));
    setData(branchInitialState);
    setVisible(false);
  };

  //   Functionality used to handle form validations
  const { touched, handleBlur, errors, handleSubmit, resetForm } = useFormik({
    initialValues: {
      branchID: data.branchID ?? "",
      name: data.name ?? "",
      address: data.address ?? "",
      pinCode: data.pinCode ?? "",
      city: data.city ?? "",
      state: data.state ?? "",
      country: data.country ?? "",
      status: data.status ?? "active",
      email: data.email ?? "",
      phone: data.phone ?? "",
      isMainBranch: data.isMainBranch ?? false,
      hospitalId: data.hospitalId ?? "",
    },
    validationSchema: BranchValidationSchema,
    enableReinitialize: true,
    onSubmit: () => {
      handleCreateNewBranch();
    },
  });

  //   Functionality used to update input value on state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;

    if (name === "isMainBranch") {
      return setData((prev) => ({ ...prev, [name]: checked }));
    }

    return setData((prev) => ({ ...prev, [name]: value }));
  };

  //   Functionality used to handle form reset
  const handleFormReset = () => {
    resetForm();
    setData(branchInitialState);
  };

  // Functionaltiy used to handle prefill for edit
  const handlePrefill = (prefillData: any) => {
    setData(prefillData);
  };

  // <=================[LIFE CYCLE & WATCHERS]=======================> //

  useEffect(() => {
    dispatch(fetchAllDepartments());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selected && isEditing && visible) handlePrefill(selected);
  }, [selected, isEditing, visible]);

  useEffect(() => {
    if (!visible) handleFormReset();
  }, [visible]);

  // <=================[TEMPLATE]=======================> //

  return (
    <div className="add__new__branch__conatainer">
      <Dialog
        className="add__new__dialog"
        visible={visible}
        onHide={() => setVisible()}
        footer={<FooterHelper isEdit={isEditing} submitHandler={handleSubmit} updateVisible={setVisible} />}
        style={{ width }}
        header="Branch details"
      >
        <div className="each__item">
          <div className="branch__name">
            <TextInputComponent
              label="Branch Name"
              value={data.name}
              name="name"
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.name && errors.name}
            />
          </div>
          <div className="input">
            <TextInputComponent
              label="Branch ID"
              value={data.branchID}
              name="branchID"
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.branchID && errors.branchID}
            />
          </div>
        </div>
        <div className="each__item">
          <div className="input">
            <TextInputComponent
              label="Address"
              value={data.address}
              name="address"
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched?.address && errors.address}
            />
          </div>
        </div>
        <div className="each__item">
          <div className="email input">
            <TextInputComponent
              label="E-mail"
              value={data.email}
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched?.email && errors.email}
            />
          </div>
          <div className="input">
            <TextInputComponent
              label="Phone Number"
              value={data.phone}
              name="phone"
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched?.phone && errors.phone}
            />
          </div>
        </div>
        <div className="each__item">
          <CheckboxComponent
            label="Main Branch"
            checkboxId="mainBranch"
            onChange={handleChange}
            name="isMainBranch"
            checked={data.isMainBranch}
          />
        </div>
      </Dialog>
    </div>
  );
}
