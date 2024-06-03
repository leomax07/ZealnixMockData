import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { ReactElement, useState } from "react";
import ButtonComponent from "../../../Components/Buttons/Index";
import {
  ProfileImageTemplate,
  hotlinkTemplateHelper,
  paginatorTemplate,
  priceRupeesTemplate,
  tableDateTemplate,
} from "../../../Components/DataTableTemplates/Index";
import {
  PHARMACY_STOCK_DATA,
  ROWS_PER_PAGE,
  ROWS_PER_PAGE_OPTIONS,
} from "../../../constants";
import EyeIcon from "../../../assets/eye.svg";
import RightSideBar from "../../../Components/RightSidebar/Index";
import SalesAndPurchaseDetails from "../Inventory/Sidebar/SaleAndPurchase";
import dots from "../../../Icon/dots.svg";

export default function PharmacySalesTable(): ReactElement {
  const [visible, setVisible] = useState(false);
  const viewTemplateHelper = () => (
    <div className="view__template__helper">
      <ButtonComponent
        label="View"
        type="outlined"
        onClick={() => setVisible(true)}
        image={EyeIcon}
      />
    </div>
  );

  const actionTemplateHelper = () => (
    <div className="action__template__controller">
      <img src={dots} alt="dots" />
    </div>
  );

  return (
    <div>
      <div className="table__container">
        <DataTable
          value={PHARMACY_STOCK_DATA}
          paginator
          rows={ROWS_PER_PAGE}
          rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
          paginatorTemplate={paginatorTemplate}
        >
          <Column selectionMode="multiple" />
          <Column header="DRUG NAME" body={ProfileImageTemplate} field="name" />
          <Column
            header="DRUG ID"
            body={(row) => hotlinkTemplateHelper(row.drugId)}
            field="drugId"
          />
          <Column header="CATEGORY" field="category" />
          <Column header="MANUFACTURER" field="manufacturer" />
          <Column
            header="BOUGHT BY"
            body={ProfileImageTemplate}
            field="inStock"
          />
          <Column header="QUANTITY" field="sold" />
          <Column
            header="TOTAL ₹"
            field="soldLast30Days"
            body={(row) => priceRupeesTemplate(row?.totalAmount || 12)}
          />
          <Column
            header="ORDERED ON"
            field="status"
            body={(row) => tableDateTemplate(row?.date)}
          />
          <Column body={viewTemplateHelper} />
          <Column body={actionTemplateHelper} />
        </DataTable>
        <RightSideBar
          body={<SalesAndPurchaseDetails />}
          setVisible={setVisible}
          visible={visible}
        />
      </div>
    </div>
  );
}
