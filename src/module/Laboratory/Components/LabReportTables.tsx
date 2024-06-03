import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  DepartmentTemplateHelper,
  hotlinkTemplateHelper,
  OverLayTemplateHelper,
  ProfileImageTemplate,
  statusTemplateHelper,
  tableDateTemplate,
  paginatorTemplate,
} from "../../../Components/DataTableTemplates/Index";
import RightSideBar from "../../../Components/RightSidebar/Index";
import ViewReport from "./ViewReport";
import { AppDispatch, RootState } from "../../../redux/store";
import {
  deleteLaboratoryReport,
  getLaboratoryReport,
} from "../store/laboratoryMiddleware";
import AddNewModal from "../../../Components/AddNewModal/Index";
import AddNewReport from "./AddNewReport";
import { LaboratoryType } from "../store/laboratoryType";
import { ROWS_PER_PAGE, ROWS_PER_PAGE_OPTIONS } from "../../../constants";

interface Props {
  search?: string;
  labId: string;
}

function LabReportTables({ search, labId }: Props) {
  const [showSidebar, setShowSidebar] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [selectedItem, setSelectedItem] = useState<LaboratoryType>();
  const [reportView, setReportView] = useState<any>(null);
  const { reports } = useSelector<RootState, RootState["laboratoryReducer"]>(
    (state) => state.laboratoryReducer
  );

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
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
        });
        setShowEdit(true);
        break;

      default:
        break;
    }
  };

  const fetchData = async () => {
    const defaultIncludeQuery: any = {
      filter: {
        include: [
          { relation: "patient" },
          { relation: "department" },
          { relation: "labTechnician" },
          { relation: "headDoctor" },
        ],
        where: {
          labId,
        },
      },
    };
    await dispatch(getLaboratoryReport(defaultIncludeQuery.filter));
  };

  const handleDeleteReport = async () => {
    await dispatch(deleteLaboratoryReport(selectedId));
    setShowConfirmation(false);
    await fetchData();
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSelect = async (e: any) => {
    const target = e.originalEvent?.target?.className;
    const reportDetail = e.data;
    const stringMatch = target.match(/overlay_action/g);
    if (stringMatch === null) {
      setReportView(reportDetail);
      toggleSidebar();
    }
  };

  return (
    <div className="xray__table__container">
      <RightSideBar
        visible={showSidebar}
        setVisible={toggleSidebar}
        body={<ViewReport setVisible={toggleSidebar} reportData={reportView} />}
      />
      <DataTable
        value={reports}
        responsiveLayout="scroll"
        globalFilter={search}
        onRowClick={(e) => handleSelect(e)}
        paginator
        rows={ROWS_PER_PAGE}
        rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
        paginatorTemplate={paginatorTemplate}
      >
        <Column
          field="name"
          header="PATIENT NAME"
          body={(rowData: any) => ProfileImageTemplate(rowData?.patient)}
        />
        <Column
          body={() => hotlinkTemplateHelper("p-100")}
          header="PATIENT ID"
          headerClassName="table__staffs__id"
        />
        <Column
          body={() => hotlinkTemplateHelper("T-100")}
          header="TEST ID"
          headerClassName="table__staffs__id"
        />
        <Column
          body={(rowData: any) =>
            DepartmentTemplateHelper(rowData?.department?.name)
          }
          header="CATEGORY"
        />
        <Column field="illness" header="ILLNESS" />
        <Column
          body={(rowData: any) => ProfileImageTemplate(rowData?.labTechnician)}
          header="LAB TECHNICIAN"
        />
        <Column
          body={(rowData: any) => tableDateTemplate(rowData.testDateAndTime)}
          header="TEST DONE ON"
        />
        <Column
          body={(rowData: any) => statusTemplateHelper(rowData)}
          header="STATUS"
        />
        <Column
          body={(row: object) => OverLayTemplateHelper(row, handleAction)}
        />
      </DataTable>
      <AddNewModal
        visible={showConfirmation}
        setVisible={setShowConfirmation}
        header="Delete Appointment"
        primaryLabel="Delete"
        handleSaveClick={handleDeleteReport}
      >
        <p>Are you sure, you want to delete this Appointment?</p>
      </AddNewModal>
      <AddNewReport
        visible={showEdit}
        setVisible={setShowEdit}
        isEditing
        selectedItem={selectedItem}
        labId={labId}
      />
    </div>
  );
}

export default LabReportTables;
