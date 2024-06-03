import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { ReactElement } from "react";
import {
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

export default function OrderAllocationTable({
  actionValue,
  actionhandler,
}: Props): ReactElement {
  const actionCalled = () => {
    actionhandler(true);
  };

  return (
    <div>
      <DataTable value={PHARMACY_STOCK_DATA}>
        <Column style={{ width: "2px" }} selectionMode="multiple" />
        <Column
          header="BATCH ID"
          field="batchId"
          body={(row) => hotlinkTemplateHelper(row.batchId)}
        />
        <Column header="NO OF ORDERS" field="noOfOrders" />
        <Column header="PINCODES" field="pincodes" />
        <Column header="RIDER" body={ProfileImageTemplate} />
        <Column
          header="CREATED ON"
          body={(row) => tableDateTemplate(row.date)}
        />
        <Column header="STATUS" body={StatusTemplate} />
        <Column />
        <Column body={() => DotsTemplate(actionValue, actionCalled)} />
      </DataTable>
    </div>
  );
}
