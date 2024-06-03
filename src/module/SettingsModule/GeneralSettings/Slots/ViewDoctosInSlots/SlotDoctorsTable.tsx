import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { CategoryTemplateHelper } from "../../../../../Components/DataTableTemplates/Index";
import { Doctor } from "../store/slotsTypes";

interface Props {
  data: Doctor[] | [];
}

function SlotDoctorsTable({ data = [] }: Props) {
  return (
    <div className="slot__doctors__table__container">
      <DataTable value={data}>
        <Column header="DOCTOR" field="name" />
        <Column header="STAFF ID" field="employeeId" />
        <Column
          header="DEPARTMENT"
          body={(row: Doctor) => CategoryTemplateHelper(row.department?.name)}
        />
      </DataTable>
    </div>
  );
}

export default SlotDoctorsTable;
