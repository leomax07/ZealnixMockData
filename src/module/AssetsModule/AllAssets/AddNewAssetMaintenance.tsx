import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import moment from "moment";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import ButtonComponent from "../../../Components/Buttons/Index";
import { AssetItem, AssetMaintenances } from "../store/assetTypes";
import TextInputComponent from "../../../Components/TextInput/Index";
import DatePickerComponent from "../../../Components/DatePicker/Index";
import {
  createMaintenance,
  updateMaintenance,
} from "../store/assetMiddleware";
import { AppDispatch } from "../../../redux/store";
import { AssetMaintenanceSchema } from "../../../utils/validationSchema";

interface Props {
  visible?: boolean;
  setVisible: Function;
  width?: string;
  AssetItemData?: AssetItem;
  isEditing?: boolean;
  selectedItem?: any;
  getAllAssetMaintence:()=> void
}

export default function AddNewAssetMaintenance({
  visible,
  setVisible,
  width = "500px",
  AssetItemData,
  isEditing,
  selectedItem,
  getAllAssetMaintence
}: Props) {
  const initialState = {
    startDate: "",
    endDate: "",
    reason: "",
  };
  const dispatch = useDispatch<AppDispatch>();

  const [maintenance, setMaintenance] =
    useState<AssetMaintenances>(initialState);

  useEffect(() => {
    if (selectedItem && isEditing) {
      setMaintenance({
        ...selectedItem,
        startDate: new Date(selectedItem.startDate || ""),
        endDate: new Date(selectedItem.endDate || ""),
      });
    } else {
      setMaintenance(initialState);
    }
  }, [selectedItem]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMaintenance((prev: any) => ({ ...prev, [name]: value }));
  };
  const handleSave = async () => {
    const payload: any = {
      ...maintenance,
      startDate: moment(new Date(maintenance.startDate || ""))
        .startOf("day")
        .toISOString(),
      endDate: moment(new Date(maintenance.endDate || ""))
        .startOf("day")
        .toISOString(),
      assetId: AssetItemData?.assetId,
      assetItemId: AssetItemData?.id,
      lastAssignedToId: AssetItemData?.assignedToId,
    };
    let res;
    if (isEditing) {
      payload.assetId = selectedItem?.assetId;
      payload.assetItemId = selectedItem?.assetItemId;
      payload.lastAssignedToId = selectedItem?.lastAssignedToId;
      delete payload.assetItem;
      delete payload.lastAssignedTo;
      delete payload.asset;

      res = await dispatch(updateMaintenance(payload));
    } else {
      res = await dispatch(createMaintenance(payload));
    }
    if (res.meta.requestStatus === "fulfilled") {
      await getAllAssetMaintence()
      setVisible(!visible);
    }
  };
  const { errors, touched, handleSubmit, handleBlur, resetForm } = useFormik({
    initialValues: {
      startDate: maintenance.startDate,
      endDate: maintenance.endDate,
      reason: maintenance.reason,
    },
    validationSchema: AssetMaintenanceSchema,
    enableReinitialize: true,
    onSubmit: () => handleSave(),
  });
  useEffect(() => {
    if (visible && !isEditing) {
      setMaintenance(initialState);
    }
    if (!visible) resetForm();
  }, [visible]);
  const toggleModal = () => {
    setVisible((prev: any) => !prev);
    setMaintenance(initialState);
  };
  const footerHelper = () => (
    <div className="buttons__container">
      <ButtonComponent type="outlined" label="Cancel" onClick={toggleModal} />
      <ButtonComponent label="Save" onClick={() => handleSubmit()} />
    </div>
  );
  return (
    <div>
      <Dialog
        className="add__new__report__modal"
        visible={visible}
        onHide={toggleModal}
        header={isEditing ? "Edit Maintenance" : "Move To Maintenance"}
        footer={footerHelper}
        style={{ width }}
      >
        {isEditing ? (
          ""
        ) : (
          <div className="input__container">
            <TextInputComponent
              classNames="full__width"
              label="Asset Name"
              value={AssetItemData?.itemName}
              name="itemName"
              disabled
            />
          </div>
        )}

        {isEditing ? (
          ""
        ) : (
          <div className="input__container">
            <TextInputComponent
              classNames="full__width"
              label="Asset ID"
              value={AssetItemData?.assetItemId}
              name="assetId"
              disabled
            />
          </div>
        )}

        <div className="flex">
          <div className="input__container">
            <DatePickerComponent
              label="Maintenance Start Date"
              hourFormat="12"
              value={maintenance.startDate}
              name="startDate"
              onChange={handleChange}
              required
              onBlur={handleBlur}
              error={touched.startDate && errors.startDate}
            />
          </div>
          <div className="input__container maintenance__date">
            <DatePickerComponent
              label="Maintenance End Date"
              hourFormat="12"
              value={maintenance.endDate}
              name="endDate"
              onChange={handleChange}
              required
              onBlur={handleBlur}
              error={touched.endDate && errors.endDate}
            />
          </div>
        </div>

        <div className="input__container">
          <TextInputComponent
            classNames="full__width"
            label="Reason"
            value={maintenance?.reason}
            name="reason"
            onChange={handleChange}
            required
            onBlur={handleBlur}
            error={touched.reason && errors.reason}
          />
        </div>
      </Dialog>
    </div>
  );
}
