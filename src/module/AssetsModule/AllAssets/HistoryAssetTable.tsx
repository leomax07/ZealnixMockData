import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useDispatch, useSelector } from "react-redux";

import React, { useEffect } from "react";
import {
  EmployeeIDTemplate,
  ProfileImageTemplate,
  paginatorTemplate,
} from "../../../Components/DataTableTemplates/Index";
import { AppDispatch, RootState } from "../../../redux/store";
import { getAssetHistory } from "../store/assetMiddleware";
import { dateAndTimeFormat } from "../../../utils/reusableFunctions";
import { ROWS_PER_PAGE, ROWS_PER_PAGE_OPTIONS } from "../../../constants";

interface Props {
  assetData: any;
}

export default function HistoryAssetTable({ assetData }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const { assetHistory } = useSelector<RootState, RootState["assetReducer"]>(
    (state) => state.assetReducer
  );

  const fetchData = async () => {
    const defaultIncludeQuery: any = {
      filter: {
        where: {
          assetId: assetData?.id,
        },
        include: [{ relation: "assignedTo" }, { relation: "assetItem" }],
      },
    };
    await dispatch(getAssetHistory(defaultIncludeQuery.filter));
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="table__height">
      <DataTable
        value={assetHistory}
        responsiveLayout="scroll"
        paginator
        rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
        rows={ROWS_PER_PAGE}
        paginatorTemplate={paginatorTemplate}
      >
        <Column
          field="name"
          body={(rowData: any) => EmployeeIDTemplate(rowData.assetItem)}
          header="ITEM ID"
          headerClassName="table__asset__id"
        />
        <Column
          body={(rowData: any) =>
            rowData?.assignedTo && ProfileImageTemplate(rowData?.assignedTo)
          }
          header="ASSIGNED TO"
        />
        <Column
          body={(rowData: any) => dateAndTimeFormat(rowData.from)}
          header="FROM"
        />
        <Column
          body={(rowData: any) => dateAndTimeFormat(rowData.to)}
          header="TO"
        />
      </DataTable>
    </div>
  );
}
