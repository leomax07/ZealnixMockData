import { Dialog } from "primereact/dialog";
import TextInputComponent from "../TextInput/Index";
import "./OpenModel.scss";
import ButtonComponent from "../Buttons/Index";

interface OpenModelprops {
  visibleState: boolean;
  setVisibleState: (value: boolean) => void;
}
export default function OpenModel({
  visibleState,
  setVisibleState,
}: OpenModelprops) {
  return (
    <div className="card flex justify-content-center">
      <Dialog
        header="New Staff"
        visible={visibleState}
        style={{ width: "50vw" }}
        onHide={() => setVisibleState(false)}
      >
        <div>
          <div className="open__model__profile__text">Profile Picture</div>
          <div className="open__model__profile__upload">
            Upload a Profile Pic * Max 5 MB
          </div>
          <div className="open__model__grid">
            <TextInputComponent label="Name" placeholder="Placeholder" />
            <TextInputComponent label="Staff Type" placeholder="Doctor" />
            <TextInputComponent label="Department" placeholder="Department" />
          </div>
          <div className="open__model__grid__second">
            <TextInputComponent label="Email" placeholder="Email" />
            <TextInputComponent
              label="Contact Number"
              placeholder="Contact Number"
            />
            <TextInputComponent label="Duty Time" placeholder="Duty Time" />
          </div>
          <div className="open__model__flex">
            <div className="open__model__button_cancel">
              <ButtonComponent label="Cancel" type="outlined" />
            </div>
            <ButtonComponent label="Save" />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
