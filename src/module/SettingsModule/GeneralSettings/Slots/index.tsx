/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import AddNewModal from "../../../../Components/AddNewModal/Index";
import { OverLayTemplateHelper } from "../../../../Components/DataTableTemplates/Index";
import DatePickerComponent from "../../../../Components/DatePicker/Index";
import MultiSelectDropdown from "../../../../Components/MultiSelect/Index";
import RightSideBar from "../../../../Components/RightSidebar/Index";
import TextInputComponent from "../../../../Components/TextInput/Index";
import { BRANCH_ID, DOCTOR, HOSPITAL_ID } from "../../../../constants";
import { AppDispatch, RootState } from "../../../../redux/store";
import {
  concertMinutesToTimeString,
  convertTimeStringToMinutes,
} from "../../../../utils/reusableFunctions";
import { getStaffsByType } from "../../../Staffs/store/staffsMiddleware";
import {
  createNewSlots,
  deleteSlotsById,
  getSlotsByHospitalId,
  putSlotsById,
} from "./store/slotsMiddleWare";
import { EditSlotProps, SlotType } from "./store/slotsTypes";
import ViewDotorsInSlots from "./ViewDoctosInSlots";
import { slotSchema } from "../../../../utils/validationSchema";

function SlotsListing() {
  const [slotData, setSlotData] = useState<any>({
    appointmentRangeStart: "",
    appointmentRangeEnd: "",
    regularSlot: 0,
    emergencySlot: 0,
    videoSlot: 0,
    doctorIds: [],
    hospitalId: HOSPITAL_ID,
    branchId: BRANCH_ID,
  });
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [showConfirmation, setShowConformation] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const { staffs } = useSelector<RootState, RootState["staffsReducers"]>(
    (state) => state.staffsReducers,
  );
  const { slots } = useSelector<RootState, RootState["slotsReducers"]>(
    (state) => state.slotsReducers,
  );

  // to open and close modal
  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  // get doctors function for multiselect
  const fetchDoctors = async () => {
    const payload = {
      filter: {
        where: {
          hospitalId: HOSPITAL_ID,
          branchId: BRANCH_ID,
          type: DOCTOR,
        },
      },
    };
    await dispatch(getStaffsByType(payload));
  };

  // get slots by hospital and branch id
  const getSlotsData = async () => {
    const payload = {
      filter: {
        where: {
          hospitalId: HOSPITAL_ID,
          branchId: BRANCH_ID,
        },
      },
    };
    await dispatch(getSlotsByHospitalId(payload));
  };

  useEffect(() => {
    fetchDoctors();
    getSlotsData();
  }, []);

  // create new slot
  const handleSlotAction = async () => {
    const payload = {
      ...slotData,
      appointmentRangeStart: convertTimeStringToMinutes(
        slotData.appointmentRangeStart,
      ),
      appointmentRangeEnd: convertTimeStringToMinutes(
        slotData.appointmentRangeEnd,
      ),
      regularSlot: Number(slotData.regularSlot),
      emergencySlot: Number(slotData.emergencySlot),
      videoSlot: Number(slotData.videoSlot),
    };
    if (isEditing) {
      await dispatch(putSlotsById(payload));
    } else {
      await dispatch(createNewSlots(payload));
    }
    await getSlotsData();
    toggleModal();
  };

  // formik

  const { errors, touched, handleSubmit, handleBlur } = useFormik({
    initialValues: {
      regularSlot: slotData.regularSlot,
      appointmentRangeStart: slotData.appointmentRangeStart,
      appointmentRangeEnd: slotData.appointmentRangeEnd,
      emergencySlot: slotData.emergencySlot,
      videoSlot: slotData.videoSlot,
    },
    validationSchema: slotSchema,
    enableReinitialize: true,
    onSubmit: () => {
      handleSlotAction();
    },
  });

  // handle change for form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSlotData((prev: any) => ({ ...prev, [name]: value }));
  };

  // delete a slot on confirmation
  const handleSlotDelete = async () => {
    await dispatch(deleteSlotsById(selectedId));
    setSelectedId("");
    await getSlotsData();
    setShowConformation(false);
  };

  // show right sidebar to view doctors
  const handleViewDoctors = (id: string) => {
    setSelectedId(id);
    setShowSidebar(true);
  };

  // data table templates
  const handleSlotTiming = (rowData: SlotType) => {
    const startString = moment()
      .startOf("day")
      .add({ minutes: rowData.appointmentRangeStart })
      .format("hh:mm a");
    const endString = moment()
      .startOf("day")
      .add({ minutes: rowData.appointmentRangeEnd })
      .format("hh:mm a");
    return `${startString} to ${endString}`;
  };

  const doctorCountHelper = (rowData: SlotType) => rowData.doctorIds.length;

  const viewDoctorTemplate = (rowData: SlotType) => (
    <div
      className="view__doctor__container blue__text pointer"
      onClick={() => handleViewDoctors(rowData.id || "")}
      onKeyDown={() => handleViewDoctors(rowData.id || "")}
      role="button"
      tabIndex={0}
    >
      <div className="image" />
      <p className="text">View doctors</p>
    </div>
  );

  // overlay template action handler
  const handleAction = async (action: { type: string; payload: SlotType }) => {
    const { type, payload } = action;
    const data = {
      ...payload,
      appointmentRangeStart: new Date(
        concertMinutesToTimeString(payload.appointmentRangeStart),
      ),
      appointmentRangeEnd: new Date(
        concertMinutesToTimeString(payload.appointmentRangeEnd),
      ),
    } as EditSlotProps;
    switch (type) {
      case "edit":
        setSlotData(data);
        setIsEditing(true);
        toggleModal();
        break;
      case "delete":
        setShowConformation(true);
        setSelectedId(payload?.id || "");
        break;
      default:
        break;
    }
  };

  return (
    <div className="slot__listing__container">
      <div className="header">Appointment schedules</div>
      <div className="slot__table__container">
        <DataTable value={slots}>
          <Column header="SLOT HOURS" body={handleSlotTiming} field="start" />
          <Column header="REGULAR (MAX SLOTS)" field="regularSlot" />
          <Column header="EMERGENCY (MAX SLOTS)" field="emergencySlot" />
          <Column header="VIDEO (MAX SLOTS)" field="videoSlot" />
          <Column header="DOCTORS" body={doctorCountHelper} />
          <Column body={viewDoctorTemplate} />
          <Column
            body={(rowData: SlotType) =>
              OverLayTemplateHelper(rowData, handleAction)
            }
          />
        </DataTable>
      </div>
      <p className="add__slots__text__text" onClick={toggleModal}>
        <span className="add__icon">+</span> Add Slots
      </p>

      <AddNewModal
        visible={showModal}
        setVisible={toggleModal}
        header={isEditing ? "Edit Slot" : "Add Slot"}
        handleSaveClick={handleSubmit}
        primaryLabel={isEditing ? "Edit Slot" : "Create Slot"}
      >
        <div>
          <div className="two__part__container">
            <div className="half">
              <DatePickerComponent
                label="Start time"
                timeOnly
                value={slotData.appointmentRangeStart}
                name="appointmentRangeStart"
                required
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {touched.appointmentRangeStart &&
                errors.appointmentRangeStart && (
                  <div className="formik_error">
                    {errors.appointmentRangeStart.toString()}
                  </div>
                )}
            </div>
            <div className="half">
              <DatePickerComponent
                label="End time"
                timeOnly
                name="appointmentRangeEnd"
                value={slotData.appointmentRangeEnd}
                required
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {touched.appointmentRangeEnd && errors.appointmentRangeEnd && (
                <div className="formik_error">
                  {errors.appointmentRangeEnd.toString()}
                </div>
              )}
            </div>
          </div>
          <div className="two__part__container">
            <div className="one__third">
              <TextInputComponent
                label="Regular"
                type="number"
                value={slotData.regularSlot}
                name="regularSlot"
                min={0}
                required
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {touched.regularSlot && errors.regularSlot && (
                <div className="formik_error">
                  {errors.regularSlot.toString()}
                </div>
              )}
            </div>
            <div className="one__third">
              <TextInputComponent
                label="Emergency"
                type="number"
                value={slotData.emergencySlot}
                name="emergencySlot"
                min={0}
                required
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {touched.emergencySlot && errors.emergencySlot && (
                <div className="formik_error">
                  {errors.emergencySlot.toString()}
                </div>
              )}
            </div>
            <div className="one__third">
              <TextInputComponent
                label="Video"
                type="number"
                value={slotData.videoSlot}
                name="videoSlot"
                min={0}
                required
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {touched.videoSlot && errors.videoSlot && (
                <div className="formik_error">
                  {errors.videoSlot.toString()}
                </div>
              )}
            </div>
          </div>
          <div className="two__part__container">
            <MultiSelectDropdown
              classNames="full__width"
              label="Doctors"
              filter
              items={staffs}
              optionLabel="name"
              optionValue="id"
              value={slotData.doctorIds}
              name="doctorIds"
              handleChange={handleChange}
            />
          </div>
        </div>
      </AddNewModal>

      <RightSideBar
        visible={showSidebar}
        setVisible={setShowSidebar}
        header={<ViewDotorsInSlots slotId={selectedId} />}
      />

      <AddNewModal
        visible={showConfirmation}
        setVisible={setShowConformation}
        header="Delete Slot"
        handleSaveClick={handleSlotDelete}
        primaryLabel="Delete"
      >
        <p>Are you sure, you want to delete this slot?</p>
      </AddNewModal>
    </div>
  );
}

export default SlotsListing;
