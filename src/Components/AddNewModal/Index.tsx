import { Dialog } from "primereact/dialog";
import { ReactElement } from "react";
import ButtonComponent from "../Buttons/Index";

interface Props {
  visible: boolean;
  setVisible: Function;
  width?: string;
  header?: string;
  children?: ReactElement;
  className?: string;
  handleSaveClick?: any;
  primaryLabel?: string;
  disabled?: boolean;
}

interface FooterProps {
  setVisible: any;
  handleSaveClick: any;
  disabled: any;
  primaryLabel: any;
}

function FooterHelper({
  setVisible,
  handleSaveClick,
  disabled,
  primaryLabel,
}: FooterProps) {
  return (
    <div className="buttons__container">
      <ButtonComponent
        label="Cancel"
        type="outlined"
        onClick={() => setVisible()}
      />
      <ButtonComponent
        disabled={disabled}
        label={primaryLabel}
        onClick={() => handleSaveClick()}
      />
    </div>
  );
}

function AddNewModal({
  visible,
  setVisible,
  width = "630px",
  header,
  children,
  className,
  handleSaveClick,
  primaryLabel = "Create",
  disabled = false,
}: Props) {
  return (
    <Dialog
      visible={visible}
      onHide={() => setVisible()}
      footer={
        <FooterHelper
          disabled={disabled}
          handleSaveClick={handleSaveClick}
          primaryLabel={primaryLabel}
          setVisible={setVisible}
        />
      }
      style={{ width }}
      header={header || "Add new"}
      className={`add__new__dialog ${className}`}
    >
      {children}
    </Dialog>
  );
}

export default AddNewModal;
