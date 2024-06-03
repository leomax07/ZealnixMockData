import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import {
  CategoryTemplateHelper,
  OverLayTemplateHelper,
  StatusTemplate,
  tableDateTemplate,
} from "../../../../Components/DataTableTemplates/Index";
import { PHARMACY_STOCK_DATA } from "../../../../constants";
import DetailsTabHeader from "./DetailsTabHeader";

function AddmissionsTable() {
  const handleAction = () => {};
  return (
    <div className="patient__details__table__container">
      <DetailsTabHeader />
      <DataTable value={PHARMACY_STOCK_DATA}>
        <Column selectionMode="multiple" />
        <Column header="DEPARTMENT" body={CategoryTemplateHelper} />
        <Column
          header="DATE PERIOD"
          body={(row) => tableDateTemplate(row.date)}
        />
        <Column header="STATUS" body={StatusTemplate} />
        <Column
          body={(row: object) => OverLayTemplateHelper(row, handleAction)}
        />
      </DataTable>
    </div>
  );
}

export default AddmissionsTable;
