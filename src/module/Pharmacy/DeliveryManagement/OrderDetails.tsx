import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";
import {
  DotsTemplate,
  hotlinkTemplateHelper,
  priceRupeesTemplate,
  ProfileImageTemplate,
  StatusTemplate,
  tableDateTemplate,
} from "../../../Components/DataTableTemplates/Index";
import SearchInputComponent from "../../../Components/SearchInput/searchInput";
import { PHARMACY_STOCK_DATA } from "../../../constants";

export default function OrderDetails() {
  const profileData = {
    name: "Abiram",
    date: new Date().toDateString(),
    pincodes: "1234, 45678, 23456, 123233.",
  };

  return (
    <div className="order__details__container">
      <div className="header__container">
        <div className="header">Order Details</div>
        <div className="line line__2">
          <div className="batch__id each__item">
            <p className="label">Batch no:</p>
            <span>{hotlinkTemplateHelper("batch-id")}</span>
          </div>
          <div className="batch__id each__item">
            <p className="label">Rider:</p>
            <span>{ProfileImageTemplate(profileData)}</span>
          </div>
        </div>
        <div className="line line__3">
          <div className="orders each__item">
            <p className="label">
              Orders:
              {89}
            </p>
          </div>
          <div className="date each__item">
            <p className="label">Batch Created on : </p>
            <span>{tableDateTemplate(profileData.date)}</span>
          </div>
          <div className="pincodes each__item">
            <p className="label">Batch Created on :</p>
            <span>{profileData.pincodes}</span>
          </div>
        </div>
      </div>
      <div className="body">
        <div className="header">
          <div className="left">Orders List</div>
          <div className="right">
            <SearchInputComponent />
          </div>
        </div>
        <div className="table__container">
          <DataTable value={PHARMACY_STOCK_DATA}>
            <Column selectionMode="multiple" style={{ maxWidth: 5 }} />
            <Column
              header="ORDER ID"
              body={(row) => hotlinkTemplateHelper(row.batchId)}
            />
            <Column header="DELIVER TO" body={ProfileImageTemplate} />
            <Column header="ADDRESS" field="address" />
            <Column
              header="TOTAL ₹"
              field="price"
              body={(row) => priceRupeesTemplate(row.totalAmount)}
            />
            <Column header="STATUS" body={StatusTemplate} />
            <Column body={DotsTemplate} />
          </DataTable>
        </div>
      </div>
    </div>
  );
}
