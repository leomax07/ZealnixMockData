import { Dialog } from "primereact/dialog";
import { ReactElement } from "react";
import addNewCloseIcon from "../../../assets/addNewCloseIcon.svg";
import ButtonComponent from "../../../Components/Buttons/Index";
import FileUploadComponent from "../../../Components/FileUplodComponent/Index";
import FilterDropdown from "../../../Components/FilterDropdown/Index";
import TagInputComponent from "../../../Components/TagInputComponent/Index";
import TextInputComponent from "../../../Components/TextInput/Index";

interface Props {
  visible: boolean;
  setVisible: Function;
}

function AddNewRider({ visible, setVisible }: Props): ReactElement {
  const handleClose = () => {
    setVisible();
  };

  const headerHelper = () => (
    <div className="add__new__header__container">
      <p className="header">New Rider</p>
      <img src={addNewCloseIcon} alt="close" onClick={handleClose} />
    </div>
  );

  const data = [
    "Ambulance Aid",
    "Medic Dispatch",
    "Health Shuttle",
    "Care Courier",
    "MediRide Express",
    "Emergency EMT",
    "Health Transporter",
    "LifeSaver Wheels",
    "MediCab Service",
    "Vital Van",
  ];
  return (
    <div>
      <Dialog
        className="add__new__rider__modal"
        visible={visible}
        onHide={handleClose}
        header={headerHelper}
      >
        <form className="add__new__form__container ">
          <div className="profile__pic__upload__container each__input">
            <FileUploadComponent
              label="Profile Picture"
              subText="Upload a Profile Pic * Max 5 MB"
            />
          </div>
          <div className="each__input">
            <div className="left">
              <TextInputComponent label="Rider Name" />
            </div>
            <div className="right">
              <FilterDropdown
                label="Rider Type"
                classNames="full__width"
                items={data}
              />
            </div>
          </div>

          <div className="each__input">
            <TagInputComponent
              label="Pincodes"
              subText="Add Assigned Pincodes for the rider"
            />
          </div>
          <div className="each__input">
            <FileUploadComponent
              label="Upload Documents"
              subText="Report should be in PDF, Max 5 MB"
            />
          </div>
          <div className="buttons__conatainer">
            <ButtonComponent
              type="outlined"
              label="Cancel"
              onClick={handleClose}
            />
            <ButtonComponent label="Save" onClick={handleClose} />
          </div>
        </form>
      </Dialog>
    </div>
  );
}

export default AddNewRider;
