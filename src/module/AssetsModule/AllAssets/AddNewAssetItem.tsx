import { Dialog } from "primereact/dialog";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import ButtonComponent from "../../../Components/Buttons/Index";
import TextInputComponent from "../../../Components/TextInput/Index";
import { AssetItem } from "../store/assetTypes";
import {
  createAssetItem,
  getAllAssetItems,
  updateAssetItem,
} from "../store/assetMiddleware";
import { AppDispatch } from "../../../redux/store";
import {
  EditAssetItemSchema,
  AssetItemSchema,
} from "../../../utils/validationSchema";

interface Props {
  visible?: boolean;
  setVisible: (args?: any) => void;
  width?: string;
  assetData?: any;
  isEditing?: boolean;
  selectedItem?: AssetItem;
}

export default function AddNewAssetItem({
  visible,
  setVisible,
  width = "500px",
  assetData,
  isEditing,
  selectedItem,
}: Props) {
  const initialState = {
    assetId: "",
    itemName: "",
    quantity: 0,
  };
  const dispatch = useDispatch<AppDispatch>();

  const [assetItemState, setAssetItemState] = useState<AssetItem>(initialState);

  useEffect(() => {
    if (selectedItem && isEditing) {
      setAssetItemState({
        ...selectedItem,
      });
    } else {
      setAssetItemState(initialState);
    }
  }, [selectedItem]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAssetItemState((prev) => ({ ...prev, [name]: value }));
  };
  const fetchData = async () => {
    const defaultIncludeQuery: any = {
      filter: {
        where: {
          assetId: assetData?.id,
          status: { inq: ["in_use", "unassigned"] },
        },
        include: [{ relation: "assignedTo" }],
      },
    };
    await dispatch(getAllAssetItems(defaultIncludeQuery.filter));
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleSave = async () => {
    const payload: AssetItem = {
      ...assetItemState,
      quantity: parseInt(assetItemState?.quantity?.toString(), 10),
      assetId: assetData?.id,
    };
    let res;
    if (isEditing) {
      const editPayload: AssetItem = {
        ...assetItemState,
        assetId: assetData?.id,
      };
      res = await dispatch(updateAssetItem(editPayload));
    } else {
      res = await dispatch(createAssetItem(payload));
    }
    if (res.meta.requestStatus === "fulfilled") {
      await fetchData();
      setVisible(!visible);
    }
  };

  const { errors, touched, handleSubmit, handleBlur, resetForm } = useFormik({
    initialValues: {
      itemName: assetItemState.itemName,
      quantity: assetItemState.quantity,
    },
    validationSchema: isEditing ? EditAssetItemSchema : AssetItemSchema,
    enableReinitialize: true,
    onSubmit: () => handleSave(),
  });
  useEffect(() => {
    if (visible && !isEditing) {
      setAssetItemState(initialState);
    }
    if (!visible) resetForm();
  }, [visible]);

  const toggleModal = () => {
    setVisible((prev: any) => !prev);
    setAssetItemState(initialState);
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
        header={isEditing ? "Edit Asset" : "New Asset"}
        footer={footerHelper}
        style={{ width }}
      >
        <div className="input__container">
          <TextInputComponent
            classNames="full__width"
            label="Asset ID"
            value={
              isEditing
                ? selectedItem?.assetItemId
                : assetData?.assetCategory?.name
            }
            name="assetId"
            disabled
            onChange={handleChange}
          />
        </div>

        <div className="input__container">
          <TextInputComponent
            classNames="full__width"
            label="Item Name"
            value={assetItemState.itemName}
            name="itemName"
            required
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.itemName && errors.itemName}
          />
        </div>

        {isEditing ? (
          ""
        ) : (
          <div className="input__container">
            <TextInputComponent
              classNames="full__width"
              label="Quantity"
              value={assetItemState.quantity}
              name="quantity"
              required
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.quantity && errors.quantity}
            />
          </div>
        )}
      </Dialog>
    </div>
  );
}
