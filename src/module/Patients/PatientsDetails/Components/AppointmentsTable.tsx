import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {patientAdmission} from "../../mock"
import moment from "moment";
import {
  DepartmentTemplateHelper,
  OverLayTemplateHelper,
  ProfileImageTemplate,
  StatusTemplate,
} from "../../../../Components/DataTableTemplates/Index";
import DetailsTabHeader from "./DetailsTabHeader";
import { AppDispatch, RootState } from "../../../../redux/store";
import {
  deleteAppointmentById,
  fetchAllAppointments,
} from "../../../Appointments/store/appointmentMiddleware";
import AddNewModal from "../../../../Components/AddNewModal/Index";
import AddNewAppointments from "../../../Appointments/AddNewAppointments";
import { CreateAppointmentPayload } from "../../../Appointments/store/appointmentsType";

function AppointmentsTable() {
  const { appointments } = useSelector<
    RootState,
    RootState["appointmentReducers"]
  >((state) => state.appointmentReducers);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedItem, setSelectedItem] = useState<CreateAppointmentPayload>();
  const { id } = useParams<{ id?: string }>();
  const [selectedData, setSelectedData] = useState<any>();
  const [selectedId, setSelectedId] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const fetchData = async () => {
    const defaultIncludeQuery = {
      filter: {
        where: {
          patientId: id,
        },
        include: ["hospital", "doctor", "department", "patient"],
      },
    };
    await dispatch(
      fetchAllAppointments(
        encodeURI(JSON.stringify(defaultIncludeQuery.filter)),
      ),
    );
  };

  const handleAction = (action: any) => {
    const { type, payload } = action;
    switch (type) {
      case "delete":
        setSelectedId(payload.id);
        setShowConfirmation(true);
        break;
      case "edit":
        setSelectedItem({
          ...payload,
          appointmentStart: new Date(payload.appointmentStart),
          appointmentEnd: new Date(payload.appointmentEnd),
        });
        setShowEdit(true);
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

  useEffect(() => {
    fetchData();
  }, []);

  const dateTemplateHelper = (dateString: string) =>
    moment(dateString).format("DD MMM YYYY, hh:mm a");

  const toggleModal = () => {
    setShowEdit((prev) => !prev);
  };

  return (
    <div>
      <DetailsTabHeader tabName="Appointments" />
      <DataTable
        value={patientAdmission}
        responsiveLayout="scroll"
        selection={selectedData}
        onSelectionChange={(e) => setSelectedData(e.value)}
      >
        <Column selectionMode="multiple" />
        <Column
          field="name"
          body={(rowData: any) => ProfileImageTemplate(rowData?.doctor)}
          header="DOCTOR"
        />
        <Column
          body={(rowData: any) =>
            DepartmentTemplateHelper(rowData?.dep)
          }
          header="DEPARTMENT"
        />
        <Column
          body={(rowData: any) => dateTemplateHelper(rowData?.appointmentStart)}
          header="DATE AND TIME"
        />
        <Column body={StatusTemplate} header="STATUS" />
        <Column
          body={(row: object) => OverLayTemplateHelper(row, handleAction)}
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
        setVisible={toggleModal}
        isEditing
        selectedItem={selectedItem}
      />
    </div>
  );
}

export default AppointmentsTable;
