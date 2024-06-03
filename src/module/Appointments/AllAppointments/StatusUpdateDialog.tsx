import React, { useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { Dialog } from "primereact/dialog";
import {
  patchAppointmentStatus,
  fetchAllAppointments,
} from "../store/appointmentMiddleware";
import { AppDispatch } from "../../../redux/store";
import { PatchAppointmentStatusPayload } from "../store/appointmentsType";
import { HOSPITAL_ID } from "../../../constants";
import ButtonComponent from "../../../Components/Buttons/Index";
import FilterDropdown from "../../../Components/FilterDropdown/Index";
import "./statusupdatedialog.scss";
import { toastInfo } from "../../../redux/ToastStore/toastReducer";

type PropType = {
  visible: boolean;
  setVisible: (args: boolean) => void;
  width: string;
  rowId: string;
  date?: Date;
};

const STATUS_DROPDOWN_DATA = [
  { name: "Completed", value: "completed" },
  { name: "Ongoing", value: "ongoing" },
  { name: "Rescheduled", value: "rescheduled" },
  { name: "Upcoming", value: "upcoming" },
  { name: "Cancelled", value: "cancelled" },
];

function StatusUpdateDialog({
  visible,
  setVisible,
  width,
  rowId,
  date = moment().startOf("day").toDate(),
}: PropType) {
  const [status, setStatus] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  // <===============[~METHODS~]==================> //

  //   Functionality used to close dialog and clears state
  const closeDialog = () => {
    setStatus("");
    setVisible(false);
  };

  //   Funtionality used to update state for status dropdown
  const handleChange = (e: any) => {
    setStatus(e.value);
  };

  //   Functionality used to list appointments
  const listAppointments = async () => {
    const defaultIncludeQuery = {
      filter: {
        where: {
          hospitalId: HOSPITAL_ID,
          appointmentDate: moment(date).startOf("day").toISOString(),
        },
        include: ["hospital", "doctor", "department", "patient"],
      },
    };
    await dispatch(
      fetchAllAppointments(
        encodeURI(JSON.stringify(defaultIncludeQuery.filter))
      )
    );
  };

  //   Functionality used to update appointment status and handle errors
  const updateStatus = async (data: PatchAppointmentStatusPayload) => {
    const res = await dispatch(patchAppointmentStatus(data));
    if (res.meta.requestStatus === "fulfilled") {
      await listAppointments();
      await closeDialog();
    }
  };

  //   Functionality used to handle submit and throw error
  const submitHandler = () => {
    const body = { id: rowId, status };
    if (body.status === "") {
      dispatch(toastInfo({ message: "Select Status to update" }));
      return;
    }
    updateStatus(body);
  };

  // <===============[~TEMPLATE~]==================> //

  const footerHelper = () => (
    <div className="footer__wrapper">
      <ButtonComponent
        label="Cancel"
        type="outlined"
        onClick={() => closeDialog()}
      />
      <ButtonComponent label="Save" onClick={() => submitHandler()} />
    </div>
  );

  return (
    <Dialog
      header="Update Status"
      footer={footerHelper}
      visible={visible}
      style={{ width }}
      onHide={closeDialog}
    >
      <div>
        <div>
          <FilterDropdown
            classNames="full__width"
            label="Appointment Status"
            items={STATUS_DROPDOWN_DATA}
            name="status"
            optionLabel="name"
            optionValue="value"
            handleChange={handleChange}
            value={status}
          />
        </div>
      </div>
    </Dialog>
  );
}

export default StatusUpdateDialog;
