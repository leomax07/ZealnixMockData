import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import BlueEagle from "../../../../assets/sample.jpeg";
import AvatarWithNameAndRole from "../../../../Components/AvatarWithNameAndRole/Index";
import ButtonComponent from "../../../../Components/Buttons/Index";
import TabComponent from "../../../../Components/Tab/tab";
import { PHARMACY_STOCK_DATA } from "../../../../constants";
import {
  hotlinkTemplateHelper,
  priceRupeesTemplate,
  tableDateTemplate,
} from "../../../../Components/DataTableTemplates/Index";
import downloadButtonIcon from "../../../../assets/import.svg";
import SearchInputComponent from "../../../../Components/SearchInput/searchInput";

function SalesAndPurchaseDetails() {
  const [selectedtab, setSelectedTab] = useState(0);
  const tabOptions = [
    { label: "Sales", to: "", index: 0 },
    { label: "Purchase", to: "", index: 1 },
  ];

  const tableData = PHARMACY_STOCK_DATA || [
    {
      name: "Dashboard",
    },
  ];

  const invoiceTemplateHelper = () => (
    <ButtonComponent label="View" image={downloadButtonIcon} type="outlined" />
  );

  return (
    <div className="sales__purchase__container">
      <div className="sales__purchase__header">
        <div className="left">
          <AvatarWithNameAndRole profilePic={BlueEagle} />
          <div className="details__container">
            <p className="name">
              Medicine name <span className="id__blue__text">#2113</span>{" "}
              <span className="status__template__container status">
                <span className="active__status__badge" />
                Active
              </span>
            </p>
            <p className="catrgory__style small__bold mt__10">GENERAL</p>
          </div>
        </div>
        <div className="right">
          <ButtonComponent label="More actions" />
        </div>
      </div>
      <div className="email__and__phone light__grey__text">
        Manufacturer : <span className="dark__12">7098765432</span>
      </div>
      <div className="status__and__progress__bar light__grey__text">
        <p>Available stock : </p>
        {/* <div> {progressbar} </div> */}
        <div className="light__grey__text">Unit Price : ₹12/Pc</div>
      </div>

      <div className="tabs">
        <TabComponent
          taboptions={tabOptions}
          selectedTab={selectedtab}
          setSelectedTab={setSelectedTab}
        />
      </div>
      <div className="body__container">
        <div className="body__header">
          <div className="header">
            {selectedtab === 0 ? "Sales" : "Purchases"}
          </div>
          <div className="right">
            <SearchInputComponent />
            <ButtonComponent label="Add new" />
          </div>
        </div>
        <div className="tables__container">
          <DataTable value={tableData}>
            <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />
            <Column
              header="DATE"
              body={(row) => tableDateTemplate(row.date)}
              field="date"
            />
            <Column
              header="BATCH ID"
              body={(row) => hotlinkTemplateHelper(row.batchId)}
            />
            <Column header="QUANTITY" field="stock" />
            <Column
              header="UNIT PRICE"
              body={(row) => priceRupeesTemplate(row.unitPrice)}
            />
            <Column
              header="EXPIRY DATE"
              body={(row) => tableDateTemplate(row.expiry)}
            />
            <Column header="INVOICE" body={invoiceTemplateHelper} />
          </DataTable>
        </div>
      </div>
    </div>
  );
}

export default SalesAndPurchaseDetails;
