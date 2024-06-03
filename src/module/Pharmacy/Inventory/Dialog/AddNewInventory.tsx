import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../redux/store";
import ButtonComponent from "../../../../Components/Buttons/Index";
import FilterDropdown from "../../../../Components/FilterDropdown/Index";
import TextInputComponent from "../../../../Components/TextInput/Index";
import FileUploadComponent from "../../../../Components/FileUplodComponent/Index";
import { pharmacyInventoryValidationSchema } from "../../../../utils/validationSchema";
import {
  createNewDrug,
  editDrug,
  fetchInventoryStocks,
} from "../../Store/pharmacyMiddleware";
import { removeEmptyObject } from "../../../../utils/reusableFunctions";

interface AddNewDrugPropType {
  visible: boolean;
  setVisible: (args: boolean) => void;
  width: string;
  isEdit?: boolean;
  rowData?: any;
}

interface AddNewDrugDialogFooterPropType {
  cancelHandler: (args: any) => void;
  submissionHandler: (args: any) => void;
}

interface DrugDetailsType {
  _id?: string;
  image: string;
  drugId: string;
  name?: string;
  manufacturer: string;
  category: string;
}

const defaultValue = {
  image: "",
  drugId: "",
  name: "",
  manufacturer: "",
  category: "",
  price: "",
};

function AddNewInventoryFooterTemplate({
  submissionHandler,
  cancelHandler,
}: AddNewDrugDialogFooterPropType) {
  return (
    <div className="footer__button__container">
      <ButtonComponent type="outlined" label="Cancel" onClick={cancelHandler} />
      <ButtonComponent label="Save" onClick={submissionHandler} />
    </div>
  );
}

function AddNewInventory({
  visible,
  setVisible,
  width,
  isEdit,
  rowData,
}: AddNewDrugPropType) {
  const dispatch = useDispatch<AppDispatch>();
  const [drugDetail, setdrugDetail] = useState<DrugDetailsType>(defaultValue);
  const [isSubmitTriggerd, setIsSubmitTriggerd] = useState(false);

  // <=================[METHODS]=================> //

  // Functionality used to list inventory stock
  const listInventoryStocks = () => {
    dispatch(fetchInventoryStocks());
  };

  // Functionality used to handle input prefill while edit
  const handlePrefill = () => {
    setdrugDetail(rowData);
  };

  // Functionality used to handle input state changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "image") {
      console.log("triggered");
      setdrugDetail((PrevState) => ({ ...PrevState, [name]: value[0] }));
      return;
    }
    setdrugDetail((PrevState) => ({ ...PrevState, [name]: value }));
  };

  // Functionality used to handle dialog close
  const handleClose = () => {
    setVisible(false);
    setdrugDetail(defaultValue);
  };

  // Functionality used ot handle payload handling
  const payloadHandler = () => {
    const data = removeEmptyObject(drugDetail);
    if (isEdit) delete data.totalStock;
    return data;
  };

  // Functionality used to handle API submit
  const handleSave = async () => {
    handleClose();
    // statement
  };

  // <=================[VALIDATIONS]=================> //
  const { touched, errors, handleBlur, handleSubmit, resetForm } = useFormik({
    initialValues: {
      drugId: drugDetail.drugId ?? "",
      name: drugDetail.name ?? "",
      manufacturer: drugDetail.manufacturer ?? "",
      category: drugDetail.category ?? "",
    },
    enableReinitialize: true,
    validationSchema: pharmacyInventoryValidationSchema,
    onSubmit: () => {
      handleSave();
    },
  });

  // <=================[LIFECYCLE & WATCHERS]=================> //

  // watcher used to prefill drug details when edit
  useEffect(() => {
    if (isEdit) handlePrefill();
  }, [isEdit]);

  // watcher used to reset form validation
  useEffect(() => {
    if (!visible && isSubmitTriggerd) {
      resetForm();
      setIsSubmitTriggerd(false);
    }
  }, [visible]);

  const data = [
    "Medications and Pharmaceuticals",
    "Medical Equipment",
    "Personal Protective Equipment (PPE)",
    "Surgical Supplies",
    "Consumables",
    "Diagnostic Tools",
    // "Orthopedic Supplies",
    // "Durable Medical Equipment (DME)",
    // "Laboratory Supplies",
    // "First Aid Supplies"
  ];

  // <=================[TEMPLATE]=================> //

  return (
    <div>
      <Dialog
        className="add__new__modal"
        style={{ width }}
        visible={visible}
        onHide={handleClose}
        footer={
          <AddNewInventoryFooterTemplate
            cancelHandler={handleClose}
            submissionHandler={() => {
              handleSubmit();
              setIsSubmitTriggerd(true);
            }}
          />
        }
        header="New Inventory Item"
      >
        <div className="add__new__form__container">
          <FileUploadComponent
            label="Profile Picture"
            subText="Upload a Profile Pic * Max 5 MB"
            name="image"
            onChange={handleChange}
            placeholder={drugDetail.image}
          />
          <div className="container__inputs__split">
            <TextInputComponent
              label="Drug ID"
              name="drugId"
              value={drugDetail.drugId}
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.drugId && errors.drugId}
            />
            <TextInputComponent
              label="Drug Name"
              name="name"
              value={drugDetail.name}
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.name && errors.name}
            />
            <TextInputComponent
              label="Manufacturer"
              name="manufacturer"
              value={drugDetail.manufacturer}
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.manufacturer && errors.manufacturer}
            />
            <FilterDropdown
              label="Category"
              classNames="full__width"
              name="category"
              items={data}
              onBlur={handleBlur}
              handleChange={handleChange}
              error={touched.category && errors.category}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default AddNewInventory;
