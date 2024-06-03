import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "primereact/dialog";
import { BRANCH_ID, HOSPITAL_ID } from "../../../constants";
import { AppDispatch, RootState } from "../../../redux/store";
import CheckboxComponent from "../../../Components/Checkbox/Index";
import ButtonComponent from "../../../Components/Buttons/Index";
import FileUploadComponent from "../../../Components/FileUplodComponent/Index";
import TextInputComponent from "../../../Components/TextInput/Index";
import {
  getBranchDetailsById,
  patchBranchesById,
} from "../Branches/store/branchesMiddleware";
import {
  fetchHospitalDetailById,
  patchHospitalDetailById,
} from "./store/generalSettingsMiddleware";

interface Props {
  visible: boolean;
  setVisible: Function;
  width?: string;
}

export interface HospitalPropType {
  id: string;
  name: string;
  profilePicUrl: string;
  address: string;
  pinCode: string;
  city: string;
  state: string;
  country: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

const defaultValue = {
  id: "",
  name: "",
  profilePicUrl: "",
  address: "",
  pinCode: "",
  city: "",
  state: "",
  country: "",
  email: "",
  phone: "",
  createdAt: "",
  updatedAt: "",
};

export default function EditHospitalSettings({
  visible,
  setVisible,
  width = "629px",
}: Props): ReactElement {
  const dispatch = useDispatch<AppDispatch>();
  const { settingsData } = useSelector<
    RootState,
    RootState["generalSettingsReducers"]
  >((state) => state.generalSettingsReducers);
  const { branchDetail } = useSelector<
    RootState,
    RootState["branchesReducers"]
  >((state) => state.branchesReducers);
  const [state, setState] = useState<HospitalPropType>(defaultValue);
  const [branchState, setBranchState] = useState({
    id: "",
    isMainBranch: false,
    name: "",
  });

  const getBranchData = async () => {
    await dispatch(getBranchDetailsById(BRANCH_ID));
  };

  useEffect(() => {
    setState(settingsData);
    getBranchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settingsData]);

  useEffect(() => {
    setBranchState({
      id: branchDetail.id,
      isMainBranch: branchDetail.isMainBranch,
      name: branchDetail.name,
    });
  }, [branchDetail]);

  const handleSave = async () => {
    const branchPayload = {
      ...branchState,
      id: BRANCH_ID,
    };
    await dispatch(patchBranchesById(branchPayload));
    await dispatch(patchHospitalDetailById(state));
    await dispatch(fetchHospitalDetailById(HOSPITAL_ID));
    setVisible();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    if (name === "isMainBranch") {
      setBranchState((prev: any) => ({ ...prev, [name]: checked }));
      return;
    }
    if (name === "profilePicUrl") {
      setState((prev: any) => ({ ...prev, [name]: value[0] }));
      return;
    }
    setState((prev: any) => ({ ...prev, [name]: value }));
  };
  const handleBranchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBranchState((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="edit__modal__container">
      <Dialog
        className="edit__modal"
        visible={visible}
        style={{ width }}
        onHide={() => setVisible()}
        header="Hospital Details"
      >
        {/* <div className="header__container">
					<p className="title">Hospital Details</p>
					<img
						src={closeIcon}
						alt="close"
					/>
				</div> */}
        <div className="body">
          <div className="file__upload each__item">
            <FileUploadComponent
              label="Profile Picture"
              subText="Upload a Profile Pic * Max 5 MB"
              name="profilePicUrl"
              onChange={handleChange}
              placeholder={state.profilePicUrl}
            />
          </div>
          <div className="each__item">
            <TextInputComponent
              label="Hospital Name"
              value={state.name}
              name="name"
              onChange={handleChange}
            />
          </div>
          <div className="each__item">
            <TextInputComponent
              label="Address"
              value={state.address}
              name="address"
              onChange={handleChange}
            />
          </div>
          <div className="two__input__container each__item">
            <div className="half">
              <TextInputComponent
                label="Branch name"
                value={branchState.name}
                name="name"
                onChange={handleBranchChange}
              />
            </div>
            <div className="half">
              <TextInputComponent
                label="E-mail"
                value={state.email}
                name="email"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="two__input__container each__item">
            <div className="half">
              <TextInputComponent
                label="Phone number"
                value={state.phone}
                name="phone"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="each__item">
            <CheckboxComponent
              checkboxId="mainBranch"
              label="Main Branch"
              checked={branchState.isMainBranch}
              name="isMainBranch"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="buttons__container">
          <ButtonComponent
            label="Cancel"
            type="outlined"
            onClick={() => setVisible()}
          />
          <ButtonComponent label="Save" onClick={handleSave} />
        </div>
      </Dialog>
    </div>
  );
}
