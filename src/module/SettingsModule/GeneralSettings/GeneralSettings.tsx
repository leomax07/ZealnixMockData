import { ProgressBar } from "primereact/progressbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import generalSettings from "../../../assets/generalSettings.svg";
import bluePen from "../../../assets/bluePen.svg";
import EditHospitalSettings from "./EditHospitalSettings";
import { AppDispatch, RootState } from "../../../redux/store";
import { fetchHospitalDetailById } from "./store/generalSettingsMiddleware";
import { HOSPITAL_ID } from "../../../constants";
import SlotsListing from "./Slots";

function GeneralSettings() {
  const [showEdit, setShowEdit] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { settingsData } = useSelector<
    RootState,
    RootState["generalSettingsReducers"]
  >((state) => state.generalSettingsReducers);
  const { branchDetail } = useSelector<
    RootState,
    RootState["branchesReducers"]
  >((state) => state.branchesReducers);


  useEffect(() => {
    dispatch(fetchHospitalDetailById(HOSPITAL_ID));
  }, []);

  const toggleEditModal = () => {
    setShowEdit((prev) => !prev);
  };
  console.log("settings111", settingsData, branchDetail);
  return (
    <div className="page__container settings__screen__container">
      <div className="settings__screen__header">
        <img src={generalSettings} alt="settings" className="icon" />
        <p className="header">General</p>
      </div>
      <p className="sub__text">Settings &gt; General</p>

      <div className="body">
        <div className="header__container">
          <div className="title">Hospital Details</div>
          <div className="icon__container pointer" onClick={toggleEditModal}>
            <img src={bluePen} alt="pen" className="blue__pen" />
          </div>
        </div>
        <div className="body__profile__details">
          <div className="image__container">
            <img
              src={
                settingsData?.profilePicUrl ??
                "https://cdn3d.iconscout.com/3d/premium/thumb/hospital-6101753-5023487.png"
              }
              alt="hospital"
            />
          </div>
          <div className="details">
            <p className="label">Hospital Name</p>
            <p className="name">{settingsData.name || "-"}</p>
          </div>
        </div>
        <div className="body__data__container">
          <div className="each__item">
            <div className="label">Address</div>
            <div className="value">
              {settingsData.address || "-"}
            </div>
          </div>
          <div className="each__item">
            <div className="label">E-mail</div>
            <div className="value">{settingsData.email || "-"}</div>
          </div>
          <div className="each__item">
            <div className="label">Phone Number</div>
            <div className="value">{settingsData.phone || "-"}</div>
          </div>
          <div className="each__item">
            <div className="label">Branch Name</div>
            <div className="value">{branchDetail.name || '-'}</div>
          </div>
          <div className="each__item">
            <div className="label">Main Branch</div>
            <div className="value">{branchDetail.isMainBranch ? 'Yes': 'No'}</div>
          </div>
        </div>
        <div className="subscription__container">
          <div className="text">
            <p>Subscription</p>
            <p>118 Days Left</p>
          </div>
          <div className="subcription__progress__container">
            <ProgressBar value={50} />
          </div>
        </div>
      </div>
      <EditHospitalSettings visible={showEdit} setVisible={toggleEditModal} />

      <SlotsListing />
    </div>
  );
}

export default GeneralSettings;
