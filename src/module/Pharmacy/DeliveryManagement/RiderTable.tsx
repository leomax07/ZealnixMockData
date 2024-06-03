import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { ReactElement } from "react";
import {
  CategoryTemplateHelper,
  detailsTemplate,
  DotsTemplate,
  hotlinkTemplateHelper,
  ProfileImageTemplate,
  StatusTemplate,
  tableDateTemplate,
} from "../../../Components/DataTableTemplates/Index";
import { PHARMACY_STOCK_DATA } from "../../../constants";

interface Props {
  actionValue: boolean;
  actionhandler: Function;
}

export default function RiderTable({
  actionValue,
  actionhandler,
}: Props): ReactElement {
  const actionCalled = () => {
    actionhandler(true);
  };

  return (
    <div>
      <DataTable value={PHARMACY_STOCK_DATA}>
        <Column selectionMode="multiple" style={{ width: "2px" }} />
        <Column header="RIDER" body={ProfileImageTemplate} />
        <Column
          header="RIDER ID"
          body={(row) => hotlinkTemplateHelper(row.riderId)}
        />
        <Column header="RIDER TYPE" body={CategoryTemplateHelper} />
        <Column header="ASSIGNED PINCODES" field="pincodes" />
        <Column
          header="USER CREATED ON"
          body={(row) => tableDateTemplate(row.date)}
        />
        <Column header="STATUS" body={StatusTemplate} />
        <Column body={() => detailsTemplate()} />
        <Column body={() => DotsTemplate(actionValue, actionCalled)} />
      </DataTable>
    </div>
  );
}
