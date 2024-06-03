import moment from "moment";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { AppoinmentsCalander } from "../mock";
import AddNewModal from "../../../Components/AddNewModal/Index";
import {
  AppointmentOverlayTemplateHelper,
  appointmentStatusTemplateHelper,
  DepartmentTemplateHelper,
  hotlinkTemplateHelper,
  paginatorTemplate,
  ProfileImageTemplate,
} from "../../../Components/DataTableTemplates/Index";
import {
  HOSPITAL_ID,
  ROWS_PER_PAGE,
  ROWS_PER_PAGE_OPTIONS,
} from "../../../constants";
import { AppDispatch, RootState } from "../../../redux/store";
import AddNewAppointments from "../AddNewAppointments";
import {
  deleteAppointmentById,
  fetchAllAppointments,
} from "../store/appointmentMiddleware";
import { CreateAppointmentPayload } from "../store/appointmentsType";
import StatusUpdateDialog from "./StatusUpdateDialog";

function AllAppointmentsTable() {
  const [selectedItem, setSelectedItem] = useState<CreateAppointmentPayload>();
  const [selectedId, setSelectedId] = useState("");
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const { appointments } = useSelector<
    RootState,
    RootState["appointmentReducers"]
  >((state) => state.appointmentReducers);
  const dispatch = useDispatch<AppDispatch>();
  const { search, date } = useOutletContext<any>();

  const fetchData = async () => {
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

  useEffect(() => {
    fetchData();
  }, [date]);

  const handleAction = (action: any) => {
    const { type, payload } = action;
    switch (type) {
      case "edit":
        setSelectedItem({
          ...payload,
          appointmentStart: new Date(payload.appointmentStart),
          appointmentEnd: new Date(payload.appointmentEnd),
        });
        setShowEdit(true);
        break;
      case "delete":
        setSelectedId(payload.id);
        setShowConfirmation(true);
        break;
      case "update":
        setSelectedId(payload.id);
        setShowStatusDialog(true);
        break;
      default:
        break;
    }
  };

  const handleDeleteAppointment = async () => {
    await dispatch(deleteAppointmentById(selectedId));
    setShowConfirmation(false);
    await fetchData();
  };

  const dateTemplateHelper = (
    dateString: string,
    minutes: number,
    end: number
  ) =>
    `${moment(dateString)
      .startOf("day")
      .add({ minutes })
      .format("DD MMM YYYY, hh:mm a")} - ${moment(dateString)
      .startOf("day")
      .add({ minutes: end })
      .format("hh:mm a")} `;

  return (
    <div>
      <DataTable
        value={AppoinmentsCalander}
        responsiveLayout="scroll"
        globalFilter={search}
        paginator
        rows={ROWS_PER_PAGE}
        rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
        paginatorTemplate={paginatorTemplate}
      >
        <Column
          body={(rowData: any) => ProfileImageTemplate(rowData?.doctor)}
          header="DOCTOR"
        />
        <Column
          body={(rowData: any) => hotlinkTemplateHelper(rowData?.employeeId)}
          header="EMP ID"
          headerClassName="table__staffs__id"
        />
        <Column
          body={(rowData: any) => hotlinkTemplateHelper(rowData?.name)}
          header="PATIENT NAME"
        />
        <Column
          body={(rowData: any) => DepartmentTemplateHelper(rowData?.department)}
          header="DEPARTMENT"
        />
        <Column
          body={(rowData: any) =>
            dateTemplateHelper(
              rowData?.appointmentStart,
              rowData?.appointmentSchedule?.appointmentRangeStart,
              rowData?.appointmentSchedule?.appointmentRangeEnd
            )
          }
          header="DATE AND TIME"
        />
        <Column
          body={(rowData: any) => DepartmentTemplateHelper(rowData?.bookedvia)}
          header="BOOKED VIA"
        />
        <Column
          body={appointmentStatusTemplateHelper}
          header="STATUS"
          field="status"
        />
        <Column
          body={(row: object) =>
            AppointmentOverlayTemplateHelper(row, handleAction)
          }
        />
      </DataTable>
      <AddNewModal
        visible={showConfirmation}
        setVisible={setShowConfirmation}
        header="Delete Appointment"
        primaryLabel="Delete"
        handleSaveClick={handleDeleteAppointment}
      >
        <p>Are you sure, you want to delete this Appointment?</p>
      </AddNewModal>
      <AddNewAppointments
        visible={showEdit}
        setVisible={setShowEdit}
        isEditing
        selectedItem={selectedItem}
        date={date}
      />
      <StatusUpdateDialog
        visible={showStatusDialog}
        setVisible={setShowStatusDialog}
        rowId={selectedId}
        width="35vw"
      />
    </div>
  );
}

export default AllAppointmentsTable;
