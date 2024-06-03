import { Dialog } from "primereact/dialog";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ButtonComponent from "../../../Components/Buttons/Index";
import TextInputComponent from "../../../Components/TextInput/Index";
import { AssetItem } from "../store/assetTypes";
import FilterDropdown from "../../../Components/FilterDropdown/Index";
import { AppDispatch, RootState } from "../../../redux/store";
import {  updateAssetItem } from "../store/assetMiddleware";
import { getStaffsByType } from "../../Staffs/store/staffsMiddleware";

interface Props {
  visible?: boolean;
  setVisible: (args:any)=> void;
  width?: string;
  AssetItemData?: AssetItem;
  getAssetItems:()=>void
}

export default function AssignAsset({
  visible,
  setVisible,
  width = "500px",
  AssetItemData,
  getAssetItems,
}: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const initialState = {
    assignedToId: "",
  };
  const [assignAsset, setAssignAsset] = useState<any>(initialState);
  const { staffs } = useSelector<RootState, RootState["staffsReducers"]>(
    (state) => state.staffsReducers
  );
  useEffect(() => {
    dispatch(getStaffsByType({}))
  }, [])
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAssignAsset((prev: any) => ({ ...prev, [name]: value }));
  };

  const toggleModal = () => {
    setVisible((prev: any) => !prev);
    setAssignAsset(initialState)
  };

  const handleSave = async () => {
    try {
      const payload: any = {
        assetId: AssetItemData?.assetId,
        itemName: AssetItemData?.itemName,
        assignedToId: assignAsset.assignedToId,
        id: AssetItemData?.id,
      };
      await dispatch(updateAssetItem(payload));
      await getAssetItems()
      // dispatch(getAllAssetItems({}));
      setVisible(!visible);
    } catch (err) {
      console.log(err);
    }
  };
  const footerHelper = () => (
    <div className="buttons__container">
      <ButtonComponent
        type="outlined"
        label="Cancel"
        onClick={toggleModal}
      />
      <ButtonComponent label="Save" onClick={handleSave} disabled={!assignAsset.assignedToId}/>
    </div>
  );
  return (
    <div>
      <Dialog
        className="add__new__report__modal"
        visible={visible}
        onHide={toggleModal}
        header="Assign Asset"
        footer={footerHelper}
        style={{ width }}
      >
        <div className="input__container">
            <TextInputComponent
              classNames="full__width"
              label="Asset ID"
              value={AssetItemData?.assetItemId}
              name="assetId"
              disabled
            />
        </div>

        <div className="input__container">
          <div className="one__third">
            <TextInputComponent
              classNames="full__width"
              label="Asset Name"
              name="itemName"
              value={AssetItemData?.itemName}
              disabled
            />
          </div>
        </div>

        <div className="input__container">
            <FilterDropdown
              classNames="full__width"
              label="Assignee"
              items={staffs}
              name="assignedToId"
              optionLabel="name"
              optionValue="id"
              handleChange={handleChange}
              value={
                AssetItemData?.assignedToId
                  ? AssetItemData?.assignedToId
                  : assignAsset?.assignedToId
              }
            />
        </div>
      </Dialog>
    </div>
  );
}
