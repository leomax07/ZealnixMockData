import ButtonComponent from "../../../Components/Buttons/Index";
import { BRANCH_ID, HOSPITAL_ID } from "../../../constants";
import { StaffDetail } from "../store/sfattsTypes";
import "./addNewStaff.scss";

export interface NewStaffDialogProps {
  isEdit: boolean;
  visible: boolean;
  setVisible: Function;
  rowData: StaffDetail | null;
  width: string;
  closeDialog: Function;
}

export interface NewStaffStateType {
  profileImageUrl?: string;
  name: string;
  type: string;
  departmentId: string;
  email: string;
  phone: string;
  designationId: string;
  dutyInTime: string | number;
  dutyOutTime: string | number;
  hospitalId: string;
  branchId: string;
  status: string;
  salt: string;
  department?: string | object | any;
}

export const initialValue = {
  profileImageUrl: "",
  name: "",
  type: "",
  email: "",
  phone: "",
  dutyInTime: 0,
  dutyOutTime: 0,
  departmentId: "",
  designationId: "",
  hospitalId: HOSPITAL_ID,
  branchId: BRANCH_ID,
  status: "active",
  salt: "10",
  password: "123456789",
  department: ''
};

export interface FooterTemplatePropType {
  submitHandler: Function;
  CancelHandler: Function;
  isEdit: boolean;
}

export default function FooterTemplate({
  isEdit,
  CancelHandler,
  submitHandler,
}: FooterTemplatePropType) {
  const submitLabel = isEdit ? "Update" : "Submit";
  return (
    <div className="newStaff__footer__Container">
      <ButtonComponent
        label="Cancel"
        type="outlined"
        onClick={() => CancelHandler()}
      />
      <ButtonComponent onClick={() => submitHandler()} label={submitLabel} />
    </div>
  );
}
