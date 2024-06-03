import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { ReactElement } from "react";
import {
  CategoryTemplateHelper,
  OverLayTemplateHelper,
  StatusTemplate,
  tableDateTemplate,
} from "../../../../Components/DataTableTemplates/Index";
import { PHARMACY_STOCK_DATA } from "../../../../constants";

export default function OthersTable(): ReactElement {
  const handleActions = () => {};
  return (
    <div className="designation__table__container">
      <DataTable value={PHARMACY_STOCK_DATA}>
        <Column selectionMode="multiple" />
        <Column header="NAME" field="name" />
        <Column header="TYPE" body={CategoryTemplateHelper} />
        <Column header="CREATED BY" field="name" />
        <Column
          header="CREATED ON"
          body={() => tableDateTemplate(new Date().toString())}
        />
        <Column header="STATUS" body={StatusTemplate} />
        <Column
          body={(row: object) => OverLayTemplateHelper(row, handleActions)}
        />
      </DataTable>
    </div>
  );
}
