import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../../Components/Buttons/Index";
import TokenCarousel from "./TokenCarousel";
import arrowLeft from "../../../assets/arrow-left.svg";
import SearchInputComponent from "../../../Components/SearchInput/searchInput";
import {
  DotsTemplate,
  hotlinkTemplateHelper,
  ProfileImageTemplate,
  StatusTemplate,
  tableDateTemplate,
} from "../../../Components/DataTableTemplates/Index";
import { PHARMACY_STOCK_DATA } from "../../../constants";

export default function TokenManagement() {
  const navigate = useNavigate();
  const tokensArray = [
    {
      tokenId: "#2323",
      name: "Annette Black",
    },
    {
      tokenId: "#2324",
      name: "Annette Black",
    },
    {
      tokenId: "#2325",
      name: "Annette Black",
    },
    {
      tokenId: "#2326",
      name: "Annette Black",
    },
    {
      tokenId: "#2327",
      name: "Annette Black",
    },
    {
      tokenId: "#2328",
      name: "Annette Black",
    },
  ];

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="page__container pharmacy__screen__container">
      <div className="header">
        <div className="left">
          <img src={arrowLeft} alt="back" onClick={handleBack} />

          <div className="title">Token Management</div>
        </div>
        <div className="right">
          <ButtonComponent label="More Actions" />
        </div>
      </div>
      <div className="token__management__tokens__conatainer">
        <TokenCarousel tokens={tokensArray} />
      </div>
      <div className="quotes__container">
        <div className="header">
          <div className="left">
            Queue <span className="light__text">(some text)</span>
          </div>
          <div className="right">
            <SearchInputComponent />
            <ButtonComponent label="Add new" />
          </div>
        </div>
        <div className="body">
          <DataTable value={PHARMACY_STOCK_DATA}>
            <Column selectionMode="multiple" />
            <Column
              header="TOKEN ID"
              body={(row) => hotlinkTemplateHelper(row.batchId)}
            />
            <Column header="CUSTOMER" body={ProfileImageTemplate} />
            <Column
              header="TOKEN ISSUED ON"
              body={tableDateTemplate(new Date().toString())}
            />
            <Column header="STATUS" body={StatusTemplate} />
            <Column body={DotsTemplate} />
          </DataTable>
        </div>
      </div>
    </div>
  );
}
