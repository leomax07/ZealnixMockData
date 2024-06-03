import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import FileUploadComponent from "../../../Components/FileUplodComponent/Index";
import FilterDropdown from "../../../Components/FilterDropdown/Index";
import TextInputComponent from "../../../Components/TextInput/Index";
import { AppDispatch, RootState } from "../../../redux/store";
import ButtonComponent from "../../../Components/Buttons/Index";
import { AssetType } from "../store/assetTypes";
import {
  createAsset,
  getAllAssetCategories,
  getAssets,
  updateAsset,
} from "../store/assetMiddleware";
import { BRANCH_ID, HOSPITAL_ID } from "../../../constants";
import "./assetsStyle.scss";
import { assetSchema } from "../../../utils/validationSchema";

interface Props {
  visible?: boolean;
  width?: string;
  setVisible: Function;
  isEditing?: boolean;
  selectedItem?: AssetType;
}

function AddNewAsset({
  visible,
  setVisible,
  width = "650px",
  isEditing,
  selectedItem,
}: Props) {
  const initialState = {
    name: "",
    hospitalId: "",
    branchId: "",
    assetCategoryId: "",
    imageUrl: "",
  };
  const [assetdata, setAssetData] = useState<AssetType>(initialState);

  const dispatch = useDispatch<AppDispatch>();
  const { assetCategories } = useSelector<RootState, RootState["assetReducer"]>(
    (state) => state.assetReducer
  );

  useEffect(() => {
    dispatch(getAllAssetCategories({}));
  }, []);

  useEffect(() => {
    if (selectedItem && isEditing) {
      setAssetData({
        ...selectedItem,
      });
    } else {
      setAssetData(initialState);
    }
  }, [selectedItem]);

  const handleSave = async () => {
    // dispatch(getAssets({}));
    setVisible(!visible);
    // }
  };

  const { errors, touched, handleSubmit, handleBlur } = useFormik({
    initialValues: {
      name: assetdata?.name,
      assetCategoryId: assetdata?.assetCategoryId,
    },
    validationSchema: assetSchema,
    enableReinitialize: true,
    onSubmit: () => {
      handleSave();
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAssetData((prev) => ({ ...prev, [name]: value }));
  };
  const handleFileUpload = (files: any) => {
    setAssetData((prev) => ({ ...prev, imageUrl: files.target.value[0] }));
  };

  const footerHelper = () => (
    <div className="buttons__container">
      <ButtonComponent
        type="outlined"
        label="Cancel"
        onClick={() => setVisible()}
      />
      <ButtonComponent label="Save" onClick={() => handleSubmit()} />
    </div>
  );

  return (
    <Dialog
      className="add__new__report__modal"
      visible={visible}
      onHide={() => setVisible(false)}
      header={isEditing ? "Edit Asset" : "New Asset"}
      footer={footerHelper}
      style={{ width }}
    >
      <div className="input__container">
        <div className="asset__input ">
          <TextInputComponent
            classNames="full__width"
            label="Asset Name"
            name="name"
            value={assetdata?.name}
            required
            onBlur={handleBlur}
            onChange={handleChange}
            error={touched.name && errors.name}
          />
        </div>
      </div>

      <div className="input__container">
        <div className="asset__input ">
          <FilterDropdown
            classNames="full__width"
            label="Category"
            items={assetCategories}
            name="assetCategoryId"
            optionLabel="name"
            optionValue="id"
            value={assetdata?.assetCategoryId}
            required
            onBlur={handleBlur}
            handleChange={handleChange}
            error={touched.assetCategoryId && errors.assetCategoryId}
          />
        </div>
      </div>

      <div className="input__container">
        <div className="asset__input">
          <div className="flex__1">
            <FileUploadComponent
              placeholder={assetdata?.imageUrl}
              name="profilePicUrl"
              label="Asset Picture"
              subText="Upload a Profile Pic, Max 5 MB"
              onChange={(files) => handleFileUpload(files)}
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default AddNewAsset;
