import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { ProgressBar } from "primereact/progressbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ButtonComponent from "../../../Components/Buttons/Index";
import {
  appointmentTypeTempalteHelper,
  OverLayTemplateHelper,
} from "../../../Components/DataTableTemplates/Index";
import placeholderImg from "../../../Icon/logo.svg";
import timePeriod from "../../../assets/time-period.svg";
import clockImg from "../../../assets/small-clock.svg";
import { AppDispatch, RootState } from "../../../redux/store";
import {
  deleteAppointmentById,
  getAppointmentsBySlotId,
} from "../store/appointmentMiddleware";
import {
  convertToStartOfDayISOString,
  getTimeFromMinutes,
} from "../../../utils/reusableFunctions";
import { getStaffDetailsById } from "../../Staffs/store/staffsMiddleware";
import { getSlotsBySlotId } from "../../SettingsModule/GeneralSettings/Slots/store/slotsMiddleWare";
import AddNewAppointments from "../AddNewAppointments";
import { AppointmentBySlotIdType } from "../store/appointmentsType";
import AddNewModal from "../../../Components/AddNewModal/Index";

interface Props {
  slotId: string;
  date: string | Date;
  doctorId: string;
}

function SlotDetails({ slotId, doctorId, date }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { appointmentBySlotId } = useSelector<
    RootState,
    RootState["appointmentReducers"]
  >((state) => state.appointmentReducers);
  const { staffDetail } = useSelector<RootState, RootState["staffsReducers"]>(
    (state) => state.staffsReducers,
  );
  const { slotDetails } = useSelector<RootState, RootState["slotsReducers"]>(
    (state) => state.slotsReducers,
  );
  const [total, setTotal] = useState(0);
  const [booked, setBooked] = useState(0);
  const [showAddAppointments, setShowAddAppointments] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<AppointmentBySlotIdType | null>();

  const fetchData = async () => {
    const payload = {
      filter: {
        where: {
          appointmentScheduleId: slotId,
          doctorId,
          appointmentDate: convertToStartOfDayISOString(date),
        },
        include: ["patient"],
      },
    };
    await dispatch(getAppointmentsBySlotId(payload));
    const payloadForDoc = {
      id: doctorId,
      filter: {
        include: [{ relation: "department" }],
      },
    };
    await dispatch(getStaffDetailsById(payloadForDoc));
    const query = {
      include: [
        {
          relation: "doctors",
          scope: { include: [{ relation: "department" }] },
        },
      ],
    };
    await dispatch(
      getSlotsBySlotId({
        id: slotId,
        filter: encodeURI(JSON.stringify(query)),
      }),
    );
  };

  useEffect(() => {
    fetchData();
  }, [slotId, date, doctorId]);

  useEffect(() => {}, [appointmentBySlotId]);

  useEffect(() => {
    const totalSlots =
      (slotDetails?.regularSlot || 0) +
      (slotDetails?.emergencySlot || 0) +
      (slotDetails?.videoSlot || 0);
    const bookedSlots = appointmentBySlotId.length;

    setBooked(bookedSlots);
    setTotal(totalSlots);
  }, [slotDetails]);

  const handleAddNewClick = () => {
    setShowAddAppointments(true);
  };

  const handleAfterSave = async () => {
    await fetchData();
  };

  const handleAction = (action: {
    type: string;
    payload: AppointmentBySlotIdType;
  }) => {
    const { type, payload } = action;

    switch (type) {
      case "delete":
        setSelectedAppointmentId(payload.id);
        setShowConfirmation(true);
        break;
      case "edit":
        setSelectedAppointment(payload);
        setShowAddAppointments(true);
        break;
      default:
        break;
    }
  };

  const handleAppointemtDelete = async () => {
    await dispatch(deleteAppointmentById(selectedAppointmentId));
    await fetchData();
    setShowConfirmation(false);
    setSelectedAppointmentId("");
  };
  const toggleModal = () => {
    setShowAddAppointments((prev) => !prev);
  };

  return (
    <div className="slot__details__container">
      <div className="header">
        <div className="profile__details">
          <div className="left">
            <div className="profile__image__container">
              <img
                src={staffDetail?.profileImageUrl || placeholderImg}
                alt="profile"
                className="profile__image"
              />
            </div>

            <div className="right">
              <p className="line__1">
                {staffDetail?.name}{" "}
                <span className="grey__text">{staffDetail?.employeeId}</span>
              </p>
              <p className="line__2 grey__text">
                {" "}
                {staffDetail?.department?.name}
              </p>
            </div>
          </div>
          <div className="right">
            <ButtonComponent label="Add" onClick={handleAddNewClick} />
          </div>
        </div>
        <div className="slot__progress__bar">
          <div className="labels__container">
            <p className="left">Available slots</p>
            <p className="right">
              {booked}/{total}
            </p>
          </div>
          <div className="slot__progress__container">
            <ProgressBar value={(booked / total) * 100} />
          </div>
        </div>
        <div className="slot__timings__container">
          <div className="sub__header">
            <div className="key__value">
              <img src={clockImg} alt="clock" />
              <p className="key">Timings : </p>
              <p className="value">
                {getTimeFromMinutes(slotDetails?.appointmentRangeStart)} -
                {getTimeFromMinutes(slotDetails?.appointmentRangeEnd)}
              </p>
            </div>
            <div className="key__value">
              <img src={timePeriod} alt="timePeriod" />
              <p className="key">Regular : </p>
              <p className="value">{slotDetails?.regularSlot || 0}</p>
            </div>
            <div className="key__value">
              <img src={timePeriod} alt="timePeriod" />
              <p className="key">Emergency : </p>
              <p className="value">{slotDetails?.emergencySlot || 0}</p>
            </div>
            <div className="key__value">
              <img src={timePeriod} alt="timePeriod" />
              <p className="key">Video : </p>
              <p className="value">{slotDetails?.videoSlot || 0}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="body">
        <DataTable
          onCellClick={(e) => console.log(e, "heheheh")}
          onRowClick={(event: any) =>
            console.log(event.originalEvent.target.nodeName)
          }
          value={appointmentBySlotId}
        >
          <Column header="TOKEN NO" field="tokenId" />
          <Column header="PATIENT" field="patient.name" />
          <Column header="STATUS" field="status" />
          <Column
            header="TYPE"
            field="type"
            body={appointmentTypeTempalteHelper}
          />
          <Column
            body={(rowData: any) =>
              OverLayTemplateHelper(rowData, handleAction)
            }
          />
        </DataTable>
      </div>
      <AddNewAppointments
        visible={showAddAppointments}
        setVisible={toggleModal}
        from="slotDetails"
        slotDetails={
          selectedAppointment || {
            doctorId,
            appointmentScheduleId: slotId,
            appointmentDate: date,
          }
        }
        handleAfterSaveFromParent={handleAfterSave}
        isEditing={!!selectedAppointment}
      />
      <AddNewModal
        visible={showConfirmation}
        setVisible={setShowConfirmation}
        handleSaveClick={handleAppointemtDelete}
        primaryLabel="Delete"
      >
        <p>Are you sure, you want to delete this appointment?</p>
      </AddNewModal>
    </div>
  );
}

export default SlotDetails;
