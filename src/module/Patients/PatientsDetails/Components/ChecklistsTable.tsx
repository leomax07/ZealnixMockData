import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import {
  downloadTemplate,
  OverLayTemplateHelper,
  ProfileImageTemplate,
  StatusTemplate,
  tableDateTemplate,
} from "../../../../Components/DataTableTemplates/Index";
import { PHARMACY_STOCK_DATA } from "../../../../constants";
import DetailsTabHeader from "./DetailsTabHeader";

function ChecklistsTable() {
  const handleAction = () => {};
  return (
    <div>
      <DetailsTabHeader />
      <DataTable value={PHARMACY_STOCK_DATA}>
        <Column selectionMode="multiple" />
        <Column header="TEST" field="name" />
        <Column header="DOCTOR" body={ProfileImageTemplate} />
        <Column
          header="DATE AND TIME"
          body={(row) => tableDateTemplate(row.date)}
        />
        <Column header="REPORT" body={() => downloadTemplate(false)} />
        <Column header="STATUS" body={StatusTemplate} />
        <Column
          body={(row: object) => OverLayTemplateHelper(row, handleAction)}
        />
      </DataTable>
    </div>
  );
}

export default ChecklistsTable;
